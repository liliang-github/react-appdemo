import React, { useEffect, useCallback, useMemo } from 'react'
import style from 'styled-components'
import { Header, Search, CityList } from './Components'
import { inject } from '../../StateManage'

const CityWrap = style.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`

export default inject(['city', 'home'])(function City({ history, city, home }) {
	useEffect(() => {
		city.fetchCityInfos()
	}, [city])
	const searchCitys = useMemo(() => {
		return [].concat.apply([], Object.values(city.citys))
	}, [city.citys])
	const toggle = useCallback((e) => {
		home.currentCity = e
		history.replace('/')
	}, [])
	return (
		<CityWrap>
			<Header history={history}></Header>
			<Search onClick={toggle} citys={searchCitys} />
			<CityList onClick={toggle} hotCitys={city.hotCitys} citys={city.citys} />
		</CityWrap>
	)
})
