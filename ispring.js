window.dynamicPptDebug = true;
var LogDevelopment = {
  error: function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    console.error.apply(console, e);
  },
  info: function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    console.info.apply(console, e);
  },
  warn: function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    console.warn.apply(console, e);
  },
  log: function () {
    if (window.dynamicPptDebug) {
      var e = [];
      for (t = 0; t < arguments.length; t++) {
        e[t] = arguments[t];
      }
      console.log.apply(console, e);
    }
  },
  trace: function () {
    if (window.dynamicPptDebug) {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      console.trace.apply(console, e);
    }
  },
  debug: function () {
    if (window.dynamicPptDebug) {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      console.debug.apply(console, e);
    }
  },
};

dynamicPptLog = LogDevelopment;

window.onload = function () {
  var ele = document.createElement("div");
  ele.className = "ppt-supernatant";
  ele.id = "ppt_supernatant";
  document.body.appendChild(ele);
  var locationOrigin =
    window.location.origin.indexOf(".aliyuncs.com") > -1
      ? window.location.origin
      : "https://uskid.oss-cn-beijing.aliyuncs.com";
  var t;
  var i;
  // 自定义样式
  var pptSupernatantEle = document.getElementById("ppt_supernatant");

  window.GLOBAL = window.GLOBAL || {};
  window.isPlayFalg = !0;
  window.GLOBAL.saveVideoSrc = [];
  window.GLOBAL.saveAudioSrc = [];
  window.GLOBAL.browser = {
    versions: (function () {
      var e = navigator.userAgent;
      navigator.appVersion;
      return {
        trident: -1 < e.indexOf("Trident"),
        presto: -1 < e.indexOf("Presto"),
        webKit: -1 < e.indexOf("AppleWebKit"),
        gecko: -1 < e.indexOf("Gecko") && -1 == e.indexOf("KHTML"),
        mobile: !!e.match(/AppleWebKit.*Mobile.*/),
        ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: -1 < e.indexOf("Android") || -1 < e.indexOf("Linux"),
        iPhone: -1 < e.indexOf("iPhone"),
        iPad: -1 < e.indexOf("iPad"),
        webApp: -1 == e.indexOf("Safari"),
      };
    })(),
    language: (
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      navigator.userLanguage ||
      navigator.language
    ).toLowerCase(),
  };
  window.GLOBAL.isMobile = function () {
    var e = window.GLOBAL.browser;
    return (
      e.versions.mobile ||
      e.versions.ios ||
      e.versions.android ||
      e.versions.iPhone ||
      e.versions.iPad
    );
  };
  window.GLOBAL.addEvents = function (ele, eventName, funcName) {
    if (ele.addEventListener) {
      ele.addEventListener(eventName, funcName, !1);
    } else if (ele.attachEvent("on" + eventName, funcName)) {
      ele.attachEvent("on" + eventName, funcName);
    } else {
      ele["on" + eventName] = funcName;
    }
  };
  window.GLOBAL.removeEvents = function (ele, eventName, funcName) {
    if (ele.removeEventListener) {
      ele.removeEventListener(eventName, funcName, !1);
    } else if (ele.detachEvent) {
      ele.detachEvent("on" + eventName, funcName);
    } else {
      ele["on" + eventName] = null;
    }
  };
  window.GLOBAL.fireEvent =
    window.GLOBAL.fireEvent ||
    function (ele, eventName) {
      var init = {
        initiative: !1, // 自动触发 false
      };
      var event;
      if (document.createEventObject) {
        event = document.createEventObject();
        event.externalData = init;
        return ele.fireEvent("on" + eventName, event);
      }

      event = document.createEvent("HTMLEvents");
      // 事件类型，是否冒泡，是否阻止浏览器的默认行为
      event.initEvent(eventName, !0, !0);
      event.externalData = init;
      return ele.dispatchEvent(event);
    };
  window.GLOBAL.initiativeDataDefault = !0;
  window.GLOBAL.externalData = {
    initiative: window.GLOBAL.initiativeDataDefault,
  };
  window.GLOBAL.getUrlParams =
    window.GLOBAL.getUrlParams ||
    function (queryName) {
      var href = decodeURIComponent(window.location.href);
      var index = href.indexOf("?");
      var queryUrl = href.substring(index + 1);
      var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
      var value = queryUrl.match(reg);
      return value !== null ? value[2] : "";
    };
  window.GLOBAL.getEle = function (path) {
    return document.querySelector(path);
  };

  window.GLOBAL.videoInitiativeData = !0;
  window.GLOBAL.mClientType = window.GLOBAL.getUrlParams("mClientType");
  window.GLOBAL.deviceType = window.GLOBAL.getUrlParams("deviceType");

  // 文件id
  (window.GLOBAL.fileid = window.GLOBAL.getUrlParams("fileid")),
    (window.GLOBAL.fileid = window.GLOBAL.fileid
      ? Number(window.GLOBAL.fileid)
      : window.GLOBAL.fileid),
    // 是否是回放
    (window.GLOBAL.playback =
      "true" == window.GLOBAL.getUrlParams("playback") ||
      1 == window.GLOBAL.getUrlParams("playback")),
    // 开始上课
    (window.GLOBAL.classbegin =
      "true" == window.GLOBAL.getUrlParams("classbegin") ||
      1 == window.GLOBAL.getUrlParams("classbegin")),
    // 打印log
    (window.dynamicPptDebug =
      !!window.GLOBAL.getUrlParams("dynamicPptDebug") &&
      "true" == window.GLOBAL.getUrlParams("dynamicPptDebug")),
    // 角色
    (window.GLOBAL.role = window.GLOBAL.getUrlParams("role")),
    // 动态课件事件点击
    (window.GLOBAL.dynamicPptActionClick =
      !window.GLOBAL.getUrlParams("dynamicPptActionClick") ||
      "true" == window.GLOBAL.getUrlParams("dynamicPptActionClick")),
    // 课件翻页
    // window.GLOBAL.newpptPagingPage = !!window.GLOBAL.getUrlParams("newpptPagingPage") && "true" == window.GLOBAL.getUrlParams("newpptPagingPage"),

    (window.GLOBAL.publishDynamicPptMediaPermission_video =
      "true" ==
        window.GLOBAL.getUrlParams("publishDynamicPptMediaPermission_video") ||
      1 ==
        window.GLOBAL.getUrlParams("publishDynamicPptMediaPermission_video")),
    (window.GLOBAL.PptVolumeValue = window.GLOBAL.getUrlParams("PptVolumeValue")
      ? parseFloat(window.GLOBAL.getUrlParams("PptVolumeValue"))
      : 0),
    (window.GLOBAL.notPlayAV =
      !!window.GLOBAL.getUrlParams("notPlayAV") &&
      "true" == window.GLOBAL.getUrlParams("notPlayAV")),
    (window.GLOBAL.PptVolumeMute =
      !!window.GLOBAL.getUrlParams("PptVolumeMute") &&
      "true" == window.GLOBAL.getUrlParams("PptVolumeMute")),
    (window.GLOBAL.isNotPlayAudio =
      !!window.GLOBAL.getUrlParams("isNotPlayAudio") &&
      "true" == window.GLOBAL.getUrlParams("isNotPlayAudio")),
    (window.GLOBAL.isNotPlayVideo =
      !!window.GLOBAL.getUrlParams("isNotPlayVideo") &&
      "true" == window.GLOBAL.getUrlParams("isNotPlayVideo")),
    (window.GLOBAL.isLoadPageController = window.GLOBAL.getUrlParams(
      "isLoadPageController"
    )),
    (window.GLOBAL.isControl =
      !!window.GLOBAL.getUrlParams("control") &&
      "true" == window.GLOBAL.getUrlParams("control")),
    // window.GLOBAL.isBackEvent = !!window.GLOBAL.getUrlParams("isBackEvent") && "true" == window.GLOBAL.getUrlParams("isBackEvent"),
    (window.GLOBAL.languageName =
      window.GLOBAL.browser.language &&
      window.GLOBAL.browser.language.toLowerCase().match(/zh/g)
        ? "chinese"
        : "english"),
    (window.GLOBAL.versions = window.GLOBAL.getUrlParams("versions")),
    (window.GLOBAL.versions = window.GLOBAL.versions
      ? Number(window.GLOBAL.versions)
      : window.GLOBAL.versions),
    (window.GLOBAL.isClientPlayAudio =
      !!window.GLOBAL.getUrlParams("isClientPlayAudio") &&
      "true" == window.GLOBAL.getUrlParams("isClientPlayAudio")),
    // 添加控制手柄
    (window.GLOBAL.allowControl =
      !!window.GLOBAL.getUrlParams("allowControl") &&
      "true" === window.GLOBAL.getUrlParams("allowControl"));

  // 添加键盘事件手柄
  window.GLOBAL.allowKeyCode =
    !!window.GLOBAL.getUrlParams("allowKeyCode") &&
    "true" === window.GLOBAL.getUrlParams("allowKeyCode");
  window.GLOBAL.allowLocalKeyCode = !!window.GLOBAL.getUrlParams(
    "allowLocalKeyCode"
  );
  window.GLOBAL.onlyAllowTouchEvent = !!window.GLOBAL.getUrlParams(
    "onlyAllowTouchEvent"
  );

  // 添加视频控制条手柄
  window.GLOBAL.allowControlVideo =
    !!window.GLOBAL.getUrlParams("allowControlVideo") &&
    "true" === window.GLOBAL.getUrlParams("allowControlVideo");

  // 添加额外消息携带数据
  window.GLOBAL.extraInfo = window.GLOBAL.getUrlParams("extraInfo");

  // 添加全局的遮罩
  window.GLOBAL.uskidControlMask = function (isAllow) {
    var video = document.getElementsByTagName("video")[0];
    var videoMask = document.getElementById("videoMask");
    if (!videoMask) {
      var ele = document.createElement("div");
      ele.setAttribute("id", "videoMask");
      document.body.append(ele);
      videoMask = document.getElementById("videoMask");
      videoMask.style.width = "100%";
      videoMask.style.height = "100vh";
      videoMask.style.background = "#000";
      videoMask.style.opacity = 0;
    }
    var videoControl = document.getElementsByClassName("controls")[0];
    if (videoControl) {
      videoControl.style.display = "none";
    }
    if (
      video &&
      isAllow &&
      window.GLOBAL.isControl &&
      window.GLOBAL.allowControlVideo
    ) {
      videoMask.style.display = "none";
      videoControl.style.display = "block";
      var mute = document.getElementsByClassName("mute")[0];
      var volume_popup = document.getElementsByClassName("volume_popup")[0];
      var toggle_fullscreen = document.getElementsByClassName(
        "toggle_fullscreen"
      )[0];
      mute.style.display = "none";
      volume_popup.style.display = "none";
      toggle_fullscreen.style.display = "none";
    } else if (!video && isAllow) {
      videoMask.style.display = "none";
    } else {
      videoMask.style.display = "block";
    }
  };

  window.GLOBAL.uskidControlMask(window.GLOBAL.allowControl);

  // 添加全局翻页框
  window.GLOBAL.updateLocalPage = function (e, isAllow) {
    if (isAllow) {
      var pageBox = document.getElementById("pageBox");
      if (!pageBox) {
        var ele = document.createElement("div");
        ele.setAttribute("id", "pageBox");
        ele.style =
          "position: absolute; z-index: 999; width: 150px; height: 45px; border: 1px solid #000; border-radius: 45px; top: 20px; left: 20px; text-align: center; line-height: 45px;";
        document.body.append(ele);
      }

      pageBox = document.getElementById("pageBox");
      if (e.action === "initEvent") {
        window.GLOBAL.slidesCount = e.slidesCount;
        pageBox.innerText =
          e.slide +
          1 +
          " / " +
          e.slidesCount +
          " ....... " +
          (e.step + 1) +
          " / " +
          e.stepTotal;
      } else if (
        e.action === "slideChangeEvent" ||
        e.action === "stepChangeEvent"
      ) {
        pageBox.innerText =
          e.slide +
          1 +
          " / " +
          window.GLOBAL.slidesCount +
          " ....... " +
          (e.step + 1) +
          " / " +
          e.stepTotal;
      }
    }
  };

  window.GLOBAL.getParents = function (e, t) {
    try {
      if (t === void 0) {
        t = "document";
      }
      for (var i = [], n = e, o = 0; ; ) {
        var a = n;
        if (!a) break;
        if (a && a.getAttribute("id")) {
          i.push(a);
          break;
        }
        if (((n = a.parentNode), 150 < ++o)) break;
      }
      return i;
    } catch (e) {
      dynamicPptLog.error("getParsents error: ", e);
    }
  };

  window.GLOBAL.clickGoVideoTime = function (e, t) {
    console.log("click-go-video-time", e, t);
    if (window.GLOBAL.isControl && e) {
      var i = e,
        n = i.duration,
        o = {
          action: "clickNewpptVideoEvent",
          currentTime: i.currentTime,
          duration: n,
          externalData: {
            initiative: t,
          },
        };
      window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(o);
    }
  };
  var onTouchStart = function (e) {
    // e.preventDefault();
    var i = e.target;
    var n = e.currentTarget;
    var o = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController
        .clock()
        .timestamp(),
      a = o.slideIndex(),
      r = 0 <= o.stepIndex() ? o.stepIndex() : 0,
      l = null;

    if (i && !i.getAttribute("id")) {
      var d = window.GLOBAL.getParents(i);
      d && 0 < d.length && (l = d[0].getAttribute("id"));
    }

    var arr = [];
    var ll = null;
    if (e.path && e.path.length) {
      e.path.forEach(function (item) {
        if (!ll) {
          if (item.getAttribute && item.getAttribute("id")) {
            ll = item.getAttribute("id");
            ll = ll + " " + arr.reverse().join(" ");
          } else {
            arr.push(item.tagName);
          }
        }
      });
    }
    var s = {
      action: "clickNewpptTriggerEvent",
      slide: a,
      step: r,
      triggerElementId: ll || i.getAttribute("id") || l,
      externalData: { initiative: e.isTrusted },
    };
    window.GLOBAL.ServiceNewPptAynamicPPT.clickNewpptTriggerEventHandler(s);
    l && (s.childElementTagName = n.nodeName),
      window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(s);
  };
  var clickElementFunc = function (e) {
    console.log("test-click", window.GLOBAL.onlyAllowTouchEvent);
    // 如何知道当前元素是操作点
    var i = e.target;
    var n = e.currentTarget;
    dynamicPptLog.log(
      "点击触发器，节点数据[target , currentTarget , externalData]:",
      i,
      n,
      e.isTrusted
    );
    var o = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController
        .clock()
        .timestamp(),
      a = o.slideIndex(),
      r = 0 <= o.stepIndex() ? o.stepIndex() : 0,
      l = null;

    if (i && !i.getAttribute("id")) {
      var d = window.GLOBAL.getParents(i);
      d && 0 < d.length && (l = d[0].getAttribute("id"));
    }

    var arr = [];
    var ll = null;
    if (e.path && e.path.length) {
      e.path.forEach(function (item) {
        if (!ll) {
          if (item.getAttribute && item.getAttribute("id")) {
            ll = item.getAttribute("id");
            ll = ll + " " + arr.reverse().join(" ");
          } else {
            arr.push(item.tagName);
          }
        }
      });
    }

    var s = {
      action: "clickNewpptTriggerEvent",
      slide: a,
      step: r,
      triggerElementId: ll || i.getAttribute("id") || l,
      externalData: { initiative: e.isTrusted },
    };

    dynamicPptLog.log("clickNewpptTriggerEvent: s=", s);
    l && (s.childElementTagName = n.nodeName),
      window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(s);
  };

  var keyCodeFunc = function (event) {
    if (window.GLOBAL.allowControl && window.GLOBAL.allowKeyCode) {
      dynamicPptLog.log("event.keyCode: ", event.keyCode, event);
      var data = {
        action: "keydown",
        data: {
          keyCode: event.keyCode,
          externalData: {
            // initiative: !0,
          },
        },
      };
      window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(data);
      switch (event.keyCode) {
        case 32:
          event.returnValue = false;
          dynamicPptLog.log("阻止默认空格事件-gotoNextStep");
          if (window.GLOBAL.allowLocalKeyCode) {
            window.GLOBAL.actionHandlerFunction({
              action: "gotoNextStep",
            });
            // window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextStep()
          }
          return !1;
        case 13:
          event.returnValue = false;
          dynamicPptLog.log("阻止默认回车事件-gotoNextSlide");
          if (window.GLOBAL.allowLocalKeyCode) {
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide();
          }
          return !1;
        case 38:
          event.returnValue = false;
          dynamicPptLog.log("阻止默认上箭头事件-gotoPreviousStep");
          if (window.GLOBAL.allowLocalKeyCode) {
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousStep();
          }
          return !1;
        case 39:
          event.returnValue = false;
          dynamicPptLog.log("阻止默认右箭头事件-gotoNextSlide");
          if (window.GLOBAL.allowLocalKeyCode) {
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide();
          }
          return !1;
        case 37:
          event.returnValue = false;
          dynamicPptLog.log("阻止默认左箭头事件-gotoPreviousSlide");
          if (window.GLOBAL.allowLocalKeyCode) {
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide();
          }
          return !1;
        case 40:
          event.returnValue = false;
          dynamicPptLog.log("阻止默认下箭头事件");
          if (window.GLOBAL.allowLocalKeyCode) {
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextStep();
          }
          return !1;
        default:
          return !1;
      }
    } else {
      dynamicPptLog.info("Shortcuts are not allowed to control courseware.");
    }
  };

  var messageFunc = function (event) {
    try {
      if (
        (dynamicPptLog.log(
          "receive remote iframe's parent  data form " + event.origin + ":",
          event
        ),
        event.data)
      ) {
        var res = JSON.parse(event.data);
        if (res && res.data && res.source === "tk_dynamicPPT") {
          window.GLOBAL.actionHandlerFunction(res.data);
        }
      }
    } catch (e) {
      dynamicPptLog.error("message Event form iframe :", e);
    }
  };

  window.GLOBAL.onPlayerInit = function (e) {
    function setMediaVolume() {
      var audios = document.querySelectorAll("audio"),
        videos = document.querySelectorAll("video");
      if (0 < audios.length)
        for (var i = 0; i < audios.length; i++) {
          var n = audios[i];
          (n.volume = parseFloat(window.GLOBAL.PptVolumeValue)),
            window.GLOBAL.PptVolumeMute || window.GLOBAL.isClientPlayAudio
              ? (n.muted = !0)
              : (n.muted = !1);
        }
      if (0 < videos.length)
        for (i = 0; i < videos.length; i++) {
          var o = videos[i];
          (o.volume = parseFloat(window.GLOBAL.PptVolumeValue)),
            window.GLOBAL.PptVolumeMute ? (o.muted = !0) : (o.muted = !1);
        }
      var mediaLength = audios.length + videos.length;
      if (mediaLength !== window.GLOBAL.totalAudioAndVideoNumber) {
        var data = {
          action: "allVideoAndAudio",
          allVideoAndAudioLength: (window.GLOBAL.totalAudioAndVideoNumber = mediaLength),
        };
        window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(data);
      }
    }

    function m(e) {
      var n = window.GLOBAL.newPptAynamicThat.that,
        t = document.getElementsByTagName("audio"),
        o = document.getElementsByTagName("video");
      if (0 < t.length) {
        for (var i = [], a = 0; a < t.length; a++) {
          var r = t[a];
          if (r.paused) {
            var l = {
              ele: r,
              isActive: !1,
            };
            i.push(l);
          } else {
            l = {
              ele: r,
              isActive: !0,
            };
            i.push(l);
          }
        }
        window.GLOBAL.saveAudioSrc = i;
      }
      if (
        (0 < t.length || 0 < o.length) &&
        window.isPlayFalg &&
        !(
          (window.GLOBAL.isNotPlayAudio && window.GLOBAL.isNotPlayVideo) ||
          window.GLOBAL.notPlayAV
        )
      ) {
        !(function () {
          var t =
            document.getElementById("testAudio") ||
            document.createElement("audio");
          (t.id = "testAudio"),
            (t.src = locationOrigin + "/class/ispring/test.mp3"),
            document.getElementById("testAudio") ||
              document.body.appendChild(t);
          try {
            var e = t.play();
            e && "function" == typeof e.then
              ? e
                  .then(function () {
                    document.getElementById("testAudio") &&
                      document.body.removeChild(
                        document.getElementById("testAudio")
                      ),
                      (window.isPlayFalg = !1);
                  })
                  .catch(function (e) {
                    dynamicPptLog.error("audio test error---\x3e", e, t),
                      e &&
                        "object" == typeof e &&
                        "NotAllowedError" === e.name &&
                        window.isPlayFalg &&
                        ((window.isPlayFalg = !1),
                        window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(
                          {
                            action: "againReconnect",
                          }
                        )),
                      document.getElementById("testAudio") &&
                        document.body.removeChild(
                          document.getElementById("testAudio")
                        );
                  })
              : (document.getElementById("testAudio") &&
                  document.body.removeChild(
                    document.getElementById("testAudio")
                  ),
                (window.isPlayFalg = !1));
          } catch (e) {
            dynamicPptLog.error("audio play error:", e);
          }
        })();
      }
      if (window.GLOBAL.isMobile() && !window.GLOBAL.isControl && 0 < o.length)
        for (a = o.length - 1; 0 <= a; a--)
          o[a].attributes.controls && o[a].removeAttribute("controls");
      if (!window.GLOBAL.isControl) {
        if (0 < t.length)
          for (a = t.length - 1; 0 <= a; a--)
            (t[a] && "testAudio" === t[a].id) || (e && t[a].pause());
        if (0 < o.length) for (a = o.length - 1; 0 <= a; a--) e && o[a].pause();
      }
      if (1 <= o.length && window.GLOBAL.isControl) {
        var d = function (i) {
          window.GLOBAL.addEvents(o[0], i, function () {
            if (window.GLOBAL.videoInitiative)
              if ("seeked" === i)
                window.GLOBAL.clickGoVideoTime &&
                  window.GLOBAL.clickGoVideoTime(
                    o[0],
                    window.GLOBAL.videoInitiative
                  );
              else {
                var e = {
                  action: "startPlayVideoEvent",
                  videoStatus: i,
                  externalData: {
                    initiative: window.GLOBAL.videoInitiative,
                  },
                };
                n.postMessageToParent(e);
                var t = this.parentNode;
                t.classList.contains("iphone") &&
                  t.classList.remove("video_player");
              }
          });
        };
        if (window.GLOBAL.isMobile()) d("play"), d("pause"), d("seeked");
        else {
          var s = document.getElementsByClassName("controls")[0];
          window.GLOBAL.isControl
            ? (s.classList.add("openControl"), d("play"), d("pause"))
            : pptThat.classList.add("closeControl");
        }
      }
    }

    window.HTMLAudioElement.prototype._play =
      window.HTMLAudioElement.prototype.play;

    window.HTMLAudioElement.prototype._pause =
      window.HTMLAudioElement.prototype.pause;

    window.HTMLAudioElement.prototype.play = function () {
      return window.GLOBAL.isControl
        ? window.HTMLAudioElement.prototype._play.apply(this, arguments)
        : "testAudio" === this.id
        ? window.HTMLAudioElement.prototype._play.apply(this, arguments)
        : function (e, t) {
            if (window.GLOBAL.notPlayAV || window.GLOBAL.isNotPlayAudio);
            else if (e || window.GLOBAL.isClientPlayAudio) {
              var i = window.GLOBAL.newPptAynamicThat.that,
                n = this;
              if (((t = t || {}), n)) {
                var o = n.querySelectorAll("source"),
                  a = void 0,
                  r = void 0;
                if (o && 0 < o.length) {
                  for (var l = 0; l < o.length; l++) {
                    var d = o[l];
                    d &&
                      (-1 !== d.getAttribute("type").indexOf("mepg") &&
                        (a = d.getAttribute("src")),
                      -1 !== d.getAttribute("type").indexOf("ogg") &&
                        (r = d.getAttribute("src")));
                  }
                  if (!a && !r)
                    return void dynamicPptLog.error(
                      "audio resouce webm url is not exist!",
                      o
                    );
                } else {
                  var s = this.getAttribute("src");
                  s &&
                    "about:blank" !== s &&
                    ((a = s.substr(s.indexOf("data"))),
                    (r = s.substr(s.indexOf("data"))));
                }
                if (a || r) {
                  if (void 0 === t.pptslide) {
                    var c = i.playbackController.clock().timestamp(),
                      w = c.slideIndex();
                    t.pptslide = w;
                  }
                  void 0 === t.externalData &&
                    (t.externalData = {
                      initiative: !0,
                    }),
                    this.id ||
                      (this.id = "playCustomAudio_" + new Date().getTime());
                  var p = {
                    audioElementId: this.id,
                    action: "clinetAudioPlayer",
                    isPlay: !0,
                    fileid: window.GLOBAL.fileid,
                    url: a || r,
                    pptslide: t.pptslide,
                    externalData: t.externalData,
                    currentTime: this.currentTime || 0,
                    duration: this.duration || 0,
                  };
                  i.postMessageToParent(p);
                }
                if (this && this._play && "function" == typeof this._play) {
                  if (!this.src || "about:blank" === this.src) {
                    var o = this.querySelectorAll("source");
                    if (!o.length) return;
                  }
                  var n = this;
                  (this.muted = !0), (this.volume = 0);
                  var m = this._play.apply(this, arguments);
                  m && "function" == typeof m.then
                    ? m
                        .then(function () {
                          window.isPlayFalg = !1;
                        })
                        .catch(function (e) {
                          if (
                            (dynamicPptLog.error("音频 error---\x3e", e, n),
                            e &&
                              "object" == typeof e &&
                              "NotAllowedError" === e.name &&
                              window.isPlayFalg)
                          ) {
                            window.isPlayFalg = !1;
                            window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(
                              {
                                action: "againReconnect",
                              }
                            );
                          }
                        })
                    : (window.isPlayFalg = !1);
                  for (
                    var u = window.GLOBAL.saveAudioSrc, L = this, P = 0;
                    P < u.length;
                    P++
                  ) {
                    var A = u[P];
                    L == A.ele && (A.isActive = !0);
                  }
                }
              }
            } else if (this && this._play && "function" == typeof this._play) {
              if (!this.src || "about:blank" === this.src) {
                var o = this.querySelectorAll("source");
                if (!o.length) return;
              }
              var n = this,
                m = this._play.apply(this, arguments);
              m && "function" == typeof m.then
                ? m
                    .then(function () {
                      window.isPlayFalg = !1;
                    })
                    .catch(function (e) {
                      if (
                        (dynamicPptLog.error("音频 error---\x3e", e, n),
                        e &&
                          "object" == typeof e &&
                          "NotAllowedError" === e.name &&
                          window.isPlayFalg)
                      ) {
                        window.isPlayFalg = !1;
                        window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(
                          {
                            action: "againReconnect",
                          }
                        );
                      }
                    })
                : (window.isPlayFalg = !1);
              for (
                var u = window.GLOBAL.saveAudioSrc, L = this, P = 0;
                P < u.length;
                P++
              ) {
                var A = u[P];
                L == A.ele && (A.isActive = !0);
              }
            }
          }.apply(this, arguments);
    };

    window.HTMLAudioElement.prototype.pause = function () {
      return window.GLOBAL.isControl
        ? window.HTMLAudioElement.prototype._pause.apply(this, arguments)
        : "testAudio" === this.id
        ? window.HTMLAudioElement.prototype._pause.apply(this, arguments)
        : function (e, t) {
            if (window.GLOBAL.notPlayAV || window.GLOBAL.isNotPlayAudio);
            else if (e || window.GLOBAL.isClientPlayAudio) {
              var i = window.GLOBAL.newPptAynamicThat.that;
              if (((t = t || {}), this)) {
                var n = this.querySelectorAll("source"),
                  o = void 0,
                  a = void 0;
                if (n && 0 < n.length) {
                  for (var r = 0; r < n.length; r++) {
                    var l = n[r];
                    l &&
                      (-1 !== l.getAttribute("type").indexOf("mepg") &&
                        (o = l.getAttribute("src")),
                      -1 !== l.getAttribute("type").indexOf("ogg") &&
                        (a = l.getAttribute("src")));
                  }
                  if (!o && !a)
                    return void dynamicPptLog.error(
                      "audio resouce webm url is not exist!",
                      n
                    );
                } else {
                  var d = this.getAttribute("src");
                  d &&
                    "about:blank" !== d &&
                    ((o = d.substr(d.indexOf("data"))),
                    (a = d.substr(d.indexOf("data"))));
                }
                if (o || a) {
                  if (void 0 === t.pptslide) {
                    var s = i.playbackController.clock().timestamp(),
                      c = s.slideIndex();
                    t.pptslide = c;
                  }
                  void 0 === t.externalData &&
                    (t.externalData = {
                      initiative: !0,
                    }),
                    this.id ||
                      (this.id = "pauseCustomAudio_" + new Date().getTime());
                  var w = {
                    audioElementId: this.id,
                    action: "clinetAudioPlayer",
                    isPlay: !1,
                    fileid: window.GLOBAL.fileid,
                    url: o || a,
                    pptslide: t.pptslide,
                    externalData: t.externalData,
                    currentTime: this.currentTime || 0,
                    duration: this.duration || 0,
                  };
                  i.postMessageToParent(w);
                }
                this &&
                  this._pause &&
                  "function" == typeof this._pause &&
                  this._pause.apply(this, arguments);
              }
            } else
              this &&
                this._pause &&
                "function" == typeof this._pause &&
                this._pause.apply(this, arguments);
          }.apply(this, arguments);
    };

    window.HTMLVideoElement.prototype._play =
      window.HTMLVideoElement.prototype.play;

    window.HTMLVideoElement.prototype.play = function () {
      return window.GLOBAL.isControl
        ? window.HTMLVideoElement.prototype._play.apply(this, arguments)
        : function (e, t) {
            if (
              window.GLOBAL.notPlayAV ||
              window.GLOBAL.isNotPlayVideo ||
              window.GLOBAL.playback
            );
            else if (e) {
              var i = window.GLOBAL.newPptAynamicThat.that,
                n = this;
              if (((t = t || {}), n)) {
                var o = "new_ppt_video_" + new Date().getTime();
                n.setAttribute("id", o);
                var a = n.querySelectorAll("source"),
                  r = void 0,
                  l = void 0;
                if (a && 0 < a.length) {
                  for (var d = 0; d < a.length; d++) {
                    var s = a[d];
                    s &&
                      (-1 !== s.getAttribute("type").indexOf("webm") &&
                        (r = s.getAttribute("src")),
                      -1 !== s.getAttribute("type").indexOf("mp4") &&
                        (l = s.getAttribute("src")));
                  }
                  if (!r && !l)
                    return void dynamicPptLog.error(
                      "video resouce webm url is not exist!",
                      a
                    );
                } else {
                  var c = this.getAttribute("src");
                  c &&
                    "about:blank" !== c &&
                    ((r = c.substr(c.indexOf("data"))),
                    (l = c.substr(c.indexOf("data"))));
                }
                if (r || l) {
                  var w = {
                    action: "autoPlayVideoInNewPpt",
                    videoElementId: o,
                    isvideo: !0,
                    fileid: window.GLOBAL.fileid,
                    url: r || l,
                    pptslide: t.pptslide,
                    externalData: t.externalData,
                  };
                  i.postMessageToParent(w);
                }
              }
            } else if (this && this._play && "function" == typeof this._play)
              try {
                if (!this.src || "about:blank" === this.src) {
                  var a = this.querySelectorAll("source");
                  if (!a.length) return;
                }
                var n = this,
                  p = this._play.apply(this, arguments);
                p && "function" == typeof p.then
                  ? p
                      .then(function () {
                        window.isPlayFalg = !1;
                      })
                      .catch(function (e) {
                        if (
                          (dynamicPptLog.error("视频 error---\x3e", e, n),
                          e &&
                            "object" == typeof e &&
                            "NotAllowedError" === e.name &&
                            window.isPlayFalg)
                        ) {
                          window.isPlayFalg = !1;
                          window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(
                            {
                              action: "againReconnect",
                            }
                          );
                        }
                      })
                  : (window.isPlayFalg = !1);
              } catch (e) {
                LogDevelopment.error("video player方法错误：", e);
              }
          }.apply(this, arguments);
    };

    (window.GLOBAL.newpptPresentationConnector = {}),
      (window.GLOBAL.NewPptAynamicPPT = function (e) {
        var t = this;
        this.options = e || {};
        this.isResized = !1;
        this.isOpenPptFile = !1;
        t.sendMessagePermission = !1;
        (window.GLOBAL.newPptAynamicThat = {
          that: t,
        }),
          (this.aynamicPptData = {
            old: {
              slide: null,
              step: null,
              fileid: null,
            },
            now: {
              slide: null,
              step: null,
              fileid: null,
            },
          }),
          (this.recvAynamicPptData = {
            slide: null,
            step: null,
            fileid: null,
          });
        this.recvCount = 0;
        t.newDopPresentation(e);
      }),
      (window.GLOBAL.NewPptAynamicPPT.prototype = {
        constructor: window.GLOBAL.NewPptAynamicPPT,
        newDopPresentation: function (e, t) {
          dynamicPptLog.info("newDopPresentation: ", e);
          var pptThat = window.GLOBAL.newPptAynamicThat.that;
          function c(e, t) {
            if (e)
              for (var i = e.parentNode, n = 0; n < 200; n++) {
                if (
                  !i ||
                  !/(poster|video_player|video_player poster_frame)/g.test(
                    i.className
                  )
                )
                  break;
                (i.style.display = t ? "" : "none"), (i = i.parentNode);
              }
          }

          function o(e, t) {
            var i = window.GLOBAL.browser;
            if (
              i.versions.mobile ||
              i.versions.ios ||
              i.versions.android ||
              i.versions.iPhone ||
              i.versions.iPad
            )
              if (
                i.versions.ios &&
                null != window.GLOBAL.deviceType &&
                0 == parseInt(window.GLOBAL.deviceType)
              ) {
                var n = {
                  initiative: !0,
                };
                window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                  null != t
                    ? t <= e
                      ? window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(
                          !0,
                          n
                        )
                      : e < t &&
                        window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(
                          !0,
                          n
                        )
                    : window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(
                        !0,
                        n
                      );
              } else {
                if (
                  (l = pptThat.view
                    .displayObject()
                    .querySelectorAll("video")) &&
                  0 < l.length
                )
                  for (var o = 0; o < l.length; o++) {
                    (d = l[o]) &&
                      ((d.style.display = ""),
                      (d.volume = parseFloat(window.GLOBAL.PptVolumeValue)),
                      d.load(),
                      d.play(),
                      c(d, !0));
                  }
              }
            else {
              var a = pptThat.view
                .displayObject()
                .querySelectorAll(
                  ".controls .component_container.play .component_base.play"
                );
              if (a && 0 < a.length) {
                if (
                  (l = pptThat.view
                    .displayObject()
                    .querySelectorAll("video")) &&
                  0 < l.length
                )
                  for (o = 0; o < l.length; o++) {
                    (d = l[o]) &&
                      ((d.style.display = ""),
                      (d.volume = parseFloat(window.GLOBAL.PptVolumeValue)),
                      d.load(),
                      c(d, !0));
                  }
                for (o = 0; o < a.length; o++) {
                  var r = a[o];
                  r &&
                    "false" == r.getAttribute("aria-pressed") &&
                    window.GLOBAL.fireEvent(r, "click");
                }
              } else {
                var l;
                if (
                  (l = pptThat.view
                    .displayObject()
                    .querySelectorAll("video")) &&
                  0 < l.length
                )
                  for (o = 0; o < l.length; o++) {
                    var d;
                    (d = l[o]) &&
                      ((d.style.display = ""),
                      (d.volume = parseFloat(window.GLOBAL.PptVolumeValue)),
                      d.load(),
                      d.play(),
                      c(d, !0));
                  }
              }
            }
          }

          function a() {
            var e = pptThat.view.displayObject().querySelectorAll("video");
            if (e && 0 < e.length)
              for (var t = 0; t < e.length; t++) {
                var i = e[t];
                i &&
                  (window.GLOBAL.isControl ||
                    ((i.style.display = "none"),
                    i.removeAttribute("autoplay"),
                    i.removeAttribute("preload"),
                    i.load(),
                    i.pause(),
                    (i.volume = 0),
                    c(i)));
              }
          }

          function r(e, t) {
            var i = pptThat.view.displayObject().querySelectorAll("video");
            if (0 < i.length) {
              var n = i[i.length - 1];
              if (n) {
                (n.style.display = "none"),
                  n.removeAttribute("autoplay"),
                  n.removeAttribute("preload"),
                  n.load(),
                  n.pause();
                n.volume = 0;
                var o = {
                  pptslide: e,
                  externalData: t,
                };
                n.play(!0, o), c(n);
              }
            }
          }

          function w(e, t, i) {
            if (!window.GLOBAL.notPlayAV)
              if (
                window.GLOBAL.versions &&
                2017082901 <= window.GLOBAL.versions
              )
                if (window.GLOBAL.playback) a();
                else
                  try {
                    var n = pptThat.view
                      .displayObject()
                      .querySelectorAll("video");
                    n &&
                      0 < n.length &&
                      (window.GLOBAL.classbegin
                        ? (2017091401 <= window.GLOBAL.versions &&
                            t &&
                            t.initiative &&
                            window.GLOBAL
                              .publishDynamicPptMediaPermission_video) ||
                          (2017082901 <= window.GLOBAL.versions &&
                            window.GLOBAL.versions < 2017091401 &&
                            0 == window.GLOBAL.role)
                          ? r(e, t)
                          : t && t.initiative
                          ? o(e, i)
                          : a()
                        : o(e, i));
                  } catch (e) {
                    return void dynamicPptLog.error("视频播放错误:", e);
                  }
              else window.GLOBAL.isLoadPageController && o(e, i);
          }

          function p(e, t, i) {
            return (
              e &&
                (document.getElementById(e).getCore().processTriggerEffect(i),
                document.getElementById(e).getCore().gotoSlide(t, {
                  initiative: !0,
                })),
              !1
            );
          }

          pptThat.options = e || pptThat.options;
          pptThat.playbackController = null;
          pptThat.slidesCount = null;
          pptThat.isPlayedPresentation = null;
          pptThat.view = null;
          pptThat.presentation = null;
          pptThat.needUpdateSlideAndStep = !1;
          pptThat.isOpenPptFile = !0;
          window.GLOBAL.newpptPresentationConnector.register = function (e, t) {
            try {
              dynamicPptLog.log("receive player and newppt:", e, t);
              pptThat.presentation = e.presentation();
              pptThat.slidesCount = pptThat.presentation.slides().count();
              pptThat.view = e.view();
              pptThat.viewData = {
                width: pptThat.view.width(),
                height: pptThat.view.height(),
              };
              pptThat.playbackController = pptThat.view.restrictedPlaybackController();
              pptThat.slideTransitionController = pptThat.playbackController.slideTransitionController();

              function getStepTotal() {
                var a = null;
                if (
                  pptThat.playbackController &&
                  pptThat.playbackController.currentSlide
                )
                  try {
                    var r = pptThat.playbackController.currentSlide();
                    if (r && r.animationSteps) {
                      var l = r.animationSteps();
                      r && r.animationSteps && (a = l.count());
                    }
                  } catch (e) {
                    dynamicPptLog.error(
                      "that.playbackController.currentSlide error:",
                      e
                    );
                  }
                return a;
              }

              function initEvent() {
                var d = {
                  action: "initEvent",
                  view: pptThat.viewData,
                  slidesCount: pptThat.slidesCount,
                  slide: 0,
                  step: 0,
                  stepTotal: getStepTotal(0),
                  externalData: t,
                };

                dynamicPptLog.log("initEvent", d);
                pptThat.postMessageToParent(d);
                pptThat.aynamicPptData.now.slide = 0;
                pptThat.aynamicPptData.now.step = 0;

                pptThat.isLoadFinshed = !0;
              }

              var init = function () {
                try {
                  if (
                    pptThat.playbackController &&
                    pptThat.playbackController.slideChangeEvent
                  ) {
                    pptThat.playbackController
                      .slideChangeEvent()
                      .removeHandler(function (e) {});
                    pptThat.playbackController
                      .slideChangeEvent()
                      .addHandler(function (slideIndex) {
                        window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray = [];
                        window.dynamicPptLog.log(
                          "ChangeEvent slideChangeEvent slideIndex and externalData:",
                          t
                        );
                        function initAllHref() {
                          try {
                            var displayObject = pptThat.view.displayObject(),
                              allAEle = displayObject.querySelectorAll("a");
                            if (allAEle && 0 < allAEle.length)
                              for (var i = 0; i < allAEle.length; i++) {
                                var itemA = allAEle[i];
                                if (
                                  itemA.attributes.onclick &&
                                  /#$/g.test(itemA.href)
                                ) {
                                  var nodeValue =
                                      itemA.attributes.onclick.nodeValue,
                                    reg = /gotoSlide\(\d{1,}\)/;
                                  if (reg.test(nodeValue)) {
                                    var r = nodeValue.match(/\'[\w]+\'/)[0],
                                      l = r.substring(1, r.length - 1),
                                      d = nodeValue
                                        .match(reg)[0]
                                        .match(/\d{1,}/)[0];
                                    (itemA.onclick = null),
                                      (function (e, t, i) {
                                        e.onclick = function (e) {
                                          return p(t, i, this), !1;
                                        };
                                      })(itemA, l, d);
                                  }
                                }
                              }
                          } catch (e) {
                            window.dynamicPptLog.error(
                              "resetGotoSlide error:",
                              e
                            );
                          }
                        }
                        initAllHref();

                        if (pptThat.isOpenPptFile) {
                          var timestamp = pptThat.playbackController
                              .clock()
                              .timestamp(),
                            stepIndex = timestamp.stepIndex(),
                            currentSlideIndex = pptThat.nowSlideIndex;
                          pptThat.nowSlideIndex = slideIndex;
                          stepIndex = 0 <= stepIndex ? stepIndex : 0;
                          var stepTotal = null;
                          if (
                            pptThat.playbackController &&
                            pptThat.playbackController.currentSlide
                          )
                            try {
                              var currentSlide = pptThat.playbackController.currentSlide();
                              if (currentSlide && currentSlide.animationSteps) {
                                var animationSteps = currentSlide.animationSteps();
                                stepTotal = animationSteps.count();
                              }
                            } catch (e) {
                              dynamicPptLog.error(
                                "that.playbackController.currentSlide error:",
                                e
                              );
                            }
                          if (pptThat.isLoadFinshed) {
                            try {
                              var data = {
                                action: "slideChangeEvent",
                                slide: slideIndex,
                                step: stepIndex,
                                stepTotal: stepTotal,
                                externalData: { initiative: true },
                              };
                              if (
                                !(
                                  pptThat.aynamicPptData.now.slide ==
                                    slideIndex &&
                                  pptThat.aynamicPptData.now.step == stepIndex
                                )
                              ) {
                                pptThat.postMessageToParent(data);
                                pptThat.videoPlayPPTTimerNum = 0;
                                clearInterval(pptThat.videoPlayPPTTimer);
                                m();
                                pptThat.videoPlayPPTTimer = setInterval(
                                  function () {
                                    pptThat.videoPlayPPTTimerNum++;
                                    var playbackState = pptThat.playbackController.playbackState();
                                    dynamicPptLog.log(
                                      "slide setInterval  videoPlayPPTTimerNum 、 playbackState、slideTransitionControllerState:",
                                      pptThat.videoPlayPPTTimerNum,
                                      playbackState,
                                      pptThat.slideTransitionController.state()
                                    );
                                    if (
                                      /(playingSlide|pausedSlide|suspended)/g.test(
                                        playbackState
                                      ) &&
                                      "playing" !==
                                        pptThat.slideTransitionController.state()
                                    ) {
                                      m();
                                      w(
                                        slideIndex,
                                        { initiative: true },
                                        currentSlideIndex
                                      );
                                      setMediaVolume();
                                      clearInterval(pptThat.videoPlayPPTTimer);
                                      pptThat.videoPlayPPTTimerNum = 0;
                                    } else if (
                                      30 < pptThat.videoPlayPPTTimerNum
                                    ) {
                                      clearInterval(pptThat.videoPlayPPTTimer);
                                      pptThat.videoPlayPPTTimerNum = 0;
                                    }
                                  },
                                  300
                                );
                              }
                            } catch (e) {
                              dynamicPptLog.error("OnSlideChange", e);
                            }
                          }
                          pptThat.aynamicPptData.now.slide = slideIndex;
                          pptThat.aynamicPptData.now.step =
                            0 <= stepIndex ? stepIndex : 0;
                        }
                        pptThat.canJumpToAnim();
                      });
                  }

                  if (
                    pptThat.playbackController &&
                    pptThat.playbackController.stepChangeEvent
                  ) {
                    pptThat.playbackController
                      .stepChangeEvent()
                      .removeHandler(function (e) {});
                    pptThat.playbackController
                      .stepChangeEvent()
                      .addHandler(function (stepIndex) {
                        dynamicPptLog.log(
                          "ChangeEvent stepChangeEvent stepIndex and externalData:",
                          stepIndex,
                          pptThat.isOpenPptFile
                        );
                        if (pptThat.isOpenPptFile) {
                          var timestamp = pptThat.playbackController
                              .clock()
                              .timestamp(),
                            slideIndex = timestamp.slideIndex(),
                            stepTotal = null;
                          if (
                            pptThat.playbackController &&
                            pptThat.playbackController.currentSlide
                          )
                            try {
                              var currentSlide = pptThat.playbackController.currentSlide();
                              if (currentSlide && currentSlide.animationSteps) {
                                var animationSteps = currentSlide.animationSteps();
                                stepTotal = animationSteps.count();
                              }
                            } catch (e) {
                              dynamicPptLog.error(
                                "that.playbackController.currentSlide error:",
                                e
                              );
                            }
                          if (
                            ((stepIndex = 0 <= stepIndex ? stepIndex : 0),
                            (pptThat.OnMovToPrvAnimTimer =
                              pptThat.OnMovToPrvAnimTimer || null),
                            pptThat.isLoadFinshed)
                          ) {
                            try {
                              if (
                                !(
                                  pptThat.aynamicPptData.now.slide ==
                                    slideIndex &&
                                  pptThat.aynamicPptData.now.step == stepIndex
                                )
                              ) {
                                var data = {
                                  action: "stepChangeEvent",
                                  slide: slideIndex,
                                  step: stepIndex,
                                  stepTotal: stepTotal,
                                  externalData: { initiative: true },
                                };
                                console.log("step-change-//////");
                                pptThat.postMessageToParent(data);
                              }
                            } catch (e) {
                              dynamicPptLog.error("OnMovToPrvAnim", e);
                            }
                            pptThat.remoteActionDataJson &&
                              pptThat.remoteActionDataJson[
                                "remoteActionData_" + slideIndex
                              ] &&
                              0 <
                                pptThat.remoteActionDataJson[
                                  "remoteActionData_" + slideIndex
                                ].length &&
                              pptThat.remoteActionDataArrHandler(
                                pptThat.remoteActionDataJson[
                                  "remoteActionData_" + slideIndex
                                ]
                              );
                          }
                          pptThat.aynamicPptData.now.slide = slideIndex;
                          pptThat.aynamicPptData.now.step =
                            0 <= stepIndex ? stepIndex : 0;
                        }
                        pptThat.canJumpToAnim();
                      });
                  }

                  if (
                    pptThat.playbackController &&
                    pptThat.playbackController.navigationRestrictedEvent
                  ) {
                    pptThat.playbackController
                      .navigationRestrictedEvent()
                      .addHandler(function (e) {
                        window.dynamicPptLog.log(
                          "Navigation action",
                          e.navigationAction(),
                          "is restricted by",
                          e.restrictionSource(),
                          "for the following reason:",
                          e.restrictionReason().type()
                        );
                      });
                  }
                  if (
                    pptThat.playbackController &&
                    pptThat.playbackController.playbackCompleteEvent
                  ) {
                    pptThat.playbackController
                      .playbackCompleteEvent()
                      .addHandler(function (e) {
                        window.dynamicPptLog.log(
                          "Presentation playback has been completed."
                        ),
                          pptThat.canJumpToAnim();
                      });
                  }

                  var clock = pptThat.playbackController.clock();
                  clock.stateChangeEvent().addHandler(function (e) {
                    window.dynamicPptLog.log(
                      "Clock state has been changed to",
                      e.state()
                    );
                    pptThat.canJumpToAnim();
                  });
                  clock.stopEvent().addHandler(function (e) {
                    var t = e.timestamp();
                    window.dynamicPptLog.log(
                      "Clock has been stopped at slide:",
                      t.slideIndex(),
                      "step:",
                      t.stepIndex(),
                      "time offset:",
                      t.timeOffset()
                    );
                    pptThat.canJumpToAnim();
                  });
                  clock.bufferStateChangeEvent().addHandler(function (e) {
                    window.dynamicPptLog.log(
                      "Clock buffering state has been changed to",
                      e.buffering()
                    );
                    pptThat.canJumpToAnim();
                  });
                  clock.startEvent().addHandler(function (e) {
                    var t = e.timestamp();
                    window.dynamicPptLog.log(
                      "Clock has been started at slide:",
                      t.slideIndex(),
                      "step:",
                      t.stepIndex(),
                      "time offset:",
                      t.timeOffset()
                    );
                    pptThat.canJumpToAnim();
                  });

                  pptThat.playbackController
                    .navigationRestrictedEvent()
                    .addHandler(function (e) {
                      window.dynamicPptLog.log(
                        "Navigation action",
                        e.navigationAction(),
                        "is restricted by",
                        e.restrictionSource(),
                        "for the following reason:",
                        e.restrictionReason().type()
                      );
                    });
                  pptThat.slideTransitionController
                    .transitionEffectCompleteEvent()
                    .addHandler(function (e) {
                      window.dynamicPptLog.log(
                        "Transition to slide #" + e + " has been completed."
                      );
                      pptThat.canJumpToAnim();
                    });
                  pptThat.slideTransitionController
                    .transitionEffectStartEvent()
                    .addHandler(function (e) {
                      window.dynamicPptLog.log(
                        "Transition to slide #" + e + " has been started."
                      );
                    });
                } catch (e) {
                  dynamicPptLog.error(
                    "initPlaybackControllerEventsHandlers error:",
                    e
                  );
                }
              };

              initEvent();
              init();
              m(!0);
            } catch (e) {
              dynamicPptLog.error("register error:", e);
            }
          };

          pptThat.clearOldSlideInfo = function () {
            a();
          };

          pptThat.closeDynamicPptAutoVideo = function () {
            a();
          };

          pptThat.classBeginCheckAutoPlay = function (e, t) {
            if (0 == window.GLOBAL.role && window.GLOBAL.classbegin) {
              if (void 0 === e)
                e = pptThat.playbackController.clock().timestamp().slideIndex();
              (t = t || {
                initiative: !0,
              }),
                a(),
                r(e, t);
            }
          };

          return pptThat;
        },
        jumpToAnim: function (e, t, i, n, o) {
          try {
            var a,
              r,
              l = window.GLOBAL.newPptAynamicThat.that;
            (l.jumpToAnimData = null),
              (a = 0 <= (a = e - 1) ? a : 0),
              (r = 0 <= (r = t) ? r : 0),
              (i = null != i ? i : 0),
              (n = null == n || n);
            var d = l.playbackController.clock().timestamp(),
              s = d.slideIndex(),
              c = 0 <= d.stepIndex() ? d.stepIndex() : 0;

            dynamicPptLog.log(
              "nowSlideIndex and nowStepIndex:",
              s,
              c,
              "\n slideIndex and stepIndex:",
              a,
              r
            );
            if (a === s && r === c) {
              try {
                var w = null;
                if (l.playbackController && l.playbackController.currentSlide) {
                  try {
                    var p = l.playbackController.currentSlide();
                    if (p && p.animationSteps) {
                      var m = p.animationSteps();
                      p && p.animationSteps && (w = m.count());
                    }
                  } catch (e) {
                    dynamicPptLog.error(
                      "that.playbackController.currentSlide error:",
                      e
                    );
                  }
                }

                var u = {
                  action: "slideChangeEvent",
                  slide: a,
                  step: r,
                  stepTotal: w,
                  externalData: o,
                };
                l.postMessageToParent(u),
                  (l.aynamicPptData.now.slide = a),
                  (l.aynamicPptData.now.step = 0 <= r ? r : 0);
              } catch (e) {
                dynamicPptLog.error("notJumpToAnim error:", e);
              }
              return;
            }
            null != e && null != t
              ? s === a
                ? 0 <= r && 0 <= c
                  ? r - c == 1
                    ? (dynamicPptLog.log("执行jumpToAnim--\x3egotoNextStep"),
                      l.playbackController.gotoNextStep(o))
                    : c - r == 1
                    ? (dynamicPptLog.log(
                        "执行jumpToAnim--\x3egotoPreviousStep"
                      ),
                      l.playbackController.gotoPreviousStep(o))
                    : (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      l.playbackController.gotoTimestamp(a, r, i, n, o))
                  : (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                    l.playbackController.gotoTimestamp(a, r, i, n, o))
                : (l.remoteActionDataJson &&
                    l.remoteActionDataJson["remoteActionData_" + a] &&
                    0 <
                      l.remoteActionDataJson["remoteActionData_" + a].length &&
                    (l.remoteActionDataJson[
                      "remoteActionData_" + a
                    ].length = 0),
                  a - s == 1 && 0 === r
                    ? (dynamicPptLog.log("执行jumpToAnim--\x3egotoNextSlide"),
                      window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      l.playbackController.gotoNextSlide(n, o))
                    : s - a == 1 && 0 === r
                    ? (dynamicPptLog.log(
                        "执行jumpToAnim--\x3egotoPreviousSlide"
                      ),
                      window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      l.playbackController.gotoPreviousSlide(n, o))
                    : (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      l.playbackController.gotoTimestamp(a, r, i, n, o)))
              : null != e
              ? (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                l.playbackController.gotoSlide(a, n, o))
              : dynamicPptLog.error("slide 和 step必须有值");
          } catch (e) {
            dynamicPptLog.error("jumpToAnim error:", e);
          }
        },
        canJumpToAnim: function () {
          var e = this,
            t = e.playbackController.playbackState();
          dynamicPptLog.log(
            "canJumpToAnim 当前状态(playbackState and slideTransitionControllerState )：",
            t,
            e.slideTransitionController.state(),
            e.jumpToAnimData
              ? JSON.stringify(e.jumpToAnimData)
              : e.jumpToAnimData
          ),
            e.jumpToAnimData &&
              /(playingSlide|pausedSlide|suspended|buffering)/g.test(t) &&
              "playing" !== e.slideTransitionController.state() &&
              e.jumpToAnim(
                e.jumpToAnimData.slide,
                e.jumpToAnimData.step,
                e.jumpToAnimData.timeOffset,
                e.jumpToAnimData.autoStart,
                e.jumpToAnimData.externalData
              );
        },
        postMessageToParent: function (e) {
          dynamicPptLog.info(
            "postMessageToParent-e",
            e,
            window.GLOBAL.extraInfo
          );
          window.GLOBAL.updateLocalPage(e, window.GLOBAL.allowLocalKeyCode);
          if (window.parent && window.parent !== window)
            try {
              var t = {
                source: "tk_dynamicPPT",
                data: Object.assign({}, e, {
                  extraInfo: window.GLOBAL.extraInfo,
                }),
              };
              (t = JSON.stringify(t)), window.parent.postMessage(t, "*");
            } catch (e) {
              dynamicPptLog.error("that.postMessageToParent error:", e);
            }
        },
        clickNewpptVideoEventHandler: function (e) {
          window.GLOBAL.isControl &&
            (document.getElementsByTagName("video")[0].currentTime =
              e.currentTime);
        },
        clickNewpptTriggerEventHandler: function (e) {
          var t = this;
          t.playbackController.clock().timestamp().slideIndex();
          (t.remoteActionDataJson = t.remoteActionDataJson || {}),
            (t.remoteActionDataJson["remoteActionData_" + e.slide] =
              t.remoteActionDataJson["remoteActionData_" + e.slide] || []),
            t.remoteActionDataJson["remoteActionData_" + e.slide].push(e);
          var i = t.remoteActionDataJson["remoteActionData_" + e.slide];
          t.remoteActionDataArrHandler(i);
        },
        remoteActionDataArrHandler: function (e) {
          for (var t = 0; t < e.length; t++) {
            var i,
              n = e[t];
            if (
              ((i = this.view
                .displayObject()
                .querySelectorAll("#" + n.triggerElementId)),
              dynamicPptLog.log(
                "clickNewpptTriggerEvent handler element:",
                n.triggerElementId,
                i
              ),
              i && 0 < i.length)
            )
              if (
                i.length &&
                i[0].children.length &&
                i[0].children[0].tagName === "svg"
              ) {
                i = this.view
                  .displayObject()
                  .querySelectorAll("#" + n.triggerElementId + " svg path");
              }
            console.log("remoteActionDataArrHandler: ", i);
            for (t = 0; t < i.length; t++) {
              var o = i[t];
              // if (n.childElementTagName && (o = o.getElementsByTagName(n.childElementTagName)[0]), "video" === o.nodeName.toLowerCase()) return;
              // if (o.getElementsByTagName("video") && 0 < o.getElementsByTagName("video").length) return;
              var a = "click";
              window.GLOBAL.fireEvent(o, a);
              a = "touchstart";
              window.GLOBAL.fireEvent(o, a);
              a = "touchend";
              window.GLOBAL.fireEvent(o, a);
            }
          }
          e.length = 0;
        },
      });

    window.GLOBAL.ServiceNewPptAynamicPPT = new window.GLOBAL.NewPptAynamicPPT();

    // uskid add
    window.GLOBAL.actionHandlerFunction = function (e) {
      try {
        dynamicPptLog.info("???-", e.action);
        switch (e.action) {
          case "setCursor":
            if (window.GLOBAL.isControl) {
              var t = e.iconUrl || "",
                i = e.offsetX || 0,
                n = e.offsetY || 0;
              (
                document.getElementById("playerView") || document.body
              ).style.cursor = "url(" + t + ") " + i + " " + n + ",auto";
            }
            break;
          case "allowUserControl":
            window.GLOBAL.uskidControlMask(e.allow);
            break;
          case "slideChangeEvent":
          case "stepChangeEvent":
            if (e) {
              window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
              console.log(
                window.GLOBAL.ServiceNewPptAynamicPPT.aynamicPptData.now,
                e
              );

              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoTimestamp(
                e.slide,
                e.step,
                0,
                !0,
                {
                  initiative: e.initiative || !0,
                }
              );

              // if (window.GLOBAL.ServiceNewPptAynamicPPT.aynamicPptData.now.slide <= e.slide) {
              //   console.log('自动跳转')

              //   window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.play()
              // } else {
              //   console.log('上一步跳')
              //   window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(e.autoStart, {
              //     initiative: e.initiative || !0
              //   });
              //   window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.play()
              // }
              window.GLOBAL.uskidControlMask(window.GLOBAL.allowControl);
            }
            break;
          case "gotoFirstSlide":
            window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoFirstSlide();
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.play();
            window.GLOBAL.uskidControlMask(window.GLOBAL.allowControl);
            break;
          case "gotoEndSlide":
            window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoLastSlide();
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.play();
            window.GLOBAL.uskidControlMask(window.GLOBAL.allowControl);
            break;
          case "fullscreen":
            break;
          case "stopDynamicPpt":
            if (
              (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.pause(),
              (a = window.GLOBAL.saveAudioSrc) && 0 < a.length)
            )
              for (var o = 0; o < a.length; o++) {
                if ((l = a[o]).isActive) (r = l.ele).pause();
              }
            break;
          case "playDynamicPpt":
            var a;
            if (
              (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.play(
                !1
              ),
              (a = window.GLOBAL.saveAudioSrc) && 0 < a.length)
            )
              for (o = 0; o < a.length; o++) {
                var r;
                if ((l = a[o]).isActive)
                  (r = l.ele).currentTime < r.duration && l.ele.play();
              }
            break;
          case "gotoPreviousStep":
            var u,
              L = (u = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController
                .clock()
                .timestamp()).stepIndex(),
              P = document.getElementsByTagName("video");
            // fix add
            m = {
              initiative: e.initiative || !0,
            };
            if (L <= 0 || (P && 0 < P.length)) {
              var A = !0;
              window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(
                A,
                m
              );
            } else {
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousStep(
                m
              );
            }
            window.GLOBAL.uskidControlMask(window.GLOBAL.allowControl);
            break;
          case "gotoNextStep":
            m = {
              initiative: e.initiative || !0,
            };
            if ((P = document.getElementsByTagName("video")) && 0 < P.length) {
              A = !0;
              window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(
                A,
                m
              );
            } else {
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextStep(
                m
              );
            }
            window.GLOBAL.uskidControlMask(window.GLOBAL.allowControl);
            break;
          case "gotoPreviousSlide":
            m = {
              initiative: !0,
            };
            window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(
              e.autoStart,
              m
            );
            break;
          case "gotoNextSlide":
            m = {
              initiative: !0,
            };
            window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
            window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(
              e.autoStart,
              m
            );
            break;
          case "resizeHandler":
            dynamicPptLog.log(
              "resizeHandler width and height:",
              e.width,
              e.height
            );
            window.GLOBAL.ServiceNewPptAynamicPPT.view.resize(
              e.width,
              e.height
            ),
              setTimeout(function () {
                window.GLOBAL.fireEvent(window, "resize");
              }, 250);
            break;
          case "clickNewpptTriggerEvent":
            window.GLOBAL.ServiceNewPptAynamicPPT.clickNewpptTriggerEventHandler(
              e
            );
            break;
          case "userTriggerAudio":
            var l;
            if (document.getElementById("testAudio"))
              document.getElementById("testAudio").play(),
                document.body.removeChild(document.getElementById("testAudio"));
            else
              ((l = document.createElement("audio")).id = "testAudio"),
                (l.src = locationOrigin + "/class/ispring/test.mp3"),
                document.body.appendChild(l),
                l.play(),
                document.body.removeChild(l);
            var d = (u = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController
                .clock()
                .timestamp()).slideIndex(),
              s = u.stepIndex();
            window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoTimestamp(
                d,
                s
              );
            break;
          case "startPlayVideoEvent":
            if (window.GLOBAL.isControl) {
              window.GLOBAL.videoInitiative = e.externalData.initiative;
              var c = document.getElementsByTagName("video")[0];
              if (window.GLOBAL.isMobile()) {
                if ("play" == e.videoStatus)
                  (w = c.parentNode).classList.contains("iphone") &&
                    w.classList.remove("video_player"),
                    c.play();
                else c.pause();
              } else {
                var w,
                  p = (w = c.parentNode)
                    .getElementsByClassName("component_container")[0]
                    .getElementsByClassName("component_base")[0];
                "play" == e.videoStatus
                  ? (w.classList.remove("poster_frame"),
                    p.classList.add("selected"),
                    c.play())
                  : (p.classList.remove("selected"), c.pause());
              }
            }
            break;
          case "getVideoData":
            if (window.GLOBAL.isControl)
              if (
                (c = document.getElementsByTagName("video")) &&
                0 < c.length
              ) {
                e = {
                  action: "getVideoData",
                  currentTime: c[0].currentTime,
                  duration: c[0].duration,
                  externalData: {
                    initiative: !1,
                  },
                };
                window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(e);
              }
            break;
          case "clickNewpptVideoEvent":
            if (window.GLOBAL.isControl) {
              window.GLOBAL.ServiceNewPptAynamicPPT.clickNewpptVideoEventHandler(
                e
              );
            }
            break;
          case "jumpToAnim":
            window.GLOBAL.ServiceNewPptAynamicPPT.jumpToAnimData = e.data || {};
            var m = {
              initiative:
                window.GLOBAL.ServiceNewPptAynamicPPT.jumpToAnimData.initiative,
            };
            window.GLOBAL.ServiceNewPptAynamicPPT.jumpToAnimData.externalData = m;
            window.GLOBAL.ServiceNewPptAynamicPPT.canJumpToAnim();
            break;
          // ??
          case "changeClassBegin":
            window.GLOBAL.classbegin = e.classbegin;
            break;
          // ??
          case "changePublishDynamicPptMediaPermission_video":
            window.GLOBAL.publishDynamicPptMediaPermission_video =
              e.publishDynamicPptMediaPermission_video;
            break;
          // ??
          case "closeDynamicPptAutoVideo":
            window.GLOBAL.ServiceNewPptAynamicPPT.closeDynamicPptAutoVideo();
            break;
          // ??
          case "classBeginCheckAutoPlay":
            window.GLOBAL.ServiceNewPptAynamicPPT.classBeginCheckAutoPlay();
            break;
          // ??
          case "changeDynamicPptActionClick":
            window.GLOBAL.dynamicPptActionClick = e.dynamicPptActionClick;
            window.GLOBAL.dynamicPptActionClick
              ? (v.style.display = "none")
              : (v.style.display = "block");
            break;
          case "PptVolumeControl":
            (window.GLOBAL.PptVolumeValue = parseFloat(e.volumeValue)),
              setMediaVolume();
            break;
          case "ExtendedNotice":
            e.extendedData &&
              "updateMute" === e.extendedData.type &&
              e.extendedData.data &&
              ((window.GLOBAL.PptVolumeMute = e.extendedData.data.mute),
              setMediaVolume());
        }
      } catch (e) {
        dynamicPptLog.error("actionHandlerFunction error:", e);
      }
    };

    (document.oncontextmenu = null),
      (document.oncontextmenu = function () {
        return !1;
      });

    // 事件监听
    // document.removeEventListener('keyup', keyCodeFunc)
    // document.addEventListener('keyup', keyCodeFunc)
    document.removeEventListener("keydown", keyCodeFunc);
    document.addEventListener("keydown", keyCodeFunc);
    window.GLOBAL.removeEvents(window, "message", messageFunc);
    window.GLOBAL.addEvents(window, "message", messageFunc);
    if (!!window.GLOBAL.onlyAllowTouchEvent) {
      document.addEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("click", clickElementFunc);
    } else {
      // document.addEventListener("touchstart", onTouchStart, true);
      // document.addEventListener("touchend", clickElementFunc, false);
      document.addEventListener("click", clickElementFunc, true);
    }

    window.GLOBAL.newpptPresentationConnector.register(e);
  };
};
