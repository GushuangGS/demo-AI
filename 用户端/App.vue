<script>
export default {
  onLaunch: function () {
    console.log('App Launch');
    // 在微信小程序中，为了保证字体的稳定性，建议将字体下载到本地或上传到您的CDN服务器
    // uni.loadFontFace({
    //   family: 'Material Symbols Outlined',
    //   source:
    //     'url("https://fonts.gstatic.com/s/materialsymbolsoutlined/v190/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHGlclq.woff2")',
    //   success: console.log,
    //   fail: console.error,
    // });
    // uni.loadFontFace({
    //   family: 'Plus Jakarta Sans',
    //   source: 'url("https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaALWGmRQQQbZqWLLeEK_wA_2h2yA-tY.woff2")',
    //   success: console.log,
    //   fail: console.error,
    // });
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
};
</script>

<style>
/*每个页面公共css */
@import 'tailwind-input.css';
</style>
