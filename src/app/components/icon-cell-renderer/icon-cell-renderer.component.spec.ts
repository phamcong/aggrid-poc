import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCellRenderer } from './icon-cell-renderer.component';

describe('IconCellRenderer', () => {
  let component: IconCellRenderer;
  let fixture: ComponentFixture<IconCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconCellRenderer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
