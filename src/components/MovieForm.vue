<script setup>
// DEPENDENCIES
import { useTemplateRef, onMounted } from "vue";

// MODEL
defineModel("movie");

// REFS
const formRef = useTemplateRef("form");

// LIFECYCLE HOOKS
onMounted(() => {
  formRef.value?.querySelector("#name")?.focus();
});
</script>

<template>
  <form
    ref="form"
    action="dialog"
    class="grid grid-cols-1 gap-3 text-sm"
    @submit.prevent="$emit('update:movie', movie)"
  >
    <div class="flex flex-col gap-1">
      <label for="name">Name*</label>
      <input
        v-model="movie.name"
        type="text"
        id="name"
        name="name"
        required
        class="border rounded border-gray-400 bg-gray-900"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="description">Description*</label>
      <textarea
        v-model="movie.description"
        id="description"
        name="description"
        required
        class="resize-none border rounded border-gray-400 bg-gray-900"
        rows="3"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="image">Image*</label>
      <input
        v-model="movie.image"
        type="text"
        id="image"
        name="image"
        required
        class="border rounded border-gray-400 bg-gray-900"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="genres">Genres*</label>
      <select
        v-model="movie.genres"
        id="genres"
        name="genres"
        multiple
        required
        class="border rounded border-gray-400 bg-gray-900 overflow-auto"
      >
        <option value="drama">Drama</option>
        <option value="crime">Crime</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
      </select>
    </div>

    <div class="flex gap-2 items-center">
      <label for="theater">In theaters</label>
      <input
        v-model="movie.inTheaters"
        type="checkbox"
        id="theater"
        name="theater"
        class="border rounded border-gray-400 bg-gray-900"
      />
    </div>

    <footer class="flex items-center justify-between mt-8">
      <small class="text-xs italic font-medium">*Required fields.</small>

      <button
        name="submit"
        type="submit"
        class="app-button app-button--primary"
      >
        Submit
      </button>
    </footer>
  </form>
</template>
