<template>
  <div>
    <van-pull-refresh class="content" v-model="isLoading" @refresh="onRefresh">
      <br>
      <br>

      <Logo></Logo>
      <div style="padding:10px 15px;text-align:center">
        <small>下拉Ajax请求试试😋</small>
      </div>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="plus演示" name="1">
          <van-cell-group>
            <van-cell @click="openGoodsDetail()" title="打开商品详情窗口" is-link />
            <van-cell @click="camera" title="拍照" is-link />
            <!-- <van-cell @click="plusMap" title="打开地图" is-link /> -->
            <van-cell @click="toast" title="原生Toast" is-link />
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item title="Vant组件演示 " name="2">
          <van-cell-group>
            <van-cell @click="openAS" title="Actionsheet" is-link />
            <van-cell @click="vantToast" title="Toast" is-link />
            <van-cell @click="vantDialog" title="Dialog" is-link />
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item title="Mui组件演示" name="3">
          <van-cell-group>
            <van-cell @click="openMui" title="Mui演示页" is-link />
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item title="vux组件演示" name="4">
          <van-cell-group>
            <van-cell @click="openVux" title="vux演示页" is-link />
          </van-cell-group>
        </van-collapse-item>

      </van-collapse>
      <br>
      <br>
      <br>
      <br>
      <br>
    </van-pull-refresh>
    <van-actionsheet v-model="show" cancel-text="取消" :actions="actions" />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">标签</van-tabbar-item>
      <van-tabbar-item icon="chat" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="records" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { openWebview } from "@/utils/webview";
import { request } from "@/utils/request";
import {
  Dialog,
  CellGroup,
  Toast,
  PullRefresh,
  Tabbar,
  TabbarItem,
  Cell,
  List,
  Actionsheet,
  NavBar,
  Tag,
  Collapse,
  CollapseItem
} from "vant";
import Logo from "./components/logo.vue";
export default {
  components: {
    Logo,
    [Dialog.name]: Dialog,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [PullRefresh.name]: PullRefresh,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Cell.name]: Cell,
    [List.name]: List,
    [Actionsheet.name]: Actionsheet,
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  created() {},
  data() {
    return {
      activeName: "1",
      count: 0,
      isLoading: false,
      active: 0,
      list: [],
      loading: false,
      finished: false,
      show: false,
      actions: [
        {
          name: "选项",
          callback: this.onClick
        },
        {
          name: "选项",
          subname: "描述信息"
        },
        {
          name: "选项",
          loading: true
        }
      ]
    };
  },

  methods: {
    openVux() {
      openWebview(
        {
          url: "./vux.index.html",
          id: "vux.index"
        },
        {
          bounce: "none"
        }
      );
    },
    openMui() {
      openWebview(
        {
          url: "./mui.index.html",
          id: "mui.index"
        },
        {
          bounce: "none"
        }
      );
    },
    camera() {
      var cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          plus.nativeUI.alert("成功：" + p);
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              // createItem(entry);
            },
            function(e) {
              console.log("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(e) {
          console.log("失败：" + e.message);
        },
        { filename: "_doc/camera/", index: 1 }
      );
    },
    plusMap() {
      openWebview(
        {
          url: "./map.map.html",
          id: "map.map"
        },
        {
          bounce: "none"
        }
      );
    },
    vantDialog() {
      Dialog.alert({
        title: "标题",
        message: "弹窗内容"
      }).then(() => {
        // on close
      });
    },
    vantToast() {
      Toast("我是提示文案，建议不超过十五字~");
    },
    toast() {
      plus.nativeUI.toast("Hier");
    },
    alert() {
      plus.nativeUI.alert("Hier");
    },
    onRefresh() {
      this.isLoading = true;
      request({
        url: DOUBANAPI + "/v2/book/search?q=javascript&count=2"
      })
        .then(res => {
          this.isLoading = false;
          plus.nativeUI.toast("Ajax请求成功");
          console.log(res);
        })
        .catch(err => {
          this.isLoading = false;
          console.error(err);
        });
    },
    openAS() {
      this.show = !this.show;
    },
    openGoodsDetail() {
      openWebview({
        url: "./goods.detail.html",
        id: "goods.detail"
      });
    }
  }
};
</script>

<style lang="less">
:global {
  body {
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
    font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
  }
}
</style>
