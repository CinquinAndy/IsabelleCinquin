// storage-adapter-import-placeholder

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Landing } from './globals/Landing'
import { Seo } from './globals/Seo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
	admin: {
		meta: {
			title: 'Isabelle Cinquin - Administration',
			description: 'Isabelle Cinquin - Administration',
			icons: [{ rel: 'icon', url: '/favicon.ico', type: 'image/x-icon' }],
		},
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Posts, Categories],
	globals: [Landing, Seo],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || '',
		},
	}),
	sharp,
	plugins: [
		payloadCloudPlugin(),
		s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || '',
			config: {
				endpoint: process.env.S3_ENDPOINT || '',
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
				},
				region: process.env.S3_REGION || 'auto',
			},
		}),
	],
})
