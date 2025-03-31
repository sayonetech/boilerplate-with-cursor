.PHONY: install run migrate makemigrations shell test lint format frontend-install frontend-dev dev

install:
	poetry install
	poetry run pre-commit install

run:
	poetry run python manage.py runserver

migrate:
	poetry run python manage.py migrate

makemigrations:
	poetry run python manage.py makemigrations

shell:
	poetry run python manage.py shell

test:
	poetry run python manage.py test

lint:
	poetry run flake8 .
	poetry run black . --check
	poetry run isort . --check-only

format:
	poetry run black .
	poetry run isort .

createsuperuser:
	poetry run python manage.py createsuperuser

# Frontend commands
frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev

# Run both frontend and backend concurrently
dev:
	@echo "Starting both frontend and backend servers..."
	@trap 'kill 0' SIGINT; \
	poetry run python manage.py runserver & \
	cd frontend && npm run dev & \
	wait 