<template>
    <div>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          <span class="breadcrumbTitle">商城用户列表</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="teacherList">
        <div class="teacherItem" v-for="item in tableData">
          <img :src="`http://localhost:5555${item.avatar}`" alt="">
          <div class="info">
            <p><span>用户名称：</span><strong>{{ item.username }}</strong></p>
            <p v-if="store.state.userInfo.role == 1"><span>用户密码：</span><strong>{{ item.password }}</strong></p>
            <p><span>性别：</span><strong>{{ item.gender == 1 ? '男':'女' }}</strong></p>
            <p><span>用户介绍：</span>{{ item.introduction }}</p>
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
  import { getShopUserList} from '@/api'
  const tableData = ref([])
  const store = useStore()
  onMounted(() => {
    getTableData()
  })
  
  const getTableData = async () => {
    const result = await getShopUserList()
    console.log(result);
    if (result.length >= 0) {
      tableData.value = result
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .teacherList{
    width: 100%;
    margin: 30px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .teacherItem{
      width: calc(33% - 15px);
      box-shadow: 0 20px 50px rgba(24, 18, 14, 0.5);;
      margin-bottom: 25px;
      img{
        width: 100%;
        height: 250px;
      }
      .info{
        padding: 10px 15px;
        p{
          margin-bottom: 8px;
          line-height: 1.8;
          span{
            width: 80px;
            text-align: right;
            display: inline-block;
          }
        }
      }
    }
  }
  </style>
  