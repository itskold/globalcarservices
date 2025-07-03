# Configuration de la Purge de Cache Vercel

Ce système purge automatiquement le cache Vercel après chaque modification de traduction pour que les changements soient visibles immédiatement.

## Variables d'environnement requises

Ajoutez ces variables dans les paramètres de votre projet Vercel :

### 1. VERCEL_TOKEN
- **Où l'obtenir** : https://vercel.com/account/tokens
- **Description** : Token d'API Vercel avec permissions de purge de cache
- **Permissions requises** : `cache:write`

### 2. VERCEL_PROJECT_ID
- **Où l'obtenir** : Dans les paramètres de votre projet Vercel
- **Description** : ID unique de votre projet Vercel

## Configuration des variables

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Allez dans "Settings" → "Environment Variables"
4. Ajoutez les variables :
   ```
   VERCEL_TOKEN=votre_token_ici
   VERCEL_PROJECT_ID=votre_project_id_ici
   ```

## Comment ça fonctionne

### Purge automatique
- Après chaque sauvegarde de traduction, le cache Vercel est automatiquement purgé
- Les nouvelles traductions sont visibles immédiatement

### Purge manuelle
- Bouton ⚡ dans l'interface admin pour purger manuellement
- API endpoint : `POST /api/admin/purge-cache`

## Dépannage

### Erreur "Vercel token manquant"
- Vérifiez que `VERCEL_TOKEN` est configuré dans Vercel
- Vérifiez que le token a les bonnes permissions

### Erreur "Project ID manquant"
- Vérifiez que `VERCEL_PROJECT_ID` est configuré
- L'ID se trouve dans les paramètres du projet Vercel

### Cache toujours en cache
- Vérifiez les logs Vercel pour voir si la purge fonctionne
- Utilisez le bouton de purge manuelle pour tester

## Logs

Les logs de purge apparaissent dans la console Vercel :
```
[Cache] Tentative de purge du cache Vercel...
[Cache] Cache Vercel purgé avec succès
```

## Alternative sans purge automatique

Si vous ne voulez pas configurer la purge automatique, vous pouvez :
1. Ne pas configurer les variables Vercel
2. Utiliser seulement le bouton de rechargement (🔄)
3. Recharger manuellement la page après modification 