# Mariage Candice & Michaël — 28 août 2027

Site du mariage (Astro, statique) avec formulaire de réponse stocké dans Supabase.

## Développement

```sh
npm install
cp .env.example .env   # renseigner l'URL et la clé anon Supabase
npm run dev
```

Tout le contenu (programme, infos pratiques, date limite de réponse) est dans `src/data/wedding.ts`.

## Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Exécuter `supabase/schema.sql` dans le SQL editor.
3. Récupérer l'URL et la clé `anon` (Settings → API).

Les invités peuvent uniquement **insérer** une réponse. Pour consulter les réponses : Table editor → `rsvps`, ou la vue `rsvp_guests` (une ligne par personne, dernière réponse par e-mail) :

```sql
select attending, is_child, count(*) from rsvp_guests group by 1, 2;
```

## Déploiement (GitHub Pages)

1. Settings → Pages → Source : **GitHub Actions**.
2. Settings → Secrets and variables → Actions → **Variables** : `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (la clé anon est publique par nature, la sécurité repose sur la RLS).
3. Chaque push sur `main` déploie le site sur `https://michaelromagne.github.io/wedding-website/`.

Pour un nom de domaine personnalisé, builder avec `SITE_URL=https://mon-domaine.fr BASE_PATH=/`.
