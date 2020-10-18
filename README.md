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