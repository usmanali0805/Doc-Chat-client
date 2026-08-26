export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper-raised)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <p className="font-display text-xl mb-3">DocChat</p>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed max-w-[220px]">
              Chat with your documents. Every answer traced back to the page it came from.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-[var(--ink-soft)] mb-3">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="nav-link">Features</a></li>
              <li><a href="#pricing" className="nav-link">Pricing</a></li>
              <li><a href="#how-it-works" className="nav-link">How it works</a></li>
              <li><a href="#faq" className="nav-link">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-[var(--ink-soft)] mb-3">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="nav-link">About</a></li>
              <li><a href="#" className="nav-link">Blog</a></li>
              <li><a href="#" className="nav-link">Careers</a></li>
              <li><a href="#" className="nav-link">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono uppercase text-[var(--ink-soft)] mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="nav-link">Privacy policy</a></li>
              <li><a href="#" className="nav-link">Terms of service</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--line)]">
          <p className="text-xs text-[var(--ink-soft)]">© 2026 DocChat. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[var(--ink-soft)]">
            <a href="#" aria-label="GitHub" className="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.55 2.87 8.41 6.84 9.77.5.1.68-.22.68-.5v-1.75c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.29 9.29 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4 4 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.75 2.6 4.75 6.1V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
