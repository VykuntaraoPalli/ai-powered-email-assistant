import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import Dashboard from './components/Dashboard';
import EmailDetails from './components/EmailDetails';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import PriorityQueue from './components/PriorityQueue';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard />
              </motion.div>
            } />
            <Route path="/email/:id" element={
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <EmailDetails />
              </motion.div>
            } />
            <Route path="/analytics" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Analytics />
              </motion.div>
            } />
            <Route path="/settings" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Settings />
              </motion.div>
            } />
            <Route path="/priority-queue" element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <PriorityQueue />
              </motion.div>
            } />
            {/* Catch-all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </div>
    </Router>
  );
}