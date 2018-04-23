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
    ChatComponent.prototype.ngOnInit = function () { };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUtsRCwyREFBaUQ7QUFTakQ7SUFNRTtRQUxPLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLFVBQUssR0FBVyxHQUFHLENBQUM7UUFDcEIsV0FBTSxHQUFXLEdBQUcsQ0FBQztRQUk1QixZQUFPLEdBQVcsQ0FBQyxDQUFBO0lBRkYsQ0FBQztJQUlsQiw2QkFBSyxHQUFMLFVBQU0sSUFBZTtRQUNuQixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWpDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLGtEQUFrRDtRQUVsRCxJQUFJLE9BQU8sR0FBRztZQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUNwQyxDQUFDO1FBRUYsaUNBQVcsQ0FBQyxPQUFPLENBQUM7YUFDZixJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUVELGdDQUFRLEdBQVIsY0FBYSxDQUFDO0lBakNILGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7O09BRVcsYUFBYSxDQW9DekI7SUFBRCxvQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnV0dG9uIH3CoGZyb20gXCJ1aS9idXR0b25cIlxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJ1xuXG5pbXBvcnQgeyB0YWtlUGljdHVyZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYW1lcmEnXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1jaGF0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NoYXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaGF0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBDaGF0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHNhdmVUb0dhbGxlcnk6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMga2VlcEFzcGVjdFJhdGlvOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIHdpZHRoOiBudW1iZXIgPSAzMDA7XG4gIHB1YmxpYyBoZWlnaHQ6IG51bWJlciA9IDMwMDtcblxuICBjb25zdHJ1Y3RvcigpIHsgIH0gXG5cbiAgY291bnRlcjogbnVtYmVyID0gMFxuXG4gIG9uVGFwKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGxldCBidXR0b24gPSA8QnV0dG9uPmFyZ3Mub2JqZWN0O1xuXG4gICAgdGhpcy5jb3VudGVyKys7XG4gICAgLyogYWxlcnQoXCJUYXBwZWQgXCIgKyB0aGlzLmNvdW50ZXIgKyBcIiB0aW1lcyFcIik7ICovXG5cbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGtlZXBBc3BlY3RSYXRpbzogdGhpcy5rZWVwQXNwZWN0UmF0aW8sXG4gICAgICBzYXZlVG9HYWxsZXJ5OiB0aGlzLnNhdmVUb0dhbGxlcnlcbiAgfTtcblxuICB0YWtlUGljdHVyZShvcHRpb25zKVxuICAgICAgLnRoZW4oaW1hZ2VBc3NldCA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTaXplOiBcIiArIGltYWdlQXNzZXQub3B0aW9ucy53aWR0aCArIFwieFwiICsgaW1hZ2VBc3NldC5vcHRpb25zLmhlaWdodCk7XG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuXG5cbiAgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cblxufVxuIl19