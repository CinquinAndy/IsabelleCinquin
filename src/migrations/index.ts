import * as migration_20251223_115806_initial from './20251223_115806_initial'

export const migrations = [
	{
		up: migration_20251223_115806_initial.up,
		down: migration_20251223_115806_initial.down,
		name: '20251223_115806_initial',
	},
]
