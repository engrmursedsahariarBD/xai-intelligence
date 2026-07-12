export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-text-faint">
        <span>© {new Date().getFullYear()} Xai — Intelligence Workspace</span>
        <span>Built for the RacoAI Frontend Challenge</span>
      </div>
    </footer>
  );
}
