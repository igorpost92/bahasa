import './kit/index.css';
import { isProd } from './utils/isProd';
import Game from './pages/Game/Game';
import { MemoryRouter, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Words from './pages/Words/Words';
import WordModal from './modals/Word/Word';
import { LanguageContextLayer } from './context/LanguageContext';
import VerbsTenses from './pages/VerbsTenses/VerbsTenses';
import Categories from './pages/Categories/Categories';
import CategoryModal from './modals/Category/Category';
import Learn from './pages/Learn/Learn';
import { ModalContextLayer } from './kit';
import Settings from './pages/Settings/Settings';
import Login from './pages/Settings/Login/Login';
import FullRepeat from './pages/FullRepeat/FullRepeat';
import VerbsRandom from './pages/VerbsRandom/VerbsRandom';
import UpdateBanner from './components/UpdateBanner';

function App() {
  const Router = isProd() ? MemoryRouter : BrowserRouter;

  return (
    <ModalContextLayer>
      <LanguageContextLayer>
        <UpdateBanner />
        <WordModal />
        <CategoryModal />
        <Router>
          <Routes>
            <Route path={'/words'} element={<Words />} />
            <Route path={'/categories'} element={<Categories />} />

            <Route path={'/learn'} element={<Learn />} />
            <Route path={'/repeat'} element={<Game />} />
            <Route path={'/full-repeat'} element={<FullRepeat />} />
            <Route path={'/verbs'} element={<VerbsTenses />} />
            <Route path={'/verbs-random'} element={<VerbsRandom />} />
            <Route path={'/settings'} element={<Settings />} />
            <Route path={'/login'} element={<Login />} />

            <Route path="*" element={<Navigate to={'/words'} />} />
          </Routes>
        </Router>
      </LanguageContextLayer>
    </ModalContextLayer>
  );
}

export default App;
