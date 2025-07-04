<template>
  <div
    class="w-full max-w-[1180px] min-h-dvh px-4 py-8 mx-auto flex flex-col items-center justify-center"
    data-testid="app"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
