<template>
  <Row type='flex' justify='space-between' class='neverChoose'>

    <Col class='headerTitle'>
      <span class='appLogo'><Icon type='ios-analytics'/></span>
      <span class='appTitle' @click=''>{{appHeaderTitle}}</span>
      <span class='subTitle'>version - {{version}}</span>
    </Col>

    <Col class="headerUser" v-show='userName'>
      <Dropdown trigger='click' :transfer='true' @on-click=''>
        <Icon class='userAccountLogo' type='md-contact'/>
        <a href='javascript:void(0)'><span class='userAccountName'>{{userName}}</span></a>
        <DropdownMenu slot='list'>
          <DropdownItem disabled>用户信息</DropdownItem>
          <DropdownItem name='logout' disabled>登出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Col>
  </Row>
</template>

<script>
  export default {
    name: "appHeader",
    data() {
      return {
        appHeaderTitle: 'testfactory',
        version: '0.1',
        userName: 'leicl'
      }
    },
    mounted() {
      this.$eventBus.$on('updateUserInfo', uName => this.userName = uName);
    },
  }
</script>

<style rel="stylesheet/less" lang="scss" scoped>
  .headerTitle {
    .appLogo {
      color: #83e4ff;
      font-size: 32px;
      margin-left: -36px;
    }

    .appTitle {
      color: white;
      font-size: 26px;
      padding-left: 5px;
    }

    .subTitle {
      color: #ccc;
      font-size: 14px;
      margin-left: 8px;
      margin-top: 5px;
    }
  }

  .headerUser {
    margin-left: -5%;
    line-height: 60px;

    .userAccountLogo {
      color: white;
      font-size: 26px;
      margin: -3px 5px 0 0;
    }

    .userAccountName {
      color: white;
      font-size: 18px;
      margin-right: 16px;
    }
  }
</style>
