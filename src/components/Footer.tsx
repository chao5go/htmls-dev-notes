import { Code2, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm font-semibold">
                HTMLs<span className="text-muted-foreground">.技术学习笔记</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left max-w-md">
              本网站为个人技术笔记网页，主要用于记录和分享前端开发、HTML/CSS 学习心得及相关技术文档，不涉及任何商业经营、论坛交流或盈利性内容。
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
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
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-destructive" /> for web developers
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} www.justhtmls.com</span>
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              鄂ICP备2024048768号
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
