class Time {
	constructor(excutor) {
		// 容错性数据类型判断
		if(typeof excutor !== 'function') {
			throw new Error('实例化 Time 需要传递一个类型为 function 的 resolver')
		}
		// 立即执行
		excutor(this.resolve, this.reject)
	}
		
	then = (onFulfiled, onReject) => {
		this.onFulfiled = onFulfiled
		this.onReject = onReject
	}

	resolve = () => {
		setTimeout(() => {
			this.onFulfiled()
		}, 0)
	}

	reject = () => {
		setTimeout(() => {
			this.onReject()
		}, 0)
	}
}

module.exports = Time
