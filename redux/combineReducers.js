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