<script lang="ts" setup>
import Login from './pages/LoginPage.vue';
import Header from './components/view/Header.vue';
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import Footer from './components/view/Footer.vue';
import ScrollTop from './components/view/ScrollTop.vue';
import ArticleCategoryList from './components/article-category/ArticleCategoryList.vue';
import LibraryPage from './components/library-page/LibraryPage.vue';
import HomePage from './pages/HomePage.vue';
import PaymentPage from './pages/PaymentPage.vue';
import InstructPage from './pages/InstructPage.vue';
import SupportPage from './pages/SupportPage.vue';
import CreateStory from './pages/CreateStory.vue';
import ForumPage from './pages/ForumPage.vue';
import StoryDetail from './pages/StoryDetail.vue';
import ReadStory from './pages/ReadStory.vue';
import { useLoginModal } from '@/stores/useLoginModal'
import LoginPage from '@/pages/LoginPage.vue'
const loginModal = useLoginModal()
import { useRoute } from "vue-router";
const route = useRoute();
const dialogVisible = ref(false)


const isHideHeader = ref(false)
let lastScrollY = window.scrollY

const handleScroll = () => {
  const currentScroll = window.scrollY

  if (currentScroll > lastScrollY && currentScroll > 80) {
    isHideHeader.value = true   // kéo xuống → ẩn
  } else {
    isHideHeader.value = false  // kéo lên → hiện
  }

  lastScrollY = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div class="layout">
    <header v-if="route.name !== 'chap-detail'" class="pt-3 pb-3" :class="[
      'pt-3 pb-3 mobile-sticky-header',
      { hide: isHideHeader }
    ]">
      <Header />
    </header>
    <main class="pd-desktop-100 pd-mb-0" :class="[
      !['payment', 'login', 'chap-detail', 'Home'].includes(route.name) ? 'mt-mid-4' : '',
      !['payment', 'login', 'chap-detail', 'Home'].includes(route.name) ? 'main' : '',
      route.name === 'payment' ? 'payment-bg' : ''
    ]">
      <RouterView />
    </main>
    <footer v-if="route.name !== 'chap-detail'" class="bg-footer border-top">
      <Footer />
    </footer>
    <ScrollTop />
  </div>
  <el-dialog v-model="loginModal.isVisible" width="400" destroy-on-close append-to-body>
    <LoginPage />
  </el-dialog>

</template>
<style scoped>
@media (max-width: 768px) {
  .mobile-sticky-header {
    position: sticky;
    top: 0;
    z-index: 9999;
    background: #fff;

    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }

  .pd-mb-0 {
    padding-bottom: 0 !important;
  }

  .mobile-sticky-header.hide {
    transform: translateY(-100%);
  }
}

.pd-desktop-100 {
  padding-bottom: 100px;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* luôn chiếm toàn chiều cao màn hình */
}

.main {
  flex: 1;
  /* chiếm hết không gian còn lại giữa header và footer */
}

.payment-bg {
  background-color: #F9FAFB
}

.bg-footer {
  background-color: #F8F8F8;
  border-top: solid 1px #e7e7e7 !important;
}

.pb-8 {
  padding-bottom: 80px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mt-mid-4 {
  padding-top: 40px;

}

@media (max-width: 768px) {
  .mt-mid-4 {
    padding-top: 40px;

  }
}
</style>
