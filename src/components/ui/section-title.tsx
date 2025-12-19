import { cn } from '@/lib/utils'

interface SectionTitleProps {
	children: React.ReactNode
	className?: string
	subtitle?: string
}

export function SectionTitle({ children, className, subtitle }: SectionTitleProps) {
	return (
		<div className={cn('text-center mb-10 md:mb-14', className)}>
			<h2 className="text-3xl md:text-4xl font-bold tracking-tight">{children}</h2>
			{subtitle && <p className="mt-3 text-lg opacity-80 max-w-2xl mx-auto">{subtitle}</p>}
		</div>
	)
}
