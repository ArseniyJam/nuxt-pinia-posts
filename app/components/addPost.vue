<script setup lang="ts">
const isOpen = ref<boolean>(false);

function close() {
   isOpen.value = false;
}
</script>

<template>
   <div v-if="isOpen" class="fixed inset-0 bg-black opacity-40 z-40"></div>
   <div
      v-if="isOpen"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[400px] bg-slate-800 rounded-2xl p-4"
   >
      <div>
         <button @click="isOpen = false" class="flex w-full justify-end">
            X
         </button>
         <AddPostForm :close />
      </div>
   </div>
   <div class="flex items-center justify-center gap-4">
      <button
         @click="isOpen = true"
         class="text-xl px-2 py-1 bg-sky-400 flex justify-center items-center rounded"
      >
         Создать свой
      </button>
   </div>
</template>
