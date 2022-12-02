interface PronounConfig {
  title: string;
}

const regularPronouns: PronounConfig[] = [
  { title: 'yo' },
  { title: 'tú' },
  { title: 'el/ella/Ud.' },
  { title: 'nosotros' },
  { title: 'vosotros' },
  { title: 'ellos/ellas/Uds.' },
];

const reflexivePronouns: PronounConfig[] = [
  { title: 'me' },
  { title: 'te' },
  { title: 'se' },
  { title: 'nos' },
  { title: 'os' },
  { title: 'se' },
];

type ConfigByKeys = Record<
  string,
  {
    title: string;
    pronouns: {
      regular: PronounConfig[];
      reflexive: PronounConfig[];
    };
  }
>;

export const verbsConfigByKeys: ConfigByKeys = {
  presente: {
    title: 'Indicativo Presente',
    pronouns: {
      regular: regularPronouns,
      reflexive: reflexivePronouns,
    },
  },
  'preterito perfecto simple': {
    title: 'Indicativo Pretérito perfecto simple',
    pronouns: {
      regular: regularPronouns,
      reflexive: reflexivePronouns,
    },
  },
  'preterito imperfecto': {
    title: 'Indicativo Pretérito imperfecto',
    pronouns: {
      regular: regularPronouns,
      reflexive: reflexivePronouns,
    },
  },
  imperativo: {
    title: 'Imperativo',
    pronouns: {
      regular: [
        //
        { title: 'tú' },
        { title: 'Ud.' },
      ],
      reflexive: [
        //
        { title: 'tú' },
        { title: 'Ud.' },
      ],
    },
  },
};

type ConfigByTitles = Record<
  string,
  {
    key: string;
    pronouns: {
      regular: PronounConfig[];
      reflexive: PronounConfig[];
    };
  }
>;

export const verbsConfigByTitles: ConfigByTitles = Object.fromEntries(
  Object.entries(verbsConfigByKeys).map(([key, config]) => {
    const { title, pronouns } = config;
    return [title, { key, pronouns }];
  }),
);
