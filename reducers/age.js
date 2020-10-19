let initState = {
    age: 0
}

export default function AgeReducer(state,action){
    
    state=state||initState
    
    switch (action.type) {
        case 'OLD':
            return{
                age: state.age+1
            }
        case 'YOUNG':
            return{
                age: state.age-1
            }
        default:
            return state
    }
}