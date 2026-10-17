# Admin guide (for the client)

Open `https://YOUR-SITE/admin` (or click the small person icon in the website header) and sign in.

## Editing website content
1. In the left menu choose an area: **Site Settings, Home, About, Open Access, Resources, Contact, Request-for-Waiver, FAQs, Images & Logo**.
2. The page shows a form that mirrors the website. Change any text, then press **Save** (top right). The website updates immediately.
3. **Lists** (journals, FAQs, trustees, fees…): use ⬆ ⬇ to reorder, ⧉ to duplicate, 🗑 to remove, and **Add item** for a new one.
4. **Reset to defaults** undoes every edit in that area. **View live** opens the page.

## Common tasks
| I want to… | Go to… |
|---|---|
| Set the **Submit Manuscript** link | Site Settings → Links → *Submit Manuscript Url*. Leave empty to send visitors to the Contact page. Every Submit Manuscript button on the site uses it. |
| Set the **LinkedIn** icon link | Site Settings → Links → *Linkedin Url* (clear it to hide the icon) |
| Change the phone / email / footer text | Site Settings → Brand |
| Rename or reorder menu items | Site Settings → Nav → Main |
| Add or edit a **journal** | Home Page → Journals (also appears on the Journals page) |
| Change **fees** or waiver text | Open Access Page |
| Add a **downloadable PDF** | Resources Page → open the item → *File or link URL* → **Upload** |
| Replace the **logo** or a photo | Images & Logo → the image → **Upload** |
| Edit **FAQs** | FAQs (one group per page) |
| Change a **form label or button** | Site Settings → Ui → Forms |

## Links
In any *Link* field you can type a page path (`/about`, `/contact`, `/open-access`), a full web address (`https://…`, opens in a new tab), `mailto:…` or `tel:…`. The special value `@submit` means "the Submit Manuscript URL".
Icons use Google *Material Symbols* names (browse fonts.google.com/icons), e.g. `verified`, `mail`.

## Submissions
Under **Submissions** you can read contact inquiries, waiver requests, print-sample requests and newsletter subscribers, change their status, download attachments and delete records. A number badge shows items marked *new*.

## Admin accounts
**Admins & Password** lets you add or remove admins and change your own password (10+ characters).

## Good to know
- Images/files you upload are limited to 15 MB each (PNG, JPG, WEBP, GIF, PDF, DOCX, XLSX, ZIP). Resize photos to about 1600 px wide for fast pages.
- Form field labels, placeholders, button text and confirmation messages are editable under **Site Settings → Ui → Forms**. The *dropdown choices* inside the Contact and Waiver forms (categories, author status…) are fixed in code because the server validates them, and the small “coming soon” and “page not found” pages are not editable yet.
