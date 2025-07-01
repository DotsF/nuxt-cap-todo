<template>
  <div class="todo-list">
    <TransitionGroup name="todo" tag="div" class="todos-container">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @update="updateTodo"
        @delete="deleteTodo"
      />
    </TransitionGroup>
    
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M9 11H1l3-3-3-3h8v6z"/>
          <path d="M15 13h8l-3 3 3 3h-8v-6z"/>
          <path d="M12 2v20"/>
        </svg>
      </div>
      <h3 class="empty-title">
        {{ getEmptyStateTitle() }}
      </h3>
      <p class="empty-description">
        {{ getEmptyStateDescription() }}
      </p>
    </div>
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
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
}

interface Emits {
  (e: 'update', todo: Todo): void
  (e: 'delete', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const filteredTodos = computed(() => {
  switch (props.filter) {
    case 'active':
      return props.todos.filter(todo => !todo.completed)
    case 'completed':
      return props.todos.filter(todo => todo.completed)
    default:
      return props.todos
  }
})

const updateTodo = (todo: Todo) => {
  emit('update', todo)
}

const deleteTodo = (id: number) => {
  emit('delete', id)
}

const getEmptyStateTitle = () => {
  if (props.todos.length === 0) {
    return 'タスクがありません'
  }
  
  switch (props.filter) {
    case 'active':
      return '未完了のタスクがありません'
    case 'completed':
      return '完了済みのタスクがありません'
    default:
      return 'タスクがありません'
  }
}

const getEmptyStateDescription = () => {
  if (props.todos.length === 0) {
    return '新しいタスクを追加して、生産性を向上させましょう！'
  }
  
  switch (props.filter) {
    case 'active':
      return '全てのタスクが完了しました！お疲れ様でした。'
    case 'completed':
      return 'まだ完了したタスクはありません。'
    default:
      return '新しいタスクを追加して、生産性を向上させましょう！'
  }
}
</script>

<style scoped>
.todo-list {
  min-height: 200px;
}

.todos-container {
  margin-bottom: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: #9ca3af;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #6b7280;
}

.empty-description {
  font-size: 14px;
  line-height: 1.5;
  max-width: 300px;
}

/* トランジションアニメーション */
.todo-enter-active,
.todo-leave-active {
  transition: all 0.3s ease;
}

.todo-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todo-move {
  transition: transform 0.3s ease;
}
</style> 