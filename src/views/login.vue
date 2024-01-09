<template>
  <div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />

    <div class="formContainer">
      <el-form
        :model="loginForm"
        status-icon
        ref="ruleFormRef"
        :rules="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 20px 0 0 0;
          height: 76%;
        "
      >
        <h3>电商后台管理系统</h3>
        <!-- prop是geiitem添加校验规则 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleFormRef')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { loadFull } from 'tsparticles'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userLogin } from '@/api'
import axios from 'axios'
import store from '@/store'
const particlesInit = async (engine) => {
  await loadFull(engine)
}

// 粒子效果的插件
// "particles.vue3": "^2.12.0",
// "tsparticles": "^2.9.3",

// 散点设置
const options = {
  background: {
    color: {
      value: '#2b3a4d',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.9,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#ffffff',
    },
    links: {
      color: '',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
  },
  detectRetina: true,
}

const loginForm = reactive({
  username: '',
  password: '',
})

const ruleFormRef = ref()

const ruleForm = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 20,
      message: '长度在 3 到 20 个字符',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 3,
      max: 18,
      message: '长度在 3 到 18 个字符',
      trigger: 'blur',
    },
  ],
})

const router = useRouter()

const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      userLogin(loginForm).then(
        (response) => {
          if (response?.username) {
            store.commit('getUserInfo', response)
            store.commit('changeRouterGetterState', false)
            router.push('/home')
          }
        },
        (error) => {
          console.error(JSON.stringify(error));
        }
      )
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.formContainer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70vh;
  height: 45vh;
  background-color: #000;
  opacity: 0.85;
  padding-right: 20px;
  box-sizing: border-box;
}
h3 {
  color: #fff;
  text-align: center;
  font-size: 30px;
  margin: 30px 0;
  // border-top: 1px solid transparent;
}
.login_logo__wqw-I {
  display: block;
  height: 35px;
  margin: 0 auto;
}
.login_desc__1p9c6 {
  margin-top: 12px;
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
}
.formInfo {
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
}
</style>
