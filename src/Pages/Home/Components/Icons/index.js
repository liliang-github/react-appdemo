import React, { memo, useMemo } from 'react'
import style from 'styled-components'
import { Swiper } from '../../../../Components'
const IconsWrap = style.div`
  .icons-item{
		display: flex;
		flex-wrap: wrap;
		padding: .1rem 0;
		.icon-item{
			flex: 0 0 25%;
			padding: 0 .3rem;
			p{
				text-align: center;
				line-height: .4rem;
				font-size: .26rem;
			}
		}
	}
`
export default memo(function Icons({ icons = [] }) {
	const newIcons = useMemo(() => {
		const result = []
		icons.forEach((e, i) => {
			let index = Math.floor(i / 8)
			if (!result[index]) result[index] = []
			result[index].push(e)
		})
		return result
	}, [icons])
	return (
		<IconsWrap>
			<Swiper
				autoPlay={false}
				dots={false}
				items={newIcons}
				renderItem={(e, i) => {
					return (
						<div className='icons-item'>
							{e.map((item, index) => (
								<div className='icon-item' key={item.id}>
									<img src={item.path} alt={index} />
									<p>游戏唱完</p>
								</div>
							))}
						</div>
					)
				}}
			/>
		</IconsWrap>
	)
})
