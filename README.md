# Roman Numeral Converter

A full-stack web service that converts integers (1–3999) to Roman numerals. This roman numeral specification was used: https://en.wikipedia.org/wiki/Roman_numerals 

## Installation & Running

### Prerequisites
1. **Git:** For cloning the repository.
2. **Node.js (v20):** Download and install from [nodejs.org](https://nodejs.org).
3. **Docker Desktop** Download and install from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

### General
1. **Clone Repository**
  ```bash
  git clone https://github.com/mckayreedmoore/integer-to-roman-numeral-app
  ```
2. **Verify you are running node.js v20**
  If using NVM:
  ```bash
  nvm current
  ```

### Server (API)
1. **Install Dependencies:**
   ```bash
   cd server
   npm install
   ```
2. **Create .env file***
   Copy contents of .env.example into new .env file.
   If in Unix-based OS: 
   ```bash
   cat .env.example > .env
   ```
   If in windows:
   ```
   copy .env.example .env
   ```
3. **Build & Run:**
   ```bash
   npm run build
   npm start
   ```
   *API available at [http://localhost:8080](http://localhost:8080)*
4. **API Usage:**
   ```
   GET http://localhost:8080/romannumeral?query={integer}
   ```
5. **Example**   
  Request: 
  [http://localhost:8080/romannumeral?query=25](http://localhost:8080/romannumeral?query=25)

  A successful API call returns a JSON payload with the following structure:
  ```json
  {
    "input": "25",
    "output": "XXV"
  }
  ```

### Client (React App)
1. **Install Dependencies:**
   ```bash
   cd client
   npm install
   ```
2. **Create .env file***
   Copy contents of .env.example into new .env file.
   If in Unix-based OS: 
   ```bash
   cat .env.example > .env
   ```
   If in windows:
   ```
   copy .env.example .env
   ```
3. **Run:**
   ```bash
   npm start
   ```
   *App available at [http://localhost:3000](http://localhost:3000)*

### Docker (runs full app)
1.**Run:** 
```bash
npm run docker
```

## Testing

- **Server:**
  ```bash
  cd server
  npm test
  ```
- **Client:**
  ```bash
  cd client
  npm test
  ```

## Engineering & Testing Methodology

This project is built with a modular approach to ensure clear separation of concerns between the backend and frontend. The backend uses Node.js, Express, and TypeScript, while the frontend is developed using React with Adobe React Spectrum. 

**Key Practices:**
- **Modular Design:** Divides functionality into controllers, services, routes, and middleware for clear organization.
- **Testing:** 
  - **Server:** Tests are written using Jest and Supertest to cover conversion logic and API endpoints.
  - **Client:** React components are tested with Jest to ensure proper rendering and user interaction.
- **Code Quality:** TypeScript enforces type safety and Prettier ensures consistent code formatting across both projects.
- **Documentation:** Inline comments and a comprehensive README provide clarity on usage instructions.

## Packaging Layout

The project is split into two main directories: `server` and `client`, each containing its own build and configuration files.

**Server (API):**

~~~~
/server
  ├── src
  │   ├── controllers         # Handles business logic and HTTP requests
  │   ├── services            # Implements the Roman numeral conversion logic
  │   ├── routes.ts           # Defines API endpoints
  │   ├── utils               # Holds logging configuration
  │   └── server.ts           # Server entry point & sets up express application
  ├── tests                   # Contains tests (Jest & Supertest)
  ├── package.json            # npm package configuration
  ├── dockerfile              # docker configuration file for server
  └── tsconfig.json           # TypeScript configuration
~~~~

**Client (React App):**

~~~~
/client
  ├── src
  │   ├── components          # Reusable UI components 
  │   ├── App.tsx             # Main application component
  │   ├── index.tsx           # React entry point
  │   └── index.css           # Global styles
  ├── public                  # Static assets (e.g., index.html)
  ├── tests                   # Contains tests (Jest)
  ├── package.json            # npm package configuration
  ├── dockerfile              # docker configuration file for client
  └── tsconfig.json           # TypeScript configuration
~~~~

## Dependencies & Attribution

- **Server:** Express, Winston, Jest, Supertest, TypeScript, Helmet, Cors.
- **Client:** React, Adobe React Spectrum, Jest, TypeScript.
- **Tools:** Prettier for code formatting.
