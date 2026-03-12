Setup Instructions
1. Create a Vite React Project
# Create a new Vite project with React & TypeScript
npm create vite@latest itzfizz
# Select:
# • Project name: my-project
# • Framework: React
# • Variant: TypeScript
cd my-project
2. Install Dependencies
npm install

This installs all runtime and dev dependencies.

3. Install Tailwind CSS
# Install Tailwind and its dependencies
npm install -D tailwindcss postcss autoprefixer
# Initialize Tailwind configuration files
npx tailwindcss init -p

This creates tailwind.config.js and postcss.config.js.

4. Configure Tailwind

Update tailwind.config.js to scan your files:

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
5. Add Tailwind Directives to CSS

In your src/index.css or src/main.css:

@tailwind base;
@tailwind components;
@tailwind utilities;
6. Run the Development Server
npm run dev

Open the URL shown (usually http://localhost:5173) to see your app running with Tailwind styling.


For smoother animations, install GSAP:

npm install gsap



Things I have done 

1. Hero Section Layout

Full-screen hero section:

<section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-background" style={{ perspective: "1200px" }}>

Occupies the first screen (above the fold) with a 3D perspective for depth.

Headline text (letter-spaced):

HEADLINE_WORDS = ["WELCOME", "ITZ", "FIZZ"]

Letters rendered individually with gradient and drop-shadow for glow effect.

Positioned at the center, responsive sizing using Tailwind.

Subtitle / Scroll hint:

Scroll ⮟ line with decorative gradient bars.

Initially hidden (opacity-0) and animated in with GSAP.

Stats / Impact metrics:

Top-centered metrics: Customer Satisfaction, Projects Delivered, Active Users.

Animated sequentially on page load.

2. Background & Visual Effects

Gradient overlays:

Radial gradient overlay for atmosphere.

Ambient left/right glows and ground glow.

Road and environment layers:

Road surface with gradient and asphalt texture.

Road dashes and edge lines.

Ambient particles / spark effects:

Floating ambient particles (ambient-particle) with random motion.

Sparks (spark-particle) near the road for dynamic energy.

Light streaks and scanning beams (scan-beam, light-streak-anim) for futuristic motion.

Pulse rings:

Expanding pulse rings in the center (pulse-ring) to add a dynamic feel.

3. Cars & Motion

Two cars (blue & grey):

car1Ref (blue) moves left → right, car2Ref (grey) moves right → left.

Includes headlight glow, undercar glow, motion blur overlay, tire sparks, and responsive scaling.

Cars’ positions and rotations animated via GSAP scroll timeline.

Drift smoke effects:

drift1Ref and drift2Ref contain multiple blurred radial gradients to simulate tire smoke.

Smoke expands and fades dynamically during drift animations.

Suspension bounce:

Cars slightly move vertically to simulate realistic bounce.

Tire marks:

Six tire marks (smokeRefs) appear and fade along the road as cars drift.

4. Animations

Initial load animations:

Ground letters fade and stagger in with rotation (.ground-letter).

Subtitle fades in (.subtitle-line).

Stats animate in sequentially.

Ambient animation loops:

Ambient particles, sparks, speed lines, light streaks, pulse rings all animate continuously.

Ground text gently floats up and down.

Headlight glow flickers.

Pulsing road glow.

Scroll-based animations:

Cars enter → drift → exit using gsap.timeline + ScrollTrigger.

Tire marks appear in sync with car drift.

Ground text glows and pulses as cars move past.

Undercar glow intensifies during drift.

5. Styling & Performance

Tailwind used for layout and sizing.

Inline styles used for gradients, glows, and radial effects.

willChange: "transform" used on cars for better GPU performance.

Continuous animations use transform, opacity, scale—keeping scroll animations smooth and performant.

✅ Summary:
I have added:

Full hero section with letter-spaced headline.

Animated statistics.

Cars with realistic motion, drift, tire marks, undercar/ambient glow, headlight effects.

Multiple ambient animations: particles, sparks, speed lines, light streaks, pulse rings.

Scroll-driven car animation with GSAP ScrollTrigger.

Initial load animations for headline, stats, and text.

Road and environmental details with gradients, asphalt texture, and decorative lines.

Essentially, your code fully satisfies the functional requirements you listed earlier:

Hero layout ✅

Initial load animations ✅

Scroll-based animations ✅

Smooth motion and performance optimizations ✅
