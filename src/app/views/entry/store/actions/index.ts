import { FetchEntries } from './fetchEntries';
import { FilterPhase } from './filterPhase';
import { FilterProject } from './filterProject';
import { FilterUser } from './filterUser';

export type Actions = FetchEntries | FilterProject | FilterPhase | FilterUser;
