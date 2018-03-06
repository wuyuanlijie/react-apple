import { fromJS } from 'immutable' 
// reducer其实就是action的处理器 开发一类得函数 
// 接受当前得state和action 返回一个新得state
let initState = {  // 这个就是对应的state的中的appleBasket
  isPicking: false,
  newAppleId: 1, //  newAppleId 添加苹果的次数
  apples: [
    {
      id: 0,
      weight: 235,
      isEaten: false
    }
  ]
}
export default (state = initState, action) => {
  switch (action.type) {
    case 'apple/BEGIN_PICK_APPLE':  
      // newState = Object.assign({}, state, {
      //   isPicking: true
      // })
      // return newState
      return fromJS(state).set('isPicking', true).toJS()
    case 'apple/DONE_PICK_APPLE':
      let newApple = {
        id: state.newAppleId,
        weight: action.payload,
        isEaten: false
      }
      return fromJS(state).update('apples', list => list.push(newApple))
                          .set('newAppleId', state.newAppleId + 1)
                          .set('isPicking', false)
                          .toJS()
    case 'apple/FAIL_PICK_APPLE':
      // newState = Object.assign({}, state, {
      //   isPicking: false
      // })
      // return newState
      return fromJS(state).set('isPicking', false).toJS()
    case 'apple/EAT_APPLE':

      return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS()
      
    default:
      return state
  }
}