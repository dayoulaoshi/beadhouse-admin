<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名字">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price"></el-input>
    </el-form-item>
    <el-form-item label="细节" :label-width="formLabelWidth">
      <el-input v-model="form.detail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="附加项" :label-width="formLabelWidth">
      <el-select v-model="form.addedvalue" placeholder="是/否">
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态" :label-width="formLabelWidth">
      <el-select v-model="form.status" placeholder="">
        <el-option label="可用" value="1"></el-option>
        <el-option label="不可用" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="护理等级" :label-width="formLabelWidth">
      <el-select v-model="form.hulilevel" placeholder="">
        <el-option label="等级一" value="1"></el-option>
        <el-option label="等级二" value="2"></el-option>
        <el-option label="等级三" value="3"></el-option>
        <el-option label="等级四" value="4"></el-option>
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
          name: "",
          price: '',
          detail: "",
          addedvalue:'',
          status: '',
          hulilevel: ''
        },
        formLabelWidth:"80px"
      }
    },
    methods: {
      onSubmit() {
        let that = this

        let param = new URLSearchParams()
        param.append("name",this.form.name)
        param.append("price",this.form.price)
        param.append("detail",this.form.detail)
        param.append("addedvalue",this.form.addedvalue)
        param.append("status",this.form.status)
        param.append("hulilevel",this.form.hulilevel)

        alert(this.form.addedvalue)

        this.$axios.post('http://327k0b5172.qicp.vip/HuLi/Insert', param)
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
