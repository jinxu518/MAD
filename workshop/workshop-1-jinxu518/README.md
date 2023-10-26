# Technologies: NodeJS Express, Restful API, MongoDB
## Please find below a schema structure for a bank application, each document has the following structure for `banks` collection:
```JavaScript
{
    "_id":ObjectId,
    "name": "BOA",
    "users":[
        {"_id":ObjectId, "name": "Michael", "address": "Fairfield, IA", "accounts":[
            {"_id":ObjectId, "type": "debit", "number": 123, "routing": 123, "amount": 100},
        ]}
    ]
}
```
## Assume that there are two types of account, debit and credit.
Create an Express application that connects to a MongoDB instance (local or cloud service), and write code for the below routes in `app.js` file:

```JavaScript
// 1. Insert a new bank
app.post('/banks', async (req, res) => {

})
// 2. Query all banks, and provide the way to sort all banks by names
app.get('/banks', async (req, res) => {

})
// 3. Insert a new user
app.put('/banks/:bankId/users', async (req, res) => {

})
// 4. Query a specific user by ID
app.get('/banks/:bankId/users/:userId', async (req, res) => {

})
// 5. Add the address to an existing user using ID
app.patch('/banks/:bankId/users/:userId', async (req, res) => {

})
// 6. Add a new account to an existing user
// The request body is {"type": "credit", "number": 456, "routing": 456, "amount": 50}
app.put('/banks/:bankId/users/:userId/accounts', async (req, res) => {
})

// 7. Update an account's balance
// The request body is {"amount": 200}
app.patch('/banks/:bankId/users/:userId/accounts/:accountId', async (req, res) => {
})

// 8. Delete an account
app.delete('/banks/:bankId/users/:userId/accounts/:accountId', async (req, res) => {
})
// 9. (Optional) List all account information (bank's name, type, number, routing, amount) of a user
app.get('/banks/:bankId/users/:userId/accounts', async (req, res) => {
})
// 10. (Optional) Calculate a total money which a user has in the system
app.get('/banks/:bankId/users/:userId/get-balance', async (req, res) => {
})
```
## Please submit your code at 2:00 PM CST today
