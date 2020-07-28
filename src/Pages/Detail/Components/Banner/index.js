import React, { memo } from 'react'
import style from 'styled-components'

const BannerWrap = style.div`
  position: relative;
  height: 10000px;
  .banner-desc {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0 .2rem;
    background: linear-gradient(180deg,transparent,rgba(0,0,0,.5));
    line-height: .4rem;
    color: white;
  }
`

export default memo(function Banner({ data }) {
	return (
		<BannerWrap>
			<img src={data.bigImg} alt='' />
			<div className='banner-desc'>
				<div className='name'>{data.name}</div>
				<div className='desc'>{data.desc}</div>
			</div>
		</BannerWrap>
	)
})
