const Router = require('koa-router');
const requireDirectory = require('require-directory');
const parser = require('koa-bodyparser');

//当前项目启动的路径，即main.js的路径
const currentPrjPath = process.cwd();

class InitManager {
    static initCore(app) {
        // 入口方法
        InitManager.app = app;
        InitManager.initLoadKoaBodyParser();
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadConfig();
    }

    //注册获取post请求body参数的中间件
    static initLoadKoaBodyParser() {
        InitManager.app.use(parser());
    }

    // 加载全部路由
    static initLoadRouters() {
        // 绝对路径
        const apiDirectory = `${currentPrjPath}/controller`;
        // 路由自动加载
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        });
        // 判断 requireDirectory 加载的模块是否为路由
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    //加载配置文件信息
    static loadConfig(path = '') {
        const configPath = path || currentPrjPath + '/config';
        global.config = require(configPath)
    }

    static loadHttpException() {
        global.errs = require('./http-exception')
    }
}

module.exports = InitManager;
