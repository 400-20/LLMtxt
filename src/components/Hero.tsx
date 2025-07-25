import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export const Hero = () => {
    const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const text  = el.innerText;
    el.innerHTML = '';

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char; // ← Fix: Non-breaking space
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      el.appendChild(span);
    });

    const spans = el.querySelectorAll('span');

    gsap.to(spans, {
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      stagger: 0.035,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    });
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-ai-soft" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 -z-5">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-ai rounded-full opacity-20 blur-xl"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-ai-intense rounded-full opacity-15 blur-2xl"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-ai-primary" />
    <span
      ref={textRef}
      className="text-sm font-medium text-muted-foreground tracking-wide"
    >
      AI-Powered Documentation Tool
    </span>

          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient-ai-intense">
              llms.txt
            </span>
            <br />
            <span className="text-foreground">Generator</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Create beautiful, standardized llms.txt files for your AI projects. 
            Modern, fast, and developer-friendly documentation generation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a className="btn-ai-primary group" href="#generate">
              Generate llms.txt
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </a>
            <a className="btn-ai-ghost" href="#learn-more">
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};