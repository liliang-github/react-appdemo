import React, { memo, useState, forwardRef, useImperativeHandle } from 'react'
import style, { keyframes } from 'styled-components'
import { Swiper } from '../../../../Components'

const showAnim = keyframes`
	0% {
		transform: translate3d(100%,0,0);
	}
	100% {
		transform: translate3d(0,0,0);
	}
`

const hideAnim = keyframes`
	0% {
		transform: translate3d(0,0,0);
	}
	100% {
		transform: translate3d(100%,0,0);
	}
`

const PicFrameWrap = style.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
	bottom: 0;
	background-color: black;
	z-index: 12;
	transition: transform .3s;
	transform: translate3d(100%,0,0);
	&.show {
		transform: translate3d(0,0,0);
	}
	&.hide {
	}
	.swiper-wrap {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
	}
`

export default memo(
	forwardRef(function PicFrame({ banners }, ref) {
		const [show, setShow] = useState(false)
		useImperativeHandle(
			ref,
			() => ({
				show() {
					setShow(true)
				},
				hide() {
					setShow(false)
				},
			}),
			[]
		)
		return (
			<PicFrameWrap
				className={show ? 'show' : 'hide'}
				onClick={(e) => {
					setShow(false)
				}}
			>
				{show ? (
					<div className='swiper-wrap'>
						<Swiper
							items={banners}
							renderItem={(e, i) => {
								return <img src={e.path} alt={i} />
							}}
						/>
					</div>
				) : null}
			</PicFrameWrap>
		)
	})
)
