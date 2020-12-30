import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBooks: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Saves a book to the database
  saveBooks: function(bookData) {
    console.log("book data", bookData)
    return axios.post("/api/books/add", bookData);
  },
   // Deletes the book with the given id
   deleteBooks: function(id) {
    return axios.delete("/api/books/" + id);
  },
};
 