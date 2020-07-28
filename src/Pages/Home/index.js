import React, { useEffect } from 'react'
import { inject } from '../../StateManage'
import { Header, Icons, Recommend } from './Components'
import { Swiper, Scroll } from '../../Components'

export default inject(['home'])(function Home({ history, home }) {
	useEffect(() => {
		home.fetchBanners()
		home.fetchIcons()
		home.fetchRecommends()
	}, [home])
	return (
		<Scroll>
			<Header city={home.currentCity} history={history} />
			<Swiper
				items={home.banners}
				renderItem={(e, i) => {
					return <img src={e.path} alt={i} />
				}}
			/>
			<Icons icons={home.icons} />
			<Recommend history={history} recommends={home.recommends} />
		</Scroll>
	)
})
