import React, {Component} from 'react';
import './styles/global.css';
  

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage"
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";

//Context
import withContext from "./Context";
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse)
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);

class App extends Component {

  render() {
    return (
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="/notfound"/>

    </Switch>
    </Router>
  );
  }
}

export default App;
