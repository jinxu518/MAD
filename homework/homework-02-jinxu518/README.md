# MIU-CS571-2023-10-Homework02
## Technologies: NodeJS Express, MongoDB
## Please find below an Express application that connects to a MongoDB instance, each document has the following structure for `schools` collection:
```JavaScript
{
    "_id":ObjectId,
    "teachers": [
        {"_id":ObjectId, "name":"Asaad"},
        {"_id":ObjectId, "name":"Umur"}
    ],
    "courses":[
        {"_id":ObjectId, "title": "CS477", "students":[
            {"_id":ObjectId, "name":"John"},
            {"_id":ObjectId, "name":"Selin"}
        ]},
        {"_id":ObjectId, "title": "CS571", "students":[
            {"_id":ObjectId, "name":"Alican"},
            {"_id":ObjectId, "name":"Dean"}
        ]}
    ]
}
```
## Your are responsible on writing an application to have 6 restful APIs which satisfy the following features.
1. Add teacher
2. Update teacher
3. Delete teacher
4. Add a new student to specific course
5. Update a student's name
6. Delete a student
