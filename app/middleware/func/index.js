import * as db_func from './db'

export default () => {
    const func = Object.assign({},db_func)
    return async (ctx,next) => {
        for (let v in func) {
            if(func.hasOwnProperty(v))
                ctx[v] = func[v];
        }
        await next()
    }
}