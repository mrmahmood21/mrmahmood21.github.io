# Engineering portfolio — mrmahmood21.github.io

Skeleton site (plain HTML + CSS, no build step) hosted on GitHub Pages.

**Current state:** Layout and design system are finished and functional. HTML comments mark what each section is for so that later I can fill it in.

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
  img/favicon.svg       Gradient monogram favicon (swap the letter for your initials)
  img/                  Put project images and your headshot here
  resume.pdf            Generated stand-in — overwrite with your real one-page resume
memo/
  justification-memo.md Outline for the required memo (not part of the website)
```

Navigation labels (Home / Projects / Resume / Contact), button labels, breadcrumbs, and prev/next
pagers were left as real words so the site stays testable — everything else is `Placeholder`.