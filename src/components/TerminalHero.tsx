import { ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TerminalHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="glass-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl animate-fade-in">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/50">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/80" />
                <span className="w-3 h-3 rounded-full bg-code-yellow/80" />
                <span className="w-3 h-3 rounded-full bg-terminal-green/80" />
              </div>
              <span className="flex-1 text-center text-xs text-muted-foreground font-mono">
                ~/html-notes
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 md:p-8 font-mono text-sm md:text-base">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <span className="text-terminal-green">$</span>
                  <span className="text-muted-foreground">cat welcome.md</span>
                </div>
                
                <div className="pl-4 space-y-3">
                  <h1 className="text-2xl md:text-4xl font-bold">
                    <span className="text-foreground">HTML</span>
                    <span className="gradient-text">技术学习笔记</span>
                  </h1>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    记录和分享前端开发、HTML/CSS 学习心得及相关技术文档。
                    <br className="hidden md:block" />
                    用简洁的代码片段和清晰的笔记，帮助你快速掌握 Web 开发技能。
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-4">
                  <span className="text-terminal-green">$</span>
                  <span className="text-code-blue">./start-learning</span>
                  <span className="w-2 h-5 bg-primary terminal-cursor ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/notes"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors group"
            >
              开始阅读笔记
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://htmls.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
            >
              访问工具集
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
