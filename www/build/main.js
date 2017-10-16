webpackJsonp([0],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NativeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_transfer__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_image_picker__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_network__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_minimize__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__GlobalData__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Logger__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_diagnostic__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 12-27.
 */



















var NativeService = (function () {
    function NativeService(platform, toastCtrl, alertCtrl, statusBar, splashScreen, appVersion, camera, toast, transfer, file, inAppBrowser, imagePicker, network, appMinimize, loadingCtrl, globalData, diagnostic, logger) {
        var _this = this;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.appVersion = appVersion;
        this.camera = camera;
        this.toast = toast;
        this.transfer = transfer;
        this.file = file;
        this.inAppBrowser = inAppBrowser;
        this.imagePicker = imagePicker;
        this.network = network;
        this.appMinimize = appMinimize;
        this.loadingCtrl = loadingCtrl;
        this.globalData = globalData;
        this.diagnostic = diagnostic;
        this.logger = logger;
        this.loadingIsOpen = false;
        //检测app位置服务是否开启
        this.assertLocationService = (function () {
            var enabledLocationService = false; //手机是否开启位置服务
            return function () {
                return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
                    if (enabledLocationService) {
                        observer.next(true);
                    }
                    else {
                        _this.diagnostic.isLocationEnabled().then(function (enabled) {
                            if (enabled) {
                                enabledLocationService = true;
                                observer.next(true);
                            }
                            else {
                                enabledLocationService = false;
                                _this.alertCtrl.create({
                                    title: '您未开启位置服务',
                                    subTitle: '正在获取位置信息',
                                    buttons: [{ text: '取消' },
                                        {
                                            text: '去开启',
                                            handler: function () {
                                                _this.diagnostic.switchToLocationSettings();
                                            }
                                        }
                                    ]
                                }).present();
                            }
                        }).catch(function (err) {
                            _this.logger.log(err, '调用diagnostic.isLocationEnabled方法失败');
                        });
                    }
                });
            };
        })();
        //检测app是否有定位权限
        this.assertLocationAuthorization = (function () {
            var locationAuthorization = false;
            return function () {
                return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
                    if (locationAuthorization) {
                        observer.next(true);
                    }
                    else {
                        _this.diagnostic.isLocationAvailable().then(function (res) {
                            if (res) {
                                locationAuthorization = true;
                                observer.next(true);
                            }
                            else {
                                locationAuthorization = false;
                                _this.diagnostic.requestLocationAuthorization('always').then(function (res) {
                                    if (res == 'DENIED_ALWAYS') {
                                        locationAuthorization = false;
                                        _this.alertCtrl.create({
                                            title: '缺少定位权限',
                                            subTitle: '请在手机设置或app权限管理中开启',
                                            buttons: [{ text: '取消' },
                                                {
                                                    text: '去开启',
                                                    handler: function () {
                                                        _this.diagnostic.switchToSettings();
                                                    }
                                                }
                                            ]
                                        }).present();
                                    }
                                    else {
                                        locationAuthorization = true;
                                        observer.next(true);
                                    }
                                }).catch(function (err) {
                                    _this.logger.log(err, '调用diagnostic.requestLocationAuthorization方法失败');
                                });
                            }
                        }).catch(function (err) {
                            _this.logger.log(err, '调用diagnostic.isLocationAvailable方法失败');
                        });
                    }
                });
            };
        })();
    }
    /**
     * 使用默认状态栏
     */
    NativeService.prototype.statusBarStyleDefault = function () {
        this.statusBar.styleDefault();
    };
    /**
     * 隐藏启动页面
     */
    NativeService.prototype.splashScreenHide = function () {
        this.splashScreen.hide();
    };
    /**
     * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     */
    NativeService.prototype.getNetworkType = function () {
        if (!this.isMobile()) {
            return 'wifi';
        }
        return this.network.type;
    };
    /**
     * 判断是否有网络
     */
    NativeService.prototype.isConnecting = function () {
        return this.getNetworkType() != 'none';
    };
    /**
     * 调用最小化app插件
     */
    NativeService.prototype.minimize = function () {
        this.appMinimize.minimize();
    };
    /**
     * 通过浏览器打开url
     */
    NativeService.prototype.openUrlByBrowser = function (url) {
        this.inAppBrowser.create(url, '_system');
    };
    /**
     * 下载安装app
     */
    NativeService.prototype.downloadApp = function () {
        var _this = this;
        if (this.isIos()) {
            this.openUrlByBrowser(__WEBPACK_IMPORTED_MODULE_13__Constants__["b" /* APP_DOWNLOAD */]);
        }
        if (this.isAndroid()) {
            var backgroundProcess_1 = false; //是否后台下载
            var alert_1 = this.alertCtrl.create({
                title: '下载进度：0%',
                enableBackdropDismiss: false,
                buttons: [{
                        text: '后台下载', handler: function () {
                            backgroundProcess_1 = true;
                        }
                    }
                ]
            });
            alert_1.present();
            var fileTransfer = this.transfer.create();
            var apk_1 = this.file.externalRootDirectory + ("android_" + __WEBPACK_IMPORTED_MODULE_17__Utils__["a" /* Utils */].getSequence() + ".apk"); //apk保存的目录
            //下载并安装apk
            fileTransfer.download(__WEBPACK_IMPORTED_MODULE_13__Constants__["a" /* APK_DOWNLOAD */], apk_1).then(function () {
                window['install'].install(apk_1.replace('file://', ''));
            }, function (err) {
                alert_1.dismiss();
                _this.logger.log(err, 'android app 本地升级失败');
                _this.alertCtrl.create({
                    title: '前往网页下载',
                    subTitle: '本地升级失败',
                    buttons: [
                        {
                            text: '确定',
                            handler: function () {
                                _this.openUrlByBrowser(__WEBPACK_IMPORTED_MODULE_13__Constants__["b" /* APP_DOWNLOAD */]); //打开网页下载
                            }
                        }
                    ]
                }).present();
            });
            var timer_1 = null; //由于onProgress事件调用非常频繁,所以使用setTimeout用于函数节流
            fileTransfer.onProgress(function (event) {
                var progress = Math.floor(event.loaded / event.total * 100); //下载进度
                _this.globalData.updateProgress = progress;
                if (!backgroundProcess_1) {
                    if (progress === 100) {
                        alert_1.dismiss();
                    }
                    else {
                        if (!timer_1) {
                            timer_1 = setTimeout(function () {
                                clearTimeout(timer_1);
                                timer_1 = null;
                                var title = document.getElementsByClassName('alert-title')[0];
                                title && (title.innerHTML = "\u4E0B\u8F7D\u8FDB\u5EA6\uFF1A" + progress + "%");
                            }, 1000);
                        }
                    }
                }
            });
        }
    };
    /**
     * 是否真机环境
     */
    NativeService.prototype.isMobile = function () {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    };
    /**
     * 是否android真机环境
     */
    NativeService.prototype.isAndroid = function () {
        return this.isMobile() && this.platform.is('android');
    };
    /**
     * 是否ios真机环境
     */
    NativeService.prototype.isIos = function () {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    };
    NativeService.prototype.alert = function (title, subTitle) {
        if (subTitle === void 0) { subTitle = ""; }
        this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [{ text: '确定' }]
        }).present();
    };
    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */
    NativeService.prototype.showToast = function (message, duration) {
        if (message === void 0) { message = '操作完成'; }
        if (duration === void 0) { duration = 2000; }
        if (this.isMobile()) {
            this.toast.show(message, String(duration), 'center').subscribe();
        }
        else {
            this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'middle',
                showCloseButton: false
            }).present();
        }
    };
    ;
    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    NativeService.prototype.showLoading = function (content) {
        var _this = this;
        if (content === void 0) { content = ''; }
        if (!this.globalData.showLoading) {
            return;
        }
        if (!this.loadingIsOpen) {
            this.loadingIsOpen = true;
            this.loading = this.loadingCtrl.create({
                content: content
            });
            this.loading.present();
            setTimeout(function () {
                _this.loadingIsOpen && _this.loading.dismiss();
                _this.loadingIsOpen = false;
            }, __WEBPACK_IMPORTED_MODULE_13__Constants__["m" /* REQUEST_TIMEOUT */]);
        }
    };
    ;
    /**
     * 关闭loading
     */
    NativeService.prototype.hideLoading = function () {
        if (!this.globalData.showLoading) {
            this.globalData.showLoading = true;
        }
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
    };
    ;
    /**
     * 使用cordova-plugin-camera获取照片
     * @param options
     */
    NativeService.prototype.getPicture = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var ops = Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: __WEBPACK_IMPORTED_MODULE_13__Constants__["l" /* QUALITY_SIZE */],
            allowEdit: false,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: __WEBPACK_IMPORTED_MODULE_13__Constants__["i" /* IMAGE_SIZE */],
            targetHeight: __WEBPACK_IMPORTED_MODULE_13__Constants__["i" /* IMAGE_SIZE */],
            saveToPhotoAlbum: false,
            correctOrientation: true //设置摄像机拍摄的图像是否为正确的方向
        }, options);
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            _this.camera.getPicture(ops).then(function (imgData) {
                if (ops.destinationType === _this.camera.DestinationType.DATA_URL) {
                    observer.next('data:image/jpg;base64,' + imgData);
                }
                else {
                    observer.next(imgData);
                }
            }).catch(function (err) {
                if (err == 20) {
                    _this.alert('没有权限,请在设置中开启权限');
                    return;
                }
                if (String(err).indexOf('cancel') != -1) {
                    return;
                }
                _this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
                _this.alert('获取照片失败');
            });
        });
    };
    ;
    /**
     * 通过拍照获取照片
     * @param options
     */
    NativeService.prototype.getPictureByCamera = function (options) {
        if (options === void 0) { options = {}; }
        var ops = Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL //DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
        }, options);
        return this.getPicture(ops);
    };
    ;
    /**
     * 通过图库获取照片
     * @param options
     */
    NativeService.prototype.getPictureByPhotoLibrary = function (options) {
        if (options === void 0) { options = {}; }
        var ops = Object.assign({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL //DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
        }, options);
        return this.getPicture(ops);
    };
    ;
    /**
     * 通过图库选择多图
     * @param options
     */
    NativeService.prototype.getMultiplePicture = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var that = this;
        var ops = Object.assign({
            maximumImagesCount: 6,
            width: __WEBPACK_IMPORTED_MODULE_13__Constants__["i" /* IMAGE_SIZE */],
            height: __WEBPACK_IMPORTED_MODULE_13__Constants__["i" /* IMAGE_SIZE */],
            quality: __WEBPACK_IMPORTED_MODULE_13__Constants__["l" /* QUALITY_SIZE */] //图像质量，范围为0 - 100
        }, options);
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            _this.imagePicker.getPictures(ops).then(function (files) {
                var destinationType = options['destinationType'] || 0; //0:base64字符串,1:图片url
                if (destinationType === 1) {
                    observer.next(files);
                }
                else {
                    var imgBase64s_1 = []; //base64字符串数组
                    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                        var fileUrl = files_1[_i];
                        that.convertImgToBase64(fileUrl).subscribe(function (base64) {
                            imgBase64s_1.push(base64);
                            if (imgBase64s_1.length === files.length) {
                                observer.next(imgBase64s_1);
                            }
                        });
                    }
                }
            }).catch(function (err) {
                _this.logger.log(err, '通过图库选择多图失败');
                _this.alert('获取照片失败');
            });
        });
    };
    ;
    /**
     * 根据图片绝对路径转化为base64字符串
     * @param path 绝对路径
     */
    NativeService.prototype.convertImgToBase64 = function (path) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            _this.file.resolveLocalFilesystemUrl(path).then(function (fileEnter) {
                fileEnter.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        observer.next(this.result);
                    };
                    reader.readAsDataURL(file);
                });
            }).catch(function (err) {
                _this.logger.log(err, '根据图片绝对路径转化为base64字符串失败');
            });
        });
    };
    /**
     * 获得app版本号,如0.01
     * @description  对应/config.xml中version的值
     */
    NativeService.prototype.getVersionNumber = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            _this.appVersion.getVersionNumber().then(function (value) {
                observer.next(value);
            }).catch(function (err) {
                _this.logger.log(err, '获得app版本号失败');
            });
        });
    };
    /**
     * 获得app name,如现场作业
     * @description  对应/config.xml中name的值
     */
    NativeService.prototype.getAppName = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            _this.appVersion.getAppName().then(function (value) {
                observer.next(value);
            }).catch(function (err) {
                _this.logger.log(err, '获得app name失败');
            });
        });
    };
    /**
     * 获得app包名/id,如com.kit.ionic2tabs
     * @description  对应/config.xml中id的值
     */
    NativeService.prototype.getPackageName = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            _this.appVersion.getPackageName().then(function (value) {
                observer.next(value);
            }).catch(function (err) {
                _this.logger.log(err, '获得app包名失败');
            });
        });
    };
    /**
     * 获得用户当前坐标
     */
    NativeService.prototype.getUserLocation = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            if (_this.isMobile()) {
                _this.assertLocationService().subscribe(function (res) {
                    if (res) {
                        _this.assertLocationAuthorization().subscribe(function (res) {
                            if (res) {
                                return _this.getLocation(observer);
                            }
                        });
                    }
                });
            }
            else {
                console.log('非手机环境,即测试环境返回固定坐标');
                observer.next({ 'lng': 113.350912, 'lat': 23.119495 });
            }
        });
    };
    NativeService.prototype.getLocation = function (observer) {
        var _this = this;
        LocationPlugin.getLocation(function (data) {
            observer.next({ 'lng': data.longitude, 'lat': data.latitude });
        }, function (msg) {
            observer.error('获取位置失败');
            if (msg.indexOf('缺少定位权限') != -1) {
                alert('缺少定位权限，请在手机设置中检查是否同时已开启GPS和应用授权定位');
            }
            else if (msg.indexOf('WIFI信息不足') != -1) {
                alert('定位失败,请确保连上WIFI或者关掉WIFI只开流量数据');
            }
            else if (msg.indexOf('网络连接异常') != -1) {
                alert('网络连接异常,请检查您的网络是否畅通');
            }
            else {
                alert('位置错误,错误消息:' + msg);
                _this.logger.log(msg, '获取位置失败');
            }
        });
    };
    /**
     * 地图导航
     * @param startPoint 开始坐标
     * @param endPoint 结束坐标
     * @param type 0实时导航,1模拟导航,默认为模拟导航
     */
    NativeService.prototype.navigation = function (startPoint, endPoint, type) {
        var _this = this;
        if (type === void 0) { type = 1; }
        return __WEBPACK_IMPORTED_MODULE_15_rxjs__["Observable"].create(function (observer) {
            if (_this.platform.is('mobile') && !_this.platform.is('mobileweb')) {
                AMapNavigation.navigation({
                    lng: startPoint.lng,
                    lat: startPoint.lat
                }, {
                    lng: endPoint.lng,
                    lat: endPoint.lat
                }, type, function (message) {
                    observer.next(message);
                }, function (err) {
                    _this.logger.log(err, '导航失败');
                    _this.alert('导航失败');
                });
            }
            else {
                _this.alert('非手机环境不能导航');
            }
        });
    };
    return NativeService;
}());
NativeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_version__["a" /* AppVersion */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_transfer__["a" /* Transfer */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_image_picker__["a" /* ImagePicker */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_network__["a" /* Network */],
        __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_minimize__["a" /* AppMinimize */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_14__GlobalData__["a" /* GlobalData */],
        __WEBPACK_IMPORTED_MODULE_18__ionic_native_diagnostic__["a" /* Diagnostic */],
        __WEBPACK_IMPORTED_MODULE_16__Logger__["a" /* Logger */]])
], NativeService);

//# sourceMappingURL=NativeService.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineEditAvatarModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_FileService__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MineService__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MineEditAvatarModalPage = (function () {
    function MineEditAvatarModalPage(params, viewCtrl, fileService, nativeService, mineService, storage) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.fileService = fileService;
        this.nativeService = nativeService;
        this.mineService = mineService;
        this.storage = storage;
        this.isChange = false; //头像是否改变标识
        this.avatarPath = this.params.get('avatarPath');
    }
    MineEditAvatarModalPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            targetWidth: 400,
            targetHeight: 400,
            quality: 100
        };
        if (type == 1) {
            this.nativeService.getPictureByCamera(options).subscribe(function (imageBase64) {
                _this.getPictureSuccess(imageBase64);
            });
        }
        else {
            this.nativeService.getPictureByPhotoLibrary(options).subscribe(function (imageBase64) {
                _this.getPictureSuccess(imageBase64);
            });
        }
    };
    MineEditAvatarModalPage.prototype.getPictureSuccess = function (imageBase64) {
        var _this = this;
        new AlloyCrop({
            image_src: imageBase64,
            circle: true,
            width: 256,
            height: 256,
            output: 1,
            ok: function (base64) {
                _this.isChange = true;
                _this.avatarPath = base64;
            },
            cancel: function () {
            },
            ok_text: "确定",
            cancel_text: "取消" // optional parameters , the default value is cancel
        });
    };
    MineEditAvatarModalPage.prototype.saveAvatar = function () {
        var _this = this;
        if (this.isChange) {
            var fileObj = { 'base64': this.avatarPath };
            this.fileService.uploadByBase64(fileObj).subscribe(function (fileObj) {
                var avatarId = fileObj.id, avatarPath = fileObj.origPath;
                _this.mineService.updateUserAvatarId(avatarId).subscribe(function (res) {
                    _this.storage.get('LoginInfo').then(function (loginInfo) {
                        loginInfo.user.avatarId = avatarId;
                        loginInfo.user.avatarPath = avatarPath;
                        _this.storage.set('LoginInfo', loginInfo);
                    });
                    _this.viewCtrl.dismiss({ avatarPath: avatarPath });
                });
            });
        }
        else {
            this.dismiss();
        }
    };
    MineEditAvatarModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return MineEditAvatarModalPage;
}());
MineEditAvatarModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mine-edit-avatar-modal',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine-edit-avatar-modal/mine-edit-avatar-modal.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      设置个人头像\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding text-center>\n  <img [src]="avatarPath" width="100%">\n  <div padding-top>\n    <button ion-button block color="light" (click)="getPicture(0)">从相册选一张</button>\n  </div>\n  <div padding-top>\n    <button ion-button block color="light" (click)="getPicture(1)">拍一张照片</button>\n  </div>\n  <div padding-top>\n    <button type="button" ion-button block (click)="saveAvatar()">保 存</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine-edit-avatar-modal/mine-edit-avatar-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_FileService__["a" /* FileService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_5__MineService__["a" /* MineService */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], MineEditAvatarModalPage);

