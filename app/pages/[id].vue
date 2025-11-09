<script setup lang="ts">
const id = useRoute().params.id as string;

const post = useFindOnePost(id);
console.log(post.value);
</script>

<template>
   <div class="flex flex-col items-center justify-center gap-10">
      <div class="font-bold text-3xl">{{ post?.title }}</div>
      <div class="text-3xl">{{ post?.content }}</div>
   </div>
</template>
