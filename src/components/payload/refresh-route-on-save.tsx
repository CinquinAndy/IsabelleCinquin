'use client'

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const RefreshRouteOnSave = () => {
	const router = useRouter()
	const [isInIframe, setIsInIframe] = useState(false)

	useEffect(() => {
		// Only enable live preview when inside an iframe (admin panel)
		setIsInIframe(window.self !== window.top)
	}, [])

	// Don't render anything for regular visitors
	if (!isInIframe) {
		return null
	}

	return (
		<PayloadRefreshRouteOnSave
			refresh={router.refresh}
			serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
		/>
	)
}
