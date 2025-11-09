export function usePaginatedPosts(
   posts: Ref<PostInterface[]>,
   search: Ref<string>,
   pageSize = 3
) {
   const currentPage = ref(1);

   const filteredPosts = usePostsFiltered(posts, search, "content");

   const totalPages = computed(() =>
      Math.ceil(filteredPosts.value.length / pageSize)
   );

   const paginatedPosts = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      return filteredPosts.value.slice(start, start + pageSize);
   });

   watch(search, () => {
      currentPage.value = 1;
   });

   return {
      currentPage,
      totalPages,
      paginatedPosts,
   };
}
