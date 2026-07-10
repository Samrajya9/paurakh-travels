Implementation Plan: Activities, Categories, Themes & Seasons CRUD Modules
Complete four CRUD modules following the exact pattern of the destinations module. All four share the same shape: a single name field, identical service signatures, and the same UI structure (modal-based create/edit, table listing, select component, Server Component page).

Proposed Changes
Each of the four modules below gets the same set of files. I will list them once and replicate for Activities, Categories, Themes, and Seasons.

1. Modal Registry
   [MODIFY]
   modal-component-registry.ts
   Add 8 new modal IDs:

CREATE_ACTIVITY_MODAL_ID, EDIT_ACTIVITY_MODAL_ID
CREATE_CATEGORY_MODAL_ID, EDIT_CATEGORY_MODAL_ID
CREATE_THEME_MODAL_ID, EDIT_THEME_MODAL_ID
CREATE_SEASON_MODAL_ID, EDIT_SEASON_MODAL_ID 2. Sidebar Navigation
[MODIFY]
app-sidebar.tsx
Add a new "Taxonomy" nav group containing links to:

/admin/activities
/admin/categories
/admin/themes
/admin/seasons 3. Per-Module Files (×4 modules)
For each module (activities, categories, themes, seasons), the following files are created:

API Routes
[NEW] src/app/api/{module}/route.ts — GET (list all) + POST (create)
[NEW] src/app/api/{module}/[id]/route.ts — GET (by ID) + PATCH (update) + DELETE
Admin UI
[NEW] src/app/(admin)/admin/{module}/hooks/{singular}-form.hook.ts — Custom useForm hook
[NEW] src/app/(admin)/admin/{module}/components/{singular}-form-fields.tsx — Shared form fields
[NEW] src/app/(admin)/admin/{module}/components/create-{singular}-form.tsx — Create form + modal close
[NEW] src/app/(admin)/admin/{module}/components/edit-{singular}-form.tsx — Edit form
[NEW] src/app/(admin)/admin/{module}/components/add-{singular}-btn.tsx — Button to open create modal
[NEW] src/app/(admin)/admin/{module}/components/{singular}-table.tsx — Table with edit/delete actions
[NEW] src/app/(admin)/admin/{module}/components/{singular}-select.tsx — Reusable select dropdown
[NEW] src/app/(admin)/admin/{module}/components/{singular}-client-page.tsx — Client state container
[NEW] src/app/(admin)/admin/{module}/page.tsx — Server Component page (SSR data fetch)
File Count Summary
Area Files per module Total (×4)
API routes 2 8
Hook 1 4
Components 8 32
Page 1 4
Total new files 12 48
Modified shared files — 2 (modal registry + sidebar)
Verification Plan
Manual Verification
Navigate to each admin page and verify the table renders
Create, edit, and delete entries via the modal forms
Verify the select components render options correctly
