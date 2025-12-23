'use client'

import { Warp } from '@paper-design/shaders-react'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { LandingEquipment, LandingEquipmentSection } from '@/types/landing'

interface EquipmentItem extends LandingEquipment {
	icon: string
	gridSpan?: 'single' | 'double'
}

interface EquipmentProps {
	equipmentSection?: LandingEquipmentSection | null
}

// Shader configurations using darker, softer violet palette
const getShaderConfig = (index: number) => {
	const configs = [
		{
			proportion: 0.3,
			softness: 1.2,
			distortion: 0.12,
			swirl: 0.5,
			swirlIterations: 8,
			shape: 'checks' as const,
			shapeScale: 0.08,
			colors: ['hsl(285, 45%, 20%)', 'hsl(285, 40%, 28%)', 'hsl(300, 35%, 22%)', 'hsl(320, 40%, 25%)'],
		},
		{
			proportion: 0.4,
			softness: 1.4,
			distortion: 0.15,
			swirl: 0.6,
			swirlIterations: 10,
			shape: 'stripes' as const,
			shapeScale: 0.1,
			colors: ['hsl(285, 50%, 18%)', 'hsl(285, 45%, 25%)', 'hsl(285, 40%, 22%)', 'hsl(300, 42%, 28%)'],
		},
		{
			proportion: 0.35,
			softness: 1.3,
			distortion: 0.14,
			swirl: 0.55,
			swirlIterations: 9,
			shape: 'checks' as const,
			shapeScale: 0.09,
			colors: ['hsl(320, 40%, 22%)', 'hsl(285, 45%, 26%)', 'hsl(300, 38%, 20%)', 'hsl(285, 42%, 30%)'],
		},
		{
			proportion: 0.38,
			softness: 1.35,
			distortion: 0.13,
			swirl: 0.58,
			swirlIterations: 11,
			shape: 'stripes' as const,
			shapeScale: 0.08,
			colors: ['hsl(285, 48%, 16%)', 'hsl(285, 44%, 24%)', 'hsl(320, 38%, 20%)', 'hsl(300, 40%, 26%)'],
		},
		{
			proportion: 0.32,
			softness: 1.25,
			distortion: 0.11,
			swirl: 0.52,
			swirlIterations: 8,
			shape: 'checks' as const,
			shapeScale: 0.1,
			colors: ['hsl(285, 42%, 19%)', 'hsl(300, 38%, 25%)', 'hsl(285, 45%, 22%)', 'hsl(320, 36%, 28%)'],
		},
		{
			proportion: 0.36,
			softness: 1.3,
			distortion: 0.14,
			swirl: 0.54,
			swirlIterations: 10,
			shape: 'stripes' as const,
			shapeScale: 0.11,
			colors: ['hsl(300, 40%, 18%)', 'hsl(285, 46%, 24%)', 'hsl(285, 42%, 20%)', 'hsl(320, 38%, 26%)'],
		},
	]
	return configs[index % configs.length]
}

export function Equipment({ equipmentSection }: EquipmentProps) {
	if (!equipmentSection?.title || !equipmentSection?.items) {
		throw new Error('Missing required data for Equipment section: title or items')
	}

	const title = equipmentSection.title
	const subtitle = equipmentSection.subtitle || 'Tout le matériel nécessaire pour accueillir vos enfants'
	const equipment = equipmentSection.items

	// Add default icons if not present
	const items: EquipmentItem[] = equipment.map((item: LandingEquipment, index: number) => ({
		...item,
		icon: item.icon || '/icons/scribbbles/7/SVG/Fichier 1.svg',
		gridSpan: index === 0 || index === 5 ? 'double' : 'single', // Keep grid logic dynamic based on index
	}))

	return (
		<SectionWrapper id="equipements" variant="secondary">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
					{title.split(' ').slice(0, -1).join(' ')}{' '}
					<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
				</h2>
				<p className="mt-4 text-lg text-white/70">{subtitle}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				{items.map((item, index) => {
					const shaderConfig = getShaderConfig(index)
					const isDouble = item.gridSpan === 'double'

					return (
						<div
							key={item.id || index}
							className={`relative h-48 md:h-56 group ${isDouble ? 'md:col-span-2 lg:col-span-1 xl:col-span-2' : ''}`}
						>
							{/* Shader Background */}
							<div className="absolute inset-0 rounded-2xl overflow-hidden">
								<Warp
									style={{ height: '100%', width: '100%' }}
									proportion={shaderConfig.proportion}
									softness={shaderConfig.softness}
									distortion={shaderConfig.distortion}
									swirl={shaderConfig.swirl}
									swirlIterations={shaderConfig.swirlIterations}
									shape={shaderConfig.shape}
									shapeScale={shaderConfig.shapeScale}
									scale={1}
									rotation={0}
									speed={0.5}
									colors={shaderConfig.colors}
								/>
							</div>

							{/* Glassmorphism Overlay */}
							<div className="relative z-10 p-6 rounded-2xl h-full flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
								{/* Glass background */}
								<div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl" />
								{/* Inner glow / gradient */}
								<div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-black/20 rounded-2xl" />
								{/* Top highlight */}
								<div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

								{/* Icon */}
								<div className="relative z-10 w-16 h-16 md:w-20 md:h-20 filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
									<Image src={item.icon} alt={item.name} fill className="object-contain" />
								</div>

								{/* Text Content */}
								<div className="relative z-10">
									<h3 className="text-lg md:text-xl font-bold text-white drop-shadow-md mb-1">{item.name}</h3>
									{item.quantity && item.quantity > 1 && (
										<span className="text-sm text-white/90 font-medium drop-shadow-sm">×{item.quantity}</span>
									)}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</SectionWrapper>
	)
}
