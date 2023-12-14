import GameField from "./components/Fields/GameField.tsx";

import io from 'socket.io-client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainMenu from "./pages/mainMenu.tsx";

// const socket = io('172.16.1.66:3000');

function App() {

  return (
      // Test Routing
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<MainMenu />} />
              <Route path={'/game/:id'} element={<GameField />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
