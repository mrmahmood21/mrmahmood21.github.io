# Engineering portfolio — mrmahmood21.github.io

WebPortfolio hosted on GitHub Pages.

**Current state:** layout, design system, navigation, headings, labels, the About Me, and
everything drawn from `assets/resume.pdf` are done. The literal word `Placeholder` marks only the
prose still to be written: the one-line project summaries, the IMRD sections, figure captions, one
availability line on the contact page, and the fourth project slot.

**Conventions:** no inline `style` attributes — spacing uses the `.u-mt-*` / `.u-mb-*` utilities and
component rules in `assets/css/style.css`. Every class used in the markup is defined there.

## Structure

```
index.html              Home: about, featured projects
projects.html           Index of all projects
projects/
  project-one.html      Full write-up for each project, will follow IMRD structure
  project-two.html
  project-three.html
  project-four.html
resume.html             Web resume with PDF download button
contact.html            Email, LinkedIn, GitHub, quick facts
404.html                Not-found/error page
assets/
  css/style.css         The whole design system, commented by section
  js/main.js            Mobile nav toggle only
  img/favicon.svg       Gradient RM monogram favicon
  img/                  Project images and headshot here
  resume.pdf            One-page resume
memo/
  justification-memo.md Outline for the required memo (not part of the website)
```

Real text: page titles, every heading, section labels, navigation, buttons, breadcrumbs, field
labels, image-slot labels, and name and initials. `Placeholder` text: anything a reader would
come to the page to actually read.
