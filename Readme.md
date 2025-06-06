# How it works

1. Create a database
2. Set your database connection configuration inside the `.env` file
3. Write your create tables SQL statement inside the `/create` folder under the `/sql` folder
4. Write your SQL seed statement inside the `/seed` folder under the `/sql` folder
5. Finally run the command `npm run scaffold` for migration, and other scripts according to script list package.json

# Dependencies used

     "dependencies": {
        "express": "^4.18.2",
        "mysql2": "^3.14.1"
      },
      "devDependencies": {
        "dotenv": "^16.1.4"
      }
