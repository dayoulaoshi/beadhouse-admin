<template>
  <el-form ref="form" :model="form" label-width="150px" style="margin-top: 50px">
    <el-form-item label="房间id">
      <el-input v-model="form.room_id"></el-input>
    </el-form-item>
    <el-form-item label="床id">
      <el-input v-model="form.bed_id"></el-input>
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
          room_id:'',
          bed_id:''
        }
      }
    },
    methods: {
      onSubmit() {
        let that = this
        let param = new URLSearchParams()
        param.append("bed_id",this.form.bed_id)
        param.append("room_id",this.form.room_id)
        this.$axios.post('http://275w5p6964.wicp.vip/chuangwei/addChuangwei.do', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.status == 0) {
              that.$message(data.data);
              this.theKey++;
            } else {
              that.$message(data.data);
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
