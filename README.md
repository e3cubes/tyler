# Lowville Little League (demo site)

A simple, static demo website for **Lowville Little League**: locations, photos, contacts, archives, an information hub, and an officers-only portal.

**This is a pitch demo.** All names, emails, phone numbers, addresses, and documents are placeholders. Nothing is connected to Google Drive yet. Every content section is designed to show *where* the league would manage that content in Google Drive or Google Sheets once it's live.

Live URL (once Pages is enabled): https://tyler.evanjennings.com

## What's in the repo

| File | Purpose |
|---|---|
| `index.html` | The whole site (single page) |
| `styles.css` | Styles: Lowville purple, white, and black |
| `app.js` | Mobile menu, demo officers login, demo Drive link toasts |
| `assets/` | Team photo, baseball mark, favicon, and touch icon |
| `CNAME` | Custom domain for GitHub Pages (`tyler.evanjennings.com`) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

No build step. Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Officers portal (demo)

Click **Officers login** and enter the password **`lowville`**.

This is a **client-side demo gate only**, not real security: anyone can read the password in `app.js`. In the live version, officers would sign in with Google and only see files from a Drive folder shared with board members.

## How content maps to Google Drive (planned)

Each section on the site has a "Managed in Google Drive" badge and a folder path. The plan:

```
Drive / Lowville Little League /
├── Locations            (Google Sheet)  → Locations table
│     columns: Field name | Address | Used for | Map note
├── Contacts             (Google Sheet)  → Contact section
│     columns: Role | Name | Email | Phone
├── Photos/              (folder)        → Photo gallery; subfolders become albums
├── Archives/            (folder)        → Archives list (PDFs/Docs, newest first)
├── Info Hub/            (folder)        → Info Hub cards, one per subfolder
│     ├── Handbooks/
│     ├── Forms/
│     ├── Schedules/
│     └── Rules/
└── Officers (Private)/  (folder, shared with board only) → Officers portal
```

Possible ways to wire it up later (no server needed for the public parts):

- **Sheets**: "File → Share → Publish to web" as CSV, then fetch the CSV from `app.js` and render the rows.
- **Folders**: a small Google Apps Script web app that lists a folder's files as JSON, or the Drive API with an API key for public folders.
- **Officers**: Google Sign-In plus a Drive folder shared only with board accounts, so Google handles who can see what.

## Publishing on GitHub Pages

1. Push this repo to `e3cubes/tyler` on the `main` branch.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
4. **Custom domain** should show `tyler.evanjennings.com` (it comes from the `CNAME` file). Tick **Enforce HTTPS** once the certificate is ready (it can take a few minutes up to about an hour).

### DNS

At the DNS provider for `evanjennings.com`, add:

| Type | Host / Name | Value |
|---|---|---|
| CNAME | `tyler` | `e3cubes.github.io` |

For a subdomain, use a CNAME record, not A records. If GitHub's Pages settings show a different target, use that one. Check it with:

```bash
dig tyler.evanjennings.com +short
```

## Credits

Team photo from the league's public Facebook photos page:
https://www.facebook.com/profile.php?id=100068575132580&sk=photos

Thanks to our sponsor, Roggie's Flooring Center.
