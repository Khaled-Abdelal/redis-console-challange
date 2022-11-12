
const prompt = require('prompt');
const Redis = require('./redis')

const redis = new Redis()
prompt.start();

const run = async () => {
    while (true) {
        const input = await prompt.get(['command'])
        const [command, ...args] = input.command.trim().split(' ').filter(str => str !== ' ')
        if (command === 'END') {
            break
        }
        _handleCommand(command, args)
    }
}

const _handleCommand = (command, args) => {
    if (command === 'SET') {
        redis.set(args[0], args[1])
    }

    if (command === 'GET') {
        console.log(redis.get(args[0]))
    }

    if (command === 'UNSET') {
        redis.unset(args[0])
    }

    if (command === 'NUMEQUALTO') {
        console.log(redis.numEqualTo(args[0]))
    }

    if (command === 'BEGIN') {
        redis.begin()
    }

    if (command === 'ROLLBACK') {
        const output = redis.rollBack()
        if (typeof output === 'string') console.log(output)
    }

    if (command === 'COMMIT') {
        const output = redis.commit()
        if (typeof output === 'string') console.log(output)
    }
}
run()

