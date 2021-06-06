import { ListSettings } from 'src/app/shared/card-list/models/list-settings';

export class SaveSettings {
  static readonly type = '[Ships] SaveSettings';

  constructor(public settings: ListSettings) {}
}
