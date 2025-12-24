'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { X } from 'lucide-react'
import { useState } from 'react'
import { RichText } from '@/components/ui/rich-text'

interface AvailabilityBannerProps {
	isAvailable: boolean
	message?: SerializedEditorState | null
	returnDate?: string | null
}

export function AvailabilityBanner({ isAvailable, message, returnDate }: AvailabilityBannerProps) {
	const [isVisible, setIsVisible] = useState(true)

	if (isAvailable || !isVisible) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
			<div className="relative bg-white/15 backdrop-blur-md rounded-2xl border border-white/15 p-8 max-w-md w-full shadow-2xl">
				<button
					type="button"
					onClick={() => setIsVisible(false)}
					className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
					aria-label="Fermer"
				>
					<X className="w-6 h-6" />
				</button>

				<div className="text-center text-white">
					{message ? (
						<div className="text-xl md:text-2xl font-bold mb-4">
							<RichText content={message} variant="dark" />
						</div>
					) : (
						<h2 className="text-xl md:text-2xl font-bold mb-4">
							Nounou actuellement indisponible, merci de votre compréhension.
						</h2>
					)}
					{returnDate && <p className="text-lg opacity-90">Je reviens dès {returnDate} !</p>}
				</div>
			</div>
		</div>
	)
}
