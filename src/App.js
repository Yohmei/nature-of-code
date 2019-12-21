import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './scss/styles.scss'

import Ham from './components/Ham'
import Home from './pages/Home'
import RandomWalker from './pages/inroduction/RandomWalker'
import NormalDistribution from './pages/inroduction/NormalDistribution'
import PerlinNoise from './pages/inroduction/PerlinNoise'
import Vectors from './pages/vectors/Vectors'
import UnitVectors from './pages/vectors/UnitVectors'
import WithMover from './pages/vectors/WithMover'
import MouseChaiser from './pages/vectors/MouseChaiser'
import Force from './pages/forces/Force'

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
                  {/* Introduction */}
                  <Route exact path='/random-walker' component={RandomWalker} />
                  <Route exact path='/normal-distribution' component={NormalDistribution} />
                  <Route exact path='/perlin-noise' component={PerlinNoise} />
                  {/* Vectors */}
                  <Route exact path='/vectors' component={Vectors} />
                  <Route exact path='/unit-vectors' component={UnitVectors} />
                  <Route exact path='/mover' component={WithMover} />
                  <Route exact path='/mouse-chaiser' component={MouseChaiser} />
                  {/* Forces */}
                  <Route exact path='/force' component={Force} />
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
