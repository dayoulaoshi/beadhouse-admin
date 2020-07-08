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
        property="huliRecordId"
        label="护理记录id"
        width="120">
      </el-table-column>
      <el-table-column
        property="customerId"
        label="顾客id"
        width="120">
      </el-table-column>
      <el-table-column
        property="huliId"
        label="护理id">
      </el-table-column>
      <el-table-column
        property="userId"
        label="使用者id">
      </el-table-column>
      <el-table-column
        property="time"
        label="时间">
      </el-table-column>
      <el-table-column
        property="num"
        label="数量">
      </el-table-column>
      <el-table-column
        property="customerName"
        label="消费者名字">
      </el-table-column>
      <el-table-column
        property="userName"
        label="使用者名字">
      </el-table-column>
      <el-table-column
        property="huliName"
        label="护理项目名字">
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
        <el-form-item label="护理记录id" :label-width="formLabelWidth">
          <el-input v-model="form.huliRecordId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="消费者id" :label-width="formLabelWidth">
          <el-input v-model="form.customerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="护理id" :label-width="formLabelWidth">
          <el-input v-model="form.huliId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用者id" :label-width="formLabelWidth">
          <el-input v-model="form.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用日期" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
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
          huliRecordId:"" ,
          customerId:"" ,
          huliId:"" ,
          userId:"" ,
          time: "",
          content: "",
          num:"" ,
          customerName: "",
          userName: "",
          huliName: ""
        },
        delete_form: {
          huliRecordId: ''
        },
        dialogFormVisible: false,
        dialogdeleteFormVisible: false,
        theKey: 0
      }
    },
    mounted() {
      this.$axios.post('http://327k0b5172.qicp.vip/HuLiRecord/SelectAllWithNames')
        .then((res) => {
          let that = this
          console.log("sussess")
          let datalist = res.data
          if (datalist.status == 1) {
            alert("错误码1")
          } else {
            let len = datalist.length
            console.log(len)
            for (let i = 0; i < len; i++) {
              that.tableData.push(datalist[i])
            }
            console.log(datalist[0])
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

        let param = new URLSearchParams()
        param.append("huliRecordId",this.form.huliRecordId)
        param.append("customerId",this.form.customerId)
        param.append("huliId",this.form.huliId)
        param.append("userId",this.form.userId)
        param.append("time",this.form.time)
        param.append("content",this.form.content)
        param.append("num",this.form.num)

        alert(this.form.time)

        this.$axios.post('http://327k0b5172.qicp.vip/HuLiRecord/Update', param)
          .then(function (response) {
            console.log(response);
            let data = response.data

              that.$message(data.status);

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
        param.append("huliRecordId",this.delete_form.huliRecordId)
        this.$axios.post('http://327k0b5172.qicp.vip/HuLiRecord/DeleteByPrimaryKey', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
              that.$message(data.status);

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
