import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WalletButtonComponent} from './wallet-button.component';
import {MatIconService} from '@ob-apps/services';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WalletButtonComponent', () => {
  let component: WalletButtonComponent;
  let fixture: ComponentFixture<WalletButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [WalletButtonComponent, MatIconModule, HttpClientTestingModule],
      providers: [MatIconService, MatIconRegistry],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletButtonComponent);
    component = fixture.componentInstance;
    const matIconRegistry = TestBed.inject(MatIconRegistry);
    jest.spyOn(matIconRegistry, 'addSvgIcon');
    const ser = TestBed.inject(MatIconService);
    ser.init();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
