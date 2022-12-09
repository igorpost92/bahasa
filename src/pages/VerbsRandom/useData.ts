import { useVerbsTenses } from '../../storage/hooks/verbs';
import { useMemo } from 'react';
import { shuffle } from '../../utils/shuffle';
import { isVerbReflexive } from '../../utils/isVerbReflexive';
import { verbsConfigByTitles } from '../../../constants/verbsConfig';
import { useWords } from '../../storage/hooks/words';

export const useData = () => {
  const verbsRequest = useVerbsTenses();

  const wordsRequest = useWords();

  const words = useMemo(() => {
    if (!verbsRequest.data) {
      // if (!verbsRequest.data || !wordsRequest.data) {
      return [];
    }

    // todo name

    const res = verbsRequest.data.flatMap(verb => {
      const isReflexive = isVerbReflexive(verb.name);

      const rrrr = Object.values(verbsConfigByTitles).flatMap(config => {
        const dataByKey = verb.data[config.key];
        if (!dataByKey) {
          return [];
        }

        const pronouns = isReflexive ? config.pronouns.reflexive : config.pronouns.normal;

        const dataByPronouns = pronouns.map((item, idx) => {
          return {
            // TODO: translate
            verb: verb.name,
            type: config.key,
            pronoun: item.title,
            value: dataByKey[idx],
          };
        });

        return dataByPronouns;
      });

      return rrrr;
    });

    return shuffle(res);
  }, [verbsRequest.data, wordsRequest.data]);

  return words;
};
