-- ==============================================================================
-- DATABASE SCHEMA
-- Includes the new Archive entity and removes stored attributes from Booking/Renting
-- ==============================================================================

-- 1. Hotel Chain
CREATE TABLE Hotel_Chain (
    chainID INT PRIMARY KEY,
    CentralOfficeAddress VARCHAR(255) NOT NULL,
    ChainName VARCHAR(100) NOT NULL
);

-- 2. Chain Email (Multivalued Attribute)
CREATE TABLE Chain_Email (
    chainID INT,
    Email VARCHAR(100),
    PRIMARY KEY (chainID, Email),
    FOREIGN KEY (chainID) REFERENCES Hotel_Chain(chainID) ON DELETE CASCADE
);

-- 3. Chain Phone Number (Multivalued Attribute)
CREATE TABLE Chain_PhoneNumber (
    chainID INT,
    PhoneNumber VARCHAR(20),
    PRIMARY KEY (chainID, PhoneNumber),
    FOREIGN KEY (chainID) REFERENCES Hotel_Chain(chainID) ON DELETE CASCADE
);

-- 4. Hotel
-- Note: Manager_National_ID foreign key is added later via ALTER TABLE 
-- to avoid circular dependency errors with the Employee table during creation.
CREATE TABLE Hotel (
    hotel_ID INT PRIMARY KEY,
    chainID INT NOT NULL,
    Email VARCHAR(100),
    Address VARCHAR(255) NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Manager_National_ID VARCHAR(50), 
    FOREIGN KEY (chainID) REFERENCES Hotel_Chain(chainID) ON DELETE CASCADE
);

-- 5. Hotel Phone Number (Multivalued Attribute)
CREATE TABLE Hotel_PhoneNumber (
    hotel_ID INT,
    PhoneNumber VARCHAR(20),
    PRIMARY KEY (hotel_ID, PhoneNumber),
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON DELETE CASCADE
);

-- 6. Employee
CREATE TABLE Employee (
    National_ID VARCHAR(50) PRIMARY KEY,
    hotel_ID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON DELETE CASCADE
);

-- Add the Manager FK constraint to Hotel now that Employee exists
ALTER TABLE Hotel
ADD CONSTRAINT fk_hotel_manager
FOREIGN KEY (Manager_National_ID) REFERENCES Employee(National_ID) ON DELETE SET NULL;

-- 7. Employee Role (Multivalued Attribute)
CREATE TABLE Employee_Role (
    National_ID VARCHAR(50),
    Role VARCHAR(50),
    PRIMARY KEY (National_ID, Role),
    FOREIGN KEY (National_ID) REFERENCES Employee(National_ID) ON DELETE CASCADE
);

-- 8. Hotel Room
CREATE TABLE Hotel_Room (
    roomID INT PRIMARY KEY,
    hotel_ID INT NOT NULL,
    roomNumber VARCHAR(10) NOT NULL,
    Price DECIMAL(10, 2) CHECK (Price > 0),
    Status VARCHAR(50),
    Extendable BOOLEAN,
    View VARCHAR(100),
    Capacity VARCHAR(50), -- Can be 'single', 'double', etc.
    UNIQUE (hotel_ID, roomNumber), -- Ensures room numbers are unique per hotel
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON DELETE CASCADE
);

-- 9. Hotel Room Amenity (Multivalued Attribute)
CREATE TABLE Hotel_Room_Amenity (
    roomID INT,
    Amenity VARCHAR(100),
    PRIMARY KEY (roomID, Amenity),
    FOREIGN KEY (roomID) REFERENCES Hotel_Room(roomID) ON DELETE CASCADE
);

-- 10. Customer
CREATE TABLE Customer (
    custID VARCHAR(50) PRIMARY KEY,
    ID_type VARCHAR(20) CHECK (ID_type IN ('SSN', 'SIN', 'driving licence')),
    DateOfRegistration DATE,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(255)
);

-- 11. Booking (Stored attributes removed)
CREATE TABLE Booking (
    bookingID INT PRIMARY KEY,
    custID VARCHAR(50),
    roomID INT,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    bookingTime TIMESTAMP,
    CHECK (startDate < endDate),
    FOREIGN KEY (custID) REFERENCES Customer(custID) ON DELETE SET NULL,
    FOREIGN KEY (roomID) REFERENCES Hotel_Room(roomID) ON DELETE SET NULL
);

-- 12. Renting (Stored attributes removed)
CREATE TABLE Renting (
    rentingID INT PRIMARY KEY,
    custID VARCHAR(50),
    roomID INT,
    National_ID VARCHAR(50),
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    paymentAmount DECIMAL(10, 2) CHECK (paymentAmount >= 0),
    status VARCHAR(50),
    CHECK (checkInDate < checkOutDate),
    FOREIGN KEY (custID) REFERENCES Customer(custID) ON DELETE SET NULL,
    FOREIGN KEY (roomID) REFERENCES Hotel_Room(roomID) ON DELETE SET NULL,
    FOREIGN KEY (National_ID) REFERENCES Employee(National_ID) ON DELETE SET NULL
);

-- 13. Archive (The new entity for historical record keeping)
CREATE TABLE Archive (
    archiveID INT PRIMARY KEY,
    hotel_ID INT,
    recordType VARCHAR(20) CHECK (recordType IN ('Booking', 'Renting')),
    customerName VARCHAR(100) NOT NULL,
    customerIDType VARCHAR(20),
    roomNumber VARCHAR(10) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    paymentAmount DECIMAL(10, 2), -- Will be NULL if it was just a booking
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON DELETE SET NULL
);