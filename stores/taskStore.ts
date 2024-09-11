import { defineStore } from 'pinia';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  executors: string[];
  status: 'TODO' | 'In progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    nextId: 1,
    draggedTask: null as Task | null,
  }),
  actions: {
    addTask(task: Omit<Task, 'id'>) {
      this.tasks.push({ ...task, id: this.nextId++ });
    },
    updateTask(id: number, updatedTask: Partial<Task>) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        Object.assign(task, updatedTask);
      }
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    moveTask(id: number, newStatus: 'TODO' | 'In progress' | 'Done') {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
    // mock data
    initializeTasks() {
      this.tasks = [
        { id: this.nextId++, title: 'Buy coffee', description: 'Purchase coffee beans', assignee: 'Alice', executors: [], status: 'TODO', priority: 'Medium' },
        { id: this.nextId++, title: 'Walk the dog', description: 'Take the dog for a walk in the park', assignee: 'Bob', executors: [], status: 'TODO', priority: 'High' },
        { id: this.nextId++, title: 'Complete project', description: 'Finish the project work before the deadline', assignee: 'Charlie', executors: ['Alice'], status: 'In progress', priority: 'High' },
        { id: this.nextId++, title: 'Read a book', description: 'Read the new book I bought', assignee: 'Alice', executors: [], status: 'Done', priority: 'Low' },
      ];
    }
  },
  getters: {
    tasksByStatus: (state) => {
      return (status: 'TODO' | 'In progress' | 'Done') => state.tasks.filter(task => task.status === status);
    }
  }
});
