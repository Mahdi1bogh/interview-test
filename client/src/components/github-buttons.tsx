"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GitHubCTAButtons = () => {
  const [hoverVercel, setHoverVercel] = useState(false);
  const [hoverSupabase, setHoverSupabase] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        variant="outline"
        size="lg"
        asChild
        className="relative overflow-hidden group bg-black text-white border-gray-800 hover:bg-gray-900 hover:border-gray-700 transition-colors duration-300"
        onMouseEnter={() => setHoverVercel(true)}
        onMouseLeave={() => setHoverVercel(false)}
      >
        <Link
          target="_blank"
          href="https://github.com/Mahdi1bogh/interview-test"
        >
          <motion.div
            className="absolute inset-0 hover:text-white bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300"
            initial={false}
            animate={{ opacity: hoverVercel ? 0.2 : 0 }}
          />

          <Github className="group-hover:text-white mr-2 h-5 w-5" />
          <span className="relative group-hover:text-white z-10">Frontend</span>
          <motion.div
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: hoverVercel ? 0 : -10, opacity: hoverVercel ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.div>
        </Link>
      </Button>

      <Button
        variant="outline"
        size="lg"
        asChild
        className="relative overflow-hidden group  bg-emerald-900 text-emerald-100 border-emerald-700 hover:bg-emerald-800 hover:border-emerald-600 transition-colors duration-300"
        onMouseEnter={() => setHoverSupabase(true)}
        onMouseLeave={() => setHoverSupabase(false)}
      >
        <Link
          target="_blank"
          href="https://github.com/Mahdi1bogh/interview-backend"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            initial={false}
            animate={{ opacity: hoverSupabase ? 0.2 : 0 }}
          />
          <Github className="mr-2 h-5 w-5" />
          <span className="relative z-10">Backend</span>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoverSupabase ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </Button>
    </div>
  );
};

export default GitHubCTAButtons;
