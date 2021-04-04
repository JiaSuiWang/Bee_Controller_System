<template>
  <div class="an-table">
    <h3>Lists of Bees</h3>
    <el-table
        :data="tableData" border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="id">
      </el-table-column>
      <el-table-column
          prop="speed"
          label="speed">
      </el-table-column>

      <el-table-column
          prop="latitude"
          label="latitude">
      </el-table-column>

      <el-table-column
          prop="longitude"
          label="longitude"
          width="90">
      </el-table-column>

      <el-table-column
          prop="elevation"
          label="elevation"
          width="86">
      </el-table-column>

      <el-table-column
          prop="fuel"
          label="fuel(%)"
          width="76">
      </el-table-column>

      <el-table-column
          prop="damage"
          label="damage(%)"
          width="100">
      </el-table-column>

      <el-table-column
          prop="nectar"
          label="nectar"
          width="70">

      </el-table-column>

      <el-table-column
          prop="honey"
          label="honey"
          width="70"
      >
      </el-table-column>
      <el-table-column
          prop="transformationRate"
          label="transformation rate"
          width="160">
          <template slot-scope="scope">
            <span>{{ (scope.row.honey / scope.row.nectar).toFixed(2) }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="action" label="action" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small">del</el-button>
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
        small
        layout="prev, pager, next"
        :total="50">
    </el-pagination> -->

    <el-dialog
        title="Update Bee Fuel & Damage"
        :visible.sync="dialogVisible"
        width="720px">
      <el-form label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="fuel(%)">
              <el-input v-model="params.fuel" placeholder="please input"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="damage(%)">
              <el-input v-model="params.damage" placeholder="please input"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="update">Ok</el-button>
      </span>
    </el-dialog>
  </div>

</template>


<script>
import {beeApiDelete} from '../api';

export default {
  props: {
    tableData: Array,
  },
  data() {
    return {
      params: {},
      dialogVisible: false,
    };
  },
  methods: {
    async handleDelete(row) {
      await beeApiDelete(row.id);
      this.$emit('updateTableData');
    },
    async handleUpdate(row) {
      this.dialogVisible = true;
      this.params = {...row};
    },
    async update() {
      this.$emit('update', this.params);
      this.dialogVisible = false;
    }
  }
};
</script>
