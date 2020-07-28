import React, { memo } from 'react'
import style from 'styled-components'
import { Icon } from '../../../../Components'
const HeaderWrap = style.div`
  position: relative;
	width: 100%;
	height: .86rem;
	line-height: .86rem;
	background-color: #00bcd4;
	color: white;
	text-align: center;
	font-size: .3rem;
	.back-button{
		position: absolute;
		left: 0;
		top: 0;
		width: .86rem;
		height: .86rem;
		font-size: .5rem;
	}
`

export default memo(function Header({ history }) {
	return (
		<HeaderWrap>
			<div
				className='back-button'
				onClick={(e) => {
					history.goBack()
				}}
			>
				<Icon type='angle-left' />
			</div>
			详情
		</HeaderWrap>
	)
})
