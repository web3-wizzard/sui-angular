import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConnectButtonContainerComponent} from './connect-button-container.component';

describe('ConnectButtonContainerComponent', () => {
  let component: ConnectButtonContainerComponent;
  let fixture: ComponentFixture<ConnectButtonContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectButtonContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectButtonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
