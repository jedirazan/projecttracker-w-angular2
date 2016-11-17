"use strict";
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var testing_2 = require('../testing');
var comp;
var fixture;
var de;
var linkde;
var links;
describe('AppComponent', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent,
                testing_2.RouterLinkStubDirective, testing_2.RouterOutletStubComponent
            ],
        });
        // create component and test fixture
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        // get test component from the fixture
        comp = fixture.componentInstance;
    });
    it('should display original title', function () {
        // trigger change detection to update the view
        fixture.detectChanges();
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        // confirm the element's content
        expect(de.nativeElement.textContent).toContain(comp.title);
    });
    it('can get RouterLinks from template', function () {
        fixture.detectChanges();
        linkde = fixture.debugElement.queryAll(platform_browser_1.By.directive(testing_2.RouterLinkStubDirective));
        links = linkde.map(function (de) { return de.injector.get(testing_2.RouterLinkStubDirective); });
        expect(links.length).toBe(2, 'should have 2 links');
        expect(links[0].linkParams).toBe('/dashboard', '1st link should go to Dashboard');
        expect(links[1].linkParams).toBe('/members', '1st link should go to All Members');
    });
    it('can click All Members link in template', function () {
        fixture.detectChanges();
        linkde = fixture.debugElement.queryAll(platform_browser_1.By.directive(testing_2.RouterLinkStubDirective));
        links = linkde.map(function (de) { return de.injector.get(testing_2.RouterLinkStubDirective); });
        var membersLinkDe = linkde[1];
        var membersLink = links[1];
        expect(membersLink.navigatedTo).toBeNull('link should not have navigated yet');
        membersLinkDe.triggerEventHandler('click', null);
        // fixture.detectChanges();
        expect(membersLink.navigatedTo).toBe('/members');
    });
});
//# sourceMappingURL=app.component.spec.js.map