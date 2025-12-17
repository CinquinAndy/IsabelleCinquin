/**
 * Generate alt text for an image using ForVoyez API
 */
export async function generateAltText(imageUrl: string, filename: string): Promise<string | null> {
	try {
		const forvoyezToken = process.env.FORVOYEZ_TOKEN
		if (!forvoyezToken) {
			console.error('ForVoyez token not configured')
			return null
		}

		// Fetch the image
		const imageResponse = await fetch(imageUrl)
		if (!imageResponse.ok) {
			console.error('Failed to fetch image:', imageUrl)
			return null
		}

		const imageBlob = await imageResponse.blob()

		// Prepare FormData for ForVoyez API
		const formData = new FormData()
		formData.append('image', imageBlob, filename)
		formData.append('language', 'fr')

		const schema = JSON.stringify({
			alternativeText: 'string',
		})
		formData.append('schema', schema)

		// Call ForVoyez API
		const forvoyezResponse = await fetch('https://forvoyez.com/api/describe', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${forvoyezToken}`,
			},
			body: formData,
		})

		if (!forvoyezResponse.ok) {
			console.error('ForVoyez API error:', forvoyezResponse.status)
			return null
		}

		const forvoyezData = await forvoyezResponse.json()
		const altText = forvoyezData.alternativeText || forvoyezData.caption || forvoyezData.title || ''

		return altText
	} catch (error) {
		console.error('Error generating alt text:', error)
		return null
	}
}
