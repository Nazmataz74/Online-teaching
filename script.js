
// FREE STATIC BOOKING SETUP
// Add available appointment times to AVAILABLE_SLOTS.
// Format: "YYYY-MM-DD HH:MM"
// Times should be in Thailand time (ICT, UTC+7).

const AVAILABLE_SLOTS = [
  // Monday, Wednesday and Friday — Thailand time (UTC+7)
  // Each appointment is 30 minutes.
  "2026-10-12 09:00",
  "2026-10-12 09:30",
  "2026-10-12 10:00",
  "2026-10-12 10:30",

  "2026-10-14 09:00",
  "2026-10-14 09:30",
  "2026-10-14 10:00",
  "2026-10-14 10:30",

  "2026-10-16 09:00",
  "2026-10-16 09:30",
  "2026-10-16 10:00",
  "2026-10-16 10:30",

  "2026-10-19 09:00",
  "2026-10-19 09:30",
  "2026-10-19 10:00",
  "2026-10-19 10:30",

  "2026-10-21 09:00",
  "2026-10-21 09:30",
  "2026-10-21 10:00",
  "2026-10-21 10:30",

  "2026-10-23 09:00",
  "2026-10-23 09:30",
  "2026-10-23 10:00",
  "2026-10-23 10:30",

  "2026-10-26 09:00",
  "2026-10-26 09:30",
  "2026-10-26 10:00",
  "2026-10-26 10:30",

  "2026-10-28 09:00",
  "2026-10-28 09:30",
  "2026-10-28 10:00",
  "2026-10-28 10:30",

  "2026-10-30 09:00",
  "2026-10-30 09:30",
  "2026-10-30 10:00",
  "2026-10-30 10:30"
];

const email = "nickpaulteaching@gmail.com";

function initBooking() {
  const cal = document.getElementById("calendar");
  if (!cal) return;

  let view = new Date();
  view.setDate(1);

  function render() {
    cal.innerHTML = "";

    const y = view.getFullYear();
    const m = view.getMonth();

    const bar = document.createElement("div");
    bar.className = "monthbar";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.textContent = "←";
    prev.setAttribute("aria-label", "Previous month");
    prev.onclick = () => {
      view.setMonth(view.getMonth() - 1);
      render();
    };

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "→";
    next.setAttribute("aria-label", "Next month");
    next.onclick = () => {
      view.setMonth(view.getMonth() + 1);
      render();
    };

    const title = document.createElement("strong");
    title.textContent = view.toLocaleString("en-GB", {
      month: "long",
      year: "numeric"
    });

    bar.append(prev, title, next);
    cal.append(bar);

    const slotsThisMonth = AVAILABLE_SLOTS.filter(slot => {
      const date = slot.split(" ")[0];
      return date.startsWith(
        `${y}-${String(m + 1).padStart(2, "0")}-`
      );
    });

    if (AVAILABLE_SLOTS.length === 0) {
      const message = document.createElement("p");
      message.className = "section-intro";
      message.textContent =
        "No appointment times are published just now. Please email Nick to request a suitable time.";
      cal.append(message);
    } else if (slotsThisMonth.length === 0) {
      const message = document.createElement("p");
      message.className = "section-intro";
      message.textContent =
        "No appointment times are listed for this month. Try another month or email Nick to enquire.";
      cal.append(message);
    }

    const days = document.createElement("div");
    days.className = "days";

    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(day => {
      const heading = document.createElement("div");
      heading.className = "dayhead";
      heading.textContent = day;
      days.append(heading);
    });

    const first = (new Date(y, m, 1).getDay() + 6) % 7;
    const count = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < first; i++) {
      days.append(document.createElement("div"));
    }

    for (let d = 1; d <= count; d++) {
      const cell = document.createElement("div");
      cell.className = "day";

      const num = document.createElement("div");
      num.className = "daynum";
      num.textContent = d;
      cell.append(num);

      const prefix =
        `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

      AVAILABLE_SLOTS
        .filter(slot => slot.startsWith(prefix))
        .forEach(slot => {
          const time = slot.split(" ")[1];
          const button = document.createElement("button");

          button.type = "button";
          button.className = "slot";
          button.textContent = `${time} — request`;
          button.onclick = () => requestSlot(slot);

          cell.append(button);
        });

      days.append(cell);
    }

    cal.append(days);
  }

  function requestSlot(slot) {
    const name = prompt("Your name:");
    if (!name) return;

    const from = prompt("Your email address:");
    if (!from) return;

    const goal =
      prompt("What would you like to improve? (optional)") || "";

    const subject = encodeURIComponent(
      "English coaching booking request — " + slot
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${from}\n` +
      `Requested slot: ${slot} (Thailand time, UTC+7)\n` +
      `Goal: ${goal}\n\n` +
      "Please confirm availability and payment details."
    );

    window.location.href =
      `mailto:${email}?subject=${subject}&body=${body}`;
  }

  render();
}

document.addEventListener("DOMContentLoaded", initBooking);

