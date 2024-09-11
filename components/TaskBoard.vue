<template>
  <div class="flex space-x-6 container mx-auto p-4">
    <Column status="TODO" />
    <Column status="In progress" />
    <Column status="Done" />
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';
// mock data
const taskStore = useTaskStore();

onMounted(() => {
  taskStore.initializeTasks();
});
</script>
