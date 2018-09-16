import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AppliedRoute from './AppliedRoute/AppliedRoute';
import Home from '../../containers/Home/Home';
import NotFound from '../../containers/NotFound/NotFound';
import Login from '../../containers/Login/Login';
import Signup from '../../containers/Signup/Signup';
import AddImage from '../../containers/AddImage/AddImage';
import Images from '../../containers/Images/Images';

const routes = (props) => {
  return (
    <Switch>
      <AppliedRoute path = "/" exact component={Home} props={props.childProps}/>
      <AppliedRoute path="/login" exact component={Login} props={props.childProps} />
      <AppliedRoute path="/signup" exact component={Signup} props={props.childProps} />
      <AppliedRoute path="/upload/new" exact component={AddImage} props={props.childProps} />
      <AppliedRoute path="/image/:id" exact component={Images} props={props.childProps} />
      <Route component={NotFound}/>
    </Switch>
  );
};

export default routes;
