<script setup>
import FormComponent from '../components/FormComponent.vue'
import TabsComponent from '../components/TabsComponent.vue'
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

const store = useTaskStore()

onMounted(store.fetchTasks)
</script>

<template>
  <FormComponent />
  
  <TabsComponent />
  
  <RouterView />
</template>

<style scoped>

</style>