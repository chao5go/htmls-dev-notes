import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getNoteById, getCategoryById } from '@/lib/notes';
import { ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react';

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const note = getNoteById(id || '');
  const category = note ? getCategoryById(note.category) : null;

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

  // Simple markdown to HTML converter
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-medium mb-3 mt-5 text-foreground">{line.slice(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold mb-4 mt-6 text-foreground">{line.slice(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h3 key={index} className="text-3xl font-bold mb-6 mt-8 text-foreground">{line.slice(2)}</h3>;
        }
        
        // Code blocks
        if (line.startsWith('```')) {
          return null; // Handle in a more complex way if needed
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

  // Extract code blocks
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
        <article className="container mx-auto px-4 max-w-4xl">
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
            </div>
          </header>

          {/* Note Content */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="markdown-content">
              {renderContent(note.content)}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default NoteDetail;
