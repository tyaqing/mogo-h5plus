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
            <van-cell @click="openGoodsDetail()" title="预加载商品详情窗口" is-link />
            <van-cell @click="openCart()" title="打开购物车窗口" is-link />
            <van-cell @click="camera" title="拍照" is-link />
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
import {
  openWebview,
  openWebviewFast,
  preLoad,
  showWebviewById
} from "@/utils/webview";
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
  created() {
    window.addEventListener("customEvent", function(event) {
      //通过event.detail可获得传递过来的参数内容
      plus.nativeUI.toast("我是首页,我很慌,我收到了信息");
      console.log(event.detail);
    });
    function plusReady() {
      let ws = plus.webview.currentWebview();
      console.log(ws);
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }

    // 预加载一些窗口
    preLoad([
      {
        url: "./vux.index.html",
        id: "vux.index",
        title: "vux演示页"
      },
      {
        url: "./goods.detail.html",
        id: "goods.detail",
        title: "美国伽力果",
        extras: {
          id: 2018,
          name: "超级红苹果"
        }
      },
      {
        url: "./goods.cart.html",
        id: "goods.cart",
        title: "购物车",
        style: {
          titleNView: {
            backgroundColor: "#f7f7f7", // 导航栏背景色
            titleText: "购物车", // 导航栏标题
            titleColor: "#666", // 文字颜色
            // type: "transparent", // 透明渐变样式
            autoBackButton: true, // 自动绘制返回箭头
            splitLine: {
              // 底部分割线
              color: "#cccccc"
            }
          }
        }
      }
    ]);
  },
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
    // 使用预加载速度会很快,但是没法再次传值,只能通过页面之间的通讯完成传值,参考goods.detail页面中的fire
    openGoodsDetail() {
      showWebviewById("goods.detail");
    },
    openVux() {
      showWebviewById("vux.index");
    },
    openCart() {
      showWebviewById("goods.cart");
      // 重写了标题样式
      // openWebview(
      //   {
      //     url: "./goods.cart.html",
      //     id: "goods.cart"
      //   },
      //   {
      //     titleNView: {
      //       backgroundColor: "#f7f7f7", // 导航栏背景色
      //       titleText: "购物车", // 导航栏标题
      //       titleColor: "#666", // 文字颜色
      //       // type: "transparent", // 透明渐变样式
      //       autoBackButton: true, // 自动绘制返回箭头
      //       splitLine: {
      //         // 底部分割线
      //         color: "#cccccc"
      //       }
      //     }
      //   },
      //   {
      //     id: 2018,
      //     name: "超级红苹果"
      //   }
      // );
    },
    openMui() {
      openWebviewFast("./mui.index.html", "mui.index", "Mui演示");
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
