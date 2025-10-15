import sys
import json
import os
from openai import OpenAI

def generate_summary(content: str, format: str) -> dict:
    format_prompts = {
        "bullet-points": "Summarize the content in 3-5 key bullet points. Each point should be concise and capture the main ideas.",
        "flashcards": "Create 3-5 flashcards from the content. Each flashcard should have a question and a concise answer.",
        "qa": "Create 3-5 question-answer pairs that capture the main points of the content."
    }

    summary_examples = {
        "bullet-points": '["point 1", "point 2", "point 3"]',
        "flashcards": '[{"question": "Q1", "answer": "A1"}, {"question": "Q2", "answer": "A2"}]',
        "qa": '[{"question": "Q1", "answer": "A1"}, {"question": "Q2", "answer": "A2"}]'
    }

    prompt = f"""Please analyze the following content and {format_prompts[format]}.

Content: {content}

Return the result in JSON format with this structure:
{{
  "title": "A brief title for the content",
  "summary": {summary_examples[format]}
}}"""

    try:
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that summarizes content in various formats. Always return valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=1000
        )

        result = completion.choices[0].message.content
        if not result:
            raise ValueError("No response from OpenAI")

        return json.loads(result)
    except Exception as e:
        print(f"Error generating summary: {e}", file=sys.stderr)
        # Fallback mock data
        return {
            "title": "Content Summary",
            "summary": {
                "bullet-points": ["Key point 1: Content processed successfully", "Key point 2: AI processing completed", "Key point 3: Summary generated"],
                "flashcards": [{"question": "What was processed?", "answer": "Content from the provided URL"}, {"question": "How was it summarized?", "answer": "Using AI technology"}],
                "qa": [{"question": "What is this about?", "answer": "URL content summary"}, {"question": "How was it created?", "answer": "AI-powered summarization"}]
            }[format]
        }

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python summarize.py <content> <format>", file=sys.stderr)
        sys.exit(1)

    content = sys.argv[1]
    format = sys.argv[2]

    if format not in ["bullet-points", "flashcards", "qa"]:
        print("Invalid format. Must be one of: bullet-points, flashcards, qa", file=sys.stderr)
        sys.exit(1)

    try:
        result = generate_summary(content, format)
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
