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
