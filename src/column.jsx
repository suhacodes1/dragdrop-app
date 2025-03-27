import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 12px;
  border: 1px solid #ff66b2;
  border-radius: 8px;
  width: 300px; 
  display: flex;
  flex-direction: column;
  background-color: #ffe6f2; 
`;

const Title = styled.h3`
  padding: 12px;
  font-family: 'Poppins', sans-serif;
  color: #ff66b2;
  font-size: 18px; 
`;

const TaskList = styled.div`
  padding: 12px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#ffb3d9' : 'white')};
  flex-grow: 1;
  min-height: 150px; 
  border-radius: 8px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
