<script setup lang="ts">
const { post } = defineProps<{
   post: PostInterface;
}>();

const { editPost, deletePost } = usePostsStore();

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref(post.content);

function handleInput(event: Event) {
   const target = event.target as HTMLInputElement;
   const newValue = target.value;

   if (newValue.trim().length >= 2) {
      inputValue.value = newValue;
      editPost(post.id, newValue);
   } else {
      target.value = inputValue.value;
   }
}

function handleBlur(event: FocusEvent) {
   const newTarget = event.relatedTarget as HTMLElement | null;
   if (newTarget?.id === "edit") return;
   isEditable.value = false;
}

const isEditable = ref(false);

function handleEditable() {
   isEditable.value = !isEditable.value;
   nextTick(() => inputRef.value?.focus());
}
</script>

<template>
   <div
      ref="wrapperRef"
      class="bg-slate-700 flex flex-col items-center gap-12 px-2 py-6 w-52 h-64 rounded-lg text-center relative"
   >
      <NuxtLink :to="post.id">
         <div class="text-xl font-bold">{{ post.title }}</div>
      </NuxtLink>
      <div class="text-lg" v-if="!isEditable">{{ post.content }}</div>
      <input
         @blur="handleBlur"
         ref="inputRef"
         @input="handleInput($event)"
         class="border p-1 overflow-visible rounded"
         v-if="isEditable"
         type="text"
         :value="inputValue"
      />
      <div class="flex gap-5 absolute bottom-6">
         <button
            id="edit"
            class="bg-indigo-500 py-1 px-2 rounded-xl w-20"
            @click="handleEditable"
         >
            Ред.
         </button>
         <button
            @click="deletePost(post.id)"
            class="bg-red-500 py-1 px-2 rounded-xl w-20"
         >
            Удалить
         </button>
      </div>
   </div>
</template>
