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
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="mb-4 block"><svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path d="M12 22V12" stroke="#7DBE9F" strokeWidth="2" strokeLinecap="round"/><path d="M8 12c0-4 4-8 4-8s4 4 4 8" fill="#7DBE9F"/><path d="M6 16c0-3 3-6 6-6" stroke="#5A9E7F" strokeWidth="1.5" fill="none"/><path d="M18 16c0-3-3-6-6-6" stroke="#5A9E7F" strokeWidth="1.5" fill="none"/></svg></span>
          <h2 className="text-xl font-bold text-ink mb-2">Your garden is empty</h2>
          <p className="text-ink/60">Complete lessons to earn plants!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 pb-4">
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="8" y="16" width="8" height="6" rx="1" fill="#C4956A"/><path d="M12 16V10" stroke="#7DBE9F" strokeWidth="2"/><path d="M8 12c0-3 4-6 4-6s4 3 4 6" fill="#7DBE9F"/></svg>
            </div>
            <p className="font-medium text-ink text-sm">{item.label}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-4 h-4 bg-mint rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <span className="text-xs text-ink/40">Planted</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
