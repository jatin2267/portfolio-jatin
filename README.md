# Jatin Sharma — UI/UX Designer & Web Developer Portfolio

> A responsive personal portfolio website showcasing UI/UX design case studies, web development projects, skills, interactive project modals, and a downloadable resume.

---

## Features

- **Personal Brand & Hero Section**: Clean hero area with greeting, role badge, call-to-action buttons, and downloadable resume link.
- **Skills & Services Breakdown**: Visual skill cards covering Web Design, UI/UX Prototyping, Frontend Development, and Brand Identity.
- **Interactive Project Showcase**:
  - Filterable/grid portfolio gallery with project thumbnails.
  - Interactive project detail modal popup (`portfolio-modal.js`) showing full descriptions, live demo links, and tech tags without leaving the page.
- **Modular CSS Architecture**: Clean separation of styles into core stylesheet, design variables, responsive breakpoints, and component modals.
- **Contact & Inquiry Section**: Direct communication channel for freelance inquiries, job opportunities, and collaborations.
- **Embedded Resume Asset**: Direct access to `jatin_sharma_skill_focused_resume.pdf` for recruiters and clients.
- **Mobile First & Responsive**: Optimized with tailored media queries across handheld, tablet, and high-resolution desktop viewports.

---

## Tech Stack

- **Markup**: HTML5 (semantic structure, accessibility attributes)
- **Styling**: CSS3 (custom CSS custom properties in `variables.css`, Flexbox, CSS Grid, animations, media queries)
- **Scripting**: Vanilla JavaScript (ES6+ modular scripts: main UI interactions and modal dialog controller)
- **Typography & Icons**: Google Fonts, FontAwesome icon suite
- **Documents & Media**: Embedded PDF resume, PNG/JPEG project screenshots and assets

---

## Project Structure

```plaintext
portfolio-jatin/
├── css/
│   ├── portfolio-modal.css            # Styles for project showcase popups and backdrop overlays
│   ├── responsive.css                 # Breakpoints and adaptive rules for mobile and tablet devices
│   ├── style.css                      # Global layout, typography, navigation, and section styling
│   └── variables.css                  # CSS custom properties (colors, typography, spacing, shadows)
├── images/
│   ├── computer.png                   # TechHub Computer Center project thumbnail
│   ├── dadd.png                       # UI design mockup asset
│   ├── ddkd.png                       # Project showcase graphic
│   ├── gaming.png                     # Gaming Cafe project thumbnail
│   ├── jatin.jpg                      # Author portrait photo
│   ├── js.pdf.docx                    # Reference document asset
│   ├── profile.jpeg                   # Author profile avatar image
│   ├── sss.png                        # Interface capture asset
│   └── wildlife.png                   # Wildlife Safari project thumbnail
├── js/
│   ├── index.js                       # Primary UI logic, smooth scrolling, and event handlers
│   └── portfolio-modal.js             # Modal dialog controller for project detail inspections
├── index.html                         # Primary single-page portfolio layout
├── jatin_sharma_skill_focused_resume.pdf # Downloadable frontend engineer resume
├── portfolio.txt                      # Plaintext biography, skill highlights, and service overview
├── todo.md                            # Feature roadmap and task tracker
└── README.md                          # Project documentation
```

---

## How to Install and Run

This is a static web application that runs directly in any modern browser without needing build steps or package managers.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jatin2267/portfolio-jatin.git
   cd portfolio-jatin
   ```

2. **Open in browser:**
   - Double-click `index.html` to open it in your web browser.
   - Or run a local HTTP server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve .
     ```
   - Visit `http://localhost:8000` in your web browser.

---

## Screenshots

> _Screenshots placeholder: Add previews of the portfolio hero section, project gallery, and interactive modals here._

```markdown
![Portfolio Preview](images/profile.jpeg)
```

---

## Author

- **Jatin** — [@jatin2267](https://github.com/jatin2267)
