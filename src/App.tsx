import React from 'react';
import AuthView from './view/AuthView';
import HomeView from './view/HomeView';
import ProfileView from './view/ProfileView';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import Theme from "./view/style/Theme"
import UserService from './services/UserService';
import UploadImage from './view/UploadImage';
import "./index.css"
import "./view/style/index.css"

const UserContext = React.createContext(new UserService());

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <UserContext.Provider value={new UserService()}>
        <Router>
          <Route path="/" exact component={AuthView} />
          <Route path="/profile/:alias" component={ProfileView} />
          <Route path="/home" component={HomeView} />
          <Route path="/upload-image" component={UploadImage} />
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;