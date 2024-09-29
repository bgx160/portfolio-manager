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
  
![login](https://github.com/user-attachments/assets/f880a4ae-a4a8-4a19-973b-cb2c584f47e2)

### Multiple portfolio management

- Create and manage multiple portfolios per user
- Organize content such as personal bios, projects, and skills in each portfolio

![pf-management](https://github.com/user-attachments/assets/3b9262a3-3dfc-4e6e-bfbb-189a4b37d802)

### Bio with links

- Add a personal biography to portfolios
- Include important links (e.g. GitHub, LinkedIn)

![bio-with-links](https://github.com/user-attachments/assets/1bb9eeac-9f48-4062-81ff-5b9ced1a8461)

### Projects

- Unlimited projects per portfolio
- Include important links (e.g. GitHub, live demo)

![projects](https://github.com/user-attachments/assets/4ad17abb-a348-43bd-b516-a41160967de5)

### Skills

- Manage relevant skills for each portfolio
  
![skills](https://github.com/user-attachments/assets/6bd75022-238d-4a1b-84a5-33a66f07ea03)

### Portfolio publishing

- Publish portfolios with content
- Share a direct URL to your published portfolio for others to view

![publish-portfolio](https://github.com/user-attachments/assets/48ec04a5-0fdd-4b06-92ea-d193e8a3c862)


## Getting Started

### Prerequisites
- **Node.js** installed on your system.
- A **MongoDB** instance for the database.
- **Netlify CLI** to run the app locally with Netlify Functions.

### Installation

1. Clone the repository:

  ```
  git clone https://github.com/your-username/portfolio-manager-app.git
  cd portfolio-manager
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
