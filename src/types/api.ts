interface Source {
  post_title: string;
  subreddit: string;
  relevance_score: number;
  post_url: string;
  post_id: string;
}

interface Stats {
  total_comments: number;
  relevant_comments: number;
  relevant_discussions: number;
}

interface TLDR {
  title: string;
  concise_summary: string;
}

interface SourceReference {
  post_index: number;
  comment_index: number;
  url: string;
  hover_text: string;
}

interface Point {
  text: string;
  sources: SourceReference[];
}

interface Section {
  section_title: string;
  points: Point[];
}

export interface AIResponse {
  query_title: string;
  stats: Stats;
  sources: Source[];
  tldr: TLDR;
  main_sections: Section[];
} 