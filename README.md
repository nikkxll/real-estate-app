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

[![Stack](https://skillicons.dev/icons?i=react,nodejs,express,tailwind,redux,mongodb,firebase,docker)](https://skillicons.dev)

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

Open ```localhost``` on port ```3000``` in the browser

## Preview

<div align="center">

![real-estate](https://github.com/user-attachments/assets/11fe204f-8622-4e19-a752-eea1e5ff43a4)
![2](https://github.com/user-attachments/assets/02db382e-6468-41ca-9bd9-585b73dc9da4)
![3](https://github.com/user-attachments/assets/30835a26-d253-497e-a5ca-dd93c2b14a3f)
![4](https://github.com/user-attachments/assets/7cd4ea68-d629-4db9-8547-2e6e0fe5f7b3)

</div>

##

LinkedIn: [Dmitrii Nikiforov](https://www.linkedin.com/in/dmitriinikiforov/) | Tableau: [dmitriinikiforov](https://public.tableau.com/app/profile/nikiforov.dmitrii/vizzes)
