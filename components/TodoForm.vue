<template>
  <form @submit.prevent="addTodo" class="todo-form">
    <div class="input-group">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="新しいタスクを入力してください..."
        class="todo-input"
        :disabled="isSubmitting"
        ref="todoInput"
      />
      <button
        type="submit"
        class="add-btn"
        :disabled="!newTodoText.trim() || isSubmitting"
      >
        <svg v-if="!isSubmitting" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <div v-else class="loading-spinner"></div>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'add', text: string): void
}

const emit = defineEmits<Emits>()

const newTodoText = ref('')
const isSubmitting = ref(false)
const todoInput = ref<HTMLInputElement>()

const addTodo = async () => {
  const trimmedText = newTodoText.value.trim()
  if (!trimmedText) return

  isSubmitting.value = true
  
  try {
    emit('add', trimmedText)
    newTodoText.value = ''
    todoInput.value?.focus()
  } finally {
    isSubmitting.value = false
  }
}

// コンポーネントがマウントされたときにフォーカスを設定
onMounted(() => {
  todoInput.value?.focus()
})
</script>

<style scoped>
.todo-form {
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  background: white;
}

.todo-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.todo-input:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
}

.add-btn:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.add-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 