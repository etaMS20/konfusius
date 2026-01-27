import { Pipe, PipeTransform, inject } from '@angular/core';
import { KTimeUtilsService } from '@services/k-time-utils.service';

@Pipe({
  name: 'variationInterval',
  standalone: true,
  pure: true,
})
export class VariationIntervalPipe implements PipeTransform {
  protected readonly timeUtil = inject(KTimeUtilsService);

  transform(value: string | undefined | null): string {
    if (!value) return '';

    const match = value.match(this.timeUtil.variationIntervalRegex);

    if (!match) {
      return value;
    }

    const parsed = this.timeUtil.parseAnchorInterval(match[0]);
    return parsed ? this.timeUtil.formatToHumanReadable(parsed) : value;
  }
}
