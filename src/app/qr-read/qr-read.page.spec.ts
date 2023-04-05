import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrReadPage } from './qr-read.page';

describe('QrReadPage', () => {
  let component: QrReadPage;
  let fixture: ComponentFixture<QrReadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QrReadPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrReadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
