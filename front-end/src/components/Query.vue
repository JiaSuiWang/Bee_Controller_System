<template>
  <div class="an-table">
    <h3>Query conditions</h3>
    <el-form inline>
      <el-form-item label="fuel(< %)">
        <el-input v-model="fuel" type="number"/>
      </el-form-item>
      <el-form-item label="damage(> %)">
        <el-input v-model="damage" type="number"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">search</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">reset</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible=true">add</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="Add Bee"
        :visible.sync="dialogVisible"
        width="720px">
      <el-form label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="speed">
              <el-input v-model="params.speed" placeholder="please input"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="latitude">
              <el-input v-model="params.latitude" placeholder="please input"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="longitude">
              <el-input v-model="params.longitude" placeholder="please input"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="elevation">
              <el-input v-model="params.elevation" placeholder="please input"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="fuel">
              <el-input v-model="params.fuel" placeholder="please input"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="damage">
              <el-input v-model="params.damage" placeholder="please input"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addBee">Ok</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fuel: 100,
      damage: 0,
      params: {
        speed: 6.6,
        latitude: 42.741895,
        longitude: 73.989308,
        elevation: 50,
        fuel: 89,
        damage: 0,
        nectar: 20,
        honey: 13
      },
      dialogVisible: false
    };
  },
  methods: {
    addBee() {
      this.params.id = '021';
      this.$emit('add', this.params);
      this.dialogVisible = false;
    },
    search() {
      this.$emit('search', {
        fuel: this.fuel,
        damage: this.damage,
      });
    },
    reset() {
      this.$emit('reset');
    }
  }
};
</script>



