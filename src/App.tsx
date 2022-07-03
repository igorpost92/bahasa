import './App.css';
import Game from './pages/Game/Game';
import { MemoryRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Words from './pages/Words/Words';
import Word from './pages/Word/Word';

const isProd = location.hostname !== 'localhost';

function App() {
  const Router = isProd ? MemoryRouter : BrowserRouter

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Words />} />
        <Route path={'/game'} element={<Game />} />
        <Route path={'/words'} element={<Words />} />
        <Route path={'/words/new'} element={<Word />} />
        <Route path={'/words/:id'} element={<Word />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
