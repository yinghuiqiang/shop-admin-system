<template>
  <el-header>
    <div class="headerTitle">
      <el-icon @click="collapseHander">
        <grid />
      </el-icon>
      <h3>欢乐集电商管理系统</h3>
    </div>
    <div class="headnerUser">
      <h3>欢迎{{ $store.state.userInfo.username }}回来</h3>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <user-filled />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { Grid, UserFilled } from '@element-plus/icons'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()

const router = useRouter()

const collapseHander = () => {
  store.commit('changeCollapse')
}

const toCenter = () => {
  router.push('/center')
}

const loginOut = () => {
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  store.state.isCollapse = false
  router.push('/login')
}
</script>

<style scoped lang="scss">
.el-icon {
  font-size: 18px;
  color: #fff;
}
.el-header {
  display: flex;
  width: 100%;
  background-color: #2b3a49;
  justify-content: space-between;
  .headerTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 18px;
      color: #fff;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .headnerUser {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 18px;
      color: #fff;
      font-weight: 600;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
