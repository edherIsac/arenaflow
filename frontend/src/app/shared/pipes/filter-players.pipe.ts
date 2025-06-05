import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../../pages/calendar/features/form-date-match/form-date-match.component';

@Pipe({
  name: 'filterPlayers'
})
export class FilterPlayersPipe implements PipeTransform {
  transform(players: Player[], isStarter: boolean): Player[] {
    if (!players) {
      return [];
    }
    return players.filter(player => player.isStarter === isStarter);
  }
}
