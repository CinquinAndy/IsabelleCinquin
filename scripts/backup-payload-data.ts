/**
 * Backup script for all Payload CMS data
 * Exports all collections and globals to JSON files
 * 
 * Usage: npx tsx --env-file=.env scripts/backup-payload-data.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import fs from 'fs'
import path from 'path'

async function backupPayloadData() {
	const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
	const backupDir = path.join(process.cwd(), 'backups', `backup-${timestamp}`)
	
	console.log('🔐 Starting Payload data backup...')
	console.log(`📁 Backup directory: ${backupDir}`)
	
	// Create backup directory
	fs.mkdirSync(backupDir, { recursive: true })
	
	try {
		const payload = await getPayload({ config })
		
		// Backup Collections
		console.log('\n📦 Backing up Collections...')
		const collections = ['users', 'media', 'posts', 'categories']
		
		for (const collection of collections) {
			try {
				console.log(`  - Fetching ${collection}...`)
				const data = await payload.find({
					collection: collection as any,
					limit: 10000,
					depth: 0,
				})
				
				const filePath = path.join(backupDir, `${collection}.json`)
				fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
				console.log(`  ✅ ${collection}: ${data.docs.length} documents saved`)
			} catch (error) {
				console.error(`  ❌ Error backing up ${collection}:`, error)
			}
		}
		
		// Backup Globals
		console.log('\n🌍 Backing up Globals...')
		const globals = ['landing']
		
		for (const global of globals) {
			try {
				console.log(`  - Fetching ${global}...`)
				const data = await payload.findGlobal({
					slug: global as any,
				})
				
				const filePath = path.join(backupDir, `global-${global}.json`)
				fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
				console.log(`  ✅ ${global} global saved`)
			} catch (error) {
				console.error(`  ❌ Error backing up ${global}:`, error)
			}
		}
		
		// Create backup manifest
		const manifest = {
			timestamp: new Date().toISOString(),
			collections: collections,
			globals: globals,
			payloadVersion: '3.x',
		}
		
		fs.writeFileSync(
			path.join(backupDir, 'manifest.json'),
			JSON.stringify(manifest, null, 2)
		)
		
		console.log('\n✅ Backup completed successfully!')
		console.log(`📂 Backup location: ${backupDir}`)
		console.log('\n💡 To restore, copy files back and re-import via Payload API')
		
		process.exit(0)
	} catch (error) {
		console.error('❌ Backup failed:', error)
		process.exit(1)
	}
}

backupPayloadData()
