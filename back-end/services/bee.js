const {store} = require('../dao/store');

module.exports.del = async function (dataId) {
  const storeData = await store.get();
  dataId.forEach((id) => {
    delete storeData[id];
  });
  await store.set(storeData);
  return true;
};

module.exports.add = async function (dataList) {
  await update(dataList);
  return true;
};

async function update(dataList) {
  const storeData = await store.get();
  dataList.forEach((data) => {
    if (data.id === undefined) return;
    storeData[data.id] = Object.assign({}, storeData[data.id], data);
  });
  await store.set(storeData);
  return true;
}
module.exports.update = update;

module.exports.getAll = async function () {
  const storeData = await store.get();
  
  for (let i in storeData) {
    storeData[i] = {
      ...storeData[i],
      latitude: Math.random() * 100,
      longitude: Math.random() * 30,
      elevation: Math.random() * 5,
      fuel: storeData[i].fuel < 0 ? 0 : storeData[i].fuel - 1,
      damage: storeData[i].damage > 100 ? 100 : storeData[i].damage + 1,
      nectar: storeData[i].nectar + 5,
      honey: storeData[i].honey + 2
    }
  }
//  await store.set(storeData);
console.log(storeData)
 const resultData = await store.get()
 const res = Object.keys(resultData).map(k => resultData[k]);
  // res.forEach(data => {
  //   storeData[data.id] = Object.assign({}, storeData[data.id], {
  //       ...data,
  //       latitude: Math.random() * 100,
  //       longitude: Math.random() * 30,
  //       elevation: Math.random() * 5,
  //       fuel: data.fuel < 0 ? 0 : data.fuel - 1,
  //       damage: data.damage > 100 ? 100 : data.damage + 1,
  //       nectar: data.nectar + 5,
  //       honey: data.honey + 2
  //   });
  // });
  // await store.set(storeData);
  return res;
};
