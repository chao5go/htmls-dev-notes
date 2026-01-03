import { NoteCard } from './NoteCard';
import { sampleNotes } from '@/lib/notes';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function FeaturedNotes() {
  const featuredNotes = sampleNotes.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              最新笔记
            </h2>
            <p className="text-muted-foreground">
              记录学习过程中的技术要点
            </p>
          </div>
          <Link 
            to="/notes" 
            className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredNotes.map((note, index) => (
            <div 
              key={note.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NoteCard note={note} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/notes" 
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            查看全部笔记
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
