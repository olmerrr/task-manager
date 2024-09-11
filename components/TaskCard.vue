<template>
  <div class="p-4 bg-white">
    <h3 class="text-xl font-semibold">{{ task.title }}</h3>
    <p class="text-gray-600">{{ task.description }}</p>
    <p class="text-gray-500">Assignee: {{ task.assignee }}</p>
    <p class="text-gray-500">Priority: {{ task.priority }}</p>
    <button
      @click="editTask"
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded mr-2"
    >
      Edit
    </button>
    <button
      @click="deleteTask"
      class="mt-2 bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';

const props = defineProps({
  task: Object,
});

const emit = defineEmits(['edit']);

const taskStore = useTaskStore();

const editTask = () => {
  emit('edit', props.task.id);
};

const deleteTask = () => {
  taskStore.deleteTask(props.task.id);
};
</script>
