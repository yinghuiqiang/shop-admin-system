<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          <span class="breadcrumbTitle">商城用户管理</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
  
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <!-- v-if="store.userInfo.role == 1" -->
        <el-table-column v-if="store.state.userInfo.role == 1"  label="密码" prop="password"></el-table-column>
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:5555' + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="个人介绍" prop="introduction"></el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="red"
              title="这是一段内容确定删除吗？"
              @confirm="confirmEvent(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
                <!-- <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button> -->
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="`更新用户信息`" v-model="dialogVisible">
        <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
          <el-form-item label="用户名" label-width="100px" prop="username">
            <el-input v-model="updateForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="100px" prop="password" v-if="store.state.userInfo.role == 1">
            <el-input
              type="password"
              v-model="updateForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="100px" prop="gender">
            <el-select
              style="width: 100%"
              v-model="updateForm.gender"
              placeholder="请选择性别"
            >
              <el-option
                v-for="item in optionsGender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介" label-width="100px" prop="introduction">
            <el-input
              type="textarea"
              v-model="updateForm.introduction"
            ></el-input>
          </el-form-item>
          <el-form-item label="收货地址" label-width="100px" prop="address">
            <el-input
              type="textarea"
              v-model="updateForm.address"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="商城用户头像" prop="avatar">
                <upload
                  :avatar="updateForm.avatar"
                  @avatarChange="uploadHandler"
                ></upload>
              </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUserInfo">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios'
  import { ref, onMounted, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { ElMessage } from 'element-plus'
  import uploadFn from '@/util/upload'
import upload from '@/components/upload/upload.vue'
  import { getShopUserList, FindShopUserById, deleteShopUserById,changeShopUserById } from '@/api'
  const tableData = ref([])
  const store = useStore()
  onMounted(() => {
    getTableData()
  })
  
  // 性别
  const optionsGender = [
    {
      label: '男',
      value: 1,
    },
    {
      label: '女',
      value: 2,
    },
  ]
  
  const updateFormRules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择权限', trigger: 'blur' }],
    introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
  })
  const updateFormRef = ref()
  
  const dialogVisible = ref(false)
  const updateForm = reactive({
    username: '',
    password: '',
    introduction: '',
    gender: store.state.userInfo.gender ? store.state.userInfo.gender : 2,
    avatar:'',
    file:null,
    address:''
  })

  const uploadHandler = (file) => {
  // console.log(file);
  // 将文件转码为url格式
  updateForm.avatar = URL.createObjectURL(file)
  updateForm.file = file
}
  
  const getTableData = async () => {
    const result = await getShopUserList()
    if (result.length >= 0) {
      tableData.value = result
      console.log(tableData.value);
    }
  }
  
  const handleEdit = async (row) => {
    const result = await FindShopUserById({ _id: row._id })
    console.log(result)
    if (result.length == 1) {
      Object.assign(updateForm, result[0])
    }
    dialogVisible.value = true
  }
  
  const confirmEvent = async (row) => {
    const result = await deleteShopUserById({
      _id: row._id,
    })
    if (result.message == 'success') {
      ElMessage.success({
        message: '删除成功',
        type: 'success',
      })
      getTableData()
    }
  }
  
  const updateUserInfo = async () => {
    // await axios.put
    updateFormRef.value.validate(async (vaild) => {
     
      if (vaild) {
        console.log(updateForm);
        const result = await changeShopUserById(updateForm)
        // console.log(result);
        if (result) {
          ElMessage.success({
            message: '更新成功',
            type: 'success',
          })
          dialogVisible.value = false
          getTableData()
        }
      }
    })
  }
  </script>
  