# BookWorm Server

Backend server for the **BookWorm** application, built with **Express**, **TypeScript**, and **MongoDB**.

## API Endpoints

### Books
- `GET /books` – Get all books  
- `GET /books/:id` – Get a single book by ID  
- `POST /books` – Create a new book  
- `PUT /books/:id` – Update a book  
- `DELETE /books/:id` – Delete a book  

### Genres
- `GET /genres` – Get all genres  
- `GET /genres/:id` – Get a single genre  
- `POST /genres` – Create a new genre  
- `PUT /genres/:id` – Update a genre  
- `DELETE /genres/:id` – Delete a genre  

### Reviews
- `GET /reviews` – Get all reviews  
- `GET /reviews/:id` – Get a single review  
- `POST /reviews` – Create a review  
- `PUT /reviews/:id` – Update a review (approve/reject)  
- `DELETE /reviews/:id` – Delete a review  

### Users
- `GET /users` – Get all users  
- `GET /users/:id` – Get a single user  
- `POST /users` – Register a new user  
- `PUT /users/:id` – Update user info  
- `DELETE /users/:id` – Delete a user  

### Tutorials
- `GET /tutorials` – Get all tutorials  
- `GET /tutorials/:id` – Get a single tutorial  
- `POST /tutorials` – Create a tutorial  
- `PUT /tutorials/:id` – Update a tutorial  
- `DELETE /tutorials/:id` – Delete a tutorial  

### Reading Shelves
- `GET /reading-shelves` – Get all shelves for a user  
- `GET /reading-shelves/:id` – Get a single shelf  
- `POST /reading-shelves` – Add a book to shelf  
- `PUT /reading-shelves/:id` – Update a shelf  
- `DELETE /reading-shelves/:id` – Remove a book from shelf  

## Features
- User authentication & management  
- Book, genre, and tutorial CRUD  
- Review approval workflow  
- User reading shelves  

## Tech Stack
- Node.js, Express, TypeScript  
- MongoDB & Mongoose  
- CORS & dotenv  
