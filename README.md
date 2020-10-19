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
* action
是一个对象，必须包含 type 字段
* middleware
中间件的扩展，实际上是以"接受一个 dispatch,返回一个 dispatch 的"思想去构造 dispatch 链。这种做法显然极其有利于 AOP


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
2. 新需求，在1的基础上，在每次 dispatch 时输出 store.state。也就是要实现两种中间件的复合
```js
// middlewares/timeMiddleware.js 

/**
 * middleware 在初始化 store 后的部分，可以看成是 dispatch 的迭代（接受旧 dispatch,返回新 dispatch）,而且会：
 * 1. 规定新的 dispatch 内容
 * 2. 执行旧的 dispatch（必须）
 * @param store
 * @returns {function(*): function(...[*]=)}
 */
export default (store)=>(next)=>(action)=> {
    console.log(new Date())
    next(action)
}
```
由此，在使用时，可以通过 dispatch 调用链来实现不同中间件的复合
```js
let store = createStore(reducer);

const next=store.dispatch

// dispatch 工厂
const showState=showStateMiddleware(store)

// dispatch 工厂
const logTime=timeMiddleware(store)

store.dispatch=logTime(showState(next)) 

// store.dispatch=middleware1(middleware2(middleware3...(next))))
```
注意：logTime(showState(next)) 是先触发 logTime 内容，再触发 showState 流程。

3. 新需求：在2中，使用中间件时，每个 middleware 都需要用 store 初始化一下，并赋值给 dispatch。能不能把这些步骤嵌入到 store 的构造过程中去。

最后只要以如下方式调用中间件
```js

// 复合的中间件集合
const compositedMiddlewares = composite(middleware1, middleware12, middleware3);

// compositedMiddlewares 是构造 store 的参数之一
const store = createStore(reducer,compositedMiddlewares);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});

// 直接调用 dispatch,以触发各个中间件
store.dispatch({
  type: 'INCREMENT'
});
```



由于中间件的初始化必须基于已有的 state，因此只能将各个中间件集成至 store 的 dispatch 的步封装成一个对已有 store 的后续改造操作
```js
// addMiddlewares.js

export default function addMiddlewares(store,...middlewares) {
    
    const {dispatch}=store
    
    let next
    middlewares.reverse().map(middleware=>{
        next=next||dispatch
        next=middleware(store)(next)
    })

    store.dispatch=next

    return store
}
```
```js
// index.js

let store = createStore(reducer);
store=addMiddlewares(store,showStateMiddleware,timeMiddleware)
```
---

#### unsubscribe
退订功能
```js
// createStore.js

function subscribe(callback) {
    // 接受订阅
    listener=callback
    return function unsubscribe() {
        listener=null
    }
}
```
```js
// index.js

const unsubscribe=store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count, state.info.name, state.info.description);
});
...
unsubscribe()
```











 
