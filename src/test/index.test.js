const Time = require('../index')

test('Time类被定义了', () => {
	expect(Time).toBeDefined()
})

test('Time是一个Class', () => {
	expect(Time).toBeInstanceOf(Function)
	expect(Time.prototype).toBeInstanceOf(Object)
})

test('Time 构造实例必须传递一个函数', () => {
	const errorResolverTypeList = [
		1,
		'',
		false,
		true,
		{},
		[],
		new Set(),
		new Map(),
		Symbol('1')
	]
	
	const check = testData => 
		expect(() => new Time(testData)).toThrow()

	errorResolverTypeList.forEach(testData => check(testData))
})

test('Time 的实例是属于 Time 这个Class', () => {
	expect(new Time(jest.fn())).toBeInstanceOf(Time)
})

test('Time 的实例拥有 then 属性, 并且具有一个 then 方法', () => {
	const createTimeInstance = resolver => {
		return new Time(resolver)
	}

	const resolver = jest.fn()

	const timeInstance = createTimeInstance(resolver)
	expect(timeInstance).toHaveProperty('then')
	expect(timeInstance.then).toBeInstanceOf(Function)
})

test('Time 构造函数的参数 resolver 被执行, 且只执行一次', () => {
	const resolver = jest.fn()
	const time = new Time(resolver)
	time.then(() => done())
	expect(resolver).toHaveBeenCalledTimes(1)
})

test('resolver 需要接受resolve 和 reject 两个参数, 这个两个参数都为函数', () => {
	const excutor = (resolve, reject) => {
		expect(resolve).toBeInstanceOf(Function)
		expect(reject).toBeInstanceOf(Function)
	}

  new Time(excutor)

})

test('then中的onFulfiled会在resolve 被调用的时候执行', done => {
	const time = new Time((resolve, reject) => {
		resolve()
	})

	const onFulfiled = jest.fn()

	time.then(onFulfiled)

	expect(onFulfiled).toHaveBeenCalledTimes(1)
})
