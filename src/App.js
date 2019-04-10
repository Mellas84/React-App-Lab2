import React, { Component } from "react";
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
    books: [],
    apiKey: localStorage.getItem("apiKey"),
    error: "",
    limit: ""
  };

  componentDidMount() {
    this.getBooks();
  }

  addBooks = async e => {
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
          console.log(`status: ${status}`);
          console.log(`Number of retries: ${limit}`);
          console.log({ ...response });
          this.setState({
            limit: limit
          });
          this.getBooks();
          this.title = undefined;
          this.author = undefined;
          break;
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
    this.setState({
      apiKey: apiKey
    });
    this.getBooks();
  };

  getBooks = async e => {
    e && e.preventDefault();
    const key = await getApiKey();
    console.log(key);

    for (let limit = 0; limit < 10; limit++) {
      const { status, message, ...data } = await fetch(
        `https://www.forverkliga.se/JavaScript/api/crud.php?key=${key}&op=select`
      ).then(response => response.json());

      if (status === "success") {
        console.log("Books were successfully displayed");
        console.log(`status: ${status}`);
        console.log(`Number of retries: ${limit}`);
        console.log({ data });
        this.setState({
          books: data.data,
          limit: limit
        });
        break;
      } else {
        console.log(`ERROR: ${message}`);
      }
    }
  };

  render() {
    const data = this.state;
    return (
      <div>
        <Titles />
        {data.error}
        <Form changeApiKey={this.changeApiKey} addBooks={this.addBooks} />
        <Books books={data.books} />
        <p>Retries: {data.limit}</p>
        <p>Current API Key: {data.apiKey}</p>
      </div>
    );
  }
}

export default App;
