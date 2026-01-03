import { Calendar, ChevronRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Note, getCategoryById } from '@/lib/notes';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const category = getCategoryById(note.category);

  return (
    <Link 
      to={`/note/${note.id}`}
      className="group block glass-card rounded-xl p-6 hover-lift"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Category Badge */}
          {category && (
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${category.color} mb-3`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {note.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {note.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {note.date}
            </span>
            {note.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                {note.tags.slice(0, 2).join(', ')}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
}
