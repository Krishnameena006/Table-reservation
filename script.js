
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

:root {
    --cream: #fbf6ee;
    --paper: #fffdf9;
    --brown: #56341f;
    --dark: #2d1c12;
    --accent: #925331;
    --border: #e8d9c7;
    --muted: #806e60;
    --green: #26754c;
    --red: #bd3737;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: var(--cream);
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    line-height: 1.6;
}

button, input, select, textarea {
    font: inherit;
}

button, a {
    -webkit-tap-highlight-color: transparent;
}

button {
    cursor: pointer;
}

a {
    color: inherit;
    text-decoration: none;
}

.navbar {
    min-height: 76px;
    padding: 14px 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    background: var(--paper);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 23px;
    white-space: nowrap;
}

.logo span {
    color: var(--accent);
}

.navbar nav {
    display: flex;
    align-items: center;
    gap: 26px;
}

.navbar nav a {
    font-size: 13px;
    color: #675344;
    transition: color .2s;
}

.navbar nav a:hover {
    color: var(--accent);
}

.nav-button, .primary-btn {
    background: var(--brown);
    color: white;
    border: 1px solid var(--brown);
    border-radius: 6px;
    padding: 12px 20px;
    display: inline-block;
    transition: .2s;
}

.nav-button {
    font-size: 13px;
    white-space: nowrap;
}

.nav-button:hover, .primary-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
}

.primary-btn:disabled {
    opacity: .45;
    cursor: not-allowed;
}

.secondary-btn {
    background: var(--paper);
    color: var(--brown);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 15px;
}

.secondary-btn:hover {
    background: #f2e5d7;
}

.hero {
    min-height: 580px;
    display: flex;
    align-items: center;
    padding: 65px 7%;
    color: white;
    background:
        linear-gradient(90deg, rgba(27, 16, 9, .90), rgba(27, 16, 9, .54) 52%, rgba(27, 16, 9, .12)),
        url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85")
        center 55% / cover no-repeat;
}

.hero-content {
    max-width: 690px;
}

.eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--accent);
    margin-bottom: 15px;
}

.hero .eyebrow {
    color: #e9c49b;
}

.hero h1, .page-banner h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 5vw, 64px);
    line-height: 1.12;
    font-weight: 600;
}

.hero h1 em {
    color: #e8c29b;
    font-weight: 400;
}

.hero-description {
    max-width: 475px;
    margin: 24px 0;
    color: #f4e9dc;
    font-size: 15px;
}

.highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 55px;
    font-size: 12px;
}

.welcome {
    max-width: 780px;
    margin: 0 auto;
    padding: 75px 24px 85px;
    text-align: center;
}

.welcome h2 {
    font: 600 clamp(27px, 3vw, 38px)/1.3 'Playfair Display', serif;
    margin-bottom: 17px;
}

.welcome > p:not(.eyebrow) {
    color: var(--muted);
    max-width: 630px;
    margin: 0 auto 25px;
}

.page {
    display: none;
    min-height: 65vh;
}

.page.active {
    display: block;
}

.page-banner {
    padding: 48px 7%;
    color: white;
    background:
        linear-gradient(90deg, rgba(33, 19, 10, .85), rgba(33, 19, 10, .35)),
        url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80")
        center 50% / cover no-repeat;
}

.page-banner .eyebrow {
    color: #e9c49b;
}

.page-banner h1 {
    font-size: clamp(34px, 4vw, 46px);
}

.page-banner > p:last-child {
    margin-top: 10px;
    color: #f3e5d7;
}

.booking-layout {
    max-width: 1300px;
    margin: 35px auto 65px;
    padding: 0 25px;
    display: grid;
    grid-template-columns: minmax(280px, .85fr) minmax(350px, 1.15fr);
    gap: 25px;
    align-items: start;
}

.panel {
    padding: 25px;
    background: var(--paper);
    border: 1px solid var(--border);
    border-radius: 10px;
    box-shadow: 0 6px 22px rgba(66, 43, 25, .04);
}

.panel h2 {
    font: 600 23px 'Playfair Display', serif;
    margin-bottom: 20px;
}

label {
    display: block;
    margin: 14px 0 6px;
    font-size: 12px;
    font-weight: 700;
}

