"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_camera_1 = require("nativescript-camera");
var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
        this.saveToGallery = true;
        this.keepAspectRatio = true;
        this.width = 300;
        this.height = 300;
        this.counter = 0;
    }
    ChatComponent.prototype.onTap = function (args) {
        var button = args.object;
        this.counter++;
        /* alert("Tapped " + this.counter + " times!"); */
        var options = {
            width: this.width,
            height: this.height,
            keepAspectRatio: this.keepAspectRatio,
            saveToGallery: this.saveToGallery
        };
        nativescript_camera_1.takePicture(options)
            .then(function (imageAsset) {
            console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        }).catch(function (err) {
            console.log(err.message);
        });
    };
    ChatComponent.prototype.onRequestPermissions = function () {
        nativescript_camera_1.requestPermissions();
    };
    ChatComponent.prototype.ngOnInit = function () {
        this.onRequestPermissions();
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUtsRCwyREFBcUU7QUFTckU7SUFNRTtRQUxPLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDcEIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUk1QixZQUFPLEdBQVcsQ0FBQyxDQUFBO0lBRkYsQ0FBQztJQUlsQiw2QkFBSyxHQUFMLFVBQU0sSUFBZTtRQUNuQixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLGtEQUFrRDtRQUVsRCxJQUFJLE9BQU8sR0FBRztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNwQyxDQUFBO1FBRUQsaUNBQVcsQ0FBQyxPQUFPLENBQUM7YUFDZixJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUVELDRDQUFvQixHQUFwQjtRQUNFLHdDQUFrQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVDLGdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBdkNTLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7O09BRVcsYUFBYSxDQTBDekI7SUFBRCxvQkFBQztDQUFBLEFBMUNELElBMENDO0FBMUNZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uIH3CoGZyb20gXCJ1aS9idXR0b25cIlxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJ1xuXG5pbXBvcnQgeyB0YWtlUGljdHVyZSwgcmVxdWVzdFBlcm1pc3Npb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhbWVyYSdcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwLWNoYXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hhdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NoYXQuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENoYXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgc2F2ZVRvR2FsbGVyeTogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBrZWVwQXNwZWN0UmF0aW86IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgd2lkdGg6IG51bWJlciA9IDMwMDtcbiAgcHVibGljIGhlaWdodDogbnVtYmVyID0gMzAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyAgfSBcblxuICBjb3VudGVyOiBudW1iZXIgPSAwXG5cbiAgb25UYXAoYXJnczogRXZlbnREYXRhKSB7XG4gICAgbGV0IGJ1dHRvbiA9IDxCdXR0b24+YXJncy5vYmplY3Q7XG5cbiAgICB0aGlzLmNvdW50ZXIrKztcbiAgICAvKiBhbGVydChcIlRhcHBlZCBcIiArIHRoaXMuY291bnRlciArIFwiIHRpbWVzIVwiKTsgKi9cblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAga2VlcEFzcGVjdFJhdGlvOiB0aGlzLmtlZXBBc3BlY3RSYXRpbyxcbiAgICAgIHNhdmVUb0dhbGxlcnk6IHRoaXMuc2F2ZVRvR2FsbGVyeVxuICB9XG5cbiAgdGFrZVBpY3R1cmUob3B0aW9ucylcbiAgICAgIC50aGVuKGltYWdlQXNzZXQgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2l6ZTogXCIgKyBpbWFnZUFzc2V0Lm9wdGlvbnMud2lkdGggKyBcInhcIiArIGltYWdlQXNzZXQub3B0aW9ucy5oZWlnaHQpO1xuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICB9KTtcblxuXG4gIH1cblxuICBvblJlcXVlc3RQZXJtaXNzaW9ucygpIHtcbiAgICByZXF1ZXN0UGVybWlzc2lvbnMoKTtcbn1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9uUmVxdWVzdFBlcm1pc3Npb25zKClcbiAgIH1cblxuXG59XG4iXX0=