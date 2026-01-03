import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TableOfContents, MobileTocButton, extractHeadings } from '@/components/TableOfContents';
import { getNoteById, getCategoryById } from '@/lib/notes';
import { ArrowLeft, Calendar, Tag, ChevronRight, X } from 'lucide-react';

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const note = getNoteById(id || '');
  const category = note ? getCategoryById(note.category) : null;
  const [showMobileToc, setShowMobileToc] = useState(false);

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">笔记未找到</h1>
            <Link to="/notes" className="text-primary hover:underline">
              返回笔记列表
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const headings = extractHeadings(note.content);

  // Generate heading ID
  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Render markdown with IDs for headings
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers with IDs
        if (line.startsWith('### ')) {
          const text = line.slice(4);
          return (
            <h3 key={index} id={generateId(text)} className="text-xl font-medium mb-3 mt-5 text-foreground scroll-mt-24">
              {text}
            </h3>
          );
        }
        if (line.startsWith('## ')) {
          const text = line.slice(3);
          return (
            <h2 key={index} id={generateId(text)} className="text-2xl font-semibold mb-4 mt-6 text-foreground scroll-mt-24">
              {text}
            </h2>
          );
        }
        if (line.startsWith('# ')) {
          const text = line.slice(2);
          return (
            <h1 key={index} id={generateId(text)} className="text-3xl font-bold mb-6 mt-8 text-foreground scroll-mt-24">
              {text}
            </h1>
          );
        }
        
        // Blockquotes
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className="pl-4 border-l-4 border-primary italic my-4 text-muted-foreground">
              {line.slice(2)}
            </blockquote>
          );
        }
        
        // List items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="mb-2 text-secondary-foreground list-disc ml-6">
              {line.slice(2)}
            </li>
          );
        }
        if (/^\d+\. /.test(line)) {
          return (
            <li key={index} className="mb-2 text-secondary-foreground list-decimal ml-6">
              {line.replace(/^\d+\. /, '')}
            </li>
          );
        }
        
        // Empty lines
        if (line.trim() === '') {
          return <div key={index} className="h-4" />;
        }
        
        // Regular paragraphs
        return (
          <p key={index} className="mb-4 leading-relaxed text-secondary-foreground">
            {line}
          </p>
        );
      });
  };

  // Extract and render code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.split('\n');
        const language = lines[0].slice(3);
        const code = lines.slice(1, -1).join('\n');
        
        return (
          <div key={index} className="my-4">
            {language && (
              <div className="bg-muted/50 px-4 py-2 rounded-t-lg border border-b-0 border-border text-xs text-muted-foreground font-mono">
                {language}
              </div>
            )}
            <pre className={`code-block p-4 overflow-x-auto ${language ? 'rounded-t-none' : ''}`}>
              <code className="text-sm font-mono text-foreground">{code}</code>
            </pre>
          </div>
        );
      }
      return <div key={index}>{renderMarkdown(part)}</div>;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <article className="flex-1 min-w-0 max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-foreground transition-colors">首页</Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/notes" className="hover:text-foreground transition-colors">笔记</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground truncate max-w-[200px]">{note.title}</span>
              </nav>

              {/* Back Link */}
              <Link 
                to="/notes" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                返回笔记列表
              </Link>

              {/* Note Header */}
              <header className="mb-8">
                {category && (
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${category.color} mb-4`}>
                    <span className="w-2 h-2 rounded-full bg-current" />
                    {category.name}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {note.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {note.date}
                  </span>
                  {note.tags.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-4 w-4" />
                      {note.tags.join(', ')}
                    </span>
                  )}
                  {headings.length > 0 && (
                    <span className="text-muted-foreground">
                      · {headings.length} 个章节
                    </span>
                  )}
                </div>
              </header>

              {/* Note Content */}
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="markdown-content">
                  {renderContent(note.content)}
                </div>
              </div>
            </article>

            {/* Desktop TOC Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents content={note.content} />
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile TOC Button */}
      <MobileTocButton content={note.content} onOpen={() => setShowMobileToc(true)} />

      {/* Mobile TOC Modal */}
      {showMobileToc && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowMobileToc(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-card border-t border-border rounded-t-2xl p-6 animate-slide-up overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">目录</h3>
              <button
                onClick={() => setShowMobileToc(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(heading.id);
                      if (element) {
                        const offset = 100;
                        const top = element.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                      setShowMobileToc(false);
                    }}
                    className={`
                      w-full text-left text-sm py-2 px-3 rounded-lg transition-colors
                      ${heading.level === 1 ? 'pl-3' : heading.level === 2 ? 'pl-6' : 'pl-9'}
                      text-muted-foreground hover:text-foreground hover:bg-muted/50
                    `}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NoteDetail;
