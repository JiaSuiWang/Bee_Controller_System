const Koa = require('koa');

const InitManager = require('./core/init');
const {PORT, HOST} = require('./config/index.js');
const catchError = require('./middlewares/exception.js');

const app = new Koa();

app.use(catchError);
InitManager.initCore(app);

app.listen(PORT, HOST, () => {
    console.debug(`Your App is Runing Here: http://localhost:${PORT}`);
});