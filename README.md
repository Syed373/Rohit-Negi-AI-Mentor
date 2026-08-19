# GuruAI 🤖

A personalized AI chatbot that emulates the teaching style and persona of a friendly, bilingual mentor for students learning Data Structures & Algorithms (DSA) and System Design.




![Screenshot 2025-06-13 081604](https://github.com/user-attachments/assets/0b241723-423c-474f-80f6-6318d0d1c6ba)





![Screenshot 2025-06-13 081546](https://github.com/user-attachments/assets/2ac9e52d-11a5-44a2-827d-cb3c88879eae)


---

## 🌟 About The Project

This project combines a modern React frontend with a Node.js/Express backend powered by the Google Gemini API. The core of the application is the AI's persona, which is carefully crafted through a detailed system prompt to mimic a friendly mentor's unique way of speaking—a mix of Hindi and English, using encouraging phrases and emojis.

The goal is to provide a more engaging and relatable learning experience than a generic chatbot.

## ✨ Features

-   **🤖 Authentic AI Persona**: The bot responds in a friendly, encouraging, and bilingual (Hindi/English) voice.
-   **🚀 Landing Page**: A clean entry point to start a new chat session.
-   **💬 Modern Chat Interface**: A responsive and intuitive chat UI built with React and Tailwind CSS.
-   **📜 Chat History**: Conversations are saved to `localStorage`, allowing you to pick up where you left off.
-   **🗂️ Multi-Chat Management**: Create new chats and switch between them easily via a collapsible sidebar.
-   **✍️ Markdown & Code Support**: Bot responses are rendered with Markdown, including beautifully syntax-highlighted code blocks (using Prism.js).
-   **📋 Copy Code**: A one-click "Copy" button on every code block.
-   **🎤 Voice-to-Text**: Use your microphone to dictate messages directly into the chat input.
-   **🌓 Dark/Light Mode**: Toggle between themes for your viewing comfort.
-   **🔄 Loading & Toast Notifications**: Smooth user experience with loading indicators and non-intrusive toast notifications.

---

## 🛠️ Tech Stack

### Frontend

-   **Framework**: [React](https://reactjs.org/) (with Vite)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
-   **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)
-   **Syntax Highlighting**: [Prism.js](https://prismjs.com/)
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **AI Model**: [Google Gemini Pro](https://ai.google.dev/) via `@google/generative-ai`
-   **Middleware**: [CORS](https://expressjs.com/en/resources/middleware/cors.html), [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/) (v18.x or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Syed373/GuruAI.git
    cd rohit-negi-ai-mentor
    ```

2.  **Set up the Backend:**
    ```sh
    cd backend
    npm install
    ```

3.  **Create the Environment File:**
    In the `backend` directory, create a new file named `.env` and add your Google Gemini API key:
    ```
    API_KEY = YOUR_GOOGLE_GEMINI_API_KEY
    ```
    ⚠️ **Important:** Never commit your `.env` file to version control. The provided `.gitignore` file should already prevent this.

4.  **Set up the Frontend:**
    ```sh
    cd ../frontend
    npm install
    ```

### Running the Application

You will need two separate terminals to run both the backend and frontend servers simultaneously.

1.  **Start the Backend Server:**
    In your first terminal, navigate to the `backend` directory and run:
    ```sh
    node ChatBot.js
    ```
    You should see the message: `✅ Server is running on http://localhost:3000`

2.  **Start the Frontend Development Server:**
    In your second terminal, navigate to the `frontend` directory and run:
    ```sh
    npm run dev
    ```
    This will start the Vite development server, and you can open your browser to the provided URL (usually `http://localhost:5173`).

---

## 📁 Project Structure

```
guru-ai/
├── backend/
│   ├── ChatBot.js # Express server and API logic
│   ├── .env # Environment variables (private)
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   │   ├── ChatArea.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── CodeBlock.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoadingMessage.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── WelcomeScreen.jsx
│   │   ├── App.jsx # Main application component
│   │   └── index.css # Tailwind CSS setup
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🙏 Acknowledgements

-   Inspiration and persona based on a dedicated DSA and System Design mentor.
-   Powered by **Google Gemini**.
-   Icons provided by **React Icons**.
