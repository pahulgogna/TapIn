# Tapin - Meeting Notes Summarization Platform

A full-stack application that transforms audio recordings into AI-summarized notes. Record lectures, meetings, or ideas, and instantly get intelligent summaries and transcriptions powered by AI.

## 🎯 Features

- **Audio Recording**: Record notes directly from your browser
- **AI Transcription**: Automatic speech-to-text using OpenAI Whisper
- **AI Summarization**: Intelligent note summarization using Google Generative AI
- **User Authentication**: Secure JWT-based authentication
- **Note Management**: Organize and manage your summarized notes
- **Markdown Support**: Rich text rendering for notes

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recoil** for state management
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Prisma ORM
- **JWT** for authentication
- **Multer** for file uploads

### Microservices
- **Transcriber (Python)**: Flask-based audio transcription service using OpenAI Whisper
- **Summarizer Worker (Node.js)**: Redis-based worker for AI summarization using Google Generative AI
- **Teams Mail Service (Node.js)**: Email notification service
- **PDF Service (Node.js)**: PDF generation from notes

### Infrastructure
- **Redis**: Job queue management
- **PostgreSQL**: Primary database
- **Docker**: Containerization (optional)

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ (for backend, frontend, workers)
- **Python** 3.9+ (for transcriber service)
- **PostgreSQL** 13+ (database)
- **Redis** 6+ (job queue)
- Google Generative AI API key
- Environment variables configured

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd summarize@ai
```

#### 2. Set Up Environment Variables

- Create a `.env` file in the all the directories
- Copy the content from `.env.example` file to the `.env` files
- Enter the required credentials in the `.env` file.

#### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup Prisma
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Start development server
npm run dev
```

The backend will run on `http://localhost:3000`

#### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 5. Summarizer Worker Setup

```bash
cd summarizer-worker

# Install dependencies
npm install

# Setup Prisma
npx prisma migrate deploy

# Start worker
npm run dev
```

#### 6. Transcriber Service Setup

```bash
cd transcriber

# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors pydub redis openai-whisper

# Start Flask server
python main.py
```

The transcriber will run on `http://localhost:5000`

#### 9. Teams Mail Service Setup (Optional)

#### 10. Start Redis

Using Docker:

```bash
docker run -d -p 6379:6379 redis:latest
```

## 📁 Project Structure

```
summarize@ai/
├── backend/                 # Express.js backend
│   ├── src/
│   │   └── index.ts        # Main server
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   └── package.json
│
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── pages/         # Application pages
│   │   ├── components/    # React components
│   │   ├── store/         # Recoil state
│   │   └── utils/         # Utility functions
│   └── package.json
│
├── common/                # Shared utilities & types
│   └── src/
│       └── index.ts
│
├── summarizer-worker/     # AI summarization worker
│   ├── src/
│   │   ├── index.ts
│   │   └── prompts/       # AI prompts
│   └── package.json
│
├── transcriber/          # Audio transcription service
│   ├── main.py           # Flask app
│   └── package.json
│
├── PDF/                  # PDF generation service
│   └── src/
│       └── index.js
│
└── README.md
```

## 🗄️ Database Schema

### User Model
- `id`: Unique identifier
- `email`: User email (unique)
- `name`: User name
- `password`: Hashed password
- `createdAt`, `updatedAt`: Timestamps
- Relations: notes, teams

### Team Model
- `id`: Unique identifier
- `name`: Team name
- `adminId`: Admin user ID
- `members`: Team members (many-to-many with User)
- Relations: admin, notes

### Note Model
- `id`: Unique identifier
- `title`: Note title
- `content`: Note content (transcription + summary)
- `userId`: Owner user ID
- Relations: user, teams (many-to-many)

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user

### Notes
- `GET /api/v1/notes` - Get user's notes
- `GET /api/v1/notes/:id` - Get specific note
- `POST /api/v1/notes` - Create new note
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note

### Transcription
- `POST /convert` - Convert audio to text (transcriber service)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are issued upon registration/login
- Token expiry: 7 days
- Passwords are hashed with SHA256 and salt

### Environment Variables

Ensure these are set in your environment:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Strong random secret
- `SALT`: Password hashing salt
- `GOOGLE_API_KEY`: Google Generative AI API key
- `REDIS_URL`: Redis connection URL

### Database Migrations
After schema changes:

```bash
cd backend
npx prisma migrate dev --name <migration-name>
```

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Check credentials and database exists

### Redis Connection Error
- Ensure Redis is running on localhost:6379
- Or update `REDIS_URL` in environment variables

### Transcriber Not Working
- Verify Python dependencies
- Ensure Whisper model is downloaded
- Check Flask is running on port 5000

### Frontend Can't Connect to Backend
- Ensure backend is running on port 3000
- Check CORS settings in backend
- Verify API endpoints in frontend `.env`

## 📚 Additional Resources

- [OpenAI Whisper Documentation](https://github.com/openai/whisper)
- [Google Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)

**Happy noting! 🚀**
