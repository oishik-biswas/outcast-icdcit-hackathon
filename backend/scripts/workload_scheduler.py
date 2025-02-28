# import json
# import os
# from dotenv import load_dotenv
# import requests
#
# load_dotenv()
# GROQ_API_KEY = os.getenv("GROQ_API_KEY")
#
#
# def load_tasks(filepath: str) -> dict:
#     with open(filepath, 'r') as f:
#         return json.load(f)
#
#
# def query_groq_for_schedule(tasks: dict) -> str:
#     prompt = f"""
#     Create a weekly schedule for these tasks and hours:
#     {json.dumps(tasks, indent=2)}
#
#     Requirements:
#     1. Distribute tasks across 7 working days (Monday-Sunday)
#     2. Each day should have 8-9 working hours
#     3. Start time: 9:00 AM
#     4. Include 1-hour lunch break at 1:00 PM
#     5. Format output as text timetable
#     6. Prioritize tasks with higher "priority" values like surgeries and emergencies
#
#     Output format example:
#     MONDAY
#     9:00 AM - 10:30 AM: Task 1
#     10:30 AM - 12:00 PM: Task 2
#     1:00 PM - 2:00 PM: Lunch Break
#     [...]
#     """
#
#     try:
#         response = requests.post(
#             "https://api.groq.com/openai/v1/chat/completions",
#             headers={
#                 "Authorization": f"Bearer {GROQ_API_KEY}",
#                 "Content-Type": "application/json"
#             },
#             json={
#                 "messages": [
#                     {"role": "system", "content": "You are a scheduling assistant that creates text-based timetables."},
#                     {"role": "user", "content": prompt}
#                 ],
#                 "model": "llama-3.3-70b-versatile",
#                 "max_tokens": 1000,
#                 "temperature": 0.7
#             }
#         )
#
#         if response.status_code == 200:
#             return response.json()["choices"][0]["message"]["content"]
#         else:
#             raise Exception(f"API Error: {response.status_code}")
#
#     except Exception as e:
#         print(f"Error: {e}")
#         return None
#
#
# def clean_schedule(schedule: str) -> str:
#     """Extract only the schedule portion and remove trailing descriptions."""
#     days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
#     schedule_lines = schedule.split('\n')
#
#     # Find first occurrence of a day
#     start_idx = 0
#     for i, line in enumerate(schedule_lines):
#         if any(day in line.upper() for day in days):
#             start_idx = i
#             break
#
#     # Find end of schedule (last time entry)
#     end_idx = len(schedule_lines)
#     for i in range(len(schedule_lines) - 1, -1, -1):
#         line = schedule_lines[i].strip()
#         if any(day in line.upper() for day in days) or ("AM" in line or "PM" in line):
#             end_idx = i + 1
#             break
#
#     # Return only schedule portion
#     return '\n'.join(schedule_lines[start_idx:end_idx])
#
#
# def convert_to_json(schedule: str) -> dict:
#     """Convert text schedule to JSON format."""
#     days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
#     schedule_dict = {}
#     current_day = None
#
#     if not schedule:
#         print("Error: Empty schedule received")
#         return None
#
#     print(f"Processing schedule:\n{schedule}")  # Debug log
#
#     for line in schedule.split('\n'):
#         line = line.strip()
#         if not line:
#             continue
#
#         if line in days:
#             current_day = line
#             schedule_dict[current_day] = []
#             print(f"Current day set to: {current_day}")  # Debug log
#         elif current_day and ":" in line:
#             try:
#                 time_range, task = line.split(": ", 1)  # Split on first occurrence
#                 start_time, end_time = time_range.split(" - ")
#                 schedule_dict[current_day].append({
#                     "start_time": start_time.strip(),
#                     "end_time": end_time.strip(),
#                     "task": task.strip()
#                 })
#                 print(f"Added task: {task.strip()} from {start_time.strip()} to {end_time.strip()}")  # Debug log
#             except Exception as e:
#                 print(f"Error parsing line '{line}': {e}")
#                 continue
#
#     if not schedule_dict:
#         print("Error: No data parsed from schedule")
#         return None
#
#     return schedule_dict
#
#
# # def convert_to_json(schedule: str) -> dict:
# #     """Convert text schedule to JSON format."""
# #     days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
# #     schedule_dict = {}
# #     current_day = None
# #
# #     if not schedule:
# #         print("Error: Empty schedule received")
# #         return None
# #
# #     print(f"Processing schedule:\n{schedule}")  # Debug log
# #
# #     for line in schedule.split('\n'):
# #         line = line.strip()
# #         if not line:
# #             continue
# #
# #         if line in days:
# #             current_day = line
# #             schedule_dict[current_day] = []
# #         elif current_day and ":" in line:
# #             try:
# #                 time_range, task = line.split(": ", 1)  # Split on first occurrence
# #                 start_time, end_time = time_range.split(" - ")
# #                 schedule_dict[current_day].append({
# #                     "start_time": start_time.strip(),
# #                     "end_time": end_time.strip(),
# #                     "task": task.strip()
# #                 })
# #             except Exception as e:
# #                 print(f"Error parsing line '{line}': {e}")
# #                 continue
# #
# #     if not schedule_dict:
# #         print("Error: No data parsed from schedule")
# #         return None
# #
# #     return schedule_dict
#
# def save_schedule(schedule: str, output_path: str, as_json: bool = True):
#     """Save schedule to file in text or JSON format."""
#     # Create output directory if it doesn't exist
#     output_dir = os.path.dirname(output_path)
#     if output_dir and not os.path.exists(output_dir):
#         os.makedirs(output_dir)
#
#     clean_text = clean_schedule(schedule)
#
#     if not clean_text:
#         print("Error: No clean schedule text generated")
#         return False
#
#     if as_json:
#         schedule_dict = convert_to_json(clean_text)
#         if not schedule_dict:
#             print("Error: Failed to convert schedule to JSON")
#             return False
#
#         output_path = os.path.join('Workload_Scheduling', 'weekly_schedule.json')
#         with open(output_path, 'w') as f:
#             json.dump(schedule_dict, f, indent=2)
#     else:
#         output_path = os.path.join('Workload_Scheduling', 'weekly_schedule.txt')
#         with open(output_path, 'w') as f:
#             f.write(clean_text)
#     return True
#
#
# def main():
#     tasks = load_tasks("input_workload.json")
#     schedule = query_groq_for_schedule(tasks)
#
#     if schedule:
#         success = save_schedule(schedule, "Workload_Scheduling", as_json=True)
#         if success:
#             print("Schedule saved to Workload_Scheduling/weekly_schedule.json")
#         else:
#             print("Failed to save schedule")
#     else:
#         print("Failed to generate schedule")
#
#
# if __name__ == "__main__":
#     main()


