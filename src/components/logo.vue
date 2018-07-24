<template>
  <div>
    <div style="text-align:center">
      <img width="60%" src="@/assets/logo.png" alt="">
    </div>
    <van-tag mark type="success">{{info.version}}</van-tag>

  </div>

</template>
<script>
import Vue from "vue";
import { Tag } from "vant";

import { getProperty } from "../utils/plus/runtime.js";
Vue.use(Tag);

export default {
  data() {
    return {
      info: "0"
    };
  },
  created() {
    getProperty().then(info => {
      // console
      this.info = info;
    });
  }
};
</script>
