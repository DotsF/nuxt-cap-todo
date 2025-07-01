<template>
  <div class="todo-app">
    <header class="app-header">
      <h1 class="app-title">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 11H1l3-3-3-3h8v6z"/>
          <path d="M15 13h8l-3 3 3 3h-8v-6z"/>
          <path d="M12 2v20"/>
        </svg>
        Todo アプリ
      </h1>
      <p class="app-subtitle">シンプルで効率的なタスク管理</p>
    </header>

    <main class="app-main">
      <TodoForm @add="addTodo" />
      
      <TodoFilter
        :todos="todos"
        :current-filter="currentFilter"
        @update-filter="updateFilter"
        @clear-completed="clearCompleted"
      />
      
      <TodoList
        :todos="todos"
        :filter="currentFilter"
        @update="updateTodo"
        @delete="deleteTodo"
      />
    </main>

    <footer class="app-footer">
      <p class="footer-text">
        <span v-if="todos.length > 0">
          {{ completedCount }} / {{ todos.length }} のタスクが完了
        </span>
        <span v-else>
          タスクを追加して始めましょう！
        </span>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

const todos = ref<Todo[]>([])
const currentFilter = ref<'all' | 'active' | 'completed'>('all')
let nextId = 1

// ローカルストレージからデータを読み込み
onMounted(() => {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    try {
      const parsedTodos = JSON.parse(savedTodos)
      todos.value = parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }))
      
      // 最大IDを計算
      if (todos.value.length > 0) {
        nextId = Math.max(...todos.value.map(t => t.id)) + 1
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error)
    }
  }
})

// データをローカルストレージに保存
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

// 新しいTodoを追加
const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: nextId++,
    text,
    completed: false,
    createdAt: new Date()
  }
  
  todos.value.unshift(newTodo)
  saveTodos()
}

// Todoを更新
const updateTodo = (updatedTodo: Todo) => {
  const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
  if (index !== -1) {
    todos.value[index] = updatedTodo
    saveTodos()
  }
}

// Todoを削除
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  saveTodos()
}

// フィルターを更新
const updateFilter = (filter: 'all' | 'active' | 'completed') => {
  currentFilter.value = filter
}

// 完了済みのTodoを削除
const clearCompleted = () => {
  todos.value = todos.value.filter(todo => !todo.completed)
  saveTodos()
}

// 完了済みのTodo数を計算
const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.app-header {
  text-align: center;
  margin-bottom: 32px;
  color: white;
}

.app-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.app-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.app-main {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.app-footer {
  text-align: center;
  margin-top: 24px;
  color: white;
}

.footer-text {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

@media (max-width: 640px) {
  .todo-app {
    padding: 16px;
  }
  
  .app-main {
    padding: 24px;
  }
  
  .app-title {
    font-size: 28px;
  }
}
</style> 