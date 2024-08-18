# Personal Website Builder

Welcome to the **Personal Website Builder**! This project is a comprehensive, customizable, and user-friendly platform designed to help you create a stunning personal website with ease. Whether you're an aspiring developer, a seasoned professional, or someone looking to showcase their portfolio, this builder has got you covered.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modern Tech Stack**: Built with React, TypeScript, and Vite for a fast and efficient development experience.
- **Rich Text Editing**: Utilize Lexical for a powerful and flexible rich text editor.
- **Dynamic Content**: Easily update your portfolio, skills, projects, and more through JSON data files.
- **Responsive Design**: Ensures your website looks great on all devices.
- **Customizable Sections**: Add, edit, and remove sections like About Me, Skills, Projects, Experiences, Blogs, and Connect.
- **Live Preview**: See your changes in real-time with Vite's hot module replacement.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/AkhilKumar-Git/personal-website-builder.git
cd personal-website-builder
npm install
```

### Running the Project

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

Here's a brief overview of the project's structure:

```plaintext
personal-website-builder/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── assets/             # Images and other assets
│   ├── components/         # Reusable components
│   ├── data/               # JSON data files
│   ├── pages/              # Page components
│   ├── sections/           # Section components
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── theme/              # Theme configuration
├── .eslintrc.cjs           # ESLint configuration
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
└── vite.config.ts          # Vite configuration
```

## Usage

### Editing Content

All the content for your website is stored in JSON files located in the `src/data/` directory. You can update your profile, intro, about me, experiences, skills, projects, and blogs by editing these files.

For example, to update your profile information, edit the `src/data/portfolio.json` file:

```json
{
  "name": "Your Name",
  "intro": "Your intro text",
  "about": "Your about text",
  "sections": ["about", "skills", "projects", "experience", "blogs", "connect"],
  "skills": [
    {
      "title": "Skill 1",
      "description": "Skill 1 description"
    },
    {
      "title": "Skill 2",
      "description": "Skill 2 description"
    }
  ],
  "projects": [
    {
      "title": "Project 1",
      "description": "Project 1 description",
      "image": "project1.jpg"
    },
    {
      "title": "Project 2",
      "description": "Project 2 description",
      "image": "project2.jpg"
    }
  ],
  "experience": [
    {
      "title": "Experience 1",
      "description": "Experience 1 description",
      "company": "Company 1",
      "duration": "Duration 1"
    },
    {
      "title": "Experience 2",
      "description": "Experience 2 description",
      "company": "Company 2",
      "duration": "Duration 2"
    }
  ],
  "blogs": [
    {
      "title": "Blog 1",
      "description": "Blog 1 description",
      "link": "https://example.com/blog1"
    },
    {
      "title": "Blog 2",
      "description": "Blog 2 description",
      "link": "https://example.com/blog2"
    }
  ],
  "connect": [
    {
      "title": "LinkedIn",
      "link": "https://linkedin.com/your-profile"
    },
    {
      "title": "GitHub",
      "link": "https://github.com/your-username"
    }
  ]
}
```

### Adding New Sections

You can add new sections to your website by updating the `sections` array in the `src/data/portfolio.json` file. The available sections are `about`, `skills`, `projects`, `experience`, `blogs`, and `connect`.

### Customizing the Theme

The theme of your website can be customized by editing the `src/theme/theme.ts` file. This file contains the color palette and other styling options.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using the Personal Website Builder! We hope it helps you create an amazing personal website. If you have any questions or need further assistance, feel free to reach out.

Happy building!
