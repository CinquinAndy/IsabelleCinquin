import { Check } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/section-wrapper'
import { SectionTitle } from '@/components/ui/section-title'

interface EquipmentItem {
	id?: string
	name: string
	quantity?: number | null
}

interface EquipmentProps {
	equipment?: EquipmentItem[] | null
}

export function Equipment({ equipment }: EquipmentProps) {
	const defaultEquipment: EquipmentItem[] = [
		{ id: '1', name: 'Poussettes simples et doubles', quantity: 2 },
		{ id: '2', name: 'Chaises haute', quantity: 4 },
		{ id: '3', name: 'Transat', quantity: 1 },
		{ id: '4', name: 'Table à langer', quantity: 1 },
		{ id: '5', name: 'Lits en bois à barreau', quantity: 3 },
		{ id: '6', name: 'Sièges auto isofix bébé confort', quantity: 2 },
	]

	const items = equipment && equipment.length > 0 ? equipment : defaultEquipment

	return (
		<SectionWrapper id="equipements" variant="secondary">
			<SectionTitle subtitle="Tout le matériel nécessaire pour accueillir vos enfants">Équipements</SectionTitle>

			<div className="max-w-2xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{items.map((item, index) => (
						<div key={item.id || index} className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
								<Check className="w-4 h-4" />
							</div>
							<div>
								<span className="font-medium">{item.name}</span>
								{item.quantity && item.quantity > 1 && (
									<span className="ml-2 text-sm opacity-70">x{item.quantity}</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}


