import './App.css';
import './kit/index.css';
import Game from './pages/Game/Game';
import { MemoryRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Words from './pages/Words/Words';
import Word from './pages/Word/Word';
import Languages from './pages/Languages/Languages';
import Language from './pages/Language/Language';
import { LanguageContextLayer } from './context/LanguageContext';

const isProd = location.hostname !== 'localhost';

function App() {
  const Router = isProd ? MemoryRouter : BrowserRouter;

  return (
    <LanguageContextLayer>
      <Router>
        <Routes>
          <Route path={'/'} element={<Words />} />
          <Route path={'/languages'} element={<Languages />} />
          <Route path={'/languages/new'} element={<Language />} />
          <Route path={'/languages/:id'} element={<Language />} />
          <Route path={'/game'} element={<Game />} />
          <Route path={'/global-repeat'} element={<Game globalRepeatMode />} />
          <Route path={'/words'} element={<Words />} />
          <Route path={'/words/new'} element={<Word />} />
          <Route path={'/words/:id'} element={<Word />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      </Router>
    </LanguageContextLayer>
  );
}

export default App;
