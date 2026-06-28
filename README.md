# Gaana K Raj — Portfolio

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Three.js**, and **@paper-design/shaders-react**.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Image setup

Place these images inside `/public/images/` — named exactly as below:

| Filename | Which image |
|---|---|
| `bubbles.jpeg` | Watercolour bubbles / marbles (image 1) |
| `bubbles2.jpeg` | Iridescent soap bubbles (image 2) |
| `swimmer.jpeg` | Navy blue swimmer illustration (image 6) |
| `fishcircle.jpeg` | Circle of fish drawing (image 5 / fishies) |
| `goldfishbags.jpeg` | Goldfish in bags illustration (image 7) |
| `fishshoal.jpeg` | Small shoal of blue fish (fishies.jpeg) |
| `waterlily.jpeg` | Water lily river illustration (Let_it_come... jpeg) |

---

## File structure

```
src/
  app/
    page.tsx                  ← Homepage (all sections)
    layout.tsx                ← Root layout + fonts
    globals.css               ← Global styles + CSS variables
    projects/
      exhale/
        page.tsx              ← Exhale case study page
  components/
    CustomCursor.tsx          ← Smooth custom cursor
    Nav.tsx                   ← Sticky nav with scroll blur
    HeroSection.tsx           ← Waves animation hero
    Waves.tsx                 ← From 21st.dev — navy on offwhite
    AboutSection.tsx          ← Three.js gravity spheres (navy)
    WorkSection.tsx           ← Case study rows
    ContactSection.tsx        ← Dithering CTA from 21st.dev
    FishDivider.tsx           ← Animated fish shoal between sections
    RiverDivider.tsx          ← Wavy SVG section transitions
```

---

## Animations summary

| Section | Animation |
|---|---|
| Hero | Waves (21st.dev) — navy lines on offwhite, mouse-reactive |
| About | Three.js physics spheres — navy palette, cursor-following |
| Hero → About | River-wavy SVG divider |
| About → Work | Animated fish shoal (scroll-triggered) |
| Contact/CTA | Dithering warp (21st.dev) — navy, speeds up on hover |

---

## Exhale project page

`/projects/exhale` — condensed for recruiters:
- Stats bar (timeline, role, team, tools)
- Problem & Solution side by side  
- 3 design goals on navy background
- 5-step process (research → testing)
- Screen placeholder grid (add your Figma exports here)

Add more projects by:
1. Creating `/src/app/projects/[slug]/page.tsx`
2. Adding the project to the `projects` array in `WorkSection.tsx`
