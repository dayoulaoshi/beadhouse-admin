<template>
<div>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
    :key="theKey">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="id"
      label="id"
      width="120">
    </el-table-column>
    <el-table-column
      property="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      property="role"
      label="权限">
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="300">　　　
      <template slot-scope="scope">　　　　　　
        <el-button type="primary" @click="checkin_modify(scope.$index, scope.row)">修改</el-button>
        　　　　　　
        <el-button type="primary" @click="checkin_delete(scope.$index, scope.row)">删除</el-button>
        　　　　
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px;margin-left: 20px">
  </div>
  <el-dialog title="修改" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户id" :label-width="formLabelWidth">
        <el-input v-model="form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
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
      <el-form-item label="创建时间" :label-width="formLabelWidth">
        <el-input v-model="form.vreateTime" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限等级" :label-width="formLabelWidth">
        <el-input v-model="form.role" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit_form">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="删除" :visible.sync="dialogdeleteFormVisible">
    <el-form>
      <el-form-item label="确认删除？" :label-width="formLabelWidth">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogdeleteFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit_delete">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>



<script>
  import {Message} from 'element-ui';

  export default {
    data() {
      return {
        tableData: [],
        currentRow: null,
        formLabelWidth: '100px',
        form: {
          id: 1,
          username: "",
          role:"",
          email:"",
          phone:"",
          vreateTime:"",
          question: "",
          answer: "",
        },
        delete_form: {
          username: ''
        },
        dialogFormVisible: false,
        dialogdeleteFormVisible: false,
        theKey: 0
      }
    },
    mounted() {
      this.$axios.get('http://275w5p6964.wicp.vip/user/selectAll ')
        .then((res) => {
          let that = this
          console.log("sussess")
          let datalist = res.data
          if (datalist.status == 1) {
            alert("错误码1")
          } else {
            let len = datalist.data.length
            console.log(len)
            for (let i = 0; i < len; i++) {
              that.tableData.push(datalist.data[i])
            }
          }
        })
        .catch((err) => {
          alert("获取数据失败")
          console.log(err)
        })
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      checkin_modify(index, row) {
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
      },
      checkin_delete(index, row) {
        this.dialogdeleteFormVisible = true;
        this.delete_form = Object.assign({}, row);
      },
      submit_form() {
        let that = this
        this.$axios.post('/user/update_information.do', this.form)
          .then(function (response) {
            console.log(response);
            let data = response.data
              that.$message(data.msg);
              this.theKey++;
          })
          .catch(function (error) {
            console.log(error);
          });
        this.dialogFormVisible = false;
      },
      submit_delete() {
        let that = this
        let param = new URLSearchParams()
        param.append("username",this.delete_form.username)
        alert(this.delete_form.username)
        this.$axios.post('http://275w5p6964.wicp.vip/user/delete_user.do', param)
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

<style lang="scss" scoped>

</style>
