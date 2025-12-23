import * as migration_20251223_115806_initial from './20251223_115806_initial';
import * as migration_20251223_130451_initial from './20251223_130451_initial';
import * as migration_20251223_130726_initial from './20251223_130726_initial';

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
    name: '20251223_130726_initial'
  },
];
