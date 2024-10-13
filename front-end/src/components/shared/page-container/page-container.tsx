import React, { PropsWithChildren } from 'react'
import './page-container.scss'

type fromProps = {
	children: React.ReactNode
}
const PageContainer = (props: PropsWithChildren<fromProps>) => {
	return <div className="page-container">{props.children}</div>
}

export default PageContainer
