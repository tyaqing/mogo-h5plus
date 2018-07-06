<template>
  <div>
          <img width="60%" :src="img" alt="">

    <br>
    <h4 style="text-align:center">Mui</h4>
    <p style="text-align:center;padding:10px 20px">这里主要演示MUI的一些样式和JS,我仍然推荐您使用其他vueUI(Vux,Vant,mint)来代替mui</p>
    <br> &nbsp;
    <button @click="alert" type="button" class="mui-btn">alert</button>
    <button @click="toast" type="button" class="mui-btn mui-btn-primary">toast</button>
    <br><br>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>用户名</label>
        <input type="text" class="mui-input-clear" placeholder="请输入用户名">
      </div>
      <div class="mui-input-row">
        <label>密码</label>
        <input type="password" class="mui-input-password" placeholder="请输入密码">
      </div>
      <div class="mui-button-row">
        <button type="button" class="mui-btn mui-btn-primary">确认</button>
        <button type="button" class="mui-btn mui-btn-danger">取消</button>
      </div>
    </form>
    <br><br>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-collapse">
        <a class="mui-navigate-right" href="#">面板1</a>
        <div class="mui-collapse-content">
          <p>面板1子内容</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require("@/assets/logo.png")
    };
  },
  methods: {
    alert() {
      mui.alert("Mogo H5+");
    },
    toast() {
      mui.toast("嘿嘿,有问题issue哦");
    }
  }
};
</script>

<style lang="less">
@import "../../assets/mui/mui.css";
</style>
