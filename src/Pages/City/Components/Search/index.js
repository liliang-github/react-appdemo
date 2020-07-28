import React, { memo, useState, useMemo } from 'react'
import style from 'styled-components'
import { Scroll } from '../../../../Components'

const SearchWrap = style.div`
	position: relative;
	width: 100%;
  height: .74rem;
  padding: 0 .2rem;
  background-color: #00bcd4;
  .input-wrap{
    height: .64rem;
    background-color: white;
    border-radius: .1rem;
    overflow: hidden;
    input{
      border: 0;
		  font-size: .24rem;
      outline: 0;
      width: 100%;
      height: 100%;
      padding: 0 .1rem;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .search-result {
    position: fixed;
    top: 1.6rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 10;
    .result-item {
      padding-left: .2rem;
      font-size: .3rem;
      line-height: .8rem;
      border-bottom: 1px solid #eee;
      &:last-child {
        border: none;
      }
    }
    .not-result {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
      height: .7rem;
      font-size: .7rem;
    }
  }
`

export default memo(function Search({ citys = [], onClick = () => {} }) {
	const [searchText, setSearchText] = useState('')
	const result = useMemo(() => {
		if (searchText === '') return []
		return citys.filter((e) => {
			return e.name.indexOf(searchText) >= 0 || e.spell.indexOf(searchText) >= 0
		})
	}, [searchText, citys])
	return (
		<SearchWrap>
			<div className='input-wrap'>
				<input
					placeholder='点击搜索'
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value)
					}}
				/>
			</div>
			<div className='search-result' hidden={searchText === ''}>
				<Scroll>
					{result.map((e) => (
						<div
							onClick={() => {
								onClick(e.name)
							}}
							className='result-item'
							key={e.id}
						>
							{e.name}
						</div>
					))}
				</Scroll>
				<div hidden={result.length !== 0} className='not-result'>
					无结果
				</div>
			</div>
		</SearchWrap>
	)
})
