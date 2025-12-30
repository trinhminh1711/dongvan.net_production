<template>
    <div class="box-shadow px-3 pb-2 pt-3 mt-3">
        <div class="post-main__info d-flex align-items-center justify-content-between gap-1">
            <div class="d-flex align-items-center">
                <img style="width: 50px; height:50px ;" alt="">
                <p class="ms-3 fw-bold">{{ props.commentReplies }}</p>
            </div>
            <div class="date-comment">
                <p class="text-14 pe-3"></p>
            </div>
        </div>
        <div class="post-main__content text-sm ps-5 pe-3">

            <div class="post-comment">
                <p class="like-share d-flex gap-4 py-2">
                    <span @click="" class="d-flex align-items-center gap-2 text-md">
                        <svg :class="isLiked ? 'heart-icon-liked' : 'heart-icon-unliked'" width="20" height="18"
                            viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.49486 2.60369C6.99535 0.850631 4.49481 0.379063 2.61602 1.98434C0.737233 3.58962 0.472726 6.27356 1.94815 8.17213C3.17486 9.75066 6.88733 13.0799 8.10408 14.1575C8.2402 14.278 8.30827 14.3383 8.38766 14.362C8.45695 14.3826 8.53277 14.3826 8.60207 14.362C8.68146 14.3383 8.74952 14.278 8.88565 14.1575C10.1024 13.0799 13.8149 9.75066 15.0416 8.17213C16.517 6.27356 16.2848 3.57273 14.3737 1.98434C12.4626 0.395949 9.99438 0.850631 8.49486 2.60369Z"
                                :fill="isLiked ? '#E0245E' : 'none'" :stroke="isLiked ? '#E0245E' : '#667085'"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </span>

                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    commentReplies: {
        type: Object,
    },
})
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
</script>

<style></style>