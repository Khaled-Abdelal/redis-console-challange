class Redis {
    constructor() {
        this.state = {
            data: {},
            counter: {},
        }
        this.transactions = []
    }
    get(key) {
        const { data } = this.#getState()
        if (data.hasOwnProperty(key)) return data[key]
        return null
    }

    set(key, value) {
        const { data, counter } = this.#getState()
        
        const oldValue = data[key]
        if (oldValue !== undefined) {
            counter[oldValue] = counter[oldValue] - 1
        }

        data[key] = value
        if (!counter.hasOwnProperty(value)) counter[value] = 0
        counter[value] = counter[value] + 1
        
        return null
    }

    unset(key) {
        const { data, counter } = this.#getState()
        const value = data[key]
        delete data[key]
        if (counter.hasOwnProperty(value)) {
            counter[value] = counter[value] - 1
        }
        return null
    }

    numEqualTo(value) {
        const { counter } = this.#getState()
        if (counter.hasOwnProperty(value)) return counter[value]
        return 0
    }

    begin() {
        const { data, counter } = this.#getState()
        this.transactions.push({ data: { ...data }, counter: { ...counter } })
    }

    rollBack() {
        if (this.transactions.length === 0) return 'NO TRANSACTION'
        this.transactions.pop()
    }

    commit() {
        if (this.transactions.length === 0) return 'NO TRANSACTION'
        this.state = this.#getState()
        this.transactions = []
    }

    #getState() {
        if (this.transactions.length > 0) return this.transactions[this.transactions.length - 1]
        return this.state
    }
}

module.exports = Redis
