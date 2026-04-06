const state = {
  apiBaseUrl: "",
  token: "",
  role: "",
  username: "",
  searchResults: [],
  selectedRoom: null,
  activeEntity: "customers",
  entityRows: [],
};

const ENTITY_CONFIG = {
  customers: {
    label: "Customers",
    path: "/api/management/customers",
    idName: "custID",
    idCandidates: ["custID", "custId", "customerID", "customerId", "id"],
    createTemplate: {
      custID: "333-000-001",
      ID_type: "driving licence",
      DateOfRegistration: "2026-04-06",
      Customer_Name: "Jane Doe",
      Customer_Address: "123 Fake St, Ottawa, ON",
    },
    updateTemplate: {
      ID_type: "driving licence",
      DateOfRegistration: "2026-04-06",
      Customer_Name: "Jane Doe",
      Customer_Address: "123 Fake St, Ottawa, ON",
    },
  },
  employees: {
    label: "Employees",
    path: "/api/management/employees",
    idName: "nationalID",
    idCandidates: [
      "National_ID",
      "nationalID",
      "employeeID",
      "employeeId",
      "id",
    ],
    createTemplate: {
      National_ID: "123-456-789",
      hotel_ID: 1,
      Employee_Name: "John Wick",
      Employee_Address: "Continental, NY",
    },
    updateTemplate: {
      hotel_ID: 1,
      Employee_Name: "John Wick",
      Employee_Address: "Continental, NY",
    },
  },
  hotels: {
    label: "Hotels",
    path: "/api/management/hotels",
    idName: "hotelID",
    idCandidates: ["hotelID", "hotelId", "Hotel_ID", "id"],
    createTemplate: {
      hotelID: 101,
      chainID: 1,
      Hotel_Name: "Downtown Grand",
      Category_Rating: 4,
      Total_Rooms: 180,
      Address: "12 Market Street, Toronto",
    },
    updateTemplate: {
      chainID: 1,
      Hotel_Name: "Downtown Grand",
      Category_Rating: 4,
      Total_Rooms: 180,
      Address: "12 Market Street, Toronto",
    },
  },
  rooms: {
    label: "Rooms",
    path: "/api/management/rooms",
    idName: "roomID",
    idCandidates: ["roomID", "roomId", "Room_ID", "id"],
    createTemplate: {
      roomID: 1,
      hotelID: 101,
      Price: 249.99,
      Capacity: 2,
      Amenities: "TV, WiFi, AC",
      View_Type: "sea",
      Extendable: true,
      Problems_Damages: null,
    },
    updateTemplate: {
      hotelID: 101,
      Price: 249.99,
      Capacity: 2,
      Amenities: "TV, WiFi, AC",
      View_Type: "sea",
      Extendable: true,
      Problems_Damages: null,
    },
  },
};

const SEARCH_FIELDS = [
  "startDate",
  "endDate",
  "capacity",
  "area",
  "chainName",
  "categoryRating",
  "minTotalRooms",
  "maxPrice",
];

const dom = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  mapDom();
  bindNavigation();
  bindApiConfig();
  bindAuth();
  bindSearch();
  bindBooking();
  bindRenting();
  bindManagement();
  bindInsights();

  await hydrateApiBaseUrl();
  hydrateSessionFromStorage();
  setDefaultDates();
  populateEntityTemplates();
  enforceRoleVisibility();

  await safeRun(refreshSearchRooms, "Search is ready.");
  await safeRun(refreshEntityRows, "Management list initialized.");
  await safeRun(refreshRequiredViews, "Views loaded.");
  await safeRun(refreshExtraQueries, "Analytics loaded.");
}

