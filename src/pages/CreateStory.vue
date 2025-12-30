<template>
    <div class="container">
        <div class="row">
            <el-tabs v-model="activeName"  @tab-change="handleTabChange" class="tab-name__center px-mb-0">
                <el-tab-pane label="Đăng truyện mới" name="first">
                    <Create @created-success="handleTabChange" />
                </el-tab-pane>
                <el-tab-pane label="Đăng chương mới" name="second">
                    <CreateNewTrap />
                </el-tab-pane>
                <el-tab-pane label="Truyện đã đăng" name="third">
                    <ListStoryUpdate v-if="!isListChapPage" />
                    <router-view />
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import Create from '@/components/create-story/Create.vue'
import CreateNewTrap from '@/components/create-story/CreateNewTrap.vue'
import ListStoryUpdate from '@/components/create-story/ListStoryUpdate.vue'

const route = useRoute();
const router = useRouter();

const activeName = ref('first');

// 🧠 Xác định đang ở trang danh sách chương (route con)
const isListChapPage = computed(() => route.name === 'list-chap');

// ✅ Khi component mount
onMounted(() => {
  // Nếu đang ở list-chap => chọn tab "third"
  if (isListChapPage.value) {
    activeName.value = 'third';
  } 
  // Nếu có query tab => dùng query đó
  else if (route.query.tab) {
    activeName.value = route.query.tab as string;
  }
});

// ✅ Khi đổi tab
function handleTabChange(tabName) {
  activeName.value = tabName;

  // Nếu đang ở route con (list-chap) => Quay về /create-story
  if (route.name === 'list-chap') {
    router.push({
      name: 'create-story',
      query: { tab: tabName },
    });
  } else {
    // Nếu chỉ đang ở trang create-story thì update query thôi
    router.replace({
      query: { tab: tabName },
    });
  }
}
// ✅ Theo dõi khi người dùng điều hướng đến list-chap (ví dụ click link)
watch(
  () => route.name,
  (newName) => {
    if (newName === 'list-chap') {
      activeName.value = 'third';
    }
  }
);
</script>

<style>
.el-tabs__nav-wrap::after {
  display: none !important; /* Ẩn line mặc định */
}
.el-tabs__active-bar
{
        bottom: -2px;
}
.el-tabs__nav {
  position: relative;
  border-bottom: 2px solid #e4e7ed; /* line chỉ dài bằng nhóm tab */
}
@media (max-width: 768px) {
.el-tabs__nav-wrap{
  padding: 0 !important;
}
.el-tabs__nav-prev, .el-tabs__nav-next
{
  display: none !important;
}
.tab-name__center .el-tabs__item
{
  padding: 0 10px !important;
  font-size: 16px ;
}
.tab-name__center .el-tabs__nav-scroll
{
  justify-content: start;
  overflow: scroll
}
}
</style>