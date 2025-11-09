<script setup lang="ts">
const model = defineModel();
</script>

<template>
   <input
      v-model="model"
      type="text"
      class="border border-slate-400 rounded-lg px-3 py-1 absolute top-9 -translate-y-1/2 right-20 w-[300px]"
      placeholder="поиск по заголовку..."
   />
</template>
