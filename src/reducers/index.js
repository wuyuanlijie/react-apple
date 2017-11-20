import { combineReducers } from 'redux'
import appleBasketReducer from './appleBasketReducer'


// 进行合并reducer combineReducers
// 指定我们需要传入的数据 appleBasket 指定对应的state 就是我们放到context中数据

const rootReducer = combineReducers({
  appleBasket: appleBasketReducer
})

export default rootReducer