//# sourceMappingURL=mine-edit-avatar-modal.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_HttpService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_GlobalData__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MineService = (function () {
    function MineService(httpService, globalData) {
        this.httpService = httpService;
        this.globalData = globalData;
    }
    /**
     * 更新用户头像Id
     * @param avatarId
     * @returns {Observable<R>}
     */
    MineService.prototype.updateUserAvatarId = function (avatarId) {
        return this.httpService.post("/user/avatar/" + avatarId).map(function (res) { return res.json(); });
    };
    /**
     * 更改密码
     * @param oldPsw
     * @param newPsw
     * @returns {Observable<R>}
     */
    MineService.prototype.updateUserPassword = function (oldPsw, newPsw) {
        return this.httpService.post("/user/modifyPassword/" + this.globalData.userId, {
            'oldPsw': oldPsw,
            'newPsw': newPsw
        }).map(function (res) { return res.json(); });
    };
    return MineService;
}());
MineService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_3__providers_GlobalData__["a" /* GlobalData */]])
], MineService);

//# sourceMappingURL=MineService.js.map

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/demo/transition-demo/modal-from-right/modal-from-right.module": [
		209
	],
	"../pages/demo/transition-demo/modal-scale/modal-scale.module": [
		207
	],
	"../pages/demo/transition-demo/transition-demo.module": [
		211
	],
	"../shared/map-component/map-location/map-location.module": [
		257
	],
	"../shared/map-component/navigation/navigation.module": [
		255
	],
	"../shared/map-component/search-address/search-address.module": [
		253
	],
	"../shared/paging/paging.module": [
		258
	],
	"../shared/preview-picture/preview-picture.module": [
		213
	],
	"../shared/select-picture/select-picture.module": [
		84
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 206;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalScalePageModule", function() { return ModalScalePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_scale__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalScalePageModule = (function () {
    function ModalScalePageModule() {
    }
    return ModalScalePageModule;
}());
ModalScalePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__modal_scale__["a" /* ModalScalePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal_scale__["a" /* ModalScalePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__modal_scale__["a" /* ModalScalePage */]
        ]
    })
], ModalScalePageModule);

//# sourceMappingURL=modal-scale.module.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalScalePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ModalScalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ModalScalePage = (function () {
    function ModalScalePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    ModalScalePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ModalScalePage;
}());
ModalScalePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-modal-scale',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/transition-demo/modal-scale/modal-scale.html"*/'\n<ion-content padding>\n  <button ion-button (click)="dismiss()">dismiss</button>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/transition-demo/modal-scale/modal-scale.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */]])
], ModalScalePage);

//# sourceMappingURL=modal-scale.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalFromRightPageModule", function() { return ModalFromRightPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_from_right__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalFromRightPageModule = (function () {
    function ModalFromRightPageModule() {
    }
    return ModalFromRightPageModule;
}());
ModalFromRightPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__modal_from_right__["a" /* ModalFromRightPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal_from_right__["a" /* ModalFromRightPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__modal_from_right__["a" /* ModalFromRightPage */]
        ]
    })
], ModalFromRightPageModule);

//# sourceMappingURL=modal-from-right.module.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalFromRightPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ModalFromRightPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ModalFromRightPage = (function () {
    function ModalFromRightPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    ModalFromRightPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ModalFromRightPage;
}());
ModalFromRightPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-modal-from-right',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/transition-demo/modal-from-right/modal-from-right.html"*/'<ion-content>\n  <button ion-button (click)="dismiss()">dismiss</button>\n  <div>1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,</div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/transition-demo/modal-from-right/modal-from-right.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */]])
], ModalFromRightPage);

//# sourceMappingURL=modal-from-right.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransitionDemoPageModule", function() { return TransitionDemoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transition_demo__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransitionDemoPageModule = (function () {
    function TransitionDemoPageModule() {
    }
    return TransitionDemoPageModule;
}());
TransitionDemoPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__transition_demo__["a" /* TransitionDemoPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transition_demo__["a" /* TransitionDemoPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__transition_demo__["a" /* TransitionDemoPage */]
        ]
    })
], TransitionDemoPageModule);

//# sourceMappingURL=transition-demo.module.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransitionDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_scale_modal_scale__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_from_right_modal_from_right__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TransitionDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TransitionDemoPage = (function () {
    function TransitionDemoPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
    }
    TransitionDemoPage.prototype.scaleModalScalePage = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modal_scale_modal_scale__["a" /* ModalScalePage */], {}, {
            enterAnimation: 'modal-scale-enter',
            leaveAnimation: 'modal-scale-leave'
        }).present();
    };
    TransitionDemoPage.prototype.presentModalFromRightPage = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modal_from_right_modal_from_right__["a" /* ModalFromRightPage */], {}, {
            enterAnimation: 'modal-from-right-enter',
            leaveAnimation: 'modal-from-right-leave'
        }).present();
    };
    return TransitionDemoPage;
}());
TransitionDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-transition-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/transition-demo/transition-demo.html"*/'<!--\n  Generated template for the TransitionDemoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>自定义过渡动画</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-button block (click)="scaleModalScalePage()">modal动画1</button>\n  <button ion-button block (click)="presentModalFromRightPage()">modal动画2</button>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/transition-demo/transition-demo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ModalController */]])
], TransitionDemoPage);

//# sourceMappingURL=transition-demo.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewPicturePageModule", function() { return PreviewPicturePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__preview_picture__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PreviewPicturePageModule = (function () {
    function PreviewPicturePageModule() {
    }
    return PreviewPicturePageModule;
}());
PreviewPicturePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__preview_picture__["a" /* PreviewPicturePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__preview_picture__["a" /* PreviewPicturePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__preview_picture__["a" /* PreviewPicturePage */]
        ]
    })
], PreviewPicturePageModule);

//# sourceMappingURL=preview-picture.module.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewPicturePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PreviewPicturePage = (function () {
    function PreviewPicturePage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.initialSlide = 0;
        this.picturePaths = [];
        this.initialSlide = navParams.get('initialSlide');
        this.picturePaths = navParams.get('picturePaths');
    }
    PreviewPicturePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //http://www.swiper.com.cn/api/index.html
        new Swiper(this.panel.nativeElement, {
            initialSlide: this.initialSlide,
            zoom: true,
            loop: true,
            lazyLoading: true,
            lazyLoadingOnTransitionStart: true,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            onClick: function () {
                _this.dismiss();
            }
        });
    };
    PreviewPicturePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return PreviewPicturePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('panel'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], PreviewPicturePage.prototype, "panel", void 0);
PreviewPicturePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-preview-picture',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/shared/preview-picture/preview-picture.html"*/'<ion-content style="background-color: #000;color: #fff">\n  <div #panel class="swiper-container">\n    <div class="swiper-wrapper">\n      <div class="swiper-slide" *ngFor="let path of picturePaths">\n        <div class="swiper-zoom-container">\n          <img data-src="{{path}}" class="swiper-lazy">\n        </div>\n      </div>\n    </div>\n    <div class="swiper-pagination"></div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/shared/preview-picture/preview-picture.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
], PreviewPicturePage);

//# sourceMappingURL=preview-picture.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchAddressModule", function() { return SearchAddressModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_address__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SearchAddressModule = (function () {
    function SearchAddressModule() {
    }
    return SearchAddressModule;
}());
SearchAddressModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__search_address__["a" /* SearchAddress */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__search_address__["a" /* SearchAddress */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__search_address__["a" /* SearchAddress */]
        ]
    })
], SearchAddressModule);

//# sourceMappingURL=search-address.module.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchAddress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SearchAddress page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SearchAddress = (function () {
    function SearchAddress(storage, viewCtrl, navParams, nativeService) {
        var _this = this;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
        this.address = '';
        // searchQuery: string = '';
        this.items = [];
        this.searchTextStream = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Subject"]();
        this.address = this.navParams.get('address');
        AMap.service('AMap.PlaceSearch', function () {
            _this.placeSearch = new AMap.PlaceSearch({
                pageSize: 10,
                pageIndex: 1,
                city: '广州市'
            });
        });
        this.storage.get('MapSearchHistory').then(function (items) {
            _this.items = (items || []).reverse();
        });
    }
    SearchAddress.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.searchBar.setFocus();
        });
    };
    SearchAddress.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.searchTextStream
            .debounceTime(600)
            .distinctUntilChanged()
            .subscribe(function (value) {
            _this.getSearchData(value).then(function (list) { return _this.items = list; });
        });
        this.searchTextStream.next(this.address);
    };
    SearchAddress.prototype.getItems = function ($event) {
        this.searchTextStream.next($event.target.value);
    };
    SearchAddress.prototype.selectItem = function (item) {
        var _this = this;
        this.storage.get('MapSearchHistory').then(function (items) {
            if (items) {
                var isExist = false;
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var value = items_1[_i];
                    if (value.id === item.id) {
                        isExist = true;
                    }
                }
                if (!isExist) {
                    items.push(item);
                }
            }
            else {
                items = [item];
            }
            _this.storage.set('MapSearchHistory', items);
        });
        this.viewCtrl.dismiss(item);
    };
    SearchAddress.prototype.clearHistory = function () {
        this.storage.remove('MapSearchHistory');
        this.items = [];
    };
    SearchAddress.prototype.getSearchData = function (val) {
        var _this = this;
        return new Promise(function (resolve) {
            if (val && val.trim() != '') {
                _this.placeSearch.search(val, function (status, result) {
                    if (status == 'complete') {
                        resolve(result.poiList.pois);
                    }
                    else if (status == 'no_data') {
                        _this.nativeService.showToast('没有找到匹配结果,请精确查询条件');
                    }
                    else {
                        _this.nativeService.showToast('地图查询失败,稍后再试.');
                    }
                });
            }
        });
    };
    SearchAddress.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return SearchAddress;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('searchBar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Searchbar */])
], SearchAddress.prototype, "searchBar", void 0);
SearchAddress = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-search-address',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/shared/map-component/search-address/search-address.html"*/'<!--\n  Generated template for the LocationSearch page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      <ion-searchbar #searchBar\n                     mode="ios"\n                     placeholder="搜索"\n                     debounce="600"\n                     [(ngModel)]="address"\n                     (ionInput)="getItems($event)">\n      </ion-searchbar>\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n    <ion-item *ngFor="let item of items" tappable (click)="selectItem(item)">\n      {{ item.name }}<br/>\n      <span *ngFor="let add of item.address.split(\';\')">\n        <span class="address">{{add}}</span>\n      </span>\n    </ion-item>\n    <button *ngIf="items.length>0" ion-button full clear (click)="clearHistory()">清空搜索历史</button>\n  </ion-list>\n</ion-content>\n\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/shared/map-component/search-address/search-address.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */]])
], SearchAddress);

//# sourceMappingURL=search-address.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationModule", function() { return NavigationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigation__ = __webpack_require__(256);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NavigationModule = (function () {
    function NavigationModule() {
    }
    return NavigationModule;
}());
NavigationModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__navigation__["a" /* Navigation */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__navigation__["a" /* Navigation */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__navigation__["a" /* Navigation */]
        ]
    })
], NavigationModule);

//# sourceMappingURL=navigation.module.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navigation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the Navigation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Navigation = (function () {
    function Navigation(viewCtrl, nativeService, navParams) {
        this.viewCtrl = viewCtrl;
        this.nativeService = nativeService;
        this.navParams = navParams;
        this.navigationIsReady = false;
        this.navigationType = this.navParams.get("navigationType");
        this.endPoint = this.navParams.get("markerLocation");
        this.map = window['HomeAMap'];
    }
    Navigation.prototype.ngAfterContentInit = function () {
        var _this = this;
        var type = this.navigationType, options = { city: '广州市', panel: this.panel.nativeElement, map: this.map };
        if (type === 1) {
            AMap.service('AMap.Driving', function () {
                _this.navigationIsReady = true;
                _this.doSearch(type, new AMap.Driving(options));
            });
        }
        else if (type === 2) {
            AMap.service('AMap.Transfer', function () {
                _this.doSearch(type, new AMap.Transfer(options));
            });
        }
        else if (type === 3) {
            AMap.service('AMap.Walking', function () {
                _this.doSearch(type, new AMap.Walking(options));
            });
        }
    };
    Navigation.prototype.doSearch = function (navigationType, navigationService) {
        var _this = this;
        this.nativeService.getUserLocation().subscribe(function (location) {
            _this.map.clearMap();
            _this.startPoint = location;
            navigationService.search([_this.startPoint.lng, _this.startPoint.lat], [_this.endPoint.lng, _this.endPoint.lat], function (status, result) {
            });
        });
    };
    Navigation.prototype.doNavigation = function (type) {
        this.nativeService.navigation(this.startPoint, this.endPoint, type).subscribe(function (message) {
            debugger;
        });
    };
    Navigation.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return Navigation;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('panel'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], Navigation.prototype, "panel", void 0);
Navigation = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-navigation',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/shared/map-component/navigation/navigation.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      路线查看或导航\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid *ngIf="navigationIsReady">\n    <ion-row class="align-center">\n      <ion-col width-50>\n        <button ion-button outline small (click)="doNavigation(0)">开始实时导航</button>\n      </ion-col>\n      <ion-col width-50>\n        <button ion-button color="secondary" outline small (click)="doNavigation(1)">开始模拟导航</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <div #panel></div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/shared/map-component/navigation/navigation.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
], Navigation);

//# sourceMappingURL=navigation.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapLocationModule", function() { return MapLocationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__map_location__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__navigation_navigation_module__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_address_search_address_module__ = __webpack_require__(253);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var MapLocationModule = (function () {
    function MapLocationModule() {
    }
    return MapLocationModule;
}());
MapLocationModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__map_location__["a" /* MapLocation */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__map_location__["a" /* MapLocation */]), __WEBPACK_IMPORTED_MODULE_3__navigation_navigation_module__["NavigationModule"], __WEBPACK_IMPORTED_MODULE_4__search_address_search_address_module__["SearchAddressModule"]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__map_location__["a" /* MapLocation */]
        ]
    })
], MapLocationModule);

//# sourceMappingURL=map-location.module.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagingPageModule", function() { return PagingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paging__ = __webpack_require__(747);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PagingPageModule = (function () {
    function PagingPageModule() {
    }
    return PagingPageModule;
}());
PagingPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__paging__["a" /* PagingPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__paging__["a" /* PagingPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__paging__["a" /* PagingPage */]
        ]
    })
], PagingPageModule);

//# sourceMappingURL=paging.module.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mine_mine__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test_test__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__demo_demo__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_GlobalData__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_Helper__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TabsPage = (function () {
    function TabsPage(events, globalData, storage, helper) {
        this.events = events;
        this.globalData = globalData;
        this.storage = storage;
        this.helper = helper;
        this.testRoot = __WEBPACK_IMPORTED_MODULE_5__test_test__["a" /* TestPage */];
        this.demoRoot = __WEBPACK_IMPORTED_MODULE_6__demo_demo__["a" /* DemoPage */];
        this.homeRoot = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.mineRoot = __WEBPACK_IMPORTED_MODULE_3__mine_mine__["a" /* MinePage */];
    }
    TabsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.events.subscribe('user:login', function (loginInfo) {
            var userInfo = loginInfo.user;
            _this.globalData.userId = userInfo.id;
            _this.globalData.username = userInfo.username;
            _this.globalData.fullName = userInfo.fullName;
            if (!userInfo.avatarPath) {
                _this.helper.loadAvatarPath(userInfo.avatarId).subscribe(function (avatarPath) {
                    userInfo.avatarPath = avatarPath;
                    _this.storage.set('LoginInfo', loginInfo);
                });
            }
            _this.helper.setTags();
            _this.helper.setAlias(userInfo.id);
        });
    };
    return TabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('mainTabs'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* Tabs */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["w" /* Tabs */]) === "function" && _a || Object)
], TabsPage.prototype, "tabs", void 0);
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/tabs/tabs.html"*/'<ion-tabs #mainTabs class="tabs-icon-top tabs-color-active-balanced">\n  <ion-tab [root]="testRoot" tabTitle="微信" tabIcon="icon-chatbubbleoutline" ui-sref="tab.message"\n    tabsHideOnSubPages >\n    <!-- <ion-nav-view animation="slide-left-right" name="tab-friends"></ion-nav-view> -->\n  </ion-tab>\n  <ion-tab [root]="homeRoot" title="通讯录" icon-on="icon-people" tabsHideOnSubPages icon-off="ion-ios-people-outline" ui-sref="tab.friends">\n    <!-- <ion-nav-view animation="slide-left-right" name="tab-friends"></ion-nav-view> -->\n  </ion-tab>\n  <ion-tab [root]="demoRoot" title="发现" icon-on="icon-limi-find" tabsHideOnSubPages icon-off="ion-ios-paperplane-outline"\n    ui-sref="tab.find">\n    <!-- <ion-nav-view animation="slide-left-right" name="tab-find"></ion-nav-view> -->\n  </ion-tab>\n  <ion-tab [root]="mineRoot" title="我" icon-off="icon-person" tabsHideOnSubPages icon-on="ion-ios-person" href="#/tab/setting">\n    <!-- <ion-nav-view animation="slide-left-right" name="tab-setting"></ion-nav-view> -->\n  </ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/tabs/tabs.html"*/,
        styles: ['tab.scss'],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* Events */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__providers_GlobalData__["a" /* GlobalData */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_GlobalData__["a" /* GlobalData */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__providers_Helper__["a" /* Helper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__providers_Helper__["a" /* Helper */]) === "function" && _e || Object])
], TabsPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomePage = (function () {
    function HomePage() {
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/home/home.html"*/'<ion-content>\n  home\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mine_edit_mine_edit__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mine_edit_avatar_modal_mine_edit_avatar_modal__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__about_about__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_Helper__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__work_map_work_map__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__setting_setting__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MinePage = (function () {
    function MinePage(navCtrl, platform, storage, helper, modalCtrl, nativeService, alertCtrl) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.storage = storage;
        this.helper = helper;
        this.modalCtrl = modalCtrl;
        this.nativeService = nativeService;
        this.alertCtrl = alertCtrl;
        this.avatarPath = __WEBPACK_IMPORTED_MODULE_8__providers_Constants__["e" /* DEFAULT_AVATAR */];
    }
    MinePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('LoginInfo').then(function (loginInfo) {
            var userInfo = loginInfo.user;
            if (userInfo) {
                _this.userInfo = userInfo;
                _this.avatarPath = userInfo.avatarPath;
            }
        });
    };
    MinePage.prototype.edit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__mine_edit_mine_edit__["a" /* MineEditPage */], { 'userInfo': this.userInfo, 'avatarPath': this.avatarPath });
    };
    MinePage.prototype.setting = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__setting_setting__["a" /* SettingPage */]);
    };
    MinePage.prototype.loginOut = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '确认重新登录？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
                        modal.present();
                        modal.onDidDismiss(function (userInfo) {
                            if (userInfo) {
                                _this.userInfo = userInfo;
                                _this.helper.loadAvatarPath(userInfo.avatarId).subscribe(function (avatarPath) {
                                    _this.avatarPath = avatarPath;
                                });
                            }
                        });
                    }
                }
            ]
        }).present();
    };
    //工作地图
    MinePage.prototype.map = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__work_map_work_map__["a" /* WorkMapPage */]);
    };
    MinePage.prototype.exitSoftware = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '确认退出软件？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }
            ]
        }).present();
    };
    MinePage.prototype.about = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__about_about__["a" /* AboutPage */]);
    };
    MinePage.prototype.viewAvatar = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__mine_edit_avatar_modal_mine_edit_avatar_modal__["a" /* MineEditAvatarModalPage */], { avatarPath: this.avatarPath });
        modal.present();
        modal.onDidDismiss(function (data) {
            data && (_this.avatarPath = data.avatarPath);
        });
    };
    MinePage.prototype.notice = function () {
        this.nativeService.alert('开发中...');
    };
    return MinePage;
}());
MinePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mine',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      我的\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="notice()">\n        <ion-icon name="ios-notifications-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content-background">\n  <ion-list class="mine-header">\n    <button ion-item (click)="edit()">\n      <ion-thumbnail item-left (click)="viewAvatar();$event.stopPropagation()">\n        <img src="{{avatarPath}}">\n      </ion-thumbnail>\n      <div>{{userInfo?.fullName}}</div>\n      <div class="description">{{userInfo?.description}}</div>\n    </button>\n  </ion-list>\n  <ion-list>\n    <button ion-item (click)="setting()">\n      <ion-icon name="settings" item-left color="primary"></ion-icon>\n      设置\n    </button>\n    <button ion-item (click)="map()">\n      <ion-icon name="map" item-left color="bright"></ion-icon>\n      工作地图\n    </button>\n  </ion-list>\n  <ion-list>\n    <button ion-item (click)="exitSoftware()" hideWhen="ios" detail-none>\n      <ion-icon name="log-out" item-left color="danger"></ion-icon>\n      退出软件\n    </button>\n    <button ion-item (click)="loginOut()" detail-none>\n      <ion-icon name="log-in" item-left color="danger"></ion-icon>\n      重新登录\n    </button>\n  </ion-list>\n  <ion-list>\n    <button ion-item (click)="about()">\n      <ion-icon name="information-circle" item-left color="secondary"></ion-icon>\n      关于\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["u" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_7__providers_Helper__["a" /* Helper */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_11__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], MinePage);

