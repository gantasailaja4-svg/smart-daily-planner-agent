# Smart Daily Planner Agent

An AI-powered productivity application built with React, TypeScript, Node.js, Express and Google Gemini. It helps users organize daily tasks, track productivity and interact with an AI assistant using natural language.

## Overview

Smart Daily Planner Agent combines traditional task management with AI-powered assistance.

Users can manually create and manage tasks or communicate with an AI assistant to perform supported task operations.

## Features

### Task Management
- Create tasks with estimated durations.
- Mark tasks as completed.
- Delete tasks.
- Filter tasks by status.
- View task statistics.

### AI Assistant
- Natural-language interaction using Google Gemini.
- Gemini function calling for task operations.
- Retrieve existing tasks.
- Create, complete and delete tasks through supported AI tools.

### Dashboard
- View total, completed and pending tasks.
- Monitor task completion progress.
- View recently added tasks.

### Application Experience
- React Router navigation.
- Context API for shared application state.
- Light and dark themes.
- Theme preference persistence using local storage.
- Responsive user interface.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript |
| Routing | React Router |
| Styling | CSS |
| Build Tool | Vite |
| Backend | Node.js, Express 5 |
| AI Integration | Google Gemini |
| AI SDK | @google/genai |
| API Communication | REST API |
| Data Storage | JSON file |
| Development | Nodemon, ESLint |

## Project Architecture

```text
smart-daily-planner-agent/
│
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── App.tsx
│       └── main.tsx
│
├── src/
│   ├── config/
│   ├── tools/
│   ├── agent.js
│   └── server.js
│
├── data/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/gantasailaja4-svg/smart-daily-planner-agent.git

cd smart-daily-planner-agent
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.8-flash
```

Replace the placeholder with your own Gemini API key.

Never commit your `.env` file or expose your API key.

### 4. Start the backend

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd client

npm install
```

### 6. Start the frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Available Backend APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health check |
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id/complete` | Complete a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| POST | `/api/chat` | Communicate with AI assistant |

## AI Agent Workflow

1. User sends a natural-language request.
2. Express backend forwards the request to Gemini.
3. Gemini interprets the request and selects an appropriate task tool when needed.
4. Backend executes the requested operation.
5. Tool results are returned to Gemini.
6. Gemini generates a response for the user.

## Current Project Status

**Version 1.0 – MVP**

Implemented:
- Manual task management.
- Dashboard and task statistics.
- AI assistant integration.
- Gemini function calling.
- Shared React state management.
- Theme switching and persistence.
- Backend REST APIs.

## Future Roadmap

- AI-generated daily plans with preview and approval.
- Task priorities and deadlines.
- Intelligent task scheduling.
- Calendar integration.
- Notifications and reminders.
- Database integration.
- User authentication.
- Cloud deployment.
- Productivity reports.

## Author

Developed as a practical portfolio project to explore modern React development, backend API integration and AI agent development.

## License

This project is currently available for portfolio demonstration. A formal open-source license can be added separately.
