<script setup lang="ts">
const current = defineModel<number>();
const { totalPages } = defineProps<{
   totalPages: number;
}>();

const paginationNums = computed(() => {
   if (totalPages === 1) return [1];
   if (totalPages === 2) return [1, 2];
   return current.value === 1
      ? [current.value, current.value + 1, current.value + 2]
      : current.value === totalPages
      ? [current.value - 2, current.value - 1, current.value]
      : [current.value! - 1, current.value, current.value! + 1];
});

function handleClick(stream: "left" | "rigth") {
   const val = current.value as number;
   if (val > 1 && stream === "left") current.value = val - 1;

   if (val < totalPages && stream === "rigth") current.value = val + 1;
}
</script>

<template>
   <div class="flex gap-2">
      <button @click="handleClick('left')"><</button>
      <button
         v-for="num in paginationNums"
         @click="current = num"
         class="p-1 rounded"
         :class="{
            'bg-sky-400': current === num,
         }"
      >
         {{ num }}
      </button>
      <button @click="handleClick('rigth')">></button>
   </div>
</template>
