'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { EASE } from '@/lib/easing';

// Avoid TS errors: Framer Motion `ease` typing is stricter than our `EASE` values.
const easeReveal = EASE.reveal as any;
const easeStandard = EASE.standard as any;
const easeSoft = EASE.soft as any;


// TS workaround: Framer Motion `ease` typing expects a specific type.
// The project’s `EASE` values are compatible at runtime; we avoid TS errors.
const motionEaseReveal = EASE.reveal as any;
const motionEaseStandard = EASE.standard as any;


function InsightCard({
  label,
  value,
  delta,
  trend = [],
  index = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: number[];
  index?: number;
}) {
  const positive = !!delta?.startsWith('+');
  const max = Math.max(...trend, 1);

  return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, delay: (index ?? 0) * 0.06 }}
        whileHover={{ y: -3, borderColor: 'var(--border-strong)' }}

      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--panel)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        {label}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 26, fontWeight: 560, letterSpacing: '-0.02em' }}>{value}</span>
        {delta && (
          <span
            className="mono"
            style={{ fontSize: 12, color: positive ? 'var(--success)' : '#f87171' }}
          >
            {delta}
          </span>
        )}
      </div>

      {trend.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 28 }}>
          {trend.map((v, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.max(8, (v / max) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.03 }}

              style={{
                flex: 1,
                borderRadius: 2,
                background:
                  i === trend.length - 1 ? 'var(--accent)' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

const NAV_ITEMS = [
  { id: 'streams', label: 'Data Streams', hint: '12 active' },
  { id: 'insights', label: 'AI Insights', hint: '4 new' },
  { id: 'models', label: 'Models', hint: '3 deployed' },
] as const;

type DashboardTab = (typeof NAV_ITEMS)[number]['id'];

type Panel = {
  title: string;
  cards: { label: string; value: string; delta?: string; trend: number[] }[];
  rows: { name: string; status: string; throughput: string }[];
};

const PANELS: Record<DashboardTab, Panel> = {
  streams: {
    title: 'Data Streams',
    cards: [
      { label: 'Ingest volume', value: '1.2M/s', delta: '+4.1%', trend: [4, 6, 5, 8, 9, 7, 10] },
      { label: 'Active sources', value: '312', delta: '+12', trend: [2, 3, 3, 4, 5, 6, 7] },
      { label: 'Schema drift', value: '0.02%', delta: '-0.01%', trend: [5, 4, 4, 3, 2, 2, 1] },
    ],
    rows: [
      { name: 'stripe-webhooks', status: 'Healthy', throughput: '48k/s' },
      { name: 'crm-events', status: 'Healthy', throughput: '12k/s' },
      { name: 'iot-fleet-west', status: 'Degraded', throughput: '3k/s' },
    ],
  },
  insights: {
    title: 'AI Insights',
    cards: [
      { label: 'Confidence (avg)', value: '96.4%', delta: '+1.8%', trend: [6, 7, 7, 8, 8, 9, 9] },
      { label: 'Anomalies flagged', value: '18', delta: '+3', trend: [1, 2, 2, 4, 3, 5, 6] },
      { label: 'Insights generated', value: '2,048', delta: '+214', trend: [3, 4, 5, 5, 7, 8, 9] },
    ],
    rows: [
      { name: 'Churn risk spike — EU segment', status: 'Reviewed', throughput: 'High' },
      { name: 'Unusual latency in checkout', status: 'New', throughput: 'Medium' },
      { name: 'Demand forecast revision', status: 'New', throughput: 'High' },
    ],
  },
  models: {
    title: 'Models',
    cards: [
      { label: 'p50 latency', value: '8ms', delta: '-1ms', trend: [9, 8, 8, 7, 6, 6, 5] },
      { label: 'Deployed models', value: '3', delta: '0', trend: [3, 3, 3, 3, 3, 3, 3] },
      { label: 'Drift score', value: '0.03', delta: '+0.01', trend: [1, 1, 2, 2, 2, 3, 3] },
    ],
    rows: [
      { name: 'insight-transformer-v4', status: 'Serving', throughput: '99.98%' },
      { name: 'anomaly-detector-v2', status: 'Serving', throughput: '99.91%' },
      { name: 'forecast-lstm-v1', status: 'Shadow', throughput: '—' },
    ],
  },
};

function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'Healthy' || status === 'Serving' || status === 'Reviewed'
      ? 'var(--success)'
      : status === 'Degraded'
        ? '#f87171'
        : 'var(--text-muted)';

  return (
    <span
      className="mono"
      style={{
        fontSize: 11,
        color: tone,
        border: `1px solid ${tone}33`,
        borderRadius: 999,
        padding: '3px 8px',
      }}
    >
      {status}
    </span>
  );
}

function Sidebar({
  active,
  onSelect,
}: {
  active: DashboardTab;
  onSelect: (v: DashboardTab) => void;
}) {
  return (
    <aside
      style={{
        width: 208,
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 11,
          color: 'var(--text-faint)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '4px 10px 10px',
        }}
      >
        Workspace
      </div>

      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              textAlign: 'left',
              padding: '10px 10px',
              borderRadius: 8,
              fontSize: 13.5,
              color: isActive ? 'var(--text)' : 'var(--text-muted)',
              background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <span>{item.label}</span>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-faint)' }}>
              {item.hint}
            </span>
          </button>
        );
      })}
    </aside>
  );
}

function MainPanel({ active }: { active: DashboardTab }) {
  const panel = PANELS[active];

  return (
    <div style={{ flex: 1, padding: 28, minWidth: 0 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
transition={{ duration: 0.35 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 20,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 560, letterSpacing: '-0.01em' }}>{panel.title}</h3>
            <span className="mono" style={{ fontSize: 12, color: 'var(--text-faint)' }}>
              Updated just now
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 14,
              marginBottom: 20,
            }}
          >
            {panel.cards.map((card, i) => (
              <InsightCard key={card.label} index={i} {...card} />
            ))}
          </div>

          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            {panel.rows.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.4, delay: 0.1 + i * 0.05 } as any}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '13px 16px',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                  fontSize: 13.5,
                }}
              >
                <span>{row.name}</span>
                <span style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <StatusPill status={row.status} />
                  <span className="mono" style={{ color: 'var(--text-muted)', width: 64, textAlign: 'right' }}>
                    {row.throughput}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DashboardMock() {
  const [active, setActive] = useState<DashboardTab>('streams');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
transition={{ duration: 0.7 }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-elevated)',
        overflow: 'hidden',
        boxShadow: '0 40px 80px -40px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {['#f87171', '#facc15', '#4ade80'].map((c) => (
          <span
            key={c}
            style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }}
          />
        ))}
        <span className="mono" style={{ marginLeft: 12, fontSize: 12, color: 'var(--text-faint)' }}>
          xai.app/workspace
        </span>
      </div>

      <div style={{ display: 'flex', minHeight: 420 }}>
        <Sidebar active={active} onSelect={setActive} />
        <MainPanel active={active} />
      </div>
    </motion.div>
  );
}

export default function DashboardPreview() {

  return (
    <section id="dashboard" className="section">
      <div className="container">
        <SectionHeading
          index={3}
          eyebrow="Intelligence Dashboard"
          title="Where insight becomes a decision."
          subtitle="A working preview of the Xai workspace — switch tabs to see how live data streams, AI-generated insights, and deployed models are surfaced without ceremony."
        />

        <div style={{ marginTop: 48 }}>
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

