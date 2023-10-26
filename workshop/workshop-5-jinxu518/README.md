# CS571 Workshop 04 - Continued
## MIU Courses Review App
1. Update the frontend to support Add/Edit/Delete a course. For deleting a course, you just need to display an alert to confirm `Do you want to delete this course?`. Please check the following code for Alert of React Native.
```JavaScript
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed')
      },
      {
        text: 'OK', 
        onPress: () => console.log('OK Pressed')
      },
    ]);
```
 
2. Assume that we have a `departments` collection in `MongoDB` as follows:
```
{
    _id: ObjectId,
    name: string,
    code: string,
    courses: [
        {
             _id: ObjectId,
            title: string,
            code: string,
            faculty: string,
            rating: number,
            reviews: [{
              _id: ObjectId,
              name: string,
              comment: string,
              rating: number,
            }]
        }
    ]    
}
```
3. Write an Express server to support CRUD for courses, and make necessary changes in your app to communicate with the backend server:
    * Insert a department: `POST /departments`
    * Get all courses of a departement: `GET /departments/:department_code/courses`
    * Add a new course: `PUT /departments/:department_code/courses`
    * Update the name of a course: `PATCH /departments/:department_code/courses/:course_code`
    * Delete a course: `DELETE /departments/:department_code/courses/:course_code`
4. COMPRO (Optional for MSD)
* Implement API to CRUD reviews
* Implement to show all reviews of a course in the screen 'CourseDetails'

## Notes  
* Provid simple StyleSheet object.
* Do not upload any zip files into your repo.
* Do not push any deps (node_modules).
* Remember to honor the project integrity and authenticity of your code.

## Reference
* Networking API with fetch: https://reactnative.dev/docs/network
## Please find screenshots for the finished application  

<img src="./screenshots/List.png" width="35%" /><img src="./screenshots/Add.png" width="35%" />  
  
<img src="./screenshots/Edit.png" width="35%" />
