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
        property="huliid"
        label="护理id"
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="护理名字">
      </el-table-column>
      <el-table-column
        property="price"
        label="护理价格">
      </el-table-column>

      <el-table-column
        property="detail"
        label="护理细节">
      </el-table-column>
      <el-table-column
        property="price"
        label="价值">
      </el-table-column>
      <el-table-column
        property="status"
        label="状态">
      </el-table-column>
      <el-table-column
        property="hulilevel"
        label="等级">
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
        <el-form-item label="护理id" :label-width="formLabelWidth">
          <el-input v-model="form.huliid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="细节" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="附加值" :label-width="formLabelWidth">
          <el-input v-model="form.addedvalue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="等级" :label-width="formLabelWidth">
          <el-input v-model="form.hulilevel" autocomplete="off"></el-input>
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
          huliid: 1,
          name: "",
          price: '',
          detail: "",
          addedvalue:'',
          status: '',
          hulilevel: ''
        },
        delete_form: {
          huliid: ''
        },
        dialogFormVisible: false,
        dialogdeleteFormVisible: false,
        theKey: 0
      }
    },
    mounted() {
      this.$axios.get('http://327k0b5172.qicp.vip/HuLi/SelectAll')
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
        param.append("huliid",this.form.huliid)
        param.append("name",this.form.name)
        param.append("price",this.form.price)
        param.append("detail",this.form.detail)
        param.append("addedvalue",this.form.addedvalue)
        param.append("status",this.form.status)
        param.append("hulilevel",this.form.hulilevel)

        this.$axios.post('http://327k0b5172.qicp.vip/HuLi/UpdateByPrimaryKey', param)
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
        param.append("huliid",this.delete_form.huliid)

        this.$axios.post('http://327k0b5172.qicp.vip/HuLi/DeleteByPrimaryKey', param)
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

<style lang="scss" scoped>

</style>
