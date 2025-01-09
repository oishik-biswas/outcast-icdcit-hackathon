
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import json

class CourseScraper:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("user-agent=Mozilla/5.0")
        
        # Use webdriver_manager to handle driver installation
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        
    # ... rest of your existing code ...
    def search_courses(self, skills):
        courses = []
        for skill in skills:
            # Search on Coursera
            coursera_courses = self._search_coursera(skill)
            if coursera_courses:
                courses.extend(coursera_courses)
                
            # Search on edX
            edx_courses = self._search_edx(skill)
            if edx_courses:
                courses.extend(edx_courses)
                
            time.sleep(2)  # Prevent rate limiting
            
        return courses
    
    def _search_coursera(self, skill):
        try:
            url = f"https://www.coursera.org/search?query={skill}%20medical"
            self.driver.get(url)
            
            # Wait for course elements to load
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "cds-CommonCard-title"))
            )
            
            courses = []
            course_elements = self.driver.find_elements(By.CLASS_NAME, "cds-CommonCard-title")
            
            for element in course_elements[:5]:  # Get first 5 courses
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
            
            # Wait for course elements to load
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "course-card"))
            )
            
            courses = []
            course_elements = self.driver.find_elements(By.CLASS_NAME, "course-card")
            
            for element in course_elements[:5]:  # Get first 5 courses
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
    
    def save_results(self, courses, output_file):
        with open(output_file, 'w') as f:
            json.dump(courses, f, indent=2)
    
    def close(self):
        self.driver.quit()

def main():
    # Get user input
    skills_input = input("Enter desired medical skills (comma-separated): ")
    skills = [skill.strip() for skill in skills_input.split(",")]
    
    scraper = CourseScraper()
    try:
        courses = scraper.search_courses(skills)
        scraper.save_results(courses, "medical_courses.json")
        print(f"Found {len(courses)} courses. Results saved to medical_courses.json")
    finally:
        scraper.close()

if __name__ == "__main__":
    main()