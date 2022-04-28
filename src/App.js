import Global from "./styles/global";
import React from "react"
import Header from "./components/Header";
import Board from "./components/Board";
function App() {
  return (
    <React.Fragment>
      <Global /> 
      <Header/>
      <Board></Board>
    </React.Fragment>
    
  );
}

export default App;
