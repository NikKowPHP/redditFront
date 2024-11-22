import { NextResponse } from 'next/server';
import type { AIResponse } from '@/types/api';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Mock response matching the provided structure
    const mockResponse: AIResponse = {
      query_title: "Reddit posts and comments analysis",
      stats: {
        total_comments: 2922,
        relevant_comments: 11,
        relevant_discussions: 2
      },
      sources: [
        {
          post_title: "My [25F] recent boyfriend [37M] gave me a book to read. It's really, really bad",
          subreddit: "BestofRedditorUpdates",
          relevance_score: 10297,
          post_url: "https://www.reddit.com/r/BestofRedditorUpdates/comments/1eiu1jg/my_25f_recent_boyfriend_37m_gave_me_a_book_to/",
          post_id: "1eiu1jg"
        },
        {
          post_title: "AITAH for wanting to use the hall pass my wife gave me 5 years ago when she cheated on me?",
          subreddit: "BestofRedditorUpdates",
          relevance_score: 5475,
          post_url: "https://www.reddit.com/r/BestofRedditorUpdates/comments/1f3td4p/aitah_for_wanting_to_use_the_hall_pass_my_wife/",
          post_id: "1f3td4p"
        }
      ],
      tldr: {
        title: "Reddit users discuss relationships, infidelity, and emotional connections",
        concise_summary: "Two Reddit posts, one about a woman's boyfriend giving her a sexist book and another about a man's wife cheating on him, spark discussions about relationships, infidelity, and emotional connections."
      },
      main_sections: [
        {
          section_title: "Relationships and Infidelity",
          points: [
            {
              text: "A woman's boyfriend gives her a sexist book, leading to a discussion about relationships and communication.",
              sources: [
                {
                  post_index: 0,
                  comment_index: 0,
                  url: "https://www.reddit.com/r/BestofRedditorUpdates/comments/1eiu1jg/my_25f_recent_boyfriend_37m_gave_me_a_book_to/lgy57sr/",
                  hover_text: "Comment from u/HeleneSedai (8094 upvotes) ... "
                },
                {
                  post_index: 0,
                  comment_index: 1,
                  url: "https://www.reddit.com/r/BestofRedditorUpdates/comments/1eiu1jg/my_25f_recent_boyfriend_37m_gave_me_a_book_to/lg98yxl/",
                  hover_text: "Comment from u/kaflarlalar (3130 upvotes) ... "
                }
              ]
            },
            {
              text: "A man's wife cheats on him, leading to a discussion about infidelity and emotional connections.",
              sources: [
                {
                  post_index: 1,
                  comment_index: 0,
                  url: "https://www.reddit.com/r/BestofRedditorUpdates/comments/1f3td4p/aitah_for_wanting_to_use_the_hall_pass_my_wife/lf3td4p/",
                  hover_text: "Comment from u/PolygonMan (5475 upvotes) ... "
                },
                {
                  post_index: 1,
                  comment_index: 1,
                  url: "https://www.reddit.com/r/BestofRedditorUpdates/comments/1f3td4p/aitah_for_wanting_to_use_the_hall_pass_my_wife/lf3td4p/",
                  hover_text: "Comment from u/Sl0th_luvr (5475 upvotes) ... "
                }
              ]
            }
          ]
        }
      ]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    );
  }
} 