//# sourceMappingURL=mine.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mine_edit_modal_mine_edit_modal__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mine_edit_avatar_modal_mine_edit_avatar_modal__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Constants__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MineEditPage = (function () {
    function MineEditPage(modalCtrl, params) {
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.avatarPath = __WEBPACK_IMPORTED_MODULE_4__providers_Constants__["e" /* DEFAULT_AVATAR */];
        this.userInfo = this.params.get('userInfo');
        this.avatarPath = this.params.get('avatarPath');
    }
    MineEditPage.prototype.viewAvatar = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__mine_edit_avatar_modal_mine_edit_avatar_modal__["a" /* MineEditAvatarModalPage */], { avatarPath: this.avatarPath });
        modal.present();
        modal.onDidDismiss(function (data) {
            data && (_this.avatarPath = data.avatarPath);
        });
    };
    MineEditPage.prototype.openModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__mine_edit_modal_mine_edit_modal__["a" /* MineEditModalPage */], { 'userInfo': this.userInfo });
        modal.present();
        modal.onDidDismiss(function (userInfo) {
            userInfo && (_this.userInfo = userInfo);
        });
    };
    return MineEditPage;
}());
MineEditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mine-edit',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine-edit/mine-edit.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>个人信息</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="openModal()">\n        <ion-icon name="ios-create-outline"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-avatar item-left tappable (click)="viewAvatar();$event.stopPropagation()">\n        <img [src]="avatarPath">\n      </ion-avatar>\n      <h2>{{userInfo.fullName}}</h2>\n      <p>一本正经的胡说八道</p>\n      <i class="icon ion-chevron-right icon-accessory"></i>\n    </ion-item>\n    <ion-item>\n      用户名：{{userInfo.username}}\n    </ion-item>\n    <ion-item>\n      手机号码：{{userInfo.phone}}\n    </ion-item>\n    <ion-item>\n      邮箱地址：{{userInfo.email}}\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine-edit/mine-edit.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
], MineEditPage);

//# sourceMappingURL=mine-edit.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineEditModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Validators__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MineEditModalPage = (function () {
    function MineEditModalPage(params, viewCtrl, storage, formBuilder, nativeService) {
        var _this = this;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.nativeService = nativeService;
        this.verifyMessages = {
            'name': {
                'errorMsg': '',
                'required': '用户名为必填项',
                'minlength': '姓名最少2个字符',
                'chinese': '姓名必须是中文'
            },
            'phone': {
                'errorMsg': '',
                'required': '手机号码为必填项',
                'phone': '请输入正确的手机号码'
            },
            'email': {
                'errorMsg': '',
                'required': '电子邮箱为必填项',
                'email': '请输入正确的邮箱地址'
            }
        };
        this.userInfo = this.params.get('userInfo');
        this.userForm = this.formBuilder.group({
            name: [this.userInfo.fullName, [__WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].chinese]],
            phone: [this.userInfo.phone, [__WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].phone]],
            email: [this.userInfo.email, [__WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__providers_Validators__["a" /* Validators */].email]]
        });
        this.userForm.valueChanges
            .subscribe(function (data) {
            var verifyMessages = _this.verifyMessages;
            for (var field in verifyMessages) {
                verifyMessages[field].errorMsg = '';
                var control = _this.userForm.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = verifyMessages[field];
                    for (var key in control.errors) {
                        messages[key] && (verifyMessages[field].errorMsg += messages[key] + ' ');
                    }
                }
            }
        });
    }
    MineEditModalPage.prototype.onSubmit = function () {
        Object.assign(this.userInfo, this.userForm.value);
        this.storage.set('UserInfo', this.userInfo);
        this.nativeService.showToast('保存成功');
        this.viewCtrl.dismiss(this.userInfo);
    };
    MineEditModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return MineEditModalPage;
}());
MineEditModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mine-edit-modal',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine-edit-modal/mine-edit-modal.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      编辑个人信息\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>姓名</ion-label>\n        <ion-input type="text" formControlName="name"></ion-input>\n      </ion-item>\n      <div *ngIf="verifyMessages.name.errorMsg" class="validation-failed">{{verifyMessages.name.errorMsg}}</div>\n\n      <ion-item>\n        <ion-label floating>手机号码</ion-label>\n        <ion-input type="tel" formControlName="phone"></ion-input>\n      </ion-item>\n      <div *ngIf="verifyMessages.phone.errorMsg" class="validation-failed">{{verifyMessages.phone.errorMsg}}</div>\n\n      <ion-item>\n        <ion-label floating>电子邮箱</ion-label>\n        <ion-input type="email" formControlName="email"></ion-input>\n      </ion-item>\n      <div *ngIf="verifyMessages.email.errorMsg" class="validation-failed">{{verifyMessages.email.errorMsg}}</div>\n\n    </ion-list>\n    <div padding-horizontal>\n      <button type="submit" ion-button block [disabled]="!userForm.valid">保 存</button>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/mine-edit-modal/mine-edit-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["r" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_4__providers_NativeService__["a" /* NativeService */]])
], MineEditModalPage);

//# sourceMappingURL=mine-edit-modal.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validators; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(21);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by yanxiaojun617@163.com on 3-12.
 */


var Validators = Validators_1 = (function (_super) {
    __extends(Validators, _super);
    function Validators() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Validators;
}(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */]));
/*E-mail*/
Validators.email = function (control) {
    return Validators_1.validatorsByPattern('email', control, '([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
};
/*手机号码*/
Validators.phone = function (control) {
    return Validators_1.validatorsByPattern('phone', control, '1[0-9]{10,10}');
};
/*中文*/
Validators.chinese = function (control) {
    return Validators_1.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
};
/*英文、数字包括下划线*/
Validators.legallyNamed = function (control) {
    return Validators_1.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
};
Validators.validatorsByPattern = function (name, control, pattern) {
    var validatorFn = Validators_1.pattern(pattern)(control);
    if (validatorFn != null) {
        validatorFn[name] = validatorFn['pattern'];
    }
    return validatorFn;
};
Validators = Validators_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Validators);

var Validators_1;
//# sourceMappingURL=Validators.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__update_log_update_log__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feed_back_feed_back__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_Helper__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_GlobalData__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AboutPage = (function () {
    function AboutPage(navCtrl, alertCtrl, helper, globalData, nativeService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.helper = helper;
        this.globalData = globalData;
        this.nativeService = nativeService;
        this.versionNo = '0.0.1';
        if (this.nativeService.isMobile()) {
            this.nativeService.getVersionNumber().subscribe(function (value) {
                _this.versionNo = value;
            });
        }
    }
    AboutPage.prototype.checkNewVersion = function () {
        var _this = this;
        if (this.globalData.updateProgress == -1 || this.globalData.updateProgress == 100) {
            this.helper.assertUpgrade().subscribe(function (res) {
                if (res.update) {
                    _this.nativeService.downloadApp();
                }
                else {
                    res.msg && _this.nativeService.alert(res.msg);
                }
            });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: "\u4E0B\u8F7D\u8FDB\u5EA6\uFF1A" + this.globalData.updateProgress + "%",
                buttons: [{ text: '确定' }
                ]
            });
            alert_1.present();
            var interval_1 = setInterval(function () {
                alert_1.setTitle("\u4E0B\u8F7D\u8FDB\u5EA6\uFF1A" + _this.globalData.updateProgress + "%");
                if (_this.globalData.updateProgress == 100) {
                    clearInterval(interval_1);
                    alert_1 && alert_1.dismiss();
                }
            }, 1000);
        }
    };
    AboutPage.prototype.updateLog = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__update_log_update_log__["a" /* UpdateLogPage */]);
    };
    AboutPage.prototype.features = function () {
        this.nativeService.showToast('正在完善...');
    };
    AboutPage.prototype.feedBack = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__feed_back_feed_back__["a" /* FeedBackPage */]);
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/about/about.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>关于</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div padding>logo</div>\n  <ion-list>\n    <button ion-item (click)="checkNewVersion()" detail-none>\n      检查新版本(当前版本:{{versionNo}})\n    </button>\n    <button ion-item (click)="updateLog()">\n      更新日志\n    </button>\n    <button ion-item (click)="features()">\n      功能介绍\n    </button>\n    <button ion-item (click)="feedBack()">\n      用户反馈\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/about/about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_Helper__["a" /* Helper */],
        __WEBPACK_IMPORTED_MODULE_6__providers_GlobalData__["a" /* GlobalData */],
        __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateLogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
 Generated class for the UpdateLog page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var UpdateLogPage = (function () {
    function UpdateLogPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    UpdateLogPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return UpdateLogPage;
}());
UpdateLogPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-update-log',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/update-log/update-log.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>更新日志</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      v0.0.1\n    </ion-item>\n    <ion-item>\n      第一版\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/update-log/update-log.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */]])
], UpdateLogPage);

//# sourceMappingURL=update-log.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedBackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_FileService__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FeedBackPage = (function () {
    function FeedBackPage(navCtrl, fileService) {
        this.navCtrl = navCtrl;
        this.fileService = fileService;
        this.fileObjList = [];
    }
    FeedBackPage.prototype.save = function () {
        var _this = this;
        this.fileService.uploadMultiByFilePath(this.fileObjList).subscribe(function (res) {
            _this.navCtrl.pop();
        });
    };
    return FeedBackPage;
}());
FeedBackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-feed-back',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/feed-back/feed-back.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>用户信息反馈</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-textarea style="overflow-y:hidden; height:50px;"\n                onpropertychange="this.style.height=this.scrollHeight + \'px\'"\n                oninput="this.style.height=this.scrollHeight + \'px\'" [(ngModel)]="description"\n                placeholder="请填写问题描述">\n  </ion-textarea>\n  <div>\n    <page-select-picture [(fileObjList)]="fileObjList"></page-select-picture>\n  </div>\n  <div>\n    <button ion-button type="submit" block (click)="save()">保存</button>\n  </div>\n</ion-content>\n\n\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/feed-back/feed-back.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_FileService__["a" /* FileService */]])
], FeedBackPage);

//# sourceMappingURL=feed-back.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JPush; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_core__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };


/**
 * @name JPush
 * @description
 * This plugin does something
 *
 * @usage
 * ```
 * import { JPush } from 'ionic-native';
 *
 * JPush.functionName('Hello', 123)
 *   .then((something: any) => doSomething(something))
 *   .catch((error: any) => console.log(error));
 *
 * ```
 */
var JPush = (function () {
  function JPush() {
  }

  JPush.prototype.init = function () {
    return; // We add return; here to avoid any IDE / Compiler errors
  };
  JPush.prototype.stopPush = function () {
    return;
  };
  JPush.prototype.resumePush = function () {
    return;
  };
  JPush.prototype.isPushStopped = function () {
    return;
  };
  JPush.prototype.getRegistrationID = function () {
    return;
  };
  JPush.prototype.setTagsWithAlias = function (tags, alias) {
    return;
  };
  JPush.prototype.setTags = function (tags) {
    return;
  };
  JPush.prototype.setAlias = function (alias) {
    return;
  };
  JPush.prototype.setBadge = function (badgeNum) {
    return;
  };
  JPush.prototype.openNotification = function () {
    return;
  };
  JPush.prototype.receiveNotification = function () {
    return;
  };
  JPush.prototype.receiveMessage = function () {
    return;
  };
  JPush.prototype.getUserNotificationSettings = function () {
    return;
  };
  JPush.prototype.setDebugModeFromIos = function () {
    return;
  };
  JPush.prototype.setDebugMode = function (isDebug) {
    return;
  };

  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "init", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "stopPush", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "resumePush", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "isPushStopped", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "getRegistrationID", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Array, String]),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "setTagsWithAlias", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Array]),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "setTags", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "setAlias", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "setBadge", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])({
      eventObservable: true,
      event: 'jpush.openNotification',
      element: document
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
  ], JPush.prototype, "openNotification", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])({
      eventObservable: true,
      event: 'jpush.receiveNotification',
      element: document
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
  ], JPush.prototype, "receiveNotification", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])({
      eventObservable: true,
      event: 'jpush.receiveMessage',
      element: document
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"])
  ], JPush.prototype, "receiveMessage", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "getUserNotificationSettings", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "setDebugModeFromIos", null);
  __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["a" /* Cordova */])(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise)
  ], JPush.prototype, "setDebugMode", null);


  JPush = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__ionic_native_core__["g" /* Plugin */])({
      pluginName: 'JPush',
      plugin: 'jpush-phonegap-plugin',
      pluginRef: 'plugins.jPushPlugin',
      repo: 'https://github.com/jpush/jpush-phonegap-plugin',
    }),
    __metadata('design:paramtypes', [])
  ], JPush);
  return JPush;
}());
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FindPasswordPage = (function () {
    function FindPasswordPage(navCtrl, viewCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.findPasswordForm = this.formBuilder.group({
            phone: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('1[0-9]{10}')]],
            verificationCode: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[0-9]{6}')]],
            newPassword: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)]]
        });
    }
    ;
    FindPasswordPage.prototype.confirm = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]);
    };
    FindPasswordPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return FindPasswordPage;
}());
FindPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-find-password',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/login/find-password/find-password.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      找回密码\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="findPasswordForm" (ngSubmit)="confirm()">\n    <ion-list>\n      <ion-item>\n        <ion-label>手机号</ion-label>\n        <ion-input type="number" formControlName="phone"></ion-input>\n      </ion-item>\n      <span padding-left *ngIf="!findPasswordForm.controls.phone.valid&& findPasswordForm.controls.phone.touched" color="danger">请输入手机号码</span>\n      <ion-item>\n        <ion-label>验证码</ion-label>\n        <ion-input type="number" formControlName="verificationCode"></ion-input>\n      </ion-item>\n      <span padding-left *ngIf="!findPasswordForm.controls.verificationCode.valid&& findPasswordForm.controls.verificationCode.touched" color="danger">请输入验证码</span>\n      <ion-item>\n        <ion-label>新密码</ion-label>\n        <ion-input type="password" formControlName="newPassword"></ion-input>\n      </ion-item>\n      <span padding-left *ngIf="!findPasswordForm.controls.newPassword.valid&& findPasswordForm.controls.newPassword.touched" color="danger">请输入新密码</span>\n    </ion-list>\n    <div padding-horizontal>\n      <button ion-button block type="submit" [disabled]="!findPasswordForm.valid">确　认</button>\n    </div>\n    <button class="verification" ion-button small color="secondary" *ngIf="findPasswordForm.controls.phone.valid">获取验证码</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/login/find-password/find-password.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], FindPasswordPage);

//# sourceMappingURL=find-password.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = (function () {
    function RegisterPage(navCtrl, viewCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.registerForm = this.formBuilder.group({
            username: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+')]],
            verificationCode: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('1[0-9]{6}')]],
            phone: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('1[0-9]{10}')]],
            password: [, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    }
    ;
    RegisterPage.prototype.confirm = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]);
    };
    RegisterPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/login/register/register.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      注册\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="registerForm" (ngSubmit)="(confirm())">\n    <ion-list>\n      <ion-item>\n        <ion-label>用户名</ion-label>\n        <ion-input type="text" formControlName="username"></ion-input>\n      </ion-item>\n      <span padding-left *ngIf="!registerForm.controls.username.valid && registerForm.controls.username.touched"\n            color="danger">\n          请输入用户名\n        </span>\n      <ion-item>\n        <ion-label>手机号</ion-label>\n        <ion-input type="tel" formControlName="phone"></ion-input>\n      </ion-item>\n      <span padding-left *ngIf="!registerForm.controls.phone.valid && registerForm.controls.phone.touched"\n            color="danger">\n          请输入电话\n        </span>\n      <ion-item>\n        <ion-label>验证码</ion-label>\n        <ion-input type="number" formControlName="verificationCode"></ion-input>\n      </ion-item>\n      <span padding-left\n            *ngIf="!registerForm.controls.verificationCode.valid&& registerForm.controls.verificationCode.touched"\n            color="danger">请输入验证码</span>\n      <ion-item>\n        <ion-label>密　码</ion-label>\n        <ion-input type="password" formControlName="password"></ion-input>\n      </ion-item>\n      <span padding-left *ngIf="!registerForm.controls.password.valid && registerForm.controls.phone.password"\n            color="danger">请输入密码</span>\n    </ion-list>\n    <div padding-horizontal>\n      <button ion-button block type="submit" [disabled]="!registerForm.valid">登　录</button>\n    </div>\n    <button class="verification" ion-button small color="secondary" *ngIf="registerForm.controls.phone.valid">获取验证码</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/login/register/register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkMapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the WorkMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var WorkMapPage = (function () {
    function WorkMapPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    return WorkMapPage;
}());
WorkMapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-work-map',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/work-map/work-map.html"*/'<!--\n  Generated template for the WorkMapPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>工作地图</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <page-map-location></page-map-location>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/work-map/work-map.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
], WorkMapPage);

