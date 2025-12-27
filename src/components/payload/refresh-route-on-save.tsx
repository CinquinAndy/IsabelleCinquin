'use client'

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export const RefreshRouteOnSave = () => {
	const router = useRouter()

	return (
		<PayloadRefreshRouteOnSave
			refresh={router.refresh}
			serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
		/>
	)
}
