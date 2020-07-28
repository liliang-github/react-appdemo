import React, { memo } from 'react'
import style from 'styled-components'
import { Icon } from '../../../../Components'

const HeaderWrap = style.div`
  display: flex;
  width: 100%;
  height: 0.86rem;
  padding-left: .1rem;
  align-items: center;
  background-color: #00bcd4;
  line-height: 0.64rem;
  .search-wrap {
    flex: 1;
    height: 0.64rem;
    padding-left: .1rem;
    background-color: white;
    border-radius: .1rem;
    color: #ccc;
    .fas {
      padding: .1rem;
    }
  }
  .current-city {
    padding: 0 .1rem;
    height: 0.64rem;
    color: white;
    .fas {
      padding-left: .1rem;
    }
  }
`

export default memo(function Header({ city, history }) {
	return (
		<HeaderWrap>
			<div className='search-wrap'>
				<Icon type='search' />
				搜索...
			</div>
			<div
				onClick={(e) => {
					history.push('city')
				}}
				className='current-city'
			>
				{city}
				<Icon type='angle-down' />
			</div>
		</HeaderWrap>
	)
})
