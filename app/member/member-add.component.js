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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var index_1 = require("../services/index");
var MemberAddComponent = (function () {
    function MemberAddComponent(memberService, location) {
        this.memberService = memberService;
        this.location = location;
    }
    MemberAddComponent.prototype.goBack = function () {
        this.location.back();
    };
    MemberAddComponent.prototype.add = function (name, position, capacity) {
        var _this = this;
        name = name.trim();
        position = position.trim();
        if (!name || !position || !capacity) {
            return;
        }
        this.memberService.create(name, position, capacity)
            .then(function () { return _this.goBack(); });
    };
    return MemberAddComponent;
}());
MemberAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-member-add',
        templateUrl: 'member-add.component.html'
    }),
    __metadata("design:paramtypes", [index_1.MemberService,
        common_1.Location])
], MemberAddComponent);
exports.MemberAddComponent = MemberAddComponent;
//# sourceMappingURL=member-add.component.js.map