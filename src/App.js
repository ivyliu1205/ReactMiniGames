import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Blanko from './pages/Blanko'
import Slido from './pages/Slido'
import Tetro from './pages/Tetro'

function App() {
  return (
    <div id="app">
      {/* <HeaderBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/slido" element={<Slido />} />
          <Route path="/tetro" element={<Tetro />} />
        </Routes>
      </BrowserRouter>
      {/* <FootBar /> */}
    </div>
  );
}

export default App;
