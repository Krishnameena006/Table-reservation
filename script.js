const $ = (id) => document.getElementById(id);

const KEYS = {
  bookings: "tt_bookings_v1",
  reviews: "tt_reviews_v1",
  waitlist: "tt_waitlist_v1"
};

function readData(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

let bookings = readData(KEYS.bookings);
let reviews = readData(KEYS.reviews);
let waitlist = readData(KEYS.waitlist);
let selectedTable = null;

const tables = Array.from({ length: 12 }, (_, index) => ({
  id: `T${String(index + 1).padStart(2, "0")}`,
  capacity: index < 4 ? 2 : index < 9 ? 4 : 6
}));

const menuItems = [
  {
    name: "Crispy Garlic Bread",
    category: "Starters",
    price: 180,
    description: "Toasted bread with garlic butter and herbs.",
    image: "photo-1573140247632-f8fd74997d5c"
  },
  {
    name: "Creamy Mushroom Soup",
    category: "Starters",
    price: 220,
    description: "A warm, creamy soup made with mushrooms.",
    image: "photo-1547592166-23ac45744acd"
  },
  {
    name: "Classic Margherita Pizza",
    category: "Main Course",
    price: 350,
    description: "Fresh tomato, mozzarella and basil.",
    image: "photo-1579751626657-72bc17010498"
  },
  {
    name: "Grilled Paneer Bowl",
    category: "Main Course",
    price: 320,
    description: "Grilled paneer served with seasoned vegetables.",
    image: "photo-1512621776951-a57141f2eefd"
  },
  {
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 190,
    description: "Rich chocolate brownie with a soft centre.",
    image: "photo-1606313564200-e75d5e30476c"
  },
  {
    name: "Classic Cheesecake",
    category: "Desserts",
    price: 240,
    description: "Smooth cheesecake with a biscuit base.",
    image: "photo-1533134242443-d4fd215305ad"
  },
  {
    name: "Fresh Lemon Cooler",
    category: "Drinks",
    price: 100,
    description: "A refreshing lemon drink served chilled.",
    image: "photo-1513558161293-cdaf765edfd7"
  },
  {
    name: "Cold Coffee",
    category: "Drinks",
    price: 150,
    description: "Chilled coffee with a creamy finish.",
    image: "photo-1461023058943-07fcbe16d735"
  },
  {
    name: "Garden Fresh Salad",
    category: "Starters",
    price: 210,
    description: "Fresh greens, tomatoes and house dressing.",
    image: "photo-1512621776951-a57141f2eefd"
  }
];

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = localDateString();
$("booking-date").min = today;
$("wait-date").min = today;
$("current-year").textContent = new Date().getFullYear();
$("booking-date").value = today;

function renderMenu(category = "All") {
  const filtered = category === "All"
    ? menuItems
    : menuItems.filter(item => item.category === category);

  $("menu-grid").innerHTML = filtered.map(item => `
    <article class="menu-card">
      <img
        src="https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=80"
        alt="${escapeHTML(item.name)}"
        loading="lazy"
        onerror="this.style.display='none'"
      >
      <div class="menu-card-body">
        <span class="menu-category">${escapeHTML(item.category)}</span>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <div class="menu-card-bottom">
          <span class="menu-price">₹${item.price}</span>
          <button class="small-button order-button"
            data-name="${escapeHTML(item.name)}">Pre-order interest</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
      showToast("Menu item noted. Online food ordering is not enabled in this demo.");
    });
  });
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item =>
      item.classList.remove("active")
    );
    button.classList.add("active");
    renderMenu(button.dataset.category);
  });
});

function isBooked(tableId, date, time) {
  return bookings.some(booking =>
    booking.table === tableId &&
    booking.date === date &&
    booking.time === time &&
    booking.status === "Confirmed"
  );
}

function renderTables() {
  const date = $("booking-date").value;
  const time = $("booking-time").value;

  $("table-grid").innerHTML = tables.map(table => {
    const occupied = date && time && isBooked(table.id, date, time);
    const chosen = selectedTable === table.id;
    const disabled = table.capacity < Number($("guest-count").value);

    return `
      <button type="button"
        class="table-seat ${chosen ? "chosen" : ""}"
        data-table="${table.id}"
        ${occupied || disabled ? "disabled" : ""}
        aria-pressed="${chosen}"
        title="${occupied ? "Already booked" : disabled ? "Not enough capacity" : "Select table"}">
        ${table.id}
        <span>${occupied ? "Booked" : disabled ? "Too small" : `${table.capacity} seats`}</span>
      </button>
    `;
  }).join("");

  document.querySelectorAll(".table-seat:not(:disabled)").forEach(button => {
    button.addEventListener("click", () => {
      selectedTable = button.dataset.table;
      updateSummary();
      renderTables();
    });
  });

  const selected = tables.find(table => table.id === selectedTable);
  if (selected && (
    selected.capacity < Number($("guest-count").value) ||
    isBooked(selected.id, date, time)
  )) {
    selectedTable = null;
    updateSummary();
  }

  $("table-message").textContent = date && time
    ? "Choose an available table for your selected date and time."
    : "Choose a date and time to check table availability.";
}

function updateSummary() {
  $("summary-guests").textContent = $("guest-count").value;
  $("summary-date").textContent = $("booking-date").value || "Not selected";
  $("summary-time").textContent = $("booking-time").value || "Not selected";
  $("summary-table").textContent = selectedTable || "Not selected";
  $("summary-occasion").textContent = $("occasion").value;
}

["booking-date", "booking-time", "guest-count", "occasion"].forEach(id => {
  $(id).addEventListener("change", () => {
    renderTables();
    updateSummary();
  });
});

$("booking-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("guest-name").value.trim();
  const email = $("guest-email").value.trim().toLowerCase();
  const phone = $("guest-phone").value.trim();
  const guests = Number($("guest-count").value);
  const date = $("booking-date").value;
  const time = $("booking-time").value;
  const table = tables.find(item => item.id === selectedTable);

  if (!name || !email || !phone || !date || !time) {
    showToast("Please complete all required details.");
    return;
  }

  if (!date || date < today) {
    showToast("Please select today or a future date.");
    return;
  }

  if (!table || table.capacity < guests) {
    showToast("Please select a suitable table.");
    return;
  }

  if (isBooked(table.id, date, time)) {
    selectedTable = null;
    renderTables();
    updateSummary();
    showToast("That table is already booked. Choose another.");
    return;
  }

  const booking = {
    id: "TT" + Date.now().toString().slice(-9),
    name,
    email,
    phone,
    guests,
    date,
    time,
    table: table.id,
    occasion: $("occasion").value,
    request: $("special-request").value.trim(),
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);
  saveData(KEYS.bookings, bookings);

  $("booking-form").reset();
  $("booking-date").value = today;
  $("guest-count").value = "2";
  selectedTable = null;

  renderTables();
  updateSummary();
  renderAdmin();

  $("lookup-email").value = email;
  renderCustomerBookings(email);

  showToast(`Reservation confirmed! Your booking ID is ${booking.id}`);
  $("my-bookings").scrollIntoView({ behavior: "smooth" });
});

function renderCustomerBookings(email = "") {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    $("customer-bookings").innerHTML =
      '<div class="empty-state">Enter your email to find your reservations.</div>';
    return;
  }

  const results = bookings.filter(booking =>
    booking.email === normalizedEmail
  );

  if (!results.length) {
    $("customer-bookings").innerHTML =
      '<div class="empty-state">No reservations found for this email.</div>';
    return;
  }

  $("customer-bookings").innerHTML = results
    .slice()
    .reverse()
    .map(booking => `
      <article class="booking-card">
        <div>
          <h3>Reservation ${escapeHTML(booking.id)}</h3>
          <p>${escapeHTML(booking.name)} · ${escapeHTML(booking.guests)} guest(s)</p>
          <p>${escapeHTML(booking.date)} at ${escapeHTML(booking.time)}</p>
          <p>Table ${escapeHTML(booking.table)} · ${escapeHTML(booking.occasion)}</p>
          <span class="status ${booking.status === "Cancelled" ? "cancelled" : ""}">
            ${escapeHTML(booking.status)}
          </span>
        </div>
        <div>
          ${booking.status === "Confirmed" ? `
            <button class="small-button cancel-button"
              data-cancel="${escapeHTML(booking.id)}">Cancel Booking</button>
          ` : ""}
        </div>
      </article>
    `).join("");

  document.querySelectorAll("[data-cancel]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.cancel;
      const booking = bookings.find(item => item.id === id);

      if (!booking || booking.status !== "Confirmed") return;

      if (!confirm(`Cancel reservation ${id}?`)) return;

      booking.status = "Cancelled";
      saveData(KEYS.bookings, bookings);
      renderCustomerBookings(normalizedEmail);
      renderAdmin();
      renderTables();
      showToast("Reservation cancelled.");
    });
  });
}

$("lookup-button").addEventListener("click", () => {
  renderCustomerBookings($("lookup-email").value);
});

$("lookup-email").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderCustomerBookings($("lookup-email").value);
  }
});

function renderReviews() {
  const displayed = reviews.slice().reverse().slice(0, 20);

  if (!displayed.length) {
    $("review-list").innerHTML =
      '<div class="empty-state">No reviews yet. Be the first to share your experience.</div>';
    return;
  }

  $("review-list").innerHTML = displayed.map(review => `
    <article class="review-card">
      <h3>${escapeHTML(review.name)}</h3>
      <div class="stars" aria-label="${review.rating} out of 5 stars">
        ${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))}
      </div>
      <p>${escapeHTML(review.text)}</p>
      <span class="small-note">${escapeHTML(review.date)}</span>
    </article>
  `).join("");
}

$("review-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("review-name").value.trim();
  const text = $("review-text").value.trim();

  if (!name || !text) {
    showToast("Please enter your name and review.");
    return;
  }

  reviews.push({
    name,
    rating: Number($("review-rating").value),
    text,
    date: today
  });

  saveData(KEYS.reviews, reviews);
  $("review-form").reset();
  renderReviews();
  showToast("Thank you for sharing your review!");
});

function renderAdmin() {
  const confirmed = bookings.filter(item => item.status === "Confirmed");
  const cancelled = bookings.filter(item => item.status === "Cancelled");

  $("total-bookings").textContent = bookings.length;
  $("confirmed-bookings").textContent = confirmed.length;
  $("cancelled-bookings").textContent = cancelled.length;
  $("total-guests").textContent = confirmed.reduce(
    (sum, booking) => sum + Number(booking.guests), 0
  );

  if (!bookings.length) {
    $("admin-bookings").innerHTML =
      '<tr><td colspan="8">No reservations have been created yet.</td></tr>';
  } else {
    $("admin-bookings").innerHTML = bookings.slice().reverse().map(booking => `
      <tr>
        <td>${escapeHTML(booking.id)}</td>
        <td>${escapeHTML(booking.name)}</td>
        <td>${escapeHTML(booking.date)}</td>
        <td>${escapeHTML(booking.time)}</td>
        <td>${escapeHTML(booking.table)}</td>
        <td>${escapeHTML(booking.guests)}</td>
        <td><span class="status ${booking.status === "Cancelled" ? "cancelled" : ""}">
          ${escapeHTML(booking.status)}</span></td>
        <td>
          ${booking.status === "Confirmed" ? `
            <button class="small-button" data-admin-cancel="${escapeHTML(booking.id)}">
              Cancel
            </button>` : "—"}
        </td>
      </tr>
    `).join("");
  }

  document.querySelectorAll("[data-admin-cancel]").forEach(button => {
    button.addEventListener("click", () => {
      const booking = bookings.find(item => item.id === button.dataset.adminCancel);
      if (!booking || booking.status !== "Confirmed") return;
      if (!confirm("Cancel this reservation?")) return;

      booking.status = "Cancelled";
      saveData(KEYS.bookings, bookings);
      renderAdmin();
      renderTables();
      renderCustomerBookings($("lookup-email").value);
      showToast("Reservation cancelled.");
    });
  });

  renderWaitlist();
}

$("export-button").addEventListener("click", () => {
  if (!bookings.length) {
    showToast("There are no bookings to export.");
    return;
  }

  const columns = [
    "id", "name", "email", "phone", "date", "time",
    "table", "guests", "occasion", "status"
  ];

  const csvCell = value =>
    '"' + String(value ?? "").replace(/"/g, '""') + '"';

  const csv = [
    columns.join(","),
    ...bookings.map(booking =>
      columns.map(column => csvCell(booking[column])).join(",")
    )
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "restaurant-bookings.csv";
  link.click();
  URL.revokeObjectURL(url);

  showToast("Booking report exported.");
});

$("waitlist-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = $("wait-name").value.trim();
  const email = $("wait-email").value.trim().toLowerCase();
  const date = $("wait-date").value;
  const time = $("wait-time").value;

  if (date < today) {
    showToast("Please select today or a future date.");
    return;
  }

  const duplicate = waitlist.some(item =>
    item.email === email &&
    item.date === date &&
    item.time === time &&
    item.status === "Waiting"
  );

  if (duplicate) {
    showToast("This guest is already on the waitlist for that time.");
    return;
  }

  waitlist.push({
    id: "WL" + Date.now().toString().slice(-8),
    name,
    email,
    date,
    time,
    status: "Waiting"
  });

  saveData(KEYS.waitlist, waitlist);
  $("waitlist-form").reset();
  $("wait-date").min = today;
  renderWaitlist();
  showToast("Guest added to the waitlist.");
});

function renderWaitlist() {
  if (!waitlist.length) {
    $("waitlist-list").innerHTML =
      '<div class="empty-state">The waitlist is currently empty.</div>';
    return;
  }

  $("waitlist-list").innerHTML = waitlist.slice().reverse().map(item => `
    <article class="booking-card">
      <div>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.email)}</p>
        <p>${escapeHTML(item.date)} at ${escapeHTML(item.time)}</p>
        <span class="status">${escapeHTML(item.status)}</span>
      </div>
      <div>
        ${item.status === "Waiting" ? `
          <button class="small-button" data-wait-remove="${escapeHTML(item.id)}">
            Remove
          </button>
        ` : ""}
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-wait-remove]").forEach(button => {
    button.addEventListener("click", () => {
      waitlist = waitlist.filter(item => item.id !== button.dataset.waitRemove);
      saveData(KEYS.waitlist, waitlist);
      renderWaitlist();
      showToast("Waitlist entry removed.");
    });
  });
}

renderMenu();
renderTables();
updateSummary();
renderCustomerBookings();
renderReviews();
renderAdmin();
