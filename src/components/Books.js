import React from "react";

class Books extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.getBooks}>
        <button>Get Books</button>
      </form>
    );
  }
}
export default Books;
