import GameField from "./components/Fields/GameField.tsx";

import io from 'socket.io-client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainMenu from "./pages/mainMenu.tsx";
import Lobby from "./pages/lobby.tsx";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// const socket = io('172.16.1.66:3000');

function App() {

  return (
      // Test Routing
      <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<MainMenu />} />
                  <Route path={'/lobby/:id'} element={<Lobby />} />
                  <Route path={'/lobby/:id/game'} element={<GameField />} />
              </Routes>
          </BrowserRouter>
      </DndProvider>
  )
}

export default App
