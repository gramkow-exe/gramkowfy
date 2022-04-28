import Global from "./styles/global";
import React from "react"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from "./components/Header";
import Board from "./components/Board";
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Global /> 
      <Header/>
      <Board></Board>
    </DndProvider>
    
  );
}

export default App;
