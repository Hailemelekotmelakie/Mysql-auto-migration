# How it works

1. Create database
2. Set your database connection configuration inside `.env` file
3. Write your sql statement inside `/create` folder under `/migrations` folder
4. Give preceding number based on table relation
5. Finally run a command `npm run migrate` for migration, `npm run drop` to drop.
