import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NoteCard } from '@/components/NoteCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { getNotesByCategory } from '@/lib/notes';
import { Search } from 'lucide-react';

const Notes = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notes = getNotesByCategory(activeCategory);
  const filteredNotes = searchQuery
    ? notes.filter(
        note =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : notes;

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
              共 {filteredNotes.length} 篇笔记
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索笔记标题、内容或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8 overflow-x-auto pb-2">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <NoteCard note={note} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">没有找到相关笔记</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
