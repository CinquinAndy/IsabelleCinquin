import { Moon } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'

interface SleepProps {
	content?: unknown
}

export function Sleep(_props: SleepProps) {
	return (
		<SectionWrapper id="sommeil" variant="primary">
			<SectionTitle>Sommeil</SectionTitle>

			<div className="max-w-2xl mx-auto text-center">
				<div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
					<Moon className="w-10 h-10" />
				</div>

				<p className="text-lg leading-relaxed opacity-90">
					Chez nounou, les enfants dorment dans un lit à barreaux, chacun dans une chambre séparée pour plus de confort
					et de sérénité.
				</p>
			</div>
		</SectionWrapper>
	)
}
