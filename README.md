# Property Management System

A full-stack property management system built with Next.js 14, Django, and PostgreSQL. This application allows users to manage real estate properties with features like property listings, detailed views, and property management.

## Tech Stack

### Frontend

* Next.js 14 (App Router)
* TypeScript
* TailwindCSS
* Shadcn/ui Components
* React Hook Form
* Axios

### Backend

* Django
* Django REST Framework
* PostgreSQL
* Python 3.x
* Poetry (dependency management)
* Docker & Docker Compose

## Prerequisites

* Docker & Docker Compose
* Poetry
* Node.js (v18+ recommended)
* npm or yarn

## Setup Instructions

### Clone

```bash
git clone [repository-url]
```

#### Backend

```bash
docker-compose up --build
```

The backend application will be available at:

* Backend: `http://localhost:8000`
* Admin: `http://localhost:8000/admin`

## Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```
