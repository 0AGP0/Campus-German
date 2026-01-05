import { defineCollection, z } from 'astro:content';

const kurslarCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['tr', 'de', 'en']),
    badge: z.object({
      icon: z.string(),
      text: z.string(),
    }),
    description: z.string(),
    image: z.string(),
    features: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })),
    heroButtons: z.object({
      primary: z.object({
        text: z.string(),
        icon: z.string(),
        href: z.string(),
      }),
      secondary: z.object({
        text: z.string(),
        icon: z.string(),
        href: z.string(),
      }),
    }),
    tabs: z.array(z.object({
      id: z.string(),
      icon: z.string(),
      title: z.string(),
      content: z.object({
        title: z.string(),
        items: z.array(z.object({
          icon: z.string(),
          text: z.string(),
        })).optional(),
        additionalInfo: z.object({
          title: z.string(),
          text: z.string(),
        }).optional(),
        pricing: z.array(z.object({
          name: z.string(),
          duration: z.string(),
          schedule: z.string(),
          price: z.string(),
          highlighted: z.boolean().optional(),
        })).optional(),
        lessons: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })).optional(),
        paragraphs: z.array(z.object({
          heading: z.string().optional(),
          text: z.string(),
        })).optional(),
      }),
    })),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
    hasDemandForm: z.boolean().optional(),
  }),
});

const unsereVorteileCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['tr', 'de', 'en']),
    description: z.string(),
    image: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
    icon: z.string(),
  }),
});

const unsereDienstleistungenCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['tr', 'de', 'en']),
    description: z.string(),
    image: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  'kurslar': kurslarCollection,
  'unsere-vorteile': unsereVorteileCollection,
  'unsere-dienstleistungen': unsereDienstleistungenCollection,
};