function mapDom() {
  dom.navButtons = [...document.querySelectorAll(".nav-btn")];
  dom.panels = [...document.querySelectorAll(".panel")];

  dom.sessionIdentity = document.getElementById("sessionIdentity");
  dom.sessionRole = document.getElementById("sessionRole");

  dom.apiConfigForm = document.getElementById("apiConfigForm");
  dom.apiBaseUrl = document.getElementById("apiBaseUrl");
  dom.testConnectionBtn = document.getElementById("testConnectionBtn");
  dom.apiStatus = document.getElementById("apiStatus");

  dom.loginForm = document.getElementById("loginForm");
  dom.loginUsername = document.getElementById("loginUsername");
  dom.loginRole = document.getElementById("loginRole");
  dom.logoutBtn = document.getElementById("logoutBtn");
  dom.authStatus = document.getElementById("authStatus");

  dom.searchForm = document.getElementById("searchForm");
  dom.searchNowBtn = document.getElementById("searchNowBtn");
  dom.searchClearBtn = document.getElementById("searchClearBtn");
  dom.searchStatus = document.getElementById("searchStatus");
  dom.searchMeta = document.getElementById("searchMeta");
  dom.searchResultsHead = document.getElementById("searchResultsHead");
  dom.searchResultsBody = document.getElementById("searchResultsBody");

  dom.bookingForm = document.getElementById("bookingForm");
  dom.bookingCustId = document.getElementById("bookingCustId");
  dom.bookingRoomId = document.getElementById("bookingRoomId");
  dom.bookingStartDate = document.getElementById("bookingStartDate");
  dom.bookingEndDate = document.getElementById("bookingEndDate");
  dom.bookingStatus = document.getElementById("bookingStatus");

  dom.rentingForm = document.getElementById("rentingForm");
  dom.rentingBookingId = document.getElementById("rentingBookingId");
  dom.rentingCustId = document.getElementById("rentingCustId");
  dom.rentingRoomId = document.getElementById("rentingRoomId");
  dom.rentingEmployeeId = document.getElementById("rentingEmployeeId");
  dom.rentingCheckInDate = document.getElementById("rentingCheckInDate");
  dom.rentingCheckOutDate = document.getElementById("rentingCheckOutDate");
  dom.rentingPaymentAmount = document.getElementById("rentingPaymentAmount");
  dom.rentingStatus = document.getElementById("rentingStatus");

  dom.entitySelect = document.getElementById("entitySelect");
  dom.entityRefreshBtn = document.getElementById("entityRefreshBtn");
  dom.createForm = document.getElementById("createForm");
  dom.createPayload = document.getElementById("createPayload");
  dom.updateForm = document.getElementById("updateForm");
  dom.recordId = document.getElementById("recordId");
  dom.updatePayload = document.getElementById("updatePayload");
  dom.deleteBtn = document.getElementById("deleteBtn");
  dom.managementStatus = document.getElementById("managementStatus");
  dom.entityMeta = document.getElementById("entityMeta");
  dom.entityTableHead = document.getElementById("entityTableHead");
  dom.entityTableBody = document.getElementById("entityTableBody");

  dom.refreshViewsBtn = document.getElementById("refreshViewsBtn");
  dom.refreshQueriesBtn = document.getElementById("refreshQueriesBtn");
  dom.insightsStatus = document.getElementById("insightsStatus");
  dom.viewAvailableRoomsPerArea = document.getElementById(
    "viewAvailableRoomsPerArea",
  );
  dom.viewHotelCapacity = document.getElementById("viewHotelCapacity");
  dom.queryTopSpendingCustomer = document.getElementById(
    "queryTopSpendingCustomer",
  );
  dom.queryTopRatedHotels = document.getElementById("queryTopRatedHotels");
  dom.queryHotelStats = document.getElementById("queryHotelStats");
  dom.queryAvailableRooms = document.getElementById("queryAvailableRooms");
  dom.queryAvailableRoomsForm = document.getElementById(
    "queryAvailableRoomsForm",
  );
  dom.queryHotelId = document.getElementById("queryHotelId");
  dom.queryStartDate = document.getElementById("queryStartDate");
  dom.queryEndDate = document.getElementById("queryEndDate");

  dom.toastHost = document.getElementById("toastHost");
}

function bindNavigation() {
  dom.navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("locked")) {
        pushToast("This section requires employee role.", "warn");
        return;
      }
      activatePanel(btn.dataset.navTarget, btn.id);
    });
  });
}

function activatePanel(panelId, navId) {
  dom.panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });
  dom.navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.id === navId);
  });
}

