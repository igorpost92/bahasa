import './kit/index.css';
import Game from './pages/Game/Game';
import { MemoryRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Words from './pages/Words/Words';
import Word from './pages/Word/Word';
import { LanguageContextLayer } from './context/LanguageContext';
import AuthGuard from './components/AuthGuard/AuthGuard';
import VerbsTenses from './pages/VerbsTenses/VerbsTenses';
import Categories from './pages/Categories/Categories';
import Category from './pages/Category/Category';
import Learn from './pages/Learn/Learn';

const isProd = location.hostname !== 'localhost';

function App() {
  const Router = isProd ? MemoryRouter : BrowserRouter;

  return (
    <AuthGuard>
      <LanguageContextLayer>
        <Router>
          <Routes>
            <Route path={'/words'} element={<Words />} />
            <Route path={'/words/new'} element={<Word />} />
            <Route path={'/words/:id'} element={<Word />} />

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
    </AuthGuard>
  );
}

export default App;
