import React from 'react';
import AuthView from './view/AuthView';
import HomeView from './view/HomeView';
import ProfileView from './view/ProfileView';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import Theme from "./view/style/Theme"
import "./index.css"
import "./view/style/index.css"

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Route path="/" exact component={AuthView} />
        <Route path="/profile/:id" component={ProfileView} />
        <Route path="/home" component={HomeView} />
      </Router>
    </ThemeProvider>
  );
}

export default App;