<template>
    <LoadingSpiner :show="loading" />
    <div v-if="auth.user" class="profile-page container">
        <!-- Header banner -->
        <div class="profile-banner" style="position: relative;">
            <img src="@/assets/image/profile-cover-photo.png" class="w-100 rounded"
                style="height: 200px; object-fit: cover;">
            <!-- Avatar -->
            <div class="d-flex infomation">
                <div class="d-flex infomation_avatar">
                    <div>
                        <img :src="auth.user.link_thumbnail" alt="" srcset="">
                    </div>
                    <div>
                        <h2 class="fw-bold text-color_primary mt-2">{{ auth.user.username }}</h2>
                        <p class="text-secondary">ID:2025{{ auth.user.user_id }}</p>
                        <p class="text-secondary">{{ auth.user.user_description }}</p>
                    </div>
                </div>
                <div class="mt-2 pe-3">
                    <button class="btn-outline-gray me-3">Hủy</button>
                    <button @click="changeInfoApi()" class="btn-alert">Lưu thay đổi</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-8">
                <div class="profile-info">
                    <!-- Tabs -->
                    <el-tabs class="tab-diable__line" v-model="activeTab">
                        <el-tab-pane label="Thông tin cá nhân" name="personal">
                            <div class="mt-3">
                                <el-form class="form-infomation" :model="user" label-width="200px">
                                    <el-form-item label="Tên tài khoản">
                                        <el-input v-model="user.username"></el-input>
                                    </el-form-item>

                                    <el-form-item label="Giới tính">
                                        <el-select v-model="user.gender" placeholder="Chọn giới tính">
                                            <el-option label="Nam" value="male"></el-option>
                                            <el-option label="Nữ" value="female"></el-option>
                                            <el-option label="Khác" value="other"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="Ảnh đại diện">
                                        <div class="d-flex edit-avatar" style="align-items: center; gap: 10px;">
                                            <img :src="user.link_thumbnail || defaultAvatar" alt="Avatar"
                                                style="width: 100px; height: 100px; border-radius: 10px; object-fit: cover;" />

                                            <div class="d-flex" style="gap: 10px;">
                                                <el-button type="text" @click="removeAvatar">Xóa</el-button>

                                                <el-upload ref="uploadRef" class="upload-demo" :limit="1"
                                                    :auto-upload="false" :on-change="handleAvatarChange"
                                                    accept="image/*">
                                                    <template #trigger>
                                                        <el-button type="text">Thay đổi</el-button>
                                                    </template>
                                                </el-upload>
                                            </div>
                                        </div>
                                    </el-form-item>

                                    <el-form-item label="Tiểu sử">
                                        <el-input class="user-description" type="textarea"
                                            v-model="user.user_description"
                                            placeholder="Mô tả một chút về bản thân bạn nhé!" :maxlength="1000"
                                            show-word-limit>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="Cấp độ" name="level">
                            <el-descriptions :column="1" label-width="200px">
                                <el-descriptions-item>
                                    <template #label>
                                        <p class="d-flex align-items-center gap-1 fw-bold">
                                            Cấp độ người đọc
                                            <el-tooltip class="box-item" effect="dark"
                                                content="<p>Để lên hạng Cấp 2 (Độc giả Tiềm Năng)<br> và được tặng 50 Tang Diệp, bạn cần đạt <br>1000 điểm đọc.</p>"
                                                placement="top-start" raw-content>
                                                <el-icon>
                                                    <InfoFilled />
                                                </el-icon>
                                            </el-tooltip>
                                        </p>
                                    </template>
                                    Cấp 1 (Độc giả mới)</el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <p class="d-flex align-items-center gap-1 fw-bold">
                                            Cấp độ tác giả
                                            <el-tooltip class="box-item" effect="dark"
                                                content="<p>Để lên hạng Cấp 1 (Tân Bút)<br> và tác phẩm được ưu tiên hiển thị và quảng bá, <br> bạn cần đăng ít nhất 1 chương truyện.</p>"
                                                placement="top-start" raw-content>
                                                <el-icon>
                                                    <InfoFilled />
                                                </el-icon>
                                            </el-tooltip>
                                        </p>
                                    </template>Chưa có</el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <p class="d-flex align-items-center gap-1 fw-bold">
                                            Số Tang Diệp đang có
                                        </p>
                                    </template><span>
                                        {{ user.coin_balance }} <img src="@/assets/icon/tamdiep-icon.png">
                                    </span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-tab-pane>

                        <el-tab-pane label="Tài khoản & Bảo mật" name="account">
                            <el-form :model="otherInfo" label-position="left" label-width="200px"
                                class="form-infomation">
                                <el-form-item label="Email">
                                    <el-input disabled v-model="otherInfo.email" placeholder="Nhập email"></el-input>
                                </el-form-item>
                                <el-form-item label="Số điện thoại">
                                    <el-input v-model="otherInfo.phone" placeholder="Nhập số điện thoại"></el-input>
                                </el-form-item>
                                <div v-if="changPasswordOpen">
                                    <el-form-item label="Mật khẩu">
                                        <el-input v-model="otherInfo.password" type="password" show-password
                                            placeholder="Nhập mật khẩu">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="Mật khẩu mới">
                                        <el-input v-model="otherInfo.newPassword" type="password" show-password
                                            placeholder="Nhập mật khẩu mới">
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item label="Xác nhận mật khẩu">
                                        <el-input v-model="otherInfo.confirmPassword" type="password" show-password
                                            placeholder="Xác nhận mật khẩu">
                                        </el-input>
                                    </el-form-item>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span @click="changPasswordOpen = !changPasswordOpen" class="text-link">
                                        {{ changPasswordOpen ? "Hủy bỏ" : "Đổi mật khẩu" }}
                                    </span>
                                    <button v-if="changPasswordOpen" class="btn-alert" @click=" updatePassword()">
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <!-- User info -->

    </div>