//# sourceMappingURL=work-map.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__change_password_change_password__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SettingPage = (function () {
    function SettingPage(navCtrl, navParams, storage, modalCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
    }
    SettingPage.prototype.clearCache = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '确认清除缓存？',
            subTitle: '清除后需要重新登录',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_3__providers_Utils__["a" /* Utils */].sessionStorageClear();
                        _this.storage.clear();
                        var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                        modal.present();
                        modal.onDidDismiss(function (data) {
                            _this.navCtrl.popToRoot();
                        });
                    }
                }
            ]
        }).present();
    };
    SettingPage.prototype.changePassword = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__change_password_change_password__["a" /* ChangePasswordPage */]);
        modal.present();
        modal.onDidDismiss(function (data) {
        });
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/setting/setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>设置</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <button ion-item (click)="clearCache()" detail-none>\n      <ion-icon name="trash" item-left color="danger"></ion-icon>\n      清除缓存\n    </button>\n    <button ion-item (click)="changePassword()" detail-none>\n      <ion-icon name="finger-print" item-left color="primary"></ion-icon>\n      修改密码\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/setting/setting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["r" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_Validators__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MineService__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChangePasswordPage = (function () {
    function ChangePasswordPage(viewCtrl, formBuilder, mineService, nativeService) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.mineService = mineService;
        this.nativeService = nativeService;
        this.strength = {
            low: false,
            middle: false,
            high: false
        };
        this.verifyMessages = {
            'oldPsw': {
                'errorMsg': '',
                'required': '旧密码为必填项'
            },
            'newPsw': {
                'errorMsg': '',
                'required': '新密码为必填项',
                'minlength': '密码最少4个字符'
            },
            'newPsw2': {
                'errorMsg': '',
                'required': '请重复输入新密码',
                'minlength': '密码最少4个字符'
            }
        };
        this.form = this.formBuilder.group({
            oldPsw: ['', [__WEBPACK_IMPORTED_MODULE_3__providers_Validators__["a" /* Validators */].required]],
            newPsw: ['', [__WEBPACK_IMPORTED_MODULE_3__providers_Validators__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__providers_Validators__["a" /* Validators */].minLength(4)]],
            newPsw2: ['', [__WEBPACK_IMPORTED_MODULE_3__providers_Validators__["a" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__providers_Validators__["a" /* Validators */].minLength(4)]]
        });
        this.form.valueChanges
            .subscribe(function (data) {
            var verifyMessages = _this.verifyMessages;
            for (var field in verifyMessages) {
                verifyMessages[field].errorMsg = '';
                var control = _this.form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = verifyMessages[field];
                    for (var key in control.errors) {
                        messages[key] && (verifyMessages[field].errorMsg += messages[key] + ' ');
                    }
                }
            }
        });
    }
    ChangePasswordPage.prototype.onSubmit = function () {
        var _this = this;
        var oldPsw = this.form.value.oldPsw;
        var newPsw = this.form.value.newPsw;
        var newPsw2 = this.form.value.newPsw2;
        if (newPsw2 != newPsw) {
            this.nativeService.alert('新密码两次输入不一致');
            return;
        }
        this.mineService.updateUserPassword(oldPsw, newPsw).subscribe(function (res) {
            _this.nativeService.showToast('密码修改成功');
            _this.dismiss();
        });
    };
    ChangePasswordPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ChangePasswordPage.prototype.input = function (val) {
        var m = this.checkPass(val);
        if (m >= 3) {
            this.strength.high = true;
        }
        if (m == 2) {
            this.strength.high = false;
            this.strength.middle = true;
        }
        if (m < 2) {
            this.strength.high = false;
            this.strength.middle = false;
            this.strength.low = true;
        }
    };
    /**
     * 密码强度
     * @param pwd
     * @returns {number}
     */
    ChangePasswordPage.prototype.checkPass = function (pwd) {
        var m = 0;
        if (pwd.length <= 4) {
            return m; //密码长度小于等于4
        }
        if (/\d/.test(pwd)) {
            m++; //纯数字密码
        }
        if (/[a-z]/.test(pwd)) {
            m++; //密码包含小写字母
        }
        if (/[A-Z]/.test(pwd)) {
            m++; //密码包含大写字母
        }
        if (/\W/.test(pwd)) {
            m++; //密码包含特殊字符
        }
        if (pwd.length > 15) {
            m = 4; //密码长度大于15
        }
        return m;
    };
    return ChangePasswordPage;
}());
ChangePasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-change-password',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/mine/change-password/change-password.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      修改密码\n    </ion-title>\n    <ion-buttons>\n      <button ion-button (click)="dismiss()">关闭</button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="form" (ngSubmit)="onSubmit()">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>请输入旧密码</ion-label>\n        <ion-input type="password" formControlName="oldPsw"></ion-input>\n      </ion-item>\n      <div *ngIf="verifyMessages.oldPsw.errorMsg" class="validation-failed">{{verifyMessages.oldPsw.errorMsg}}</div>\n\n      <ion-item>\n        <ion-label floating>请输入新密码</ion-label>\n        <ion-input type="password" formControlName="newPsw" (input)="input($event.target.value)"></ion-input>\n      </ion-item>\n      <div *ngIf="verifyMessages.newPsw.errorMsg" class="validation-failed">{{verifyMessages.newPsw.errorMsg}}</div>\n      <div class="strength">\n        <div>密码强度：</div>\n        <div class="bar" [ngClass]="{\'low\': strength.low, \'middle\': strength.middle, \'high\': strength.high}"></div>\n      </div>\n      <ion-item>\n        <ion-label floating>请再次输入新密码</ion-label>\n        <ion-input type="password" formControlName="newPsw2"></ion-input>\n      </ion-item>\n      <div *ngIf="verifyMessages.newPsw2.errorMsg" class="validation-failed">{{verifyMessages.newPsw2.errorMsg}}</div>\n\n    </ion-list>\n    <div padding-horizontal>\n      <button type="submit" ion-button block [disabled]="!form.valid">保 存</button>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/mine/change-password/change-password.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__MineService__["a" /* MineService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_NativeService__["a" /* NativeService */]])
], ChangePasswordPage);

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TestService__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TestPage = (function () {
    function TestPage(testService, nativeService, diagnostic) {
        this.testService = testService;
        this.nativeService = nativeService;
        this.diagnostic = diagnostic;
        this.fileObjList = [];
    }
    TestPage.prototype.getFileData = function () {
        var _this = this;
        this.testService.getFileData().subscribe(function (res) {
            _this.fileObjList = res;
        });
    };
    TestPage.prototype.getUserLocation = function () {
        this.nativeService.getUserLocation().subscribe(function (res) {
            console.log(res);
            alert(res.lng + ',' + res.lat);
        }, function (err) {
            console.log(err);
            alert(err);
        });
    };
    TestPage.prototype.isLocationEnabled = function () {
        this.diagnostic.isLocationEnabled().then(function (res) {
            console.log(res);
            alert(res);
        }).catch(function (err) {
            console.log(err);
            alert(err);
        });
    };
    TestPage.prototype.switchToLocationSettings = function () {
        this.diagnostic.switchToLocationSettings();
    };
    TestPage.prototype.switchToSettings = function () {
        this.diagnostic.switchToSettings();
    };
    return TestPage;
}());
TestPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-test',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/test/test.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>test</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button ion-button block (click)="getFileData()">请求照片</button>\n  <page-select-picture [max]="6" [(fileObjList)]="fileObjList"></page-select-picture>\n  <button ion-button block (click)="getUserLocation()">getUserLocation</button>\n  <button ion-button block (click)="isLocationEnabled()">isLocationEnabled</button>\n  <button ion-button block (click)="switchToLocationSettings()">switchToLocationSettings</button>\n  <button ion-button block (click)="switchToSettings()">switchToSettings</button>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/test/test.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__TestService__["a" /* TestService */], __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_diagnostic__["a" /* Diagnostic */]])
], TestPage);

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TestService = (function () {
    function TestService(http, httpService) {
        this.http = http;
        this.httpService = httpService;
    }
    TestService.prototype.getJson = function () {
        return this.httpService.get('./assets/data/test.json').map(function (res) { return res.json(); });
    };
    TestService.prototype.getObj = function () {
        return this.httpService.get('./assets/data/test.json').map(function (res) { return res.json(); });
    };
    TestService.prototype.getList = function () {
        return this.httpService.get('./assets/data/testList.json').map(function (res) { return res.json(); });
    };
    TestService.prototype.getFileData = function () {
        return this.http.get('./assets/data/fileData.json').map(function (res) {
            var result = res.json(), fileObjList = [];
            if (result.success) {
                for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                    var fileObj = _a[_i];
                    fileObjList.push({ 'thumbPath': fileObj.base64, 'origPath': fileObj.base64 });
                }
            }
            return fileObjList;
        });
    };
    return TestService;
}());
TestService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_HttpService__["a" /* HttpService */]])
], TestService);

//# sourceMappingURL=TestService.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pagination_demo_pagination_demo__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__custom_icon_demo_custom_icon_demo__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chartjs_demo_chartjs_demo__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__select_pic_demo_select_pic_demo__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__custom_pipe_demo_custom_pipe_demo__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transition_demo_transition_demo__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__crop_pic_demo_crop_pic_demo__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__city_picker_demo_city_picker_demo__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__calendar_demo_calendar_demo__ = __webpack_require__(445);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DemoPage = (function () {
    function DemoPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    DemoPage.prototype.pagination = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pagination_demo_pagination_demo__["a" /* PaginationDemoPage */]);
    };
    DemoPage.prototype.customIcon = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__custom_icon_demo_custom_icon_demo__["a" /* CustomIconDemoPage */]);
    };
    DemoPage.prototype.pipes = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__custom_pipe_demo_custom_pipe_demo__["a" /* CustomPipeDemo */]);
    };
    DemoPage.prototype.chartjs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chartjs_demo_chartjs_demo__["a" /* ChartjsDemoPage */]);
    };
    DemoPage.prototype.selectPic = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__select_pic_demo_select_pic_demo__["a" /* SelectPicDemoPage */]);
    };
    DemoPage.prototype.cropPic = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__crop_pic_demo_crop_pic_demo__["a" /* CropPicDemoPage */]);
    };
    DemoPage.prototype.pageTransition = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__transition_demo_transition_demo__["a" /* TransitionDemoPage */]);
    };
    DemoPage.prototype.cityPicker = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__city_picker_demo_city_picker_demo__["a" /* CityPickerDemoPage */]);
    };
    DemoPage.prototype.calendar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__calendar_demo_calendar_demo__["a" /* CalendarDemoPage */]);
    };
    return DemoPage;
}());
DemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/demo.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      demo\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item (click)="pagination()">\n      自定义分页组件\n    </button>\n    <button ion-item (click)="customIcon()">\n      自定义图标\n    </button>\n    <button ion-item (click)="pipes()">\n      自定义管道demo\n    </button>\n    <button ion-item (click)="chartjs()">\n      Chartjs\n    </button>\n    <button ion-item (click)="selectPic()">\n      自定义添加/预览图片组件\n    </button>\n    <button ion-item (click)="cropPic()">\n      图片裁剪demo\n    </button>\n    <button ion-item (click)="pageTransition()">\n      自定义过渡动画\n    </button>\n    <button ion-item (click)="cityPicker()">\n      省市区级联\n    </button>\n    <button ion-item (click)="calendar()">\n      日历/日期范围选择\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/demo.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]])
], DemoPage);

//# sourceMappingURL=demo.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginationDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
 Generated class for the PaginationDemo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var PaginationDemoPage = (function () {
    function PaginationDemoPage(navCtrl, navParams, nativeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
    }
    PaginationDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    PaginationDemoPage.prototype.doSearch = function (pageNum) {
        console.log(pageNum);
    };
    return PaginationDemoPage;
}());
PaginationDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-pagination-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/pagination-demo/pagination-demo.html"*/'<!--\n  Generated template for the PaginationDemo page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>pagination-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <page-paging [total]="16" (pageNumChange)="doSearch($event)"></page-paging>\n  <page-paging [total]="22" (pageNumChange)="doSearch($event)" pageSize="10" color="dark"></page-paging>\n  <div padding>\n    <button ion-button block (click)="details(\'http://www.jianshu.com/p/8cf299555370\')">查看详情</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/pagination-demo/pagination-demo.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */]])
], PaginationDemoPage);

//# sourceMappingURL=pagination-demo.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomIconDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the CustomIconDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CustomIconDemoPage = (function () {
    function CustomIconDemoPage(navCtrl, navParams, nativeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
    }
    CustomIconDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    return CustomIconDemoPage;
}());
CustomIconDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-custom-icon-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/custom-icon-demo/custom-icon-demo.html"*/'<!--\n  Generated template for the CustomIconDemo page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>custom-icon-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div class="my-icon">\n    <ion-icon class="iconfont icon-patorl-task" color="primary"></ion-icon>\n    <ion-icon class="iconfont icon-patorl-record" color="primary"></ion-icon>\n    <ion-icon class="iconfont icon-repair-task" color="primary"></ion-icon>\n    <ion-icon class="iconfont icon-repair-record" color="primary"></ion-icon>\n    <ion-icon class="iconfont icon-experiment-task" color="secondary"></ion-icon>\n    <ion-icon class="iconfont icon-experiment-record" color="secondary"></ion-icon>\n    <ion-icon class="iconfont icon-guard-task" color="danger"></ion-icon>\n    <ion-icon class="iconfont icon-guard-record" color="danger"></ion-icon>\n  </div>\n  <ion-list>\n    <ion-item>\n      试验记录\n      <ion-icon class="iconfont icon-experiment-record" color="secondary" item-right></ion-icon>\n    </ion-item>\n    <ion-item>\n      巡检记录\n      <ion-icon class="iconfont icon-patorl-record" color="primary" item-right></ion-icon>\n    </ion-item>\n    <ion-item>\n      <ion-icon class="iconfont icon-patorl-task" color="primary" item-left></ion-icon>\n      巡检任务\n    </ion-item>\n    <ion-item>\n      <ion-icon class="iconfont icon-experiment-task" color="secondary" item-left></ion-icon>\n      试验任务\n    </ion-item>\n  </ion-list>\n\n\n  <ion-icon name="zhifubao" color="primary" style="font-size: 32px"></ion-icon>\n  <ion-icon name="ios-zhifubao-outline" color="secondary" style="font-size: 64px"></ion-icon>\n  <ion-icon name="qq" color="danger" style="font-size: 50px"></ion-icon>\n  <ion-icon name="ios-qq-outline" color="primary" style="font-size: 40px"></ion-icon>\n  <div padding>\n    <button ion-button block (click)="details(\'http://www.jianshu.com/p/f6488850b6a2\')">查看详情</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/custom-icon-demo/custom-icon-demo.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */]])
], CustomIconDemoPage);

//# sourceMappingURL=custom-icon-demo.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartjsDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



 // 导入chart.js
/*
  Generated class for the ChartjsDemo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ChartjsDemoPage = (function () {
    function ChartjsDemoPage(navCtrl, navParams, nativeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
    }
    ChartjsDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    ChartjsDemoPage.prototype.ionViewDidEnter = function () {
        __WEBPACK_IMPORTED_MODULE_2_chart_js___default.a.Bar(this.chartBar.nativeElement.getContext("2d"), {
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                        label: '呵呵',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
        __WEBPACK_IMPORTED_MODULE_2_chart_js___default.a.Line(this.chartLine.nativeElement.getContext("2d"), {
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "哈哈",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
        });
        __WEBPACK_IMPORTED_MODULE_2_chart_js___default.a.Doughnut(this.chartPie.nativeElement.getContext("2d"), {
            data: {
                labels: [
                    "Red",
                    "Blue",
                    "Yellow"
                ],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }
                ]
            }
        });
    };
    return ChartjsDemoPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('chartBar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], ChartjsDemoPage.prototype, "chartBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('chartLine'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], ChartjsDemoPage.prototype, "chartLine", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('chartPie'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], ChartjsDemoPage.prototype, "chartPie", void 0);
ChartjsDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-chartjs-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/chartjs-demo/chartjs-demo.html"*/'<!--\n  Generated template for the ChartjsDemo page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>chartjs-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div padding-vertical>\n    <canvas #chartBar height="200"></canvas>\n  </div>\n  <div padding-vertical>\n    <canvas #chartLine height="200"></canvas>\n  </div>\n  <div padding-vertical>\n    <canvas #chartPie height="200"></canvas>\n  </div>\n  <div padding>\n    <button ion-button block (click)="details(\'http://www.jianshu.com/p/a14b438db0a0\')">查看详情</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/chartjs-demo/chartjs-demo.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */]])
], ChartjsDemoPage);

//# sourceMappingURL=chartjs-demo.js.map

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return APP_SERVE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FILE_SERVE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return APP_VERSION_SERVE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return IS_DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DEFAULT_AVATAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return PAGE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return IMAGE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return QUALITY_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return REQUEST_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ENABLE_FUNDEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return FUNDEBUG_API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APK_DOWNLOAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return APP_DOWNLOAD; });
/*----------------------------------------后台Api地址----------------------------------------*/
/*----------------------------------------后台Api地址----------------------------------------*/ var APP_SERVE_URL = 'http://88.128.18.144:8081/api/';
/*----------------------------------------文件服务器地址----------------------------------------*/
var FILE_SERVE_URL = 'http://172.16.19.86/kit_file_server/'; //文件服务:测试环境
/*----------------------------------------app版本升级服务地址----------------------------------------*/
//文件服务:测试环境
var APP_VERSION_SERVE_URL = 'http://172.16.19.86:8111/api/'; //app版本升级服务;测试环境,查询app最新版本号,更新日志等信息.
//app版本升级服务;测试环境,查询app最新版本号,更新日志等信息.
var IS_DEBUG = true; //是否开发(调试)模式
//是否开发(调试)模式
var DEFAULT_AVATAR = './assets/img/avatar.png'; //用户默认头像
//用户默认头像
var PAGE_SIZE = 5; //默认分页大小
//默认分页大小
var IMAGE_SIZE = 1024; //拍照/从相册选择照片压缩大小
//拍照/从相册选择照片压缩大小
var QUALITY_SIZE = 94; //图像压缩质量，范围为0 - 100
//图像压缩质量，范围为0 - 100
var REQUEST_TIMEOUT = 12000; //请求超时时间,单位为毫秒
//请求超时时间,单位为毫秒
var ENABLE_FUNDEBUG = false; //是否启用fundebug日志监控
//是否启用fundebug日志监控
var FUNDEBUG_API_KEY = '3701a358f79b7daa39592255bde6c3c8772efad642883e42dbb65f3f8ffbae11'; //去https://fundebug.com/申请key
//去https://fundebug.com/申请key
var APK_DOWNLOAD = 'http://omzo595hi.bkt.clouddn.com/ionic2_tabs.apk'; //android apk下载完整地址,用于android本地升级
//android apk下载完整地址,用于android本地升级
var APP_DOWNLOAD = 'http://omzo595hi.bkt.clouddn.com/download.html'; //app网页下载地址,用于ios升级或android本地升级失败
//# sourceMappingURL=Constants.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by yanxiaojun on 2017/4/13.
 */

