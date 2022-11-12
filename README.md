# Let's build Redis!

In this problem, you'll implement an in-memory database similar to Redis. For simplicity's sake, instead of dealing with multiple clients and communicating over the network, your program will receive commands via standard input (stdin), and should write appropriate responses to standard output (stdout).

## Data Commands

The database should accept the following commands:

- `SET name value` – Set the variable `name` to the value `value`. Neither variable names nor values will contain spaces.
- `GET name` – Print out the value of the variable `name`, or NULL if that variable is not set.
- `UNSET name` – Unset the variable `name`, making it just like that variable was never set.
- `NUMEQUALTO value` – Print out the number of variables that are currently set to `value`. If no variables equal that value, print 0.
- `END` – Exit the program. Your program will always receive this as its last command.
- `BEGIN` – Open a new transaction block. Transaction blocks can be nested; a `BEGIN` can be issued inside of an existing block.
- `ROLLBACK` – Undo all of the commands issued in the most recent transaction block, and close the block. Print nothing if successful, or print `NO TRANSACTION` if no transaction is in progress.
- `COMMIT` – Close all open transaction blocks, permanently applying the changes made in them. Print nothing if successful, or print `NO TRANSACTION` if no transaction is in progress. Any data command that is run outside of a transaction block should commit immediately.

## Examples

```console
INPUT       OUTPUT
SET ex 10   
GET ex      10
UNSET ex
GET ex      NULL
END
```

```console
INPUT           OUTPUT
SET a 10
SET b 10
NUMEQUALTO 10   2
NUMEQUALTO 20   0
SET b 30
NUMEQUALTO 10   1
END
```

```console
INPUT       OUTPUT
BEGIN
SET a 10
GET a       10
BEGIN
SET a 20
GET a       20
ROLLBACK
GET a       10
ROLLBACK
GET a       NULL
END
```

```console
INPUT      OUTPUT
BEGIN
SET a 30
BEGIN
SET a 40
COMMIT
GET a       40
ROLLBACK    NO TRANSACTION
END
```

```console
INPUT       OUTPUT
SET a 50
BEGIN
GET a       50
SET a 60
BEGIN
UNSET a
GET a       NULL
ROLLBACK
GET a       60
COMMIT
GET a       60
END
```

```console
INPUT           OUTPUT
SET a 10
BEGIN
NUMEQUALTO 10   1
BEGIN
UNSET a
NUMEQUALTO 10   0
ROLLBACK
NUMEQUALTO 10   1
COMMIT
END
```

## How to run

- install [nodejs](https://nodejs.org/en/download/)
- run `npm i`
- run `npm run redis-console` to start the redis console.
  
To run the tests run `npm run test`
