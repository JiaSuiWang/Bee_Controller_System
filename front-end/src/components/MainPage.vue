<template>
  <div>
    <div class="an-table">
      <StatisticsVue></StatisticsVue>
    </div>

    <div class="an-table">
      <Query @add="addBee" @search="updateTableDataBySearch" @reset="getAllTableData"></Query>
    </div>

    <div class="an-table">
      <Represent :tableData="tableData" @updateTableData="getAllTableData" @update="updateBee"></Represent>
    </div>
  </div>
</template>

<script>
import StatisticsVue from './Statistics.vue';
import Query from './Query.vue';
import Represent from './Represent.vue';
import {beeApiGetAll, beeApiAdd, beeApiUpdate} from '../api';

export default {
  components: {
    StatisticsVue,
    Query,
    Represent
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getAllTableData();
  },
  methods: {
    async getAllTableData() {
      const res = await beeApiGetAll();
      this.tableData = res.data;
    },
    async addBee(params) {
      const request = {
        dataList: [params]
      };
      const res = await beeApiAdd(request);
      if (res.status === 0) {
        this.tableData.push(params);
      }
    },
    async updateTableDataBySearch(searchValue) {
      const res = await beeApiGetAll();
      this.tableData = res.data.filter((data) => {
        if (data.fuel < searchValue.fuel && data.damage >= searchValue.damage) {
          return true;
        }
        return false;
      });
    },
    async updateBee(beeObj){
      const request = {
        updateList: [
            beeObj
        ]
      }
      await beeApiUpdate(request);
      await this.getAllTableData();
    }
  }
};
</script>


<style>
.an-table {
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  margin: 20px;
}
</style>
