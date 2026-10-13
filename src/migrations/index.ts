import * as migration_20251223_115806_initial from './20251223_115806_initial'
import * as migration_20251223_130451_initial from './20251223_130451_initial'
import * as migration_20251223_130726_initial from './20251223_130726_initial'
import * as migration_20261013_175147_payload_3_90_columns from './20261013_175147_payload_3_90_columns'

export const migrations = [
	{
		up: migration_20251223_115806_initial.up,
		down: migration_20251223_115806_initial.down,
		name: '20251223_115806_initial',
	},
	{
		up: migration_20251223_130451_initial.up,
		down: migration_20251223_130451_initial.down,
		name: '20251223_130451_initial',
	},
	{
		up: migration_20251223_130726_initial.up,
		down: migration_20251223_130726_initial.down,
		name: '20251223_130726_initial',
	},
	{
		up: migration_20261013_175147_payload_3_90_columns.up,
		down: migration_20261013_175147_payload_3_90_columns.down,
		name: '20261013_175147_payload_3_90_columns',
	},
]
