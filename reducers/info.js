let initState = {
    name: '',
    description:''
}
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
                description: state.description
            }
        default:
            return state
    }
}