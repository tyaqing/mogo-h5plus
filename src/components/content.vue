<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
 
<script>
import Vue from "vue";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 15px;
}
</style>
