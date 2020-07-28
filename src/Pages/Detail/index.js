import React, { useEffect, useState, useCallback, useRef } from 'react'
import style from 'styled-components'
import { inject } from '../../StateManage'
import { Scroll } from '../../Components'
import { Header, BackButton, Banner, PicFrame } from './Components'

const DetailWrap = style.div`
	position: relative;
	height: 100%;
	.header-wrap {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
	}
	.back-wrap {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.diver {
		height: 1000px;
	}
`

export default inject(['detail', 'home'])(function Detail({
	history,
	location,
	detail,
	home,
}) {
	const picRef = useRef(null)
	useEffect(() => {
		detail.data = location.state
	}, [])
	const [opacity, setOpacity] = useState(0)
	const scroll = useCallback((e) => {
		const offset = e
		setOpacity(Math.min(offset, 100) / 100)
	}, [])

	return (
		<DetailWrap>
			<div
				className='header-wrap'
				style={{ opacity }}
				onClick={(e) => {
					picRef.current.show()
				}}
			>
				<Header history={history} />
			</div>
			<div className='back-wrap' style={{ opacity: 1 - opacity }}>
				<BackButton history={history} />
			</div>
			<PicFrame banners={home.banners} ref={picRef} />
			<Scroll onScroll={scroll}>
				<Banner data={detail.data} />
			</Scroll>
		</DetailWrap>
	)
})
