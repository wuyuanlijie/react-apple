import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AppleItem extends Component {
  // 普通显示组件的动态渲染 传入state进行渲染 ！更新生命周期函数
  // 开启条件更新这个生命周期函数
  static PropTypes = {
    eatApple: PropTypes.func.isRequired,
    apple: PropTypes.object.isRequired
  }
  shouldComponentUpdate (nextProps) { // 两者不相等 重现刷新
    return nextProps.state !== this.props.state
  }
  render () {
    let { apple, eatApple } = this.props
    // 数据模拟区域 
    // console.log(typeof(eatApple))
    if (apple.isEaten) return null;  // 如果是已经吃了 那就不用去显示
    // onClick 点击事件的触发 里面放置一个函数
    return (
      <div className="appleItem">
        <div className="apple">
          <img src="https://raw.githubusercontent.com/ckinmind/apple-basket-redux/master/src/images/apple.png" alt="红苹果"/>
        </div>
        <div className="info">
          <div className="name">红苹果 - { apple.id }号</div>
          <div className="weight">{ apple.weight }克</div>
        </div>
        <div className="btn-div">
          <button onClick={ () => eatApple(apple.id) }>吃掉</button>
        </div>
      </div>
    )
  }
}

export default AppleItem