export function useSelectedPosts(
   posts: Ref<PostInterface[]>,
   search: Ref<string>
) {
   return computed(() => {
      if (!search.value) return posts.value;
      return posts.value.filter((post) =>
         post.title.toLowerCase().includes(search.value.toLowerCase())
      );
   });
}

export function useFindOnePost(id: string) {
   const store = usePostsStore();
   const { posts } = storeToRefs(store);
   return computed(() => posts.value.find((post) => post.id === id));
}
