"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('./rxjs-extensions');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var in_memory_data_service_1 = require('./in-memory-data.service');
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component');
var project_component_1 = require('./project/project.component');
var project_add_component_1 = require('./project/project-add.component');
var project_service_1 = require('./project/project.service');
var sprint_component_1 = require('./sprint/sprint.component');
var sprint_add_component_1 = require('./sprint/sprint-add.component');
var sprint_service_1 = require('./sprint/sprint.service');
var member_component_1 = require('./member/member.component');
var member_add_component_1 = require('./member/member-add.component');
var member_edit_component_1 = require('./member/member-edit.component');
var member_service_1 = require('./member/member.service');
var task_add_component_1 = require('./task/task-add.component');
var task_edit_component_1 = require('./task/task-edit.component');
var task_service_1 = require('./task/task.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                project_component_1.ProjectComponent,
                project_add_component_1.ProjectAddComponent,
                sprint_component_1.SprintComponent,
                sprint_add_component_1.SprintAddComponent,
                member_component_1.MemberComponent,
                member_add_component_1.MemberAddComponent,
                member_edit_component_1.MemberEditComponent,
                task_add_component_1.TaskAddComponent,
                task_edit_component_1.TaskEditComponent
            ],
            providers: [
                project_service_1.ProjectService,
                sprint_service_1.SprintService,
                task_service_1.TaskService,
                member_service_1.MemberService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map