const axios = require('axios');

// Define URLs for the CRUD operations
const apiUrls = {
    addUser: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/add-user",  // Add user
    deleteUser: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/delete-user/25",  // Delete user
    updateUser: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/update-user/16",  // Update user
    addTask: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/add-task",  // Add task
    deleteTask: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/delete-task/28",  // delete task
    updateTask: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/update-task/28",  // update task
    taskByUsername: "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/get-tasks-by-username/", // get Task by Username
    taskById : "https://28ivb3d4wd.execute-api.eu-west-1.amazonaws.com/dev/get-single-task/" //get Task by ID
   
};


// Sample data for testing the CRUD operations
const addUserData = {
    username: "userTestData",
    password: "123456"
};
const addTaskData = {
    username: "ishan",
    task_name: "task added for testing API",
    task_priority: "medium"
};
const getTaskByUserName = {
    "username": "ishan"
};
const getTaskById = {
    "id": 19
};

// Timeout setting for requests
const timeout = 10000; // 10 seconds


// Function to check if the API is responding
const checkApiStatus = async (url) => {
    try {
        const response = await axios.get(url, { timeout });
        if (response.status === 200) {
            console.log(`Success: ${url} is working.`);
        } else {
            console.log(`Error: ${url} returned status code ${response.status}.`);
        }
    } catch (error) {
        console.error(`Error: ${url} could not be reached. Exception: ${error.message}`);
    }
};


// Function to test CRUD operations (Add, Get, Update, Delete)
const testCrudOperations = async () => {
    console.log("\nTesting CRUD operations...");


    try {
        // POST: Add a new user
        const postResponse = await axios.post(apiUrls.addUser, addUserData, { timeout });
        if (postResponse.status === 200) {
            console.log("POST operation successful: User created.");
            
        } else {
            console.log(`POST operation failed: Status Code ${postResponse.status}.`);
        }


        // PUT: Update the user 
            const updatedData = { username: "userTest_updated", password: "updatedpswd1234" };
            const putResponse = await axios.put(`${apiUrls.updateUser}`, updatedData, { timeout });
            if (putResponse.status === 200) {
                console.log("PUT operation successful: User updated.");
            } else {
                console.log(`PUT operation failed: Status Code ${putResponse.status}.`);
            }
        

        // DELETE: Delete the user 
            const deleteResponse = await axios.delete(`${apiUrls.deleteUser}`, { timeout });
            if (deleteResponse.status === 200) {
                console.log("DELETE operation successful: User deleted.");
            } else {
                console.log(`DELETE operation failed: Status Code ${deleteResponse.status}.`);
            }


        // POST: Add a new task
        const postTaskResponse = await axios.post(apiUrls.addTask, addTaskData, { timeout });
        if (postTaskResponse.status === 200) {
            console.log("POST operation successful: Task created.");

        } else {
            console.log(`POST operation failed: Status Code ${postTaskResponse.status}.`);
        }


        // PUT: Update the task 
        const updatedTaskData = { task_name: "userTestTask_updated", task_priority: "medium", istaskcompleted : "true" };
        const putTaskResponse = await axios.put(`${apiUrls.updateTask}`, updatedTaskData, { timeout });
        if (putTaskResponse.status === 200) {
            console.log("PUT operation successful: Task updated.");
        } else {
            console.log(`PUT operation failed: Status Code ${putTaskResponse.status}.`);
        }


        // DELETE: Delete the user 
        const deleteTaskResponse = await axios.delete(`${apiUrls.deleteTask}`, { timeout });
        if (deleteTaskResponse.status === 200) {
            console.log("DELETE operation successful: Task deleted.");
        } else {
            console.log(`DELETE operation failed: Status Code ${deleteTaskResponse.status}.`);
        }


        // GET: Get Tasks by Username
        const getTaskResponse = await axios.post(apiUrls.taskByUsername, getTaskByUserName, { timeout });
        if (getTaskResponse.status === 200 && getTaskResponse.data) {
            console.log("GET operation successful: Tasks returned by Username");
            console.log('Data:', getTaskResponse.data);
        } else {
            console.log(`GET operation failed: Status Code ${getResponse.status}.`);
        }

        // GET: Get Tasks by ID
        const getTaskIDResponse = await axios.post(apiUrls.taskById, getTaskById, { timeout });
        if (getTaskIDResponse.status === 200 && getTaskIDResponse.data) {
            console.log("GET operation successful: Tasks returned by ID");
            console.log('Data:', getTaskIDResponse.data);
        } else {
            console.log(`GET operation failed: Status Code ${getResponse.status}.`);
        }

        
    } catch (error) {
        console.error("Error during CRUD operations: " + error.message);
    }
};


// Smoke test to check API health and CRUD functionality
const smokeTest = async () => {
    console.log("Starting smoke test...\n");

    // Check basic status for health and critical endpoints
    await checkApiStatus(apiUrls.getAllUsers);  // Checking the Get Users endpoint as a basic health check

    // Test CRUD operations
    await testCrudOperations();

    console.log("\nSmoke test completed.");
};
// Run the smoke test
smokeTest();
