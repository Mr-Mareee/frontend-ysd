import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './Pages/login';
import About from './Pages/About';
import NotFound from './Pages/notFound';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path='*' element={<NotFound />}/>
        <Route path="about" element={ <About/> } />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App