import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid #ff66b2; 
  border-radius: 8px;
  padding: 20px; 
  margin-bottom: 16px; 
  background-color: ${(props) =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? '#ffccff'
      : 'white'};
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px; 
  min-height: 60px; 
`;

const Handle = styled.div`
  width: 30px; 
  height: 30px; 
  background-color: #ff66b2;
  border-radius: 4px;
  margin-right: 16px; 
`;

export default class Task extends React.Component {
    render() {
        return (
        <Draggable 
        draggableId={this.props.task.id}
         index={this.props.index}
         isDragDisabled={false}
         >
            {(provided, snapshot) => (
             <Container ref={provided.innerRef} 
             {...provided.draggableProps} 
             innerRef={provided.innerRef}
             isDragging ={snapshot.isDragging}
             >
                <Handle {...provided.dragHandleProps}/>
        {this.props.task.content}
        </Container>
    )}
        </Draggable>
        );
    }
}