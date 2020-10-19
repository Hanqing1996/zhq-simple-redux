export default function addMiddlewares(store,...middlewares) {
    
    const {dispatch}=store
    
    let next
    middlewares.reverse().map(middleware=>{
        next=next||dispatch
        next=middleware(store)(next)
    })

    store.dispatch=next

    return store
}