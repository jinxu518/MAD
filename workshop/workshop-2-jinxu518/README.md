# MIU-CS571-2023-10-Workshop2
# ReactJS
## FrontEnd
### Create a React application 
`App` component: At the beginning, the app shows a text input letting users enter their name with the button "Next". When users click on the button "Next", they will see the following.  
* Header Component: Welcome {fullname} (to be displayed at all times)
* Button: To display either the `ListStudents` component or the 'AddNewStudent` component. Only one component will be displayed at a time, and the `ListStudents` component is shown by default.

`AddNewStudent` component: This component has several fields as follows:
* Name (Input) with the placeholder 'name'. 
* Email (Input) with the placeholder 'email'. 
* ID (text): A random number is changed every 5 seconds.
* Submit (button): When hitting the submit button, the email should be verified to be unique and saved in a global state and `LocalStorage`. After successful submission, the application will display the `ListStudents` component.

`ListStudents` component: To list all students.  
* Display a list of the component `Student` 
`Student` component:
* Text: Show the name and email of this student 
* Delete button: Delete this student. You should alert the confirmation before deleting

### Important
* All components should be functional components.
* All data should be saved in a global state and `LocalStorage`. The data should always be synched between `LocalStorate` and the global state.
* When users open the application, the data should be loaded to the global state from `LocalStorage`. 
* Use a Reducer function to manage your application state and execute all necessary actions.

## Backend
* Create a backend app to persist the application data at the server for this React App.
Assume that we have used MongoDB with 'schools' collection as follows.
```
JavaScript
{
  _id: ObjectId,
  school_name: String,
  address: String,
  students:[
      { name: String, email: String, id: ObjectId}
  ]
}
```
* Connect your frontend app with the backend app using fetch/axios

## Please submit your code before 10:00 PM CST this Sunday.
