<template>
  <div class="w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
    <h2 class="text-lg font-semibold mb-2">{{ status }}</h2>
    <div class="space-y-2">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="bg-white p-4 rounded shadow-md"
        draggable="true"
        @dragstart="onDragStart(task)"
        @dragend="onDragEnd"
      >
        <TaskCard :task="task" @edit="openFormForEditing" />
      </div>
    </div>
    <div
      class="mt-4 p-8 bg-gray-200 border-dashed border border-gray-400"
      @dragover.prevent
      @drop="onDrop"
    >
      Drop tasks here
    </div>
    <TaskForm
      v-if="isFormOpen"
      :task="formTask"
      @close="closeForm"
      @save="saveTask"
    />
    <button @click="openForm" class="mt-4 px-4 py-2 rounded">
      <span class="font-semibold text-xl mr-2">+</span>
      <span class="font-semibold text-xl">Add Card</span>
    </button>
  </div>
</template>

<script setup>
import TaskCard from '@/components/TaskCard.vue';
import TaskForm from '@/components/TaskForm.vue';

import { useTaskStore } from '@/stores/taskStore';

const props = defineProps({
  status: String,
});

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasksByStatus(props.status));

const isFormOpen = ref(false);
const formTask = ref({
  id: null,
  title: "",
  description: "",
  assignee: "",
  executors: [],
  status: props.status,
  priority: "Low",
});

const openForm = () => {
  formTask.value = {
    id: null,
    title: "",
    description: "",
    assignee: "",
    executors: [],
    status: props.status,
    priority: "Low",
  };
  isFormOpen.value = true;
};

const closeForm = () => {
  isFormOpen.value = false;
};

const saveTask = (task) => {
  if (task.id) {
    taskStore.updateTask(task.id, task);
  } else {
    taskStore.addTask(task);
  }
  closeForm();
};

const openFormForEditing = (taskId) => {
  const task = taskStore.tasks.find(t => t.id === taskId);
  if (task) {
    formTask.value = { ...task };
    isFormOpen.value = true;
  }
};

const onDragStart = (task) => {
  taskStore.draggedTask = task;
};

const onDrop = () => {
  if (taskStore.draggedTask) {
    taskStore.moveTask(taskStore.draggedTask.id, props.status);
    taskStore.draggedTask = null;
  }
};

const onDragEnd = () => {
  taskStore.draggedTask = null;
};
</script>

<style scoped>
.column {
  border-radius: 12px;
}
</style>
