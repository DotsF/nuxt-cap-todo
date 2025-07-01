<template>
  <div class="todo-filter">
    <div class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="updateFilter(filter.value)"
        class="filter-btn"
        :class="{ active: currentFilter === filter.value }"
      >
        {{ filter.label }}
        <span class="count" v-if="filter.value !== 'all'">
          {{ getCount(filter.value) }}
        </span>
      </button>
    </div>
    
    <div class="stats">
      <span class="stat-text">
        {{ completedCount }} / {{ totalCount }} 完了
      </span>
      <button
        v-if="completedCount > 0"
        @click="clearCompleted"
        class="clear-btn"
        title="完了済みを削除"
      >
        完了済みを削除
      </button>
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
  currentFilter: 'all' | 'active' | 'completed'
}

interface Emits {
  (e: 'update-filter', filter: 'all' | 'active' | 'completed'): void
  (e: 'clear-completed'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const filters = [
  { label: '全て', value: 'all' as const },
  { label: '未完了', value: 'active' as const },
  { label: '完了済み', value: 'completed' as const }
]

const totalCount = computed(() => props.todos.length)
const completedCount = computed(() => props.todos.filter(todo => todo.completed).length)
const activeCount = computed(() => totalCount.value - completedCount.value)

const getCount = (filterType: 'all' | 'active' | 'completed') => {
  switch (filterType) {
    case 'active':
      return activeCount.value
    case 'completed':
      return completedCount.value
    default:
      return 0
  }
}

const updateFilter = (filter: 'all' | 'active' | 'completed') => {
  emit('update-filter', filter)
}

const clearCompleted = () => {
  emit('clear-completed')
}
</script>

<style scoped>
.todo-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}

.stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-text {
  font-size: 14px;
  color: #6b7280;
}

.clear-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #fef2f2;
  color: #dc2626;
}

@media (max-width: 640px) {
  .todo-filter {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .stats {
    justify-content: center;
  }
}
</style> 