import { ref } from "vue";
import axios from 'axios'

export default function useRequests(baseUrl) {
  axios.defaults.baseURL = baseUrl;
  const tasks = ref([]);
  const task = ref([]);
  const errors = ref([]);

  //Getting All the Tasks
  const index = async () => {
    const response = await axios.get();
    tasks.value = response.data.data;
    console.log("All Tasks", tasks);
  };

  //Getting a Single Task
  const show = async (id) => {
    const response = await axios.get("/",+id);
    task.value = response.data.data;
    console.log("Single Task by id: " + id, task);
  };

  //Storing a new Task
  const store = async (data) => {
    try {
      await axios.post("",data);
      errors.value=""
      console.log("Store","Store Successful!");
      await index();
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
        console.log("Errors Create: ", error.response.data.errors)
      }
    }
  };

  //Updating a task -  We do this by v-modeling the input form to task and then calling the request on submit.
  const update = async (id, request) => {
    try {
      await axios.put("/"+id, request,{
        headers: { "content-type": "application/json" }
      });
      console.log("Update","Update Successful!");
      await index();
    } catch (error) {
      console.log("Error: ", error)
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
        console.log("Errors Update: ", error.response.data.errors)
      }
    }
  };

  //Deleting a task
  const destroy = async (id) => {
    await axios.delete(""+id);
    await index();
  };
  
  return{
    tasks,
    task,
    errors,
    index,
    show,
    store,
    update,
    destroy
  }
}
