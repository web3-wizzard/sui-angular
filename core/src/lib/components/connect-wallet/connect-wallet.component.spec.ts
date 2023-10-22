import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConnectWalletComponent} from './connect-wallet.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MockProviders} from 'ng-mocks';
import {MatIconRegistry} from '@angular/material/icon';
import {MatIconService} from '@ob-apps/services';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConnectWalletComponent', () => {
  let component: ConnectWalletComponent;
  let fixture: ComponentFixture<ConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectWalletComponent, HttpClientTestingModule],
      providers: [
        MockProviders(MatDialogRef),
        MatIconRegistry,
        MatIconService,
        provideMockStore(),
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectWalletComponent);
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
