// Simple fuzzy search implementation
export function fuzzyMatch(text: string, query: string): { match: boolean; score: number; indices: number[] } {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Exact match gets highest score
  if (textLower.includes(queryLower)) {
    const startIndex = textLower.indexOf(queryLower);
    const indices = Array.from({ length: queryLower.length }, (_, i) => startIndex + i);
    return { match: true, score: 100, indices };
  }
  
  // Fuzzy matching
  let queryIndex = 0;
  let score = 0;
  const indices: number[] = [];
  let consecutiveBonus = 0;
  
  for (let i = 0; i < text.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      indices.push(i);
      score += 10 + consecutiveBonus;
      consecutiveBonus += 5; // Bonus for consecutive matches
      queryIndex++;
    } else {
      consecutiveBonus = 0;
    }
  }
  
  const match = queryIndex === queryLower.length;
  
  // Penalty for gaps
  if (match && indices.length > 1) {
    const gaps = indices.reduce((sum, idx, i) => {
      if (i === 0) return 0;
      return sum + (idx - indices[i - 1] - 1);
    }, 0);
    score -= gaps * 2;
  }
  
  return { match, score: match ? Math.max(score, 1) : 0, indices };
}

// Search notes with fuzzy matching
export interface SearchResult<T> {
  item: T;
  score: number;
  matches: {
    field: string;
    indices: number[];
  }[];
}

export function searchNotes<T extends { title: string; excerpt: string; tags: string[] }>(
  items: T[],
  query: string
): SearchResult<T>[] {
  if (!query.trim()) {
    return items.map(item => ({ item, score: 0, matches: [] }));
  }
  
  const results: SearchResult<T>[] = [];
  
  for (const item of items) {
    const titleMatch = fuzzyMatch(item.title, query);
    const excerptMatch = fuzzyMatch(item.excerpt, query);
    const tagMatches = item.tags.map(tag => fuzzyMatch(tag, query));
    const bestTagMatch = tagMatches.reduce(
      (best, current) => (current.score > best.score ? current : best),
      { match: false, score: 0, indices: [] }
    );
    
    // Calculate combined score with weights
    const score = 
      (titleMatch.score * 3) + // Title has highest weight
      (excerptMatch.score * 1) + 
      (bestTagMatch.score * 2);
    
    if (titleMatch.match || excerptMatch.match || bestTagMatch.match) {
      const matches: { field: string; indices: number[] }[] = [];
      
      if (titleMatch.match) {
        matches.push({ field: 'title', indices: titleMatch.indices });
      }
      if (excerptMatch.match) {
        matches.push({ field: 'excerpt', indices: excerptMatch.indices });
      }
      if (bestTagMatch.match) {
        matches.push({ field: 'tags', indices: bestTagMatch.indices });
      }
      
      results.push({ item, score, matches });
    }
  }
  
  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
