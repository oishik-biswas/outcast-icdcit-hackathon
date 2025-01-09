import fitz  # PyMuPDF
import requests # type: ignore
import os
import time
from collections import deque
from datetime import datetime
from dotenv import load_dotenv # type: ignore
from typing import List, Optional

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class RateLimit:
    def _init_(self):
        self.requests = deque()
        self.window = 60  # seconds
        self.token_limit = 6000

    def check_limit(self, tokens):
        now = datetime.now()
        while self.requests and (now - self.requests[0][0]).total_seconds() > self.window:
            self.requests.popleft()

        current_tokens = sum(r[1] for r in self.requests)
        return current_tokens + tokens <= self.token_limit

    def add_request(self, tokens):
        self.requests.append((datetime.now(), tokens))


def extract_pdf_content(pdf_path: str) -> str:
    pdf = fitz.open(pdf_path)
    text = ""
    for i in range(len(pdf)):
        text += pdf[i].get_text() + "\n"
        print(f"Page {i+1}/{len(pdf)} processed")
    return text

def clean_and_chunk_text(text: str, chunk_size: int = 800) -> List[str]:

    clean_text = "\n".join(line.strip() for line in text.splitlines() if line.strip())


    words = clean_text.split()
    chunks = []
    current_chunk = []
    token_count = 0

    for word in words:
        word_tokens = len(word) // 4
        if token_count + word_tokens > chunk_size:
            chunks.append(" ".join(current_chunk))
            current_chunk = [word]
            token_count = word_tokens
        else:
            current_chunk.append(word)
            token_count += word_tokens

    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def query_groq_llm(prompt: str, context: str, rate_limiter: RateLimit) -> Optional[str]:
    estimated_tokens = (len(prompt) + len(context)) // 4 + 500

    if not rate_limiter.check_limit(estimated_tokens):
        time.sleep(10)

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "messages": [
                    {"role": "system", "content": "You are an educational content summarizer."},
                    {"role": "user", "content": f"{prompt}\n\nContext:\n{context}"}
                ],
                "model": "llama-3.3-70b-versatile",
                "max_tokens": 500,
                "temperature": 0.7
            }
        )

        if response.status_code == 200:
            rate_limiter.add_request(estimated_tokens)
            return response.json()["choices"][0]["message"]["content"]
        return None

    except Exception as e:
        print(f"API Error: {e}")
        return None

def process_pdf_to_summary(pdf_path: str, output_path: str):
    print(f"Processing: {pdf_path}")

    text = extract_pdf_content(pdf_path)
    chunks = clean_and_chunk_text(text)
    print(f"Created {len(chunks)} chunks")


    rate_limiter = RateLimit()
    summary = []
    prompt = "Extract and summarize the key educational concepts from this text section."

    for i, chunk in enumerate(chunks, 1):
        print(f"\nProcessing chunk {i}/{len(chunks)}")
        max_retries = 3

        for attempt in range(max_retries):
            response = query_groq_llm(prompt, chunk, rate_limiter)
            if response:
                summary.append(f"=== Section {i} ===\n{response}")
                time.sleep(2)  # Small delay between successful calls
                break
            elif attempt < max_retries - 1:
                time.sleep(5 * (attempt + 1))

    with open("C:/Users/KIIT0001/WebstormProjects/outcast-icdcit-hackathon/backend/final_summary.txt", "w", encoding="utf-8") as f:
        f.write("\n\n".join(summary))

    print(f"Summary saved to: {output_path}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("Usage: python process_pdf.py <input_pdf> <output_file>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_file = sys.argv[2]
    process_pdf_to_summary(input_pdf, output_file)
