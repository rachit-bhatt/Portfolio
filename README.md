# Rachit Bhatt Portfolio

## Overview

This is a modern static portfolio website built for Rachit Bhatt, a Toronto-based full-stack software developer with experience in AI/ML, desktop and web development, and software engineering.

The site showcases personal branding, skills, experience, projects, and a contact form. It is designed with a cyber-themed visual style and interactive animations using HTML, CSS, and vanilla JavaScript.

## Features

- Responsive portfolio landing page with animated background and interactive navigation
- Contact section with a working form that generates a prefilled email payload
- Skills and project sections driven by external data from `data.js`
- Simple, clean structure with reusable JavaScript functions
- Works entirely as a static website without a backend server

## Built With

- HTML5
- CSS3
- JavaScript
- `data.js` for structured portfolio data

## Project Structure

- `index.html` — main portfolio page
- `styles.css` — styling and layout definitions
- `script.js` — interactive behavior, animations, and form handling
- `data.js` — portfolio content data for name, skills, experience, projects, and contact info

## Getting Started

### Run locally

1. Clone or download the repository
2. Open `index.html` in your browser

> For the best local development experience, open the project in a live server tool such as VS Code Live Server.

### Contact Form Behavior

- The `TRANSMIT` button builds a `mailto:` link addressed to `rachitbhatt2000@gmail.com`
- It pre-fills:
  - subject: `Portfolio Contact from [Name]`
  - body: name, email, and message
- If the email application does not open, the same message content is copied to the clipboard for easy manual pasting

## Personal Highlights

- Full-stack experience with Python, C#, JavaScript, and .NET
- Strong background in AI/ML, data analysis, and software design
- Hands-on experience with desktop applications, web apps, and CI/CD

## Contact

- Email: `rachitbhatt2000@gmail.com`
- GitHub: `https://github.com/rachit-bhatt`
- LinkedIn: `https://www.linkedin.com/in/rachit-bhatt`

## Notes

This is a static portfolio intended to be hosted on GitHub Pages or any static file server. No backend service is required for the site to function.