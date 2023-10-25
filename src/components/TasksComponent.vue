<template>
    <div :key="task.id" v-for="task in tasks">
        <Task @toggle-reminder="toggleReminder(task)" @delete-task="$emit('delete-task', task.id)" :task="task" />
    </div>
</template>

<script>
import Task from './TaskComponent.vue';
export default {
    name: 'TasksComponent',
    components: {
        Task
    },
    props: {
        tasks: Array,
    },
    methods:{
        toggleReminder(task){
            this.$emit('toggle-reminder',task)
        }
    },
    emits:['delete-task','toggle-reminder']
}

</script>
