<template>
  <div class="page">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>欢乐集电商管理系统</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          <span class="breadcrumbTitle">个人中心</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
            <h3>{{ $store.state.userInfo.username }}</h3>
            <h4>{{ $store.state.userInfo.role == 1 ? '管理员' : '用户' }}</h4>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>个人中心</span>
              </div>
            </template>
            <el-form
              :model="userForm"
              :rules="userFormRules"
              ref="userFormRef"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-select
                  v-model="userForm.gender"
                  placeholder="请选择性别区域"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个人简介" prop="introduction">
                <el-input
                  type="textarea"
                  v-model="userForm.introduction"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户头像" prop="avatar">
                <upload
                  :avatar="userForm.avatar"
                  @avatarChange="uploadHandler"
                ></upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUserInfo"
                  >更新</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import uploadFn from '@/util/upload'
import upload from '@/components/upload/upload.vue'
import { changeUserById } from '@/api'
const userFormRef = ref()
const store = useStore()

const circleUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:5555' + store.state.userInfo.avatar
    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)

const { username, gender, introduction, avatar, password } =
  store.state.userInfo
const userForm = reactive({
  username, // 用户名
  password,
  gender, //性别 ,0[保密],1[男],2[女]
  introduction, //简介
  avatar, // 头像
  file: null,
})

const userFormRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
  introduction: [
    { required: true, message: '请输入个人简介', trigger: 'blur' },
  ],
  avatar: [{ required: true, message: '请添加头像', trigger: 'blur' }],
})

const options = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
]

const uploadHandler = (file) => {
  // console.log(file);
  // 将文件转码为url格式
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}

const updateUserInfo = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const result = await changeUserById(userForm)
      if (result) {
        if(result.avatar == ''){
          result.avatar = store.state.userInfo.avatar
        }
        console.log(result)
        store.commit('getUserInfo', result)
        console.log(store.state.userInfo.avatar,'@@@@@@@@@@@@');
        ElMessage.success({
          message: '更新成功',
          type: 'success',
        })
      }
    } else {
      console.log('updateerror')
    }
  })
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  min-width: 100vh;
}
.el-row {
  margin-top: 50px;
}
.box-card {
  display: flex;
  justify-content: center;
  // align-items: space-around;
  height: 200px;
  text-align: center;
  .el-avatar {
    width: 100px;
    height: 100px;
  }
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
