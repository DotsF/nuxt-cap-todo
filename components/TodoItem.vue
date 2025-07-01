<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleComplete"
        class="todo-checkbox"
      />
      <span v-if="!isEditing" class="todo-text" @dblclick="startEdit">
        {{ todo.text }}
      </span>
      <input
        v-else
        v-model="editText"
        @blur="saveEdit"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        class="todo-edit-input"
        ref="editInput"
      />
    </div>
    <button @click="deleteTodo" class="delete-btn" title="削除">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

interface Props {
  todo: Todo
}

interface Emits {
  (e: 'update', todo: Todo): void
  (e: 'delete', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEditing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement>()

const toggleComplete = () => {
  emit('update', {
    ...props.todo,
    completed: !props.todo.completed
  })
}

const startEdit = () => {
  if (!props.todo.completed) {
    isEditing.value = true
    editText.value = props.todo.text
    nextTick(() => {
      editInput.value?.focus()
    })
  }
}

const saveEdit = () => {
  const trimmedText = editText.value.trim()
  if (trimmedText && trimmedText !== props.todo.text) {
    emit('update', {
      ...props.todo,
      text: trimmedText
    })
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = props.todo.text
}

const deleteTodo = () => {
  emit('delete', props.todo.id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.todo-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.todo-item.completed {
  opacity: 0.7;
  background: #f8f9fa;
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  color: #374151;
  cursor: pointer;
  word-break: break-word;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-edit-input {
  flex: 1;
  font-size: 16px;
  padding: 4px 8px;
  border: 2px solid #3b82f6;
  border-radius: 4px;
  outline: none;
}

.delete-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  background: #fef2f2;
  color: #dc2626;
}
</style> 