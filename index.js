import {createStore} from './redux/index'
import CounterReducer from './reducers/counter'
import InfoReducer from "./reducers/info";
import {combineReducers} from "./redux/combineReducers";
import timeMiddleware from "./middlewares/timeMiddleware"
import showStateMiddleware from "./middlewares/showStateMiddleware";
import addMiddlewares from "./redux/addMiddlewares";
import AgeReducer from "./reducers/age";

// 构造 reducer
const reducer = combineReducers({
    counter: CounterReducer,
    info: InfoReducer
});

// 初始化 store
let store = createStore(reducer);

// 对 store 进一步改造，注入各个中间件，其实可以把"初始化"和"注入中间件"封装起来。不过我暂时觉得没必要
store=addMiddlewares(store,showStateMiddleware,timeMiddleware)

// const next=store.dispatch
//
// // dispatch 工厂
// const showState=showStateMiddleware(store)
//
// // dispatch 工厂
// const logTime=timeMiddleware(store)
//
// store.dispatch=logTime(showState(next))
//

const unsubscribe=store.subscribe(() => {
    let state = store.getState();
    console.log(`state:${state.toString()}`);
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

// 加载新 reducer
const newReducer = combineReducers({
    counter: CounterReducer,
    info: InfoReducer,
    age:AgeReducer
});

store.replaceReducer(newReducer)

store.dispatch({
    type: 'SET_DESCRIPTION',
    description: 'smart girl'
})

store.dispatch({
    type: 'OLD'
})


unsubscribe()

// 已经退订，不再触发回调函数
store.dispatch({
    type: 'DECREMENT'
})
