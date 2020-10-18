export default function createStore(reducer) {
    
    let state
    let listener
    
    // 初始化 state
    dispatch({type:Symbol()})
    
    function getState(){
        return state
    }
    
    function subscribe(callback) {
        // 接受订阅
        listener=callback
    }
    function dispatch(action) {
        // 更新 state
        state=state||{}
        state=reducer(state,action)
        // 执行订阅的 callback
        listener&&listener()
    }
    
    // 暴露给外界使用的API
    return{
        getState,
        subscribe,
        dispatch
    }
}