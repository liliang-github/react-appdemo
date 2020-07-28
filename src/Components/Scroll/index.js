import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	memo,
	useEffect,
} from 'react'
import style from 'styled-components'

const ScrollWrap = style.div`
	position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`

export default memo(
	forwardRef(function Scroll({ children, onScroll = () => {} }, ref) {
		const scrollRef = useRef(null)
		useEffect(() => {
			const scroll = (e) => {
				onScroll(e.target.scrollTop)
			}
			const scrollDom = scrollRef.current
			scrollDom.addEventListener('scroll', scroll)
			return () => {
				scrollDom.removeEventListener('scroll', scroll)
			}
		}, [onScroll])
		useImperativeHandle(
			ref,
			() => {
				return {
					scrollToElement(el) {
						if (!el || !(el instanceof HTMLElement)) return
						scrollRef.current.scrollTo({
							top: el.offsetTop,
							behavior: 'smooth',
						})
					},
				}
			},
			[]
		)
		return <ScrollWrap ref={scrollRef}>{children}</ScrollWrap>
	})
)
