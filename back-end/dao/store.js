const path = require('path');
const { cloneDeep } = require('lodash');
const { readFile, saveStringToFile } = require('../util/file-util');

const DB_PATH = path.join(__dirname, './bee.db.json');

let RAMCache = {};
class Store {
    constructor() {
        readFile(DB_PATH).then((data) => {
            try {
                RAMCache = JSON.parse(data);
            } catch (_) {
                RAMCache = {};
            }
        }).catch((_) => { })
    }

    async get() {
        return cloneDeep(RAMCache);
    }

    async set(data) {
        console.log(data);
        RAMCache = cloneDeep(data);
        await saveStringToFile(DB_PATH, JSON.stringify(RAMCache, null, 2));
    }

}

const store = new Store();
module.exports = { store };
