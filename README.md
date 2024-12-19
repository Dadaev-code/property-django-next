# Property Management System

A full-stack property management system built with Next.js 14, Django, and PostgreSQL. This application allows users to manage real estate properties with features like property listings, detailed views, and property management.

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Shadcn/ui Components
- React Hook Form
- Axios

### Backend
- Django
- Django REST Framework
- PostgreSQL
- Python 3.x

## Project Structure

```
property-management/
├── backend/         # Django backend
│   ├── properties/  # Properties Django app
│   ├── core/        # Core Django configurations
│   └── media/       # Media files storage
├── frontend/        # Next.js frontend
    ├── src/
    │   ├── app/     # Next.js app router pages
    │   ├── components/  # React components
    │   ├── services/    # API services
    │   └── types/       # TypeScript types
```

## Prerequisites

- Python 3.x
- Poetry (Python dependency management)
- Node.js (v18+ recommended)
- PostgreSQL
- npm or yarn

### Backend Dependencies

Dependencies are managed through Poetry and defined in `pyproject.toml`. Key dependencies include:
- Django
- Django REST Framework
- django-cors-headers
- Pillow (for image processing)
- psycopg2-binary (PostgreSQL adapter)
- pytest (for testing)

## Setup Instructions

### Backend Setup

1. Install Poetry if you haven't already:
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies using Poetry:
```bash
poetry install
```

4. Activate the Poetry shell:
```bash
poetry shell
```

4. Set up the PostgreSQL database:
- Create a database named `property_management`
- Update the database configuration in `core/settings.py` if needed

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

7. Seed the database with sample data (optional):
```bash
python manage.py seed_properties
```

8. Start the Django development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with the following content:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

## Available Scripts

### Backend
- `python manage.py runserver` - Starts the development server
- `python manage.py migrate` - Run database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py seed_properties` - Seed the database with sample properties

### Frontend
- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint

## API Endpoints

- `GET /api/properties/` - List all properties
- `POST /api/properties/` - Create a new property
- `GET /api/properties/{id}/` - Get a single property
- `PATCH /api/properties/{id}/` - Update a property
- `DELETE /api/properties/{id}/` - Delete a property

## Features

- Property listing with search and filters
- Property details view
- Add/Edit property with image upload
- Responsive design
- Server-side rendering with Next.js
- RESTful API with Django
- Type-safe development with TypeScript

## Development Guidelines

1. Follow the existing project structure
2. Use TypeScript for all new components and functions
3. Style components using Tailwind CSS
4. Create new components in the appropriate directory under `src/components`
5. Follow REST API conventions for new endpoints
6. Use React Hook Form for form handling

## Production Deployment

### Backend
1. Set `DEBUG=False` in settings.py
2. Configure proper security settings
3. Set up proper static and media file serving
4. Use a production-grade server like Gunicorn

### Frontend
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## License

MIT

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request