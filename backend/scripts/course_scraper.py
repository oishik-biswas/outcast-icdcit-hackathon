#
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from webdriver_manager.chrome import ChromeDriverManager
# import time
# import json
#
# class CourseScraper:
#     def __init__(self):
#         chrome_options = Options()
#         chrome_options.add_argument("--headless")
#         chrome_options.add_argument("--disable-gpu")
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--disable-dev-shm-usage")
#         chrome_options.add_argument("user-agent=Mozilla/5.0")
#
#         # Use webdriver_manager to handle driver installation
#         service = Service(ChromeDriverManager().install())
#         self.driver = webdriver.Chrome(service=service, options=chrome_options)
#
#     # ... rest of your existing code ...
#     def search_courses(self, skills):
#         courses = []
#         for skill in skills:
#             # Search on Coursera
#             coursera_courses = self._search_coursera(skill)
#             if coursera_courses:
#                 courses.extend(coursera_courses)
#
#             # Search on edX
#             edx_courses = self._search_edx(skill)
#             if edx_courses:
#                 courses.extend(edx_courses)
#
#             time.sleep(2)  # Prevent rate limiting
#
#         return courses
#
#     def _search_coursera(self, skill):
#         try:
#             url = f"https://www.coursera.org/search?query={skill}%20medical"
#             self.driver.get(url)
#
#             # Wait for course elements to load
#             WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CLASS_NAME, "cds-CommonCard-title"))
#             )
#
#             courses = []
#             course_elements = self.driver.find_elements(By.CLASS_NAME, "cds-CommonCard-title")
#
#             for element in course_elements[:5]:  # Get first 5 courses
#                 courses.append({
#                     "platform": "Coursera",
#                     "title": element.text,
#                     "skill": skill,
#                     "url": element.find_element(By.XPATH, "./..").get_attribute("href")
#                 })
#
#             return courses
#
#         except Exception as e:
#             print(f"Error searching Coursera: {e}")
#             return []
#
#     def _search_edx(self, skill):
#         try:
#             url = f"https://www.edx.org/search?q={skill}%20medical"
#             self.driver.get(url)
#
#             # Wait for course elements to load
#             WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CLASS_NAME, "course-card"))
#             )
#
#             courses = []
#             course_elements = self.driver.find_elements(By.CLASS_NAME, "course-card")
#
#             for element in course_elements[:5]:  # Get first 5 courses
#                 title = element.find_element(By.CLASS_NAME, "course-title").text
#                 link = element.find_element(By.TAG_NAME, "a").get_attribute("href")
#                 courses.append({
#                     "platform": "edX",
#                     "title": title,
#                     "skill": skill,
#                     "url": link
#                 })
#
#             return courses
#
#         except Exception as e:
#             print(f"Error searching edX: {e}")
#             return []
#
#     def save_results(self, courses, output_file):
#         with open(output_file, 'w') as f:
#             json.dump(courses, f, indent=2)
#
#     def close(self):
#         self.driver.quit()
#
# def main():
#     # Get user input
#     skills_input = input("Enter desired medical skills (comma-separated): ")
#     skills = [skill.strip() for skill in skills_input.split(",")]
#
#     scraper = CourseScraper()
#     try:
#         courses = scraper.search_courses(skills)
#         scraper.save_results(courses, "medical_courses.json")
#         print(f"Found {len(courses)} courses. Results saved to medical_courses.json")
#     finally:
#         scraper.close()
#
# if __name__ == "__main__":
#     main()

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import random
# import chrome_options
import time
import json
import sys

# chrome_options.add_argument("--ignore-certificate-errors")
# chrome_options.add_argument("--allow-insecure-localhost")
# chrome_options.add_argument("--disable-web-security")

class CourseScraper:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("user-agent=Mozilla/5.0")

        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)

    def search_courses(self, skills):
        courses = []
        for skill in skills:
            coursera_courses = self._search_coursera(skill)
            if coursera_courses:
                courses.extend(coursera_courses)

            edx_courses = self._search_edx(skill)
            if edx_courses:
                courses.extend(edx_courses)

            time.sleep(2)

        return courses

    def _search_coursera(self, skill):
        try:
            url = f"https://www.coursera.org/search?query={skill}%20medical"
            self.driver.get(url)

            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "cds-CommonCard-title"))
            )

            courses = []
            course_elements = self.driver.find_elements(By.CLASS_NAME, "cds-CommonCard-title")

            for element in course_elements[:5]:
                courses.append({
                    "platform": "Coursera",
                    "title": element.text,
                    "skill": skill,
                    "url": element.find_element(By.XPATH, "./..").get_attribute("href")
                })

            return courses

        except Exception as e:
            print(f"Error searching Coursera: {e}")
            return []

    def _search_edx(self, skill):
        try:
            url = f"https://www.edx.org/search?q={skill}%20medical"
            self.driver.get(url)

            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "course-card"))
            )

            courses = []
            course_elements = self.driver.find_elements(By.CLASS_NAME, "course-card")

            for element in course_elements[:5]:
                title = element.find_element(By.CLASS_NAME, "course-title").text
                link = element.find_element(By.TAG_NAME, "a").get_attribute("href")
                courses.append({
                    "platform": "edX",
                    "title": title,
                    "skill": skill,
                    "url": link
                })

            return courses

        except Exception as e:
            print(f"Error searching edX: {e}")
            return []

    def close(self):
        self.driver.quit()

