import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Heart, Star, Github } from "lucide-react";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-ai-soft opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-ai rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Love the{" "}
            <span className="text-gradient-ai-intense">llms.txt Generator</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Help keep this project alive and support the development of more AI tools. 
            Every contribution helps us build better developer experiences.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-ai mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Files Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-ai mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Happy Developers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient-ai mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="https://coff.ee/400_20_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ai-primary group"
            >
              <Coffee className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Buy Me a Coffee
              <Heart className="w-4 h-4 ml-2 text-red-300 group-hover:text-red-200 transition-colors" />
            </motion.a>
            
            <motion.a
              href="https://github.com/400-20/mind-forge-web"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ai-ghost group flex gap-1 items-center"
            >
              <Github className="w-5 h-5 mr-2" />
              Star on GitHub
              <Star className="w-4 h-4 ml-2 group-hover:fill-current transition-all" />
            </motion.a>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 card-ai max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-4 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg text-foreground italic mb-4">
              &apos;This tool saved me hours of work. The generated llms.txt files are 
              perfectly structured and ready to use. Absolutely love it!&apos;
            </blockquote>
            <cite className="text-muted-foreground">
              — Alex Chen, AI Developer
            </cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};