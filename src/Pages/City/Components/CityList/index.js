import React, { memo, useMemo, useRef } from 'react'
import style from 'styled-components'
import { Scroll } from '../../../../Components'
import { HotCity, Shortcut } from '../index'

const CityListWrap = style.div`
	position: relative;
  flex: 1;
	overflow: hidden;
	.city-title {
		padding-left: .2rem;
		background-color: #eee;
		font-size: .32rem;
		line-height: .7rem;
	}
	.city-item {
		padding-left: .2rem;
		font-size: .3rem;
		line-height: .8rem;
		border-bottom: 1px solid #eee;
		&:last-child {
			border: none;
		}
	}
	.shortcut-wrap {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
`

export default memo(function CityList({
	hotCitys = [],
	citys = {},
	onClick = () => {},
}) {
	const scrollRef = useRef(null)
	const cityListRef = useRef(null)
	const groups = useMemo(() => {
		return Object.keys(citys)
	}, [citys])
	return (
		<CityListWrap ref={cityListRef}>
			<Scroll ref={scrollRef}>
				<HotCity onClick={onClick} hotCitys={hotCitys} />
				{Object.keys(citys).map((cityGroup) => {
					return (
						<div id={cityGroup} key={cityGroup}>
							<div className='city-title'>{cityGroup}</div>
							{citys[cityGroup].map((city) => (
								<div
									onClick={(e) => {
										onClick(city.name)
									}}
									className='city-item'
									key={city.id}
								>
									{city.name}
								</div>
							))}
						</div>
					)
				})}
			</Scroll>
			<div className='shortcut-wrap'>
				<Shortcut
					onClick={(e) => {
						const target = cityListRef.current.querySelector('#' + e)
						scrollRef.current.scrollToElement(target)
					}}
					groups={groups}
				/>
			</div>
		</CityListWrap>
	)
})
