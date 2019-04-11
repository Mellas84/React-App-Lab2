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
    error: ""
  };

  componentDidMount() {
    this.getBooks();
  }

  addBooks = async e => {
    e.preventDefault();

    var title = e.target.elements.title.value;
    var author = e.target.elements.author.value;
    e.target.reset();
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
            limit: limit,
            error: ""
          });
          this.getBooks();
          if (limit === 0) {
            window.alert(
              `Status: ${status}\nWe managed to add your book to the list after ${limit +
                1} try!`
            );
          } else {
            window.alert(
              `Status: ${status}\nWe managed to add your book to the list after ${limit +
                1} tries!`
            );
          }

          break;
        } else {
          window.alert(`Status: ${status}\nOperation Failed`);
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
        console.log(`Number of retries: ${limit + 1}`);
        console.log({ data });
        console.log(data.data);
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
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xss-7 form-container">
                  <Titles />
                  {data.error}
                  <Form
                    changeApiKey={this.changeApiKey}
                    addBooks={this.addBooks}
                    apiKey={data.apiKey}
                  />
                  <Books books={data.books} index={data.books.index} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
