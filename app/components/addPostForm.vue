<script setup lang="ts">
import { configure, defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { required, max } from "@vee-validate/rules";
import { ref } from "vue";

interface FormValues {
   title: string;
   content: string;
}

defineRule("required", required);
defineRule("max", max);

const values = ref<FormValues>({
   title: "",
   content: "",
});

const titleRules = "required|max:12";
const contentRules = "required|max:25";

configure({
   generateMessage: (ctx) => {
      const params = ctx.rule?.params as unknown[] | undefined;
      const firstParam = params?.[0];

      const messages: Record<string, string> = {
         required: `Поле "${ctx.field}" обязательно к заполнению`,
         max: `Поле "${ctx.field}" не должно превышать ${firstParam} символов`,
      };

      return messages[ctx.rule?.name ?? ""] || `Ошибка в поле ${ctx.field}`;
   },
});

// Submit

const { close } = defineProps<{
   close: () => void;
}>();

const { addPost } = usePostsStore();

function onSubmit() {
   addPost(values.value.title, values.value.content);
   close();
}
</script>

<template>
   <client-only>
      <Form @submit="onSubmit" class="flex flex-col gap-4">
         <div class="flex flex-col items-center">
            <label for="title">Название поста</label>
            <Field
               type="text"
               id="title"
               name="title"
               v-model="values.title"
               :rules="titleRules"
               class="border rounded p-2"
            />
            <ErrorMessage name="title" class="text-red-500 text-sm" />
         </div>

         <div class="flex flex-col items-center">
            <label for="content">Описание поста</label>
            <Field
               type="text"
               id="content"
               name="content"
               v-model="values.content"
               :rules="contentRules"
               class="border rounded p-2"
            />
            <ErrorMessage name="content" class="text-red-500 text-sm" />
         </div>

         <button type="submit" class="px-4 py-2 bg-sky-500 text-white rounded">
            Отправить
         </button>
      </Form>
   </client-only>
</template>
