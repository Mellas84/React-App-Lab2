import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Books from './components/Books';

const API_KEYURL ="https://www.forverkliga.se/JavaScript/api/crud.php?requestKey"
const API_KEY = "43hRJ"


class App extends Component {

  state= {
    title: undefined,
    author: undefined,
    error: undefined
  }

  addBooks = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const author = e.target.elements.author.value;

    const api_call = await fetch('https://www.forverkliga.se/JavaScript/api/crud.php?key=WsCq4&op=insert&title=${title}&author=${author}');
    const data = await api_call.json();

    if(title && author) {
    console.log(data);
    this.setState({
      title: data.main.title,
      author: data.main.author,
      error: ""
    });
  } else {
    this.setState({
      title: undefined,
      author: undefined,
      error: "Please enter the values"
    });
}
}

  

  render() {
    return(
      <div>
        <Titles/>
        <Form addBooks={this.addBooks}/>
        <Books 
        title={this.state.title}
        author={this.state.author}
        error={this.state.error}
        />
      </div>
    );
  }

}

export default App;
