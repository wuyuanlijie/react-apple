
import axios from 'axios'
// 统一的actionCreator
// 名空间 对普通的action做划分
// const prefix = 'apple/'

// react-thunk 
let actions = {
  pickApple: () => (dispatch, getState) => {
    // 如果正在摘苹果 结束这个thunk 不执行摘
    if (getState().isPicking) return
    // 通知开始摘苹果
    dispatch(actions.beginPickApple())
    axios.get('/')
      .then(res => {
        if (res.status !=200 ) {
          dispatch(actions.failPickApple(res.statusText))
        }
        let weight = Math.floor(200 + Math.random() * 50)
        dispatch(actions.donePickApple(weight))
      }).catch(e => {
        dispatch(actions.failPickApple(e.statusText))
      })
  },
  // 代表返回这个对象 () =>  ({})
  beginPickApple: () => ({
    type: 'apple/BEGIN_PICK_APPLE'
  }),
  donePickApple: appleWeight => ({
    type: 'apple/DONE_PICK_APPLE',
    payload: appleWeight
  }),
  failPickApple: errMsg => ({
    type: 'apple/FAIL_PICK_APPLE',
    payload: new Error(errMsg),
    error: true
  }),
  eatApple: appleId => ({
    type: 'apple/EAT_APPLE',
    payload: appleId
  })
}

export default actions