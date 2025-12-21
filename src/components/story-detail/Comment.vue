<template>
    <div class="mt-4">
        <InputComment :story_id="Number(props.story_id)" />
    </div>
    <PostCommentStory v-for="value in listComment" :comment_id="value.comment_id" :like="value.like" :user="value.username"
        :user_thumbnail="value.link_thumbnail" :comment="value.content" :date="value.created_at" />


</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import InputComment from './InputCommentStory.vue';
import PostCommentStory from "./PostCommentStory.vue";
import { getStoryComment } from "@/api/stories";
const props = defineProps({
    story_id: {
        type: [Number, String],
        default: () => []
    },
});
async function getComment() {
    const res = await getStoryComment(Number(props.story_id))
    listComment.value = res.data;
    console.log(listComment.value);
    
}
onMounted(async () => {

    await getComment();


});
const listComment = ref([])
</script>

<style></style>