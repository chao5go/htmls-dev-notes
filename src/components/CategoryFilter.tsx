import { Code, Palette, Braces, Smartphone, Zap, Wrench, Layers } from 'lucide-react';
import { categories } from '@/lib/notes';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  palette: Palette,
  braces: Braces,
  smartphone: Smartphone,
  zap: Zap,
  wrench: Wrench,
};

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          activeCategory === 'all'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
        }`}
      >
        <Layers className="h-4 w-4" />
        全部
      </button>
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Code;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
