import './kit/index.css';
import Game from './pages/Game/Game';
import { MemoryRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Words from './pages/Words/Words';
import WordModal from './modals/Word/Word';
import { LanguageContextLayer } from './context/LanguageContext';
import AuthGuard from './components/AuthGuard/AuthGuard';
import VerbsTenses from './pages/VerbsTenses/VerbsTenses';
import Categories from './pages/Categories/Categories';
import CategoryModal from './modals/Category/Category';
import Learn from './pages/Learn/Learn';
import { ModalContextLayer } from './kit/contexts/ModalContext';

// TODO: env var
const isProd = location.hostname === 'http://ip92-bahasa.surge.sh';

function App() {
  const Router = isProd ? MemoryRouter : BrowserRouter;

  return (
    <AuthGuard>
      <ModalContextLayer>
        <LanguageContextLayer>
          <WordModal />
          <CategoryModal />
          <Router>
            <Routes>
              <Route path={'/words'} element={<Words />} />
              <Route path={'/categories'} element={<Categories />} />

              <Route path={'/learn'} element={<Learn />} />
              <Route path={'/repeat'} element={<Game />} />
              <Route path={'/global-repeat'} element={<Game globalRepeatMode />} />
              <Route path={'/verbs'} element={<VerbsTenses />} />

              <Route path="*" element={<Navigate to={'/words'} />} />
            </Routes>
          </Router>
        </LanguageContextLayer>
      </ModalContextLayer>
    </AuthGuard>
  );
}

export default App;
