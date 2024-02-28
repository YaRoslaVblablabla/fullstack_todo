import { defineStore } from 'pinia'

export const useTaskStore = defineStore('TaskStore', {
    state: () => ({
        tasks:[],
        search: '',
        select: false,
    }),
    
    getters: {
        getTasks(){
            return this.tasks.filter(task => task.status === 'active')
        },

        getComplitedTasks(){
            return this.tasks.filter(task => task.status === 'complite')
        },

        getDeletedTasks(){
            return this.tasks.filter(task => task.status === 'delete')
        },

        searchTask(){
            return this.sortTasks.filter(task => task.title.toLowerCase().includes(this.search.toLowerCase()) )
        },

        sortTasks(){
            if(this.select == 'deadline')
                return [...this.getTasks].sort((a, b) => a.deadline > b.deadline ? 1 : -1)
             
            if(this.select == 'importance') 
                return [...this.getTasks].sort((a, b) => a.importance < b.importance ? 1 : -1)
            
            return this.getTasks
        }
    },

    actions: {
        async addTask(task) {
            let response = await fetch('http://127.0.0.1:8000/api/tasks', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(task)
            });
            let data = await response.json()
            this.tasks.push(data.data)
        },

        async changeStatus(id, status){
            await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(status)
            });
            const task = this.tasks.find(t => t.id === id)
            task.status = status
        },

        changeSearch(data){
            this.search = data
        },

        changeSelect(data){
            this.select = data
        },

        updateTask(task){
            fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/update`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(task)
            })
            .then((response) => response.json())
            .then((data) => {
                let taskForUpdate = this.tasks.find(t => t.id === data.data.id)
                taskForUpdate.importance= data.data.importance
                taskForUpdate.title = data.data.title
                taskForUpdate.deadline = data.data.deadline
            } )
        },

        clearTrash(){
            fetch(`http://127.0.0.1:8000/api/tasks/clear`, { method: 'DELETE' })
            .then( response => this.tasks = this.tasks.filter(el => el.status !== 'delete') )
        },

        makeAllActive(){
            fetch(`http://127.0.0.1:8000/api/tasks/update`, { method: 'POST' })
            .then( response => { 
                this.tasks.forEach(el => el.status === 'complite' ? el.status = 'active' : false )
            })
        },

        async fetchTasks(){
            let resp = await fetch(`http://127.0.0.1:8000/api/tasks`)
            let tasks = await resp.json()
            this.tasks = [...tasks.data]
        }
    }
})