<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">添加商品分类</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="addShopCategoryForm"
      :rules="addShopCategoryRules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="addShopCategoryForm.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="categoryDesc">
        <el-input
          type="textarea"
          v-model="addShopCategoryForm.categoryDesc"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加分类 </el-button>
      </el-form-item>
    </el-form>

    <h2 style="margin: 10px 0">分类列表&管理</h2>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column label="分类编码" prop="_id"></el-table-column>
      <el-table-column label="分类名称" prop="categoryName"> </el-table-column>
      <el-table-column label="分类描述" prop="categoryDesc"> </el-table-column>
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
    <el-dialog :title="`更新分类信息`" v-model="dialogVisible">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="分类名称" label-width="80px" prop="categoryName">
          <el-input v-model="updateForm.categoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" label-width="80px" prop="categoryDesc">
          <el-input
          type="textarea"
            v-model="updateForm.categoryDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCategoryInfo">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import upload from '@/components/upload/upload.vue'
import { ElMessage } from 'element-plus'
import uploadFn from '@/util/upload'
import { addShopCategory, getShopCategory, deleteCategoryById ,findCategoryById,changeCategoryInfoById} from '@/api'

const ruleForm = ref()
const tableData = ref([])
const updateFormRules = reactive({
  categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  categoryDesc: [{ required: true, message: '请输入分类描述', trigger: 'blur' }],
})
const updateFormRef = ref()
const dialogVisible = ref(false)
const addShopCategoryForm = reactive({
  categoryName: '',
  categoryDesc: '',
})

const updateForm = reactive({
  categoryName: '',
  categoryDesc: '',
})

const addShopCategoryRules = reactive({
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      min: 1,
      max: 20,
      message: '长度在 1 到 20 个字符',
      trigger: 'blur',
    },
  ],
  categoryDesc: [
    { required: true, message: '请输入分类描述', trigger: 'blur' },
    {
      min: 2,
      max: 1000,
      message: '长度在 2 到 1000 个字符',
      trigger: 'blur',
    },
  ],
})
const updateCategoryInfo = async () => {
  updateFormRef.value.validate(async (vaild) => {
    if (vaild) {
      const result = await changeCategoryInfoById(updateForm)
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

const handleEdit = async (row) => {
  const result = await findCategoryById({ _id: row._id })
  console.log(result)
  if (result.length == 1) {
    Object.assign(updateForm, result[0])
  }
  dialogVisible.value = true
}
const confirmEvent = async (row) => {
  const result = await deleteCategoryById({
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


const submitForm = () => {
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      console.log(addShopCategoryForm)
      const result = await addShopCategory(addShopCategoryForm)
      if ((result.message = 'success')) {
        ElMessage.success({
          message: '添加分类成功',
          type: 'success',
        })
        addShopCategoryForm.categoryName = ''
        addShopCategoryForm.categoryDesc = ''
        getTableData()
      }
    }
  })
}
const getTableData = async () => {
  const result = await getShopCategory()
  tableData.value = result
}
onMounted(async () => {
  getTableData()
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
