import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import Settings from "./screens/Settings"
import PostDetailsScreen from "./screens/PostDetailsScreen"
import NotFound from "./screens/NotFound"
import ForgotPassword from "./screens/ForgotPassword"
import NewPassword from "./screens/NewPassword"
import SelectCategory from "./components/selectCategory/selectCategory"

import "react-awesome-lightbox/build/style.css";

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <main  style={{ marginTop: "85px" }}>
          <SelectCategory />
          <Container>
            <Switch>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/home' component={HomeScreen} exact />
              <Route path='/home/:category' component={HomeScreen} />
              <Route path='/post/:id' component={PostDetailsScreen} />
              <Route path='/settings' component={Settings} exact />
              <Route path='/profile' component={ProfileScreen} exact />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/forgot-password' component={ForgotPassword} exact/>
              <Route path='/new-password' component={NewPassword}/>
              <Route path='*' component={NotFound} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
