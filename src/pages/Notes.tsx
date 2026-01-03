import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NoteCard } from '@/components/NoteCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { getNotesByCategory } from '@/lib/notes';
import { searchNotes } from '@/lib/search';
import { Search, X } from 'lucide-react';

const Notes = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notes = getNotesByCategory(activeCategory);
  
  const searchResults = useMemo(() => {
    return searchNotes(notes, searchQuery);
  }, [notes, searchQuery]);

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              技术笔记
            </h1>
            <p className="text-muted-foreground">
              {hasQuery ? (
                <>找到 <span className="text-primary font-medium">{searchResults.length}</span> 篇相关笔记</>
              ) : (
                <>共 {searchResults.length} 篇笔记</>
              )}
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索笔记标题、内容或标签（支持模糊匹配）..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="清除搜索"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Search Tips */}
          {hasQuery && searchResults.length > 0 && (
            <div className="mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
              <span className="text-primary">提示：</span> 搜索结果按相关度排序，匹配的文字已高亮显示
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-8 overflow-x-auto pb-2">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Notes Grid */}
          {searchResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result, index) => {
                const titleMatch = result.matches.find(m => m.field === 'title');
                const excerptMatch = result.matches.find(m => m.field === 'excerpt');
                
                return (
                  <div
                    key={result.item.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <NoteCard 
                      note={result.item} 
                      searchQuery={searchQuery}
                      titleIndices={titleMatch?.indices || []}
                      excerptIndices={excerptMatch?.indices || []}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg text-foreground mb-2">没有找到相关笔记</p>
              <p className="text-sm text-muted-foreground">
                尝试使用不同的关键词或{' '}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:underline"
                >
                  清除搜索
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
