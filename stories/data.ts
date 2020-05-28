const types = <const>['basic', 'range'];
const pointing = <const>['left', 'right', 'top left', 'top right'];
const locale = <const>[
  'bg-BG',
  'ca-ES',
  'cs-CZ',
  'de-DE',
  'en-US',
  'es-ES',
  'fi-FL',
  'fr-FR',
  'he-IL',
  'it-IT',
  'ja-JP',
  'nb-NO',
  'pl-PL',
  'pt-BR',
  'ru-RU',
  'sv-SE',
  'tr-TR',
  'zh-CN',
];

function arrayToMap<T extends string>(
  arr: readonly T[]
): { [key in typeof arr[number]]: typeof arr[number] } {
  return arr.reduce(
    (acc, cur) => ({ ...acc, [cur]: cur }),
    {} as { [key in T]: T }
  );
}

export const typeMap = arrayToMap(types);

export const pointingMap = arrayToMap(pointing);

export const localeMap = arrayToMap([...locale].sort());