function bindApiConfig() {
  dom.apiConfigForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const rawValue = dom.apiBaseUrl.value.trim();
    const value = normalizeBaseUrl(rawValue);
    if (!value) {
      setStatus(dom.apiStatus, "Base URL is required.", "err");
      return;
    }
    state.apiBaseUrl = value;
    dom.apiBaseUrl.value = value;
    localStorage.setItem("ehotels_api_base_url", value);
    if (rawValue.startsWith("http://") && value.startsWith("https://")) {
      setStatus(dom.apiStatus, "Base URL saved. Ngrok URL was auto-upgraded to HTTPS.", "ok");
    } else {
      setStatus(dom.apiStatus, "Base URL saved.", "ok");
    }
    pushToast("API endpoint saved.", "ok");
  });

  dom.testConnectionBtn.addEventListener("click", async () => {
    await safeRun(
      async () => {
        const payload = await apiRequest("/api/management/hotels");
        const rows = toArray(payload);
        setStatus(
          dom.apiStatus,
          `Connection successful. Hotels payload rows: ${rows.length}.`,
          "ok",
        );
        pushToast("Backend reachable.", "ok");
      },
      "Connection test failed.",
      dom.apiStatus,
    );
  });
}

function bindAuth() {
  dom.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = dom.loginUsername.value.trim();
    const role = dom.loginRole.value;

    if (!username || !role) {
      setStatus(dom.authStatus, "Username and role are required.", "err");
      return;
    }

    await safeRun(
      async () => {
        const response = await apiRequest("/api/auth/login", {
          method: "POST",
          auth: false,
          body: { username, role },
        });
        const token = extractToken(response);
        if (!token) {
          throw new Error("JWT token not found in login response.");
        }

        state.token = token;
        state.role = role;
        state.username = username;

        localStorage.setItem("ehotels_token", token);
        localStorage.setItem("ehotels_role", role);
        localStorage.setItem("ehotels_username", username);

        refreshSessionBadge();
        enforceRoleVisibility();
        setStatus(dom.authStatus, "Logged in and token stored.", "ok");
        pushToast("Authentication successful.", "ok");
      },
      "Login failed.",
      dom.authStatus,
    );
  });

  dom.logoutBtn.addEventListener("click", () => {
    state.token = "";
    state.role = "";
    state.username = "";
    localStorage.removeItem("ehotels_token");
    localStorage.removeItem("ehotels_role");
    localStorage.removeItem("ehotels_username");
    refreshSessionBadge();
    enforceRoleVisibility();
    setStatus(dom.authStatus, "Logged out.", "warn");
    pushToast("Session cleared.", "warn");
  });
}

function bindSearch() {
  const debouncedSearch = debounce(() => {
    refreshSearchRooms().catch(() => {
      setStatus(dom.searchStatus, "Search request failed.", "err");
    });
  }, 350);

  SEARCH_FIELDS.forEach((name) => {
    const input = document.querySelector(`[data-search-field="${name}"]`);
    if (input) {
      input.addEventListener("input", debouncedSearch);
      input.addEventListener("change", debouncedSearch);
    }
  });

  dom.searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await safeRun(
      refreshSearchRooms,
      "Unable to refresh room search.",
      dom.searchStatus,
    );
  });

  dom.searchClearBtn.addEventListener("click", async () => {
    SEARCH_FIELDS.forEach((name) => {
      const input = document.querySelector(`[data-search-field="${name}"]`);
      if (input) {
        input.value = "";
      }
    });
    setStatus(dom.searchStatus, "Filters cleared.", "warn");
    await safeRun(
      refreshSearchRooms,
      "Unable to refresh room search.",
      dom.searchStatus,
    );
  });

  dom.searchResultsBody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-row-index]");
    if (!button) {
      return;
    }

    const index = Number(button.dataset.rowIndex);
    const row = state.searchResults[index];
    if (!row) {
      return;
    }

    state.selectedRoom = row;
    const inferredRoomId = inferIdFromRow(row, [
      "roomID",
      "roomId",
      "Room_ID",
      "id",
      "room_id",
    ]);
    if (inferredRoomId !== undefined && inferredRoomId !== null) {
      dom.bookingRoomId.value = String(inferredRoomId);
      dom.rentingRoomId.value = String(inferredRoomId);
      setStatus(
        dom.bookingStatus,
        `Room ${inferredRoomId} selected from search table.`,
        "ok",
      );
      pushToast("Room selected for booking/renting.", "ok");
    } else {
      setStatus(
        dom.bookingStatus,
        "Selected row has no detectable room ID. Fill manually.",
        "warn",
      );
    }
  });
}

