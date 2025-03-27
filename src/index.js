import React from 'react';
import ReactDOM from 'react-dom/client';
import initialData from './initial-data';
import styled from 'styled-components';
import Column from './column';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  font-family: 'Poppins', sans-serif;
  background-color: #fce4ec; 
  padding: 20px;
`;
class App extends React.Component {
  state= initialData;


  onDragEnd = result => {
    document.body.style.color = 'inherit';
    document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId } = result;


    if(!destination) {
      return;
    }
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];


    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); 
      newTaskIds.splice(destination.index, 0, draggableId); 
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
  
      this.setState(newState);
      return;
    }
  
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
  
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
  
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
  
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
  
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
  
    this.setState(newState);
  };


    

  render() {
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}>
        <Container>
    {this.state.columnOrder.map(columnID => {
      const column = this.state.columns[columnID];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

      return <Column key= {column.id} column={column} tasks={tasks} />;
    })}
    </Container>
    </DragDropContext>
  );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

