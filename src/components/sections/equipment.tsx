'use client'

import { Warp } from '@paper-design/shaders-react'
import Image from 'next/image'
import { SectionTitle } from '@/components/ui/section-title'
import { SectionWrapper } from '@/components/ui/section-wrapper'

interface EquipmentItem {
	id?: string
	name: string
	quantity?: number | null
	icon: string
	gridSpan?: 'single' | 'double'
}

interface EquipmentProps {
	equipment?: { id?: string; name: string; quantity?: number | null }[] | null
}

const defaultEquipmentWithIcons: EquipmentItem[] = [
	{
		id: '1',
		name: 'Poussettes simples et doubles',
		quantity: 2,
		icon: '/icons/scribbbles/7/SVG/Fichier 1.svg',
		gridSpan: 'double',
	},
	{
		id: '2',
		name: 'Chaises haute',
		quantity: 4,
		icon: '/icons/scribbbles/7/SVG/Fichier 10.svg',
		gridSpan: 'single',
	},
	{
		id: '3',
		name: 'Transat',
		quantity: 1,
		icon: '/icons/scribbbles/7/SVG/Fichier 5.svg',
		gridSpan: 'single',
	},
	{
		id: '4',
		name: 'Table à langer',
		quantity: 1,
		icon: '/icons/scribbbles/7/SVG/Fichier 18.svg',
		gridSpan: 'single',
	},
	{
		id: '5',
		name: 'Lits en bois à barreau',
		quantity: 3,
		icon: '/icons/scribbbles/7/SVG/Fichier 20.svg',
		gridSpan: 'single',
	},
	{
		id: '6',
		name: 'Sièges auto isofix bébé confort',
		quantity: 2,
		icon: '/icons/scribbbles/7/SVG/Fichier 26.svg',
		gridSpan: 'double',
	},
]

// Shader configurations using the violet color palette
const getShaderConfig = (index: number) => {
	const configs = [
		{
			proportion: 0.3,
			softness: 0.8,
			distortion: 0.15,
			swirl: 0.6,
			swirlIterations: 8,
			shape: 'checks' as const,
			shapeScale: 0.08,
			colors: ['hsl(285, 60%, 30%)', 'hsl(320, 60%, 50%)', 'hsl(285, 50%, 40%)', 'hsl(300, 70%, 60%)'],
		},
		{
			proportion: 0.4,
			softness: 1.2,
			distortion: 0.2,
			swirl: 0.9,
			swirlIterations: 12,
			shape: 'dots' as const,
			shapeScale: 0.12,
			colors: ['hsl(285, 50%, 25%)', 'hsl(285, 60%, 55%)', 'hsl(320, 50%, 35%)', 'hsl(285, 70%, 65%)'],
		},
		{
			proportion: 0.35,
			softness: 0.9,
			distortion: 0.18,
			swirl: 0.7,
			swirlIterations: 10,
			shape: 'checks' as const,
			shapeScale: 0.1,
			colors: ['hsl(320, 60%, 35%)', 'hsl(285, 60%, 50%)', 'hsl(300, 50%, 30%)', 'hsl(320, 70%, 55%)'],
		},
		{
			proportion: 0.45,
			softness: 1.1,
			distortion: 0.22,
			swirl: 0.8,
			swirlIterations: 15,
			shape: 'dots' as const,
			shapeScale: 0.09,
			colors: ['hsl(285, 55%, 28%)', 'hsl(285, 65%, 52%)', 'hsl(320, 55%, 38%)', 'hsl(300, 65%, 60%)'],
		},
		{
			proportion: 0.38,
			softness: 0.95,
			distortion: 0.16,
			swirl: 0.85,
			swirlIterations: 11,
			shape: 'checks' as const,
			shapeScale: 0.11,
			colors: ['hsl(285, 60%, 32%)', 'hsl(320, 55%, 48%)', 'hsl(285, 50%, 42%)', 'hsl(320, 65%, 58%)'],
		},
		{
			proportion: 0.42,
			softness: 1.0,
			distortion: 0.19,
			swirl: 0.75,
			swirlIterations: 9,
			shape: 'dots' as const,
			shapeScale: 0.13,
			colors: ['hsl(300, 55%, 30%)', 'hsl(285, 60%, 55%)', 'hsl(285, 55%, 35%)', 'hsl(320, 60%, 62%)'],
		},
	]
	return configs[index % configs.length]
}

export function Equipment({ equipment }: EquipmentProps) {
	// Use provided equipment data or fall back to defaults with icons
	const items: EquipmentItem[] =
		equipment && equipment.length > 0
			? equipment.map((item, index) => ({
					...item,
					icon: defaultEquipmentWithIcons[index]?.icon || '/icons/scribbbles/7/SVG/Fichier 1.svg',
					gridSpan: defaultEquipmentWithIcons[index]?.gridSpan || 'single',
				}))
			: defaultEquipmentWithIcons

	return (
		<SectionWrapper id="equipements" variant="secondary">
			<SectionTitle subtitle="Tout le matériel nécessaire pour accueillir vos enfants">Équipements</SectionTitle>

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

							{/* Content Overlay */}
							<div className="relative z-10 p-6 rounded-2xl h-full flex flex-col justify-between bg-black/40 border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/50 group-hover:border-white/30">
								{/* Icon */}
								<div className="w-16 h-16 md:w-20 md:h-20 relative filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
									<Image src={item.icon} alt={item.name} fill className="object-contain" />
								</div>

								{/* Text Content */}
								<div>
									<h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.name}</h3>
									{item.quantity && item.quantity > 1 && (
										<span className="text-sm text-white/80 font-medium">×{item.quantity}</span>
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
