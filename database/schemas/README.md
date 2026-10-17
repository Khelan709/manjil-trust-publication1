# Data model

The source of truth is the Mongoose models in `backend/src/models/`. Quick overview:

| Collection | Model | Purpose | Written by |
|---|---|---|---|
| `contents` | `Content.js` | Admin-edited website content, one document per area (`settings`, `home`, `about`, `openAccess`, `resources`, `contact`, `waiver`, `faqs`, `images`) | Admin panel |
| `adminusers` | `AdminUser.js` | Admin accounts (bcrypt password hash) | first-run env / admin panel |
| `media` | `Media.js` | Uploaded files **stored in the database**: admin uploads (public) and form attachments (private) | admin panel, forms |
| `inquiries` | `Inquiry.js` | Contact form submissions | `POST /api/contact` |
| `waiverrequests` | `WaiverRequest.js` | APC waiver requests | `POST /api/waiver-requests` |
| `samplerequests` | `SampleRequest.js` | Library print-sample requisitions | `POST /api/sample-requests` |
| `newslettersubscribers` | `NewsletterSubscriber.js` | Email subscribers (unique email) | `POST /api/newsletter` |

## How content works
- Default copy lives in `frontend/src/data/*.js` and is bundled as `DEFAULT_CONTENT` (`data/defaults.js`).
- `contents.data` stores the admin's full edited version of an area. The site deep-merges it over the defaults, so the site still renders if the API is down and new default fields appear automatically.
- Allowed content keys are listed in `backend/src/models/Content.js` (`CONTENT_KEYS`) and must match `DEFAULT_CONTENT`.

## Enums shared with the frontend
Inquiry categories, waiver author status / waiver type / journal track and sample disciplines are validated by the API and listed in `frontend/src/data/contact.js`, `waiver.js` and `resources.js`. Change both sides together.
