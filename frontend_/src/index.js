import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import UsuarioProvider from './context/UsuarioContext';

import AuthPage from "./layouts/Auth/AuthPage";
import AdminLayout from "./layouts/AdminLayout";

import Dashboard from './pages/Dashboard';
import Captura from './pages/Captura';
import Editar from './pages/Editar';
import Busqueda from './pages/Busqueda';
import Registro from './pages/Registro';


function App() {
  return (
    <BrowserRouter>  
      <UsuarioProvider>
        <Switch>
          <Route exact path="/portal/login" render={props => <AuthPage {...props} />} />
          <RouteWrapper path="/portal/dashboard" component={Dashboard} layout={AdminLayout} />
          <RouteWrapper path="/portal/captura" component={Captura} layout={AdminLayout} />
          <RouteWrapper path="/portal/editar" component={Editar} layout={AdminLayout} />
          <RouteWrapper path="/portal/busqueda" component={Busqueda} layout={AdminLayout} />
          <RouteWrapper path="/portal/registro/:id" component={Registro} layout={AdminLayout} />
          <Redirect from="/" to="/portal/login" />
        </Switch>
      </UsuarioProvider>
    </BrowserRouter>
  );
}

function RouteWrapper({
  component: Component, 
  layout: Layout, 
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

render(<App />, document.getElementById('root'));