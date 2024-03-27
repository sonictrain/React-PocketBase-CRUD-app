import React from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { isUserValid } from './lib/pocketbase';

const App = () => {

  return (
    <div className='p-8 md:p-12 lg:p-20'>
      <Router>
        <Routes>
          <Route path='/' element={isUserValid ? <Dashboard /> : <Navigate to='signin' />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;