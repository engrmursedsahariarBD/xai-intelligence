"use client";

import { motion } from "framer-motion";

export default function InsightFlow() {
  const stages = [
    {
      number: "01",
      title: "Ingest Data",
      description: "Connect your data sources seamlessly",
      icon: "📥",
    },
    {
      number: "02",
      title: "Analyze with AI",
      description: "Advanced algorithms process and understand patterns",
      icon: "🧠",
    },
    {
      number: "03",
      title: "Generate Insight",
      description: "Actionable intelligence delivered instantly",
      icon: "✨",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="features" className="relative py-32 px-6 bg-gradient-to-b from-black to-blue-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            The Intelligence Pipeline
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three seamless stages transform your raw data into intelligence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stages.map((stage, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:border-blue-500/50 transition duration-300"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition duration-300" />

              <div className="relative z-10">
                <div className="text-6xl font-bold text-blue-500/20 mb-4">
                  {stage.number}
                </div>

                <div className="text-4xl mb-4">{stage.icon}</div>

                <h3 className="text-2xl font-bold mb-3">{stage.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {stage.description}
                </p>

                {/* Connection Line */}
                {idx < stages.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform -translate-y-1/2" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}