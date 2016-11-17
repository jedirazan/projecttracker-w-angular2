import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { AppComponent } from './app.component';

import { RouterLinkStubDirective, RouterOutletStubComponent }   from '../testing';

let comp:    AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de:      DebugElement;
let linkde:  DebugElement[];
let links:   RouterLinkStubDirective[];

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
      AppComponent,
      RouterLinkStubDirective, RouterOutletStubComponent
      ], // declare the test component
    });

    // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    comp = fixture.componentInstance;
  });

  it('should display original title', () => {

    // trigger change detection to update the view
    fixture.detectChanges();

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));

    // confirm the element's content
    expect(de.nativeElement.textContent).toContain(comp.title);
  });

  it('can get RouterLinks from template', () => {
    fixture.detectChanges();

    linkde = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkde.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(links.length).toBe(2, 'should have 2 links');
    expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
    expect(links[1].linkParams).toBe('/members', '1st link should go to All Members');
  });

  it('can click All Members link in template', () => {
    fixture.detectChanges();

    linkde = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    links = linkde.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    const membersLinkDe = linkde[1];
    const membersLink = links[1];

    expect(membersLink.navigatedTo).toBeNull('link should not have navigated yet');

    membersLinkDe.triggerEventHandler('click', null);
    // fixture.detectChanges();

    expect(membersLink.navigatedTo).toBe('/members');
  });

});