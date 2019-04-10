import React, { Component } from "react";
import { Table } from "reactstrap";

class Books extends Component {
  render() {
    return (
      <div className="App Container">
        <Table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {this.props.books &&
              this.props.books.map(function(book, key) {
                return (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Books;
