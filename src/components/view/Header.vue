<template>
    <div class="container px-0 pb-md-3 text-center">
        <div class="row align-items-start align-items-center justify-content-between d-md-flex d-none">
            <div class="col-md-4 d-flex justify-content-start">
                <router-link to="/"><img class="header-logo" src="@/assets/logo.png" /></router-link>
            </div>
            <div class="col-md-4">
                <el-autocomplete class="search-bar" v-model="searchText" :fetch-suggestions="querySearch"
                    placeholder="Tìm kiếm tên truyện" popper-class="my-autocomplete" @select="handleSelect">
                    <!-- Icon search -->
                    <template #suffix>
                        <el-icon style="color: black;">
                            <Search />
                        </el-icon>
                    </template>

                    <!-- Template hiển thị từng gợi ý -->
                    <template #default="{ item }">
                        <div class="value-search d-flex justify-content-between align-items-center py-2 px-2">
                            <div class="value d-flex align-items-center gap-2">
                                <img style="width: 30px; border-radius: 4px;" :src="item.urlImg" alt="" />
                                <div class="d-flex flex-column">
                                    <span class="fw-semibold">{{ item.value }}</span>
                                    <small class="text-muted">Tác giả: {{ item.author_name }}</small>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="author text-muted">
                                    {{ item.total_chapters ? item.total_chapters : "Chưa có" }} chương
                                </span>
                            </div>
                        </div>
                    </template>
                </el-autocomplete>
            </div>
            <div class="col-md-4">
                <div v-if="!auth.isAuthenticated" @click="dialogVisible = true" class="d-flex justify-content-end">
                    <button type="button" class="btn btn-danger">Tài khoản</button>
                </div>
                <div v-if="auth.isAuthenticated" class="user-login_icon">
                    <el-popover style="display: flex;" v-if="listNotifi"
                        class="px-2 d-flex align-items-center list-notifi-popover" placement="left-start" :width="400"
                        trigger="click">
                        <div>
                            <p class="d-flex justify-content-between mb-4 pt-2"><span
                                    class="text-lg fw-bold text-color_primary">Thông báo</span>
                                <span @click="markAllNotifications()" class="color-blue cursor-pointer">Đánh dấu tất cả
                                    đã
                                    đọc</span>
                            </p>
                            <div v-for="value in listNotifi" :key="value.id"
                                class="d-flex align-items-start gap-3 pb-4 notification-item"
                                :class="{ 'notification-read': value.is_read }">
                                <div>
                                    <img src="@/assets/icon/notification-bell-icon.svg" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 12px;">{{ timeAgo(value.created_at) }}</p>
                                    <p @click="goToNoti(value.post_id, value.id, value)" class="hover_link"
                                        :class="{ 'fw-bold text-color_primary': !value.is_read }">
                                        {{ value.title }}
                                    </p>
                                    <p class="text-scroll" v-html="value.message"
                                        style="line-height: 1.5; font-size: 13px; color: #606266;">
                                    </p>
                                </div>
                            </div>
                            <div v-if="listNotifi.length < 1">
                                <p>Chưa có thông báo mới !</p>
                            </div>
                        </div>
                        <template #reference>
                            <el-badge :value="notiNumber" class="item">
                                <img class="hover_link" src="@/assets/icon/bell-02.svg" alt="">
                            </el-badge>
                        </template>
                    </el-popover>
                    <router-link to="/library-page" class="d-flex align-items-center">
                        <img src="@/assets/icon/books-stack-of-three 1.svg" alt="">
                    </router-link>
                    <el-popover class="px-2" placement="bottom-start" :width="250" trigger="click">
                        <div>
                            <div class="pb-3 d-flex align-items-center gap-2 "
                                style="border: none;border-bottom: 1px solid #ccc;">
                                <img style="width: 50px; border-radius: 50%; height: 50px;"
                                    :src="auth.user.link_thumbnail" alt="">
                                <div>
                                    <p class="fw-bold text-color_primary">{{ auth.user.username }} ({{ auth.user.role
                                    }})</p>
                                    <p>ID: {{ auth.user.user_id }}</p>
                                </div>
                            </div>
                            <div class="drop-menu">
                                <ul class="px-0" style="list-style: none;">
                                    <li @click=" goToPage('profile')">
                                        <img src="@/assets/icon/icon-user.png" alt="">
                                        <span class="hover_link">Thông tin cá nhân</span>
                                    </li>
                                    <li @click=" goToPage('my-post')">
                                        <img src="@/assets/icon/icon-book-stores.png" alt="">
                                        <span class="hover_link">Truyện của tôi</span>
                                    </li>
                                    <li @click="goToPage('payment')">
                                        <img src="@/assets/icon/icon-buy.png" alt="">
                                        <span class="hover_link">Nạp Tang Diệp</span>
                                    </li>
                                    <li @click="goToPage('transaction-history')">
                                        <img src="@/assets/icon/icon-pay.png" alt="">
                                        <span class="hover_link">Lịch sử giao dịch</span>
                                    </li>
                                    <li @click="goToPage('support')"><img src="@/assets/icon/icon-support.png" alt="">
                                        <span class="hover_link">Liên hệ hỗ trợ</span>
                                    </li>
                                    <hr style="  border: none;border-top: 1px solid #ccc;">
                                    <div class="admin-permision">
                                        <li v-if="auth.user.role == 'master_admin'"
                                            @click=" goToPage('UserManagement')">
                                            <el-icon>
                                                <Key />
                                            </el-icon>
                                            <span class="hover_link">Quản lý người dùng</span>
                                        </li>
                                        <li v-if="auth.user.role == 'master_admin'"
                                            @click=" goToPage('PaymentHistory')">
                                            <el-icon>
                                                <Key />
                                            </el-icon>
                                            <span class="hover_link">Quản lý giao dịch</span>
                                        </li>
                                        <li v-if="auth.user.role == 'master_admin' || auth.user.role == 'content_admin'"
                                            @click=" goToPage('PostManagement')">
                                            <el-icon>
                                                <Key />
                                            </el-icon>
                                            <span class="hover_link">Quản lý bài viết</span>
                                        </li>
                                        <li v-if="auth.user.role == 'master_admin' || auth.user.role == 'content_admin'"
                                            @click=" goToPage('StoryManagement')">
                                            <el-icon>
                                                <Key />
                                            </el-icon>
                                            <span class="hover_link">Quản lý truyện</span>
                                        </li>
                                    </div>
                                    <li @click="logout()"><img src="@/assets/icon/icon-logout.png" alt="">
                                        <span class="hover_link"> Đăng xuất</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <template #reference>
                            <img class="hover_link" src="@/assets/icon/user-icon.svg" alt="">
                        </template>
                    </el-popover>
                </div>
            </div>
        </div>
        <div class="row align-items-start align-items-center justify-content-between d-md-none d-flex">
            <div style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);"
                class="d-flex align-items-center justify-content-between">
                <div class="col-md-8 d-flex justify-content-start">
                    <router-link to="/"><img class="header-logo" src="@/assets/logo.png" /></router-link>
                </div>
                <div class="col-md-4 d-flex align-items-center">
                    <div v-if="!auth.isAuthenticated" @click="dialogVisible = true" class="d-flex justify-content-end">
                        <button type="button" class="btn btn-danger">Tài khoản</button>
                    </div>
                    <div v-if="auth.isAuthenticated" class="user-login_icon">
                        <el-popover style="display: flex;" v-if="listNotifi" class="px-2 d-flex align-items-center"
                            placement="left-start" :width="400" trigger="click">
                            <div>
                                <p class="d-flex justify-content-between mb-4 pt-2"><span
                                        class="text-lg fw-bold text-color_primary">Thông báo</span>
                                    <span @click="markAllNotifications()" class="color-blue cursor-pointer">Đánh dấu tất
                                        cả
                                        đã
                                        đọc</span>
                                </p>
                                <div v-for="value in listNotifi" :key="value.id"
                                    class="d-flex align-items-start gap-3 pb-4 notification-item"
                                    :class="{ 'notification-read': value.is_read }">
                                    <div>
                                        <img src="@/assets/icon/notification-bell-icon.svg" alt="">
                                    </div>
                                    <div>
                                        <p style="font-size: 12px;">{{ timeAgo(value.created_at) }}</p>
                                        <p @click="goToNoti(value.post_id, value.id, value)" class="hover_link"
                                            :class="{ 'fw-bold text-color_primary': !value.is_read }">
                                            {{ value.title }}
                                        </p>
                                        <p class="text-scroll" v-html="value.message"
                                            style="line-height: 1.5; font-size: 13px; color: #606266;">
                                        </p>
                                    </div>
                                </div>
                                <div v-if="listNotifi.length < 1">
                                    <p>Chưa có thông báo mới !</p>
                                </div>
                            </div>
                            <template #reference>
                                <el-badge :value="notiNumber" class="item">
                                    <img class="hover_link" src="@/assets/icon/bell-02.svg" alt="">
                                </el-badge>
                            </template>
                        </el-popover>
                        <router-link to="/library-page" class="d-flex align-items-center">
                            <img src="@/assets/icon/books-stack-of-three 1.svg" alt="">
                        </router-link>
                        <el-popover class="px-2 popper-mb" placement="bottom-start" :width="250" trigger="click">
                            <div>
                                <div class="pb-3 d-flex align-items-center gap-2 "
                                    style="border: none;border-bottom: 1px solid #ccc;">
                                    <img style="width: 50px; border-radius: 50%; height: 50px;"
                                        :src="auth.user.link_thumbnail" alt="">
                                    <div>
                                        <p class="fw-bold text-color_primary">{{ auth.user.username }} ({{
                                            auth.user.role
                                            }})</p>
                                        <p>ID: {{ auth.user.user_id }}</p>
                                    </div>
                                </div>
                                <div class="drop-menu">
                                    <ul class="px-0" style="list-style: none;">
                                        <li @click=" goToPage('profile')">
                                            <img src="@/assets/icon/icon-user.png" alt="">
                                            <span class="hover_link">Thông tin cá nhân</span>
                                        </li>
                                        <li @click=" goToPage('my-post')">
                                            <img src="@/assets/icon/icon-book-stores.png" alt="">
                                            <span class="hover_link">Truyện của tôi</span>
                                        </li>
                                        <li @click="goToPage('payment')">
                                            <img src="@/assets/icon/icon-buy.png" alt="">
                                            <span class="hover_link">Nạp Tang Diệp</span>
                                        </li>
                                        <li @click="goToPage('transaction-history')">
                                            <img src="@/assets/icon/icon-pay.png" alt="">
                                            <span class="hover_link">Lịch sử giao dịch</span>
                                        </li>
                                        <li @click="goToPage('support')"><img src="@/assets/icon/icon-support.png"
                                                alt="">
                                            <span class="hover_link">Liên hệ hỗ trợ</span>
                                        </li>
                                        <hr style="  border: none;border-top: 1px solid #ccc;">
                                        <div class="admin-permision">
                                            <li v-if="auth.user.role == 'master_admin'"
                                                @click=" goToPage('UserManagement')">
                                                <el-icon>
                                                    <Key />
                                                </el-icon>
                                                <span class="hover_link">Quản lý người dùng</span>
                                            </li>
                                            <li v-if="auth.user.role == 'master_admin'"
                                                @click=" goToPage('PaymentHistory')">
                                                <el-icon>
                                                    <Key />
                                                </el-icon>
                                                <span class="hover_link">Quản lý giao dịch</span>
                                            </li>
                                            <li v-if="auth.user.role == 'master_admin' || auth.user.role == 'content_admin'"
                                                @click=" goToPage('PostManagement')">
                                                <el-icon>
                                                    <Key />
                                                </el-icon>
                                                <span class="hover_link">Quản lý bài viết</span>
                                            </li>
                                            <li v-if="auth.user.role == 'master_admin' || auth.user.role == 'content_admin'"
                                                @click=" goToPage('StoryManagement')">
                                                <el-icon>
                                                    <Key />
                                                </el-icon>
                                                <span class="hover_link">Quản lý truyện</span>
                                            </li>
                                        </div>
                                        <li @click="logout()"><img src="@/assets/icon/icon-logout.png" alt="">
                                            <span class="hover_link"> Đăng xuất</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <template #reference>
                                <img class="hover_link" src="@/assets/icon/user-icon.svg" alt="">
                            </template>
                        </el-popover>
                    </div>
                    <div :class="{
                        'page-home': $route.name === 'Home',
                        'page-other': $route.name !== 'Home'
                    }" class="d-flex align-items-center ms-3 menu-vertical">
                        <img style="height: 20px" @click="drawer = true" src="@/assets/icon/emphasis.svg" />
                        <el-drawer v-model="drawer" class="custom-drawer" size="70%">
                            <el-menu default-active="2" class="el-menu-vertical-demo">
                                <el-menu-item index="2">
                                    <RouterLink @click="drawer = false" to="/forum"
                                        class="d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                                        Diễn đàn
                                    </RouterLink>

                                </el-menu-item>
                                <el-menu-item index="2">
                                    <RouterLink @click="drawer = false" to="/"
                                        class="d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                                        Bảng xếp hạng
                                    </RouterLink>
                                </el-menu-item>
                                <el-menu-item index="3">
                                    <RouterLink @click="drawer = false" to="/support"
                                        class="d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                                        Hỗ trợ
                                    </RouterLink>

                                </el-menu-item>
                                <el-menu-item @click="drawer = false" index="4">
                                    <RouterLink to="/instruct-page"
                                        class="d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                                        <img src="@/assets/icon/huong-dan.svg" alt="">
                                        Hướng dẫn
                                    </RouterLink>

                                </el-menu-item>
                                <el-menu-item @click="drawer = false" index="5">
                                    <RouterLink tag="p" to="/create-story"
                                        class="d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                                        <img src="@/assets/icon/dang-truyen.svg" alt="">
                                        Đăng truyện
                                    </RouterLink>
                                </el-menu-item>
                            </el-menu>
                        </el-drawer>
                    </div>
                </div>
            </div>
            <div :class="{ 'd-none': $route.name != 'Home' }" class="col-12 mt-3">
                <el-autocomplete class="search-bar" v-model="searchText" :fetch-suggestions="querySearch"
                    placeholder="Tìm kiếm tên truyện" popper-class="my-autocomplete" @select="handleSelect">
                    <!-- Icon search -->
                    <template #suffix>
                        <el-icon style="color: black;">
                            <Search />
                        </el-icon>
                    </template>

                    <!-- Template hiển thị từng gợi ý -->
                    <template #default="{ item }">
                        <div class="value-search d-flex justify-content-between align-items-center py-2 px-2">
                            <div class="value d-flex align-items-center gap-2">
                                <img style="width: 30px; border-radius: 4px;" :src="item.urlImg" alt="" />
                                <div class="d-flex flex-column">
                                    <span class="fw-semibold">{{ item.value }}</span>
                                    <small class="text-muted">Tác giả: {{ item.username }}</small>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="author text-muted">
                                    {{ item.total_chapters ? item.total_chapters : "Chưa có" }} chương
                                </span>
                            </div>
                        </div>
                    </template>
                </el-autocomplete>
            </div>
        </div>
    </div>
    <div style="background-color:#3D3E43" class="menu-bar d-md-flex d-none">
        <div class="container text-center">
            <div style="background-color:#3D3E43"
                class="row align-items-start align-items-stretch justify-content-between ">
                <div style="background-color:#313035" class="col-3 d-flex align-items-center">
                    <el-popover :disabled="route.name == 'Home'" popper-class="my-popover" placement="bottom-start"
                        :width="300" trigger="hover">
                        <div class="row col-12  d-flex align-items-center menu-category">
                            <div @click="goToCategory(item)" v-for="(item, index) in items" :key="index"
                                class="col-6 d-flex align-items-center menu-category__item">
                                <span>
                                    <img :src="item.image" alt="Logo">
                                </span>
                                <span>
                                    <p class="text-color_primary">{{ item.text }}</p>
                                    <p class="text-color__tertiary">{{ item.number }}</p>
                                </span>
                            </div>
                        </div>
                        <template #reference>
                            <div class="d-flex hover_link">
                                <div class="d-flex align-items-center">
                                    <el-icon :size="20" style="color: aliceblue;">
                                        <Fold />
                                    </el-icon>
                                </div>
                                <div class="text-white ms-1">
                                    Thể loại
                                </div>
                            </div>
                        </template>
                    </el-popover>

                </div>
                <div class="col-5 px-0">
                    <div class="menu-item d-flex justify-content-center">
                        <el-menu class="el-menu-top" mode="horizontal" router :default-active="$route.name"
                            background-color="#3D3E43" text-color="#fff" active-text-color="#ffd04b">
                            <!-- Dùng index = name của route -->
                            <el-menu-item index="/forum">Diễn đàn</el-menu-item>
                            <el-menu-item index="/ranking" @click="goHome">Bảng xếp hạng</el-menu-item>
                            <el-menu-item index="/support">Hỗ trợ</el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="col-4 d-flex">
                    <div class="d-flex justify-content-end align-items-center btn-menu__item">
                        <RouterLink to="/instruct-page"
                            class="text-white px-4 d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                            <img src="@/assets/icon/huong-dan.svg" alt="">
                            Hướng dẫn
                        </RouterLink>
                        <RouterLink tag="p" to="/create-story"
                            class="text-white px-4 d-flex align-items-center gap-2 bg-transparent border-0 router-link text-16">
                            <img src="@/assets/icon/dang-truyen.svg" alt="">
                            Đăng truyện
                        </RouterLink>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisible" width="350">
        <LoginPage />
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { getAllStory } from '@/api/stories';
import { useRoute } from "vue-router"
import { getNotifications, markReadNotifications, markAllReadNotifications } from '@/api/notification';
import storyIcon from '@/assets/icon/StoryIcon.png'
import vectorIcon2 from '@/assets/icon/Vector (2).svg'
import vectorIcon3 from '@/assets/icon/Vector (3).svg'
import vectorIcon4 from '@/assets/icon/Vector (4).svg'
import vectorIcon5 from '@/assets/icon/Vector (5).svg'
import vectorIcon6 from '@/assets/icon/open-book-2 1.svg'
import vectorIcon7 from '@/assets/icon/Vector (6).svg'
import vectorIcon8 from '@/assets/icon/Vector (7).svg'
import vectorIcon9 from '@/assets/icon/helmet 1.svg'
import vectorIcon10 from '@/assets/icon/building 1.svg'
import vectorIcon11 from '@/assets/icon/poem 1.svg'
import vectorIcon12 from '@/assets/icon/Vector (8).svg'
interface Story {
    story_id: number;
    title: string;
    author: string;
    description?: string;
    author_name?: string;
    urlImg?: string;
}

