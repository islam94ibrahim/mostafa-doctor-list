import React, {Component} from 'react';

class TaskList extends Component {
    getStyle = () => ({
        padding: '8px',
        transition: 'background-color 0.2s ease',
        backgroundColor: this.props.isDraggingOver ? 'skyblue' : 'white',
        flexGrow: '1',
        minHeight: '100px'
    })
    render() {
        return (
            <div ref={this.props.innerRef}
                 style={this.getStyle()}
            >
                {this.props.children}
            </div>
        );
    }
}

export default TaskList;