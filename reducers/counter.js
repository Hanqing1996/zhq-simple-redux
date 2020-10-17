let initState = {
    count: 0
}
export default function CounterReducer(state,action){
    
    state=state||initState
    
    switch (action.type) {
        case 'INCREMENT':
            return{
                ...state,
                count: state.count+1
            }
        case 'DECREMENT':
            return{
                ...state,
                count: state.count-1
            }
        default:
            return state
    }
}