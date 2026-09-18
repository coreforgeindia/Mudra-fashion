'use client';

import React, { useState } from 'react';
import { SIZE_CHARTS, SizeChartData } from '@/data/sizeCharts';
import { X, Ruler, HelpCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartType?: 'shirt' | 'pants' | 'tshirt' | 'labcoat' | 'uniform';
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  chartType = 'shirt',
}) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'chart' | 'guide'>('chart');

  const chartData: SizeChartData = SIZE_CHARTS[chartType] || SIZE_CHARTS.shirt;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#FBF8F1] text-[#212529] rounded-none border border-[#E8E0D0] shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E0D0] bg-[#FFF9EF]">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#F5F0E5] text-[#C4A35A] border border-[#E8D5A3]">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#212529]">{chartData.title}</h3>
                <p className="text-xs text-[#6B7280]">{chartData.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-[#212529] hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader Toolbar: Tabs + IN/CM Switch */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-neutral-100/70 border-b border-[#E8E0D0] gap-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'chart'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-[#6B7280] hover:text-[#212529] hover:bg-neutral-200'
                }`}
              >
                Size Measurements
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === 'guide'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-[#6B7280] hover:text-[#212529] hover:bg-neutral-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>How to Measure</span>
              </button>
            </div>

            {/* IN / CM Toggle */}
            <div className="flex items-center space-x-1 bg-[#FBF8F1] border border-neutral-300 p-0.5">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${
                  unit === 'in' ? 'bg-[#C4A35A] text-white' : 'text-[#6B7280] hover:bg-neutral-100'
                }`}
              >
                IN
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold transition-colors ${
                  unit === 'cm' ? 'bg-[#C4A35A] text-white' : 'text-[#6B7280] hover:bg-neutral-100'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {activeTab === 'chart' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-900 text-white font-serif uppercase tracking-wider">
                      {chartData.columns.map((col) => (
                        <th key={col.key} className="py-3 px-4 border border-neutral-800">
                          {col.label} ({unit.toUpperCase()})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-[#E8E0D0] transition-colors hover:bg-[#F5F0E5]/50 ${
                          idx % 2 === 0 ? 'bg-[#FBF8F1]' : 'bg-[#FFF9EF]'
                        }`}
                      >
                        {chartData.columns.map((col) => {
                          if (col.key === 'size') {
                            return (
                              <td key={col.key} className="py-3 px-4 font-bold text-[#212529] border border-[#E8E0D0]">
                                {row.size}
                              </td>
                            );
                          }
                          const valObj = row[col.key] as { in: number; cm: number } | undefined;
                          return (
                            <td key={col.key} className="py-3 px-4 text-[#212529] border border-[#E8E0D0]">
                              {valObj ? valObj[unit] : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-[#F5F0E5] border-l-4 border-[#C4A35A]">
                  <h4 className="font-semibold text-sm text-[#A8893D] mb-1">Fit Guarantee Tip</h4>
                  <p className="text-xs text-[#212529]">
                    For custom bulk orders or tailored corporate fittings, request sample swatches or trial size sets from our Mudra Fashions team.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chartData.howToMeasure.map((item, idx) => (
                    <div key={idx} className="p-4 border border-[#E8E0D0] bg-[#FFF9EF]/50 flex space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C4A35A] flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-xs uppercase tracking-wider text-[#212529] mb-1">
                          {item.title}
                        </h5>
                        <p className="text-xs text-[#6B7280] leading-relaxed">{item.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[#E8E0D0] bg-[#FFF9EF] flex items-center justify-between text-xs text-[#6B7280]">
            <span>Need custom corporate tailoring? Contact bulk@mudrafashions.com</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
            >
              Close Guide
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
