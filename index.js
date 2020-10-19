import {createStore} from './redux/index'
import CounterReducer from './reducers/counter'
import InfoReducer from "./reducers/info";
import {combineReducers} from "./redux/combineReducers";
import timeMiddleware from "./middlewares/timeMiddleware"

// 构造 reducer
const reducer = combineReducers({
    counter: CounterReducer,
    info: InfoReducer
});

let store = createStore(reducer);
const next=store.dispatch

//
store.dispatch=timeMiddleware(next)

store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count, state.info.name, state.info.description);
});

store.dispatch({
    type: 'INCREMENT'
})

store.dispatch({
    type: 'SET_NAME',
    name: 'libai'
})

store.dispatch({
    type: 'SET_DESCRIPTION',
    description: 'smart girl'
})

store.dispatch({
    type: 'DECREMENT'
})



//
// // dispatch 会修改 store 内部的 state,并执行 subscribe 传入的回调函数
// store.dispatch({
//     type: 'INCREMENT'
// });
//
// store.dispatch({
//     type: 'SET_NAME',
//     name: 'libai'
// });
//
// store.dispatch({
//     type: 'SET_DESCRIPTION',
//     description: 'smart girl'
// });
//
// store.dispatch({
//     type: 'DECREMENT'
// });