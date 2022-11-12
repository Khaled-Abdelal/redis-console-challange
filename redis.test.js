const Redis = require('./redis')


test('test set, get, unset', () => {
    const redis = new Redis()

    expect(redis.set('ex', 10)).toBe(null)
    expect(redis.get('ex')).toBe(10)
    expect(redis.unset('ex')).toBe(null)
    expect(redis.get('ex')).toBe(null)
})

test('test numEqualTo', () => {
    const redis = new Redis()
    expect(redis.set('a', 10)).toBe(null)
    expect(redis.set('b', 10)).toBe(null)
    expect(redis.numEqualTo(10)).toBe(2)
    expect(redis.numEqualTo(20)).toBe(0)
    expect(redis.set('b', 30)).toBe(null)
    expect(redis.numEqualTo(10)).toBe(1)
})

test('test transactions begin, rollback no commit', () => {
    const redis = new Redis()
    expect(redis.begin()).toBe(undefined)
    expect(redis.set('a', 10)).toBe(null)
    expect(redis.get('a')).toBe(10)
    expect(redis.begin()).toBe(undefined)
    expect(redis.set('a', 20)).toBe(null)
    expect(redis.get('a')).toBe(20)
    expect(redis.rollBack()).toBe(undefined)
    expect(redis.get('a')).toBe(10)
    expect(redis.rollBack()).toBe(undefined)
    expect(redis.get('a')).toBe(null)
})

test('test transactions commit and no transaction roll back', () => {
    const redis = new Redis()
    expect(redis.begin()).toBe(undefined)
    expect(redis.set('a', 30)).toBe(null)
    expect(redis.begin()).toBe(undefined)
    expect(redis.set('a', 40)).toBe(null)
    expect(redis.commit()).toBe(undefined)
    expect(redis.get('a')).toBe(40)
    expect(redis.rollBack()).toBe('NO TRANSACTION')
})

test('test nested transactions commit and roll back', () => {
    const redis = new Redis()
    expect(redis.set('a', 50)).toBe(null)
    expect(redis.begin()).toBe(undefined)
    expect(redis.get('a')).toBe(50)
    expect(redis.set('a', 60)).toBe(null)
    expect(redis.begin()).toBe(undefined)
    expect(redis.unset('a')).toBe(null)
    expect(redis.get('a')).toBe(null)
    expect(redis.rollBack()).toBe(undefined)
    expect(redis.get('a')).toBe(60)
    expect(redis.commit()).toBe(undefined)
    expect(redis.get('a')).toBe(60)
})

test('test nested transactions commit, roll back and numEqualTo', () => {
    const redis = new Redis()
    expect(redis.set('a', 10)).toBe(null)
    expect(redis.begin()).toBe(undefined)
    expect(redis.numEqualTo(10)).toBe(1)
    expect(redis.begin()).toBe(undefined)
    expect(redis.unset('a')).toBe(null)
    expect(redis.numEqualTo(10)).toBe(0)
    expect(redis.rollBack()).toBe(undefined)
    expect(redis.numEqualTo(10)).toBe(1)
    expect(redis.commit()).toBe(undefined)
})