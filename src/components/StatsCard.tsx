import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

export default function StatsCard({ title, value, icon, color, delay }: StatsCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <motion.p 
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.2, duration: 0.3 }}
              >
                {value}
              </motion.p>
            </div>
            <motion.div 
              className={`${color} p-3 rounded-full text-white`}
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: delay + 0.1, duration: 0.5, type: "spring" }}
            >
              {icon}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}