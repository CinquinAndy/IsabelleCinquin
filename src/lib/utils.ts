import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatMediaUrl(url: string | null | undefined): string | null {
	if (!url) return null
	// Remove localhost domain to make URL relative and bypass Next.js SSRF protection
	return url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, '')
}
