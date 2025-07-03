# Système de Traductions

Ce projet utilise un système de traductions hybride qui combine les fichiers JSON statiques et Firebase Realtime Database.

## Architecture

### 1. Fichiers JSON (Traductions par défaut)
- **Localisation** : `messages/{locale}.json`
- **Usage** : Traductions statiques, versionnées dans Git
- **Avantages** : Rapide, pas de dépendance réseau

### 2. Firebase Realtime Database (Traductions dynamiques)
- **Localisation** : `translations/{locale}/{key}`
- **Usage** : Traductions modifiées via l'interface admin
- **Avantages** : Modifications en temps réel, pas de redéploiement

### 3. Fusion automatique
Le système charge d'abord les traductions JSON, puis les fusionne avec les traductions Firebase. Les traductions Firebase ont la priorité.

## Structure des données Firebase

```
translations/
├── fr/
│   ├── common.title/
│   │   ├── value: "Titre"
│   │   └── updatedAt: "2024-01-01T12:00:00.000Z"
│   └── common.description/
│       ├── value: "Description"
│       └── updatedAt: "2024-01-01T12:00:00.000Z"
├── en/
│   └── ...
└── nl/
    └── ...
```

## Configuration requise

### Variables d'environnement
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

### Règles Firebase Realtime Database
```json
{
  "rules": {
    "translations": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Migration des traductions existantes

Pour migrer toutes les traductions JSON vers Firebase :

```bash
npm run migrate-translations
```

## Utilisation

### Dans les composants
```tsx
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('common')
  return <h1>{t('title')}</h1>
}
```

### Édition via l'interface admin
1. Connectez-vous en tant qu'admin
2. Activez le mode édition des traductions
3. Cliquez sur un texte pour l'éditer
4. Sauvegardez les modifications

## Avantages du système hybride

1. **Performance** : Les traductions par défaut sont chargées rapidement depuis les fichiers JSON
2. **Flexibilité** : Les traductions peuvent être modifiées sans redéploiement
3. **Fiabilité** : En cas de problème avec Firebase, les traductions JSON restent disponibles
4. **Versioning** : Les traductions par défaut sont versionnées dans Git
5. **Temps réel** : Les modifications sont visibles immédiatement

## Dépannage

### Erreur 500 lors de la sauvegarde
- Vérifiez que Firebase Realtime Database est activé
- Vérifiez les variables d'environnement
- Vérifiez les règles de sécurité Firebase

### Traductions non mises à jour
- Vérifiez que l'utilisateur est connecté en tant qu'admin
- Vérifiez les logs de la console pour les erreurs
- Vérifiez que la clé de traduction est correcte 