<template>
    <AddTask v-if="showAddTask" @add-task="addTask" :errorDay="errorDay" :errorText="errorText" />
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script>
// @ts-ignore
import Tasks from '@/components/TasksComponent'
// @ts-ignore
import AddTask from '@/components/AddTask'
// @ts-ignore
import useRequests from '@/helpers/requests'

const { tasks, index, destroy, store, errors, update} = useRequests("http://127.0.0.1:8000/api/tasks");
export default {
    name: 'App',
    components: {
        Tasks,
        AddTask
    },
    props: {
        showAddTask: Boolean
    },
    data() {
        return {
            tasks: [],
            day: '',
            tasks2: [],
            errorDay: "",
            errorText: ""
        }
    },
    methods: {
        async deleteTask(id) {
            if (confirm("Are you sure?")) {
                await destroy(id);
            }
        },
        async toggleReminder(task) {
            const request= `{"reminder" : ${!task.reminder}}`
            console.log("request", request)
            await update(task.id, request)
        },
        async addTask(newTask) {
            console.log(newTask)
            await store(newTask)
            if (errors.value.text) {
                this.errorText = errors.value.text[0]
            }
            else {
                this.errorText = ''
            }
            if (errors.value.day) {
                this.errorDay = errors.value.day[0]
            } else {
                this.errorDay = ''
            }
            console.log("error day: ", this.errorDay)
        },
        async getData() {
            await index();
            return tasks
        }
    },
    async created() {
        this.tasks = await this.getData()
        console.log(tasks)
        this.tasks2 = [
            {
                id: 1,
                text: 'Doctors Appointment',
                day: 'March 1st at 2:30pm',
                reminder: true,
            },
            {
                id: 2,
                text: 'Meeting at School',
                day: 'March 3rd at 1:30pm',
                reminder: true,
            },
            {
                id: 3,
                text: 'Food Shopping',
                day: 'March 3rd at 11:30pm',
                reminder: false,
            }
        ]
        console.log("data", this.tasks)
    }
}
</script>
