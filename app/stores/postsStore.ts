import { defineStore, skipHydrate } from "pinia";
import { useStorage } from "@vueuse/core";

export const usePostsStore = defineStore("posts", () => {
   const posts = useStorage<PostInterface[]>("posts", initialPosts);

   function addPost(title: string, content: string) {
      posts.value = [
         {
            id: crypto.randomUUID(),
            title,
            content,
         },
         ...posts.value,
      ];
   }

   function editPost(id: string, newContent: string) {
      const post = posts.value.find((item) => item.id === id);
      if (post) post.content = newContent;
   }

   function deletePost(id: string) {
      posts.value = posts.value.filter((item) => item.id !== id);
   }

   return { posts: skipHydrate(posts), addPost, editPost, deletePost };
});
