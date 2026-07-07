# Paurakh Travels — Development Plan

Status: **Planning only — no code has been changed.** This document is the
deliverable requested: analysis, task breakdown, branch/commit plan, and
architecture review for the five requested features.

---

## 0. Codebase Analysis Summary

The project already follows its own stated architecture closely:
`page.tsx`/`layout.tsx` are Server Components, business logic lives in
`src/services`, Zod schemas gate every API route, and Prisma is never
touched outside the service layer. That consistency changes how these
features should be built — in most cases the backend already exists and
the actual work is wiring the frontend to it, not building new endpoints.

Key findings per feature area:

| Area | Finding |
|---|---|
| **Package search dropdown** | `HeroSearch` is a plain `<input>` that pushes `?q=` to `/packages`. No debounce, no suggestions, no API support for querying by name. A `Combobox` primitive (`src/components/ui/combobox.tsx`, base-ui) already exists and is unused anywhere in the app. |
| **PackageLike** | `PackageLike` component (client debounce + optimistic UI) is already built. `GET /api/auth/me/liked-packages` already returns all liked package IDs for the current user. But `PackageCard` hardcodes `liked={true}` on every card — there's a literal `// TODO` comment in the file admitting this. No global store exists to hold the liked-ID list. |
| **Single package page** | `packages/[slug]/page.tsx` and every one of its seven `_components/*` files render **100% hardcoded/mock data** (`MOCK_IMAGES`, `rawHtmlString`, `itineraryData`, `GLANCE_STATS`, `ROUTE_STOPS`). The page doesn't even read `params.slug`. `getPackageBySlug()` already exists in `package.service.ts` and is unused. |
| **`/api/packages/slug/[slug]`** | Doesn't exist. Trivial to add — the service function is already written. |
| **Media library** | The entire backend already exists and works: `Image` + `ImageAttachment` Prisma models, full `image.service.ts` CRUD (including `?search=`), full `image-attachment.service.ts`, `POST /api/images` (multipart upload → local disk → DB row), `GET/PATCH/DELETE /api/images/[id]`, `POST /api/image-attachments`, `DELETE /api/image-attachments/[id]`. **Nothing on the frontend consumes any of it** — there is no admin media page, no picker, no selector, and no package/destination/region form currently attaches images at all. |
| **Packages listing page** | `(website)/packages/page.tsx` renders the same hardcoded `packageData` object three times. It isn't in the original request list, but it blocks a meaningful demo of the search dropdown, so I've included it as a small dependent task. |

---

## 1. TODOs

### TODO-001
**Title:** Centralize liked-package IDs in a global provider
**Description:** Add a `LikedPackagesProvider` (client context) mirroring the existing `AuthProvider` pattern. Hydrate it server-side in `(website)/layout.tsx` by calling `getAllLikedPackageIdsForUser(user.id)` when a user is present (same server-first pattern already used for `AuthProvider initialUser`). Expose `likedPackageIds: Set<string>`, plus `markLiked`/`markUnliked` setters so `PackageLike` can optimistically update the shared set instead of only local state.
**Complexity:** Medium
**Dependencies:** None (consumes existing `getAllLikedPackageIdsForUser` + existing auth pattern)
**Files:**
- `src/context/liked-packages.context.tsx` (new)
- `src/app/(website)/layout.tsx`
- `src/services/user-package-like.service.ts` (no change expected, just consumed)
**Acceptance Criteria:**
- On first load, a logged-in user's liked package IDs are fetched once, server-side, not via a client `useEffect`.
- Logged-out users get an empty set and zero extra requests.
- `PackageLike`'s internal debounce/optimistic-update logic is preserved; it now also updates the shared context on confirmed success.
**Suggested order:** 1st

---

### TODO-002
**Title:** Fix `PackageCard` liked-state wiring
**Description:** Remove the hardcoded `liked={true}` in `package-card.tsx` and resolve `PackageLike`'s `liked` prop from `LikedPackagesProvider` (`likedPackageIds.has(pkg.id)`). Delete the now-dead `isLiked`/`onLikeToggle` props on `PackageCardProps` since the source of truth moved to context.
**Complexity:** Low
**Dependencies:** TODO-001
**Files:**
- `src/components/cards/package-card.tsx`
**Acceptance Criteria:**
- Every package card reflects the actual liked state for the current user, not a hardcoded value.
- No card-level prop drilling of liked state is required from parent pages.
**Suggested order:** 2nd

