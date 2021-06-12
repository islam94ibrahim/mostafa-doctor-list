import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  
  background-color: ${props =>
    props.isDragDisabled
        ? 'lightgrey'
        : props.isDragging
        ? 'lightgreen'
        : 'white'};
`

export default class Task extends React.Component {
    getStyle = () => ({
        position: 'absolute',
        right: '5px',
        cursor: 'pointer',
        color: 'red',
        top: '3px'
    })

    render() {
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {this.props.task.content}
                        <span
                            style={this.getStyle()}
                            onClick={this.props.onRemoveClick}
                        >x</span>
                    </Container>
                )}
            </Draggable>
        )
    }
}
