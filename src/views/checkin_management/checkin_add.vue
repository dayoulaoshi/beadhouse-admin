<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="房间id">
      <el-input v-model="form.room_id"></el-input>
    </el-form-item>
    <el-form-item label="床位id">
      <el-input v-model="form.bed_id"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.age"></el-input>
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
          bed_id:'',
          room_id:'',
          age:''
        }
      }
    },
    methods: {
      onSubmit() {
        let that = this
        let param = new URLSearchParams()
        param.append("bed_id",this.form.bed_id)
        param.append("room_id",this.form.room_id)
        param.append("username",this.form.username)
        param.append("age",this.form.age)

        this.$axios.post('http://275w5p6964.wicp.vip/ruzhu/addRuzhu.do', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.status == 0) {
              that.$message('增加成功');

            } else {
              that.$message('增加失败');

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
