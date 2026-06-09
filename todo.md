# TODO - Beginner Friendly Refactor

## 1) JS cleanup (no behavior change)
- [x] Refactor `assets/js/index.js` into small named functions.
- [x] Cache DOM nodes (single getElementById/querySelector pass).
- [x] Replace inline navbar style changes (background + boxShadow) with a CSS class toggle (e.g. `navbar--scrolled`).
- [x] Keep IntersectionObserver behavior and thresholds the same.
- [x] Refactor done (navbar now uses `navbar--scrolled` class instead of inline styles).



## 2) CSS cleanup
- [x] Add `.navbar--scrolled` styles in `assets/css/style.css` (matching current inline values).

- [x] Reorganize `assets/css/style.css` with beginner-friendly section headers/comments.

- [ ] Keep all existing class names and styles intact (no visual change expected).


## 3) Sanity checks
- [ ] Verify preloader hides.


- [ ] Verify typing effect.
- [ ] Verify mobile hamburger toggle.
- [ ] Verify reveal-on-scroll animations (`.observe`).
- [ ] Verify counters count.
- [ ] Verify skills circular progress animates.
- [ ] Verify navbar active link highlight.
- [ ] Verify contact form opens WhatsApp with correct message.

