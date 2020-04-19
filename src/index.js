class Time {
	constructor(excutor) {
		// 容错性数据类型判断
		if(typeof excutor !== 'function') {
			throw new Error('实例化 Time 需要传递一个类型为 function 的 resolver')
		}
		excutor(this.resolve, this.reject)
	}
		
	status = 'pending'

	then = (onFulfiled, onReject) => {
		this.onFulfiled = onFulfiled
		this.onReject = onReject
	}

	// resolve获取传递参数是队列获取
	// 需要一个返回函数动态执行
	dynamicGetPropertyCallback = fnKey => 
		typeof (this[fnKey]) === 'function' ?
		this[fnKey] :
		() => (this[fnKey])()

	resolve = () => {
		return setTimeout(this.dynamicGetPropertyCallback('onFulfiled'), 0)
	}

	reject = () => {
		return setTimeout(this.dynamicGetPropertyCallback('onReject'), 0)
	}
}

module.exports = Time
