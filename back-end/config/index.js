module.exports = {
    PORT: 10086,
    HOST: '0.0.0.0',
    env: process.env.NODE_ENV,
    database: {
        dbName: 'bee',
        host: 'localhost',
        port: 3306,
        //todo: 这里仅为方便测试，后期部署时需要修改
        user: 'root',
        //todo: 这里仅为方便测试，后期部署时需要将密码存储于配置服务
        password: 'password'
    },
}
