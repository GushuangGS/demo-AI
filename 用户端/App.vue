<script>
export default {
  onLaunch: function () {
    console.log('App Launch');
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
@import './static/font1.css';
@import './static/font2.css';

/*每个页面公共css */
body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: max(884px, 100dvh);
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
.bg-glass {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.status-orb {
  width: 8px;
  height: 8px;
  background-color: #0037b0;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 4px rgba(0, 55, 176, 0.15);
}
</style>
