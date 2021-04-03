<template>
  <div>
    <h3>Statistics</h3>
    <el-row :gutter="30">
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-quanbu"></i>
          <p>
            共收集蜂蜜：
            <span>18g</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-18002"></i>
          <p>
            共生产蜂蜜：
            <span>18g</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-xiangmutongji"></i>
          <p>
            总转化率：
            <span>18%</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-shebei"></i>
          <p>
            蜜蜂总数量：
            <span>188</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-wodexuqiu"></i>
          <p>
            燃料60%：
            <span>18只</span>
          </p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="an-view-list">
          <i class="iconfont icon-icon1"></i>
          <p>
            状态60%：
            <span>188</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    async handelData() {
      let res = await API_BEES_STATIS();
      if (!res) return;
      console.log(res);
    }
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