function bindBooking() {
  dom.bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      custId: dom.bookingCustId.value.trim(),
      roomId: parseNumericOrRaw(dom.bookingRoomId.value.trim()),
      startDate: dom.bookingStartDate.value,
      endDate: dom.bookingEndDate.value,
    };

    if (
      !payload.custId ||
      !payload.roomId ||
      !payload.startDate ||
      !payload.endDate
    ) {
      setStatus(dom.bookingStatus, "All booking fields are required.", "err");
      return;
    }

    await safeRun(
      async () => {
        const result = await apiRequest("/api/management/book", {
          method: "POST",
          body: payload,
        });
        const summary = summarizeResult(result, "Booking created.");
        setStatus(dom.bookingStatus, summary, "ok");
        pushToast("Booking created successfully.", "ok");
        await refreshSearchRooms();
      },
      "Booking request failed.",
      dom.bookingStatus,
    );
  });
}

function bindRenting() {
  dom.rentingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bookingIdRaw = dom.rentingBookingId.value.trim();
    const paymentAmount = Number(dom.rentingPaymentAmount.value);

    const payload = {
      bookingId: bookingIdRaw ? Number(bookingIdRaw) : null,
      custId: dom.rentingCustId.value.trim(),
      roomId: Number(dom.rentingRoomId.value),
      employeeId: dom.rentingEmployeeId.value.trim(),
      checkInDate: dom.rentingCheckInDate.value,
      checkOutDate: dom.rentingCheckOutDate.value,
      paymentAmount,
    };

    if (
      !payload.custId ||
      !payload.employeeId ||
      !payload.checkInDate ||
      !payload.checkOutDate ||
      Number.isNaN(payload.roomId) ||
      Number.isNaN(paymentAmount)
    ) {
      setStatus(
        dom.rentingStatus,
        "Please complete all required renting fields.",
        "err",
      );
      return;
    }

    await safeRun(
      async () => {
        const result = await apiRequest("/api/management/rent", {
          method: "POST",
          body: payload,
        });
        setStatus(
          dom.rentingStatus,
          summarizeResult(result, "Renting completed."),
          "ok",
        );
        pushToast("Renting/check-in executed.", "ok");
        await refreshSearchRooms();
      },
      "Renting request failed.",
      dom.rentingStatus,
    );
  });
}

function bindManagement() {
  dom.entitySelect.addEventListener("change", async () => {
    state.activeEntity = dom.entitySelect.value;
    populateEntityTemplates();
    await safeRun(
      refreshEntityRows,
      "Could not refresh entity rows.",
      dom.managementStatus,
    );
  });

  dom.entityRefreshBtn.addEventListener("click", async () => {
    await safeRun(
      refreshEntityRows,
      "Could not refresh entity rows.",
      dom.managementStatus,
    );
  });

  dom.createForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await safeRun(
      async () => {
        const config = ENTITY_CONFIG[state.activeEntity];
        const payload = parseJsonInput(
          dom.createPayload.value,
          "create payload",
        );
        const result = await apiRequest(config.path, {
          method: "POST",
          body: payload,
        });
        setStatus(
          dom.managementStatus,
          summarizeResult(result, `${config.label} record inserted.`),
          "ok",
        );
        pushToast(`${config.label} inserted.`, "ok");
        await refreshEntityRows();
      },
      "Insert failed.",
      dom.managementStatus,
    );
  });

  dom.updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await safeRun(
      async () => {
        const config = ENTITY_CONFIG[state.activeEntity];
        const id = dom.recordId.value.trim();
        if (!id) {
          throw new Error("Record ID is required for update.");
        }
        const payload = parseJsonInput(
          dom.updatePayload.value,
          "update payload",
        );
        const result = await apiRequest(
          `${config.path}/${encodeURIComponent(id)}`,
          {
            method: "PUT",
            body: payload,
          },
        );
        setStatus(
          dom.managementStatus,
          summarizeResult(result, `${config.label} record updated.`),
          "ok",
        );
        pushToast(`${config.label} updated.`, "ok");
        await refreshEntityRows();
      },
      "Update failed.",
      dom.managementStatus,
    );
  });

  dom.deleteBtn.addEventListener("click", async () => {
    await safeRun(
      async () => {
        const config = ENTITY_CONFIG[state.activeEntity];
        const id = dom.recordId.value.trim();
        if (!id) {
          throw new Error("Record ID is required for delete.");
        }
        const confirmed = window.confirm(
          `Delete ${config.label} record ${id}?`,
        );
        if (!confirmed) {
          return;
        }
        const result = await apiRequest(
          `${config.path}/${encodeURIComponent(id)}`,
          {
            method: "DELETE",
          },
        );
        setStatus(
          dom.managementStatus,
          summarizeResult(result, `${config.label} record deleted.`),
          "ok",
        );
        pushToast(`${config.label} deleted.`, "ok");
        await refreshEntityRows();
      },
      "Delete failed.",
      dom.managementStatus,
    );
  });

  dom.entityTableBody.addEventListener("click", (event) => {
    const loadBtn = event.target.closest("button[data-load-row]");
    if (loadBtn) {
      const rowIndex = Number(loadBtn.dataset.loadRow);
      const row = state.entityRows[rowIndex];
      if (!row) {
        return;
      }
      const config = ENTITY_CONFIG[state.activeEntity];
      const id = inferIdFromRow(row, config.idCandidates);
      if (id === undefined || id === null) {
        setStatus(
          dom.managementStatus,
          "Could not infer record ID from selected row.",
          "warn",
        );
        return;
      }
      dom.recordId.value = String(id);
      dom.updatePayload.value = JSON.stringify(row, null, 2);
      setStatus(
        dom.managementStatus,
        `Loaded row with ID ${id} into update form.`,
        "ok",
      );
      return;
    }

    const deleteBtn = event.target.closest("button[data-delete-row]");
    if (deleteBtn) {
      const rowIndex = Number(deleteBtn.dataset.deleteRow);
      const row = state.entityRows[rowIndex];
      if (!row) {
        return;
      }
      const config = ENTITY_CONFIG[state.activeEntity];
      const id = inferIdFromRow(row, config.idCandidates);
      if (id === undefined || id === null) {
        setStatus(
          dom.managementStatus,
          "Could not infer record ID from selected row.",
          "warn",
        );
        return;
      }
      dom.recordId.value = String(id);
      dom.deleteBtn.click();
    }
  });
}

