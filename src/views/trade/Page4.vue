<template>
  <div class = "app">
    <el-form ref="form" :model="form" label-width="80px"  class="form-container" :rules="formRule">
    <el-form-item label="手机号码" prop="phone" >
      <el-input v-model="phone" placeholder="输入手机号码" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item class="btn_boxes">
      <el-button type="primary" @click="submit">立即查询</el-button>
      <el-button @click="cancelForm">取消</el-button>
    </el-form-item>
    <br><p>查询结果如下</p><br>
      <div align="left">
    <json-view :value="res" expand-depth="2" theme="jv-light" copyable="true"></json-view>
      </div>
    </el-form>
  </div>
</template>

  <script>
    import {queryOrder}  from '../../api/api'
    import jsonView from 'vue-json-viewer'

    export default {
      components: {
        jsonView
      },
      data() {
        return {
          res:'刮奖区 ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇',
          phone: '',
          formRule:{
            name:[
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在11个字符', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        submit() {
          console.log('开始调用');
          let formData = new FormData();
          formData.append('phone', this.phone);
          queryOrder(formData).then((response)=>{
            var code = response.data.code;
            this.code = code;
            console.log(this.code);
            var res = response.data;
            this.res = JSON.parse(JSON.stringify(res));
            if (code == 0) {
              this.$notify({
                  title: '成功',
                  message: '查询成功',
                  type: 'success'
                });
            }
          })
        },
        cancelForm() {
          this.$refs['form'].resetFields()
        }
      }
    }

  </script>
<style>
  .form-container{
    width: 50%;
    min-width: 350px;
    margin:50px;
  }
.app h1{
    margin-bottom: 20px;
}
.app p{
    display: inline-block
}
.app h2{
    display: inline-block
}
.btn_boxes{
    display: inline-block
}
</style>
