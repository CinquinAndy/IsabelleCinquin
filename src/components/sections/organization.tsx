import Image from 'next/image'
import { Backpack, Home } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'
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

export function Organization({ bagItems, bagImage, nounouItems, nounouImage }: OrganizationProps) {
	const bagList = bagItems && bagItems.length > 0 ? bagItems.map(i => i.item) : defaultBagItems
	const nounouList = nounouItems && nounouItems.length > 0 ? nounouItems.map(i => i.item) : defaultNounouItems

	const bagMediaUrl = typeof bagImage === 'object' && bagImage?.url ? bagImage.url : null
	const nounouMediaUrl = typeof nounouImage === 'object' && nounouImage?.url ? nounouImage.url : null

	return (
		<SectionWrapper id="organisation" variant="primary">
			<SectionTitle>Organisation des affaires</SectionTitle>

			<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{/* Sac à langer */}
				<div className="bg-white/10 rounded-2xl p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
							<Backpack className="w-6 h-6" />
						</div>
						<h3 className="text-xl font-bold">Dans le sac à langer</h3>
					</div>

					<ul className="space-y-3 mb-6">
						{bagList.map(item => (
							<li key={item} className="flex items-center gap-3">
								<span className="w-2 h-2 rounded-full bg-white/60" />
								{item}
							</li>
						))}
					</ul>

					{bagMediaUrl && (
						<div className="aspect-video relative rounded-xl overflow-hidden">
							<Image
								src={bagMediaUrl}
								alt="Sac à langer"
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					)}
				</div>

				{/* Chez nounou */}
				<div className="bg-white/10 rounded-2xl p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
							<Home className="w-6 h-6" />
						</div>
						<h3 className="text-xl font-bold">Chez nounou</h3>
					</div>

					<ul className="space-y-3 mb-6">
						{nounouList.map(item => (
							<li key={item} className="flex items-center gap-3">
								<span className="w-2 h-2 rounded-full bg-white/60" />
								{item}
							</li>
						))}
					</ul>

					{nounouMediaUrl && (
						<div className="aspect-video relative rounded-xl overflow-hidden">
							<Image
								src={nounouMediaUrl}
								alt="Chez nounou"
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					)}
				</div>
			</div>
		</SectionWrapper>
	)
}
