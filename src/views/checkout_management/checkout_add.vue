<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="理由">
      <el-input v-model="form.reason"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          reason:''
        }
      }
    },
    methods: {
      onSubmit() {
        let that = this
        let param = new URLSearchParams()
        param.append("username",this.form.name)
        param.append("reason",this.form.reason)
        this.$axios.post('http://275w5p6964.wicp.vip/ruzhu/manageTuizhu.do', param)
          .then(function (response) {
            console.log(response);
            let data = response.data

            if (data.status == 0) {
              that.$message('增加成功');
              this.theKey++;
            } else {
              that.$message('增加失败');
              this.theKey++;
            }

          })
          .catch(function (error) {
            console.log(error);
          });
        this.dialogdeleteFormVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>

