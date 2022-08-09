import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState, toDoState } from "./atoms";
import styled from "styled-components";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        // Delete item
        boardCopy.splice(source.index, 1);
        // Put back the item
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          // "currentBoard" : boardCopy
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((prevBoards) => {
        const sourceBoard = [...prevBoards[source.droppableId]];
        const destinationBoard = [...prevBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);
        return {
          ...prevBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board toDos={toDos[boardId]} droppableId={boardId} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
function Selector() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const MinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={MinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}
export default App;
