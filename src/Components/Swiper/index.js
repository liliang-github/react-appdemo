import React, {
	memo,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useState,
} from 'react'
import style from 'styled-components'

const SwiperWrap = style.div`
	position: relative;
  width: 100%;
	overflow: hidden;
	.swiper-container{
		display: flex;
		.swiper-item{
			flex: 1;
			overflow: hidden;
		}
	}
	.swiper-dots{
		position: absolute;
		display: flex;
		left: 50%;
		bottom: .2rem;
		padding: 0 .07rem;
		transform: translateX(-50%);
		border-radius: .2rem;
		background-color: rgba(0,0,0,.3);
		.dot{
			width: .2rem;
			height: .2rem;
			margin: .07rem;
			border-radius: 50%;
			background-color: #bbb;
			&.active{
				background-color: white;
			}
		}
	}
`

export default memo(function Swiper({
	items = [],
	renderItem = () => {},
	interval = 3000,
	autoPlay = true,
	dots = true,
}) {
	const [page, setPage] = useState(1)
	const touch = useRef({ page: 1 })
	const newItems = useMemo(() => {
		if (items.length === 0) return items
		const tmp = [...items]
		tmp.push(tmp[0])
		tmp.unshift(tmp[tmp.length - 2])
		return tmp
	}, [items])
	const swiperRef = useRef({})
	const toPage = useCallback((animation = true) => {
		if (animation)
			swiperRef.current.children[0].style.transition = 'transform .3s'
		else swiperRef.current.children[0].style.transition = ''
		swiperRef.current.children[0].style.transform = `translate3d(${
			-touch.current.page * touch.current.width
		}px,0,0)`
	}, [])

	const nextPage = useCallback(() => {
		touch.current.page++
		toPage()
		setTimeout(() => {
			if (touch.current.page >= newItems.length - 1) {
				touch.current.page = 1
				toPage(false)
			}
		}, 300)
		if (touch.current.page === newItems.length - 1) setPage(1)
		else setPage(touch.current.page)
	}, [toPage, newItems])

	const prePage = useCallback(() => {
		touch.current.page--
		toPage()
		setTimeout(() => {
			if (touch.current.page <= 0) {
				touch.current.page = newItems.length - 2
				toPage(false)
			}
		}, 300)
		if (touch.current.page === 0) setPage(newItems.length - 2)
		else setPage(touch.current.page)
	}, [toPage, newItems])

	const touchstart = (e) => {
		swiperRef.current.children[0].style.transition = ''
		touch.current.startX = e.touches[0].clientX
		touch.current.move = 0
		window.clearInterval(touch.current.timer)
	}
	const touchmove = (e) => {
		touch.current.move = e.touches[0].clientX - touch.current.startX
		swiperRef.current.children[0].style.transform = `translate3d(${
			-touch.current.page * touch.current.width + touch.current.move
		}px,0,0)`
	}
	const touchend = (e) => {
		if (Math.abs(touch.current.move) > touch.current.width / 3) {
			//下一页
			if (touch.current.move < 0) nextPage()
			else prePage()
		} else {
			//弹回
			toPage()
		}
		if (autoPlay && items.length > 0) {
			const { current } = touch
			current.timer = window.setInterval(() => {
				nextPage()
			}, interval)
		}
	}

	useEffect(() => {
		const swiper = swiperRef.current
		touch.current.width = swiper.clientWidth
		toPage(false)
	}, [toPage, items])

	useEffect(() => {
		if (autoPlay && items.length > 0) {
			const { current } = touch
			current.timer = window.setInterval(() => {
				nextPage()
			}, interval)
			return () => {
				window.clearInterval(current.timer)
			}
		}
	}, [nextPage, interval, autoPlay, items.length])

	return (
		<SwiperWrap
			ref={swiperRef}
			onTouchStart={touchstart}
			onTouchMove={touchmove}
			onTouchEnd={touchend}
		>
			<div
				className='swiper-container'
				style={{ width: newItems.length * 100 + '%' }}
			>
				{newItems.map((item, index) => (
					<div className='swiper-item' key={index}>
						{renderItem(item, index)}
					</div>
				))}
			</div>
			{dots ? (
				<div className='swiper-dots'>
					{items.map((e, index) => (
						<div
							key={index}
							className={`dot ${index + 1 === page && 'active'}`}
						></div>
					))}
				</div>
			) : (
				''
			)}
		</SwiperWrap>
	)
})
