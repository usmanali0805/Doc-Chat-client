import { Link } from 'react-router';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--paper)]/90 backdrop-blur border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-medium tracking-tight">
          DocChat
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#use-cases" className="nav-link">Use cases</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-block text-sm font-medium nav-link">
            Log in
          </Link>
          <a href="#pricing" className="btn-primary text-sm font-medium px-4 py-2 rounded-full">
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
