import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

// Extract headings from markdown content
export function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-|-$/g, '');
      
      headings.push({ id, text, level });
    }
  }
  
  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="glass-card rounded-xl p-4 sticky top-24">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-sm font-medium text-foreground mb-3"
      >
        <span className="flex items-center gap-2">
          <List className="h-4 w-4 text-primary" />
          目录
        </span>
        <span className="text-xs text-muted-foreground">
          {headings.length} 节
        </span>
      </button>
      
      {isExpanded && (
        <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  w-full text-left text-sm py-1.5 px-2 rounded-md transition-all
                  ${heading.level === 1 ? 'pl-2' : heading.level === 2 ? 'pl-4' : 'pl-6'}
                  ${activeId === heading.id 
                    ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <span className="line-clamp-2">{heading.text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

// Mobile floating TOC button
export function MobileTocButton({ content, onOpen }: { content: string; onOpen: () => void }) {
  const headings = extractHeadings(content);
  
  if (headings.length === 0) return null;
  
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      aria-label="打开目录"
    >
      <List className="h-5 w-5" />
      <span className="text-sm font-medium">目录</span>
    </button>
  );
}