function bindInsights() {
  dom.refreshViewsBtn.addEventListener("click", async () => {
    await safeRun(
      refreshRequiredViews,
      "Could not refresh required SQL views.",
      dom.insightsStatus,
    );
  });

  dom.refreshQueriesBtn.addEventListener("click", async () => {
    await safeRun(
      refreshExtraQueries,
      "Could not refresh query endpoints.",
      dom.insightsStatus,
    );
  });

  dom.queryAvailableRoomsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await safeRun(
      async () => {
        const query = {
          hotelId: dom.queryHotelId.value.trim() || undefined,
          startDate: dom.queryStartDate.value || undefined,
          endDate: dom.queryEndDate.value || undefined,
        };
        const payload = await apiRequest("/api/queries/available-rooms", {
          query,
        });
        renderDataset(dom.queryAvailableRooms, payload, "No rows returned.");
        setStatus(dom.insightsStatus, "Available rooms query executed.", "ok");
      },
      "Available rooms query failed.",
      dom.insightsStatus,
    );
  });
}

async function hydrateApiBaseUrl() {
  const saved = localStorage.getItem("ehotels_api_base_url");
  if (saved) {
    const normalizedSaved = normalizeBaseUrl(saved);
    state.apiBaseUrl = normalizedSaved;
    dom.apiBaseUrl.value = normalizedSaved;
    if (normalizedSaved !== saved) {
      localStorage.setItem("ehotels_api_base_url", normalizedSaved);
    }
    return;
  }

  try {
    const docs = await fetch("api-docs.json");
    if (docs.ok) {
      const openApi = await docs.json();
      const serverUrl = openApi?.servers?.[0]?.url;
      if (serverUrl && typeof serverUrl === "string") {
        state.apiBaseUrl = normalizeBaseUrl(serverUrl);
        dom.apiBaseUrl.value = state.apiBaseUrl;
        localStorage.setItem("ehotels_api_base_url", state.apiBaseUrl);
        setStatus(
          dom.apiStatus,
          "Base URL preloaded from api-docs.json.",
          "ok",
        );
        return;
      }
    }
  } catch (error) {
    setStatus(
      dom.apiStatus,
      "Could not auto-read api-docs.json. Enter URL manually.",
      "warn",
    );
  }

  const fallback = "http://localhost:8080";
  state.apiBaseUrl = fallback;
  dom.apiBaseUrl.value = fallback;
}

