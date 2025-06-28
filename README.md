# ChatGPT Clone

A full-stack ChatGPT clone featuring user personalization, chat history, and history deletion. Built with React.js, Express, Gemini API, and MongoDB. Deployments are live via Vercel (frontend) and Render (backend).

## Features

- **ChatGPT-like Experience:** Conversational AI interface powered by Gemini API
- **Personalization:** Customizes responses and experience per user
- **Chat History:** View, manage, and delete your chat history
- **Full-stack Solution:** React.js frontend (with pages and components), Express backend, MongoDB database
- **Cloud Deployment:** Frontend on Vercel, backend on Render

## Tech Stack

- **Frontend:** React.js  
  - Pages: `AI-Tool/src/pages/`
  - Components: `AI-Tool/src/components/`
- **Backend:** Express.js (`AI-Tool/backend/`)
- **AI Provider:** Gemini API
- **Database:** MongoDB
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure

```
AI-Tool/
│
├── backend/               # Express.js API server
│
└── src/
    ├── pages/             # React.js pages
    ├── components/        # Reusable React.js components
    └── ...                # Other frontend code (hooks, utils, etc.)
```

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database (local or Atlas)
- Gemini API credentials

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd AI-Tool
```

#### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file with your environment variables
npm start
```

**Example `.env` for backend:**
```
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

#### 3. Setup Frontend

```bash
cd ..
npm install
# Create a .env file if needed (e.g., for API base URL)
npm start
```

**Example `.env` for frontend:**
```
REACT_APP_API_URL=http://localhost:5000
```

### Deployment

- **Frontend:** Deploy `AI-Tool` (with `src/`) on Vercel.
- **Backend:** Deploy the `AI-Tool/backend` folder on Render.

## Usage

- Sign up/log in to personalize your experience.
- Start chatting with the AI!
- View your chat history and delete conversations as needed.

## License

[MIT](LICENSE)

---

**Contact:**  
For questions or feedback, please open an issue or contact [your-email@example.com].