import os
import json
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MONGO_URI = "mongodb+srv://biswasoishik5:lSL48O6YeMb5edxe@cluster0.3ctle.mongodb.net/outcast?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "outcast"
TASKS_COLLECTION = "tasks"

def fetch_tasks_from_mongo(user_id: str) -> list:
    """
    Fetch tasks from MongoDB for a specific user.
    """
    try:
        # Connect to MongoDB
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[TASKS_COLLECTION]

        # Fetch tasks for the given user
        tasks = list(collection.find({"userId": user_id}, {"_id": 0, "name": 1, "numberOfHours": 1}))
        print(tasks)
        return tasks
    except Exception as e:
        print(f"Error fetching tasks from MongoDB: {e}")
        return []



def query_groq_for_schedule(tasks: list) -> str:
    """
    Query the GROQ API to generate a schedule based on the tasks.
    """
    prompt = f"""
    Create a weekly schedule for these tasks and hours:
    {json.dumps(tasks, indent=2)}
    
    Requirements:
    1. Distribute tasks across 7 working days (Monday-Sunday)
    2. Each day should have 8-9 working hours
    3. Start time: 9:00 AM
    4. Include 1-hour lunch break at 1:00 PM
    5. Format output as text timetable
    6. Prioritize tasks with higher workload or hours
    
    Output format example:
    MONDAY
    9:00 AM - 10:30 AM: Task 1
    10:30 AM - 12:00 PM: Task 2
    1:00 PM - 2:00 PM: Lunch Break
    [...]
    """

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "messages": [
                    {"role": "system", "content": "You are a scheduling assistant that creates text-based timetables."},
                    {"role": "user", "content": prompt}
                ],
                "model": "llama-3.3-70b-versatile",
                "max_tokens": 1000,
                "temperature": 0.7
            }
        )

        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"API Error: {response.status_code}")

    except Exception as e:
        print(f"Error: {e}")
        return None


def convert_to_json(schedule: str) -> dict:
    """
    Convert the schedule text into a JSON object.
    """
    days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
    schedule_dict = {}
    current_day = None

    for line in schedule.split('\n'):
        line = line.strip()
        if line in days:
            current_day = line
            schedule_dict[current_day] = []
        elif current_day and ":" in line:
            try:
                time_range, task = line.split(": ", 1)
                start_time, end_time = time_range.split(" - ")
                schedule_dict[current_day].append({
                    "start_time": start_time.strip(),
                    "end_time": end_time.strip(),
                    "task": task.strip()
                })
            except ValueError as e:
                print(f"Error parsing line '{line}': {e}")
                continue

    return schedule_dict


def main(user_id):
    print("Hello")
    # Fetch tasks from MongoDB for the given user
    tasks = fetch_tasks_from_mongo(user_id)

    if not tasks:
        print("No tasks available.")
        return

    # Query GROQ API for schedule
    schedule = query_groq_for_schedule(tasks)
    print(schedule)

    if schedule:
        # Convert schedule to JSON
        schedule_json = convert_to_json(schedule)
        print(schedule_json)
        print(json.dumps(schedule_json))  # Output as JSON string for Node.js
    else:
        print("Failed to generate schedule.")


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python script.py <userId>")
        sys.exit(1)

    user_id = sys.argv[1]
    main(user_id)