interface SuggestItem extends Story {
    value: string; // cần cho el-autocomplete
    link: string;  // đường dẫn chi tiết
}
const searchText = ref("");
const stories = ref<SuggestItem[]>([]);
const router = useRouter();
const route = useRoute()
const auth = useAuthStore();
const dialogVisible = ref(false)
import { toast } from "vue3-toastify";

interface LinkItem {
    value: string
    link: string
}
const drawer = ref(false)
const state = ref('')
const links = ref<LinkItem[]>([])
const notiNumber = ref()
function goHome() {
    router.push({ name: 'Home' }).then(() => {
        setTimeout(() => {
            document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
    })
}
const loadAll = () => {
    return [
        { value: 'Truyện mới' },
        { value: 'Hướng dẫn đăng truyện' },
        { value: 'Nạp tam điệp' },
        { value: 'Sống Sót Trong Trò' },
        { value: 'Đọc nhiều trong tuần' },

    ]
}
function goTo(pathName) {
    router.push({ name: pathName });
}
const listNotifi = ref([])
async function getAllNotification() {
    if (auth.userId) {
        const res = await getNotifications(auth.userId);
        listNotifi.value = res.data; // dữ liệu fetch từ API
        updateNotiNumber();
    }

}
const updateNotiNumber = () => {
    notiNumber.value = listNotifi.value?.filter(n => n.is_read === 0)?.length || 0;
};
async function getStoryList() {
    try {
        const res = await getAllStory(); // gọi API backend        
        stories.value = res.map((story: Story) => ({
            ...story,
            value: story.title, // el-autocomplete yêu cầu có 'value'
            link: `/story/${story.story_id}`,
        }));
    } catch (err) {
        console.error("Lỗi khi lấy danh sách truyện:", err);
    }
}
function querySearch(queryString: string, cb: (results: SuggestItem[]) => void) {
    const query = removeVietnameseTones(queryString);
    const results = query

        ? stories.value.filter((story) => {
            const title = removeVietnameseTones(story.value);
            const author = removeVietnameseTones(story.author_name); // <-- Sử dụng author_name
            return title.includes(query) || author.includes(query);
        })
        : stories.value;
    cb(results.slice(0, 10));
}
function removeVietnameseTones(str: string) {
    return str
        .normalize("NFD") // tách ký tự và dấu
        .replace(/[\u0300-\u036f]/g, "") // xóa dấu thanh
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
}

function handleSelect(item: SuggestItem) {
    router.push({ name: 'story', params: { id: item.story_id } })

}
function logout() {
    toast.loading("Đang đăng xuất...");
    setTimeout(() => {
        auth.logout();
        router.push({ name: "Home" }).then(() => {
            window.location.reload();
        });
    }, 2000);
}

function goToCategory(item) {
    router.push({
        name: "article",
        params: { id: item.id },
    });
}
async function markAllNotifications() {
    try {
        await markAllReadNotifications(auth.userId)

        // Cập nhật frontend: đánh dấu tất cả notification đã đọc
        listNotifi.value.forEach(n => n.is_read = 1);

        // Update badge số chưa đọc
        updateNotiNumber();

    } catch (err) {
        console.error('Đánh dấu tất cả lỗi:', err);
    }

}
async function goToNoti(post_id, id_noti, notiObj) {
    if (!notiObj.is_read) {
        await markReadNotifications(auth.userId, id_noti);
        notiObj.is_read = 1;

        // Trigger reactivity
        listNotifi.value = [...listNotifi.value];
        updateNotiNumber();
    }
    if (notiObj.type == 'warning') {
        router.push({
            name: "story",
            params: { id: post_id }
        });

    }
    else {
        router.push({
            name: "post-detail",
            params: { id: post_id }
        });
    }


}
function timeAgo(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - inputDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) {
        return `${diffSec} giây trước`;
    } else if (diffMin < 60) {
        return `${diffMin} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays <= 30) {
        return `${diffDays} ngày trước`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} tháng trước`;
    }
}
const items = [
    { image: storyIcon, text: 'Linh dị', number: '236460', id: 1 },
    { image: vectorIcon2, text: 'Trinh thám', number: '43492', id: 2 },
    { image: vectorIcon3, text: 'Lịch sử', number: '77225', id: 3 },
    { image: vectorIcon4, text: 'Ngôn tình', number: '45378', id: 4 },
    { image: vectorIcon5, text: 'Truyện ngắn', number: '236460', id: 5 },
    { image: vectorIcon6, text: 'Thơ', number: '43492', id: 6 },
    { image: vectorIcon7, text: 'Huyền ảo', number: '77225', id: 7 },
    { image: vectorIcon8, text: 'Viễn tưởng', number: '45378', id: 8 },
    { image: vectorIcon9, text: 'Cổ đại', number: '45378', id: 9 },
    { image: vectorIcon10, text: 'Hiện thực', number: '77225', id: 10 },
    { image: vectorIcon11, text: 'Tản văn', number: '77225', id: 11 },
    { image: vectorIcon12, text: 'Tất cả', number: '77225', id: 12 },
]
function getPostsToday(posts) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return posts.filter(post => {
        const created = new Date(post.created_at);
        return created >= startOfDay && created < endOfDay;
    });
}
function goToPage(name) {
    if (name == 'my-post') {
        router.push({
            name: "create-story", // đúng route name của Component A
            query: { tab: "second" } // mở tab2
        });
    }
    else {
        const options = { name: name };
        router.push(options);
    }
}
onMounted(async () => {
    await getAllNotification();
    await getStoryList()
})
</script>

