<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>企业门户管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">添加用户</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="addUserForm"
      :rules="addUserRules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="addUserForm.password"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="">
        <el-select style="width:100%;" v-model="addUserForm.gender" placeholder="请选择性别">
          <el-option
            v-for="item in optionsGender"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动区域" prop="role">
        <el-select style="width:100%;" v-model="addUserForm.role" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input type="textarea" v-model="addUserForm.introduction"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar">
        <upload :avatar="addUserForm.avatar" @avatarChange="uploadHandler"></upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import upload from "@/components/upload/upload.vue";
import { ElMessage } from "element-plus";
import uploadFn from "@/util/upload";
import {addUser} from '@/api'

const ruleForm = ref();

const addUserForm = reactive({
  username: "",
  password: "",
  role: 2,
  introduction: "",
  avatar: "",
  file: null,
  gender: 1
});

const addUserRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "长度在 3 到 20 个字符",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur"
    }
  ],
  role: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  introduction: [
    { required: true, message: "请输入个人简介", trigger: "blur" }
  ]
});

const submitForm = () => {
  ruleForm.value.validate(async valid => {
    if (valid) {
      const result = await addUser(addUserForm);
      if (result.message = 'success') {
        ElMessage.success({
          message: "添加用户成功",
          type: "success"
        });
        addUserForm.username = "";
        addUserForm.password = "";
        addUserForm.role = 2;
        addUserForm.introduction = "";
        addUserForm.gender = 1;
        addUserForm.avatar = "";
      }
    }
  });
};
// 角色选项
const options = [
  {
    label: "管理员",
    value: 1
  },
  {
    label: "系统员工",
    value: 2
  },
];
// 性别
const optionsGender = [
  {
    label: "男",
    value: 1
  },
  {
    label: "女",
    value: 2
  },
];

const uploadHandler = file => {
  // console.log(file);
  addUserForm.avatar = URL.createObjectURL(file);
  addUserForm.file = file;
};
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