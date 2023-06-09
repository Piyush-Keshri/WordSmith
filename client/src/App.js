import './App.css';
import DataProvider from './context/DataProvider.jsx';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';


// Components
import Login from './components/accounts/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import { useState } from 'react';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    :
    <Navigate replace to='/login' />
}



function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (

    <DataProvider>
      <BrowserRouter>

        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
