const Router = require('koa-router');
const service = require('../services/bee');
const {ParameterException} = require('../core/http-exception');

const router = new Router({
  prefix: '/api/v1/bee'
});

/**
 * url: http://localhost:10086/api/v1/bee/add
 * method: post
 * request: {
    dataList:[
      {
        id: "007",
        speed: 6.5,
        latitude: 40.741895,
        longitude: -73.989308,
        elevation: 50,
        fuel: 89,
        damage: 0,
        nectar: 20,
        honey: 8,
      },
      ...
    ]
 * },
 * response: {
 *  status: 0,
 *  msg: 'ok',
 *  data: {}
 * }
 */
router.post('/add', async (ctx, next) => {
  const req = ctx.request;
  if (req.body === undefined || req.body.dataList === undefined) {
    throw new ParameterException();
  }
  await service.add(req.body.dataList);
  ctx.body = {
    status: 0,
    msg: 'ok',
    data: {},
  };
  await next();
});

/**
 * url: http://localhost:10086/api/v1/bee/del
 * method: delete
 * request: {
    delIdList:[
      { id: "007" },
      { id: "008" },
      ...
    ]
 * },
 * response: {
 *  status: 0,
 *  msg: 'ok',
 *  data: {}
 * }
 */
router.delete('/del', async (ctx, next) => {
  const req = ctx.request;
  if (req.body === undefined || req.body.delIdList === undefined) {
    throw new ParameterException();
  }
  await service.del(req.body.delIdList);
  ctx.body = {
    status: 0,
    msg: 'ok',
    data: {},
  };
  await next();
});

/**
 * http://localhost:10086/api/v1/bee/update
 * method: put
 * request: {
    updateList:[
      {
        id: "007",
        speed: 6.5, //速度
        latitude: 40.741895, //纬度
        longitude: -73.989308, //经度
        elevation: 50, //海拔
        fuel: 89, //燃料 %
        damage: 0, // 损耗 %
        nectar: 20, //g 采蜜
        honey: 8, //g 蜂蜜
      },
      ...
    ]
 * },
 * response: {
 *  status: 0,
 *  msg: 'ok',
 *  data: {}
 * }
 */
router.put('/update', async (ctx, next) => {
  const req = ctx.request;
  if (req.body === undefined || req.body.updateList === undefined) {
    throw new ParameterException();
  }
  await service.update(req.body.updateList);
  ctx.body = {
    status: 0,
    msg: 'ok',
    data: {},
  };
  await next();
});

/**
 * url: http://localhost:10086/api/v1/bee/all
 * method: get
 * request: {},
 * response: {
 *  status: 0,
 *  msg: 'ok',
 *  data: [
     {
        id: "007",
        speed: 6.5, //速度
        latitude: 40.741895, //纬度
        longitude: -73.989308, //经度
        elevation: 50, //海拔
        fuel: 89, //燃料 %
        damage: 0, // 损耗 %
        nectar: 20, //g 采蜜
        honey: 8, //g 蜂蜜
     },
     ...
 *  ]
 * }
 */
router.get('/all', async (ctx, next) => {
  const data = await service.getAll();
  ctx.body = {
    status: 0,
    msg: 'ok',
    data
  };
  await next();
});

router.get('/statistics', async (ctx, next) => {
  const data = await service.getAll();
  const allNectar = data.reduce((pre, cur) => {
    return pre + cur.nectar
  }, 0)
  const allHoney = data.reduce((pre, cur) => {
    return pre + cur.honey
  }, 0)

  ctx.body = {
    status: 0,
    msg: 'ok',
    data: {
    allNectar: allNectar, 
    allHoney:allHoney,
    transformationRate: (allHoney / allNectar).toFixed(2),
    allNum:data.length,
    sixtyNumFuel: data.filter(v => v.fuel > 60).length,
    sixtyNumDamage: data.filter(v => v.damage > 60).length,
    }
  };
  await next();
});
module.exports = router;
