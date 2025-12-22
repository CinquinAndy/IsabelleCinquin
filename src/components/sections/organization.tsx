'use client'

import { Backpack, Home } from 'lucide-react'
import Image from 'next/image'
import { Compare } from '@/components/ui/compare'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import type { Media } from '@/payload-types'

interface OrganizationItem {
	id?: string
	item: string
}

interface OrganizationProps {
	bagItems?: OrganizationItem[] | null
	bagImage?: Media | number | null
	nounouItems?: OrganizationItem[] | null
	nounouImage?: Media | number | null
}

const defaultBagItems = [
	'Le carnet de santé',
	'Des vêtements de rechange',
	'Doudou',
	'Des tétines',
	'De la crème solaire',
]

const defaultNounouItems = ['Des couches', 'Un biberon', 'Du lait', 'Une turbulette', 'Des chaussons']

export function Organization({ bagItems, nounouItems }: OrganizationProps) {
	const bagList = bagItems && bagItems.length > 0 ? bagItems.map(i => i.item) : defaultBagItems
	const nounouList = nounouItems && nounouItems.length > 0 ? nounouItems.map(i => i.item) : defaultNounouItems

	return (
		<SectionWrapper id="organisation" variant="secondary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
						Organisation des <span className="font-handwriting text-white/80">affaires</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
						Glissez pour comparer ce qu'il faut apporter et ce qui est fourni
					</p>
				</div>

				{/* Compare Section */}
				<div className="flex justify-center">
					<div className="relative">
						{/* Compare Component with styled cards */}
						<Compare
							firstImage="/sac-langer.png"
							secondImage="/chez-nounou.png"
							className="h-[400px] w-full max-w-[800px] md:h-[500px] rounded-3xl border border-white/20"
							slideMode="drag"
							showHandlebar={true}
							initialSliderPercentage={50}
							sliderColor="hsl(285, 60%, 50%)"
						/>

						{/* Overlay Cards for Lists */}
						<div className="absolute inset-0 pointer-events-none flex">
							{/* Left Card - Sac à langer */}
							<div className="w-1/2 p-4 md:p-8 flex flex-col">
								<div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 h-full">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-500/30 flex items-center justify-center">
											<Backpack className="w-5 h-5 md:w-6 md:h-6 text-pink-300" />
										</div>
										<h3 className="text-lg md:text-xl font-bold text-white">Dans le sac</h3>
									</div>
									<ul className="space-y-2 md:space-y-3">
										{bagList.map(item => (
											<li key={item} className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
												<span className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
												<span className="text-white/90">{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* Right Card - Chez nounou */}
							<div className="w-1/2 p-4 md:p-8 flex flex-col">
								<div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 h-full">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/30 flex items-center justify-center">
											<Home className="w-5 h-5 md:w-6 md:h-6 text-emerald-300" />
										</div>
										<h3 className="text-lg md:text-xl font-bold text-white">Chez nounou</h3>
									</div>
									<ul className="space-y-2 md:space-y-3">
										{nounouList.map(item => (
											<li key={item} className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
												<span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
												<span className="text-white/90">{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Legend */}
				<div className="flex justify-center gap-8 mt-8">
					<div className="flex items-center gap-2">
						<span className="w-3 h-3 rounded-full bg-pink-400" />
						<span className="text-white/70 text-sm">À apporter</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-3 h-3 rounded-full bg-emerald-400" />
						<span className="text-white/70 text-sm">Fourni par nounou</span>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
