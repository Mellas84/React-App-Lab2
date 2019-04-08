import React from 'react';

class Form extends React.Component {
    render() {
        return(
            <form onSubmit={this.props.adddBooks}>
                <input type="text" name="title" placeholder="Title..."/>
                <input type="text" name="author" placeholder="Author..."/>
                <button>Send</button>
            </form>

        );
    }
};

export default Form;