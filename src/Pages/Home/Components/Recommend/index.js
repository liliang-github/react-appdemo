import React, { memo } from 'react'
import style from 'styled-components'

const RecommendWrap = style.div`
  padding: 0 .2rem;
  h3{
    padding: .2rem 0;
    font-size: .32rem;
  }
  .recommend-item{
    padding-bottom: .3rem;
    &>img{
      border-radius: .2rem;
    }
    .item-info{
      display: flex;
      margin-top: .2rem;
      img{
        width: 1rem;
        height: 1rem;
        margin-right: .3rem;
      }
      .item-content{
        flex: 1;
        overflow: hidden;
        .item-title{
          font-size: .3rem;
          font-weight: bold;
          line-height: .5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-desc{
          color: #aaa;
          line-height: .3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
`

export default memo(function Recommend({ recommends = [], history }) {
	return (
		<RecommendWrap>
			<h3>小编推荐</h3>
			{recommends.map((e) => (
				<div
					onClick={() => {
						history.push('/detail', e)
					}}
					className='recommend-item'
					key={e.id}
				>
					<img src={e.bigImg} alt={e.id} />
					<div className='item-info'>
						<img src={e.minImg} alt={e.id} />
						<div className='item-content'>
							<div className='item-title'>{e.name}</div>
							<div className='item-desc'>{e.desc}</div>
						</div>
					</div>
				</div>
			))}
		</RecommendWrap>
	)
})
