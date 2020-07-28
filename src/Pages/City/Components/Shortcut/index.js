import React, { memo } from 'react'
import style from 'styled-components'

const ShortcutWrap = style.div`
	text-align: center;
	.group-item {
		padding: .1rem;
	}
`

export default memo(function Shortcut({ groups = [], onClick = (e) => {} }) {
	return (
		<ShortcutWrap>
			{groups.map((e) => (
				<div
					onClick={(_) => {
						onClick(e)
					}}
					className='group-item'
					key={e}
				>
					{e}
				</div>
			))}
		</ShortcutWrap>
	)
})
