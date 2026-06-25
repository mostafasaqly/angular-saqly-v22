import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { signal, ChangeDetectionStrategy, Component } from '@angular/core';

// Minimal counter component for demo
@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p data-testid="count">Count: {{ count() }}</p>
    <button data-testid="inc" (click)="increment()">+</button>
    <button data-testid="dec" (click)="decrement()">-</button>
    <button data-testid="reset" (click)="reset()">Reset</button>
  `
})
class CounterComponent {
  count = signal(0);
  increment() { this.count.update(v => v + 1); }
  decrement() { this.count.update(v => v - 1); }
  reset() { this.count.set(0); }
}

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start at 0', () => {
    const p = fixture.debugElement.query(By.css('[data-testid="count"]'));
    expect(p.nativeElement.textContent).toContain('Count: 0');
  });

  it('should increment', () => {
    const btn = fixture.debugElement.query(By.css('[data-testid="inc"]'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.count()).toBe(1);
  });

  it('should decrement', () => {
    component.count.set(5);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('[data-testid="dec"]'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.count()).toBe(4);
  });

  it('should reset to 0', () => {
    component.count.set(10);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('[data-testid="reset"]'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.count()).toBe(0);
  });
});
