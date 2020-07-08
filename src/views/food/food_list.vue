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
        property="foodid"
        label="食物id"
        width="120">
      </el-table-column>
      <el-table-column
        property="foodname"
        label="食物名字"
        width="120">
      </el-table-column>
      <el-table-column
        property="label"
        label="食物标签">
      </el-table-column>
      <el-table-column
        property="price"
        label="价格">
      </el-table-column>
      <el-table-column
        property="qingzhen"
        label="清真">
      </el-table-column>
      <el-table-column
        property="supplydate"
        label="支持日期">
      </el-table-column>
      <el-table-column
        property="supplytype"
        label="支持种类">
      </el-table-column>
      <el-table-column
        property="foodgroup"
        label="食物类别">
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
        <el-form-item label="食物id" :label-width="formLabelWidth">
          <el-input v-model="form.foodid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食物名字" :label-width="formLabelWidth">
          <el-input v-model="form.foodname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食物标签" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食物价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否清真" :label-width="formLabelWidth">
          <el-input v-model="form.qingzhen" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应日期" :label-width="formLabelWidth">
          <el-input v-model="form.supplydate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="早中晚" :label-width="formLabelWidth">
          <el-input v-model="form.supplytype" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食物组" :label-width="formLabelWidth">
          <el-input v-model="form.foodgroup" autocomplete="off"></el-input>
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
          foodid: 1,
          foodname: "",
          label: "",
          price: '',
          picurl:'',
          qingzhen: '',
          supplydate: '',
          supplytype: '',
          foodgroup: ''
        },
        delete_form: {
          foodid: ''
        },
        dialogFormVisible: false,
        dialogdeleteFormVisible: false,
        theKey: 0
      }
    },
    mounted() {
      this.$axios.get('http://327k0b5172.qicp.vip/FoodCalender/SelectAll')
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
        param.append("foodid",this.form.foodid)
        param.append("foodname",this.form.foodname)
        param.append("label",this.form.label)
        param.append("price",this.form.price)
        param.append("picurl",this.form.picurl)
        param.append("qingzhen",this.form.qingzhen)
        param.append("supplydate",this.form.supplydate)
        param.append("supplytype",this.form.supplytype)
        param.append("foodgroup",this.form.foodgroup)


        this.$axios.post('http://327k0b5172.qicp.vip/FoodCalender/UpdateByPrimaryKey', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.code == 0) {
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
        param.append("foodid",this.delete_form.foodid)

        this.$axios.post('http://327k0b5172.qicp.vip/FoodCalender/Delete', param)
          .then(function (response) {
            console.log(response);
            let data = response.data
            if (data.code == 0) {
              that.$message('删除成功');
              this.theKey++;
            } else {
              that.$message('删除失败');
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
