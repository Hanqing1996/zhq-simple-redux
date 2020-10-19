export default (next)=>(action)=> {
    console.log(new Date())
    next(action)
}