</template>

<script setup>
import LoadingSpiner from '@/components/loadding/LoadingSpiner.vue';
import { reactive, ref, watch, onMounted } from 'vue';
import { ElAvatar, ElButton, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus';
import Infomation from '@/components/profile/Infomation.vue';
import { useAuthStore } from "@/stores/auth";
import { changePassword, updateUserInfo } from '@/api/users';
const auth = useAuthStore();
const loading = ref(false)
import { toast } from "vue3-toastify";
const activeTab = ref('personal');
const defaultAvatar = "https://cdn-icons-png.freepik.com/512/3607/3607444.png";
const changPasswordOpen = ref(false)
const uploadRef = ref(null)
const avatarFile = ref(null);
const formUser = reactive({
    user_id: null,
    username: "",
    gender: "",
    link_thumbnail: "",
    user_description: "",
    coin_balance: 0,
    email: "",
    phone_number: "",
});
const user = reactive({
    id: 727457,
    username: "user",
    gender: 'male',
    link_thumbnail: "",
    user_description: ''
});
const otherInfo = reactive({
    email: "admin@gmail.com",
    phone: '0972183635',
    password: '',
    newPassword: '',
    confirmPassword: ''
})
const formPassword = reactive({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
});
const changeAvatar = () => {
    alert('Chức năng thay đổi avatar');
};

const removeAvatar = () => {
    user.link_thumbnail = defaultAvatar;
    toast.info("Ảnh đại diện đã được đặt về mặc định");
}
const handleAvatarChange = (file) => {
    avatarFile.value = file.raw;
    const imageUrl = URL.createObjectURL(file.raw);
    user.link_thumbnail = imageUrl;
    uploadRef.value?.clearFiles();
};
function loadUserInfo() {
    const newUser = auth.user;
    if (newUser) {
        user.id = newUser.user_id;
        user.username = newUser.username;
        user.gender = newUser.gender;
        user.link_thumbnail = newUser.link_thumbnail || "https://cdn-icons-png.freepik.com/512/3607/3607444.png";
        user.user_description = newUser.user_description;
        user.coin_balance = newUser.coin_balance;
        otherInfo.email = newUser.email,
            otherInfo.phone = newUser.phone_number
        Object.assign(formUser, JSON.parse(JSON.stringify(newUser)));
    }
}
const changeInfoApi = async () => {
    loading.value = true
    try {
        // Gộp thông tin user vào object
        formUser.phone_number = otherInfo.phone;
        formUser.user_description = user.user_description;
        formUser.gender = user.gender;
        formUser.username = user.username;
        let payload;

        // ✅ Nếu có ảnh mới → gửi dạng FormData
        if (avatarFile.value) {
            payload = new FormData();
            for (const key in formUser) {
                payload.append(key, formUser[key]);
            }
            payload.append("link_thumbnail", avatarFile.value);
        }
        // ✅ Nếu không có ảnh → gửi JSON thông thường
        else {
            payload = formUser;
        }
        const res = await updateUserInfo(payload);
        loading.value = false
        toast.success(res.message);


    } catch (err) {
        console.error(err);
        toast.error(err.message || "Cập nhật thất bại");
        loading.value = false
    }
};
const updatePassword = async () => {
    formPassword.oldPassword = otherInfo.password
    formPassword.newPassword = otherInfo.newPassword
    formPassword.confirmPassword = otherInfo.confirmPassword
    const res = await changePassword(formPassword)
    toast(res.message)

}
onMounted(() => {
    loadUserInfo();
})
// watch(
//     () => auth.user,
//     (newUser) => {
//         if (newUser) {
//             user.id = newUser.user_id;
//             user.username = newUser.username;
//             user.gender = newUser.gender;
//             user.link_thumbnail = newUser.link_thumbnail;
//             user.user_description = newUser.user_description;
//             user.coin_balance = newUser.coin_balance;
//             otherInfo.email = newUser.email,
//             otherInfo.phone = newUser.phone_number
//             Object.assign(formUser, JSON.parse(JSON.stringify(newUser)));
//         }
//         else {
//             Object.keys(formUser).forEach((k) => (formUser[k] = ""));
//         }
//     },
//     { immediate: true } // chạy luôn lần đầu
// );
</script>
<style>
.form-infomation .el-form-item--label-right .el-form-item__label {
    justify-content: flex-start !important;
}

.form-infomation .el-form-item__label {
    font-weight: bold !important;
    color: #344054;

}

.user-description .el-textarea__inner {
    height: 150px;
}

.tab-diable__line .el-tabs__nav-wrap:after,
.tab-diable__line .el-tabs__active-bar {
    display: none !important;
}

.tab-diable__line .el-tabs__item {
    font-weight: 400;
    font-size: 16px;
}

.tab-diable__line .el-tabs__item.is-active {
    color: #BF2C24;
}

.tab-diable__line .el-tabs__item.is-active,
.el-tabs__item:hover {
    color: #BF2C24;
}
</style>
<style scoped>
.profile-info {
    margin-top: -30px;
}

.infomation {
    display: flex;
    justify-content: space-between;
}

.infomation_avatar {
    padding: 0 50px;
    gap: 10px;
}

.edit-avatar {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.edit-avatar img {
    max-width: 70px;
    border-radius: 50%;
}

.infomation_avatar img {
    width: 150px;
    height: 150px;
    border: solid 3px #fff;
    border-radius: 50%;
    position: relative;
    top: -50px;

}
.btn-outline-gray {
  border: solid 1px #E4E7Ec;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 16px;
  background: none;
  color: #3f5a93;
}
.btn-outline:hover {
  background-color: #3f5a93;
  cursor: pointer;
  color: #fff;
}

</style>
