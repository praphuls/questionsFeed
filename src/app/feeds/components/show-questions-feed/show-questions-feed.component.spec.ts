import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionsFeedComponent } from './show-questions-feed.component';

describe('ShowQuestionsFeedComponent', () => {
  let component: ShowQuestionsFeedComponent;
  let fixture: ComponentFixture<ShowQuestionsFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQuestionsFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuestionsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
