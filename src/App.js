import React, { Component } from "react";
import "./App.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Books from "./components/Books";

const url = "https://www.forverkliga.se/JavaScript/api/crud.php";

const getApiKey = async () => {
  const cachedKey = localStorage.getItem("apiKey");
  if (cachedKey) {
    return cachedKey;
  } else {
    const apiKey = await fetch(`${url}?requestKey`)
      .then(response => response.json())
      .then(result => result.key);
    localStorage.setItem("apiKey", apiKey);
    return apiKey;
  }
};

class App extends Component {
  state = {
    books: []
  };

  addBooks = async (e, limit = 10) => {
    e.preventDefault();

    var title = e.target.elements.title.value;
    var author = e.target.elements.author.value;
    const key = await getApiKey();
    console.log(key);

    if (title && author) {
      for (let limit = 0; limit < 10; limit++) {
        const { status, message, ...response } = await fetch(
          `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=insert&title=${title}&author=${author}`
        ).then(response => response.json());
        if (status === "success") {
          console.log("added book successfully");
          console.log(`Number of tries: ${limit + 1}`);
          limit = 10;
        } else {
          console.log(`ERROR: ${message}`);
        }
      }
    } else {
      this.setState({
        error: "Please enter the values"
      });
    }
  };

  changeApiKey = async e => {
    e.preventDefault();
    const apiKey = await fetch(`${url}?requestKey`)
      .then(response => response.json())
      .then(result => result.key);
    localStorage.setItem("apiKey", apiKey);
    return apiKey;
  };

  getBooks = async (e, limit = 0) => {
    e.preventDefault();
    const key = await getApiKey();
    console.log(key);
    await fetch(
      `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          books: data.data
        });
      });
  };

  render() {
    const data = this.state;
    return (
      <div>
        <Titles />
        {data.error}
        <Form changeApiKey={this.changeApiKey} addBooks={this.addBooks} />
        <Books getBooks={this.getBooks} />
        <ul>
          {data.books &&
            data.books.map(book => {
              return (
                <li key={`book-${book.id}`}>
                  {book.title} {book.author}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default App;
