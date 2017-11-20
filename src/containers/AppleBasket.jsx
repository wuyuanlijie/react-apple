// container 容器组件 需要接受store中的state和发送dispatch
// 这个不需要复用 用于直接的操作
// 不同于 component 这个是组件化 可以多次使用

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppleItem from '../components/AppleItem'
import actions from '../actions/appleAction'
// 对dispatch进行封装 让他不在显示
import { bindActionCreators } from 'redux' 
import '../styles/appleBasket.css'

class AppleBasket extends Component {
  // 计算当前已知和未知苹果的状态
  calculateStatus () {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      }
    }
    this.props.appleBasket.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow'
          // 多层查找 先用[]选择 在用.
          status[selector].quantity ++
          status[selector].weight += + apple.weight
    })
    return status
  }
  // 获取未吃苹果的组件数组
  getAppleItem (apples) {
    let data = []
    apples.forEach(apple => {
      if (!apple.isEaten) {
        data.push( <AppleItem apple={apple} 
          eatApple={ this.props.actions.eatApple } 
          key={apple.id}></AppleItem> ) 
      }
    })
    if (!data.length) {
      data.push(<div className="empty-tip" key="empty">苹果篮子啥都没！</div>)
    }
    return data
  }
  render () {
    // combineReducers 指定了我们要传入的数据state的命名
    let { appleBasket, actions } = this.props
    let { apples, isPicking } = appleBasket
    let status = this.calculateStatus()
    return (
      <div className="appleBasket">
        <div className="title">苹果篮子</div>
        <div className="status">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">
              { status.appleNow.quantity }个苹果，
              { status.appleNow.weight }克
            </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">
              { status.appleEaten.quantity }个苹果，
              { status.appleEaten.weight }克
            </div>
          </div>
          <div className="appleList">
            { this.getAppleItem(apples) }
          </div>
          <div className="btn-div">
            <button className={`pic ${isPicking ? "disabled" : ''}`}
              onClick={actions.pickApple}>
              摘苹果
            </button>
          </div>
        </div>
      </div>
    )
  }
}
// 这里里面得state是从connect中得组件得到的 获取我们想要得数据
const mapStateToProps = state => ({
   appleBasket: state.appleBasket  // state中存放了 我们开始命名的appleBasket
})
const mapDispatchToProps = dispatch => {
  return {
    // 隐藏dispatch操作
    // onClick={() => dispatch(actions.pickApple())}  传入了对应的操作指示 action里面有触发的事件dispatch
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleBasket)
