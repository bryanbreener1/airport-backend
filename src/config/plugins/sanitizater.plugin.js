import sanitizater from "perfect-express-sanitizer";


export const sanitizaterClean = () =>{
    return sanitizater.clean({
        xss: true,
        noSql: true,
        sql: false //no poner a true, si esta en true no podras recibir data en FormData(assets)
    })
}