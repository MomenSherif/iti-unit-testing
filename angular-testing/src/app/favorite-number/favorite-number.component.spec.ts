import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteNumberComponent } from './favorite-number.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

// https://angular.dev/guide/testing/components-basics

// describe('FavoriteNumberComponent', () => {
//   let component: FavoriteNumberComponent;
//   let fixture: ComponentFixture<FavoriteNumberComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FavoriteNumberComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(FavoriteNumberComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

describe('Counter', () => {
  it('should increment the counter on click', async () => {
    await render(FavoriteNumberComponent, {
      componentProperties: { max: 20 },
    });

    await userEvent.type(screen.getByLabelText(/favorite number/i), '24');
    expect(screen.getByRole('alert'));
  });
});
