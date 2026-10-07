# Engineering portfolio — mrmahmood21.github.io

Skeleton site (plain HTML + CSS, no build step) hosted on GitHub Pages.

**Current state:** layout, design system, navigation, headings, labels, the About Me, and
everything drawn from `assets/resume.pdf` are done. The literal word `Placeholder` marks only the
prose still to be written: the one-line project summaries, the IMRD sections, figure captions, one
availability line on the contact page, and the fourth project slot.

**Conventions:** no inline `style` attributes — spacing uses the `.u-mt-*` / `.u-mb-*` utilities and
component rules in `assets/css/style.css`. Every class used in the markup is defined there.

## Structure

```
index.html              Home: hero, about, featured projects, closing call to action
projects.html           Index of all projects + optional additional experience section
projects/
  project-one.html      Full write-up, IMRD structure
  project-two.html
  project-three.html
  project-four.html
resume.html             Web resume + PDF download button
contact.html            Email, LinkedIn, GitHub, quick facts
404.html                Not-found page
assets/
  css/style.css         The whole design system, commented by section
  js/main.js            Mobile nav toggle only
  img/favicon.svg       Gradient RM monogram favicon
  img/                  Put project images and your headshot here
  resume.pdf            Your one-page resume (already added)
memo/
  justification-memo.md Outline for the required memo (not part of the website)
```

Real text: page titles, every heading, section labels, navigation, buttons, breadcrumbs, field
labels, image-slot labels, and your name and initials. `Placeholder` text: anything a reader would
come to the page to actually read.