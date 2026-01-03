import React from 'react';

interface HighlightTextProps {
  text: string;
  indices: number[];
  highlightClassName?: string;
}

export function HighlightText({ 
  text, 
  indices, 
  highlightClassName = "bg-primary/30 text-primary font-medium rounded px-0.5" 
}: HighlightTextProps) {
  if (indices.length === 0) {
    return <>{text}</>;
  }

  const sortedIndices = [...new Set(indices)].sort((a, b) => a - b);
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // Group consecutive indices
  const ranges: [number, number][] = [];
  let rangeStart = sortedIndices[0];
  let rangeEnd = sortedIndices[0];

  for (let i = 1; i < sortedIndices.length; i++) {
    if (sortedIndices[i] === rangeEnd + 1) {
      rangeEnd = sortedIndices[i];
    } else {
      ranges.push([rangeStart, rangeEnd]);
      rangeStart = sortedIndices[i];
      rangeEnd = sortedIndices[i];
    }
  }
  ranges.push([rangeStart, rangeEnd]);

  // Build parts
  for (const [start, end] of ranges) {
    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }
    parts.push(
      <mark key={start} className={highlightClassName}>
        {text.slice(start, end + 1)}
      </mark>
    );
    lastIndex = end + 1;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

// Simple text highlight for query substring
export function HighlightQuery({ 
  text, 
  query,
  highlightClassName = "bg-primary/30 text-primary font-medium rounded px-0.5"
}: { 
  text: string; 
  query: string;
  highlightClassName?: string;
}) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let index = lowerText.indexOf(lowerQuery);

  while (index !== -1) {
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index));
    }
    parts.push(
      <mark key={index} className={highlightClassName}>
        {text.slice(index, index + query.length)}
      </mark>
    );
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
