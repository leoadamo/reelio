<script setup>
// DEPENDENCIES
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";

// COMPONENTS
import { XMarkIcon } from "@heroicons/vue/24/solid";

// EMITS
const emit = defineEmits(["confirm", "close"]);

// PROPS
defineProps({
  title: {
    type: String,
    default: "",
  },

  closeLabel: {
    type: String,
    default: "Cancel",
  },

  confirmLabel: {
    type: String,
    default: "Confirm",
  },

  hasDefaultFooter: {
    type: Boolean,
    default: true,
  },
});

// REFS
const shouldRender = ref(false);

// METHODS
/**
 * It mounts the modal in order to keep transition working.
 */
async function mount() {
  await nextTick();

  shouldRender.value = true;
}

/**
 * It unmounts the modal in order to keep transition working.
 */
async function unmount() {
  shouldRender.value = false;

  await nextTick();

  emit("close");
}

// LIFECYCLE HOOKS
onMounted(mount);
onBeforeUnmount(unmount);

// PUBLIC METHODS
defineExpose({
  mount,
  unmount,
});
</script>

<template>
  <transition>
    <div
      v-if="shouldRender"
      class="fixed inset-0 grid place-content-center w-full h-full backdrop-blur-sm bg-gray-900/50 z-20"
      @keyup.esc="unmount"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        class="relative w-[600px] bg-gray-800 text-white overflow-visible border border-gray-800 shadow-lg"
      >
        <button
          type="button"
          name="close"
          class="absolute -top-1 -right-9 transition-colors hover:text-red-500"
          @click="unmount"
        >
          <span class="sr-only">Close</span>
          <x-mark-icon class="w-7 h-7" />
        </button>

        <header
          v-if="title || $slots.header"
          class="p-3 text-lg font-bold bg-gray-900"
        >
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>

        <main class="p-3">
          <slot />
        </main>

        <footer v-if="hasDefaultFooter" class="flex justify-between p-3">
          <slot name="footer">
            <button
              type="button"
              name="cancel"
              class="app-button app-button--secondary"
              @click="unmount"
            >
              {{ closeLabel }}
            </button>

            <button
              type="button"
              name="confirm"
              class="app-button app-button--primary"
              @click="$emit('confirm')"
            >
              {{ confirmLabel }}
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active,
.v-enter-active [role="alertdialog"],
.v-leave-active [role="alertdialog"] {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from [role="alertdialog"],
.v-leave-to [role="alertdialog"] {
  transform: translateY(-50px);
}
</style>
