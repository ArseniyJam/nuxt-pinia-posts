<script setup lang="ts">
import Pagination from "~/components/pagination.vue";

const titleToFind = ref<string>("");

const postsStore = usePostsStore();
const { posts } = storeToRefs(postsStore);

const { currentPage, totalPages, paginatedPosts } = usePaginatedPosts(
   posts,
   titleToFind,
   3
);
</script>

<template>
   <div class="flex flex-col items-center gap-6">
      <AddPost />
      <Search v-model="titleToFind" />
      <client-only>
         <CardContainer :posts="paginatedPosts" />
      </client-only>
      <Pagination v-model="currentPage" :totalPages />
   </div>
</template>
