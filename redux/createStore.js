export default function createStore(reducer, initState) {
    
    let state=initState
    let listener
    
    return{
        getState:function(){
            return state
        },
    
        subscribe:function (callback) {
            // 接受订阅
            listener=callback
        },
        dispatch:function (action) {
            state=reducer(state,action)
            listener()
        }
    }
}