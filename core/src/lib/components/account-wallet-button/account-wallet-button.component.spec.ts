import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AccountWalletButtonComponent} from './account-wallet-button.component';
import {provideMockStore} from '@ngrx/store/testing';
import {MockComponents} from 'ng-mocks';
import {IconTooltipButtonComponent} from '../icon-tooltip-button/icon-tooltip-button.component';

describe('AccountWalletButtonComponent', () => {
  let component: AccountWalletButtonComponent;
  let fixture: ComponentFixture<AccountWalletButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponents(IconTooltipButtonComponent)],
      imports: [AccountWalletButtonComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountWalletButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
