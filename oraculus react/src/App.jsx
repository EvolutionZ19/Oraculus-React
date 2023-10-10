import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Error404  from './components/error404'



function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />

      </Routes>
    </Router>
  );
}

export default App;

