import React from 'react';
import { BrowserRouter,Link,Route,Routes }  from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
function App() {
  return (

    <Routes>
      <Route path='/' element={<Home />} />

    </Routes>
    
  );
}

export default App;
