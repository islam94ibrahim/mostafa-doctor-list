import React from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Input from "./input";
import Column from './column'

const Container = styled.div`
  display:flex;
`

class App extends React.Component {
    state = {
        doctorCounter: 1,
        doctorInput: '',
        tasks: {},
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Doctors List',
                taskIds: []
            },
            'column-2': {
                id: 'column-2',
                title: 'Saturday',
                taskIds: []
            },
            'column-3': {
                id: 'column-3',
                title: 'Sunday',
                taskIds: []
            },
            'column-4': {
                id: 'column-4',
                title: 'Monday',
                taskIds: []
            },
            'column-5': {
                id: 'column-5',
                title: 'Tuesday',
                taskIds: []
            },
            'column-6': {
                id: 'column-6',
                title: 'Wednesday',
                taskIds: []
            },
            'column-7': {
                id: 'column-7',
                title: 'Thursday',
                taskIds: []
            },
            'column-8': {
                id: 'column-8',
                title: 'Friday',
                taskIds: []
            }
        },
        // Facilitate reordering of the columns
        columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7', 'column-8']
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = this.state.columns[source.droppableId]
        const finish = this.state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState)
            return
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        this.setState(newState)
    }

    onDoctorInputChange = (event) => {
        this.setState({doctorInput: event.target.value})
    }

    onDoctorInputSubmit = () => {
        if (this.state.doctorInput !== '') {
            this.setState(prevState => {
                const tasks = {
                    ...prevState.tasks,
                    [`task-${prevState.doctorCounter}`]: { id: `task-${prevState.doctorCounter}`, content: prevState.doctorInput },
                    [`task-${prevState.doctorCounter + 1}`]: { id: `task-${prevState.doctorCounter + 1}`, content: prevState.doctorInput },
                }
                const list = {
                    ...prevState.columns['column-1'],
                    'taskIds': [
                        ...prevState.columns['column-1']['taskIds'],
                        `task-${prevState.doctorCounter}`,
                        `task-${prevState.doctorCounter + 1}`
                    ]
                }

                return {
                    tasks: tasks,
                    columns: {
                        ...prevState.columns,
                        'column-1': list
                    },
                    doctorInput: '',
                    doctorCounter: prevState.doctorCounter + 2
                }
            })
        }
    }

    onInputKeyPress = (event) => {
        if(event.which === 13){
            this.onDoctorInputSubmit()
        }
    }

    onRemoveClick = (taskId, columnId) => {
        this.setState(prevState => {
            const columns = {
                ...prevState['columns'],
                [columnId]: {
                    ...prevState['columns'][columnId],
                    taskIds: prevState['columns'][columnId]['taskIds'].filter(element => element !== taskId)
                }
            }

            return {columns}
        })
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input
                        value={this.state.doctorInput}
                        onChange={this.onDoctorInputChange}
                        onSubmit={this.onInputKeyPress}
                    />
                    <button onClick={this.onDoctorInputSubmit} style={{marginLeft: '20px'}}> Add </button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.columnOrder.map(columnId => {
                            const column = this.state.columns[columnId]
                            const tasks = column.taskIds.map(
                                taskId => this.state.tasks[taskId]
                            )

                            return (
                                <Column key={column.id} column={column} tasks={tasks} onRemoveClick={this.onRemoveClick} />
                            )
                        })}
                    </Container>
                </DragDropContext>
            </div>
        )
    }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
