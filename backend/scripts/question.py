import requests
from bs4 import BeautifulSoup
import random
import json
import os

# Set your Groq API key
groq_api_key = os.getenv("GROQ_API_KEY")

def generate_question_and_distractors(description, category):
    # Define the API endpoint
    url = "https://api.groq.com/openai/v1/chat/completions"

    # Define the headers for the request
    headers = {
        'Authorization': f'Bearer {groq_api_key}',
        'Content-Type': 'application/json'
    }

    # Define the payload for the request
    payload = {
        "messages": [
            {"role": "system", "content": "You are an educational content summarizer."},
            {"role": "user", "content": f"Generate a multiple-choice question for the following course description in the field of {category}:\n\n{description}"}
        ],
        "model": "llama-3.3-70b-versatile",
        "max_tokens": 800,
        "temperature": 0.7
    }

    # Make the POST request to the API
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        completion_data = response.json()
        question = completion_data.get('choices', [{}])[0].get('message', {}).get('content', '').strip()
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Groq API: {e}")
        return None, None, None  # Return gracefully in case of an error

    # Simplified correct answer and distractors (replace with better logic if needed)
    words = description.split()
    correct_answer = words[0]  # Simplified correct answer
    distractors = words[1:4]  # Simplified distractors

    # Ensure we have enough distractors
    while len(distractors) < 3:
        distractors.append("Random Answer")

    distractors = distractors[:3]

    # Combine options
    options = distractors + [correct_answer]
    random.shuffle(options)

    return question, options, correct_answer

def scrape_course_details(coursera_url):
    try:
        # Send a GET request to fetch the content of the Coursera page
        response = requests.get(coursera_url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract the course description (from meta tag or other locations)
        description_tag = soup.find('meta', {'name': 'description'})
        description = description_tag['content'] if description_tag else "Description not available"

        # Extract the course category (may not always exist)
        category_tag = soup.find('meta', {'property': 'og:title'})  # Example for title-based category
        category = category_tag['content'] if category_tag else "Uncategorized"

        return description, category
    except requests.exceptions.HTTPError as e:
        print(f"HTTP error for {coursera_url}: {e}")
        return None, None
    except Exception as e:
        print(f"An unexpected error occurred while scraping {coursera_url}: {e}")
        return None, None

def save_questions_to_json(questions, category, output_file="generated_mcqs.json"):
    """Save generated questions to JSON file"""
    output = {
        "category": category,
        #"timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "questions": questions
    }
    
    try:
        with open(output_file, 'w') as f:
            json.dump(output, f, indent=2)
        print(f"\nQuestions saved to {output_file}")
    except Exception as e:
        print(f"Error saving questions: {e}")

def generate_questions_from_category(data, target_category):
    count = 0
    max_questions = 5
    used_questions = set()  # Track used questions
    generated_questions = []
    
    # Define diverse question templates
    generic_templates = [
        {
            "question": f"What is a primary focus of {target_category}?",
            "options": [
                "Patient care and assessment",
                "Medical documentation",
                "Healthcare technology",
                "Clinical procedures"
            ],
            "correct": "Patient care and assessment"
        },
        {
            "question": f"Which skill is most essential for {target_category} professionals?",
            "options": [
                "Critical thinking",
                "Time management",
                "Communication",
                "Technical expertise"
            ],
            "correct": "Critical thinking"
        },
        {
            "question": f"What is a key responsibility in {target_category}?",
            "options": [
                "Patient monitoring",
                "Administrative tasks",
                "Research activities",
                "Equipment maintenance"
            ],
            "correct": "Patient monitoring"
        },
        {
            "question": f"Which quality is most important for {target_category} practitioners?",
            "options": [
                "Attention to detail",
                "Physical strength",
                "Computer skills",
                "Marketing ability"
            ],
            "correct": "Attention to detail"
        },
        {
            "question": f"What best describes the role of {target_category} in healthcare?",
            "options": [
                "Direct patient care",
                "Data analysis",
                "Equipment sales",
                "Facility management"
            ],
            "correct": "Direct patient care"
        }
    ]

    for course in data["courses"]:
            if course["category"].lower() != target_category.lower():
                continue

            description = course.get("description", "")
            question, options, correct_answer = generate_question_and_distractors(description, target_category)

            if question and question not in used_questions:
                used_questions.add(question)
                # Add question to generated_questions list
                generated_questions.append({
                    "question": question,
                    "options": options,
                    "correct_answer": correct_answer
                })
                
                print(f"Category: {target_category}")
                print(f"Question: {question}")
                print("Options:")
                for i, option in enumerate(options, 1):
                    print(f"{i}. {option}")
                print(f"Correct Answer: {correct_answer}\n")
                count += 1

            if count >= max_questions:
                break
    # Fill remaining questions with templates
    template_index = 0
    while count < max_questions and template_index < len(generic_templates):
        template = generic_templates[template_index]
        if template["question"] not in used_questions:
            used_questions.add(template["question"])
            options = template["options"].copy()
            random.shuffle(options)
            
            # Add template question to generated_questions list
            generated_questions.append({
                "question": template["question"],
                "options": options,
                "correct_answer": template["correct"]
            })
            
            print(f"Category: {target_category}")
            print(f"Question: {template['question']}")
            print("Options:")
            for i, option in enumerate(options, 1):
                print(f"{i}. {option}")
            print(f"Correct Answer: {template['correct']}\n")
            count += 1
            
        template_index += 1
    
    # Save all generated questions to JSON
    save_questions_to_json(generated_questions, target_category)


def main():
    # Load the JSON file
    file_path = "mcq_question/file.json"  # Update this path if necessary

    if not os.path.exists(file_path):
        print(f"Error: The file '{file_path}' does not exist. Please ensure it is in the correct location.")
        return

    with open(file_path, "r") as file:
        data = json.load(file)

    # Prompt user for the target category
    target_category = input("Enter the category for which you want to generate questions: ").strip()
    print(f"Generating up to 5 questions for the category: {target_category}")
    generate_questions_from_category(data, target_category)

if __name__ == "__main__":
    main()
