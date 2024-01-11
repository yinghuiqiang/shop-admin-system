<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">添加商品</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="addShopForm"
      :rules="addShopRules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="shopName">
        <el-input v-model="addShopForm.shopName"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="shopDesc">
        <el-input type="textarea" v-model="addShopForm.shopDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="shopPrice">
        <el-input v-model="addShopForm.shopPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="shopNum">
        <el-input v-model="addShopForm.shopNum"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="shopCateCode">
        <el-select
          v-model="addShopForm.shopCateCode"
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
      <el-form-item label="商品图片" prop="shopLogo">
        <upload :avatar="addShopForm.shopLogo" @avatarChange="uploadHandler"></upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive ,onMounted} from 'vue'
import upload from '@/components/upload/upload.vue'
import { ElMessage } from 'element-plus'
import uploadFn from '@/util/upload'
import {getShopCategory,addShop} from '@/api'

const ruleForm = ref()

const addShopForm = reactive({
  shopName: '',
  shopDesc: '',
  shopPrice: 0,
  shopNum: 0,
  shopCateCode: [],
  shopCategory:{},
  shopLogo: '',
  userRating:[],
  file: null,
})
const uploadHandler = file => {
  // console.log(file);
  addShopForm.shopLogo = URL.createObjectURL(file);
  addShopForm.file = file;
};

const addShopRules = reactive({
  shopName: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    {
      min: 1,
      max: 200,
      message: '长度在 1 到 200 个字符',
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
  shopCateCode:[{ required: true, message: '请添加商品分类', trigger: 'blur' }],
})

const submitForm = () => {
  ruleForm.value.validate(async (valid) => {

    if (valid) {
      let category = {}
      shopCateList.value.forEach(item=>{
        if(item._id == addShopForm.shopCateCode[0]){
          category = item
        }
      })
      addShopForm.shopCategory = category
      const result = await addShop(addShopForm)
      if ((result.message = 'success')) {
        ElMessage.success({
          message: '添加商品成功',
          type: 'success',
        })
        addShopForm.shopName = ''
        addShopForm.shopDesc = ''
        addShopForm.shopPrice = 0
        addShopForm.shopCateCode = []
        addShopForm.shopCategory = {}
        addShopForm.shopNum = 0
        addShopForm.shopLogo = ''
        addShopForm.file = null
        addShopForm.userRating = []
      }
    }
  })
}
const shopCateList = ref([])
onMounted(async ()=>{
  shopCateList.value = await getShopCategory()
})
</script>

<style scope lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.demo-ruleForm {
  margin-top: 50px;
}
</style>
