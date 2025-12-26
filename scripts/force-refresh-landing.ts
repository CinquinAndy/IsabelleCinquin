/**
 * Force refresh Landing global schema in database
 * This will re-save the Landing global with current schema
 * 
 * Usage: node --env-file=.env --import tsx scripts/force-refresh-landing.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function forceRefreshLanding() {
	console.log('🔄 Force refreshing Landing global schema...')
	
	try {
		const payload = await getPayload({ config })
		
		// Get current landing data
		const landing = await payload.findGlobal({
			slug: 'landing',
		})
		
		console.log('📄 Current landing data fetched')
		
		// Create a clean copy with only fields that exist in current schema
		const cleanedData: any = {}
		
		// Copy all valid fields (excluding seo if it exists)
		for (const [key, value] of Object.entries(landing)) {
			if (key !== 'seo' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
				cleanedData[key] = value
			}
		}
		
		console.log('🧹 Cleaned data prepared (removed seo if existed)')
		
		// Force update with cleaned data
		await payload.updateGlobal({
			slug: 'landing',
			data: cleanedData,
		})
		
		console.log('✅ Landing global schema forcefully refreshed!')
		console.log('🎉 Database should now match current schema')
		
		process.exit(0)
	} catch (error) {
		console.error('❌ Force refresh failed:', error)
		process.exit(1)
	}
}

forceRefreshLanding()
