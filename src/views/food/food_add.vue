<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="食物名字">
      <el-input v-model="form.foodname"></el-input>
    </el-form-item>
    <el-form-item label="食物标签">
      <el-input v-model="form.label"></el-input>
    </el-form-item>
    <el-form-item label="食物价格">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="清真">
      <el-switch v-model="form.qingzhen"
                 :active-value="1"
                 :inactive-value="0"></el-switch>
    </el-form-item>
    <el-form-item label="供应日">
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
    <el-form-item label="早中晚">
      <el-select v-model="form.supplytype" placeholder="">
        <el-option label="一" value="1"></el-option>
        <el-option label="二" value="2"></el-option>
        <el-option label="三" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="食物组">
      <el-select v-model="form.foodgroup" placeholder="">
        <el-option label="类别一" value="类别1"></el-option>
        <el-option label="类别二" value="类别2"></el-option>
        <el-option label="类别三" value="类别3"></el-option>
        <el-option label="类别四" value="类别4"></el-option>
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
          foodname: '',
          label: '',
          price: '',
          qingzhen: '',
          supplydate: '',
          supplytype: '',
          foodgroup: ''
        }
      }
    },
    methods: {
      onSubmit() {
        let that = this

        let param = new URLSearchParams()
        param.append("foodname",this.form.foodname)
        param.append("label",this.form.label)
        param.append("price",this.form.price)
        param.append("qingzhen",this.form.qingzhen)
        param.append("supplydate",this.form.supplydate)
        param.append("supplytype",this.form.supplytype)
        param.append("foodgroup",this.form.foodgroup)

        this.$axios.post('http://327k0b5172.qicp.vip/FoodCalender/Insert', param)
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
