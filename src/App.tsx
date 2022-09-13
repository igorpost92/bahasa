import './kit/index.css';
import Game from './pages/Game/Game';
import { MemoryRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Words from './pages/Words/Words';
import Word from './modals/Word/Word';
import { LanguageContextLayer } from './context/LanguageContext';
import AuthGuard from './components/AuthGuard/AuthGuard';
import VerbsTenses from './pages/VerbsTenses/VerbsTenses';
import Categories from './pages/Categories/Categories';
import Category from './pages/Category/Category';
import Learn from './pages/Learn/Learn';
import { ModalContextLayer } from './kit/contexts/ModalContext';

const isProd = location.hostname !== 'localhost';

function App() {
  const Router = isProd ? MemoryRouter : BrowserRouter;

  return (
    <AuthGuard>
      <ModalContextLayer>
        <LanguageContextLayer>
          <Word />
          <Router>
            <Routes>
              <Route path={'/words'} element={<Words />} />

              <Route path={'/categories'} element={<Categories />} />
              <Route path={'/categories/new'} element={<Category />} />
              <Route path={'/categories/:id'} element={<Category />} />

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
