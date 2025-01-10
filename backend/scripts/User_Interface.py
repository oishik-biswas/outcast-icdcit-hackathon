import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json
import threading
import os
from ttkthemes import ThemedTk

class MLAlgorithmsUI:
    def __init__(self, root):
        self.root = root
        self.root.title("ML Algorithms Interface")
        self.root.geometry("800x600")
        
        # Create main notebook for tabs
        self.notebook = ttk.Notebook(root)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=5)
        
        # Create tabs for each algorithm
        self.create_process_pdf_tab()
        self.create_workload_scheduler_tab()
        self.create_course_recommender_tab()
        self.create_question_generator_tab()

    def create_process_pdf_tab(self):
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text='Course Reducer')
        
        # File selection
        file_frame = ttk.LabelFrame(tab, text="PDF Processing", padding=10)
        file_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(file_frame, text="Input PDF:").pack(side='left')
        self.pdf_path = tk.StringVar()
        ttk.Entry(file_frame, textvariable=self.pdf_path, width=50).pack(side='left', padx=5)
        ttk.Button(file_frame, text="Browse", command=self.browse_pdf).pack(side='left')
        
        # Output path
        output_frame = ttk.LabelFrame(tab, text="Output", padding=10)
        output_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(output_frame, text="Output Path:").pack(side='left')
        self.output_path = tk.StringVar()
        ttk.Entry(output_frame, textvariable=self.output_path, width=50).pack(side='left', padx=5)
        ttk.Button(output_frame, text="Browse", command=self.browse_output).pack(side='left')
        
        # Process button
        ttk.Button(tab, text="Process PDF", command=self.process_pdf).pack(pady=10)
        
        # Progress and status
        self.status_label = ttk.Label(tab, text="")
        self.status_label.pack(pady=5)
        
        self.progress = ttk.Progressbar(tab, mode='indeterminate')
        self.progress.pack(fill='x', padx=10, pady=5)

    def create_workload_scheduler_tab(self):
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text='Workload Scheduler')
        
        # User ID input
        user_frame = ttk.LabelFrame(tab, text="User Information", padding=10)
        user_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(user_frame, text="User ID:").pack(side='left')
        self.user_id = tk.StringVar()
        ttk.Entry(user_frame, textvariable=self.user_id, width=30).pack(side='left', padx=5)
        
        # Generate schedule button
        ttk.Button(tab, text="Generate Schedule", command=self.generate_schedule).pack(pady=10)
        
        # Schedule display
        self.schedule_text = tk.Text(tab, height=20, width=70)
        self.schedule_text.pack(padx=10, pady=5)

    def create_course_recommender_tab(self):
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text='Course Recommender')
        
        # Skills input
        skills_frame = ttk.LabelFrame(tab, text="Skills", padding=10)
        skills_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(skills_frame, text="Enter skills (comma-separated):").pack()
        self.skills_input = tk.Text(skills_frame, height=3, width=50)
        self.skills_input.pack(pady=5)
        
        # Search button
        ttk.Button(tab, text="Search Courses", command=self.search_courses).pack(pady=10)
        
        # Results display
        self.results_text = tk.Text(tab, height=20, width=70)
        self.results_text.pack(padx=10, pady=5)

    def create_question_generator_tab(self):
        tab = ttk.Frame(self.notebook)
        self.notebook.add(tab, text='Question Generator')
        
        # Category input
        category_frame = ttk.LabelFrame(tab, text="Category", padding=10)
        category_frame.pack(fill='x', padx=10, pady=5)
        
        ttk.Label(category_frame, text="Enter category:").pack(side='left')
        self.category = tk.StringVar()
        ttk.Entry(category_frame, textvariable=self.category, width=30).pack(side='left', padx=5)
        
        # Generate button
        ttk.Button(tab, text="Generate Questions", command=self.generate_questions).pack(pady=10)
        
        # Questions display
        self.questions_text = tk.Text(tab, height=20, width=70)
        self.questions_text.pack(padx=10, pady=5)

    # Helper functions for Course Reducer
    def browse_pdf(self):
        filename = filedialog.askopenfilename(filetypes=[("PDF files", "*.pdf")])
        if filename:
            self.pdf_path.set(filename)

    def browse_output(self):
        filename = filedialog.asksaveasfilename(defaultextension=".txt")
        if filename:
            self.output_path.set(filename)

    def process_pdf(self):
        if not self.pdf_path.get() or not self.output_path.get():
            messagebox.showerror("Error", "Please select both input PDF and output path")
            return
        
        self.progress.start()
        self.status_label.config(text="Processing PDF...")
        
        def process():
            try:
                from process_pdf import process_pdf_to_summary
                process_pdf_to_summary(self.pdf_path.get(), self.output_path.get())
                self.root.after(0, self.process_complete)
            except Exception as e:
                self.root.after(0, lambda: self.process_error(str(e)))
        
        threading.Thread(target=process, daemon=True).start()

    def process_complete(self):
        self.progress.stop()
        self.status_label.config(text="Processing complete!")
        messagebox.showinfo("Success", "PDF processing completed successfully!")

    def process_error(self, error_msg):
        self.progress.stop()
        self.status_label.config(text="Error occurred!")
        messagebox.showerror("Error", f"An error occurred: {error_msg}")

    # Helper functions for Workload Scheduler
    def generate_schedule(self):
        if not self.user_id.get():
            messagebox.showerror("Error", "Please enter a User ID")
            return
        
        def schedule():
            try:
                from workload_scheduler import main
                schedule_data = main(self.user_id.get())
                self.root.after(0, lambda: self.display_schedule(schedule_data))
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("Error", str(e)))
        
        threading.Thread(target=schedule, daemon=True).start()

    def display_schedule(self, schedule_data):
        self.schedule_text.delete(1.0, tk.END)
        self.schedule_text.insert(tk.END, json.dumps(schedule_data, indent=2))

    # Helper functions for Course Recommender
    def search_courses(self):
        skills = self.skills_input.get(1.0, tk.END).strip()
        if not skills:
            messagebox.showerror("Error", "Please enter skills")
            return
        
        def search():
            try:
                from course_scraper import CourseScraper  # Updated import
                scraper = CourseScraper()
                courses = scraper.search_courses(skills.split(','))
                scraper.close()
                self.root.after(0, lambda: self.display_courses(courses))
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("Error", str(e)))
        
        threading.Thread(target=search, daemon=True).start()

    def display_courses(self, courses):
        self.results_text.delete(1.0, tk.END)
        self.results_text.insert(tk.END, json.dumps(courses, indent=2))

    # Helper functions for Question Generator
    def generate_questions(self):
        if not self.category.get():
            messagebox.showerror("Error", "Please enter a category")
            return
        
        def generate():
            try:
                from question import generate_questions_from_category  # Updated import
                with open("backend\scripts\question_input.j", "r") as f:  # Updated path
                    data = json.load(f)
                questions = generate_questions_from_category(data, self.category.get())
                self.root.after(0, lambda: self.display_questions(questions))
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("Error", str(e)))
        
        threading.Thread(target=generate, daemon=True).start()

    def display_questions(self, questions):
        self.questions_text.delete(1.0, tk.END)
        self.questions_text.insert(tk.END, json.dumps(questions, indent=2))

def main():
    root = ThemedTk(theme="arc")  # Using a modern theme
    app = MLAlgorithmsUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()