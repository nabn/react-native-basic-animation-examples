import React, {Component} from 'react'
import {
  Dimensions,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  NativeModules,
  View,
} from 'react-native'

const VIEWPORT = Dimensions.get('window')
const OFFSET = VIEWPORT.height - 100
const { UIManager } = NativeModules

export default class App extends Component {

  componentWillMount = _ => {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: _ => true,
      onMoveShouldSetPanResponderCapture: _ => true,
      onPanResponderGrant: this.panResponderGrant,
      onPanResponderMove: this.panResponderMove,
      onPanResponderRelease: this.panResponderRelease,
      onPanResponderTerminate: this.panResponderRelease,
    })

    this.prevDy = 0

    this.rectStyles = {
      style: { top: OFFSET },
    }
  }

  updateNativeStyles = _ => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.rect && this.rect.setNativeProps(this.rectStyles)
  }

  panResponderGrant = _ => {
    // set the current top to the last state
    this.rectStyles.style.top = OFFSET + this.prevDy
    this.updateNativeStyles()
  }

  panResponderMove = (e, gestureState) => {
    // sum of all the dy since the first responder move
    const actualDy = this.prevDy + gestureState.dy
    this.dy = gestureState.dy
    // next state of the rect top
    const nextTop = OFFSET + actualDy

    // nextTop sould not overflow
    if (nextTop > 0 && nextTop < OFFSET) {
      // set the next state of the top
      this.rectStyles.style.top = OFFSET + actualDy
      this.updateNativeStyles()
      // store dy for use when responder is released
      this.tempDy = actualDy
    }
  }

  panResponderRelease = _ => {
    // store the prevDy to use when responder grant occours again
    if (Math.abs(this.dy) > 40) {
      if (this.dy > 0)
        this._flickDown()
      else
        this._flickUp()
    } else {
      // this._restoreState()
    }
  }

  _restoreState = _ => {
    this.rectStyles.style.top = this.prevDy
    this.updateNativeStyles()
  }

  _flickUp = _ => {
    this.rectStyles.style.top = 0
    this.updateNativeStyles()
  }

  _flickDown = _ => {
    this.rectStyles.style.top = OFFSET
    this.updateNativeStyles()
  }

  render = _ => (
    <View style={styles.container}>
      <View
        {...this.panResponder.panHandlers}
        ref={r => this.rect = r}
        style={styles.bottom} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: OFFSET,
    height: VIEWPORT.height,
    backgroundColor: 'lightblue',
  },
})

