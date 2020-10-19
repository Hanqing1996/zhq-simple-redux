/**
 * 可以看成是 dispatch 的迭代：
 * 1. 规定新的 dispatch 内容
 * 2. 执行旧的 dispatch
 * @param store
 * @returns {function(*): function(...[*]=)}
 */
export default (store)=>(next)=>(action)=> {
    console.log(new Date())
    next(action)
}