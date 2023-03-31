
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom/dist";
import { Main } from "./pages/Main";
import './styles/main.scss'
import { Results } from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Main/>} />
        <Route exact path='/results/:scores' element={<Results />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
