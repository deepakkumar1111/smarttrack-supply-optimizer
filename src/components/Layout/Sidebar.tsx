
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart4, 
  Box, 
  Settings, 
  ShoppingCart, 
  Truck, 
  Layers, 
  Factory, 
  BarChart2,
  Users
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  
  const sidebarLinks = [
    { to: '/', icon: <BarChart4 size={20} />, label: 'Dashboard' },
    { to: '/inventory', icon: <Box size={20} />, label: 'Inventory' },
    { to: '/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    { to: '/logistics', icon: <Truck size={20} />, label: 'Logistics' },
    { to: '/forecasting', icon: <BarChart2 size={20} />, label: 'Forecasting' },
    { to: '/suppliers', icon: <Factory size={20} />, label: 'Suppliers' },
    { to: '/products', icon: <Layers size={20} />, label: 'Products' },
    { to: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  // Animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      width: 256,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        mass: 1
      } 
    },
    closed: { 
      x: -256, 
      width: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 40,
        mass: 0.8
      } 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed inset-y-0 left-0 z-30 w-64 border-r border-border bg-card/50 backdrop-blur-lg"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
        >
          <div className="h-16 flex items-center justify-center border-b">
            <div className="text-xl font-bold tracking-tight">
              SmartTrack
            </div>
          </div>
          
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.to;
              
              return (
                <Link to={link.to} key={link.to}>
                  <div 
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                      transition-all duration-200 ease-in-out group
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-foreground/70 hover:bg-primary/10 hover:text-foreground'
                      }
                    `}
                  >
                    <span className={`transition-all duration-200 ${isActive ? '' : 'text-muted-foreground group-hover:text-primary'}`}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                    
                    {isActive && (
                      <motion.div
                        className="absolute right-0 w-1 h-8 bg-primary rounded-l-full"
                        layoutId="sidebar-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
          
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="p-4 rounded-lg glass-card">
              <h4 className="font-medium text-sm mb-2">System Status</h4>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
