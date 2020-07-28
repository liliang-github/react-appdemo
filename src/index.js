import React, * as a from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import { Provider } from './StateManage'
import AppRouter from './Route'
import store from './Services'
const rootElement = document.getElementById('root')

const load = () => {
	const html = document.querySelector('html')
	html.style.fontSize = (window.innerWidth / 750) * 100 + 'px'
}
load()

document.body.onresize = load
ReactDOM.render(
	<Provider {...store}>
		<AppRouter />
	</Provider>,
	rootElement
)