function hydrateSessionFromStorage() {
  state.token = localStorage.getItem("ehotels_token") || "";
  state.role = localStorage.getItem("ehotels_role") || "";
  state.username = localStorage.getItem("ehotels_username") || "";
  if (state.role) {
    dom.loginRole.value = state.role;
  }
  if (state.username) {
    dom.loginUsername.value = state.username;
  }
  refreshSessionBadge();
}

function refreshSessionBadge() {
  if (state.username) {
    dom.sessionIdentity.textContent = state.username;
    dom.sessionRole.textContent = state.role || "Role unknown";
  } else {
    dom.sessionIdentity.textContent = "Guest mode";
    dom.sessionRole.textContent = "No role selected";
  }
}

function enforceRoleVisibility() {
  const employeeOnly = ["nav-renting", "nav-management"];
  const isEmployee = state.role === "ROLE_EMPLOYEE";

  employeeOnly.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.classList.toggle("locked", !isEmployee);
    }
  });

  if (!isEmployee) {
    const activeEmployeePanel = document.querySelector(
      "#section-renting.active, #section-management.active",
    );
    if (activeEmployeePanel) {
      activatePanel("section-search", "nav-search");
    }
  }
}

function setDefaultDates() {
  const today = new Date();
  const plusDays = (count) => {
    const d = new Date(today);
    d.setDate(d.getDate() + count);
    return d.toISOString().slice(0, 10);
  };

  const defaultStart = plusDays(3);
  const defaultEnd = plusDays(7);

  dom.searchStartDate.value = defaultStart;
  dom.searchEndDate.value = defaultEnd;
  dom.bookingStartDate.value = defaultStart;
  dom.bookingEndDate.value = defaultEnd;
  dom.rentingCheckInDate.value = defaultStart;
  dom.rentingCheckOutDate.value = defaultEnd;
  dom.queryStartDate.value = defaultStart;
  dom.queryEndDate.value = defaultEnd;
}

function populateEntityTemplates() {
  const config = ENTITY_CONFIG[state.activeEntity];
  dom.createPayload.value = JSON.stringify(config.createTemplate, null, 2);
  dom.updatePayload.value = JSON.stringify(config.updateTemplate, null, 2);
  dom.recordId.placeholder = config.idName;
}

async function refreshSearchRooms() {
  const query = collectSearchQuery();

  if (query.startDate && query.endDate && query.startDate > query.endDate) {
    setStatus(dom.searchStatus, "Start date must be before end date.", "err");
    return;
  }

  const payload = await apiRequest("/api/management/search-rooms", { query });
  const rows = toArray(payload);
  state.searchResults = rows;

  renderTable(dom.searchResultsHead, dom.searchResultsBody, rows, {
    actionLabel: "Use",
    actionAttribute: "data-row-index",
  });

  dom.searchMeta.textContent = `${rows.length} result(s) for current criteria.`;

  if (!rows.length) {
    setStatus(dom.searchStatus, "No rooms matched current filters.", "warn");
  } else {
    setStatus(dom.searchStatus, "Search refreshed.", "ok");
  }
}

function collectSearchQuery() {
  const query = {};

  SEARCH_FIELDS.forEach((key) => {
    const element = document.querySelector(`[data-search-field="${key}"]`);
    if (!element) {
      return;
    }
    const value = element.value.trim();
    if (value !== "") {
      query[key] = value;
    }
  });

  return query;
}

async function refreshEntityRows() {
  const config = ENTITY_CONFIG[state.activeEntity];
  const payload = await apiRequest(config.path);
  const rows = toArray(payload);
  state.entityRows = rows;

  renderTable(dom.entityTableHead, dom.entityTableBody, rows, {
    actionLabel: "Load",
    actionAttribute: "data-load-row",
    secondaryActionLabel: "Delete",
    secondaryActionAttribute: "data-delete-row",
  });

  dom.entityMeta.textContent = `${config.label}: ${rows.length} record(s).`;
  setStatus(dom.managementStatus, `${config.label} list refreshed.`, "ok");
}

