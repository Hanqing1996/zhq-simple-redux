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
        return function unsubscribe() {
            listener=null
        }
    }
    function dispatch(action) {
        
        // 更新 state
        state=state||{}
        state=reducer(state,action)
        // 执行订阅的 callback
        listener&&listener()
    }
    
    function replaceReducer(newReducer) {
        reducer=newReducer
        /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
        dispatch({ type: Symbol() })
    }
    
    // 暴露给外界使用的API
    return{
        getState,
        subscribe,
        dispatch,
        replaceReducer
    }
}