Categories and Task Management app..

*View a list of categories with task counts and completed task metrics.
*Add, edit, or delete categories with responsive and accessible controls.
*Add tasks under each category with options to mark them as completed.


#Dynamic Task Management: Each category allows for adding tasks, with real-time updates to the completed and total task counts.
#Responsive Design: Tailwind CSS ensures a mobile-friendly, visually appealing experience.
#Effortless User Interaction: Adding new categories or tasks and editing existing entries is seamless, with "Enter" key functionality for quick input.
#Secure Deletions: A confirmation modal prevents accidental deletions of categories.
#Task Completion Tracking: Categories display task progress with separate counts for total and completed tasks.

Example jason file:
const categories = [
  {
    id: 1,
    name: "Work",
    tasks: [
      { id: 1, name: "Complete project report", isCompleted: false },
      { id: 2, name: "Email team", isCompleted: true }
    ]
  },
  {
    id: 2,
    name: "Personal",
    tasks: [
      { id: 1, name: "Buy groceries", isCompleted: false },
      { id: 2, name: "Call mom", isCompleted: true }
    ]
  }
];


Updated Task Management Logic:

>For each category, display its list of tasks below its name.
>Include an input field below each category for adding new tasks.
>Provide checkboxes or buttons to mark tasks as completed or delete them.
