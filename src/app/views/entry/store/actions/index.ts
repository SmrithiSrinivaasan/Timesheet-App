import { ClearEntries } from './clearEntries';
import { FetchEntries } from './fetchEntries';
import { UpdateFilters } from './updateFilters';

export type Actions = FetchEntries | UpdateFilters | ClearEntries;
