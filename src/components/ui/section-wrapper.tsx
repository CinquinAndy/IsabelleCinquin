import { cn } from '@/lib/utils'

type SectionVariant = 'primary' | 'secondary' | 'light' | 'dark'

interface SectionWrapperProps {
	id?: string
	variant?: SectionVariant
	className?: string
	children: React.ReactNode
}

const variantClasses: Record<SectionVariant, string> = {
	primary: 'section-primary',
	secondary: 'section-secondary',
	light: 'section-light',
	dark: 'section-dark',
}

export function SectionWrapper({ id, variant = 'light', className, children }: SectionWrapperProps) {
	return (
		<section id={id} className={cn('w-full py-16 md:py-24 px-4 md:px-8', variantClasses[variant], className)}>
			<div className="max-w-5xl mx-auto">{children}</div>
		</section>
	)
}


