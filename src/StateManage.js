import React, { useState, useEffect, useCallback, useContext } from 'react'
const GlobalContext = React.createContext()
class EventBus {
	static events = {}
	static on(type, callback) {
		const event = this.checkType(type)
		event.push(callback)
	}
	static checkType(type) {
		if (!this.events[type]) this.events[type] = []
		return this.events[type]
	}
	static off(type, callback) {
		this.checkType(type)
		this.events[type] = this.events[type].filter((e) => e !== callback)
	}
	static emit(type, params) {
		const event = this.checkType(type)
		event.forEach((element) => {
			element(params)
		})
	}
}

const inject = (types = []) => (Component) => (props) => {
	const context = useContext(GlobalContext)
	const prop = types.reduce((a, b) => ({ ...a, [b]: context[b] }), props)
	return <Component {...prop} />
}

const Provider = (props) => {
	const { children, ...initialState } = props
	const [state, setState] = useState(initialState)
	const update = useCallback(() => {
		setState((s) => ({ ...s }))
	}, [])
	useEffect(() => {
		EventBus.on('update', update)
		return () => {
			EventBus.off('update', update)
		}
	}, [update])
	return (
		<GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
	)
}

const observable = (target, key, desc) => {
	const value = desc.initializer()
	return Object.defineProperty(target, key, {
		set(val) {
			if (!this.observe) this.observe = {}
			if (this.observe[key] !== val) {
				this.observe[key] = val
				EventBus.emit('update')
			}
		},
		get() {
			if (!this.observe) this.observe = {}
			return this.observe[key] || value
		},
	})
}

export { Provider, inject, observable }
