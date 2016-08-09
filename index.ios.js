import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Animated,
  PanResponder,
  Text,
  View
} from 'react-native'

const SQUARE_DIMENSIONS = 100

class Piggs extends Component {
  state = {
    pan: new Animated.ValueXY()
  }

  getStyle = _ => ([
    styles.square,
    { transform: this.state.pan.getTranslateTransform() }
  ])

  componentWillMount = _ => {
    this._animatedValueX = 0
    this._animatedValueY = 0
    this.state.pan.x.addListener( ({value}) => this._animatedValueX = value )
    this.state.pan.y.addListener( ({value}) => this._animatedValueY = value )

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: _ => true,
      onMoveShouldSetPanResponderCapture: _ => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY})
        this.state.pan.setValue({x: 0, y: 0}) // initial Value
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),
      onPanResponderRelease: _ => this.state.pan.flattenOffset(),
    })
  }

  componentWillUnmount = _ => {
    this.state.pan.x.removeAllListeners()
    this.state.pan.y.removeAllListeners()
  }

  render = _ => (
    <View style={styles.container}>
      <Animated.View
        {...this._panResponder.panHandlers}
        style={this.getStyle()} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'lightblue',
  }
})

AppRegistry.registerComponent('piggs', () => Piggs)
