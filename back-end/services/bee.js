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
  const res = Object.keys(storeData).map(k => storeData[k]);
  return res;
};
