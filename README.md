参考自[从零实现一个 redux](https://github.com/brickspert/blog/issues/22)


#### node.js 环境下支持 es6 语法（主要是 impoprt） 
```js
"scripts": {
"start": "npx babel-node index.js"
},
"devDependencies": {
"babel-cli": "^6.26.0",
"babel-preset-es2015": "^6.24.1",
"babel-preset-stage-2": "^6.24.1"
}
```


* reducer
规定了以何种方式才能修改 store.state
* dispatch
提交 state 修改，真正的 state 修改由 store 通过 reducer 实现。
* subscribe
订阅，传入一个回调函数，该回调函数将在 dispatch 后触发



#### state 拆分
* combineReducers 在遍历执行不同 reducer 时只传入对应 key 的 reducer，依此保证:
    * CounterReducer 只处理与 counter 有关的 state
    * InfoReducer 只处理与 info 有关的 state
* 在不同 reducer 返回数据后，由于它们隶属于不同的 key，所以还要对它们做按 key 聚合，以及属性叠加
```js
export function combineReducers(reducers){
    return function (state,action) {
        let preState={}
        // 遍历所有 reducer,分别执行 action
        Object.keys(reducers).map(key=>{
            const currentState=reducers[key](state[key],action)
            const stateForKey={}
            // 将 stateChange 按 key 聚合
            stateForKey[key]=currentState
            preState={...preState,   ...stateForKey}
        })
        return preState
    }
}
```
* store 初始化 state 的方式是 dispatch 一个 不被任何 reducer 接受的 action，以获取各个 reducer 的 initialState，再进行属性叠加。     
```js
dispatch({type:Symbol()})
```
---
#### middleWare
1. 新需求：在每次 dispatch 时打印当前时间 

解决方法：构造中间件 timeMiddleware
```js
// index.js

let store = createStore(reducer);
const next=store.dispatch

store.dispatch=timeMiddleware(next)
```
```js
// timeMiddlwware.js

export default (next)=>(action)=> {
    console.log(new Date())
    next(action)
}
```