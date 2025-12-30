<template>
    <div v-if="userData" class="profile-page container">
        <!-- Header banner -->
        <div class="profile-banner container" style="position: relative;">
            <img src="@/assets/image/profile-cover-photo.png" class="w-100 rounded"
                style="height: 200px; object-fit: cover;">
            <!-- Avatar -->
            <div class="d-flex infomation">
                <div class="d-flex infomation_avatar">
                    <div>
                        <img :src="userData.link_thumbnail" alt="" srcset="">
                    </div>
                    <div class="mt--50-mb">
                        <h2 class="fw-bold text-color_primary mt-2">{{ userData.username }}</h2>
                        <p class="text-secondary">ID: 2025{{ userData?.user_id }}</p>
                        <p class="text-secondary">{{ userData?.user_description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row align-items-start gx-3">
                <div class="col-md-3 ">
                    <div class="user-info">
                        <h4 class="title-info">Thông tin cơ bản</h4>
                        <ul>
                            <li><span>Username:</span> {{ userData.username }}</li>
                            <li><span>Giới tính: </span>{{ userData.gender === 'male' ? 'nam' : 'nữ' }}</li>
                            <li><span>Tham gia vào: </span>{{ (userData.created_at).split('T')[[0]] }}</li>
                            <li><span>Cấp độ người đọc: </span>{{ 'Cấp 1' }}</li>
                            <li><span>Cấp độ tác giả: </span>{{ 'Chưa có ' }}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class=" story-info mt-4 mt-md-0">
                        <h4 class="title-info d-flex align-items-center gap-2">
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.9999 23.8333H6.06659C4.7598 23.8333 4.1064 23.8333 3.60727 23.579C3.16823 23.3553 2.81127 22.9983 2.58757 22.5593C2.33325 22.0601 2.33325 21.4067 2.33325 20.1V8.89996C2.33325 7.59317 2.33325 6.93978 2.58757 6.44065C2.81127 6.0016 3.16823 5.64465 3.60727 5.42094C4.1064 5.16663 4.7598 5.16663 6.06659 5.16663H6.53325C9.14683 5.16663 10.4536 5.16663 11.4519 5.67526C12.33 6.12267 13.0439 6.83658 13.4913 7.71467C13.9999 8.71292 13.9999 10.0197 13.9999 12.6333M13.9999 23.8333V12.6333M13.9999 23.8333H21.9333C23.24 23.8333 23.8934 23.8333 24.3926 23.579C24.8316 23.3553 25.1886 22.9983 25.4123 22.5593C25.6666 22.0601 25.6666 21.4067 25.6666 20.1V8.89996C25.6666 7.59317 25.6666 6.93978 25.4123 6.44065C25.1886 6.0016 24.8316 5.64465 24.3926 5.42094C23.8934 5.16663 23.24 5.16663 21.9333 5.16663H21.4666C18.853 5.16663 17.5462 5.16663 16.548 5.67526C15.6699 6.12267 14.956 6.83658 14.5086 7.71467C13.9999 8.71292 13.9999 10.0197 13.9999 12.6333"
                                    stroke="#BF2C24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Truyện đã xuất bản
                        </h4>
                        <ListStory :userId="userData.user_id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ListStory from './ListStoryUser.vue';
import { reactive, ref, watch, onMounted } from 'vue';
import { getUserInfomation } from '@/api/other.user';
import { useRoute } from 'vue-router'
const userData = ref()
const route = useRoute()
async function getUserInfo() {
    const res = await getUserInfomation(route.params.id)
    userData.value = (res.data);
    console.log(userData.value);


}
function formatDateTime(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes} ${day}/${month}`;
}
onMounted(() => {
    getUserInfo()
})
</script>
<style scoped>
.profile-info {
    margin-top: -30px;
}

.infomation_avatar {
    padding: 0px 30px;
}

.user-info {
    padding: 20px 30px;
    border: solid 1px #E4E7EC;
    border-radius: 15px;
    box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.25);

}

.story-info {
    padding: 20px 30px;
    border: solid 1px #E4E7EC;
    box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.25);
    margin-bottom: 30px;
    border-radius: 15px;
}

.title-info {
    color: #BF2C24;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 20px;
}

.user-info ul {
    list-style-type: none;
    padding: 0;
}

.user-info ul li {
    padding: 5px 0;
    font-size: 16px;
}

.user-info ul li span {
    font-weight: bold
}

.infomation {
    display: flex;
    justify-content: space-between;
}

.infomation_avatar {

    gap: 10px;
}

.edit-avatar {
    width: 100%;
    display: flex;
    justify-content: space-between;
}


.infomation_avatar img {
    width: 150px;
    height: 150px;
    border: solid 3px #fff;
    border-radius: 50%;
    position: relative;
    top: -50px;

}

@media (max-width: 768px) {
    .infomation_avatar {
        flex-direction: column;
        padding-bottom: 20px;
    }

    .mt--50-mb {
        margin-top: -50px;
    }
    .title-info
    {
        padding: 0px 10px;
    }
    .story-info {
        padding: 20px 5px;
        border: solid 1px #E4E7EC;
        box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.25);
        margin-bottom: 30px;
        border-radius: 15px;
    }

}
</style>