async function refreshRequiredViews() {
  const [availableRoomsPerArea, hotelCapacity] = await Promise.all([
    apiRequest("/api/management/views/available-rooms-per-area"),
    apiRequest("/api/management/views/hotel-capacity"),
  ]);

  renderDataset(
    dom.viewAvailableRoomsPerArea,
    availableRoomsPerArea,
    "No rows returned.",
  );
  renderDataset(dom.viewHotelCapacity, hotelCapacity, "No rows returned.");
  setStatus(dom.insightsStatus, "Required SQL views refreshed.", "ok");
}

async function refreshExtraQueries() {
  const [topSpending, topRated, stats, availableRooms] = await Promise.all([
    apiRequest("/api/queries/top-spending-customer"),
    apiRequest("/api/queries/top-rated-hotels"),
    apiRequest("/api/queries/hotel-stats"),
    apiRequest("/api/queries/available-rooms", {
      query: {
        hotelId: dom.queryHotelId.value.trim() || undefined,
        startDate: dom.queryStartDate.value || undefined,
        endDate: dom.queryEndDate.value || undefined,
      },
    }),
  ]);

  renderDataset(dom.queryTopSpendingCustomer, topSpending, "No rows returned.");
  renderDataset(dom.queryTopRatedHotels, topRated, "No rows returned.");
  renderDataset(dom.queryHotelStats, stats, "No rows returned.");
  renderDataset(dom.queryAvailableRooms, availableRooms, "No rows returned.");
  setStatus(dom.insightsStatus, "Analytics endpoints refreshed.", "ok");
}

function renderTable(head, body, rows, actionConfig = {}) {
  head.innerHTML = "";
  body.innerHTML = "";

  if (!rows.length) {
    head.innerHTML = "<tr><th>Message</th></tr>";
    body.innerHTML = "<tr><td>No data returned.</td></tr>";
    return;
  }

  const keys = collectColumnKeys(rows, 8);

  const headerRow = document.createElement("tr");
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = humanizeKey(key);
    headerRow.appendChild(th);
  });

  if (actionConfig.actionLabel) {
    const th = document.createElement("th");
    th.textContent = "Actions";
    headerRow.appendChild(th);
  }

  head.appendChild(headerRow);

  rows.forEach((row, index) => {
    const tr = document.createElement("tr");
    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = toDisplay(row[key]);
      tr.appendChild(td);
    });

    if (actionConfig.actionLabel) {
      const actionCell = document.createElement("td");
      const wrap = document.createElement("div");
      wrap.className = "table-actions";

      const primaryBtn = document.createElement("button");
      primaryBtn.type = "button";
      primaryBtn.textContent = actionConfig.actionLabel;
      primaryBtn.setAttribute(actionConfig.actionAttribute, String(index));
      wrap.appendChild(primaryBtn);

      if (actionConfig.secondaryActionLabel) {
        const secondaryBtn = document.createElement("button");
        secondaryBtn.type = "button";
        secondaryBtn.className = "danger";
        secondaryBtn.textContent = actionConfig.secondaryActionLabel;
        secondaryBtn.setAttribute(
          actionConfig.secondaryActionAttribute,
          String(index),
        );
        wrap.appendChild(secondaryBtn);
      }

      actionCell.appendChild(wrap);
      tr.appendChild(actionCell);
    }

    body.appendChild(tr);
  });
}

