// Charge les mêmes fichiers .env que `next build` (ce que fait la CLI Payload avant de lancer un script).
// Module à part, importé en premier : la config Payload lit process.env dès son import.
import { loadEnv } from 'payload/node'

loadEnv()
