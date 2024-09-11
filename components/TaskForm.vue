<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">{{ task.id ? 'Edit Task' : 'Add Task' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="task.title"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="task.description"
            rows="3"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Assignee</label>
          <input
            v-model="task.assignee"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Executors</label>
          <input
            v-model="task.executors"
            type="text"
            placeholder="Comma separated"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Priority</label>
          <select v-model="task.priority" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  task: Object
})

const emit = defineEmits(['close', 'save'])

const task = ref({ ...props.task })

watch(() => props.task, (newTask) => {
  task.value = { ...newTask }
}, { deep: true })

const submitForm = () => {
  emit('save', task.value)
}
</script>
