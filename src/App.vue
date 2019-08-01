<template>
  <div id='app'>
    <copyRightBar mailAddress='leichl@mallcai.com' label= '测试工厂' />
    <router-view/>
  </div>
</template>

<script>
  import copyRightBar from '@/components/copyRightBar'

export default {
  name: 'App',
   components: {copyRightBar}
  // beforeCreate() {
  //   if (!this.$utils.isChrome()){
  //     this.$notify.warning({
  //       title:'建议使用Chrome浏览器以获取最佳体验',
  //       duration:10
  //     });
  //   }
  //   this.$AuthStatus.doQuerySearchUserInfo()
  //     .then(userInfo => {
  //       const {userName} = userInfo;
  //       if (!userName) window.location.href = 'http://sso.caicaivip.com/login?service=' + this.$AuthStatus.proxyAddress;
  //       this.$eventBus.$emit('updateUserInfo', userName)
  //     })
  //     .catch(_ => {
  //       window.location.href = 'http://sso.caicaivip.com/login?service=' + this.$AuthStatus.proxyAddress;
  //     })
  // },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%
}
</style>
