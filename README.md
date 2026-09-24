# Nick Paul English Coaching — free GitHub Pages website

A self-contained static website using only HTML, CSS, JavaScript and the supplied portrait. No paid website builder, hosting plan, database or booking subscription is required.

## Put it online for £0

1. Create/sign in to a GitHub account.
2. Create a **public** repository named `YOUR-GITHUB-USERNAME.github.io`.
3. Upload the contents of this folder to the repository root. Do not upload the outer project folder itself.
4. In the repository, open **Settings → Pages**.
5. Choose **Deploy from a branch**, select `main`, folder `/ (root)`, and save.
6. Your site will be available at `https://YOUR-GITHUB-USERNAME.github.io/` after GitHub publishes it.

## Change availability

Open `script.js` and edit `AVAILABLE_SLOTS`, for example:

```js
const AVAILABLE_SLOTS = [
  "2026-10-05 09:00",
  "2026-10-05 09:30",
  "2026-10-07 10:00"
];
```

Save, commit and push the change. The calendar updates when the site republishes.

## Important limitation

This is a genuinely free starter site. The booking calendar is a visual availability/request system, not a real-time database. Booking requests open an email to `nickpaulteaching@gmail.com`. There is no automatic double-booking prevention.

A payment provider, automated calendar booking and secure customer records can be added later. Those services may charge transaction or subscription fees.

## Editing the copy

The main pages are:
- `index.html` — home
- `about.html` — about
- `pricing.html` — £15 / 30 minutes
- `booking.html` — availability calendar
- `privacy.html` — privacy template
- `terms.html` — terms template
- `style.css` — design
- `script.js` — availability

The legal pages are templates and should be reviewed for the laws and consumer requirements that apply to the actual business.
