# Eco Coins Project

To enable others to replicate our steps and contribute to the project, we have provided detailed documentation in our GitHub repository. This README.md file includes:

## Installation Instructions

### Step-by-step guide to set up the project locally

1. Clone the repositories:

   **Frontend (eco-coins-app):** 
   git clone https://github.com/Jiel5/eco-coins-app.git
   cd eco-coins-app

   **Backend (restful-api-eco-coins):**
   git clone https://github.com/Jiel5/restful-api-eco-coins.git
   cd restful-api-eco-coins

2. Install dependencies:
   
   **Frontend (eco-coins-app):**
   npm install

   **Backend (restful-api-eco-coins):**
   npm install

3. Start the development servers:

   **Frontend (eco-coins-app):**
   npm start dev

   **Backend (restful-api-eco-coins):**
   npm start-run dev
  
4. User Guide
   
    **Overview :**
    The Eco Coins App is a platform designed to encourage proper waste disposal by rewarding users with coins that can be converted into      money.
    
    **Usage :**
    
    a. Navigation: The interface is designed to be intuitive, allowing users to easily navigate through the features.
   
    b. Thrower Dashboard: Users can track their waste disposal activities and earned coins.
   
    c. Picker Dashboard: Users can manage collected waste and view their earnings.

6. API Documentation
   
    **Endpoints :**
    
    a. GET /users: Retrieves a list of users.
   
    b. POST /users: Creates a new user.
   
    c. GET /users/:id: Retrieves a user by ID.
   
    d. PUT /users/:id: Updates a user by ID.
   
    e. DELETE /users/:id: Deletes a user by ID.
  
    **Parameters :**
    
    a. GET /users :
    
    page: Optional, the page number for pagination.
   
    limit: Optional, the number of items per page.
  
    b. POST /users :
    
    name: Required, the name of the user.
   
    email: Required, the email of the user.

8. Contribution Guidelines
   
    **How to Contribute :**
    
    a. Fork the repository.
   
    b. Create a new branch (git checkout -b feature-branch).
   
    c. Make your changes and commit them (git commit -m 'Add new feature').
   
    d. Push to the branch (git push origin feature-branch).
   
    e. Open a pull request.
  
    **Code Standards :**
    Follow the JavaScript Standard Style.
  
    **Pull Requests :**
    
    a. Ensure your pull request is descriptive and includes what changes you have made.
   
    b. Ensure your code is well-tested.
  


