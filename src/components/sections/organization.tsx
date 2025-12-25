'use client'

import { motion } from 'framer-motion'
import { Backpack, Home } from 'lucide-react'
import { Compare } from '@/components/ui/compare'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { durations, easings } from '@/lib/animations'
import { formatMediaUrl } from '@/lib/utils'
import type { Landing } from '@/payload-types'

interface OrganizationProps {
	organization?: Landing['organization'] | null
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

	const bagImageUrl = formatMediaUrl(
		typeof organization.bagImage === 'object' && organization.bagImage?.url ? organization.bagImage.url : null
	)

	const nounouImageUrl = formatMediaUrl(
		typeof organization.nounouImage === 'object' && organization.nounouImage?.url ? organization.nounouImage.url : null
	)

	if (!bagImageUrl || !nounouImageUrl) {
		throw new Error('Missing required images for Organization section')
	}

	return (
		<SectionWrapper id="organisation" variant="secondary" className="overflow-hidden">
			<div className="max-w-7xl mx-auto">
				{/* Title with animation */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<motion.h2 
						className="text-3xl md:text-4xl font-bold text-white tracking-tight"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						{title.split(' ').slice(0, -1).join(' ')}{' '}
						<motion.span 
							className="font-handwriting text-white/80 inline-block"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 0.8 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							{title.split(' ').slice(-1)}
						</motion.span>
					</motion.h2>
					<motion.p 
						className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.7 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{subtitle}
					</motion.p>
				</motion.div>

				{/* Compare with images */}
				<div className="flex justify-center mb-12">
					<motion.div 
						className="relative"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
					>
						{/* Labels */}
						<div className="flex justify-between mb-4 px-4">
							<motion.div 
								className="flex items-center gap-2"
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<Backpack className="w-5 h-5 text-pink-300" />
								<span className="text-white font-semibold">Dans le sac</span>
							</motion.div>
							<motion.div 
								className="flex items-center gap-2"
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<span className="text-white font-semibold">Chez nounou</span>
								<Home className="w-5 h-5 text-emerald-300" />
							</motion.div>
						</div>

						<motion.div 
							className="p-4 border rounded-3xl bg-white/5 border-white/10"
							whileHover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
							transition={{ duration: 0.3 }}
						>
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
						</motion.div>
					</motion.div>
				</div>

				{/* Two cards below with stagger */}
				<motion.div 
					className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={{
						hidden: {},
						visible: {
							transition: {
								staggerChildren: 0.15,
								delayChildren: 0.4,
							},
						},
					}}
				>
					{/* Sac à langer */}
					<motion.div 
						className="bg-white/10 rounded-2xl p-6 border border-white/10"
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
						whileHover={{ 
							borderColor: 'rgba(255, 182, 193, 0.3)',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',
						}}
					>
						<div className="flex items-center gap-3 mb-6">
							<motion.div 
								className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center"
								whileHover={{ scale: 1.1, rotate: 10 }}
								transition={{ duration: 0.3 }}
							>
								<Backpack className="w-6 h-6 text-pink-300" />
							</motion.div>
							<h3 className="text-xl font-bold text-white">Dans le sac à langer</h3>
						</div>
						<ul className="space-y-3">
							{bagList.map((item, index) => (
								<motion.li 
									key={item} 
									className="flex items-center gap-3"
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.05, duration: 0.4 }}
								>
									<span className="w-2 h-2 rounded-full bg-pink-400" />
									<span className="text-white/90">{item}</span>
								</motion.li>
							))}
						</ul>
					</motion.div>

					{/* Chez nounou */}
					<motion.div 
						className="bg-white/10 rounded-2xl p-6 border border-white/10"
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0 },
						}}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
						whileHover={{ 
							borderColor: 'rgba(16, 185, 129, 0.3)',
							backgroundColor: 'rgba(255, 255, 255, 0.12)',
						}}
					>
						<div className="flex items-center gap-3 mb-6">
							<motion.div 
								className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center"
								whileHover={{ scale: 1.1, rotate: -10 }}
								transition={{ duration: 0.3 }}
							>
								<Home className="w-6 h-6 text-emerald-300" />
							</motion.div>
							<h3 className="text-xl font-bold text-white">Chez nounou</h3>
						</div>
						<ul className="space-y-3">
							{nounouList.map((item, index) => (
								<motion.li 
									key={item} 
									className="flex items-center gap-3"
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.05, duration: 0.4 }}
								>
									<span className="w-2 h-2 rounded-full bg-emerald-400" />
									<span className="text-white/90">{item}</span>
								</motion.li>
							))}
						</ul>
					</motion.div>
				</motion.div>
			</div>
		</SectionWrapper>
	)
}
