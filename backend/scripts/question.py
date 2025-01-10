import requests
import json
import os
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    print("Error: GROQ_API_KEY is not set. Please set the API key as an environment variable.")
    exit()

def parse_mcq(raw_question):
    """
    Parses the raw MCQ text into structured components.
    Returns a dictionary with question, options, and correct answer.
    """
    try:
        # Split the content into question and answer section
        parts = raw_question.split('\n\nCorrect answer: ')
        if len(parts) != 2:
            return None
            
        question_part, correct_answer = parts
        
        # Split question and options
        lines = question_part.strip().split('\n')
        question = lines[0].strip()
        
        # Extract options
        options = {}
        for line in lines[1:]:
            if line.strip():
                match = re.match(r'([A-D])\)(.*)', line.strip())
                if match:
                    option_letter, option_text = match.groups()
                    options[option_letter] = option_text.strip()
        
        # Clean up correct answer
        correct_answer = correct_answer.strip()
        correct_letter = correct_answer[0]  # Extract just the letter
        
        return {
            "question_text": question,
            "options": options,
            "correct_answer": correct_letter
        }
    except Exception as e:
        print(f"Error parsing MCQ: {e}")
        return None

def call_groq_api(description, category):
    """
    Calls the Groq API to generate a multiple-choice question based on a course description and category.
    """
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        'Authorization': f'Bearer {groq_api_key}',
        'Content-Type': 'application/json'
    }
    payload = {
        "messages": [
            {"role": "system", "content": "You are an educational content creator. Generate multiple-choice questions in this exact format:\n[Question]\nA) [Option]\nB) [Option]\nC) [Option]\nD) [Option]\n\nCorrect answer: [Letter]) [Correct option]"},
            {"role": "user", "content": f"Generate a multiple-choice question for the following course description in the field of {category}:\n\n{description} with good content and grammar."}
        ],
        "model": "llama-3.3-70b-versatile",
        "max_tokens": 800,
        "temperature": 0.7
    }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        completion_data = response.json()
        raw_question = completion_data.get('choices', [{}])[0].get('message', {}).get('content', '').strip()
        return parse_mcq(raw_question)
    except requests.exceptions.RequestException as e:
        print(f"Error calling Groq API: {e}")
        return None

def generate_questions_from_json(json_file):
    """
    Reads courses from a JSON file and generates MCQs using the Groq API.
    """
    try:
        with open(json_file, "r") as file:
            data = json.load(file)
    except FileNotFoundError:
        print(f"Error: The file '{json_file}' does not exist.")
        return
    except json.JSONDecodeError:
        print("Error: Failed to parse the JSON file.")
        return

    questions_output = []

    for course in data.get("courses", []):
        category = course.get("category", "Uncategorized")
        description = course.get("description", "No description available.")

        print(f"Generating question for category: {category}")
        parsed_question = call_groq_api(description, category)

        if parsed_question:
            questions_output.append({
                "category": category,
                "question_text": parsed_question["question_text"],
                "options": parsed_question["options"],
                "correct_answer": parsed_question["correct_answer"]
            })
            print(f"Generated question for {category}")
        else:
            print(f"Failed to generate a question for category: {category}")

    return questions_output

def save_questions_to_json(questions, output_file="generated_mcqs.json"):
    """
    Saves the generated questions to a JSON file.
    """
    try:
        with open(output_file, 'w') as f:
            json.dump(questions, f, indent=2)
        print(f"\nQuestions saved to {output_file}")
    except Exception as e:
        print(f"Error saving questions: {e}")

def main():
    input_file = "mcq_question/question_input.json"
    output_file = "generated_mcqs.json"

    print("Reading input file and generating questions...")
    questions = generate_questions_from_json(input_file)

    if questions:
        save_questions_to_json(questions, output_file)

if __name__ == "__main__":
    main()