input, select, textarea {
    width: 100%;
    padding: 11px 12px;
    border: 1px solid #dfd3c5;
    border-radius: 5px;
    background: white;
    color: var(--dark);
    outline: none;
}

input:focus, select:focus, textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(146, 83, 49, .09);
}

textarea {
    resize: vertical;
}

.full {
    width: 100%;
    margin-top: 18px;
}

.message {
    margin-top: 12px;
    font-size: 13px;
    color: var(--muted);
}

.message.error {
    color: var(--red);
}

.message.success {
    color: var(--green);
}

.legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 10px 0 20px;
    font-size: 11px;
    color: var(--muted);
}

.legend span {
    display: flex;
    align-items: center;
    gap: 6px;
}

.dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
}

.available {
    background: #27885a;
}

.occupied {
    background: #c33c37;
}

.selected-dot {
    background: #d58b27;
}

.restaurant-floor {
    padding: 18px;
    border: 5px solid #e0d1bd;
    border-radius: 7px;
    background:
        linear-gradient(rgba(130, 91, 56, .08), rgba(130, 91, 56, .08)),
        repeating-linear-gradient(90deg, #e7d2b4 0px, #e7d2b4 25px, #e0c7a5 26px, #e0c7a5 27px);
}

.floor-label, .entrance {
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #725034;
    padding: 8px;
}

.table-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px 10px;
    padding: 14px 0;
}

.table-seat {
    min-height: 65px;
    border: 2px solid #c8b18e;
    border-radius: 7px;
    color: #fff;
    background: #287650;
    font-size: 12px;
    font-weight: 700;
    transition: .15s;
}

.table-seat small {
    display: block;
    font-size: 9px;
    font-weight: 400;
}

.table-seat:hover:not(:disabled) {
    transform: translateY(-2px);
}

.table-seat.occupied {
    background: #b53e37;
    border-color: #9b2d29;
    cursor: not-allowed;
}

.table-seat.selected {
    background: #d28a26;
    border-color: #9a5c10;
    outline: 3px solid rgba(210, 138, 38, .2);
}

.table-seat:disabled {
    opacity: .85;
}

.summary {
    padding: 17px;
    margin-top: 20px;
    background: #f8f0e5;
    border-radius: 7px;
}

.summary h3 {
    font: 600 17px 'Playfair Display', serif;
    margin-bottom: 6px;
}

.summary p {
    color: var(--muted);
    font-size: 13px;
}

.lookup-panel {
    max-width: 550px;
    margin: 35px auto;
}

.results {
    max-width: 1100px;
    padding: 0 20px;
    margin: 0 auto 60px;
}

.booking-card {
    background: var(--paper);
    border: 1px solid var(--border);
    padding: 22px;
    margin-bottom: 15px;
    border-radius: 8px;
}

.booking-card h3 {
    font: 600 21px 'Playfair Display', serif;
    margin-bottom: 10px;
}

.booking-card p {
    font-size: 13px;
    margin: 5px 0;
}

.booking-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
}

.status {
    display: inline-block;
    border-radius: 4px;
    padding: 4px 9px;
    font-size: 11px;
    font-weight: 700;
    background: #d9efdf;
    color: #1d6839;
}

.status.cancelled {
    background: #f9dddd;
    color: #a72e2e;
}

.status.arrived {
    background: #dce8fb;
    color: #2c538f;
}

.status.completed {
    background: #e8e0f8;
    color: #644398;
}

.admin-login {
    min-height: 580px;
    padding: 50px 20px;
    display: grid;
    place-items: center;
    background:
        linear-gradient(rgba(47, 27, 15, .88), rgba(47, 27, 15, .88)),
        url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80")
        center / cover;
}

.login-card {
    width: min(100%, 390px);
    padding: 35px;
    background: var(--paper);
    border-radius: 10px;
    text-align: center;
}

.login-symbol {
    font-size: 38px;
    color: var(--accent);
}

.login-card h1 {
    font: 600 29px 'Playfair Display', serif;
}

.login-card > p {
    margin: 5px 0 20px;
    color: var(--muted);
}

.login-card form {
    text-align: left;
}

.login-card small {
    display: block;
    margin-top: 20px;
    color: var(--muted);
}

.dashboard {
    padding: 35px 4%;
}

.dashboard-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
}

.dashboard-heading h1 {
    font: 600 34px 'Playfair Display', serif;
}