<style>
.page-other .el-drawer {
    background-color: #3E3D43 !important;
    width: 70% !important;
    /* mặc định cho tất cả */
}

.page-home .el-drawer {
    background-color: #3E3D43 !important;
    width: 70% !important;
    /* riêng trang home */
}

.router-link-active {
    color: #ffd04b !important;
}

.btn-menu__item p {
    font-size: 14px;
}

.btn-menu__item .router-link:hover {
    background: linear-gradient(#E60000, #FF6114) !important;
    height: 100%;
    color: #fff !important;
    transition: all ease-in-out 1s;
    cursor: pointer;
}

.my-popover {
    display: flex;
    justify-content: center;
}

.menu-bar {
    background-color: #3D3E43
}

.menu-item .el-menu-item {
    max-height: 100%;
    padding: 0 30px;
    transition: all ease-in-out 1s;
}


.menu-item .el-menu a {
    padding: 0;
}

.menu-item .el-menu-item:hover {
    background: linear-gradient(#E60000, #FF6114) !important;
    color: #fff !important;
    transition: all ease-in-out 1s;
}

.search-bar .el-input__inner {
    height: 40px;
}

.search-bar .el-input__wrapper {
    border-radius: 50px;
}

.demo-tabs>.el-tabs__content {
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-menu--horizontal {
    border: none !important;
    display: flex;
    width: 100%;

}

.user-login_icon .el-tooltip__trigger {
    display: flex;
    align-items: center;
}

.header-logo {
    width: 150px;
    height: auto;
}

.el-menu-top {
    max-height: 50px;
}

.btn-danger {
    padding: 8px 16px;
    border-radius: 40px;
    border: solid 1px;
    color: #fff;
    background: linear-gradient(to right, #E60000, #FF6114);
}

.user-login_icon {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: end
}

.user-login_icon img {
    max-width: 24px;
}

.text-scroll {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* số dòng tối đa */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<style scoped>
.drop-menu li {
    padding: 10px 0;
    font-weight: 500;
    vertical-align: middle;
    display: flex;
    align-items: center;
    color: #344054;
}

.drop-menu li img {
    padding: 0 5px;
}
</style>
<style scoped>
.notification-item {
    padding: 10px;
    border-radius: 6px;
    transition: background 0.2s;
}

.bg-overgray {
    background-color: #313035;
}

.notification-read {

    /* màu nền nhẹ cho notification đã đọc */
    color: #999;
    /* chữ màu xám */
}

.el-menu--horizontal>.el-menu-item {
    border: none !important;
    font-size: 16px;
}

.notification-item:hover {
    background-color: #e8f0fe;
    /* hover effect */
}

.menu-category span {
    text-align: left;
}

.menu-category p {
    font-size: 12px;
    line-height: 1.5;
}

.menu-category img {
    padding: 10px;
}

.menu-category__item {
    padding: 7px 0;
}

.menu-category div:nth-child(4n+3),
.menu-category div:nth-child(4n+4) {
    background: #F7F6F2
}

.banner-tabs .el-menu-item {
    font-size: 12px;
}

.el-menu {
    max-height: 50px;
    display: flex;
}

.banner-tabs .el-menu-item {
    height: auto !important;
    padding: 0 10px;
}

.el-menu-story .el-tab-pane img {
    max-width: 33%;
}

.banner-newfeeds img {
    width: 100%;
    height: 150px;
}

.topic-item {
    font-size: 12px;
    line-height: 3;
}

.topic-item .text-black {
    white-space: nowrap;
}

.topic-item .text-color__tertiary {
    margin-left: 2px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.topic-item:hover span {
    cursor: pointer;
    color: #ff6114;
}

.new-feed_title img {
    max-width: 20px;
    height: auto;
    margin-right: 4px;
}

.menu-category>div:hover {
    cursor: pointer;
    background-color: #f7f6f2;
    transition: all .2s ease-in;
}

.value-search:hover {
    background-color: #f7f6f2;
    color: #fc6c28;
}

@media (max-width: 768px) {
    .user-login_icon {
        display: flex;
        align-items: center;
        gap: 10px !important;
        justify-content: end
    }

    .el-menu {
        display: block;
        background: none !important;
    }

    .menu-vertical .el-drawer__body {
        padding: 0 !important;
    }
}
</style>
<style>
@media (max-width: 768px) {
    .el-popover.el-popper {
        width: 90% !important;
        /* gần full width */
        max-width: 400px;
        /* giới hạn tối đa */
        top: 10% !important;
        /* cách đỉnh một chút */
        left: 50% !important;
        /* đặt tâm theo giữa màn hình */
        transform: translateX(-50%) !important;
        /* dịch nửa chiều ngang để canh giữa */
    }
.el-popper__arrow, .el-popper__arrow:before
{
    height: 10px;
    position: absolute;
    width: 10px;
    z-index: -1;
    left: 15px;
}
    .menu-vertical .el-drawer__body {
        padding: 0 !important;
    }

    .custom-drawer .el-drawer__close {
        color: #fff;
        /* 🎨 đổi màu icon */
        font-size: 22px;
        /* nếu muốn */
    }

    .el-menu-item a {
        color: #fff !important;
        width: 100%;
    }

    .el-menu-item:hover {
        background-color: red !important;
    }
}
</style>
