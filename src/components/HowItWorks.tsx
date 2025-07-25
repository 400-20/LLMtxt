"use client"
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Zap, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: FileText,
    title: "Input Your Project",
    description: "Provide your project details, documentation links, and key information to get started.",
    color: "text-ai-primary"
  },
  {
    icon: Zap,
    title: "AI Processing",
    description: "Our advanced AI analyzes your content and generates a perfectly structured llms.txt file.",
    color: "text-ai-accent"
  },
  {
    icon: Download,
    title: "Download & Deploy",
    description: "Get your beautiful, standardized llms.txt file ready for deployment in seconds.",
    color: "text-ai-secondary"
  }
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-ai rounded-full opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-ai-intense rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-ai-primary" />
            <span className="text-sm font-medium text-muted-foreground">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Generate Perfect{" "}
            <span className="text-gradient-ai">llms.txt Files</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your project documentation into AI-ready format in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <div className="card-ai relative z-10 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-ai-soft rounded-2xl flex items-center justify-center group-hover:bg-gradient-ai transition-all duration-300">
                  <step.icon className={`w-8 h-8 ${step.color} group-hover:text-white transition-colors`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-ai rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">Ready to see it in action?</p>
          <Link href="/#generate" className="btn-ai-ghost group">
            Try Live Demo
            <motion.span
              className="ml-2 inline-block"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};