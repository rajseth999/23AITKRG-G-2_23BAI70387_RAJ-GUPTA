export const COURSES = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
    instructor: "Dr. Sarah Williams",
    instructorId: "2",
    thumbnail: "/courses/web-dev.jpg",
    duration: "8 weeks",
    lessons: 24,
    enrolled: 1250,
    category: "Development",
    level: "Beginner",
    progress: 65
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React concepts including hooks, context, and performance optimization.",
    instructor: "Dr. Sarah Williams",
    instructorId: "2",
    thumbnail: "/courses/react.jpg",
    duration: "6 weeks",
    lessons: 18,
    enrolled: 890,
    category: "Development",
    level: "Advanced",
    progress: 30
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning basics.",
    instructor: "Prof. James Anderson",
    instructorId: "4",
    thumbnail: "/courses/data-science.jpg",
    duration: "10 weeks",
    lessons: 30,
    enrolled: 2100,
    category: "Data Science",
    level: "Intermediate",
    progress: 0
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description: "Learn user-centered design, wireframing, and prototyping techniques.",
    instructor: "Emily Rodriguez",
    instructorId: "5",
    thumbnail: "/courses/design.jpg",
    duration: "5 weeks",
    lessons: 15,
    enrolled: 750,
    category: "Design",
    level: "Beginner",
    progress: 100
  },
  {
    id: "5",
    title: "Cloud Computing with AWS",
    description: "Comprehensive guide to Amazon Web Services and cloud architecture.",
    instructor: "Dr. Sarah Williams",
    instructorId: "2",
    thumbnail: "/courses/cloud.jpg",
    duration: "8 weeks",
    lessons: 22,
    enrolled: 1500,
    category: "Cloud",
    level: "Intermediate",
    progress: 45
  },
  {
    id: "6",
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps using React Native and modern tools.",
    instructor: "David Kim",
    instructorId: "6",
    thumbnail: "/courses/mobile.jpg",
    duration: "7 weeks",
    lessons: 21,
    enrolled: 980,
    category: "Development",
    level: "Intermediate",
    progress: 0
  }
]

export const LESSONS = [
  {
    id: "1-1",
    courseId: "1",
    title: "Getting Started with HTML",
    description: "Understanding the basics of HTML structure and elements",
    duration: "45 min",
    content: `
# Getting Started with HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements.

## What You Will Learn

- Understanding HTML document structure
- Common HTML elements and tags
- Creating your first web page
- Best practices for semantic HTML

## HTML Document Structure

Every HTML document follows a basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
\`\`\`

## Key Takeaways

1. HTML uses tags to structure content
2. The \`<head>\` contains metadata
3. The \`<body>\` contains visible content
4. Always use semantic elements when possible
    `,
    order: 1,
    completed: true
  },
  {
    id: "1-2",
    courseId: "1",
    title: "CSS Fundamentals",
    description: "Learn how to style your web pages with CSS",
    duration: "60 min",
    content: `
# CSS Fundamentals

CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and overall visual presentation.

## Selectors and Properties

CSS uses selectors to target HTML elements:

\`\`\`css
/* Element selector */
p {
    color: blue;
    font-size: 16px;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#header {
    padding: 20px;
}
\`\`\`

## The Box Model

Every element is a box with:
- Content
- Padding
- Border
- Margin

Understanding this is crucial for layout!
    `,
    order: 2,
    completed: true
  },
  {
    id: "1-3",
    courseId: "1",
    title: "JavaScript Basics",
    description: "Introduction to programming with JavaScript",
    duration: "75 min",
    content: `
# JavaScript Basics

JavaScript is a programming language that adds interactivity to your website.

## Variables and Data Types

\`\`\`javascript
// Variables
let name = "John";
const age = 25;
var city = "New York";

// Data types
let string = "Hello";
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { key: "value" };
\`\`\`

## Functions

\`\`\`javascript
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const greetArrow = (name) => \`Hello, \${name}!\`;
\`\`\`

## DOM Manipulation

\`\`\`javascript
document.getElementById("myElement").textContent = "New content";
\`\`\`
    `,
    order: 3,
    completed: false
  },
  {
    id: "1-4",
    courseId: "1",
    title: "Responsive Design",
    description: "Making websites work on all devices",
    duration: "50 min",
    content: `
# Responsive Design

Responsive design ensures your website looks great on all devices.

## Media Queries

\`\`\`css
/* Mobile first approach */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}
\`\`\`

## Flexible Layouts

Use flexbox and grid for responsive layouts!
    `,
    order: 4,
    completed: false
  }
]

