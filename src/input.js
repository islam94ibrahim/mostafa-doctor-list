import React, {Component} from 'react';

class Input extends Component {
    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2 style={{marginRight: '15px'}}>Enter Doctor Name:</h2>
                <input
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onSubmit}
                    style={{padding: '4px'}}
                />
            </div>
        );
    }
}

export default Input;