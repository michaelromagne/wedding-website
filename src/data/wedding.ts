// All guest-facing content lives here so it can be edited without touching the layout.

const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const couple = { bride: "Candice", groom: "Michaël" };

// Saturday 28 August 2027, 14h at the mairie (Europe/Paris, UTC+2 in summer).
export const weddingDate = new Date("2027-08-28T14:00:00+02:00");
export const weddingDateLabel = "Samedi 28 août 2027";
export const rsvpDeadlineLabel = "31 janvier 2027";

export const venue = {
  name: "Manoir de Kerleguer",
  city: "Brest",
  mapsUrl: mapsUrl("Manoir de Kerleguer, Brest"),
};

export const townHall = {
  name: "Mairie de Guipavas",
  mapsUrl: mapsUrl("Mairie de Guipavas"),
};

export type ScheduleIcon = "townHall" | "rings" | "cocktail" | "dinner" | "cake" | "disco" | "brunch";

export interface ScheduleItem {
  time: string;
  icon: ScheduleIcon;
  title: string;
  description?: string;
  place?: { name: string; mapsUrl: string };
}

export interface ScheduleDay {
  day: string;
  title: string;
  items: ScheduleItem[];
}

export const schedule: ScheduleDay[] = [
  {
    day: "Samedi 28 août",
    title: "Le grand jour",
    items: [
      {
        time: "14h00",
        icon: "townHall",
        title: "Cérémonie civile",
        description: "On se dit oui une première fois, devant monsieur le maire.",
        place: townHall,
      },
      {
        time: "15h30",
        icon: "rings",
        title: "Cérémonie laïque",
        description: "Entourés de nos proches, dans les jardins du manoir.",
        place: venue,
      },
      {
        time: "17h00",
        icon: "cocktail",
        title: "Cocktail",
        description: "Bulles, jeux et retrouvailles au soleil (on l'espère !).",
      },
      { time: "20h00", icon: "dinner", title: "Dîner" },
      { time: "23h00", icon: "cake", title: "Dessert" },
      {
        time: "Ensuite",
        icon: "disco",
        title: "Ouverture du bal & soirée",
        description: "Place à la piste de danse jusqu'au bout de la nuit.",
      },
    ],
  },
  {
    day: "Dimanche 29 août",
    title: "Le retour de noces",
    items: [
      {
        time: "Fin de matinée",
        icon: "brunch",
        title: "Brunch",
        description:
          "Sortez votre plus beau maillot de sport (vintage, club local, équipe nationale…) : olympiades par équipe, volley, spikeball, palet et pétanque au programme.",
        place: venue,
      },
    ],
  },
];

export const practicalInfo = [
  {
    title: "Hébergement",
    text: "Une partie d'entre vous dormira au manoir : nous vous contacterons personnellement. Pour les autres, nous partagerons une sélection d'hébergements à proximité de Brest et Guipavas.",
  },
  {
    title: "Venir au manoir",
    text: "Le Manoir de Kerleguer se trouve à Brest, à quelques minutes de Guipavas. Pensez au covoiturage, et prévoyez un capitaine de soirée !",
  },
  {
    title: "Les enfants",
    text: "Les enfants sont les bienvenus. Indiquez-les dans le formulaire de réponse pour que nous puissions tout prévoir.",
  },
  {
    title: "Cadeaux",
    text: "Votre présence est notre plus beau cadeau. Pour ceux qui le souhaitent, une urne sera à disposition pendant la soirée.",
  },
];
