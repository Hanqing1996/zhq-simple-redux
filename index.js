import {createStore} from './redux/index'
import CounterReducer from './reducers/counter'
import InfoReducer from "./reducers/info";
import {combineReducers} from "./redux/combineReducers";

// 构造 reducer
const reducer = combineReducers({
    counter: CounterReducer,
    info: InfoReducer
});

let initState = {
    counter: {
        count: 0
    },
    info: {
        name: 'lucy',
        description: 'hot girl'
    }
}


let store = createStore(reducer, initState);

store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count, state.info.name, state.info.description);
});



// dispathch 会修改 store 内部的 state,并执行 subscribe 传入的回调函数
store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type: 'SET_NAME',
    name: 'libai'
});

store.dispatch({
    type: 'SET_DESCRIPTION',
    name: 'smart girl'
});
