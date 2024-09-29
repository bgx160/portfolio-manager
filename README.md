# Portfolio Manager App

A web application to manage and publish personal portfolios. 

## Built with

### Front end

- TypeScript
- React
- Material-UI (MUI)

### Back end

- Netlify Functions
- MongoDB

### Authentication

- JSON Web Token (JWT)

## Features

### User authentication

- Authenticate users with username and password

### Multiple portfolio management

- Create and manage multiple portfolios per user
- Organize content such as personal bios, projects, and skills in each portfolio

### Bio with links

- Add a personal biography to portfolios
- Include important links (e.g. GitHub, LinkedIn)

### Projects

- Unlimited projects per portfolio
- Include important links (e.g. GitHub, live demo)

### Skills

- Manage relevant skills for each portfolio

### Portfolio publishing

- Publish portfolios with content
- Share a direct URL to your published portfolio for others to view

## Getting Started

### Prerequisites
- **Node.js** installed on your system.
- A **MongoDB** instance for the database.
- **Netlify CLI** to run the app locally with Netlify Functions.

### Installation

1. Clone the repository:

  ```
  bash
  git clone https://github.com/your-username/portfolio-manager-app.git
  cd portfolio-manager-app
  ```

2. Install dependencies
  
  ```
  npm install
  ```

3. Create `.env` file at the root of your project and set up environment variables

  ```
  DB_URI=<your-mongodb-connection-string>
  SECRET=<your-jwt-secret>
  ```
4. Run the app locally

  ```
  netlify dev
  ```
