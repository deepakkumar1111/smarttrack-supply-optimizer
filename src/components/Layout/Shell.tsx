
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion } from 'framer-motion';

interface ShellProps {
  children: React.ReactNode;
  className?: string;
}

export function Shell({ children, className }: ShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial page load animation
    setIsPageLoaded(true);
  }, []);

  // Animation variants
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        
        <motion.main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-apple", 
            isSidebarOpen ? "ml-64" : "ml-0",
            className
          )}
          initial="initial"
          animate={isPageLoaded ? "animate" : "initial"}
          variants={contentVariants}
        >
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
