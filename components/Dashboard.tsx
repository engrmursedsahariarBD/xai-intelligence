"use client";

import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <section id="dashboard" className="relative py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            Intelligence Dashboard Preview
          </h2>
          <p className="text-xl text-gray-400">
            Experience the power of structured insights
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-2xl"
        >
          <div className="flex h-96 md:h-screen bg-gradient-to-br from-white/5 to-blue-900/10">
            {/* Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="hidden md:flex w-64 bg-white/5 border-r border-white/10 flex-col p-6 space-y-4"
            >
              <div className="text-sm font-semibold text-blue-400">NAVIGATION</div>
              {["Dashboard", "Analytics", "Reports", "Settings"].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className={`px-4 py-3 rounded-lg cursor-pointer transition ${
                    idx === 0
                      ? "bg-blue-600/30 border border-blue-500/50 text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6 md:p-12 space-y-8 overflow-y-auto">
              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-2">Intelligence Overview</h3>
                <p className="text-gray-400">Real-time insights from your data</p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  { label: "Data Points", value: "1.2M", trend: "+12%" },
                  { label: "Insights Generated", value: "847", trend: "+23%" },
                  { label: "Automation Rate", value: "94%", trend: "+8%" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 border border-white/20 rounded-lg p-6 hover:border-blue-500/50 transition"
                  >
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">{stat.value}</span>
                      <span className="text-green-400 text-sm">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/20 rounded-lg p-6 h-40"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Analytics Trend</h4>
                  <div className="text-sm text-gray-400">Last 7 days</div>
                </div>
                {/* Simple Bar Chart Simulation */}
                <div className="flex items-end justify-around h-24 gap-2">
                  {[40, 55, 65, 48, 72, 58, 65].map((height, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-70 hover:opacity-100 transition"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}