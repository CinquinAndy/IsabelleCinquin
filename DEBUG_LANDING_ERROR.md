# Guide de Résolution - Erreur Landing Admin

## Problème Actuel
Erreur: "right-hand side of 'in' should be an object, got undefined"  
URL: `http://localhost:3000/admin/globals/landing`

## Ce qui a été fait ✅
1. ✅ Backup complet de la base de données
2. ✅ Suppression de tous les champs SEO (Landing.ts, seo.ts, payload.config)
3. ✅ Suppression du global Seo
4. ✅ Suppression du composant LandingSeoGenerator
5. ✅ Nettoyage des caches (.next, .turbo, .payload)
6. ✅ Régénération des types Payload
7. ✅ Migration base de données
8. ✅ Force-refresh du schéma Landing en PostgreSQL
9. ✅ Vérification de la structure Landing.ts (valide)

## Actions de débogage à essayer

###  1. Hard Refresh Navigateur
```
Ctrl + Shift + R (ou Cmd + Shift + R sur Mac)
```
Cela vide le cache navigateur.

### 2. Inspecter l'erreur exacte
Ouvrir la console navigateur (F12) et:
1. Aller sur http://localhost:3000/admin/globals/landing
2. Noter la stack trace complète de l'erreur
3. Identifier le fichier Payload qui cause l'erreur

### 3. Tester avec un autre navigateur
Essayer en mode navigation privée ou autre navigateur pour éliminer le cache.

### 4. Solution temporaire de contournement
Si l'erreur persiste, on peut:
- Créer un nouveau global Landing2 avec une structure simplifiée
- Migrer les données
- Supprimer l'ancien Landing

### 5. Vérification PostgreSQL directe
Si vraiment bloqué, inspecter la table `payload_globals` directement:
```sql
SELECT * FROM payload_globals WHERE global_slug = 'landing';
```

## Hypothèses sur la cause
1. **Cache navigateur** - Le navigateur a mis en cache l'ancien schéma
2. **Bug Payload 3.x** - Connu avec mise à jour de schéma globaux
3. **Métadonnées Payload** - Payload garde des métadonnées de schéma en base
4. **Code compilé** - Turbopack a mis en cache une ancienne version

## Prochaines étapes recommandées
1. Hard refresh navigateur
2. Vider complètement le cache navigateur
3. Tester en navigation privée
4. Si ça persiste: examiner stack trace console pour identifier le fichier Payload exact
