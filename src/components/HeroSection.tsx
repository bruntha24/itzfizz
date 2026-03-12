import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carBlue from "@/assets/car-blue.png";
import carGrey from "@/assets/car-grey.png";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_WORDS = ["WELCOME", "ITZ", "FIZZ"];

const stats = [
  { value: "95%", label: "Customer Satisfaction" },
  { value: "120+", label: "Projects Delivered" },
  { value: "50K", label: "Active Users" },
];

// Seeded random positions for particles so they don't re-render
const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: (i * 17 + 13) % 100,
  top: (i * 23 + 7) % 100,
  size: 1 + (i % 3),
  delay: (i * 0.3) % 5,
}));

const sparks = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 19 + 5) % 100,
  top: 55 + (i * 7) % 35,
}));

const streaks = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: 20 + (i * 13) % 60,
  delay: i * 1.2,
}));

const pulseRings = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  delay: i * 1.5,
}));

const HeroSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const groundTextRef = useRef<HTMLDivElement>(null);
  const car1Ref = useRef<HTMLDivElement>(null);
  const car2Ref = useRef<HTMLDivElement>(null);
  const drift1Ref = useRef<HTMLDivElement>(null);
  const drift2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const smokeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ground text letters stagger in
      const letters = groundTextRef.current?.querySelectorAll(".ground-letter");
      if (letters) {
        gsap.from(letters, {
          opacity: 0,
          scale: 0.5,
          y: 60,
          rotationX: 90,
          duration: 1.4,
          ease: "back.out(1.7)",
          stagger: 0.04,
          delay: 0.3,
        });
      }

      // Subtitle line
      gsap.to(".subtitle-line", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.8,
      });

      // Stats
      const statEls = statsRef.current?.querySelectorAll(".stat-item");
      if (statEls) {
        gsap.from(statEls, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          delay: 1.5,
        });
      }

      // Ambient floating particles
      gsap.to(".ambient-particle", {
        y: "random(-40, 40)",
        x: "random(-30, 30)",
        opacity: "random(0.1, 0.8)",
        duration: "random(3, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 4, from: "random" },
      });

      // Spark particles
      gsap.to(".spark-particle", {
        y: "random(-60, -120)",
        x: "random(-20, 20)",
        opacity: 0,
        duration: "random(1.5, 3)",
        repeat: -1,
        ease: "power1.out",
        stagger: { amount: 5, from: "random" },
      });

      // Pulsing road glow
      gsap.to(".road-pulse", {
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scanning light beams
      gsap.to(".scan-beam", {
        x: "100vw",
        duration: 4,
        repeat: -1,
        ease: "none",
        stagger: { amount: 6, from: "start" },
      });

      // Horizontal speed lines
      gsap.to(".speed-line", {
        x: "110vw",
        duration: "random(1, 2.5)",
        repeat: -1,
        ease: "none",
        stagger: { amount: 3, from: "random" },
      });

      // Light streaks across screen
      gsap.fromTo(".light-streak-anim", 
        { x: "-100%", opacity: 0 },
        {
          x: "200vw",
          opacity: 0.6,
          duration: "random(2, 4)",
          repeat: -1,
          ease: "power1.in",
          stagger: { amount: 8, from: "random" },
        }
      );

      // Pulse rings from center
      gsap.fromTo(".pulse-ring",
        { scale: 0, opacity: 0.5 },
        {
          scale: 4,
          opacity: 0,
          duration: 3,
          repeat: -1,
          ease: "power1.out",
          stagger: { amount: 4.5, from: "start" },
        }
      );

      // Ground text subtle float
      gsap.to(".ground-letter", {
        y: "random(-3, 3)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 2, from: "random" },
      });

      // Continuous headlight flicker
      gsap.to(".headlight-glow", {
        opacity: "random(0.5, 1)",
        scale: "random(0.9, 1.1)",
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 1, from: "random" },
      });

      // ===== SCROLL TRIGGER =====
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5,
        },
      });

      // Phase 1: Cars enter with dramatic drift (0 → 0.4)
      tl.fromTo(
        car1Ref.current,
        { x: "-120%", rotation: 0, opacity: 0, scale: 0.8 },
        { x: "40vw", rotation: -12, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
        0
      );
      tl.fromTo(
        car2Ref.current,
        { x: "120vw", rotation: 0, opacity: 0, scale: 0.8 },
        { x: "25vw", rotation: 12, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
        0
      );

      // Phase 2: Cars drift closer, counter-steer (0.35 → 0.6)
      tl.to(car1Ref.current, { x: "55vw", rotation: 5, duration: 0.25, ease: "power1.inOut" }, 0.35);
      tl.to(car2Ref.current, { x: "15vw", rotation: -5, duration: 0.25, ease: "power1.inOut" }, 0.35);

      // Phase 3: Cars exit with burst (0.6 → 1.0)
      tl.to(car1Ref.current, { x: "140vw", rotation: -2, scale: 1.05, duration: 0.4, ease: "power3.in" }, 0.6);
      tl.to(car2Ref.current, { x: "-140%", rotation: 2, scale: 1.05, duration: 0.4, ease: "power3.in" }, 0.6);

      // Drift smoke car 1
      tl.fromTo(
        drift1Ref.current,
        { opacity: 0, scale: 0.2 },
        { opacity: 0.8, scale: 2, x: -80, duration: 0.3, ease: "power1.out" },
        0.15
      ).to(drift1Ref.current, { opacity: 0, scale: 4, x: -250, duration: 0.5 }, 0.5);

      // Drift smoke car 2
      tl.fromTo(
        drift2Ref.current,
        { opacity: 0, scale: 0.2 },
        { opacity: 0.8, scale: 2, x: 80, duration: 0.3, ease: "power1.out" },
        0.15
      ).to(drift2Ref.current, { opacity: 0, scale: 4, x: 250, duration: 0.5 }, 0.5);

      // Suspension bounce — more aggressive
      tl.to(car1Ref.current, { y: -8, duration: 0.02, repeat: 40, yoyo: true, ease: "sine.inOut" }, 0);
      tl.to(car2Ref.current, { y: -7, duration: 0.025, repeat: 35, yoyo: true, ease: "sine.inOut" }, 0);

      // Tire marks
      smokeRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, scaleX: 0 },
          { opacity: 0.4, scaleX: 1, duration: 0.3, ease: "none" },
          0.1 + i * 0.04
        ).to(el, { opacity: 0, duration: 0.5 }, 0.7);
      });

      // Text glow intensifies as cars pass
      tl.to(
        groundTextRef.current,
        { filter: "drop-shadow(0 0 60px hsl(220, 80%, 60%)) drop-shadow(0 0 120px hsl(220, 80%, 50%))", duration: 0.3 },
        0.25
      ).to(
        groundTextRef.current,
        { filter: "drop-shadow(0 0 20px hsl(220, 80%, 40%)) drop-shadow(0 0 40px hsl(220, 60%, 30%))", duration: 0.4 },
        0.6
      );

      // Text scale pulse as cars drift close
      tl.to(groundTextRef.current, { scale: 1.03, duration: 0.15, ease: "power1.in" }, 0.3);
      tl.to(groundTextRef.current, { scale: 1, duration: 0.2, ease: "power1.out" }, 0.45);

      // Undercar glow intensifies during drift
      tl.to(".undercar-glow", { opacity: 1, scale: 1.3, duration: 0.3 }, 0.2);
      tl.to(".undercar-glow", { opacity: 0.5, scale: 1, duration: 0.3 }, 0.6);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-background"
        style={{ perspective: "1200px" }}
      >
        {/* ===== BACKGROUND LAYERS ===== */}

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-radial" />
        
        {/* Ambient side glows */}
        <div className="ambient-glow-left absolute inset-0 pointer-events-none" />
        <div className="ambient-glow-right absolute inset-0 pointer-events-none" />
        <div className="ground-glow absolute inset-0 pointer-events-none" />

        {/* Pulsing road glow */}
        <div className="road-pulse absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(ellipse 60% 100% at 50% 100%, hsl(220 80% 55% / 0.3), transparent)"
          }}
        />

        {/* Ambient particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="ambient-particle absolute rounded-full pointer-events-none"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: 0.3,
              background: p.id % 3 === 0
                ? "hsl(145, 80%, 50%)"
                : "hsl(220, 80%, 60%)",
              boxShadow: `0 0 ${p.size * 4}px ${p.id % 3 === 0 ? "hsl(145,80%,50%)" : "hsl(220,80%,60%)"}`,
            }}
          />
        ))}

        {/* Spark particles near road */}
        {sparks.map((s) => (
          <div
            key={`spark-${s.id}`}
            className="spark-particle absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              background: "hsl(45, 100%, 70%)",
              boxShadow: "0 0 6px hsl(45,100%,70%)",
            }}
          />
        ))}

        {/* Scan beams */}
        {[0, 1, 2].map((i) => (
          <div
            key={`scan-${i}`}
            className="scan-beam absolute pointer-events-none"
            style={{
              left: "-10%",
              top: `${60 + i * 10}%`,
              width: "150px",
              height: "1px",
              background: `linear-gradient(90deg, transparent, hsl(220 80% 55% / 0.15), transparent)`,
            }}
          />
        ))}

        {/* Speed lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`speed-${i}`}
            className="speed-line absolute pointer-events-none"
            style={{
              left: "-20%",
              top: `${50 + (i * 5.5)}%`,
              width: `${60 + (i % 3) * 40}px`,
              height: "1px",
              opacity: 0.15,
              background: `linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.4), transparent)`,
            }}
          />
        ))}

        {/* Light streaks */}
        {streaks.map((s) => (
          <div
            key={`streak-${s.id}`}
            className="light-streak-anim absolute pointer-events-none"
            style={{
              left: "-20%",
              top: `${s.top}%`,
              width: "200px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, hsl(220 80% 60% / 0.3), hsl(220 80% 70% / 0.5), transparent)`,
              borderRadius: "1px",
            }}
          />
        ))}

        {/* Pulse rings from center */}
        {pulseRings.map((r) => (
          <div
            key={`ring-${r.id}`}
            className="pulse-ring absolute pointer-events-none rounded-full border border-primary/20"
            style={{
              left: "50%",
              top: "50%",
              width: "100px",
              height: "100px",
              marginLeft: "-50px",
              marginTop: "-50px",
            }}
          />
        ))}

        {/* ===== ROAD SURFACE ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, hsl(220 15% 6%) 20%, hsl(220 12% 10%) 50%, hsl(220 15% 8%) 80%, hsl(220 10% 6%) 100%)`,
          }}
        />

        {/* Asphalt texture dots */}
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(0 0% 30%) 1px, transparent 1px)`,
            backgroundSize: "8px 8px",
          }}
        />

        {/* Road dashes */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-10 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-14 h-1 rounded-full bg-road-line/25" />
          ))}
        </div>

        {/* Road edge lines */}
        <div className="absolute bottom-8 left-[5%] right-[5%] h-px bg-road-line/15 pointer-events-none" />
        <div className="absolute bottom-36 left-[5%] right-[5%] h-px bg-road-line/10 pointer-events-none" />

        {/* ===== HEADLINE TEXT (straight, centered) ===== */}
        <div
          ref={groundTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10"
        >
          <div className="flex gap-4 md:gap-8 lg:gap-12 whitespace-nowrap">
            {HEADLINE_WORDS.map((word, wi) => (
              <span key={wi} className="flex">
                {word.split("").map((char, ci) => (
                  <span
                    key={`${wi}-${ci}`}
                   className="ground-letter inline-block font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[8rem]"
                    style={{
                      background: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(220 80% 70%) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 30px hsl(220, 80%, 50% / 0.4)) drop-shadow(0 0 60px hsl(220, 80%, 40% / 0.2))",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
          {/* Subtitle line */}
          <div className="mt-4 md:mt-6 flex items-center gap-4 opacity-0 subtitle-line">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-muted-foreground font-body text-xs md:text-sm tracking-[0.5em] uppercase">Scroll ⮟ </span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* ===== STATS (top area) ===== */}
        <div ref={statsRef} className="absolute top-10 left-0 right-0 z-20 flex justify-center gap-12 md:gap-20">
          {stats.map((s) => (
            <div key={s.label} className="stat-item text-center">
              <div className="stat-value text-2xl md:text-4xl mb-1">{s.value}</div>
              <div className="stat-label text-xs md:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ===== TIRE MARKS ===== */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
    key={`tire-${i}`}
    ref={(el) => { smokeRefs.current[i] = el; }}
    className="absolute pointer-events-none origin-center opacity-0"
    style={{
      bottom: `${18 + i * 2}rem`, // higher on road
      left: `${15 + i * 12}%`,
      width: "140px",
      height: "6px",
      background: "linear-gradient(90deg, transparent, hsl(0 0% 40% / 0.6), transparent)",
      borderRadius: "2px",
      transform: `rotate(${i % 2 === 0 ? -5 : 5}deg)`,
    }}
  />
))}

       {/* ===== CAR 1 - Blue (left → right, drifts) ===== */}
<div
  ref={car1Ref}
  className="absolute bottom-28 left-0 car-shadow pointer-events-none z-10"
  style={{ transform: "translateX(-110%)", willChange: "transform" }}
>
  {/* Headlight glow */}
  <div className="headlight-glow absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-20 rounded-full opacity-70"
    style={{
      background: "radial-gradient(ellipse, hsl(45 100% 80% / 0.5), hsl(45 100% 60% / 0.2), transparent)",
      filter: "blur(6px)"
    }}
  />

  {/* Motion blur overlay */}
  <div className="absolute inset-0 pointer-events-none" style={{
    background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1), transparent)",
    opacity: 0.3,
    transform: "skewX(-15deg)"
  }}/>

  <img
    src={carBlue}
    alt="Blue sports car"
    className="w-56 md:w-72 lg:w-96 h-auto"
    style={{ filter: "brightness(1.1) contrast(1.1)" }}
    draggable={false}
  />

  {/* Undercar glow */}
  <div className="undercar-glow absolute -bottom-6 left-2 right-2 h-8 rounded-full opacity-50"
    style={{
      background: "radial-gradient(ellipse, hsl(220 80% 55% / 0.6), hsl(220 80% 55% / 0.2), transparent)"
    }}
  />

  {/* Tire Sparks */}
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="spark-particle absolute w-1 h-1 rounded-full bg-yellow-400 pointer-events-none"
      style={{
        left: `${10 + i * 5}%`,
        bottom: `${6 + Math.random() * 2}rem`,
        opacity: Math.random(),
        filter: "blur(1px)"
      }}
    />
  ))}
</div>

{/* Drift smoke car 1 */}
{/* Drift smoke car 1 */}
<div
  ref={drift1Ref}
  className="absolute bottom-24 left-1/2 pointer-events-none opacity-0 z-[5]"
  style={{ width: "200px", height: "80px" }}
>
  {[0, 1, 2, 3].map((j) => (
    <div
      key={j}
      className="absolute rounded-full"
      style={{
        width: `${50 + j * 30}px`,         // slightly smaller for softer effect
        height: `${25 + j * 20}px`,        // softer height
        left: `${j * 12}px`,               // adjust spacing
        top: `${j * 8}px`,
        background: `radial-gradient(ellipse, hsl(0 0% 60% / ${0.25 - j * 0.05}), transparent)`, // lower opacity
        filter: `blur(${8 + j * 6}px)`,    // more blur for softness
        transform: `rotate(${Math.random() * 10 - 5}deg)` // gentle rotation
      }}
    />
  ))}
</div>

        {/* ===== CAR 2 - Grey (right → left, drifts) ===== */}
<div
  ref={car2Ref}
  className="absolute bottom-32 right-0 car-shadow pointer-events-none z-10"
  style={{ transform: "translateX(110vw)", willChange: "transform" }}
>
  {/* Headlight glow */}
  <div className="headlight-glow absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-20 rounded-full opacity-70"
    style={{
      background: "radial-gradient(ellipse, hsl(145 80% 70% / 0.4), hsl(145 80% 50% / 0.15), transparent)",
      filter: "blur(6px)"
    }}
  />

  {/* Motion blur overlay */}
  <div className="absolute inset-0 pointer-events-none" style={{
    background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
    opacity: 0.3,
    transform: "skewX(15deg)"
  }}/>

  <img
    src={carGrey}
    alt="Grey sports car"
    className="w-56 md:w-72 lg:w-96 h-auto scale-x-[-1]"
    style={{ filter: "brightness(1.1) contrast(1.05)" }}
    draggable={false}
  />

  {/* Undercar glow */}
  <div className="undercar-glow absolute -bottom-6 left-2 right-2 h-8 rounded-full opacity-50"
    style={{
      background: "radial-gradient(ellipse, hsl(145 80% 50% / 0.5), hsl(145 80% 50% / 0.15), transparent)"
    }}
  />

  {/* Tire Sparks */}
  {Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="spark-particle absolute w-1 h-1 rounded-full bg-yellow-400 pointer-events-none"
      style={{
        right: `${10 + i * 5}%`,
        bottom: `${6 + Math.random() * 2}rem`,
        opacity: Math.random(),
        filter: "blur(1px)"
      }}
    />
  ))}
</div>

{/* Drift smoke car 2 */}
<div
  ref={drift2Ref}
  className="absolute bottom-28 right-1/3 pointer-events-none opacity-0 z-[5]"
  style={{ width: "200px", height: "80px" }}
>
  {[0, 1, 2, 3].map((j) => (
    <div
      key={j}
      className="absolute rounded-full"
      style={{
        width: `${50 + j * 30}px`,                  // slightly smaller for softness
        height: `${25 + j * 20}px`,                 // softer height
        right: `${j * 12}px`,                       // gentler spacing
        top: `${j * 8}px`,
        background: `radial-gradient(ellipse, hsl(0 0% 50% / ${0.25 - j * 0.05}), transparent)`, // softer opacity
        filter: `blur(${8 + j * 6}px)`,             // more blur
        transform: `rotate(${Math.random() * 10 - 5}deg)` // gentle rotation
      }}
    />
  ))}
</div>

        {/* Drift smoke car 2 */}
        <div
          ref={drift2Ref}
          className="absolute bottom-28 right-1/3 pointer-events-none opacity-0 z-[5]"
          style={{ width: "200px", height: "80px" }}
        >
          {[0, 1, 2].map((j) => (
            <div key={j} className="absolute rounded-full"
              style={{
                width: `${80 + j * 40}px`,
                height: `${40 + j * 20}px`,
                right: `${j * 20}px`,
                top: `${j * 10}px`,
                background: `radial-gradient(ellipse, hsl(0 0% 50% / ${0.4 - j * 0.1}), transparent)`,
                filter: `blur(${8 + j * 4}px)`,
              }}
            />
          ))}
        </div>

        {/* ===== VIGNETTE OVERLAY ===== */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, hsl(220 20% 4% / 0.7) 100%)`
          }}
        />
      </section>

      {/* Spacer for scroll */}
      <div className="h-screen bg-background" />
    </div>
  );
};

export default HeroSection;