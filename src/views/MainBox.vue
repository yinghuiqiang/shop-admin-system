<template>
  <el-container>
    <!-- aside -->
    <sideMenu></sideMenu>
    <el-container direction="vertical">
      <!-- header -->
      <topHeader> </topHeader>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import sideMenu from "../components/mainbox/sideMenu.vue";
import topHeader from "../components/mainbox/topHeader.vue";
</script>

<style></style>