var GlobalData = (function () {
    function GlobalData() {
        //设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
        this._showLoading = true;
        //app更新进度.默认为0,在app升级过程中会改变
        this._updateProgress = -1;
    }
    Object.defineProperty(GlobalData.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (value) {
            this._userId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalData.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalData.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (value) {
            this._fullName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalData.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (value) {
            this._token = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalData.prototype, "showLoading", {
        get: function () {
            return this._showLoading;
        },
        set: function (value) {
            this._showLoading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalData.prototype, "updateProgress", {
        get: function () {
            return this._updateProgress;
        },
        set: function (value) {
            this._updateProgress = value;
        },
        enumerable: true,
        configurable: true
    });
    return GlobalData;
}());
GlobalData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], GlobalData);

//# sourceMappingURL=GlobalData.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPicDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_FileService__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SelectPicDemoPage = (function () {
    function SelectPicDemoPage(navCtrl, http, fileService, nativeService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.fileService = fileService;
        this.nativeService = nativeService;
        this.fileObjList = [];
        this.filePaths = [];
        //使用Http加载本地json文件,因为HttpService给url默认加了http://ip,加载本地文件不需要http://ip
        this.http.get('./assets/data/fileData.json').map(function (res) { return res.json(); }).subscribe(function (res) {
            if (res.success) {
                for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                    var fileObj = _a[_i];
                    _this.fileObjList.push({
                        'thumbPath': fileObj.base64,
                        'origPath': fileObj.base64,
                        'base64': fileObj.base64
                    });
                }
            }
        });
    }
    SelectPicDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    SelectPicDemoPage.prototype.uploadMultiByBase64 = function () {
        var _this = this;
        this.fileService.uploadMultiByBase64(this.fileObjList).subscribe(function (fileList) {
            _this.nativeService.showToast('成功上传' + fileList.length + '张图片');
        });
    };
    SelectPicDemoPage.prototype.uploadMultiByFilePath = function () {
        var _this = this;
        this.fileService.uploadMultiByFilePath(this.filePaths).subscribe(function (fileList) {
            _this.nativeService.showToast('成功上传' + fileList.length + '张图片');
        });
    };
    return SelectPicDemoPage;
}());
SelectPicDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-select-pic-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/select-pic-demo/select-pic-demo.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>select-pic-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-button block (click)="details(\'http://www.jianshu.com/p/e935e62adec4\')">简书</button>\n  <br>\n\n  <div padding-vertical>\n    demo1:没有添加和删除权限:[allowAdd]="false" [allowDelete]="false"\n    <page-select-picture [(fileObjList)]="fileObjList" [allowAdd]="false" [allowDelete]="false"></page-select-picture>\n  </div>\n  <div padding-vertical>\n    demo2:限制最大照片数量为6张,默认4张\n    <page-select-picture [max]="6" [(fileObjList)]="fileObjList"></page-select-picture>\n  </div>\n  <button ion-button block (click)="uploadMultiByBase64()">上传base64图片</button>\n  <br>\n  <br>\n  选择照片:(默认返回本地图片路径)\n  <page-select-picture [(fileObjList)]="filePaths"></page-select-picture>\n  <button ion-button block (click)="uploadMultiByFilePath()">上传本地路径图片</button>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/select-pic-demo/select-pic-demo.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_4__providers_FileService__["a" /* FileService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */]])
], SelectPicDemoPage);

//# sourceMappingURL=select-pic-demo.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomPipeDemo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the CustomPipeDemo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomPipeDemo = (function () {
    function CustomPipeDemo(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CustomPipeDemo.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomPipeDemo');
    };
    return CustomPipeDemo;
}());
CustomPipeDemo = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-custom-pipe-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/custom-pipe-demo/custom-pipe-demo.html"*/'<!--\n  Generated template for the CustomPipeDemo page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>custom-pipe-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div>简体字转繁体字管道demo:</div>\n  <div>{{\'abcdEFG12多云34闫小军abc\'|conversion}}</div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/custom-pipe-demo/custom-pipe-demo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
], CustomPipeDemo);

//# sourceMappingURL=custom-pipe-demo.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CropPicDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CropPicDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CropPicDemoPage = (function () {
    function CropPicDemoPage(navCtrl, navParams, nativeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
        this.cropSrc = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4256109538,834002284&fm=26&gp=0.jpg';
    }
    CropPicDemoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CropPicDemoPage');
    };
    CropPicDemoPage.prototype.crop = function () {
        var _this = this;
        new AlloyCrop({
            image_src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4256109538,834002284&fm=26&gp=0.jpg',
            circle: true,
            width: 256,
            height: 256,
            output: 1,
            ok: function (base64, canvas) {
                _this.cropSrc = base64;
            },
            cancel: function () {
            },
            ok_text: "确定",
            cancel_text: "取消" // optional parameters , the default value is cancel
        });
    };
    CropPicDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    return CropPicDemoPage;
}());
CropPicDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-crop-pic-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/crop-pic-demo/crop-pic-demo.html"*/'<!--\n  Generated template for the CropPicDemoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>crop-pic-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-button block (click)="crop()">裁剪图片</button>\n  <img src="{{cropSrc}}">\n  <button ion-button block (click)="details(\'https://github.com/AlloyTeam/AlloyCrop\')">API</button>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/crop-pic-demo/crop-pic-demo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */]])
], CropPicDemoPage);

//# sourceMappingURL=crop-pic-demo.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CityPickerDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DemoService__ = __webpack_require__(444);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CityPickerDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CityPickerDemoPage = (function () {
    function CityPickerDemoPage(navCtrl, navParams, nativeService, demoService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
        this.demoService = demoService;
        this.cityData = []; //城市数据
        this.cityName = '广东省-广州市-天河区'; //初始化城市名
    }
    CityPickerDemoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //获取城市数据
        this.demoService.geCityData().subscribe(function (res) {
            _this.cityData = res;
        });
    };
    //城市选择器被改变时触发的事件
    CityPickerDemoPage.prototype.cityChange = function (event) {
        this.code = event['region'].value;
    };
    CityPickerDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    return CityPickerDemoPage;
}());
CityPickerDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-city-picker-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/city-picker-demo/city-picker-demo.html"*/'<!--\n  Generated template for the CityPickerDemoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>city-picker-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label>省市区选择器</ion-label>\n      <city-picker item-content\n                   [cancelText]="\'取消\'"\n                   [doneText]="\'完成\'"\n                   [separator]="\'-\'"\n                   [citiesData]="cityData"\n                   [(ngModel)]="cityName"\n                   (ionChange)="cityChange($event)">\n\n      </city-picker>\n    </ion-item>\n    <ion-item>\n      地区编码： {{code}}\n    </ion-item>\n  </ion-list>\n  <div padding>\n    <button ion-button block (click)="details(\'https://github.com/HsuanXyz/ionic2-city-picker\')">查看详情</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/city-picker-demo/city-picker-demo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_3__DemoService__["a" /* DemoService */]])
], CityPickerDemoPage);

//# sourceMappingURL=city-picker-demo.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DemoService = (function () {
    function DemoService(http) {
        this.http = http;
    }
    DemoService.prototype.geCityData = function () {
        return this.http.get('./assets/data/cityData.json').map(function (res) { return res.json(); });
    };
    return DemoService;
}());
DemoService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], DemoService);

//# sourceMappingURL=DemoService.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarDemoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ion2_calendar__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_Utils__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CalendarDemoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CalendarDemoPage = (function () {
    function CalendarDemoPage(navCtrl, navParams, nativeService, calendarCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeService = nativeService;
        this.calendarCtrl = calendarCtrl;
        this.dateRangeStr = '';
    }
    CalendarDemoPage.prototype.calendar = function () {
        var _this = this;
        var from = new Date();
        from.setMonth(from.getMonth() - 6); //半年前
        this.calendarCtrl.openCalendar({
            isRadio: false,
            canBackwardsSelected: true,
            title: '请选择日期',
            monthTitle: ' yyyy 年 MM 月 ',
            weekdaysTitle: ["天", "一", "二", "三", "四", "五", "六"],
            closeLabel: '取消',
            cssClass: 'color',
            from: from,
            defaultDate: new Date(),
        }).then(function (res) {
            _this.dateRangeStr = __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].dateFormat(new Date(res.from.time)) + '~' + __WEBPACK_IMPORTED_MODULE_4__providers_Utils__["a" /* Utils */].dateFormat(new Date(res.to.time));
            console.log(res);
        }).catch(function () {
        });
    };
    CalendarDemoPage.prototype.details = function (url) {
        this.nativeService.openUrlByBrowser(url);
    };
    return CalendarDemoPage;
}());
CalendarDemoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-calendar-demo',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/demo/calendar-demo/calendar-demo.html"*/'<!--\n  Generated template for the CalendarDemoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>calendar-demo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label>选择日期</ion-label>\n      <ion-input type="text" readonly [(ngModel)]="dateRangeStr" tappable (click)="calendar()"></ion-input>\n    </ion-item>\n  </ion-list>\n  <div padding>\n    <button ion-button block (click)="details(\'https://github.com/HsuanXyz/ion2-calendar\')">查看详情</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/demo/calendar-demo/calendar-demo.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_2_ion2_calendar__["a" /* CalendarController */]])
], CalendarDemoPage);

//# sourceMappingURL=calendar-demo.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(454);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FunDebugErrorHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tab_module__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login_module__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home_module__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_mine_mine_module__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_toast__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_transfer__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_in_app_browser__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_image_picker__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_network__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_app_minimize__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__typings_modules_jpush_index__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_HttpService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_FileService__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_Helper__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_Utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_test_test_module__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_demo_demo_module__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_GlobalData__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_Logger__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__modal_transitions__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_diagnostic__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


































var fundebug = __webpack_require__(828);
fundebug.apikey = __WEBPACK_IMPORTED_MODULE_30__providers_Constants__["h" /* FUNDEBUG_API_KEY */];
fundebug.releasestage = __WEBPACK_IMPORTED_MODULE_30__providers_Constants__["j" /* IS_DEBUG */] ? 'development' : 'production'; //应用开发阶段，development:开发;production:生产
fundebug.silent = !__WEBPACK_IMPORTED_MODULE_30__providers_Constants__["f" /* ENABLE_FUNDEBUG */]; //如果暂时不需要使用Fundebug，将silent属性设为true
var FunDebugErrorHandler = (function () {
    function FunDebugErrorHandler() {
    }
    FunDebugErrorHandler.prototype.handleError = function (err) {
        fundebug.notifyError(err);
        console.error(err);
    };
    return FunDebugErrorHandler;
}());

var AppModule = (function () {
    function AppModule(config) {
        this.config = config;
        this.setCustomTransitions();
    }
    AppModule.prototype.setCustomTransitions = function () {
        this.config.setTransition('modal-from-right-enter', __WEBPACK_IMPORTED_MODULE_32__modal_transitions__["a" /* ModalFromRightEnter */]);
        this.config.setTransition('modal-from-right-leave', __WEBPACK_IMPORTED_MODULE_32__modal_transitions__["b" /* ModalFromRightLeave */]);
        this.config.setTransition('modal-scale-enter', __WEBPACK_IMPORTED_MODULE_32__modal_transitions__["c" /* ModalScaleEnter */]);
        this.config.setTransition('modal-scale-leave', __WEBPACK_IMPORTED_MODULE_32__modal_transitions__["d" /* ModalScaleLeave */]);
    };
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_27__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {
                mode: 'ios',
                backButtonText: ''
            }, {
                links: [
                    { loadChildren: '../pages/demo/transition-demo/modal-scale/modal-scale.module#ModalScalePageModule', name: 'ModalScalePage', segment: 'modal-scale', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/demo/transition-demo/modal-from-right/modal-from-right.module#ModalFromRightPageModule', name: 'ModalFromRightPage', segment: 'modal-from-right', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/demo/transition-demo/transition-demo.module#TransitionDemoPageModule', name: 'TransitionDemoPage', segment: 'transition-demo', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../shared/preview-picture/preview-picture.module#PreviewPicturePageModule', name: 'PreviewPicturePage', segment: 'preview-picture', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../shared/select-picture/select-picture.module#SelectPicturePageModule', name: 'SelectPicturePage', segment: 'select-picture', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../shared/map-component/search-address/search-address.module#SearchAddressModule', name: 'SearchAddress', segment: 'search-address', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../shared/map-component/navigation/navigation.module#NavigationModule', name: 'Navigation', segment: 'navigation', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../shared/map-component/map-location/map-location.module#MapLocationModule', name: 'MapLocation', segment: 'map-location', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../shared/paging/paging.module#PagingPageModule', name: 'PagingPage', segment: 'paging', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tab_module__["a" /* TabModule */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login_module__["a" /* LoginModule */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home_module__["a" /* HomeModule */],
            __WEBPACK_IMPORTED_MODULE_28__pages_demo_demo_module__["a" /* DemoModule */],
            __WEBPACK_IMPORTED_MODULE_8__pages_mine_mine_module__["a" /* MineModule */],
            __WEBPACK_IMPORTED_MODULE_26__pages_test_test_module__["a" /* TestModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicApp */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_app_minimize__["a" /* AppMinimize */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_20__typings_modules_jpush_index__["a" /* JPush */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: FunDebugErrorHandler },
            __WEBPACK_IMPORTED_MODULE_21__providers_NativeService__["a" /* NativeService */],
            __WEBPACK_IMPORTED_MODULE_22__providers_HttpService__["a" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_23__providers_FileService__["a" /* FileService */],
            __WEBPACK_IMPORTED_MODULE_24__providers_Helper__["a" /* Helper */],
            __WEBPACK_IMPORTED_MODULE_25__providers_Utils__["a" /* Utils */],
            __WEBPACK_IMPORTED_MODULE_29__providers_GlobalData__["a" /* GlobalData */],
            __WEBPACK_IMPORTED_MODULE_31__providers_Logger__["a" /* Logger */]
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Config */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Config */]) === "function" && _a || Object])
], AppModule);

var _a;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectPicturePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__preview_picture_preview_picture__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SelectPicturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SelectPicturePage = (function () {
    function SelectPicturePage(modalCtrl, alertCtrl, actionSheetCtrl, nativeService) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.nativeService = nativeService;
        this.max = 4; //最多可选择多少张图片，默认为4张
        this.allowAdd = true; //是否允许新增
        this.allowDelete = true; //是否允许删除
        this.fileObjList = []; //图片列表,与fileObjListChange形成双向数据绑定
        this.fileObjListChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    SelectPicturePage.prototype.addPicture = function () {
        var that = this;
        that.actionSheetCtrl.create({
            buttons: [
                {
                    text: '从相册选择',
                    handler: function () {
                        that.nativeService.getMultiplePicture({
                            maximumImagesCount: (that.max - that.fileObjList.length),
                            destinationType: 1 //期望返回的图片格式,1图片路径
                        }).subscribe(function (imgs) {
                            for (var _i = 0, _a = imgs; _i < _a.length; _i++) {
                                var img = _a[_i];
                                that.getPictureSuccess(img);
                            }
                        });
                    }
                },
                {
                    text: '拍照',
                    handler: function () {
                        that.nativeService.getPictureByCamera({
                            destinationType: 1 //期望返回的图片格式,1图片路径
                        }).subscribe(function (img) {
                            that.getPictureSuccess(img);
                        });
                    }
                },
                {
                    text: '取消',
                    role: 'cancel'
                }
            ]
        }).present();
    };
    SelectPicturePage.prototype.deletePicture = function (i) {
        var _this = this;
        if (!this.allowDelete) {
            return;
        }
        this.alertCtrl.create({
            title: '确认删除？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        _this.fileObjList.splice(i, 1);
                    }
                }
            ]
        }).present();
    };
    SelectPicturePage.prototype.viewerPicture = function (index) {
        var picturePaths = [];
        for (var _i = 0, _a = this.fileObjList; _i < _a.length; _i++) {
            var fileObj = _a[_i];
            picturePaths.push(fileObj.origPath);
        }
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__preview_picture_preview_picture__["a" /* PreviewPicturePage */], { 'initialSlide': index, 'picturePaths': picturePaths }).present();
    };
    SelectPicturePage.prototype.getPictureSuccess = function (img) {
        var fileObj = { 'origPath': img, 'thumbPath': img };
        this.fileObjList.push(fileObj);
        this.fileObjListChange.emit(this.fileObjList);
    };
    return SelectPicturePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], SelectPicturePage.prototype, "max", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], SelectPicturePage.prototype, "allowAdd", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], SelectPicturePage.prototype, "allowDelete", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Array)
], SelectPicturePage.prototype, "fileObjList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", Object)
], SelectPicturePage.prototype, "fileObjListChange", void 0);
SelectPicturePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-select-picture',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/shared/select-picture/select-picture.html"*/'<div class="clear-fix" style="padding-top: 2px;" *ngIf="fileObjList">\n  <div *ngFor="let fileObj of fileObjList, let i = index" class="pictures">\n    <span *ngIf="allowDelete" class="remove" tappable (click)="deletePicture(i)">×</span>\n    <img src="{{fileObj.thumbPath}}" tappable (click)="viewerPicture(i)">\n  </div>\n  <div *ngIf="fileObjList.length<max&&allowAdd" tappable (click)="addPicture()" class="pictures add">\n    <ion-icon name="camera"></ion-icon>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/shared/select-picture/select-picture.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_NativeService__["a" /* NativeService */]])
], SelectPicturePage);

