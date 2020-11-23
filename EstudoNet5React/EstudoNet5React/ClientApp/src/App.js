import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import FellowUsuarios from './components/FellowUsuarios';
import MyProfile from './components/MyProfile';
import SignIn from './components/SignIn';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/FellowUsuarios' component={FellowUsuarios} />
        <Route path='/MyProfile/:id' component={MyProfile} />
        <Route path='/signin' component={SignIn} />
    </Layout>
);
