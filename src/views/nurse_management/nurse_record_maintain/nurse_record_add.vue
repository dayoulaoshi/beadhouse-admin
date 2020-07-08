<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="消费者id">
      <el-input v-model="form.customerId"></el-input>
    </el-form-item>
    <el-form-item label="护理id" :label-width="formLabelWidth">
      <el-input v-model="form.huliId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="使用者id" :label-width="formLabelWidth">
      <el-input v-model="form.userId" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="时间" :label-width="formLabelWidth">
      <el-input v-model="form.time" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" :label-width="formLabelWidth">
      <el-input v-model="form.content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="数量" :label-width="formLabelWidth">
      <el-input v-model="form.num" autocomplete="off"></el-input>
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
          huliRecordId:"" ,
          customerId:"" ,
          huliId:"" ,
          userId:"" ,
          time: "",
          content: "",
          num:"" ,
        },
        formLabelWidth:"80px"
      }
    },
    methods: {
      onSubmit() {
        let that = this

        let param = new URLSearchParams()
        param.append("customerId",this.form.customerId)
        param.append("huliId",this.form.huliId)
        param.append("userId",this.form.userId)
        param.append("time",this.form.time)
        param.append("content",this.form.content)
        param.append("num",this.form.num)

        this.$axios.post('http://327k0b5172.qicp.vip/HuLiRecord/Insert', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            that.$message(data.status);
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