//# sourceMappingURL=select-picture.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 12-27.
 */

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
var Utils = Utils_1 = (function () {
    function Utils() {
    }
    Utils.isEmpty = function (value) {
        return value == null || typeof value === 'string' && value.length === 0;
    };
    Utils.isNotEmpty = function (value) {
        return !Utils_1.isEmpty(value);
    };
    /**
     * 格式“是”or“否”
     * @param value
     * @returns {string|string}
     */
    Utils.formatYesOrNo = function (value) {
        return value == 1 ? '是' : (value == '0' ? '否' : null);
    };
    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @returns {string}
     */
    Utils.dateFormat = function (date, sFormat) {
        if (sFormat === void 0) { sFormat = 'yyyy-MM-dd'; }
        var time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();
        return sFormat.replace(/yyyy/ig, String(time.Year))
            .replace(/yyy/ig, String(time.Year))
            .replace(/yy/ig, time.TYear)
            .replace(/y/ig, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/ig, time.TDay)
            .replace(/d/ig, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/ig, time.TSecond)
            .replace(/s/ig, String(time.Second))
            .replace(/fff/ig, String(time.Millisecond));
    };
    /**
     * 返回字符串长度，汉子计数为2
     * @param str
     * @returns {number}
     */
    Utils.strLength = function (str) {
        var len = 0;
        for (var i = 0, length_1 = str.length; i < length_1; i++) {
            str.charCodeAt(i) > 255 ? len += 2 : len++;
        }
        return len;
    };
    /**
     * 把url中的双斜杠替换为单斜杠
     * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
     * @param url
     * @returns {string}
     */
    Utils.formatUrl = function (url) {
        if (url === void 0) { url = ''; }
        var index = 0;
        if (url.startsWith('http')) {
            index = 7;
        }
        return url.substring(0, index) + url.substring(index).replace(/\/\/*/g, '/');
    };
    Utils.sessionStorageGetItem = function (key) {
        var jsonString = sessionStorage.getItem(key);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    };
    Utils.sessionStorageSetItem = function (key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    };
    Utils.sessionStorageRemoveItem = function (key) {
        sessionStorage.removeItem(key);
    };
    Utils.sessionStorageClear = function () {
        sessionStorage.clear();
    };
    return Utils;
}());
/**
 * 每次调用sequence加1
 * @type {()=>number}
 */
Utils.getSequence = (function () {
    var sequence = 1;
    return function () {
        return ++sequence;
    };
})();
Utils = Utils_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], Utils);

var Utils_1;
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LoginService__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__find_password_find_password__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_GlobalData__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_Utils__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(viewCtrl, formBuilder, storage, globalData, modalCtrl, platform, alertCtrl, events, loginService) {
        this.viewCtrl = viewCtrl;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.globalData = globalData;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.loginService = loginService;
        this.submitted = false;
        this.canLeave = false;
        this.loginForm = this.formBuilder.group({
            username: ['yanxiaojun617', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(4)]],
            password: ['123456', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(4)]]
        });
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.canLeave = false;
        this.storage.get('LoginInfo').then(function (loginInfo) {
            _this.userInfo = loginInfo && loginInfo.user ? loginInfo.user : null;
        });
    };
    LoginPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        var bool = !!this.userInfo;
        if (this.canLeave || bool) {
            return true;
        }
        else {
            this.alertCtrl.create({
                title: '确认退出软件？',
                buttons: [{ text: '取消' },
                    {
                        text: '确定',
                        handler: function () {
                            _this.platform.exitApp();
                        }
                    }
                ]
            }).present();
            return false;
        }
    };
    LoginPage.prototype.login = function (user) {
        var _this = this;
        this.submitted = true;
        this.loginService.login(user)
            .subscribe(function (loginInfo) {
            _this.storage.clear(); //清除缓存
            __WEBPACK_IMPORTED_MODULE_8__providers_Utils__["a" /* Utils */].sessionStorageClear(); //清除缓存
            _this.globalData.token = loginInfo.access_token;
            _this.submitted = false;
            _this.userInfo = loginInfo.user;
            _this.events.publish('user:login', loginInfo);
            _this.viewCtrl.dismiss(loginInfo.user);
        }, function () {
            _this.submitted = false;
        });
    };
    LoginPage.prototype.toRegister = function () {
        this.canLeave = true;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__register_register__["a" /* RegisterPage */]);
        modal.present();
    };
    LoginPage.prototype.findPassword = function () {
        this.canLeave = true;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__find_password_find_password__["a" /* FindPasswordPage */]);
        modal.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/pages/login/login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>登录</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="loginForm" (ngSubmit)="login(loginForm.value)">\n    <ion-list>\n      <ion-item>\n        <ion-label color="primary">用户名</ion-label>\n        <ion-input type="text" formControlName="username" clearInput></ion-input>\n      </ion-item>\n      <div *ngIf="!loginForm.controls.username.valid && loginForm.controls.username.touched" class="validation-failed"> 请输入正确用户名</div>\n\n      <ion-item>\n        <ion-label color="primary">密　码</ion-label>\n        <ion-input type="password" formControlName="password" clearInput></ion-input>\n      </ion-item>\n      <div *ngIf="!loginForm.controls.password.valid" class="validation-failed">请输入密码</div>\n\n    </ion-list>\n    <div padding-horizontal>\n      <button ion-button block type="submit" [disabled]="!loginForm.valid||submitted">登　录</button>\n    </div>\n  </form>\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center tappable (click)="findPassword()">\n        <button ion-button small clear color="primary">找回密码</button>\n      </ion-col>\n      <ion-col text-center tappable (click)="toRegister()">\n        <button ion-button small clear color="primary">注　册</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/pages/login/login.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__LoginService__["a" /* LoginService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["y" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_7__providers_GlobalData__["a" /* GlobalData */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Events */],
        __WEBPACK_IMPORTED_MODULE_4__LoginService__["a" /* LoginService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HttpService__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 12-23.
 */





/**
 * 上传图片到文件服务器
 */
var FileService = FileService_1 = (function () {
    function FileService(httpService, nativeService) {
        this.httpService = httpService;
        this.nativeService = nativeService;
    }
    /**
     * 根据文件id获取文件信息
     * @param id
     * @returns {FileObj}
     */
    FileService.prototype.getFileInfoById = function (id) {
        var _this = this;
        if (!id) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of({});
        }
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + '/getById', { id: id }).map(function (res) {
            var result = res.json();
            if (!result.success) {
                _this.nativeService.alert(result.msg);
                return {};
            }
            else {
                var fileObj = result.data;
                fileObj.origPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj.origPath;
                fileObj.thumbPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj.thumbPath;
                return fileObj;
            }
        });
    };
    /**
     * 根据文件id数组获取文件信息
     * @param ids
     * @returns {FileObj[]}
     */
    FileService.prototype.getFileInfoByIds = function (ids) {
        var _this = this;
        if (!ids || ids.length == 0) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of([]);
        }
        return this.httpService.get(__WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + '/getByIds', { ids: ids }).map(function (res) {
            var result = res.json();
            if (!result.success) {
                _this.nativeService.alert(result.msg);
                return [];
            }
            else {
                for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                    var fileObj = _a[_i];
                    fileObj.origPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj.origPath;
                    fileObj.thumbPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj.thumbPath;
                }
                return result.data;
            }
        });
    };
    /**
     * 批量上传图片,只支持上传base64字符串
     * @param fileObjList 数组中的对象必须包含bse64属性
     * @returns {FileObj[]}
     */
    FileService.prototype.uploadMultiByBase64 = function (fileObjList) {
        var _this = this;
        if (!fileObjList || fileObjList.length == 0) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of([]);
        }
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + '/appUpload?directory=liveWork', fileObjList).map(function (res) {
            var result = res.json();
            if (!result.success) {
                _this.nativeService.alert(result.msg);
                return [];
            }
            else {
                for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                    var fileObj = _a[_i];
                    fileObj.origPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj.origPath;
                    fileObj.thumbPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj.thumbPath;
                }
                return result.data;
            }
        });
    };
    /**
     * 上传单张图片,只支持上传base64字符串
     * @param fileObj 对象必须包含origPath属性
     * @returns {FileObj}
     */
    FileService.prototype.uploadByBase64 = function (fileObj) {
        var _this = this;
        if (!fileObj.base64) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of({});
        }
        return this.httpService.post(__WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + '/appUpload?directory=liveWork', [fileObj]).map(function (res) {
            var result = res.json();
            if (!result.success) {
                _this.nativeService.alert(result.msg);
                return [];
            }
            else {
                var fileObj_1 = result.data[0];
                fileObj_1.origPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj_1.origPath;
                fileObj_1.thumbPath = __WEBPACK_IMPORTED_MODULE_2__Constants__["g" /* FILE_SERVE_URL */] + fileObj_1.thumbPath;
                return fileObj_1;
            }
        });
    };
    /**
     * 批量上传图片
     * @param fileObjList 数组中的对象必须包含origPath属性
     * @returns {FileObj[]}
     */
    FileService.prototype.uploadMultiByFilePath = function (fileObjList) {
        var _this = this;
        if (fileObjList.length == 0) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of([]);
        }
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].create(function (observer) {
            _this.nativeService.showLoading();
            var fileObjs = [];
            var _loop_1 = function (fileObj) {
                _this.nativeService.convertImgToBase64(fileObj.origPath).subscribe(function (base64) {
                    fileObjs.push({
                        'base64': base64,
                        'type': FileService_1.getFileType(fileObj.origPath),
                        'parameter': fileObj.parameter
                    });
                    if (fileObjs.length === fileObjList.length) {
                        _this.uploadMultiByBase64(fileObjs).subscribe(function (res) {
                            observer.next(res);
                            _this.nativeService.hideLoading();
                        });
                    }
                });
            };
            for (var _i = 0, fileObjList_1 = fileObjList; _i < fileObjList_1.length; _i++) {
                var fileObj = fileObjList_1[_i];
                _loop_1(fileObj);
            }
        });
    };
    /**
     * app上传单张图片
     * @param fileObj 对象必须包含origPath属性
     * @returns {FileObj}
     */
    FileService.prototype.uploadByFilePath = function (fileObj) {
        var _this = this;
        if (!fileObj.origPath) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of({});
        }
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].create(function (observer) {
            _this.nativeService.showLoading();
            _this.nativeService.convertImgToBase64(fileObj.origPath).subscribe(function (base64) {
                var file = ({
                    'base64': base64,
                    'type': FileService_1.getFileType(fileObj.origPath),
                    'parameter': fileObj.parameter
                });
                _this.uploadByBase64(file).subscribe(function (res) {
                    observer.next(res);
                    _this.nativeService.hideLoading();
                });
            });
        });
    };
    FileService.getFileType = function (path) {
        return path.substring(path.lastIndexOf('.') + 1);
    };
    return FileService;
}());
FileService = FileService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__HttpService__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_4__NativeService__["a" /* NativeService */]])
], FileService);

var FileService_1;
//# sourceMappingURL=FileService.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__typings_modules_jpush_index__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FileService__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Logger__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 12-27.
 */










/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
var Helper = (function () {
    function Helper(jPush, http, logger, alertCtrl, fileService, nativeService) {
        this.jPush = jPush;
        this.http = http;
        this.logger = logger;
        this.alertCtrl = alertCtrl;
        this.fileService = fileService;
        this.nativeService = nativeService;
    }
    /**
     * 断言app是否需要更新
     * @returns {any}
     */
    Helper.prototype.assertUpgrade = function () {
        var _this = this;
        if (!this.nativeService.isMobile()) {
            return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].of({ update: false, msg: '请使用真机调试' });
        }
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].create(function (observer) {
            _this.nativeService.getPackageName().subscribe(function (packageName) {
                var appName = packageName.substring(packageName.lastIndexOf('.') + 1);
                var appType = _this.nativeService.isAndroid() ? 'android' : 'ios';
                var url = __WEBPACK_IMPORTED_MODULE_7__Utils__["a" /* Utils */].formatUrl(__WEBPACK_IMPORTED_MODULE_4__Constants__["d" /* APP_VERSION_SERVE_URL */] + "/app/" + appName + "/" + appType + "/latest/version");
                _this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (res) {
                    if (!res) {
                        observer.next({ update: false, msg: '暂无更新信息' });
                        return;
                    }
                    _this.nativeService.getVersionNumber().subscribe(function (currentNo) {
                        if (currentNo == res.version) {
                            observer.next({ update: false, msg: '已经是最新版本' });
                        }
                        else {
                            if (res.isForcedUpdate == 1) {
                                _this.alertCtrl.create({
                                    title: '重要升级',
                                    subTitle: '您必须升级后才能使用！',
                                    enableBackdropDismiss: false,
                                    buttons: [{
                                            text: '确定', handler: function () {
                                                observer.next({ update: true, msg: '' });
                                            }
                                        }
                                    ]
                                }).present();
                            }
                            else {
                                _this.alertCtrl.create({
                                    title: '升级',
                                    subTitle: '发现新版本,是否立即升级？',
                                    enableBackdropDismiss: false,
                                    buttons: [
                                        {
                                            text: '取消', handler: function () {
                                                observer.next({ update: false, msg: '' });
                                            }
                                        },
                                        {
                                            text: '确定', handler: function () {
                                                observer.next({ update: true, msg: '' });
                                            }
                                        }
                                    ]
                                }).present();
                            }
                        }
                    });
                }, function (err) {
                    _this.logger.log(err, '从版本升级服务获取版本信息失败', {
                        url: url
                    });
                });
            });
        });
    };
    /**
     * 获取用户头像路径
     * @param avatarId
     * @returns {any}
     */
    Helper.prototype.loadAvatarPath = function (avatarId) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].create(function (observer) {
            if (!avatarId) {
                observer.next(__WEBPACK_IMPORTED_MODULE_4__Constants__["e" /* DEFAULT_AVATAR */]);
            }
            else {
                _this.fileService.getFileInfoById(avatarId).subscribe(function (res) {
                    if (res.origPath) {
                        var avatarPath = res.origPath;
                        observer.next(avatarPath);
                    }
                    else {
                        observer.next(__WEBPACK_IMPORTED_MODULE_4__Constants__["e" /* DEFAULT_AVATAR */]);
                    }
                }, function () {
                    observer.next(__WEBPACK_IMPORTED_MODULE_4__Constants__["e" /* DEFAULT_AVATAR */]);
                });
            }
        });
    };
    Helper.prototype.initJpush = function () {
        if (!this.nativeService.isMobile()) {
            return;
        }
        this.jPush.init();
        if (this.nativeService.isIos()) {
            this.jPush.setDebugModeFromIos();
        }
        else {
            this.jPush.setDebugMode(true);
        }
        this.jPushAddEventListener();
    };
    Helper.prototype.jPushAddEventListener = function () {
        var _this = this;
        this.jPush.getUserNotificationSettings().then(function (result) {
            if (result == 0) {
                console.log('系统设置中已关闭应用推送');
            }
            else if (result > 0) {
                console.log('系统设置中打开了应用推送');
            }
        });
        //点击通知进入应用程序时会触发的事件
        document.addEventListener("jpush.openNotification", function (event) {
            //  window['plugins'].jPushPlugin.resetBadge();
            var content = _this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            console.log("jpush.openNotification" + content);
        }, false);
        //收到通知时会触发该事件
        document.addEventListener("jpush.receiveNotification", function (event) {
            var content = _this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            console.log("jpush.receiveNotification" + content);
        }, false);
        //收到自定义消息时触发这个事件
        document.addEventListener("jpush.receiveMessage", function (event) {
            var message = _this.nativeService.isIos() ? event['content'] : event['message'];
            console.log("jpush.receiveMessage" + message);
        }, false);
        //设置标签/别名回调函数
        document.addEventListener("jpush.setTagsWithAlias", function (event) {
            console.log("onTagsWithAlias");
            var result = "result code:" + event['resultCode'] + " ";
            result += "tags:" + event['tags'] + " ";
            result += "alias:" + event['alias'] + " ";
            console.log(result);
        }, false);
    };
    //设置标签
    Helper.prototype.setTags = function () {
        if (!this.nativeService.isMobile()) {
            return;
        }
        var tags = [];
        if (this.nativeService.isAndroid()) {
            tags.push('android');
        }
        if (this.nativeService.isIos()) {
            tags.push('ios');
        }
        console.log('设置setTags:' + tags);
        this.jPush.setTags(tags);
    };
    //设置别名,一个用户只有一个别名
    Helper.prototype.setAlias = function (userId) {
        if (!this.nativeService.isMobile()) {
            return;
        }
        console.log('设置setAlias:' + userId);
        this.jPush.setAlias('' + userId); ////ios设置setAlias有bug,值必须为string类型,不能是number
    };
    Helper.prototype.setTagsWithAlias = function (userId) {
        if (!this.nativeService.isMobile()) {
            return;
        }
        console.log('设置setTagsWithAlias:' + userId);
        this.jPush.setTagsWithAlias(['man', 'test'], '' + userId);
    };
    return Helper;
}());
Helper = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__typings_modules_jpush_index__["a" /* JPush */],
        __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_8__Logger__["a" /* Logger */],
        __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__FileService__["a" /* FileService */],
        __WEBPACK_IMPORTED_MODULE_1__NativeService__["a" /* NativeService */]])
], Helper);

//# sourceMappingURL=Helper.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapLocation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_address_search_address__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__navigation_navigation__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_NativeService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MapLocation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MapLocation = (function () {
    function MapLocation(navCtrl, modalCtrl, nativeService, navParams) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.nativeService = nativeService;
        this.navParams = navParams;
        this.mapIsComplete = false; //地图是否加载完成
        this.isPositioning = false; //是否正在定位
        this.showIonFab = false; //是否显示导航按钮
        this.params = {
            draggable: true,
            click: false,
            searchBar: true,
            navigation: true,
            address: '',
            position: {
                lng: '',
                lat: ''
            },
            lnglatXY: {}
        };
    }
    MapLocation.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.loadMap();
        setTimeout(function () {
            if (!_this.map) {
                _this.loadMap();
            }
        }, 3000);
    };
    //加载地图
    MapLocation.prototype.loadMap = function () {
        var that = this;
        try {
            that.map = new AMap.Map('map-share', {
                view: new AMap.View2D({
                    zoom: 14,
                    rotateEnable: true,
                    showBuildingBlock: true,
                    baseRender: 'd'
                })
            });
            that.map.on('complete', function () {
                that.mapIsComplete = true;
                AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
                    that.map.addControl(new AMap.ToolBar());
                });
                if (that.params.position && that.params.position.lat && that.params.position.lng) {
                    that.drawMarker(that.params.position);
                }
                else if (!(that.params.position.lat && that.params.position.lng) && that.params.address) {
                    //判断主页面传过来的是地址就跳转到地址搜索地址页面,返回确定的地址
                    that.locationSearch();
                }
                else {
                    //主页面不传address和position就直接定位到当前位置
                    that.mapLocation();
                }
                //判断是否可以点击地图改变标注位置
                if (that.params.click) {
                    that.map.on('click', function (e) {
                        var position = {
                            lng: e.lnglat.getLng(),
                            lat: e.lnglat.getLat()
                        };
                        that.drawMarker(position);
                    });
                }
            });
            window['HomeAMap'] = this.map;
        }
        catch (err) {
            that.mapIsComplete = false;
            that.nativeService.showToast('地图加载失败,请检查网络或稍后再试.');
        }
    };
    //跳转到地址查询搜索页面,并返回一个地址对象(经纬坐标+中文地址)
    MapLocation.prototype.locationSearch = function () {
        var _this = this;
        var that = this;
        var locationSearchModal = that.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__search_address_search_address__["a" /* SearchAddress */], { address: that.params.address });
        locationSearchModal.present();
        locationSearchModal.onDidDismiss(function (item) {
            if (item) {
                _this.drawMarker(item.location, item.name);
            }
        });
    };
    //定位当前地址
    MapLocation.prototype.mapLocation = function () {
        var that = this;
        that.isPositioning = true;
        that.nativeService.getUserLocation().subscribe(function (position) {
            that.drawMarker(position);
            that.isPositioning = false;
        }, function () {
            that.isPositioning = false;
        });
    };
    //描点标注
    MapLocation.prototype.drawMarker = function (position, addressName) {
        if (addressName === void 0) { addressName = ''; }
        var that = this;
        that.params.lnglatXY = new AMap.LngLat(position.lng, position.lat);
        that.map.clearMap();
        //配置需要显示搜索框就根据传进来的position参数给搜索框赋值
        if (that.params.searchBar) {
            if (addressName) {
                that.params.address = addressName;
            }
            else {
                that.geocoder(that.params.lnglatXY);
            }
        }
        that.marker = new AMap.Marker({
            map: that.map,
            draggable: that.params.draggable,
            position: that.params.lnglatXY,
        });
        //配置需要搜索框才执行
        if (that.params.navigation) {
            if (that.marker) {
                that.showIonFab = true;
            }
        }
        //拖拽标注
        that.marker.on('dragend', function (e) {
            var position = {
                lng: e.lnglat.getLng(),
                lat: e.lnglat.getLat()
            };
            that.drawMarker(position);
        });
        that.map.setFitView();
    };
    //根据经纬坐标获取对应的地址
    MapLocation.prototype.geocoder = function (position) {
        var that = this;
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(position, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                //获得了有效的地址信息:
                var addressComponent = result.regeocode.addressComponent;
                that.params.address = addressComponent.district + addressComponent.township +
                    addressComponent.street + addressComponent.streetNumber;
            }
            else {
                that.params.address = '';
            }
        });
    };
    //导航函数
    MapLocation.prototype.mapNavigation = function (navigationType) {
        var markerPosition = this.marker.getPosition();
        if (!markerPosition) {
            this.nativeService.showToast('请先搜索要去的地点');
            return;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__navigation_navigation__["a" /* Navigation */], {
            'navigationType': navigationType,
            'markerLocation': { 'lng': markerPosition.lng, 'lat': markerPosition.lat }
        });
        modal.present();
    };
    return MapLocation;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], MapLocation.prototype, "params", void 0);
