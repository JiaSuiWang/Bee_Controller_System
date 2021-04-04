<template>
  <div>
    <h3>Statistics</h3>
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-quanbu"></i>
          <p>
            共收集蜂蜜：
            <span>{{ form.allNectar }}g</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-18002"></i>
          <p>
            共生产蜂蜜：
            <span>{{ form.allHoney }}g</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-xiangmutongji"></i>
          <p>
            总转化率：
            <span>{{ form.transformationRate }}</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-shebei"></i>
          <p>
            蜜蜂总数量：
            <span>{{ form.allNum }}</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-wodexuqiu"></i>
          <p>
            燃料>60%：
            <span>{{ form.sixtyNumFuel }}只</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-icon1"></i>
          <p>
            状态>60%：
            <span>{{ form.sixtyNumDamage }}只</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {beeApiStatictics} from "../api"
export default {
  data() {
    return {
      form : {
        allHoney: "",
        allNectar: "",
        transformationRate: "",
        allNum:"",
        sixtyNumFuel: "",
        sixtyNumDamage: "",
      }
    }
  },
  methods: {
    async handelData() {
      let res = await beeApiStatictics();
      if (!res) return;
      this.form = res.data;
    }
  },
  mounted() {
    let _this = this;
    this.handelData();
    setInterval(function() {
      _this.handelData()
    }, 5000)
  }
};
</script>

<style>
.an-view-list {
  height: 90px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-around;

}

.iconfont {
  font-size: 44px !important;
  margin-left: 20px;
}

p {
  text-align: right;
  padding-right: 20px;
  margin-bottom: 0;
  font-size: 12px;

}

span {
  font-weight: bold;
  font-size: 14px;
}
</style>
