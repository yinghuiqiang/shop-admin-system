<template>
  <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
    <el-menu
      :default-active="route.path"
      :router="true"
      :collapse-transition="false"
      :collapse="$store.state.isCollapse"
    >
      <el-menu-item index="/home">
        <el-icon>
          <home-filled />
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon>
          <avatar />
        </el-icon>
        <template #title>个人中心</template>
      </el-menu-item>
      <el-sub-menu index="/user" v-if="store.state.userInfo.role == 1">
        <template #title>
          <el-icon>
            <user-filled />
          </el-icon>
          <span>系统用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addUser">添加用户</el-menu-item>
          <el-menu-item index="/userList">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/shopuser">
        <template #title>
          <el-icon><Watermelon /></el-icon>
          <span>商城用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addShopUser">添加商城用户</el-menu-item>
          <el-menu-item index="/shopUserList">商城用户列表</el-menu-item>
          <el-menu-item index="/shopUserManage">商城用户管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/shop">
        <template #title>
          <el-icon><Watermelon /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addShop">添加商品</el-menu-item>
          <el-menu-item index="/addShopCategory">添加商品分类</el-menu-item>
          <el-menu-item index="/shopList">商品列表</el-menu-item>
          <el-menu-item index="/shopManage">商品管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  HomeFilled,
  UserFilled,
  Avatar,
  Reading,
  Watermelon,
  Tools,
  Box,
} from "@element-plus/icons";

const store = useStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>
