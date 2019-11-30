import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Home from './pages/Home'
import RandomWalker from './pages/RandomWalker'
import Ham from './components/Ham'

import './scss/styles.scss'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <header className='header'>
          <div className='img-chest'>
            <div className='line'></div>
          </div>
        </header>
        <Route
          render={({ location }) => (
            <TransitionGroup className='page-wrapper'>
              {/* Change the classNames to 'fade' in order to apply transitions and timeout to 450ms */}
              <CSSTransition key={location.key} timeout={0} classNames='fade-commented'>
                <Switch location={location}>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/random-walker' render={props => <RandomWalker {...props} />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        <Ham />
      </div>
    )
  }
}