export const STUDENT_PROGRESS = [
  {
    id: "sp-1",
    studentId: "1",
    studentName: "Alex Johnson",
    studentEmail: "student@lms.com",
    courseId: "1",
    courseName: "Introduction to Web Development",
    progress: 65,
    lastAccessed: "2024-01-15",
    completedLessons: 16,
    totalLessons: 24
  },
  {
    id: "sp-2",
    studentId: "7",
    studentName: "Emma Wilson",
    studentEmail: "emma@example.com",
    courseId: "1",
    courseName: "Introduction to Web Development",
    progress: 85,
    lastAccessed: "2024-01-14",
    completedLessons: 20,
    totalLessons: 24
  },
  {
    id: "sp-3",
    studentId: "8",
    studentName: "Ryan Martinez",
    studentEmail: "ryan@example.com",
    courseId: "1",
    courseName: "Introduction to Web Development",
    progress: 42,
    lastAccessed: "2024-01-10",
    completedLessons: 10,
    totalLessons: 24
  },
  {
    id: "sp-4",
    studentId: "9",
    studentName: "Sophie Brown",
    studentEmail: "sophie@example.com",
    courseId: "2",
    courseName: "Advanced React Patterns",
    progress: 78,
    lastAccessed: "2024-01-15",
    completedLessons: 14,
    totalLessons: 18
  },
  {
    id: "sp-5",
    studentId: "10",
    studentName: "Jake Thompson",
    studentEmail: "jake@example.com",
    courseId: "2",
    courseName: "Advanced React Patterns",
    progress: 33,
    lastAccessed: "2024-01-12",
    completedLessons: 6,
    totalLessons: 18
  }
]

export const ANNOUNCEMENTS = [
  {
    id: "a-1",
    title: "Platform Maintenance Scheduled",
    content: "The learning platform will undergo maintenance on January 20th from 2 AM to 6 AM EST.",
    author: "System Admin",
    date: "2024-01-15",
    priority: "high"
  },
  {
    id: "a-2",
    title: "New Course: Machine Learning with Python",
    content: "We are excited to announce a new course on Machine Learning fundamentals. Enroll now!",
    author: "Michael Chen",
    date: "2024-01-14",
    priority: "medium"
  },
  {
    id: "a-3",
    title: "Updated Grading Policies",
    content: "Please review the updated grading policies for all courses effective February 1st.",
    author: "Academic Office",
    date: "2024-01-12",
    priority: "low"
  }
]

export const ALL_USERS = [
  { id: "1", name: "Alex Johnson", email: "student@lms.com", role: "student", status: "active", enrolledCourses: 4 },
  { id: "2", name: "Dr. Sarah Williams", email: "teacher@lms.com", role: "teacher", status: "active", courses: 3 },
  { id: "3", name: "Michael Chen", email: "admin@lms.com", role: "admin", status: "active" },
  { id: "7", name: "Emma Wilson", email: "emma@example.com", role: "student", status: "active", enrolledCourses: 2 },
  { id: "8", name: "Ryan Martinez", email: "ryan@example.com", role: "student", status: "inactive", enrolledCourses: 1 },
  { id: "9", name: "Sophie Brown", email: "sophie@example.com", role: "student", status: "active", enrolledCourses: 3 },
  { id: "10", name: "Jake Thompson", email: "jake@example.com", role: "student", status: "active", enrolledCourses: 2 },
  { id: "4", name: "Prof. James Anderson", email: "james@example.com", role: "teacher", status: "active", courses: 2 },
  { id: "5", name: "Emily Rodriguez", email: "emily@example.com", role: "teacher", status: "active", courses: 1 },
  { id: "6", name: "David Kim", email: "david@example.com", role: "teacher", status: "inactive", courses: 1 }
]
