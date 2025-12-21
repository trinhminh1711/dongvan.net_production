<template>
    <div class="main-comment">
        <div class="pb-2 pt-3 mt-3 d-flex align-items-start gap-3"
            :class="{ 'line-thread': commentReply.length > 0 }">
            <div class="post-main__info d-flex align-items-center justify-content-between gap-1">
                <img @click="goToProfile(user_id)" class="hover-pointer"
                    style="width: 50px; height:50px ; border-radius: 50%;" :src="user_thumbnail" alt="">
            </div>
            <div class="post-main__content text-14 flex-grow-1">
                <div class="post-content__info">
                    <div class="d-flex justify-content-between">
                        <p @click="goToProfile(user_id)" class="fw-bold hover-link text-14">{{ user }}</p>
                        <p class="text-14 pe-3">{{ timeAgo(date) }}</p>
                    </div>
                    <div class="text-14 mt-2" v-html="linkifyText(comment)"></div>
                </div>
                <div class="post-comment">
                    <p class="like-share d-flex gap-2 py-2 align-items-center">
                        <span @click="incrementLike()" class="d-flex align-items-center gap-2   text-md">
                            <svg :class="!isLiked ? 'heart-icon-unliked' : 'heart-icon-liked'" width="22" height="20"
                                viewBox="0 0 20 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.99431 3.27985C8.32819 1.332 5.54981 0.808035 3.46227 2.59168C1.37472 4.37532 1.08083 7.35748 2.72019 9.467C4.0832 11.2209 8.20816 14.9201 9.5601 16.1174C9.71136 16.2513 9.78698 16.3183 9.8752 16.3446C9.95219 16.3676 10.0364 16.3676 10.1134 16.3446C10.2016 16.3183 10.2773 16.2513 10.4285 16.1174C11.7805 14.9201 15.9054 11.2209 17.2684 9.467C18.9078 7.35748 18.6498 4.35656 16.5264 2.59168C14.4029 0.826798 11.6604 1.332 9.99431 3.27985Z" />
                            </svg>
                            {{ listLikeComment?.total_likes }}
                        </span>
                        <span style="width: 5px; height: 5px; background-color: #E4E7EC; border-radius: 50%;"
                            class="dot"></span>
                        <span @click="replyCommentFunc()"
                            class="d-flex align-items-center text-md cursor-pointer gap-2">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.20864 10.6074C1.96452 10.3981 1.84246 10.2935 1.79774 10.169C1.75848 10.0598 1.75848 9.94022 1.79774 9.83095C1.84246 9.70645 1.96452 9.60183 2.20864 9.39258L10.6794 2.13196C11.0996 1.77176 11.3097 1.59166 11.4876 1.58725C11.6422 1.58342 11.7899 1.65134 11.8876 1.77122C12 1.90915 12 2.18589 12 2.73936V7.03462C14.1347 7.40807 16.0884 8.48974 17.5403 10.1139C19.1232 11.8845 19.9988 14.1759 20 16.551V17.1629C18.9507 15.8989 17.6405 14.8765 16.1592 14.1659C14.8533 13.5394 13.4416 13.1683 12 13.0705V17.2606C12 17.8141 12 18.0908 11.8876 18.2288C11.7899 18.3486 11.6422 18.4166 11.4876 18.4127C11.3097 18.4083 11.0996 18.2282 10.6794 17.868L2.20864 10.6074Z"
                                    stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Trả lời
                        </span>
                    </p>
                </div>
            </div>

        </div>
        <div class="ms-5-5">
            <div v-if="commentReply.length > 0" v-for="value in commentReply" class="pb-2 pt-3 reply-thread">
                <div class="post-main__info d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center">

                        <img @click="goToProfile(value.user_id)" class="cursor-pointer"
                            style="width: 50px; height:50px ; border-radius: 50%;" :src="value.link_thumbnail" alt="">
                    </div>
                    <div class="post-main__content text-14 flex-grow-1">
                        <div class="post-content__info">
                            <div class="d-flex justify-content-between">
                                <p @click="goToProfile(value.user_id)" class="fw-bold hover-link">{{ value.username }}
                                </p>
                                <p class="text-14 pe-3">{{ timeAgo(value.created_at) }}</p>
                            </div>
                            <div v-html="linkifyText(value.content)"></div>
                        </div>

                    </div>

                </div>
            </div>
            <PostCommentReplyStory @reload="getLikeComment()" :comment-id="props.comment_id" v-if="replyComment" />
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { increaseLike } from '@/api/storyComment';
import {getRepliesByComment} from '@/api/storyComment'
import { increaseLikePostComment, getListLikeComment } from "../../api/forum";
import { useAuthStore } from "@/stores/auth";
import { useLoginModal } from "@/stores/useLoginModal";
import { useRouter } from 'vue-router'
const router = useRouter()

const loginModal = useLoginModal()
import PostCommentReplyStory from "./PostCommentReplyStory.vue";
const auth = useAuthStore();
const userId = auth.userId || null
const isLiked = ref(false)
const replyComment = ref(false)
const listLikeComment = ref()
const commentReply = ref([])
const props = defineProps({
    user_thumbnail: {
        type: String,
    },
    user: {
        type: String,
    },
    user_id: {
        type: Number,
    },
    comment: {
        type: String,
    },
    date: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
    },
    comment_id: {
        type: Number,
    }
})
function linkifyText(text) {
    if (!text) return "";
    // Regex tìm URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // Thay thế link bằng thẻ a
    return text.replace(
        urlRegex,
        (url) => `<a href="${url}" target="_blank" style="color:#3498db; text-decoration:underline;">${url}</a>`
    );
}
const localLike = ref(props.like);
function replyCommentFunc() {
    if (auth.userId) {
        replyComment.value = true
    }
    else {
        loginModal.open()
    }

}
async function getLikeComment() {
    const res = await getRepliesByComment(props.comment_id);
    listLikeComment.value = res    
    // isLiked.value = res.liked_users.some(
    //     (u) => u.user_id == auth.userId
    // );
    commentReply.value = (res.replies);
    console.log(res.replies);
    
    replyComment.value = false
}
async function incrementLike() {
    localLike.value += 1;
    const res = await increaseLikePostComment(props.comment_id, userId)
    getLikeComment()
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
function goToProfile(params) {
    router.push({ name: 'user', params: { id: params } })
}
onMounted(() => {
    getLikeComment()
})
</script>

<style scoped>
.box-shadow {
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    border: solid 1px #e7e7e7;
}

.heart-icon-unliked {
    color: #667085;
    /* màu xám mặc định */
    cursor: pointer;
    transition: color 0.3s;
}

.heart-icon-liked {
    color: red;
    /* màu xám mặc định */
    cursor: pointer;
    transition: color 0.3s;
}

.heart-icon-unliked:hover {
    color: red;
    /* khi hover đổi sang đỏ */
}

.post-main__content {
    line-height: 1.5rem;

}

.post-main__content .post-content__info {
    background-color: #F9FAFB;
    border-radius: 10px;
    padding: 10px 20px;
}
</style>