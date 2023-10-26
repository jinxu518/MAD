const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'bankApp';
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectDB();

// Routes
// 1. Insert a new bank
app.post('/banks', async (req, res) => {
  try {
    const { name } = req.body;
    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    const result = await banksCollection.insertOne({ name });
    const newBank = result;
    res.status(201).json(newBank);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new bank' });
  }
});

// 2. Query all banks, and provide the way to sort all banks by names
app.get('/banks', async (req, res) => {
  try {
    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    let banks;
    banks = await banksCollection.find().toArray(); // Sorting by name in ascending order

    if (req.query.sort === 'name') {
      banks.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }
    res.status(200).json(banks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch banks' });
  }
});

// 3. Insert a new user
app.put('/banks/:bankId/users', async (req, res) => {
  try {
    const { bankId } = req.params;
    const { name } = req.body;
    const newUser = { _id: new ObjectId(), name };

    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    const result = await banksCollection.updateOne(
      { _id: new ObjectId(bankId) },
      { $push: { users: newUser } }
    );

    if (!result) {
      res.status(404).json({ error: 'Bank not found' });
    } else {
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new user' });
  }
});

// 4. Query a specific user by ID
app.get('/banks/:bankId/users/:userId', async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    // const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    // if (!bank) {
    //   res.status(404).json({ error: 'Bank not found' });
    // } else {
    //   const user = bank.users.find((u) => u._id.toString() === userId);
    //   if (!user) {
    //     res.status(404).json({ error: 'User not found' });
    //   } else {
    //     res.status(200).json(user);
    //   }
    // }
    const user = await banksCollection.findOne({
      _id: new ObjectId(req.params.bankId),
      "users._id": new ObjectId(req.params.userId)
    })
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// 5. Add the address to an existing user using ID
app.patch('/banks/:bankId/users/:userId', async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const { address } = req.body;

    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    if (!bank) {
      res.status(404).json({ error: 'Bank not found' });
    } else {
      const user = bank.users.find((u) => u._id.toString() === userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        user.address = address;
        await usersCollection.updateOne(
          {
            _id: new ObjectId(userId),
            "users._id": new ObjectId(req.params.userId)
          },
          { $set: { address: address } }
        );
        res.status(200).json(user);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user address' });
  }
});

// 6. Add a new account to an existing user
app.put('/banks/:bankId/users/:userId/accounts', async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const { type, number, routing, amount } = req.body;
    const accountId = new ObjectId();
    const newAccount = { _id: accountId, type, number, routing, amount };

    // const db = client.db(dbName);
    // const banksCollection = db.collection('banks');
    // const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    // if (!bank) {
    //   res.status(404).json({ error: 'Bank not found' });
    // } else {
    //   const user = bank.users.find((u) => u._id.toString() === userId);
    //   if (!user) {
    //     res.status(404).json({ error: 'User not found' });
    //   } else {
    //     user.accounts.push(newAccount);
    //     await banksCollection.updateOne({ _id: new ObjectId(bankId) }, { $set: { users: bank.users } });
    //     res.status(201).json(newAccount);
    //   }
    // }
    banksCollection.updateOne(
      { _id: new ObjectId(bankId) },
      {
        $push: { "user.$[u].accounts": newAccount }
      },
      {
        arrayFilters: [
          { "u._id": new ObjectId(userId) }
        ]
      }
    )
    res.status(201).json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new account' });
  }
});

// 7. Update an account's balance
app.patch('/banks/:bankId/users/:userId/accounts/:accountId', async (req, res) => {
  try {
    const { bankId, userId, accountId } = req.params;
    const { amount } = req.body;

    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    // const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    // if (!bank) {
    //   res.status(404).json({ error: 'Bank not found' });
    // } else {
    //   const user = bank.users.find((u) => u._id.toString() === userId);
    //   if (!user) {
    //     res.status(404).json({ error: 'User not found' });
    //   } else {
    //     const account = user.accounts.find((a) => a._id.toString() === accountId);
    //     if (!account) {
    //       res.status(404).json({ error: 'Account not found' });
    //     } else {
    //       account.amount = amount;
    //       await banksCollection.updateOne({ _id: new ObjectId(bankId) }, { $set: { users: bank.users } });
    //       res.status(200).json(account);
    //     }
    //   }
    // }
    const a = banksCollection.updateOne({
      _id: new ObjectId(bankId)
    },
      {
        $set: { "users.$[u].accounts.$[a].amount": amount }
      },
      {
        arrayFilters: [
          { "u._id": new ObjectId(userId) },
          { "a._id": new ObjectId(accountId) }
        ]
      })
    res.status(201).json(a);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update account balance' });
  }
});

// 8. Delete an account
app.delete('/banks/:bankId/users/:userId/accounts/:accountId', async (req, res) => {
  try {
    const { bankId, userId, accountId } = req.params;
    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    // const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    // if (!bank) {
    //   res.status(404).json({ error: 'Bank not found' });
    // } else {
    //   const user = bank.users.find((u) => u._id.toString() === userId);
    //   if (!user) {
    //     res.status(404).json({ error: 'User not found' });
    //   } else {
    //     const accountIndex = user.accounts.findIndex((a) => a._id.toString() === accountId);
    //     if (accountIndex === -1) {
    //       res.status(404).json({ error: 'Account not found' });
    //     } else {
    //       user.accounts.splice(accountIndex, 1);
    //       await banksCollection.updateOne({ _id: new ObjectId(bankId) }, { $set: { users: bank.users } });
    //       res.status(204).send();
    //     }
    //   }
    // }
    banksCollection.updateOne({
      _id: new ObjectId(bankId),
      "users._id": new ObjectId(userId)
    },
      {
        $pull: { "users.$.accounts": { _id: new ObjectId(accountId) } }
      })
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

// 9. (Optional) List all account information (bank's name, type, number, routing, amount) of a user
app.get('/banks/:bankId/users/:userId/accounts', async (req, res) => {
  try {
    const { bankId, userId } = req.params;

    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    if (!bank) {
      res.status(404).json({ error: 'Bank not found' });
    } else {
      const user = bank.users.find((u) => u._id.toString() === userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const userAccounts = user.accounts.map((account) => ({
          bankName: bank.name,
          type: account.type,
          number: account.number,
          routing: account.routing,
          amount: account.amount,
        }));
        res.status(200).json(userAccounts);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user accounts' });
  }
});

// 10. (Optional) Calculate a total money which a user has in the system
app.get('/banks/:bankId/users/:userId/get-balance', async (req, res) => {
  try {
    const { bankId, userId } = req.params;
    const db = client.db(dbName);
    const banksCollection = db.collection('banks');
    const bank = await banksCollection.findOne({ _id: new ObjectId(bankId) });
    if (!bank) {
      res.status(404).json({ error: 'Bank not found' });
    } else {
      const user = bank.users.find((u) => u._id.toString() === userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const totalBalance = user.accounts.reduce((acc, account) => acc + account.amount, 0);
        res.status(200).json({ totalBalance });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate total balance' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
