<template>

  <div>

    <div id="map" ref="map"></div>
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
window.onload = function() {
  new plus.maps.Map("map");
};
</script>

<style lang="less" >
body {
  margin: 0;
}

#map {
  width: 100%;
  // height: 210px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  /*line-height: 200px;*/
  text-align: center;
}
</style>