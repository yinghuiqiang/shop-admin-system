<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          <span class="breadcrumbTitle">商品列表</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
  
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column label="名称" prop="shopName"></el-table-column>
        <el-table-column
          label="描述"
          prop="shopDesc"
          width="500"
        ></el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <div v-if="scope.row.shopLogo">
              <el-avatar
                :size="50"
                :src="'http://localhost:5555' + scope.row.shopLogo"
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
        <el-table-column label="分类">
          <template #default="scope">
            {{ scope.row.shopCategory.categoryName }}
          </template>
        </el-table-column>
        <el-table-column label="价格(￥)" prop="shopPrice"></el-table-column>
        <el-table-column label="数量（件）" prop="shopNum"></el-table-column>
        <el-table-column label="用户评价">
          <template #default="scope">
            {{
              scope.row.userRating.length > 0
                ? scope.row.userRating[0]
                : '暂无评价'
            }}
          </template>
        </el-table-column>
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
      <el-dialog :title="`更新商品信息`" v-model="dialogVisible">
        <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
          <el-form-item label="商品名称" label-width="80px" prop="shopName">
            <el-input v-model="updateForm.shopName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" label-width="80px" prop="shopDesc">
            <el-input
              v-model="updateForm.shopDesc"
              autocomplete="off"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类" label-width="80px" prop="shopCateCode">
            <el-select
              v-model="updateForm.shopCateCode"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="1"
              placeholder="请添加分类"
              style="width: 100%"
            >
              <el-option
                v-for="item in shopCateList"
                :key="item._id"
                :label="item.categoryName"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" label-width="80px" prop="shopPrice">
            <el-input
              v-model="updateForm.shopPrice"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品数量" label-width="80px" prop="shopNum">
            <el-input v-model="updateForm.shopNum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" label-width="80px" prop="classLogo">
            <upload
              :avatar="updateForm.shopLogo"
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
  //   import { getUserList, findUserById, deleteUserById,changeUserInfoById } from '@/api'
  import {
    getShopList,
    deleteShopById,
    findShopById,
    getShopCategory,
    changeShopById,
    getShopCategoryList
  } from '@/api'
  const tableData = ref([])
  const store = useStore()
  onMounted(() => {
    getTableData()
  })
  const updateFormRules = reactive({
    shopName: [
      { required: true, message: '请输入商品名称', trigger: 'blur' },
      {
        min: 1,
        max: 20,
        message: '长度在 1 到 20 个字符',
        trigger: 'blur',
      },
    ],
    shopDesc: [
      { required: true, message: '请输入商品描述', trigger: 'blur' },
      {
        min: 1,
        max: 200,
        message: '长度在 1 到 200 个字符',
        trigger: 'blur',
      },
    ],
    shopPrice: [{ required: true, message: '请给商品定价', trigger: 'change' }],
    shopNum: [{ required: true, message: '请输入商品的数量', trigger: 'blur' }],
    shopLogo: [{ required: true, message: '请上传商品图片', trigger: 'change' }],
    shopCateCode: [
      { required: true, message: '请添加商品分类', trigger: 'blur' },
    ],
  })
  const updateFormRef = ref()
  
  const dialogVisible = ref(false)
  const updateForm = reactive({
    shopName: '',
    shopDesc: '',
    shopPrice: 0,
    shopNum: 0,
    shopCateCode: [],
    shopCategory: {},
    shopLogo: '',
    userRating: [],
    file: null,
  })
  
  const getTableData = async () => {
    const result = await getShopList()
    const res = await getShopCategoryList()
    let  newArr = ref([])
    res.forEach(item=>{
      for(var i in item.shopList){
        newArr.value.push(item.shopList[i])
      }
    })
    if (res.length >= 0) {
      tableData.value = newArr.value
    }
  }
  
  const handleEdit = async (row) => {
    const result = await findShopById({ _id: row._id })
    if (result.length == 1) {
      Object.assign(updateForm, result[0])
    }
    dialogVisible.value = true
  }
  
  const confirmEvent = async (row) => {
    const result = await deleteShopById({
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
      console.log(updateForm)
      if (vaild) {
          let category = {}
        shopCateList.value.forEach(item=>{
          if(item._id == updateForm.shopCateCode[0]){
            category = item
          }
        })
        updateForm.shopCategory = category
        const result = await changeShopById(updateForm)
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
  const uploadHandler = (file) => {
      // console.log(file);
      // 将文件转码为url格式
      updateForm.shopLogo = URL.createObjectURL(file)
      updateForm.file = file
    }
  const shopCateList = ref([])
    onMounted(async () => {
      shopCateList.value = await getShopCategory()
      
    })
  </script>
  