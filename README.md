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

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Start the services:

```bash
docker-compose up --build
```

The application will be available at:
* Frontend: `http://localhost:3000`
* Backend: `http://localhost:8000`
* Admin: `http://localhost:8000/admin`

### Manual Setup

#### Backend

1. Navigate to the backend directory and activate Poetry:

```bash
cd backend
poetry shell
poetry install
```

2. Run migrations and create superuser:

```bash
python manage.py migrate
python manage.py createsuperuser
```

3. Start the development server:

```bash
python manage.py runserver
```

#### Frontend

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

3. Start the development server:

```bash
npm run dev
```

  

## Run Using Docker

 

```bash
docker-compose up --build
```

 

## Seed db

 

```bash
python manage.py seed_properties 
```