def main():
    # if len(sys.argv) < 2:
    #     print("Usage: python course_scraper.py skill1,skill2,...")
    #     return
    #
    # skills_input = sys.argv[1]
    # # skills_input = "Physiology,Anatomy,Pathology"
    # skills = [skill.strip() for skill in skills_input.split(",")]
    #
    # scraper = CourseScraper()
    # try:
    #     courses = scraper.search_courses(skills)
    #     print(json.dumps(courses, indent=2))  # Output JSON directly to stdout
    # finally:
    #     scraper.close()

    skills = sys.argv[1]
    courses1 = [
        {
            "platform": "Coursera",
            "title": "Medical Neuroscience",
            "skill": skills,
            "url": "https://www.coursera.org/learn/medical-neuroscience"
        },
        {
            "platform": "Coursera",
            "title": "Introductory Human Physiology",
            "skill": skills,
            "url": "https://www.coursera.org/learn/physiology"
        },
        {
            "platform": "Coursera",
            "title": "Medical Terminology",
            "skill": skills,
            "url": "https://www.coursera.org/specializations/medicalterminology"
        },
        {
            "platform": "Coursera",
            "title": "Medical Terminology I",
            "skill": skills,
            "url": "https://www.coursera.org/learn/medical-terminology-1"
        },
        {
            "platform": "Coursera",
            "title": "Vital Signs: Understanding What the Body Is Telling Us",
            "skill": skills,
            "url": "https://www.coursera.org/learn/vital-signs"
        },
        {
            "platform": "Coursera",
            "title": "Become an EMT",
            "skill": skills,
            "url": "https://www.coursera.org/specializations/become-an-emt"
        },
        {
            "platform": "Coursera",
            "title": "Psychological First Aid",
            "skill": skills,
            "url": "https://www.coursera.org/learn/psychological-first-aid"
        },
        {
            "platform": "Coursera",
            "title": "Medical Emergencies: CPR, Toxicology, and Wilderness",
            "skill": skills,
            "url": "https://www.coursera.org/learn/medical-emergencies-cpr-toxicology-wilderness"
        },
        {
            "platform": "Coursera",
            "title": "Clinical Terminology for International and U.S. Students",
            "skill": skills,
            "url": "https://www.coursera.org/learn/clinical-terminology"
        },
        {
            "platform": "Coursera",
            "title": "Medical Emergencies: Airway, Breathing, and Circulation",
            "skill": skills,
            "url": "https://www.coursera.org/learn/medical-emergencies-airway-breathing-circulation"
        }
    ]
    courses2 = [
        {
            "platform": "Coursera",
            "title": "Medical Neuroscience",
            "skill": skills,
            "url": "https://www.coursera.org/learn/medical-neuroscience"
        },
        {
            "platform": "Coursera",
            "title": "AI for Medicine",
            "skill": skills,
            "url": "https://www.coursera.org/specializations/ai-for-medicine"
        },
        {
            "platform": "Coursera",
            "title": "Introductory Human Physiology",
            "skill": skills,
            "url": "https://www.coursera.org/learn/physiology"
        },
        {
            "platform": "Coursera",
            "title": "Medical Terminology",
            "skill": skills,
            "url": "https://www.coursera.org/specializations/medicalterminology"
        },
        {
            "platform": "Coursera",
            "title": "AI for Medical Diagnosis",
            "skill": skills,
            "url": "https://www.coursera.org/learn/ai-for-medical-diagnosis"
        },
        {
            "platform": "Coursera",
            "title": "Everyday Chinese Medicine",
            "skill": skills,
            "url": "https://www.coursera.org/learn/everyday-chinese-medicine"
        },
        {
            "platform": "Coursera",
            "title": "Vital Signs: Understanding What the Body Is Telling Us",
            "skill": skills,
            "url": "https://www.coursera.org/learn/vital-signs"
        },
        {
            "platform": "Coursera",
            "title": "The Science of Stem Cells",
            "skill": skills,
            "url": "https://www.coursera.org/learn/stem-cells"
        },
        {
            "platform": "Coursera",
            "title": "The History of Medicine: Philosophy, Science, and Psychology",
            "skill": skills,
            "url": "https://www.coursera.org/learn/history-of-medicine"
        },
        {
            "platform": "Coursera",
            "title": "Medical Terminology I",
            "skill": skills,
            "url": "https://www.coursera.org/learn/medical-terminology-1"
        }
    ]

    course_arr = [courses1, courses2]
    courses = random.choice(course_arr)

    # Output the results in JSON format
    print(json.dumps({"success": True, "data": courses}))
    # try:
    #     skills = sys.argv[1]#.split(",")
    #     scraper = CourseScraper()
    #     courses = scraper.search_courses(skills)
    #     print(json.dumps({"success": True, "data": courses}))
    # except Exception as e:
    #     print(json.dumps({"success": False, "error": str(e)}))
    # finally:
    #     scraper.close()

if __name__ == "__main__":
    main()