---

### TODO-003
**Title:** Add `GET /api/packages/slug/[slug]`
**Description:** New route calling the already-existing `getPackageBySlug(slug)` service function. Follows the exact pattern of `api/packages/[id]/route.ts`.
**Complexity:** Low
**Dependencies:** None
**Files:**
- `src/app/api/packages/slug/[slug]/route.ts` (new)
**Acceptance Criteria:**
- `GET /api/packages/slug/everest-base-camp-trek` returns the full `PackageWithImages` payload.
- Unknown slug returns `404` via the existing `AppError`/`handleApiError` path (already thrown inside `getPackageBySlug`).
**Suggested order:** 3rd (do early — trivial, and 004 depends on it existing conceptually, even though the page will call the service directly rather than fetch this route internally — see Architecture note in §6)

---

### TODO-004
**Title:** Fetch the real package by slug on the detail page
**Description:** Convert `packages/[slug]/page.tsx` to read `params.slug`, call `getPackageBySlug` directly (Server Component → service, no internal HTTP round-trip — see §6), and call Next's `notFound()` on a missing package instead of always rendering the Everest mock. This TODO only wires the top-level data fetch; sub-component prop wiring is 005–008.
**Complexity:** Medium
**Dependencies:** TODO-003 (for the public API contract other clients may want; the page itself can call the service directly)
**Files:**
- `src/app/(website)/packages/[slug]/page.tsx`
**Acceptance Criteria:**
- Visiting `/packages/<real-slug>` renders that package's real `name`/`slug`/`basePrice`/etc. at the top level.
- Visiting `/packages/<bogus-slug>` renders the Next.js not-found page.
- No client-side fetch is introduced for the initial page data.
**Suggested order:** 4th

---

### TODO-005
**Title:** Wire real images into `PackageHero` / `PackageImage` / `PhotoStack`
**Description:** Replace `MOCK_IMAGES` (Unsplash URLs) in `package_hero.tsx` with the package's actual `images` (from `ImageAttachment[]`, already resolved by `getPackageBySlug`). Update `PackageImageProps`/`PhotoStackProps` call sites accordingly.
**Complexity:** Medium
**Dependencies:** TODO-004
**Files:**
- `src/app/(website)/packages/[slug]/_components/package_hero.tsx`
- `src/app/(website)/packages/[slug]/_components/package_image.tsx`
- `src/app/(website)/packages/[slug]/_components/photo_stack.tsx`
**Acceptance Criteria:**
- Photo gallery shows the package's uploaded images from `public/uploads`, not stock photography.
- Packages with 0 images degrade gracefully (placeholder, not a broken layout).
**Suggested order:** 5th

---

### TODO-006
**Title:** Render real `htmlOverview` instead of mock content
**Description:** `overview.tsx` currently defines its own `rawHtmlString` identical to the seeded Everest package. Replace with the package's real `htmlOverview` field, passed down from `page.tsx`.
**Complexity:** Low
**Dependencies:** TODO-004
**Files:**
- `src/app/(website)/packages/[slug]/_components/overview.tsx`
**Acceptance Criteria:**
- Overview section renders the specific package's actual Tiptap-authored HTML.
- See §7 for a sanitization recommendation before this ships broadly.
**Suggested order:** 6th

---

### TODO-007
**Title:** Wire itinerary, at-a-glance stats, and route map to real data
**Description:** Largest sub-task of the page-integration epic. `Itinerary.tsx` currently imports the static `itineraryData` from `src/types/package_detail_data.ts` — replace with the package's real `itineraries` (with nested `destinations`). `PackageSummaryCard`'s `GLANCE_STATS` and `package_route_map`'s `ROUTE_STOPS` are hand-typed in `page.tsx` — derive them from `pkg.itineraries[].destinations[].destination` (name, elevation, lat/lng) and `pkg.difficulty.name` instead.
**Complexity:** High
**Dependencies:** TODO-004
**Files:**
- `src/app/(website)/packages/[slug]/page.tsx`
- `src/app/(website)/packages/[slug]/_components/Itinerary.tsx`
- `src/app/(website)/packages/[slug]/_components/package_summary_card.tsx`
- `src/app/(website)/packages/[slug]/_components/package_route_map.tsx`
- `src/types/package_detail_data.ts` (delete once unused)
**Acceptance Criteria:**
- Itinerary day-by-day view matches the package's real `itineraries` array, in `dayNumber` order.
- Route map plots the real destination coordinates for that package, not the fixed Everest route.
- `package_detail_data.ts` mock export is deleted, not just unreferenced.
**Suggested order:** 7th

