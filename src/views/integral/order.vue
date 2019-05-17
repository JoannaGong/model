<template>
  <div class="app-container">
    <div class="search-hadle">
      <div class="search-select">
        <el-select  @change="fetchData('init')" v-model="listQuery.status" placeholder="选择订单状态">
          <el-option
            :key="-1"
            :label="'已取消'"
            :value="-1"/>
           <el-option
            :key="1"
            :label="'待发货'"
            :value="1"/>
           <el-option
            :key="2"
            :label="'已发货'"
            :value="2"/>
        </el-select>
      </div>
      <div class="search-input">
        <el-input v-model="listQuery.keyword" placeholder="请输入会员昵称/ID" />
      </div>
      <el-button type="primary" @click="fetchData('init')">搜索</el-button>
    </div>
    <!-- <div class="handle-handle">
      <el-button type="success" @click="showInfo(0)">创建</el-button>
    </div> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + listQuery.limit * (listQuery.page - 1) + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
        </template>
      </el-table-column>
       <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goods_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="兑换积分" width="110" align="center">
        <template slot-scope="scope">
           <span>{{ scope.row.integral }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总积分" width="110" align="center">
        <template slot-scope="scope">
           <span>{{ scope.row.total_integral }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员编号" width="110" align="center">
        <template slot-scope="scope">
           <span>{{ scope.row.member_no }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showInfo(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :total="pageTotal"
        background
        layout="prev, pager, next"
        :current-page = "listQuery.page"
        @current-change="currentChange"/>
    </div>
    <form-dialog v-if="form.formTag" :showId="form.showId" @close="dialogClose" @addComplete="appHandle"/>
  </div>
</template>

<script>
import { getIntegralOrder } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    formDialog: () => import('./orderForm.vue')
  },
  data() {
    return {
      list: null,
      listLoading: true,
      
      form: {
        formTag: false,
        showId: 0
      },
      pageTotal: 0,
      listQuery: {
        limit: 10,
        page: 1,
        status: '',
        keyword: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(tag) {
      if (tag && tag === 'init') {
        this.listQuery.page = 1
      }
      this.listLoading = true
      getIntegralOrder(this.listQuery).then(response => {
        this.list = response.data
        // for (let x in this.list) {
        //   let stockData = this.list[x].stock
        //   let stockTotal = 0
        //   for (let y in stockData) {
        //     stockTotal += Number(stockData[y].count)
        //   }
        //   this.list[x].stockTotal = stockTotal
        // }
        this.pageTotal = response.count
        this.listLoading = false
      })
    },
    currentChange(e) {
      console.log(e)
      this.listQuery.page = e
      this.fetchData()
    },
    showInfo(id) {
      console.log(this.form.formTag)
      this.form.showId = id
      this.form.formTag = true
    },
    appHandle () {
      this.form.formTag = false
      this.fetchData()
    },
    dialogClose () {
      this.form.formTag=false
      this.fetchData()
    }
  }
}
</script>
