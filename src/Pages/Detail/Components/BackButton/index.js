import React, { memo } from 'react'
import style from 'styled-components'
import { Icon } from '../../../../Components'

const BackButtonWrap = style.div`
  width: .86rem;
  height: .86rem;
  background-color: rgba(0,0,0,.3);
  border-radius: 50%;
  line-height: .86rem;
  text-align: center;
  font-size: .5rem;
  color: white;
`

export default memo(function BackButton({ history }) {
	return (
		<BackButtonWrap
			onClick={(e) => {
				e.stopPropagation()
				history.goBack()
			}}
		>
			<Icon type='angle-left' />
		</BackButtonWrap>
	)
})
