<template>
    <form @submit.prevent="onSubmit()" class="add-form">
        <div class="form-control">
            <label>Task</label>
            <p v-if="errorText !=='' "><small>{{ errorText }}</small></p>
            <input type="text" v-model="text" name="text" placeholder="Add Task" />
        </div>
        <div class="form-control">
            <label>Day & Time</label>
            <p v-if="errorDay"><small>{{ errorDay }}</small></p>
            <input type="text" v-model="day" name="day" placeholder="Add Day & Time" />
        </div>
        <div class="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" v-model="reminder" name="reminder" />
        </div>
        <input type="submit" value="Save Task" class="btn btn-block" />
    </form>
</template>

<script>
export default {
    name: 'AddTask',
    props: {
        errorDay: {
            type:String,
            default:""
        },
        errorText: {
            type:String,
            default:""
        },
    },
    data() {
        return {
            text: '',
            day: '',
            reminder: false,
        }
    },
    methods: {
        onSubmit() {

            const newTask = {
                text: this.text,
                reminder: this.reminder,
                day: this.day
            }

            this.text = ''
            this.day = ''
            this.reminder = false

            this.$emit('add-task', newTask)
            console.log('task emitted')

        }
    },
    emits: ['add-task']

}

</script>

<style scoped>
p {
    color: red
}

.add-form {
    margin-bottom: 40px;
}

.form-control {
    margin: 20px 0;
}

.form-control label {
    display: block;
}

.form-control input {
    width: 100%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

.form-control-check {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form-control-check label {
    flex: 1;
}

.form-control-check input {
    flex: 2;
    height: 20px;
}
</style>