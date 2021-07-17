import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { DEFAULT_PAGE_OPTIONS } from 'src/app/core/card-list-wrapper/consts/defaults';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { SaveSettings } from './histories.actions';

export interface HistoriesStateModel {
  settings: ListSettings;
}

const HISTORIES_STATE_TOKEN = new StateToken<HistoriesStateModel>('histories');

@State({
  name: HISTORIES_STATE_TOKEN,
  defaults: {
    settings: {
      limit: DEFAULT_PAGE_OPTIONS[0],
      offset: 0,
      index: 0,
      searchText: '',
      order: 'ASC',
    },
  },
})
@Injectable()
export class HistoriesState {
  @Selector([HistoriesState])
  static settings(state: HistoriesStateModel): ListSettings {
    return state.settings;
  }

  @Action(SaveSettings)
  saveSettings(ctx: StateContext<HistoriesStateModel>, action: SaveSettings): void {
    const state = ctx.getState();

    ctx.patchState({
      settings: {
        ...state.settings,
        ...action.settings,
      },
    });
  }
}
