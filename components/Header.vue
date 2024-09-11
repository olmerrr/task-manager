<template>
  <header
    class="bg-white bg-opacity-40 w-full py-6 px-6 flex items-center justify-between shadow-md mb-8"
  >
    <div class="flex items-center space-x-8">
      <span class="text-xl font-bold">Logo</span>

      <span class="text-yellow-500 text-lg">★</span>

      <div class="flex items-center space-x-2">
        <span class="text-gray-600 text-xl">🔒</span>
        <span class="text-gray-600">Private</span>
      </div>

      <div
        class="flex items-center space-x-2 ml-auto"
        :class="{
          'text-white border-2 border-gray-800 bg-opacity-90 bg-gray-800 px-4 py-2 rounded':
            isActive,
          'text-gray-800': !isActive,
        }"
      >
        <span class="text-gray-600 text-xl">📋</span>
        <span> Board </span>
      </div>
    </div>
  </header>
</template>

<script setup>
// data stub
const isActive = ref(true);
</script>
