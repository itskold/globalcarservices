import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste des langues supportées
  locales: ['nl', 'fr', 'en'],
  
  // Langue par défaut
  defaultLocale: 'nl',
  
  // Redirection basée sur les préférences du navigateur
  localeDetection: true
});

export const config = {
  // Matcher pour les routes qui doivent être gérées par le middleware
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 