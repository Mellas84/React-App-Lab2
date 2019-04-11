import React from "react";

class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.addBooks}>
          <input type="text" name="title" placeholder="Title..." />
          <input type="text" name="author" placeholder="Author..." />
          <button>Send</button>
        </form>

        <form onSubmit={this.props.changeApiKey}>
          <p>
            <button>Change Api Key </button>
            Current Key: {this.props.apiKey}
          </p>
        </form>
      </div>
    );
  }
}

export default Form;
