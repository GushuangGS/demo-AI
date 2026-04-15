"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const services = [
      {
        title: "帮我买",
        descTop: "餐饮、生鲜、药品",
        descBottom: "30分钟送达",
        icon: "shopping_bag",
        bgIcon: "shopping_cart",
        cardClass: "service-card-buy",
        iconClass: "service-icon-buy",
        highlight: false
      },
      {
        title: "帮我送",
        descTop: "急件、鲜花、蛋糕",
        descBottom: "全城专人直送",
        icon: "local_shipping",
        bgIcon: "package_2",
        cardClass: "service-card-send",
        iconClass: "service-icon-send",
        highlight: false
      },
      {
        title: "帮我办",
        descTop: "排队、挂号、代取",
        descBottom: "节省您的每一分钟",
        icon: "assignment",
        bgIcon: "task",
        cardClass: "service-card-do",
        iconClass: "service-icon-do",
        highlight: false
      },
      {
        title: "万能帮",
        descTop: "各种个性化需求",
        descBottom: "只有想不到，没有做不到",
        icon: "auto_awesome",
        bgIcon: "magic_button",
        cardClass: "service-card-all",
        iconClass: "service-icon-all",
        highlight: true
      }
    ];
    const orderTags = ["手机数码", "文件合同", "钥匙配饰", "+ 自定义物品"];
    const couriers = [
      {
        name: "王师傅",
        score: "4.9",
        meta: "距您 500m | 已送 2.4k 单",
        tags: ["准时达", "好评高"],
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9s1Q218GYts49tw3dJdDAKx_WFhr3j0PrdPyFp6BytJmk3GosTQJpd1I2l_-gBm_BXSqXp-zlt8WBBI95tZqlW4-o7aEPnjqRhwkjAO0wTeH44IkWPK8NsQd1bYaCfMns92TCbuCVSbdCrrHcdO6Kr9KmY8CiI55DooLTNPTb1PX2bPSCblUp2JydgsELXMspLNj4_n9pdLbWaP3N1TbbyeFCeQ0MOvkMhm8fH3hF6chby3u4bWP4zur-kKg5qi9wWS56QAAOtis"
      },
      {
        name: "李师傅",
        score: "4.8",
        meta: "距您 1.2km | 已送 1.8k 单",
        tags: ["熟悉路线", "服务周到"],
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuApwY8seJM0qJvyBT-hjf1syEYderUuCTXD90H_cqEizaCs0kuv7UU4cF3YF1ltllN5ttjClcNLcrF-mjAav9Z-vE5Sg7HFUOrOK2KXrYp7b7O5h3hh2ZnAK_Nu8XM4VADohpQQzvOusL0q94tx9hO75CAEfyCIxSGVZP0LEriUl-nHWRRIl05Vucd1obVeQyZUgPWU94RMCiSXsikDiPwQoAbD0ACZzKW7uxfmMyENYJuOg2s35dZvUxmKtvDfsT7wS-0syMZ2XRE"
      },
      {
        name: "赵师傅",
        score: "5.0",
        meta: "距您 2.1km | 已送 3.2k 单",
        tags: ["金牌服务"],
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2uBZreSE4H06taWABfExdDNB8CD8dsOLHAtTKT8L7gtoqGub5jNm7PmBbPMrSbja2mTWbNtA_m8FT-IG8krCDpg0iEBZ9Fqzsh_0Vt2ICzO1VqBiDwE0PDzHEszjJwXrmei8X6jE6Acv7FdI7wRkElMrEORq9xvSboaX7tk02-ZmmN5aHRA09POGDf-qgklynI-rsEyig0lLD28Cwg9rIyH2-RIY6EWcc1w7_tEPRynyU6_zhgkwMM9TBNDTnYj92ZGTSFZevdSE"
      }
    ];
    common_vendor.onMounted(() => {
      common_vendor.index.hideTabBar();
    });
    const switchTab = (url) => {
      common_vendor.index.switchTab({ url });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(services, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.n(item.iconClass),
            c: common_vendor.t(item.title),
            d: item.highlight ? 1 : "",
            e: common_vendor.t(item.descTop),
            f: item.highlight ? 1 : "",
            g: common_vendor.t(item.descBottom),
            h: item.highlight ? 1 : "",
            i: common_vendor.t(item.bgIcon),
            j: item.highlight ? 1 : "",
            k: item.title,
            l: common_vendor.n(item.cardClass)
          };
        }),
        b: common_vendor.f(orderTags, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        c: common_vendor.f(couriers, (courier, k0, i0) => {
          return {
            a: courier.avatar,
            b: common_vendor.t(courier.name),
            c: common_vendor.t(courier.score),
            d: common_vendor.t(courier.meta),
            e: common_vendor.f(courier.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            f: courier.name
          };
        }),
        d: common_vendor.o(($event) => switchTab("/pages/index/index")),
        e: common_vendor.o(($event) => switchTab("/pages/order/order")),
        f: common_vendor.o(($event) => switchTab("/pages/mine/mine"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