function renderDataset(container, payload, emptyMessage) {
  container.classList.remove("empty");

  const rows = toArray(payload);
  if (!rows.length) {
    container.innerHTML = emptyMessage;
    container.classList.add("empty");
    return;
  }

  if (
    typeof rows[0] !== "object" ||
    rows[0] === null ||
    Array.isArray(rows[0])
  ) {
    container.innerHTML = rows
      .map((item) => `<div>${escapeHtml(String(item))}</div>`)
      .join("");
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const keys = collectColumnKeys(rows, 8);

  const headRow = document.createElement("tr");
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = humanizeKey(key);
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    keys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = toDisplay(row[key]);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.innerHTML = "";
  container.appendChild(table);
}

async function apiRequest(path, options = {}) {
  if (!state.apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const url = new URL(state.apiBaseUrl.replace(/\/+$/, "") + path);
  const query = options.query || {};

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const headers = {
    Accept: "application/json, text/plain, */*",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (isNgrokHost(url.hostname)) {
    headers["ngrok-skip-browser-warning"] = "true";
  }

  if (state.token && options.auth !== false) {
    headers.Authorization = state.token.startsWith("Bearer ")
      ? state.token
      : `Bearer ${state.token}`;
  }

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message = describeError(payload, response.status);
    throw new Error(message);
  }

  return payload;
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

function describeError(payload, status) {
  if (typeof payload === "string") {
    const ngrokCode = payload.match(/ERR_NGROK_\d+/i)?.[0];
    if (ngrokCode) {
      if (ngrokCode.toUpperCase() === "ERR_NGROK_6024") {
        return "ERR_NGROK_6024: Ngrok rejected this request. Make sure the tunnel is running, use the latest ngrok URL, and keep the endpoint on HTTPS.";
      }
      return `${ngrokCode}: Ngrok rejected this request. Verify the tunnel is active and the endpoint is current.`;
    }
    return `${status}: ${payload}`;
  }
  if (payload && typeof payload === "object") {
    return (
      payload.message ||
      payload.error ||
      payload.title ||
      `${status}: Request failed.`
    );
  }
  return `${status}: Request failed.`;
}

function toArray(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload === null || payload === undefined) {
    return [];
  }
  if (typeof payload === "object") {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    return [payload];
  }
  if (typeof payload === "string") {
    return payload ? [payload] : [];
  }
  return [payload];
}

function normalizeBaseUrl(rawUrl) {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return "";
  }

  try {
    const parsed = new URL(trimmed);
    if (isNgrokHost(parsed.hostname) && parsed.protocol !== "https:") {
      parsed.protocol = "https:";
    }
    return parsed.toString().replace(/\/+$/, "");
  } catch (error) {
    return trimmed;
  }
}

function isNgrokHost(hostname) {
  return /(^|\.)ngrok(-free)?\.app$/i.test(hostname) || /(^|\.)ngrok\.io$/i.test(hostname);
}

function inferIdFromRow(row, candidates) {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
  }

  for (const [key, value] of Object.entries(row)) {
    if (
      /id/i.test(key) &&
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return undefined;
}

function collectColumnKeys(rows, maxColumns) {
  const keys = [];
  rows.slice(0, 8).forEach((row) => {
    if (typeof row !== "object" || row === null) {
      if (!keys.includes("value")) {
        keys.push("value");
      }
      return;
    }
    Object.keys(row).forEach((key) => {
      if (!keys.includes(key) && keys.length < maxColumns) {
        keys.push(key);
      }
    });
  });

  if (!keys.length) {
    keys.push("value");
  }

  return keys;
}

function parseJsonInput(raw, label) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid ${label}: ${error.message}`);
  }
}

function parseNumericOrRaw(raw) {
  if (raw === "") {
    return raw;
  }
  const asNumber = Number(raw);
  if (!Number.isNaN(asNumber)) {
    return asNumber;
  }
  return raw;
}

function extractToken(payload) {
  if (!payload) {
    return "";
  }

  if (typeof payload === "string") {
    return payload.trim();
  }

  if (typeof payload === "object") {
    const candidates = [
      payload.token,
      payload.jwt,
      payload.accessToken,
      payload.access_token,
      payload.idToken,
      payload.id_token,
    ];

    for (const candidate of candidates) {
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate.trim();
      }
    }

    for (const value of Object.values(payload)) {
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
  }

  return "";
}

function summarizeResult(result, fallbackMessage) {
  if (typeof result === "string" && result.trim()) {
    return result;
  }
  if (result && typeof result === "object") {
    if (result.message) {
      return String(result.message);
    }
    if (result.status) {
      return String(result.status);
    }
    return fallbackMessage;
  }
  return fallbackMessage;
}

function humanizeKey(key) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

function toDisplay(value) {
  if (value === null || value === undefined) {
    return "-";
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function setStatus(target, message, level = "ok") {
  target.textContent = message;
  target.classList.remove("ok", "warn", "err");
  target.classList.add(level);
}

function pushToast(message, level = "ok") {
  const toast = document.createElement("div");
  toast.className = `toast ${level}`;
  toast.textContent = message;
  dom.toastHost.appendChild(toast);
  window.setTimeout(() => {
    toast.remove();
  }, 3200);
}

function escapeHtml(raw) {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function debounce(callback, delay) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

async function safeRun(fn, fallbackMessage, statusTarget) {
  try {
    await fn();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (statusTarget) {
      setStatus(statusTarget, message || fallbackMessage, "err");
    }
    pushToast(message || fallbackMessage, "err");
  }
}
