import { BookOpen, Code, Layers, Tag } from 'lucide-react';
import { sampleNotes, categories } from '@/lib/notes';

export function StatsSection() {
  const allTags = [...new Set(sampleNotes.flatMap(note => note.tags))];

  const stats = [
    { icon: BookOpen, label: '笔记总数', value: sampleNotes.length, color: 'text-primary' },
    { icon: Layers, label: '技术分类', value: categories.length, color: 'text-code-blue' },
    { icon: Tag, label: '标签数量', value: allTags.length, color: 'text-code-yellow' },
    { icon: Code, label: '代码片段', value: '50+', color: 'text-terminal-green' },
  ];

  return (
    <section className="py-12 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-3 border border-border ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