MapLocation = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-map-location',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/shared/map-component/map-location/map-location.html"*/'<!--\n  Generated template for the MapLocation page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<div *ngIf="showIonFab">\n  <ion-fab center bottom>\n    <button ion-fab>去这里</button>\n    <ion-fab-list side="left">\n      <button ion-fab color="danger" (click)="mapNavigation(1)">驾车</button>\n    </ion-fab-list>\n    <ion-fab-list side="right">\n      <button ion-fab color="dark" (click)="mapNavigation(2)"> 公交</button>\n    </ion-fab-list>\n    <ion-fab-list side="top">\n      <button ion-fab color="secondary" (click)="mapNavigation(3)">步行</button>\n    </ion-fab-list>\n  </ion-fab>\n</div>\n\n<div *ngIf="mapIsComplete&&!isPositioning">\n  <ion-icon name="radio-button-on" class="position-btn" tappable (click)="mapLocation()"></ion-icon>\n</div>\n<ion-searchbar *ngIf="params.address||params.searchBar"\n  class="search"\n  placeholder="搜索地址"\n  [(ngModel)]="params.address"\n  debounce="600"\n  (ionFocus)="locationSearch()"\n>\n</ion-searchbar>\n  <div id="map-share" class="map-share"></div>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/shared/map-component/map-location/map-location.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_NativeService__["a" /* NativeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavParams */]])
], MapLocation);

//# sourceMappingURL=map-location.js.map

/***/ }),

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_Constants__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name 自定义分页组件
 * @description
 * @example <page-paging [total]="18" (pageNumChange)="doSearch($event)"></page-paging>
 * @example <page-paging [total]="total" (pageNumChange)="doSearch($event)" pageSize="10" color="dark"></page-paging>
 */
var PagingPage = (function () {
    function PagingPage() {
        this.pageSize = __WEBPACK_IMPORTED_MODULE_2__providers_Constants__["k" /* PAGE_SIZE */]; //每页大小,默认5条
        this.color = 'primary'; //主题颜色
        this.pageNum = 1; //当前第几页,默认1
        this.pageNumChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    PagingPage.prototype.btnClick = function (pageNum) {
        this.pageNum = pageNum;
        this.pageNumChange.emit(pageNum);
    };
    PagingPage.prototype.ceil = function (num) {
        return Math.ceil(num);
    };
    return PagingPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], PagingPage.prototype, "total", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], PagingPage.prototype, "pageSize", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], PagingPage.prototype, "color", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Number)
], PagingPage.prototype, "pageNum", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", Object)
], PagingPage.prototype, "pageNumChange", void 0);
PagingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-paging',template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/shared/paging/paging.html"*/'<ion-grid text-center *ngIf="total>pageSize">\n  <ion-row>\n    <ion-col no-padding>\n      <button ion-button  small [color]="color" [disabled]="pageNum==1" (click)="btnClick(1)">首页</button>\n      <button ion-button  small [color]="color" [disabled]="pageNum==1" (click)="btnClick(pageNum-1)">上一页\n      </button>\n      <button ion-button  small [color]="color" [disabled]="pageNum==ceil(total/pageSize)"\n              (click)="btnClick(pageNum+1)">下一页\n      </button>\n      <button ion-button  small [color]="color" [disabled]="pageNum==ceil(total/pageSize)"\n              (click)="btnClick(ceil(total/pageSize))">尾页\n      </button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col no-padding style="font-size: 12px">\n      每页显示{{pageSize}}条数据，共{{total}}条，当前为第{{pageNum}}页，共{{ceil(total/pageSize)}}页\n    </ion-col>\n  </ion-row>\n</ion-grid>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/shared/paging/paging.html"*/,
    }),
    __metadata("design:paramtypes", [])
], PagingPage);

//# sourceMappingURL=paging.js.map

/***/ }),

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_Helper__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_GlobalData__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(platform, keyboard, ionicApp, storage, globalData, helper, toastCtrl, modalCtrl, events, nativeService) {
        var _this = this;
        this.platform = platform;
        this.keyboard = keyboard;
        this.ionicApp = ionicApp;
        this.storage = storage;
        this.globalData = globalData;
        this.helper = helper;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.nativeService = nativeService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        this.backButtonPressed = false;
        platform.ready().then(function () {
            if (__WEBPACK_IMPORTED_MODULE_7__providers_Constants__["f" /* ENABLE_FUNDEBUG */] && _this.nativeService.isMobile()) {
                _this.nativeService.getVersionNumber().subscribe(function (version) {
                    fundebug.appversion = version;
                });
            }
            _this.helper.initJpush(); //初始化极光推送
            _this.storage.get('LoginInfo')
                .then(function (loginInfo) {
                if (loginInfo) {
                    _this.globalData.token = loginInfo.access_token;
                    _this.events.publish('user:login', loginInfo);
                }
                else {
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]);
                    modal.present();
                    modal.onDidDismiss(function (data) {
                        data && console.log(data);
                    });
                }
            });
            _this.nativeService.statusBarStyleDefault();
            _this.nativeService.splashScreenHide();
            _this.registerBackButtonAction(); //注册返回按键事件
            _this.assertNetwork(); //检测网络
            _this.helper.assertUpgrade().subscribe(function (res) {
                res.update && _this.nativeService.downloadApp();
            });
        });
    }
    MyApp.prototype.assertNetwork = function () {
        if (!this.nativeService.isConnecting()) {
            this.toastCtrl.create({
                message: '未检测到网络,请连接网络',
                showCloseButton: true,
                closeButtonText: '确定'
            }).present();
        }
    };
    MyApp.prototype.registerBackButtonAction = function () {
        var _this = this;
        if (!this.nativeService.isAndroid()) {
            return;
        }
        this.platform.registerBackButtonAction(function () {
            if (_this.keyboard.isOpen()) {
                _this.keyboard.close();
                return;
            }
            //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
            // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
            var activePortal = _this.ionicApp._modalPortal.getActive();
            if (activePortal) {
                activePortal.dismiss();
                return;
            }
            var activeVC = _this.nav.getActive();
            var tabs = activeVC.instance.tabs;
            var activeNav = tabs.getSelected();
            return activeNav.canGoBack() ? activeNav.pop() : _this.nativeService.minimize(); //this.showExit()
        }, 1);
    };
    //双击退出提示框
    MyApp.prototype.showExit = function () {
        var _this = this;
        if (this.backButtonPressed) {
            this.platform.exitApp();
        }
        else {
            this.nativeService.showToast('再按一次退出应用');
            this.backButtonPressed = true;
            setTimeout(function () {
                _this.backButtonPressed = false;
            }, 2000);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('myNav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/liu/js/ionic2_tabs/src/app/app.html"*/'<ion-nav #myNav [root]="rootPage" swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/liu/js/ionic2_tabs/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["u" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicApp */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_8__providers_GlobalData__["a" /* GlobalData */],
        __WEBPACK_IMPORTED_MODULE_6__providers_Helper__["a" /* Helper */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["x" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Events */],
        __WEBPACK_IMPORTED_MODULE_3__providers_NativeService__["a" /* NativeService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (user) {
        /* let param = {
         'client_id': 'app',
         'username': user.username,
         'password': user.password
         };
         return this.httpService.post('/authenticate', param).map((res: Response) => res.json());*/
        var loginInfo = {
            access_token: 'test_test_test_test_test_test_test',
            user: {
                id: 1,
                username: user.username,
                fullName: '小军',
                email: 'yanxiaojun617@163.com',
                phone: '18688498342',
                avatarId: '',
                description: '这个人很懒，什么都没有留下'
            }
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].create(function (observer) {
            observer.next(loginInfo);
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], LoginService);

//# sourceMappingURL=LoginService.js.map

/***/ }),

/***/ 798:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 322,
	"./af.js": 322,
	"./ar": 323,
	"./ar-dz": 324,
	"./ar-dz.js": 324,
	"./ar-kw": 325,
	"./ar-kw.js": 325,
	"./ar-ly": 326,
	"./ar-ly.js": 326,
	"./ar-ma": 327,
	"./ar-ma.js": 327,
	"./ar-sa": 328,
	"./ar-sa.js": 328,
	"./ar-tn": 329,
	"./ar-tn.js": 329,
	"./ar.js": 323,
	"./az": 330,
	"./az.js": 330,
	"./be": 331,
	"./be.js": 331,
	"./bg": 332,
	"./bg.js": 332,
	"./bm": 333,
	"./bm.js": 333,
	"./bn": 334,
	"./bn.js": 334,
	"./bo": 335,
	"./bo.js": 335,
	"./br": 336,
	"./br.js": 336,
	"./bs": 337,
	"./bs.js": 337,
	"./ca": 338,
	"./ca.js": 338,
	"./cs": 339,
	"./cs.js": 339,
	"./cv": 340,
	"./cv.js": 340,
	"./cy": 341,
	"./cy.js": 341,
	"./da": 342,
	"./da.js": 342,
	"./de": 343,
	"./de-at": 344,
	"./de-at.js": 344,
	"./de-ch": 345,
	"./de-ch.js": 345,
	"./de.js": 343,
	"./dv": 346,
	"./dv.js": 346,
	"./el": 347,
	"./el.js": 347,
	"./en-au": 348,
	"./en-au.js": 348,
	"./en-ca": 349,
	"./en-ca.js": 349,
	"./en-gb": 350,
	"./en-gb.js": 350,
	"./en-ie": 351,
	"./en-ie.js": 351,
	"./en-nz": 352,
	"./en-nz.js": 352,
	"./eo": 353,
	"./eo.js": 353,
	"./es": 354,
	"./es-do": 355,
	"./es-do.js": 355,
	"./es-us": 356,
	"./es-us.js": 356,
	"./es.js": 354,
	"./et": 357,
	"./et.js": 357,
	"./eu": 358,
	"./eu.js": 358,
	"./fa": 359,
	"./fa.js": 359,
	"./fi": 360,
	"./fi.js": 360,
	"./fo": 361,
	"./fo.js": 361,
	"./fr": 362,
	"./fr-ca": 363,
	"./fr-ca.js": 363,
	"./fr-ch": 364,
	"./fr-ch.js": 364,
	"./fr.js": 362,
	"./fy": 365,
	"./fy.js": 365,
	"./gd": 366,
	"./gd.js": 366,
	"./gl": 367,
	"./gl.js": 367,
	"./gom-latn": 368,
	"./gom-latn.js": 368,
	"./gu": 369,
	"./gu.js": 369,
	"./he": 370,
	"./he.js": 370,
	"./hi": 371,
	"./hi.js": 371,
	"./hr": 372,
	"./hr.js": 372,
	"./hu": 373,
	"./hu.js": 373,
	"./hy-am": 374,
	"./hy-am.js": 374,
	"./id": 375,
	"./id.js": 375,
	"./is": 376,
	"./is.js": 376,
	"./it": 377,
	"./it.js": 377,
	"./ja": 378,
	"./ja.js": 378,
	"./jv": 379,
	"./jv.js": 379,
	"./ka": 380,
	"./ka.js": 380,
	"./kk": 381,
	"./kk.js": 381,
	"./km": 382,
	"./km.js": 382,
	"./kn": 383,
	"./kn.js": 383,
	"./ko": 384,
	"./ko.js": 384,
	"./ky": 385,
	"./ky.js": 385,
	"./lb": 386,
	"./lb.js": 386,
	"./lo": 387,
	"./lo.js": 387,
	"./lt": 388,
	"./lt.js": 388,
	"./lv": 389,
	"./lv.js": 389,
	"./me": 390,
	"./me.js": 390,
	"./mi": 391,
	"./mi.js": 391,
	"./mk": 392,
	"./mk.js": 392,
	"./ml": 393,
	"./ml.js": 393,
	"./mr": 394,
	"./mr.js": 394,
	"./ms": 395,
	"./ms-my": 396,
	"./ms-my.js": 396,
	"./ms.js": 395,
	"./my": 397,
	"./my.js": 397,
	"./nb": 398,
	"./nb.js": 398,
	"./ne": 399,
	"./ne.js": 399,
	"./nl": 400,
	"./nl-be": 401,
	"./nl-be.js": 401,
	"./nl.js": 400,
	"./nn": 402,
	"./nn.js": 402,
	"./pa-in": 403,
	"./pa-in.js": 403,
	"./pl": 404,
	"./pl.js": 404,
	"./pt": 405,
	"./pt-br": 406,
	"./pt-br.js": 406,
	"./pt.js": 405,
	"./ro": 407,
	"./ro.js": 407,
	"./ru": 408,
	"./ru.js": 408,
	"./sd": 409,
	"./sd.js": 409,
	"./se": 410,
	"./se.js": 410,
	"./si": 411,
	"./si.js": 411,
	"./sk": 412,
	"./sk.js": 412,
	"./sl": 413,
	"./sl.js": 413,
	"./sq": 414,
	"./sq.js": 414,
	"./sr": 415,
	"./sr-cyrl": 416,
	"./sr-cyrl.js": 416,
	"./sr.js": 415,
	"./ss": 417,
	"./ss.js": 417,
	"./sv": 418,
	"./sv.js": 418,
	"./sw": 419,
	"./sw.js": 419,
	"./ta": 420,
	"./ta.js": 420,
	"./te": 421,
	"./te.js": 421,
	"./tet": 422,
	"./tet.js": 422,
	"./th": 423,
	"./th.js": 423,
	"./tl-ph": 424,
	"./tl-ph.js": 424,
	"./tlh": 425,
	"./tlh.js": 425,
	"./tr": 426,
	"./tr.js": 426,
	"./tzl": 427,
	"./tzl.js": 427,
	"./tzm": 428,
	"./tzm-latn": 429,
	"./tzm-latn.js": 429,
	"./tzm.js": 428,
	"./uk": 430,
	"./uk.js": 430,
	"./ur": 431,
	"./ur.js": 431,
	"./uz": 432,
	"./uz-latn": 433,
	"./uz-latn.js": 433,
	"./uz.js": 432,
	"./vi": 434,
	"./vi.js": 434,
	"./x-pseudo": 435,
	"./x-pseudo.js": 435,
	"./yo": 436,
	"./yo.js": 436,
	"./zh-cn": 437,
	"./zh-cn.js": 437,
	"./zh-hk": 438,
	"./zh-hk.js": 438,
	"./zh-tw": 439,
	"./zh-tw.js": 439
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 798;

/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs__ = __webpack_require__(298);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabModule = (function () {
    function TabModule() {
    }
    return TabModule;
}());
TabModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__tabs__["a" /* TabsPage */]],
        providers: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]]
    })
], TabModule);

//# sourceMappingURL=tab.module.js.map

/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find_password_find_password__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_3__find_password_find_password__["a" /* FindPasswordPage */], __WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */], __WEBPACK_IMPORTED_MODULE_3__find_password_find_password__["a" /* FindPasswordPage */], __WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */]],
        providers: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]],
        providers: [],
        exports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]]
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MineModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mine__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mine_edit_mine_edit__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mine_edit_modal_mine_edit_modal__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mine_edit_avatar_modal_mine_edit_avatar_modal__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__feed_back_feed_back__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__about_about__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__update_log_update_log__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_select_picture_select_picture_module__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__MineService__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__work_map_work_map__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_map_component_map_location_map_location_module__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__setting_setting__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__change_password_change_password__ = __webpack_require__(312);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var MineModule = (function () {
    function MineModule() {
    }
    return MineModule;
}());
MineModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_9__shared_select_picture_select_picture_module__["SelectPicturePageModule"], __WEBPACK_IMPORTED_MODULE_12__shared_map_component_map_location_map_location_module__["MapLocationModule"]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__mine__["a" /* MinePage */], __WEBPACK_IMPORTED_MODULE_3__mine_edit_mine_edit__["a" /* MineEditPage */], __WEBPACK_IMPORTED_MODULE_4__mine_edit_modal_mine_edit_modal__["a" /* MineEditModalPage */], __WEBPACK_IMPORTED_MODULE_5__mine_edit_avatar_modal_mine_edit_avatar_modal__["a" /* MineEditAvatarModalPage */], __WEBPACK_IMPORTED_MODULE_6__feed_back_feed_back__["a" /* FeedBackPage */], __WEBPACK_IMPORTED_MODULE_7__about_about__["a" /* AboutPage */], __WEBPACK_IMPORTED_MODULE_8__update_log_update_log__["a" /* UpdateLogPage */], __WEBPACK_IMPORTED_MODULE_11__work_map_work_map__["a" /* WorkMapPage */], __WEBPACK_IMPORTED_MODULE_13__setting_setting__["a" /* SettingPage */], __WEBPACK_IMPORTED_MODULE_14__change_password_change_password__["a" /* ChangePasswordPage */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__mine__["a" /* MinePage */], __WEBPACK_IMPORTED_MODULE_3__mine_edit_mine_edit__["a" /* MineEditPage */], __WEBPACK_IMPORTED_MODULE_4__mine_edit_modal_mine_edit_modal__["a" /* MineEditModalPage */], __WEBPACK_IMPORTED_MODULE_5__mine_edit_avatar_modal_mine_edit_avatar_modal__["a" /* MineEditAvatarModalPage */], __WEBPACK_IMPORTED_MODULE_6__feed_back_feed_back__["a" /* FeedBackPage */], __WEBPACK_IMPORTED_MODULE_7__about_about__["a" /* AboutPage */], __WEBPACK_IMPORTED_MODULE_8__update_log_update_log__["a" /* UpdateLogPage */], __WEBPACK_IMPORTED_MODULE_11__work_map_work_map__["a" /* WorkMapPage */], __WEBPACK_IMPORTED_MODULE_13__setting_setting__["a" /* SettingPage */], __WEBPACK_IMPORTED_MODULE_14__change_password_change_password__["a" /* ChangePasswordPage */]],
        providers: [__WEBPACK_IMPORTED_MODULE_10__MineService__["a" /* MineService */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]]
    })
], MineModule);

