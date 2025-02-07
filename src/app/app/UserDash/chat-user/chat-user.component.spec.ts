import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUSerComponent } from './chat-user.component';

describe('ChatUSerComponent', () => {
  let component: ChatUSerComponent;
  let fixture: ComponentFixture<ChatUSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUSerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
