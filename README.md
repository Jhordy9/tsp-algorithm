# TSP Algorithm

## System Requirements

- Docker
- Node.js (version 18 or later)
- Yarn or npm

## Installation

1. **Install Docker:**
   - Follow the instructions at [Get Docker](https://docs.docker.com/get-docker/).

2. **Install Node.js:**
   - Node.js can be downloaded from [Node.js official website](https://nodejs.org/en/download/).

3. **Install Yarn:**
   - Instructions for Yarn installation can be found on the [Yarn official website](https://yarnpkg.com/lang/en/docs/install/).

## Running the Application

### Starting the database

```bash
docker-compose up -d
```

### Run Database Migrations and API

- Notes: Yarn is optional, you can use npm

```bash
cd api && yarn && yarn db:migrate && yarn dev
```

### Run interface

- Notes: Yarn is optional, you can use npm

```bash
cd web && yarn && yarn dev
```
