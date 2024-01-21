<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">商品列表</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div v-for="item in tableData" style="margin-top: 30px;">
      <h2>{{ item.categoryName }}</h2>
      <div class="teacherList">
        <div class="teacherItem" v-for="item1 in item.shopList">
          <img :src="`http://localhost:5555${item1.shopLogo}`" alt="" />
          <div class="info">
            <p>
              <span>商品名称：</span><strong>{{ item1.shopName }}</strong>
            </p>
            <p>
              <span>商品描述：</span><strong>{{ item1.shopDesc }}</strong>
            </p>
            <p><span>商品价格：</span>{{ item1.shopPrice }}￥</p>
            <p><span>商品销量：</span>{{ item1.buyNum }}</p>
            <p><span>库存：</span>{{ item1.shopNum - item1.buyNum }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getShopCategoryList } from '@/api'
const tableData = ref([])
const store = useStore()
onMounted(async () => {
  const res = await getShopCategoryList()
  tableData.value = res
  console.log(tableData.value)
})
</script>

<style lang="scss" scoped>
.teacherList {
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .teacherItem:hover{
    box-shadow:0 2px 6px 0 rgba(0,0,0,.2);
  }
  .teacherItem {
    width: calc(25% - 15px);
    border-radius: 15px;
    overflow: hidden;
    margin-right: 20px;
    background-color: #f2f4fd;
    border: 1px solid #f2f4fd;
    margin-bottom: 25px;
    img {
      width: 100%;
      height: 300px;
      object-fit: contain;
      border-radius: 8px;
      padding: 10px 0;
      background-color: #fff;
    }
    .info {
      padding: 10px 15px;
      p {
        margin-bottom: 8px;
        line-height: 1.8;
        span {
          width: 80px;
          text-align: right;
          display: inline-block;
        }
      }
    }
  }
}
</style>
