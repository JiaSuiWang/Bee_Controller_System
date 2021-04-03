
const { HttpException } = require('../core/http-exception');

/**
 * 捕获全局异常信息的中间件
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
const catchError = async (ctx, next) => {
    try {
        const { url, method, body } = ctx.request;
        const now = new Date();
        console.log(`${now.toLocaleString()}.${now.getMilliseconds()}`, { url, method, body });
        await next();
    } catch (error) {
        const isHttpException = error instanceof HttpException;
        const isDev = global.config.env === 'development';
        // 生产环境
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                errorCode: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = error.code

        } else {
            ctx.body = {
                msg: 'we made a mistake O(n_n)O~~',
                errorCode: 999,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = 500;
        }

        // 开发环境需要将异常抛出到服务端
        if (isDev && !isHttpException) {
            console.log(error);
        }
    }
};

module.exports = catchError;
