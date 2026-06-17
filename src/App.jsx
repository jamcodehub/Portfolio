import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:cat/:idx" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
