<script setup lang="ts">
const { posts } = defineProps<{
   posts: PostInterface[];
}>();
</script>

<template>
   <div class="flex flex-wrap gap-4 justify-center max-w-[700px]">
      <div v-if="!posts.length">Ничего нет...</div>

      <Card v-for="post in posts" :key="post.id" :post />
   </div>
</template>
