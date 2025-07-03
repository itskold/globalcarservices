'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const locales = ['nl', 'fr', 'en'] as const;

export default function LanguageSwitcher() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Construire le nouveau chemin avec la nouvelle locale
    const segments = pathname.split('/');
    segments[1] = newLocale; // Le premier segment après / est la locale
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[80px] h-9 px-2 border-none bg-transparent hover:bg-gray-100 rounded-full transition-colors">
        <div className="flex items-center gap-1">
          <Globe className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">
            {locale.toUpperCase()}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="w-[120px]">
        {locales.map((loc) => (
          <SelectItem 
            key={loc} 
            value={loc}
            className="cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{loc.toUpperCase()}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 