//# sourceMappingURL=mine.module.js.map

/***/ }),

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TestService__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_select_picture_select_picture_module__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TestModule = (function () {
    function TestModule() {
    }
    return TestModule;
}());
TestModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */],
            __WEBPACK_IMPORTED_MODULE_4__shared_select_picture_select_picture_module__["SelectPicturePageModule"]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__test__["a" /* TestPage */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__test__["a" /* TestPage */]],
        providers: [__WEBPACK_IMPORTED_MODULE_3__TestService__["a" /* TestService */]]
    })
], TestModule);

//# sourceMappingURL=test.module.js.map

/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pagination_demo_pagination_demo__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__custom_icon_demo_custom_icon_demo__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chartjs_demo_chartjs_demo__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__select_pic_demo_select_pic_demo__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__custom_pipe_demo_custom_pipe_demo__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_conversion__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_paging_paging_module__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_select_picture_select_picture_module__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__transition_demo_modal_scale_modal_scale_module__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__transition_demo_modal_from_right_modal_from_right_module__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__transition_demo_transition_demo_module__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__crop_pic_demo_crop_pic_demo__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__city_picker_demo_city_picker_demo__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic2_city_picker__ = __webpack_require__(824);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__DemoService__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ion2_calendar__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__calendar_demo_calendar_demo__ = __webpack_require__(445);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var DemoModule = (function () {
    function DemoModule() {
    }
    return DemoModule;
}());
DemoModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_9__shared_paging_paging_module__["PagingPageModule"], __WEBPACK_IMPORTED_MODULE_10__shared_select_picture_select_picture_module__["SelectPicturePageModule"], __WEBPACK_IMPORTED_MODULE_13__transition_demo_transition_demo_module__["TransitionDemoPageModule"], __WEBPACK_IMPORTED_MODULE_11__transition_demo_modal_scale_modal_scale_module__["ModalScalePageModule"], __WEBPACK_IMPORTED_MODULE_12__transition_demo_modal_from_right_modal_from_right_module__["ModalFromRightPageModule"], __WEBPACK_IMPORTED_MODULE_16_ionic2_city_picker__["CityPickerModule"], __WEBPACK_IMPORTED_MODULE_18_ion2_calendar__["b" /* CalendarModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__demo__["a" /* DemoPage */], __WEBPACK_IMPORTED_MODULE_3__pagination_demo_pagination_demo__["a" /* PaginationDemoPage */], __WEBPACK_IMPORTED_MODULE_4__custom_icon_demo_custom_icon_demo__["a" /* CustomIconDemoPage */], __WEBPACK_IMPORTED_MODULE_5__chartjs_demo_chartjs_demo__["a" /* ChartjsDemoPage */], __WEBPACK_IMPORTED_MODULE_6__select_pic_demo_select_pic_demo__["a" /* SelectPicDemoPage */], __WEBPACK_IMPORTED_MODULE_7__custom_pipe_demo_custom_pipe_demo__["a" /* CustomPipeDemo */], __WEBPACK_IMPORTED_MODULE_8__pipes_conversion__["a" /* Conversion */], __WEBPACK_IMPORTED_MODULE_14__crop_pic_demo_crop_pic_demo__["a" /* CropPicDemoPage */], __WEBPACK_IMPORTED_MODULE_15__city_picker_demo_city_picker_demo__["a" /* CityPickerDemoPage */], __WEBPACK_IMPORTED_MODULE_19__calendar_demo_calendar_demo__["a" /* CalendarDemoPage */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_2__demo__["a" /* DemoPage */], __WEBPACK_IMPORTED_MODULE_3__pagination_demo_pagination_demo__["a" /* PaginationDemoPage */], __WEBPACK_IMPORTED_MODULE_4__custom_icon_demo_custom_icon_demo__["a" /* CustomIconDemoPage */], __WEBPACK_IMPORTED_MODULE_5__chartjs_demo_chartjs_demo__["a" /* ChartjsDemoPage */], __WEBPACK_IMPORTED_MODULE_6__select_pic_demo_select_pic_demo__["a" /* SelectPicDemoPage */], __WEBPACK_IMPORTED_MODULE_7__custom_pipe_demo_custom_pipe_demo__["a" /* CustomPipeDemo */], __WEBPACK_IMPORTED_MODULE_14__crop_pic_demo_crop_pic_demo__["a" /* CropPicDemoPage */], __WEBPACK_IMPORTED_MODULE_15__city_picker_demo_city_picker_demo__["a" /* CityPickerDemoPage */], __WEBPACK_IMPORTED_MODULE_19__calendar_demo_calendar_demo__["a" /* CalendarDemoPage */]],
        providers: [__WEBPACK_IMPORTED_MODULE_17__DemoService__["a" /* DemoService */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicModule */]]
    })
], DemoModule);

//# sourceMappingURL=demo.module.js.map

/***/ }),

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Conversion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 Generated class for the Conversion pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
var Conversion = Conversion_1 = (function () {
    function Conversion() {
    }
    /**
     * 中文简体与中文繁体相互转换
     * @param sTot 默认true简转繁 false繁转简
     * @returns {string}
     */
    Conversion.prototype.transform = function (str, sTot) {
        if (str === void 0) { str = ''; }
        if (sTot === void 0) { sTot = true; }
        var newStr = '';
        for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
            var s = str_1[_i];
            var index = (sTot ? Conversion_1.s() : Conversion_1.t()).indexOf(s);
            newStr += index == -1 ? s : (sTot ? Conversion_1.t() : Conversion_1.s()).charAt(index);
        }
        return newStr;
    };
    Conversion.t = function () {
        return '萬與醜專業叢東絲丟兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳猛勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚呼嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壟壚壘墾坰堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖怵懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆糊溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢佘疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郤郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒乾儘臟拚';
    };
    Conversion.s = function () {
        return '万与丑专业丛东丝丢两严丧个丬丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅从仑仓仪们价众优伙会伛伞伟传伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俭债倾偬偻偾偿傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冢冯冲决况冻净凄凉凌减凑凛几凤凫凭凯击凼凿刍划刘则刚创删别刬刭刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勐勚匀匦匮区医华协单卖卢卤卧卫却卺厂厅历厉压厌厍厕厢厣厦厨厩厮县参叆叇双发变叙叠叶号叹叽吁后吓吕吗吣吨听启吴呒呓呕呖呗员呙呛呜咏咔咙咛咝咤咴咸哌响哑哒哓哔哕哗哙哜哝哟唛唝唠唡唢唣唤唿啧啬啭啮啰啴啸喷喽喾嗫呵嗳嘘嘤嘱噜噼嚣嚯团园囱围囵国图圆圣圹场坂坏块坚坛坜坝坞坟坠垄垅垆垒垦垧垩垫垭垯垱垲垴埘埙埚埝埯堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姜娄娅娆娇娈娱娲娴婳婴婵婶媪嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岙岚岛岭岳岽岿峃峄峡峣峤峥峦崂崃崄崭嵘嵚嵛嵝嵴巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂幞干并广庄庆庐庑库应庙庞废庼廪开异弃张弥弪弯弹强归当录彟彦彻径徕御忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恳恶恸恹恺恻恼恽悦悫悬悭悯惊惧惨惩惫惬惭惮惯愍愠愤愦愿慑慭憷懑懒懔戆戋戏戗战戬户扎扑扦执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捞损捡换捣据捻掳掴掷掸掺掼揸揽揿搀搁搂搅携摄摅摆摇摈摊撄撑撵撷撸撺擞攒敌敛数斋斓斗斩断无旧时旷旸昙昼昽显晋晒晓晔晕晖暂暧札术朴机杀杂权条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桊桠桡桢档桤桥桦桧桨桩梦梼梾检棂椁椟椠椤椭楼榄榇榈榉槚槛槟槠横樯樱橥橱橹橼檐檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉污汤汹沓沟没沣沤沥沦沧沨沩沪沵泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渖渗温游湾湿溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澜濑濒灏灭灯灵灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煅煳熘爱爷牍牦牵牺犊犟状犷犸犹狈狍狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珉珏珐珑珰珲琎琏琐琼瑶瑷璇璎瓒瓮瓯电画畅畲畴疖疗疟疠疡疬疮疯疱疴痈痉痒痖痨痪痫痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫癯皑皱皲盏盐监盖盗盘眍眦眬着睁睐睑瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硅硕硖硗硙硚确硷碍碛碜碱碹磙礼祎祢祯祷祸禀禄禅离秃秆种积称秽秾稆税稣稳穑穷窃窍窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹签简箓箦箧箨箩箪箫篑篓篮篱簖籁籴类籼粜粝粤粪粮糁糇紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缐缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肷肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑臜舆舣舰舱舻艰艳艹艺节芈芗芜芦苁苇苈苋苌苍苎苏苘苹茎茏茑茔茕茧荆荐荙荚荛荜荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莜莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒇蒉蒋蒌蓝蓟蓠蓣蓥蓦蔷蔹蔺蔼蕲蕴薮藁藓虏虑虚虫虬虮虽虾虿蚀蚁蚂蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襁襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶谷豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郄郏郐郑郓郦郧郸酝酦酱酽酾酿释里鉅鉴銮錾钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铍铎铏铐铑铒铕铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗错锚锜锞锟锠锡锢锣锤锥锦锨锩锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锺锻锼锽锾锿镀镁镂镃镆镇镈镉镊镌镍镎镏镐镑镒镕镖镗镙镚镛镜镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶隽难雏雠雳雾霁霉霭靓静靥鞑鞒鞯鞴韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馀馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齄齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟志制咨只里系范松没尝尝闹面准钟别闲干尽脏拼';
    };
    return Conversion;
}());
Conversion = Conversion_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'conversion'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Conversion);

var Conversion_1;
//# sourceMappingURL=conversion.js.map

/***/ }),

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalFromRightEnter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ModalFromRightLeave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ModalScaleEnter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ModalScaleLeave; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ModalFromRightEnter = (function (_super) {
    __extends(ModalFromRightEnter, _super);
    function ModalFromRightEnter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalFromRightEnter.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.enteringView.pageRef().nativeElement;
        var backdrop = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('ion-backdrop'));
        backdrop.beforeStyles({ 'z-index': 0, 'opacity': 0.3, 'visibility': 'visible' });
        var wrapper = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('transform', 'translateX(100%)', 'translateX(20%)');
        var contentWrapper = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('ion-content.content'));
        contentWrapper.beforeStyles({ 'width': '80%' });
        this
            .element(this.enteringView.pageRef())
            .duration(300)
            .easing('cubic-bezier(.25, .1, .25, 1)')
            .add(backdrop)
            .add(wrapper)
            .add(contentWrapper);
    };
    return ModalFromRightEnter;
}(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["s" /* PageTransition */]));

var ModalFromRightLeave = (function (_super) {
    __extends(ModalFromRightLeave, _super);
    function ModalFromRightLeave() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalFromRightLeave.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.leavingView.pageRef().nativeElement;
        var backdrop = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('ion-backdrop'));
        backdrop.beforeStyles({ 'visibility': 'hidden' });
        var wrapper = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('transform', 'translateX(20%)', 'translateX(100%)');
        this
            .element(this.leavingView.pageRef())
            .duration(300)
            .easing('cubic-bezier(.25, .1, .25, 1)')
            .add(backdrop)
            .add(wrapper);
    };
    return ModalFromRightLeave;
}(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["s" /* PageTransition */]));

var ModalScaleEnter = (function (_super) {
    __extends(ModalScaleEnter, _super);
    function ModalScaleEnter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalScaleEnter.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.enteringView.pageRef().nativeElement;
        var wrapper = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('transform', 'scale(0)', 'scale(1)');
        this
            .element(this.enteringView.pageRef())
            .duration(400)
            .easing('cubic-bezier(.1, .7, .1, 1)')
            .add(wrapper);
    };
    return ModalScaleEnter;
}(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["s" /* PageTransition */]));

var ModalScaleLeave = (function (_super) {
    __extends(ModalScaleLeave, _super);
    function ModalScaleLeave() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalScaleLeave.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.leavingView.pageRef().nativeElement;
        var wrapper = new __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Animation */](this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('transform', 'scale(1)', 'scale(0)');
        this
            .element(this.leavingView.pageRef())
            .duration(400)
            .easing('cubic-bezier(.1, .7, .1, 1)')
            .add(wrapper);
    };
    return ModalScaleLeave;
}(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["s" /* PageTransition */]));

//# sourceMappingURL=modal-transitions.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectPicturePageModule", function() { return SelectPicturePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_picture__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__preview_picture_preview_picture_module__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SelectPicturePageModule = (function () {
    function SelectPicturePageModule() {
    }
    return SelectPicturePageModule;
}());
SelectPicturePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__select_picture__["a" /* SelectPicturePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__select_picture__["a" /* SelectPicturePage */]), __WEBPACK_IMPORTED_MODULE_3__preview_picture_preview_picture_module__["PreviewPicturePageModule"]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__select_picture__["a" /* SelectPicturePage */]
        ]
    })
], SelectPicturePageModule);

//# sourceMappingURL=select-picture.module.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GlobalData__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 07-25.
 */


/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
var Logger = (function () {
    function Logger(globalData) {
        this.globalData = globalData;
    }
    Logger.prototype.log = function (err, action, other) {
        if (other === void 0) { other = null; }
        console.log('Logger.log：action-' + action);
        other && console.log(other);
        console.log(err);
        fundebug.notifyError(err, {
            metaData: {
                action: action,
                other: other,
                user: { id: this.globalData.userId, name: this.globalData.username }
            }
        });
    };
    Logger.prototype.httpLog = function (err, msg, other) {
        if (other === void 0) { other = {}; }
        console.log('Logger.httpLog：msg-' + msg);
        fundebug.notifyHttpError(err, {
            metaData: {
                action: msg,
                other: other,
                user: { id: this.globalData.userId, name: this.globalData.username }
            }
        });
    };
    return Logger;
}());
Logger = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__GlobalData__["a" /* GlobalData */]])
], Logger);

//# sourceMappingURL=Logger.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GlobalData__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__NativeService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Constants__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Logger__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by yanxiaojun617@163.com on 12-27.
 */









var HttpService = HttpService_1 = (function () {
    function HttpService(http, globalData, logger, nativeService) {
        this.http = http;
        this.globalData = globalData;
        this.logger = logger;
        this.nativeService = nativeService;
    }
    HttpService.prototype.request = function (url, options) {
        var _this = this;
        url = __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* Utils */].formatUrl(url.startsWith('http') ? url : __WEBPACK_IMPORTED_MODULE_7__Constants__["c" /* APP_SERVE_URL */] + url);
        this.optionsAddToken(options);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].create(function (observer) {
            _this.nativeService.showLoading();
            console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
            _this.http.request(url, options).timeout(__WEBPACK_IMPORTED_MODULE_7__Constants__["m" /* REQUEST_TIMEOUT */]).subscribe(function (res) {
                _this.nativeService.hideLoading();
                console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
                if (res['_body'] == '') {
                    res['_body'] = null;
                }
                observer.next(res);
            }, function (err) {
                _this.requestFailed(url, options, err); //处理请求失败
                observer.error(err);
            });
        });
    };
    HttpService.prototype.get = function (url, paramMap) {
        if (paramMap === void 0) { paramMap = null; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Get,
            search: HttpService_1.buildURLSearchParams(paramMap)
        }));
    };
    HttpService.prototype.post = function (url, body) {
        if (body === void 0) { body = {}; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            body: body,
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }));
    };
    HttpService.prototype.postFormData = function (url, paramMap) {
        if (paramMap === void 0) { paramMap = null; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Post,
            search: HttpService_1.buildURLSearchParams(paramMap).toString(),
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        }));
    };
    HttpService.prototype.put = function (url, body) {
        if (body === void 0) { body = {}; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Put,
            body: body
        }));
    };
    HttpService.prototype.delete = function (url, paramMap) {
        if (paramMap === void 0) { paramMap = null; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Delete,
            search: HttpService_1.buildURLSearchParams(paramMap).toString()
        }));
    };
    HttpService.prototype.patch = function (url, body) {
        if (body === void 0) { body = {}; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Patch,
            body: body
        }));
    };
    HttpService.prototype.head = function (url, paramMap) {
        if (paramMap === void 0) { paramMap = null; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Head,
            search: HttpService_1.buildURLSearchParams(paramMap).toString()
        }));
    };
    HttpService.prototype.options = function (url, paramMap) {
        if (paramMap === void 0) { paramMap = null; }
        return this.request(url, new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestMethod */].Options,
            search: HttpService_1.buildURLSearchParams(paramMap).toString()
        }));
    };
    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {URLSearchParams}
     */
    HttpService.buildURLSearchParams = function (paramMap) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */]();
        if (!paramMap) {
            return params;
        }
        for (var key in paramMap) {
            var val = paramMap[key];
            if (val instanceof Date) {
                val = __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* Utils */].dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
            }
            params.set(key, val);
        }
        return params;
    };
    /**
     * 处理请求失败事件
     * @param url
     * @param options
     * @param err
     */
    HttpService.prototype.requestFailed = function (url, options, err) {
        this.nativeService.hideLoading();
        console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
        if (err instanceof __WEBPACK_IMPORTED_MODULE_3_rxjs__["TimeoutError"]) {
            this.nativeService.alert('请求超时,请稍后再试!');
            return;
        }
        if (!this.nativeService.isConnecting()) {
            this.nativeService.alert('请求失败，请连接网络');
            return;
        }
        var msg = '请求发生异常';
        try {
            var result = err.json();
            this.nativeService.alert(result.message || msg);
        }
        catch (err) {
            var status_1 = err.status;
            if (status_1 === 0) {
                msg = '请求失败，请求响应出错';
            }
            else if (status_1 === 404) {
                msg = '请求失败，未找到请求地址';
            }
            else if (status_1 === 500) {
                msg = '请求失败，服务器出错，请稍后再试';
            }
            this.nativeService.alert(msg);
            this.logger.httpLog(err, msg, {
                url: url,
                status: status_1
            });
        }
    };
    HttpService.prototype.optionsAddToken = function (options) {
        var token = this.globalData.token;
        if (options.headers) {
            options.headers.append('Authorization', 'Bearer ' + token);
        }
        else {
            options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + token
            });
        }
    };
    return HttpService;
}());
HttpService = HttpService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_5__GlobalData__["a" /* GlobalData */],
        __WEBPACK_IMPORTED_MODULE_8__Logger__["a" /* Logger */],
        __WEBPACK_IMPORTED_MODULE_6__NativeService__["a" /* NativeService */]])
], HttpService);

var HttpService_1;
//# sourceMappingURL=HttpService.js.map

/***/ })

},[449]);
//# sourceMappingURL=main.js.map