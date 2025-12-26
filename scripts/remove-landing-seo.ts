/**
 * Migration script to remove the old 'seo' field from Landing global
 * Run this once to clean up the database after removing SEO from Landing schema
 * 
 * Usage: node --env-file=.env --import tsx scripts/remove-landing-seo.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function migrateLanding() {
	console.log('🔧 Starting Landing SEO field removal migration...')
	
	try {
		const payload = await getPayload({ config })
		
		// Get current landing data
		const landing = await payload.findGlobal({
			slug: 'landing',
		})
		
		console.log('📄 Current landing data fetched')
		
		// Remove seo field if it exists
		if ('seo' in landing) {
			console.log('🗑️  Found old SEO field, removing...')
			
			// @ts-ignore - accessing potentially missing field
			delete landing.seo
			
			// Update the global without the seo field
			await payload.updateGlobal({
				slug: 'landing',
				data: landing as any,
			})
			
			console.log('✅ SEO field successfully removed from Landing global')
		} else {
			console.log('✅ No SEO field found - database already clean')
		}
		
		console.log('🎉 Migration completed successfully!')
		process.exit(0)
	} catch (error) {
		console.error('❌ Migration failed:', error)
		process.exit(1)
	}
}

migrateLanding()
