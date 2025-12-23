'use client'

import { Backpack, Home } from 'lucide-react'
import { Compare } from '@/components/ui/compare'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { formatMediaUrl } from '@/lib/utils'
import type { LandingOrganization } from '@/types/landing'

interface OrganizationProps {
	organization?: LandingOrganization | null
}

export function Organization({ organization }: OrganizationProps) {
	if (!organization?.title || !organization?.bagItems || !organization?.nounouItems) {
		throw new Error('Missing required data for Organization section')
	}

	const title = organization.title
	const subtitle = organization.subtitle
	const bagItems = organization.bagItems
	const nounouItems = organization.nounouItems

	const bagList = bagItems.map(i => i.item)
	const nounouList = nounouItems.map(i => i.item)

	const bagImageUrl =
		formatMediaUrl(typeof organization.bagImage === 'object' && organization.bagImage?.url
			? organization.bagImage.url
			: null)
	
	const nounouImageUrl =
		formatMediaUrl(typeof organization.nounouImage === 'object' && organization.nounouImage?.url
			? organization.nounouImage.url
			: null)

	if (!bagImageUrl || !nounouImageUrl) {
		throw new Error('Missing required images for Organization section')
	}

	return (
		<SectionWrapper id="organisation" variant="secondary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
						{title.split(' ').slice(0, -1).join(' ')}{' '}
						<span className="font-handwriting text-white/80">{title.split(' ').slice(-1)}</span>
					</h2>
					<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">{subtitle}</p>
				</div>

				{/* Compare with images */}
				<div className="flex justify-center mb-12">
					<div className="relative">
						{/* Labels */}
						<div className="flex justify-between mb-4 px-4">
							<div className="flex items-center gap-2">
								<Backpack className="w-5 h-5 text-pink-300" />
								<span className="text-white font-semibold">Dans le sac</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-white font-semibold">Chez nounou</span>
								<Home className="w-5 h-5 text-emerald-300" />
							</div>
						</div>

						<div className="p-4 border rounded-3xl bg-white/5 border-white/10">
							<Compare
								firstImage={bagImageUrl}
								secondImage={nounouImageUrl}
								firstImageClassName="object-cover"
								secondImageClassname="object-cover"
								className="h-[300px] w-[300px] md:h-[400px] md:w-[500px] rounded-2xl"
								slideMode="hover"
								showHandlebar={true}
								initialSliderPercentage={50}
							/>
						</div>
					</div>
				</div>

				{/* Two cards below */}
				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Sac à langer */}
					<div className="bg-white/10 rounded-2xl p-6 border border-white/10">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
								<Backpack className="w-6 h-6 text-pink-300" />
							</div>
							<h3 className="text-xl font-bold text-white">Dans le sac à langer</h3>
						</div>
						<ul className="space-y-3">
							{bagList.map(item => (
								<li key={item} className="flex items-center gap-3">
									<span className="w-2 h-2 rounded-full bg-pink-400" />
									<span className="text-white/90">{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Chez nounou */}
					<div className="bg-white/10 rounded-2xl p-6 border border-white/10">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
								<Home className="w-6 h-6 text-emerald-300" />
							</div>
							<h3 className="text-xl font-bold text-white">Chez nounou</h3>
						</div>
						<ul className="space-y-3">
							{nounouList.map(item => (
								<li key={item} className="flex items-center gap-3">
									<span className="w-2 h-2 rounded-full bg-emerald-400" />
									<span className="text-white/90">{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
