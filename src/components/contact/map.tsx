interface MapProps {
	lat?: number
	lng?: number
	className?: string
}

export function LocationMap({ lat = 46.349104, lng = 6.397748, className = '' }: MapProps) {
	// Using OpenStreetMap iframe for simplicity - no extra dependencies
	const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.005}%2C${lng + 0.01}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`

	return (
		<div className={`relative rounded-xl overflow-hidden ${className}`}>
			<iframe
				title="Localisation Nounou Sciez"
				src={mapUrl}
				width="100%"
				height="100%"
				style={{ border: 0, minHeight: '300px' }}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
			<a
				href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 text-primary rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-md"
			>
				Voir sur la carte
			</a>
		</div>
	)
}
