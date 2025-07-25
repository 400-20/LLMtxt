import { motion } from "framer-motion";
import { Github, Twitter, Coffee, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border bg-surface/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-ai rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gradient-ai">
                llms.txt Generator
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI-powered tool for generating beautiful, standardized llms.txt files. 
              Making AI documentation easier for developers worldwide.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://llmstxt.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-ai-primary transition-colors"
                >
                  About llms.txt
                </a>
              </li>
              <li>
                <a 
                  href="/docs" 
                  className="text-muted-foreground hover:text-ai-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="/examples" 
                  className="text-muted-foreground hover:text-ai-primary transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a 
                  href="/api" 
                  className="text-muted-foreground hover:text-ai-primary transition-colors"
                >
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/llmstxt/generator"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:bg-gradient-ai hover:text-white transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/llmstxtgen"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:bg-gradient-ai hover:text-white transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://buymeacoffee.com/llmstxtgen"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center hover:bg-gradient-ai hover:text-white transition-all duration-300"
              >
                <Coffee className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} llms.txt Generator. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-400" />{" "}
            for the AI community.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-ai-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-ai-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};