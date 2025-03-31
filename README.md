# Full-Stack Boilerplate with Django and React

A modern, production-ready boilerplate for building full-stack web applications with Django and React.

## Features

### Backend (Django)
- Django REST Framework with JWT authentication
- Custom user model with email and name fields
- Token-based authentication with refresh tokens
- Swagger/OpenAPI documentation
- CORS configuration for frontend communication
- Environment-based configuration
- Poetry for dependency management

### Frontend (React + TypeScript)
- Vite for fast development and building
- TypeScript for type safety
- React Router for navigation
- Chakra UI for beautiful, accessible components
- React Query for efficient data fetching
- Form handling with React Hook Form and Yup validation
- Protected routes with authentication
- Modern dashboard layout
- Responsive design

## Prerequisites

- Python 3.13+
- Node.js 18+
- Poetry (Python package manager)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:sayonetech/boilerplate-with-cursor.git
cd boilerplate-with-cursor
```

2. Set up the backend:
```bash
# Install Poetry if you haven't already
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install

# Copy environment file
cp .env.example .env

# Activate virtual environment
poetry shell

# Run migrations
python manage.py migrate
```

3. Set up the frontend:
```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

4. Start the development servers:
```bash
# From the root directory
make dev
```

This will start:
- Backend server at http://127.0.0.1:8000
- Frontend server at http://localhost:5173
- Swagger documentation at http://127.0.0.1:8000/swagger/

## Project Structure

```
.
├── api/                    # Django API app
│   ├── serializers.py     # API serializers
│   ├── views.py          # API views
│   └── urls.py           # API URL routing
├── core/                  # Django project settings
│   ├── settings.py       # Project settings
│   └── urls.py           # Main URL routing
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context providers
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── package.json
├── .env.example         # Example environment variables
├── manage.py           # Django management script
├── Makefile           # Development commands
└── pyproject.toml     # Python dependencies
```

## API Endpoints

- `POST /api/register/` - User registration
- `POST /api/token/` - Get JWT tokens
- `POST /api/token/refresh/` - Refresh JWT token
- `GET /api/users/me/` - Get current user profile

## Development

### Backend Commands
```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test
```

### Frontend Commands
```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://127.0.0.1:8000/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 