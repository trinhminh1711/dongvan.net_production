<template>
  <div class="container">
    <el-tabs v-model="activeName" class="tab-name__center px-mb-0" @tab-click="handleClick">
      <el-tab-pane label="Đang đọc" name="first"><LibraryReadingList /></el-tab-pane>
      <el-tab-pane label="Yêu thích" name="second"> <LibraryFavoriteList /> </el-tab-pane>
      <el-tab-pane label="Sáng tác của bạn" name="third"><LibraryUser /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'
import LibraryReadingList from './LibraryReadingList.vue'
import LibraryFavoriteList from './ LibraryFavoriteList.vue'
import LibraryUser from './LibraryUser.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
}
</script>

<style>

.tab-name__center .el-tabs__nav-scroll
{
  display: flex;
  justify-content: center;
}
.tab-name__center  .el-tabs__item
{
  font-weight: 300;
}
.el-tabs__item.is-active
{
  font-weight: 700;
  color: #344054;
}
.el-tabs__active-bar
{
  background-color: #E60000;
}
</style>