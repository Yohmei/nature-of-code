import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './scss/styles.scss'

import Ham from './components/Ham'
import Home from './pages/Home'
import RandomWalker from './pages/introduction/RandomWalker'
import NormalDistribution from './pages/introduction/NormalDistribution'
import PerlinNoise from './pages/introduction/PerlinNoise'
import Vectors from './pages/vectors/Vectors'
import UnitVectors from './pages/vectors/UnitVectors'
import WithMover from './pages/vectors/WithMover'
import MouseChaiser from './pages/vectors/MouseChaiser'
import Acceleration from './pages/forces/Acceleration'
import Friction from './pages/forces/Friction'
import FluidResistance from './pages/forces/FluidResistance'
import Gravity from './pages/forces/Gravity'

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
                  <Route exact path='/acceleration' component={Acceleration} />
                  <Route exact path='/friction' component={Friction} />
                  <Route exact path='/fluid-resistance' component={FluidResistance} />
                  <Route exact path='/gravity' component={Gravity} />
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
