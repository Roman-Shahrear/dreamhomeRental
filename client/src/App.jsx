import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import HomePge from './pages/HomePge'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePge />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
