<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="权限">
      <el-select v-model="form.role" placeholder="">
        <el-option label="admin" value="1"></el-option>
        <el-option label="editor" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="问题" :label-width="formLabelWidth">
      <el-input v-model="form.question" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="回答" :label-width="formLabelWidth">
      <el-input v-model="form.answer" autocomplete="off"></el-input>
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
          username: '',
          password: '',
          role: '',
          email:'',
          phone:'',
          question:'',
          answer:'',
        },
        formLabelWidth:"80px"
      }
    },
    methods: {
      onSubmit() {
        let that = this
        let param = new URLSearchParams()

        param.append("username",this.form.username)
        param.append("password",this.form.password)
        param.append("role",this.form.role)
        param.append("email",this.form.email)
        param.append("phone",this.form.phone)
        param.append("question",this.form.question)
        param.append("answer",this.form.answer)

        this.$axios.post('http://275w5p6964.wicp.vip/user/register.do', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
              that.$message(data.data);
              this.theKey++;
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
