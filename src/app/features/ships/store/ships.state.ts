import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { DEFAULT_PAGE_OPTIONS } from 'src/app/core/modules/card-list-wrapper/consts/defaults';
import { ListSettings } from 'src/app/shared/card-list/models/list-settings';
import { SaveSettings } from './ships.actions';

export interface ShipsStateModel {
  settings: ListSettings;
}

const SHIPS_STATE_TOKEN = new StateToken<ShipsStateModel>('ships');

@State({
  name: SHIPS_STATE_TOKEN,
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
export class ShipsState {
  @Selector([ShipsState])
  static settings(state: ShipsStateModel): ListSettings {
    return state.settings;
  }

  @Action(SaveSettings)
  saveSettings(ctx: StateContext<ShipsStateModel>, action: SaveSettings): void {
    const state = ctx.getState();

    ctx.patchState({
      settings: {
        ...state.settings,
        ...action.settings,
      },
    });
  }
}
