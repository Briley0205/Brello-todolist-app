import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DragabbleCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.boardColor};
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: string[];
  droppableId: string;
}
function Board({ toDos, droppableId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{droppableId}</Title>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            style={{ backgroundColor: "blue" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo}
                index={index}
                toDo={toDo}
              ></DraggableCard>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
