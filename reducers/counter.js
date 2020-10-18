let initState = {
    count: 0
}

// 这里处理的 state 只与 counter 有关
export default function CounterReducer(state,action){
    
    state=state||initState
    
    switch (action.type) {
        case 'INCREMENT':
            // 因为 {count}只有一个 key,所以这里不需要 ...state
            return{
                count: state.count+1
            }
        case 'DECREMENT':
            return{
                count: state.count-1
            }
        default:
            return state
    }
}