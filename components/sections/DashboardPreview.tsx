"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "telemetry", label: "Real-Time Telemetry", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19V13" /></svg> },
  { id: "neural", label: "Neural Automations", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M12 3l7 4v5c0 4.2-2.8 7.2-7 9-4.2-1.8-7-4.8-7-9V7l7-4z" /></svg> },
  { id: "security", label: "Governance & Access", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M12 3l7 3v5c0 4.2-2.8 7.7-7 10-4.2-2.3-7-5.8-7-10V6l7-3z" /><path d="M9.5 12l1.7 1.7 3.3-3.4" /></svg> },
];

const tabContent: Record<string, {title: string; status: string; stats: Array<{label: string; value: string; diff: string}>; chartLabel: string}> = {
  telemetry: {
    title: "Telemetry Stream",
    status: "Operational // Latency 4.2ms",
    stats: [
      { label: "Throughput", value: "1.24 TB/s", diff: "+14.2%" },
      { label: "Active Nodes", value: "8,420", diff: "100% Healthy" },
      { label: "Anomaly Score", value: "0.0001%", diff: "-0.04%" },
    ],
    chartLabel: "Aggregated Cluster Load",
  },
  neural: {
    title: "Neural Automation Stream",
    status: "Model Fleet // 14 / 14 Online",
    stats: [
      { label: "Active Neural Models", value: "14 / 14", diff: "Online" },
      { label: "Inference Latency", value: "1.8ms", diff: "-12%" },
      { label: "Auto-Remediation Rate", value: "99.4%", diff: "Stable" },
    ],
    chartLabel: "Automated Response Confidence",
  },
  security: {
    title: "Security Command Center",
    status: "Zero-Trust // 1,204 Sessions",
    stats: [
      { label: "Zero-Trust Sessions", value: "1,204", diff: "Active" },
      { label: "IAM Violations", value: "0", diff: "Detected" },
      { label: "Encryption Standard", value: "AES-256-GCM", diff: "Protected" },
    ],
    chartLabel: "Policy Compliance Index",
  },
};

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("telemetry");

  return (
    <section className="py-32 px-6 bg-black text-white relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Designed for executive decision-makers.</h2>
          <p className="text-zinc-400 max-w-2xl font-light leading-7">
            No marketing cards or artificial clutter. A dedicated, low-latency workspace engineered for immediate clarity.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-blue-900/5">
          <div className="h-12 border-b border-zinc-800/80 px-4 flex items-center justify-between bg-zinc-900/40">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-zinc-500">xai-workspace // production-cluster-01</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <svg viewBox="0 0 24 24" className="w-4 h-4 hover:text-zinc-300 cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4h8" /><path d="M6 8h12" /><path d="M4 12h16" /><path d="M6 16h12" /><path d="M8 20h8" /></svg>
              <svg viewBox="0 0 24 24" className="w-4 h-4 hover:text-zinc-300 cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" /><path d="M12 8v4l2.5 2.5" /></svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
            <div className="border-r border-zinc-800/80 p-4 flex flex-col gap-1 bg-zinc-900/20">
              <div className="text-xs font-semibold text-zinc-500 px-3 py-2 uppercase tracking-wider">Views</div>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left relative ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-zinc-800/80 rounded-lg border border-zinc-700/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10 text-blue-400" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="col-span-3 p-8 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6">
                    <div>
                      <h3 className="text-lg font-semibold capitalize text-white">
                        {tabContent[activeTab].title}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono mt-1">Status: {tabContent[activeTab].status}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                      Live Sync Enabled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {tabContent[activeTab].stats.map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                        <div className="text-xs text-zinc-500 font-medium mb-1">{stat.label}</div>
                        <div className="text-xl font-semibold text-zinc-200">{stat.value}</div>
                        <div className="text-xs text-blue-400 mt-2 font-mono">{stat.diff}</div>
                      </div>
                    ))}
                  </div>

                  <div className="h-48 rounded-xl bg-zinc-900/30 border border-zinc-800/60 p-4 flex flex-col justify-end relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-end justify-between gap-2 h-32 w-full pt-4 z-10">
                      {[40, 65, 30, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.5, delay: i * 0.03 }}
                          className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600 mt-3 pt-2 border-t border-zinc-800/60">
                      <span>00:00:00 UTC</span>
                      <span className="flex items-center gap-1"><svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 19V10" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19v-4" /></svg> {tabContent[activeTab].chartLabel}</span>
                      <span>23:59:59 UTC</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
