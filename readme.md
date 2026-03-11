## Backend
The backend is a basic REST api built using expressjs(nodejs) and typescript
it provides the logic that allows the frontend communicate with the database

## how to use
base url == /api/auth 

## endpoints\

/api/auth/signup ==> Signup route 

/api/auth/login ==> Login route

/api/auth/logout  ==> Logout route

## How to Run

The backend is containerized and hosted on Docker Hub: lexyuko/tech-crush-group-1-backend:v1
the mongodb container in use mongodb/mongodb-community-server

navigate to the root folder and run the docker compose file
docker compose up 

# technologies used 
1. nodejs
2. typescript
3. expressjs (router)
4. mongodb (database)



----

## Frontend

The frontend provides the user interface for the authentication system, including the homepage, signup page, and login page. It communicates with the backend API to handle user authentication.

## Features
    Homepage interface
    User signup form
    User login form
    API communication with the backend authentication endpoints
    Responsive UI served using Nginx

## Authentication Flow

Users must create an account first before logging in.
    1. Navigate to the Signup page by clicking Create Account Button
    2. Enter:
            Email
            Username
            Password
    3. After successfull signup, users can log in using:
            Email
            Password

The frontend sends authentication requests to the backend API endpoints and displays the appropriate response messages.

## Docker Image

The frontend is containerized and hosted on Docker Hub: francesehinor/tech-crush-group-1-frontend:v1

Running the Frontend with Docker

The frontend container is served using Nginx and is pulled from Docker Hub when running the project with Docker Compose "docker compose up".

This will automatically pull the frontend image and start the container.

## Technologies Used
	•	HTML
	•	CSS
	•	JavaScript
	•	Nginx
	•	Docker