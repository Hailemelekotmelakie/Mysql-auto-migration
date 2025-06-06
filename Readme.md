# How it works

1. Create a database
2. Set your database connection configuration inside the `.env` file
3. Write your SQL statement inside the `/create` folder under the `/migrations` folder
4. Give the preceding number based on the tables relation
5. Finally run the command `npm run migrate` for migration, `npm run drop` to drop.

# Dependencies used
     "dependencies": {
      "express": "^4.18.2",
      "mysql": "^2.18.1"
      },
      "devDependencies": {
        "dotenv": "^16.1.4"
      }
