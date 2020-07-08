<template>
  <el-form ref="form" :model="form" label-width="150px">
    <el-form-item label="膳食管理记录id">
      <el-input v-model="form.foodManagementId"></el-input>
    </el-form-item>
    <el-form-item label="食物id">
      <el-input v-model="form.foodid"></el-input>
    </el-form-item>
    <el-form-item label="顾客id">
      <el-input v-model="form.customerid"></el-input>
    </el-form-item>
    <el-form-item label="支持礼拜">
      <el-select v-model="form.supplydate" placeholder="">
        <el-option label="一" value="1"></el-option>
        <el-option label="二" value="2"></el-option>
        <el-option label="三" value="3"></el-option>
        <el-option label="四" value="4"></el-option>
        <el-option label="五" value="5"></el-option>
        <el-option label="六" value="6"></el-option>
        <el-option label="七" value="7"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="支持种类">
      <el-select v-model="form.supplytype" placeholder="">
        <el-option label="一" value="1"></el-option>
        <el-option label="二" value="2"></el-option>
        <el-option label="三" value="3"></el-option>
        <el-option label="四" value="4"></el-option>
      </el-select>
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
          foodManagementId: '',
          foodid: '',
          customerid: '',
          supplydate: '',
          supplytype: ''
        }
      }
    },
    methods: {
      onSubmit() {
        let that = this
        this.$axios.post('http://327k0b5172.qicp.vip/FoodManagement/Insert', this.form)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.code == 0) {
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
