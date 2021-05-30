import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import EditFilm from './pages/EditFilm'
import AddFilm from './pages/AddFilm'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/edit/:id' component={EditFilm}/>
                <Route path='/add' component={AddFilm}/>
            </Switch>
        </BrowserRouter>
    );
}