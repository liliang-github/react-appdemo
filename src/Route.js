import React from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import FlipMove from 'react-flip-move'
import { KeepAlive, AliveScope } from 'react-activation'
import { Home, City, Detail } from './Pages'

function getAnimate(type = 'PUSH') {
	if (type === 'PUSH') {
		return {
			enterAnimation: {
				from: { transform: 'translate3d(100%,0,0)' },
				to: { transform: 'translate3d(0,0,0)' },
			},
			leaveAnimation: {
				from: { transform: 'translate3d(0,0,0)' },
				to: { transform: 'translate3d(-100%,0,0)' },
			},
		}
	} else {
		return {
			enterAnimation: {
				from: { transform: 'translate3d(-100%,0,0)' },
				to: { transform: 'translate3d(0,0,0)' },
			},
			leaveAnimation: {
				from: { transform: 'translate3d(0,0,0)' },
				to: { transform: 'translate3d(100%,0,0)' },
			},
		}
	}
}

export default function AppRouter() {
	//Todo 路由动画
	//Todo KeepAlive
	return (
		<AliveScope>
			<BrowserRouter>
				<Route
					render={({ location, history }) => {
						const type = history.action
						const animate = getAnimate(type)
						return (
							<FlipMove {...animate} className='animate' duration={3000}>
								<Switch key={location.pathname} location={location}>
									<Route
										exact
										path={'/'}
										render={(props) => (
											<KeepAlive>
												<Home {...props} />
											</KeepAlive>
										)}
									/>
									<Route
										path={'/city'}
										render={(props) => (
											<KeepAlive>
												<City {...props} />
											</KeepAlive>
										)}
									/>
									<Route
										path={'/detail'}
										render={(props) => (
											<KeepAlive>
												<Detail {...props} />
											</KeepAlive>
										)}
									/>
									<Redirect to={'/'} />
								</Switch>
							</FlipMove>
						)
					}}
				></Route>
			</BrowserRouter>
		</AliveScope>
	)
}
