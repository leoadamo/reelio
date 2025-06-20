<script setup>
// DEPENDENCIES
import { ref, computed, watchEffect, useTemplateRef } from "vue";

// COMPONENTS
import AppModal from "@/components/AppModal.vue";
import MovieForm from "@/components/MovieForm.vue";

// EMITS
const emit = defineEmits(["update:movie", "close"]);

// PROPS
const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
  },

  initialValue: {
    type: Object,
    default: () => ({
      name: "",
      description: "",
      image: "",
      trailer: "",
      genres: [],
      inTheaters: false,
    }),
  },
});

// REFS
const appModalRef = useTemplateRef("app-modal");

const form = ref({ ...props.initialValue });

// COMPUTED
const modalTitle = computed(() => (props.isNew ? "Add Movie" : "Update Movie"));

// WATCHERS
watchEffect(() => {
  form.value = { ...props.initialValue };
});

// METHODS
/**
 * It resets the form fields to its initial value.
 */
function resetFormFields() {
  form.value = {
    name: "",
    description: "",
    image: "",
    trailer: "",
    genres: [],
    inTheaters: false,
  };
}

/**
 * It updates the movie data.
 */
function handleUpdateMovie(movieData) {
  appModalRef.value.unmount();

  emit("update:movie", movieData);
}

/**
 * It closes the modal and resets the form fields.
 */
function handleClose() {
  resetFormFields();

  emit("close");
}
</script>

<template>
  <app-modal
    ref="app-modal"
    :title="modalTitle"
    :has-default-footer="false"
    @close="handleClose"
  >
    <movie-form v-model:movie="form" @update:movie="handleUpdateMovie" />
  </app-modal>
</template>
