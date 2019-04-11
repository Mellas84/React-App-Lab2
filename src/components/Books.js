import React, { Component } from "react";
import { Table, Button } from "reactstrap";

class Books extends Component {
  render() {
    return (
      <div className="App container">
        <Table>
          <thead>
            <tr className="book_title">
              <th>#ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {this.props.books &&
              this.props.books.map(function(book, key) {
                return (
                  <tr className="book_value" key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <Button color="success" size="sm">
                        Edit
                      </Button>
                      <Button color="danger" size="sm">
                        Delete
                      </Button>
                    </td>
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
