import React from 'react'
import styled from 'styled-components'
import Task from './task'
import TaskList from "./TaskList";
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  border-bottom: solid 1px;
  padding: 4px;
  text-align: center;
`

export default class Column extends React.Component {
    getStyle = () => ({
        padding: '8px',
        transition: 'background-color 0.2s ease',
        backgroundColor: this.props.isDraggingOver ? 'skyblue' : 'white',
        flexGrow: '1',
        minHeight: '100px'
    })

    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} type="TASK">
                    {(provided, snapshot) => {
                        return (
                        <TaskList
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => (
                                <Task
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onRemoveClick={() => this.props.onRemoveClick(task.id, this.props.column.id)}
                                />
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}}
                </Droppable>
            </Container>
        )
    }
}
