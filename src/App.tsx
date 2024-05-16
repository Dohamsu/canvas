import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
// import Counter from './features/counter/Counter';
import Home from './pages/Home';
// import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
