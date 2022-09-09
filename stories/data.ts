import { ALL_ICONS_IN_ALL_CONTEXTS } from 'semantic-ui-react/src/lib/SUI';
import { SemanticICONS } from 'semantic-ui-react';

export const types = <const>['basic', 'range'];
export const pointing = <const>['left', 'right', 'top left', 'top right'];

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

export const iconMap = arrayToMap<SemanticICONS>(
  ALL_ICONS_IN_ALL_CONTEXTS.sort()
);
