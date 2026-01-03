import { Code2, ExternalLink, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-colors">
              <Code2 className="h-5 w-5 text-primary" />
              <div className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-semibold text-foreground">
                HTML<span className="text-primary">s</span>
              </span>
              <span className="text-xs text-muted-foreground">技术学习笔记</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              首页
            </Link>
            <Link 
              to="/notes" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              笔记
            </Link>
            <a 
              href="https://htmls.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              工具集
              <ExternalLink className="h-3 w-3" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                to="/notes" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                笔记
              </Link>
              <a 
                href="https://htmls.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                工具集
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
