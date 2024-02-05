import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import BusinessRegistration from './pages/BusinessRegistration';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
        <div id="pageContainer">
            <Routes>
                    <Route path="/" Component={Landing} />
                    <Route path="/register" Component={BusinessRegistration} />
                    <Route path="/about" Component={About} />
                </Routes>
        </div>
    </div>
  );
}

export default App;
