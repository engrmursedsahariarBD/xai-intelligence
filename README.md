# Xai – Intelligence Workspace Prototype

**Built for the Raco AI Frontend Engineering Technical Assessment**

### 🔗 Primary Deliverables
- **Live Production Deployment:** [INSERT VERCEL LINK HERE]
- **Video Walkthrough & Architecture Explanation:** [INSERT YOUTUBE / GOOGLE DRIVE LINK HERE]
- **Public Figma Design System:** [INSERT FIGMA LINK HERE]
- **Product Documentation:** Located in [docs/architecture.md](docs/architecture.md) and [Xai_Intelligence_Workspace_Architecture.pdf](Xai_Intelligence_Workspace_Architecture.pdf)

---

### 🛠️ Technology Stack & Animation Architecture
- **Framework:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **3D Graphics Engine:** Three.js / React Three Fiber (custom GPU-accelerated vertex interpolation for data morphing)
- **Scroll Choreography:** GSAP + ScrollTrigger (sequential pipeline entrance animations)
- **UI Micro-Interactions:** Framer Motion (dashboard tab transitions and motion polish)

### 🎬 Walkthrough Notes
A short explanation of the key animation and interaction decisions is required for submission. Record a 2–3 minute screen capture showing:
1. the live website running,
2. the hero morph toggle transforming the 3D data points,
3. the GSAP pipeline cards animating into view,
4. the dashboard tabs switching with Framer Motion transitions,
5. a brief spoken explanation of the stack and design decisions.

Upload the video to YouTube (Unlisted) or Google Drive (Anyone with link can view) and replace the placeholder link above.

### 🧠 Key Animation & Math Decisions
1. Parametric Data Morphing (The "WOW" Moment):
   The Hero section renders a live computational canvas of 3,000 vertices. Target coordinates are calculated for a chaotic sphere and a multidimensional cubic lattice, then interpolated in the render loop with cubic easing.
2. Scroll-Driven Choreography:
   GSAP ScrollTrigger sequences the three-stage data pipeline as the user scrolls, creating tactile momentum without interrupting native browser scroll behavior.
3. Restrained Executive UI:
   Framer Motion manages calm tab transitions and responsive layout changes so the workspace feels immediate and technically polished.

### 💻 Running Locally
```bash
git clone https://github.com/yourusername/xai-intelligence-workspace.git
cd xai-intelligence-workspace
npm install
npm run dev
```

Open http://localhost:3000 to view the workspace.
