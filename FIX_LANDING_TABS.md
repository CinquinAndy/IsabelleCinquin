# Guide: Corriger l'Erreur Landing Admin

## ❌ Problème Actuel
```
TypeError: right-hand side of 'in' should be an object, got undefined
tabHasName types.ts:2049
```

**URL:** `http://localhost:3000/admin/globals/landing`

## 🔍 Cause Racine
Payload CMS essaie d'accéder à un **2ème tab** (l'ancien tab "SEO") qui a été supprimé du schéma, mais le wrapper `tabs` existe toujours avec un seul tab.

##  Solution: Supprimer le Wrapper Tabs

Puisqu'il ne reste qu'un seul tab ("Contenu"), le wrapper `tabs` n'est plus nécessaire et cause le bug.

### Modification Manuelle dans `src/globals/Landing.ts`

#### 1. DÉBUT du fichier (lignes 9-15):

**❌ SUPPRIMER:**
```typescript
fields: [
	{
		type: 'tabs',
		tabs: [
			{
				label: 'Contenu',
				fields: [
```

**✅ REMPLACER PAR:**
```typescript
fields: [
```

#### 2. FIN du fichier (lignes 559-565):

**❌ SUPPRIMER:**
```typescript
				},
			],
		},
			],
		},
	],
}
```

**✅ REMPLACER PAR:**
```typescript
		},
	],
}
```

### Après modification:
```bash
npm run payload generate:types
npm run dev
```

## Alternative: Utiliser sed (Linux/Mac)

```bash
# Backup d'abord
cp src/globals/Landing.ts src/globals/Landing.ts.backup

# Supprimer le début du wrapper tabs (lignes 10-15)
sed -i '10,15d' src/globals/Landing.ts

# Supprimer les brackets en trop à la fin (lignes 559-563 après la modification précédente)  
sed -i '559,563d' src/globals/Landing.ts

# Regénérer les types
npm run payload generate:types
```

## ✅ Vérification
Après modification, `http://localhost:3000/admin/globals/landing` ne devrait plus afficher d'erreur.

---

**Note:** Mes tentatives automatisées ont échoué à cause de la complexité de l'indentation. Une modification manuelle est plus sûre.
