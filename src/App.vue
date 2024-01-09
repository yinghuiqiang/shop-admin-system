<template>

  <router-view />
</template>

<script setup>
// import 
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background-color: #1890ff;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}

.breadcrumbTitle {
  position: relative;
  font-size: 19px;
  font-weight: 800;
  top: -3px;
}
</style>
