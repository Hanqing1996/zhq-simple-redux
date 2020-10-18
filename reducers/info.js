let initState = {
    name: 'lucy',
    description: 'hot girl'
    
}

// 这里处理的 state 只与 info 有关
export default function InfoReducer(state,action){
    
    state=state||initState
    
    switch (action.type) {
        case 'SET_NAME':
            return{
                ...state,
                name: action.name
            }
        case 'SET_DESCRIPTION':
            return{
                ...state,
                description: action.description
            }
        default:
            return state
    }
}