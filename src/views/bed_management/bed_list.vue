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
        property="roomId"
        label="房间id"
        width="120">
      </el-table-column>
      <el-table-column
        property="bedId"
        label="床位id"
        width="120">
      </el-table-column>
      <el-table-column
        property="state"
        label="状态">
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
        <el-form-item label="床位id" :label-width="formLabelWidth">
          <el-input v-model="form.bedId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" autocomplete="off"></el-input>
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
          id:'',
          bedId: '',
          roomId: '',
          state: '',
        },
        delete_form: {
          id:'',
          bedId: '',
          roomId: '',
          state: '',
        },
        dialogFormVisible: false,
        dialogdeleteFormVisible: false,
        theKey: 0
      }
    },
    mounted() {
      this.$axios.get('http://275w5p6964.wicp.vip/chuangwei/selectAll.do')
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
              console.log(datalist.data[i])
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

        let param = new URLSearchParams()

        param.append("bed_id",this.form.bedId)
        param.append("status",this.form.state)

        this.$axios.post('http://275w5p6964.wicp.vip/chuangwei/changeChuangwei.do', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.status == 0) {
              that.$message('修改成功');
              this.theKey++;
            } else {
              that.$message('修改失败');
              this.theKey++;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.dialogFormVisible = false;
      },
      submit_delete() {
        let that = this
        let param = new URLSearchParams()
        param.append("bed_id",this.delete_form.bedId)
        this.$axios.post('http://275w5p6964.wicp.vip/chuangwei/deleteChuangwei.do', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.status == 0) {
              that.$message('删除床位成功');
              this.theKey++;
            } else {
              that.$message('删除床位失败');
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

<style lang="scss" scoped>

</style>
