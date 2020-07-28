import React, { memo } from 'react'
import style from 'styled-components'

const HotCityWrap = style.div`
	
	.city-title {
		padding-left: .2rem;
		background-color: #eee;
		font-size: .32rem;
		line-height: .7rem;
	}
	.city-content {
		display: grid;
		padding: .4rem;
		grid-template-columns: repeat(3,1fr);
		grid-gap: .2rem;
		.hot-city-item {
			padding: .2rem;
			border: 1px solid #eee;
			text-align: center;
			font-size: .24rem;
		}
	}
`

export default memo(function HotCity({ hotCitys = [], onClick = () => {} }) {
	return (
		<HotCityWrap>
			<div className='city-title'>热门城市</div>
			<div className='city-content'>
				{hotCitys.map((e) => (
					<div
						onClick={(_) => {
							onClick(e.name)
						}}
						className='hot-city-item'
						key={e.id}
					>
						{e.name}
					</div>
				))}
			</div>
		</HotCityWrap>
	)
})
