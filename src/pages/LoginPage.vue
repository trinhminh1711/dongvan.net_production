<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Đăng nhập" name="first">
        <LoginForm/>
    </el-tab-pane>
    <el-tab-pane label="Đăng ký mới" name="seconds">
        <SignUp />
    </el-tab-pane>

  </el-tabs>
</template>

<script lang="ts" setup>
import SignUp from '@/components/auth/SignUp.vue';
import LoginForm from '../components/auth/LoginForm.vue';
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .el-tabs__nav 
{
width: 100%;
}
.demo-tabs .el-tabs__nav  .el-tabs__item
{
  flex: 0 0 50%; 
  padding: 0;
}
</style>