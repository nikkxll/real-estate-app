# Real Estate App

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
  - [Clone the Repository](#clone-the-repository)
  - [Create Environment Variables](#create-environment-variables)
    - [API Setup](#api-setup)
    - [Client Setup](#client-setup)
  - [Build and Run](#build-and-run)
- [Preview](#preview)

## Overview

This project simulates a real-estate platform for buying, selling and renting properties, with a following tech stack:

- **Frontend**: React, Vite, TailwindCSS, Redux
- **Backend**: Node.js, Express.js, MongoDB, Firebase
- **Containerization**: Docker, Docker Compose

## Setup

To set up and run the application, follow the steps below.

### Clone the Repository

```bash
git clone git@github.com:nikkxll/real-estate-app.git
cd real-estate-app
```

### Create Environment Variables

Both the API and Client require environment variables to function properly. You need to create ```.env``` files in their respective directories.

#### API Setup

In the ```.env``` file in the root of the project, add the following variables:

```JWT_SECRET``` 
Generate a random JWT secret using the following script:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

```MONGO_DB```
Set the MongoDB connection string:

```
MONGO_DB=mongodb://mongo:27017/real_estate
```

#### Client Setup

In the ```.env``` file inside the ```client``` folder, add the following variable:

```VITE_FIREBASE_API_KEY```
Obtain this by creating your own Firebase project:
- Go to the Firebase Console
- Create a new project and add a Web app
- Once set up, Firebase will provide an API key as part of the Firebase SDK snippet

### Build and Run

To build the Docker images and run the application using Docker Compose:
```
docker-compose build
docker-compose up
```

## Preview


LinkedIn: [Dmitrii Nikiforov](https://www.linkedin.com/in/dmitriinikiforov/) | Tableau: [dmitriinikiforov](https://public.tableau.com/app/profile/nikiforov.dmitrii/vizzes)
