Next.js Todo and Marvel Characters

This is a simple Next.js app that fetches todo items from a website and Marvel characters from the Marvel API and renders them on the page.


Getting Started

To run this project locally, follow these steps:



Clone the repository:


git clone https://github.com/obaptiste/next-todo-marvel.git


Install dependencies:


cd next-todo-marvel
npm install


Create a .env.local file in the root directory and add your Marvel API key:


PUBKEY=your-api-key-here


Run the development server:


npm run dev


Open http://localhost:3000 in your browser to see the app.




Features

This app fetches todo items from https://jsonplaceholder.typicode.com/todos and Marvel characters from the Marvel Developer API (https://developer.marvel.com/docs#getting_started), and displays them on separate pages.


Todo Page

The Todo page lists all the todo items fetched from the website. The todos are displayed in a table with columns for the todo ID, title, and completion status.


Marvel Heroes Page

The Marvel Heroes page lists all the Marvel characters fetched from the Marvel API. The heroes are displayed in cards with their name, picture and details.


Built With


Next.js

React

Marvel Developer API

Axios


License

This project is licensed under the MIT License - see the LICENSE file for details.