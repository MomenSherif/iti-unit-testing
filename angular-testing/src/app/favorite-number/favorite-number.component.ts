import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './favorite-number.component.html',
  styleUrl: './favorite-number.component.css',
})
export class FavoriteNumberComponent {
  number = '';
  @Input() min = 0;
  @Input() max = 10;

  get isError() {
    if (!this.number) return false;
    return +this.number < this.min || +this.number > this.max;
  }
}
