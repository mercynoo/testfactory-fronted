<template>
  <Row type='flex' justify='center'>
    <Col span='24' class='copyRight neverSelect'>
      <p>Copyright © <a :href='mailLink' class='mailLink'>{{label}}</a></p>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: 'copyRightBar',
    props: ['mailAddress', 'label'],
    data() {
      return {
        mailLink: `mailto:${this.mailAddress}`,
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/less'>
  .copyRight {
    position: fixed !important;
    bottom: 0 !important;
    padding-bottom: 8px !important;
    font-size: 12px !important;
    text-align: center !important;
    color: #999 !important;
    background: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255)) !important;;

    .mailLink {
      color: #999 !important;

      &:hover {
        text-decoration: underline;
        color: #1c3e7b !important;
      }
    }
  }
</style>