---

### TODO-008
**Title:** Connect booking sidebar to real pricing
**Description:** `booking_sidebar.tsx` doesn't currently take price/discount props at all. Wire it to the package's real `basePrice` and `groupDiscounts`, reusing the existing `src/lib/pricing.ts` helper (already used elsewhere) rather than re-deriving discount math inline.
**Complexity:** Medium
**Dependencies:** TODO-004
**Files:**
- `src/app/(website)/packages/[slug]/_components/booking_sidebar.tsx`
**Acceptance Criteria:**
- Sidebar shows the real base price and, if applicable, the lowest group-discount tier, using `lib/pricing.ts`.
**Suggested order:** 8th

---

### TODO-009
**Title:** Add search-query support to the packages API
**Description:** `GET /api/packages` has no filtering today. Add an optional `?q=` param to `getAllPackages` (mirroring the existing `getAllImages(search)` pattern) filtering on `name`/`description`.
**Complexity:** Low
**Dependencies:** None
**Files:**
- `src/services/package.service.ts`
- `src/app/api/packages/route.ts`
**Acceptance Criteria:**
- `GET /api/packages?q=everest` returns only matching packages.
- Omitting `q` preserves current behavior exactly.
**Suggested order:** Can start anytime; needed before TODO-010

---

### TODO-010
**Title:** Searchable dropdown for the package search bar
**Description:** Replace `HeroSearch`'s plain `<input>` with the existing `Combobox` primitive (`src/components/ui/combobox.tsx`), debounced (new `useDebouncedValue` hook), querying `GET /api/packages?q=` (TODO-009) for live suggestions, each linking to `/packages/[slug]`. Keep the existing "press Enter → go to `/packages?q=`" fallback behavior for full-results browsing.
**Complexity:** Medium
**Dependencies:** TODO-009
**Files:**
- `src/app/(website)/components/hero-search.tsx`
- `src/hooks/use-debounced-value.ts` (new)
**Acceptance Criteria:**
- Typing shows a live, debounced dropdown of matching packages (name + thumbnail) sourced from the real API.
- Keyboard navigation and `Esc` work per `Combobox` primitive defaults.
- Submitting without selecting a suggestion still falls back to `/packages?q=`.
**Suggested order:** After TODO-009

---

