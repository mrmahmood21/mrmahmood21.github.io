# Engineering portfolio — mrmahmood21.github.io

WebPortfolio hosted on GitHub Pages.

**Current state:** layout, design system, navigation, headings, labels, the About Me, and
everything drawn from `assets/resume.pdf` and the master resume are done. `resume.html` mirrors the
one-page PDF. The literal word `Placeholder` marks only what is still to be written: the IMRD
prose on each project page, unknown role/team/context/link fields, and captions for figures that
have no image yet.

**Conventions:** no inline `style` attributes — spacing uses the `.u-mt-*` / `.u-mb-*` utilities and
component rules in `assets/css/style.css`. Every class used in the markup is defined there.

## Structure

```
index.html              Home: about, featured projects
projects.html           Index of all projects
projects/               One IMRD write-up per project, newest first
  golf-shot-optimization.html
  point-cloud-segmentation.html
  fault-tolerant-quadrotor.html
  autonomous-vehicle-control.html
  maglev-controls-education.html
  tracheostomy-suctioning-system.html
  student-rocket.html
resume.html             Web version of resume.pdf, with PDF download button
contact.html            Email, LinkedIn, GitHub, quick facts
404.html                Not-found/error page
assets/
  css/style.css         The whole design system, commented by section
  js/main.js            Mobile nav toggle only
  img/favicon.svg       Gradient RM monogram favicon
  img/<project>/        Project images, one folder per project (lowercase, hyphens)
  resume.pdf            One-page resume
memo/
  justification-memo.md Outline for the required memo (not part of the website)
```

Real text: page titles, every heading, section labels, navigation, buttons, breadcrumbs, field
labels, image-slot labels, and name and initials. `Placeholder` text: anything a reader would
come to the page to actually read.
