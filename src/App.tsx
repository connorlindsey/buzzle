import React from 'react';
import AuthView from './view/AuthView';
import HomeView from './view/HomeView';
import ProfileView from './view/ProfileView';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./index.css"

const App: React.FC = () => {
  return (
    <Router>
      <div className="m-auto antialiased text-center bg-gray-900 min-h-screen text-white">
        <header className="py-2 text-white text-2xl">
          <nav>
            <ul className="flex items-center justify-around" >
              <li className="hover:text-teal-500">
                <Link to="/">Auth</Link>
              </li>
              <li className="hover:text-teal-500">
                <Link to="/home">Home</Link>
              </li>
              <li className="hover:text-teal-500">
                <Link to="/profile/1">Profile 1</Link>
              </li>
              <li className="hover:text-teal-500">
                <Link to="/profile/2">Profile 2</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Route path="/" exact component={AuthView} />
        <Route path="/profile/:id" component={ProfileView} />
        <Route path="/home" component={HomeView} />
      </div>
    </Router>
  );
}

export default App;