### TODO-011
**Title:** Wire the packages listing page to live data
**Description:** `(website)/packages/page.tsx` renders the same mock `packageData` three times. Convert to a Server Component that calls `getAllPackages()` (optionally forwarding `searchParams.q` into TODO-009's filter) and renders one `PackageCard` per real result.
**Complexity:** Low–Medium
**Dependencies:** TODO-009 (to make `?q=` from the hero search actually filter something)
**Files:**
- `src/app/(website)/packages/page.tsx`
**Acceptance Criteria:**
- Page shows every real package from the DB, not three copies of one mock object.
- `/packages?q=everest` shows filtered results consistent with the search dropdown.
**Suggested order:** After TODO-009, independent of TODO-010

---

### TODO-012
**Title:** Admin media library page (list, upload, delete)
**Description:** New admin page listing all `Image` rows (grid of thumbnails, `altText`, upload date), with an upload control (multipart → existing `POST /api/images`) and delete action (existing `DELETE /api/images/[id]`) per image, following the existing admin table/dialog conventions (`region-table.tsx` + `create-region-form.tsx` pattern: dialog-based for simple CRUD).
**Complexity:** Medium
**Dependencies:** None (backend fully exists)
**Files:**
- `src/app/(admin)/admin/media/page.tsx` (new)
- `src/app/(admin)/admin/media/components/media-grid.tsx` (new)
- `src/app/(admin)/admin/media/components/upload-image-button.tsx` (new)
- `src/app/(admin)/admin/media/components/media-delete-button.tsx` (new)
- `src/components/app-sidebar.tsx` (add nav entry)
**Acceptance Criteria:**
- Admin can upload an image and immediately see it in the grid.
- Admin can delete an image; UI reflects the cascade note already documented in `image.service.ts` (deleting removes all attachments, by design).
- Deletion and upload both surface `handleApiError` failures via `sonner` toasts, consistent with existing admin forms.
**Suggested order:** Can start anytime — fully independent

---

### TODO-013
**Title:** Image picker dialog component
**Description:** A dialog (registered in `MODAL_REGISTRY`, using the existing `DialogProvider`/`useDialogContext`) showing a searchable (`?search=`), paginated-or-infinite-scroll grid of existing images, with an inline "upload new" affordance, and a single-select confirm action.
**Complexity:** Medium
**Dependencies:** None functionally, but should reuse whatever grid component TODO-012 builds rather than duplicating it — sequence after 012 for reuse, not because of a hard dependency.
**Files:**
- `src/components/media/image-picker-dialog.tsx` (new)
- `src/constants/modal/modal-component-registry.ts` (add `IMAGE_PICKER_MODAL_ID`)
**Acceptance Criteria:**
- Opening the picker shows existing images with a live search box (debounced, hitting `GET /api/images?search=`).
- Selecting an image and confirming closes the dialog and returns that image's `id` to the caller.
- Uploading from inside the picker adds the new image to the grid and can be selected immediately.
**Suggested order:** After TODO-012 (for component reuse)

---

### TODO-014
**Title:** Reusable `ImageSelector` component
**Description:** A form-friendly wrapper — a thumbnail/placeholder button that opens the TODO-013 dialog and exposes the selected image id via a controlled `value`/`onChange` API (React Hook Form `Controller`-compatible), matching the calling convention of `DestinationSelect`/`DifficultySelect`.
**Complexity:** Low–Medium
**Dependencies:** TODO-013
**Files:**
- `src/components/media/image-selector.tsx` (new)
**Acceptance Criteria:**
- `<ImageSelector value={imageId} onChange={setImageId} />` works standalone and inside `react-hook-form` via `Controller`, mirroring existing `*-select.tsx` components' prop shape.
- Shows the currently selected image's thumbnail when `value` is set.
**Suggested order:** After TODO-013

---

### TODO-015 *(stretch — not explicitly requested, flagged for visibility)*
**Title:** Wire `ImageSelector` into package/destination/region admin forms
**Description:** None of the current admin forms attach any images (confirmed while reading `package-form-fields.tsx`). "Return the selected image id" only has value once something consumes it. This task adds an images field to at least the package create/edit form, calling `POST /api/image-attachments` with `entityType: "PACKAGE"` after the entity is saved.
**Complexity:** Medium
**Dependencies:** TODO-014
**Files:**
- `src/app/(admin)/admin/packages/components/package-form-fields.tsx`
- `src/app/(admin)/admin/packages/hooks/use-package-form.ts`
**Acceptance Criteria:**
- Admin can attach one or more images to a package from the create/edit form.
- Attached images appear via the existing `getAttachmentsForEntity` call already wired into `package.service.ts`.
**Suggested order:** Last — confirm with product owner whether this is in scope before starting.

---

## 2. Branch Recommendations

| TODOs | Branch | Why its own branch |
|---|---|---|
| 001–002 | `feature/package-like-global-state` | Touches shared context + layout; a regression here silently breaks the like button everywhere, so it should land and be reviewed as one focused unit, separate from unrelated page work. |
| 003–008 | `feature/package-detail-api-integration` | Large, multi-file, all tightly coupled to one page. Isolating it avoids a half-migrated detail page landing on `main` mid-way through a different feature's review cycle. |
| 009–011 | `feature/package-search` | Touches the API contract (`/api/packages`) and two pages; keeping it separate from the detail-page work avoids merge conflicts in `package.service.ts` and lets search ship independently once ready. |
| 012–014 (015 optional) | `feature/media-library` | Entirely new admin surface with zero overlap with the other three branches — safe to develop fully in parallel and merge whenever it's ready, independent of the others. |

All four are legitimate feature branches rather than direct-to-`main` work: each is multi-commit, each has independent acceptance criteria, and none of them are one-line fixes that would justify skipping review.

## 3. Commit Messages (Conventional Commits)

```
refactor: centralize liked package ids in a global provider      (TODO-001)
fix: derive PackageCard liked state from global liked packages   (TODO-002)
feat: add GET /api/packages/slug/[slug] endpoint                 (TODO-003)
feat: fetch package by slug on the package detail page           (TODO-004)
refactor: wire real images into package hero and photo gallery   (TODO-005)
refactor: render real package overview html instead of mock data (TODO-006)
refactor: wire itinerary, glance stats, and route map to real data (TODO-007)
feat: connect booking sidebar to real pricing and discounts       (TODO-008)
feat: add search query support to packages api                   (TODO-009)
feat: add searchable dropdown to package search bar               (TODO-010)
fix: replace mock data on packages listing page with live data   (TODO-011)
feat: build admin media library page                              (TODO-012)
feat: add image picker dialog component                          (TODO-013)
feat: add reusable ImageSelector component                       (TODO-014)
feat: wire ImageSelector into package admin form                 (TODO-015)
```

---

## 4. Implementation Plan (order, dependencies, decisions)

**Order:**

1. **001 → 002** first. This is a live, user-visible bug (every heart icon renders "liked") with the lowest complexity and zero dependencies — fix it before anything else touches `PackageCard`.
2. **003 → 004 → 005 → 006 → 007 → 008** next, as one sequential arc on `feature/package-detail-api-integration`. Don't parallelize 005–008 across people without care — they all edit `page.tsx`'s data-shape decisions made in 004, so 004 needs to land (or at least be stable in-branch) before the others start in earnest.
3. **009 → (010, 011 in parallel)** on `feature/package-search`. 010 and 011 both only depend on 009, not on each other, so they can be split between two people once 009 is merged into that branch.
4. **012 → 013 → 014 → (015)** on `feature/media-library`. This can technically start on day one in parallel with everything above — it has no shared files with the other three branches — but 013 should start after 012 lands so the picker can reuse the grid component instead of duplicating it.

**Architectural decisions recommended before/while coding:**

- **Liked-package state** should follow the exact server-hydration pattern already used for `AuthProvider` (`initialUser`), not a `useEffect` fetch — this is explicitly what `AGENTS.md`'s own rules ask for, and the data (`getAllLikedPackageIdsForUser`) is already server-callable.
- **Package detail page** should call `getPackageBySlug` directly from the Server Component rather than `fetch`-ing its own new `/api/packages/slug/[slug]` route internally. The new route (003) still matters for any external/client consumer, but a server component calling its own HTTP API over the network is unnecessary overhead — direct service calls are the pattern used by every other `page.tsx` in this codebase.
- **Search dropdown** should debounce client input (new `useDebouncedValue` hook) rather than debouncing on the server — keeps `/api/packages` simple and reusable for non-debounced callers too.
- **Media library** should reuse the existing `DialogProvider`/`MODAL_REGISTRY` pattern rather than introducing a second modal system, and should reuse the existing `image.service.ts` `search` param rather than adding client-side filtering.

**Should anything be refactored first?** Yes, in two places, and both are called out above as their own TODOs rather than silent side effects: `PackageCard`'s hardcoded liked state (001–002), and the fact that "integrating the API" for the detail page is really "deleting mock data," which is why that work is split into 004–008 instead of being one large diff.

---

## 5. API Review

The existing REST surface is consistent: `/api/<resource>` for list+create, `/api/<resource>/[id]` for get/update/delete, Zod validation on every mutating route, and a single `handleApiError`/`AppError` pattern almost everywhere. Recommendations:

- **Adding `/api/packages/slug/[slug]`** (as requested) is the right call and matches the existing convention of nesting lookups under the resource path rather than using a query string (`?slug=`) — consistent with how `[id]` already works.
- **Add `?q=` to `GET /api/packages`** (TODO-009), mirroring the `?search=` param `GET /api/images` already supports. There's no reason for these two list endpoints to use different query-param names for the same concept, so use `q` only if you're also willing to rename `images`' `search` to `q` for consistency — otherwise match `search` for both. *(I used `q` above since `HeroSearch` already sends `?q=` to `/packages`; recommend standardizing on one name across the whole API.)*
- **The like endpoints are intentionally split** across `/api/packages/[id]/like` (POST/DELETE) and `/api/auth/me/liked-packages` (GET-all) — and that split is correct, not an oversight. A `GET` on `/api/packages/[id]/like` would only answer "did I like this one," but the client actually needs the full list once per session. Worth a one-line comment in the routes so a future reviewer doesn't "fix" it back into one endpoint.
- **Error response shape is inconsistent** between most routes (`{ message }` via `handleApiError`) and the two hand-rolled auth routes (`/api/auth/me` returns `{ error }`). Recommend routing `auth/me` and `auth/refresh` through `handleApiError`/`AppError` too, so every route in the app returns the same error shape.
- **Image attachment ordering** — attachments are always returned `orderBy: { createdAt: "asc" }`, so there's no way to manually reorder a package's photo gallery later. Not urgent, but worth deciding now whether gallery order should ever be admin-controlled, since retrofitting an `order` column is easy today and harder once there's real data.

---

## 6. Architecture Recommendations

*(Per the request, nothing below has been implemented — this is the review section only.)*

- **Duplicated `RouteContext` type.** Every dynamic API route redeclares `type RouteContext = { params: Promise<{ id: string }> }`. Extract to a shared `src/types/api.ts` (`type RouteParams<T> = { params: Promise<T> }`) and reuse across all ~10 route files.
- **Duplicated validation boilerplate.** The `safeParse` → `422` block is copy-pasted in nearly every `POST`/`PATCH` route. A small helper (`parseOrRespond(schema, body)` returning either data or a `NextResponse`) would remove ~8 lines of duplication per route.
- **`Icon` object lives in `page.tsx`.** `packages/[slug]/page.tsx` exports an `Icon` object that five sibling `_components` import via `../page`. Importing icons from a route's page module is an anti-pattern — it couples unrelated components to that specific route file. Move to `_components/icons.tsx`.
- **State management.** Once TODO-001/002 land, `PackageCardProps.isLiked`/`onLikeToggle` become dead code — remove them rather than leaving an unused parallel API alongside the new context.
- **Repeated `*-select.tsx` components.** `DestinationSelect`, `DifficultySelect`, `RegionSelect`, and (presumably) `PackageSelect` all repeat the same "fetch on mount + `shadcn` `Select`" boilerplate with only the endpoint and label changing. A generic `<EntitySelect endpoint="/api/regions" labelKey="name" placeholder="Select a Region" />` would collapse four files into one.
- **N+1-shaped image fetching.** `getAllPackages()` calls `getAttachmentsForEntity` once per package via `Promise.all`. Fine at current scale; if the catalog grows, consider one `imageAttachment.findMany({ where: { entityId: { in: [...packageIds] } } })` call instead.
- **Unsanitized rich text.** `Overview` and `Itinerary` both render Tiptap-authored HTML via `dangerouslySetInnerHTML` with no sanitization step. It's admin-authored today, but a compromised admin account or a future "let guides submit their own itinerary notes" feature would turn this into a stored-XSS vector. Recommend adding sanitization (e.g. `rehype-sanitize`) before either of those become true — flagging here rather than as a new TODO, since it's a judgment call on priority, not a requested feature.
- **Type duplication between client and service layer.** `package-card.tsx` hand-declares `TravelPackage`, `Difficulty`, `GroupDiscount`, etc., which structurally duplicate the already-exported `PackageWithImages` type from `package.service.ts`. Importing the service's inferred type (or a shared DTO type) keeps client and server representations from silently drifting apart.
- **Minor naming cleanup (low priority, opportunistic only):** `dailog-context.tsx` / `use-dailog.ts` (typo for "dialog"), `schemas/user.shema.ts` (typo for "schema"), and two parallel `UserType`-shaped definitions (`constants/enums/user-type.ts` vs `types/users-type.enum.ts`) that should probably be one source of truth.
