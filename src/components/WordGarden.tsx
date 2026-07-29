"use client";

import { motion } from "framer-motion";

interface GardenItem {
  id: string;
  label: string;
  plantedAt: string;
}

export default function WordGarden({ items }: { items: GardenItem[] }) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-6xl mb-4 block">🌱</span>
          <h2 className="text-xl font-bold text-ink mb-2">Your garden is empty</h2>
          <p className="text-text-secondary">Complete lessons to earn plants!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-screen pt-8 pb-4">
      <h2 className="text-2xl font-bold text-ink mb-6">Word Garden</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-card p-4 border border-gray-100 shadow-sm"
          >
            <div className="w-full h-20 rounded-lg bg-mint/10 flex items-center justify-center mb-3">
              <span className="text-4xl">🪴</span>
            </div>
            <p className="font-medium text-ink text-sm">{item.label}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-4 h-4 bg-mint rounded-full flex items-center justify-center">
                <span className="text-white text-[10px]">✓</span>
              </span>
              <span className="text-xs text-text-muted">Planted</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