.admin-actions {
    display: flex;
    gap: 10px;
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 25px;
}

.stat-card {
    padding: 20px;
    border: 1px solid var(--border);
    background: var(--paper);
    border-radius: 8px;
}

.stat-card span, .stat-card strong {
    display: block;
}

.stat-card span {
    color: var(--muted);
    font-size: 13px;
}

.stat-card strong {
    font: 600 30px 'Playfair Display', serif;
    margin-top: 5px;
}

.table-scroll {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    min-width: 850px;
}

th, td {
    padding: 13px 10px;
    text-align: left;
    border-bottom: 1px solid var(--border);
}

th {
    background: #f7efe4;
    font-weight: 700;
}

td button {
    margin: 2px;
    font-size: 11px;
}

.hidden {
    display: none !important;
}

footer {
    padding: 35px 20px;
    text-align: center;
    background: #321f14;
    color: #f6e8d7;
}

.footer-logo {
    display: inline-block;
    color: white;
}

.footer-logo span {
    color: #d4a77b;
}

footer p {
    font-size: 13px;
    margin-top: 8px;
    color: #dfc9b2;
}

footer small {
    display: block;
    margin-top: 15px;
    color: #cdb39b;
}

.late-note {
    font-size: 12px;
}

.modal {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(25, 15, 9, .72);
    padding: 20px;
    display: grid;
    place-items: center;
    overflow-y: auto;
}

.receipt {
    position: relative;
    background: white;
    width: min(100%, 480px);
    padding: 35px;
    border-radius: 9px;
}

.close-button {
    position: absolute;
    top: 8px;
    right: 14px;
    border: 0;
    background: none;
    font-size: 29px;
}

.receipt-brand {
    font: 700 25px 'Playfair Display', serif;
    color: var(--brown);
    text-align: center;
}

.receipt h2 {
    font: 600 24px 'Playfair Display', serif;
    text-align: center;
    margin: 10px 0 15px;
}

#receiptStatus {
    display: table;
    margin: 0 auto 20px;
}

.receipt-line {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 9px 0;
    border-bottom: 1px dashed #ddd;
    font-size: 13px;
}

.receipt-line span:first-child {
    color: var(--muted);
}

.receipt-line span:last-child {
    text-align: right;
    font-weight: 600;
    overflow-wrap: anywhere;
}

.receipt-actions {
    display: flex;
    gap: 10px;
    margin-top: 25px;
}

.receipt-actions button {
    flex: 1;
}

.late-warning {
    color: var(--red);
    background: #fff0ef;
    padding: 12px;
    margin-top: 15px;
    font-size: 12px;
    border-radius: 5px;
}

@media (max-width: 900px) {
    .navbar {
        flex-wrap: wrap;
    }

    .navbar nav {
        order: 3;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
    }

    .booking-layout {
        grid-template-columns: 1fr;
    }

    .hero {
        min-height: 520px;
    }
}

@media (max-width: 560px) {
    .navbar {
        padding: 12px 4%;
        gap: 12px;
    }

    .logo {
        font-size: 20px;
    }

    .nav-button {
        padding: 9px 11px;
    }

    .navbar nav {
        gap: 12px;
    }

    .navbar nav a {
        font-size: 11px;
    }

    .hero {
        padding: 45px 7%;
        min-height: 510px;
        background-position: 58% center;
    }

    .hero h1 {
        font-size: 39px;
    }

    .highlights {
        gap: 12px;
        margin-top: 35px;
    }

    .booking-layout {
        padding: 0 12px;
        margin-top: 20px;
    }

    .panel {
        padding: 17px;
    }

    .table-grid {
        gap: 10px 6px;
    }

    .table-seat {
        min-height: 58px;
        font-size: 10px;
    }

    .dashboard-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .stats {
        grid-template-columns: 1fr;
    }

    .receipt {
        padding: 25px 18px;
    }
}

@media print {
    body * {
        visibility: hidden;
    }

    #receiptModal, #receiptModal * {
        visibility: visible;
    }

    #receiptModal {
        display: block !important;
        position: absolute;
        inset: 0;
        background: white;
        padding: 0;
        overflow: visible;
    }

    .receipt {
        width: 100%;
        max-width: none;
        box-shadow: none;
        border: none;
        padding: 20px;
    }

    .no-print {
        display: none !important;
    }
}
