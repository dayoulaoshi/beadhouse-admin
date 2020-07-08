<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="房间id">
      <el-input v-model="form.room_id"></el-input>
    </el-form-item>
    <el-form-item label="床位id">
      <el-input v-model="form.bed_id"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即删除</el-button>
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
            room_id: '',
            bed_id: '',
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style scoped>

</style>
