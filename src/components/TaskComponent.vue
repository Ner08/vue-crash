<template>
    <div @dblclick="toggleReminder(task)" :class="[task.reminder? 'reminder' : '', 'task']">
        <h3>{{ task.text }}
        <i @click="onDelete(task.id)" class="fas fa-times"></i>
        </h3>
        <p>{{ task.day }}</p>
    </div>
</template>

<script>

export default {
    name: 'TaskComponent',
    props: {
        task: Object
    },
    methods:{
        onDelete(id){
            this.$emit('delete-task', id)
        },
        toggleReminder(task){
            this.$emit('toggle-reminder', task)
        },  
    },
    emits:['delete-task','toggle-reminder']
}

</script>

<style scope>
.fas {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>