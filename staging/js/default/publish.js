/*! version 1.7.3 - Wed Feb 18 2015 11:53:40 GMT+0100 (CET). Author: Scott van Looy scott.vanlooy@akqa.com. (C) Copyright AKQA 2012-2015. All Rights Reserved. */
function MarkerClusterer(g, f, j) {
    this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = g, this.markers_ = [], this.clusters_ = [], this.sizes = [53, 56, 66, 78, 90], this.styles_ = [], this.ready_ = !1;
    var i = j || {};
    this.gridSize_ = i.gridSize || 60, this.minClusterSize_ = i.minimumClusterSize || 2, this.maxZoom_ = i.maxZoom || null, this.styles_ = i.styles || [], this.imagePath_ = i.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, this.imageExtension_ = i.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, this.zoomOnClick_ = !0, void 0 != i.zoomOnClick && (this.zoomOnClick_ = i.zoomOnClick), this.averageCenter_ = !1, void 0 != i.averageCenter && (this.averageCenter_ = i.averageCenter), this.setupStyles_(), this.setMap(g), this.prevZoom_ = this.map_.getZoom();
    var h = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function() {
        var e = h.map_.getZoom(), d = h.map_.minZoom || 0, k = Math.min(h.map_.maxZoom || 100, h.map_.mapTypes[h.map_.getMapTypeId()].maxZoom);
        e = Math.min(Math.max(e, d), k), h.prevZoom_ != e && (h.prevZoom_ = e, h.resetViewport())
    }), google.maps.event.addListener(this.map_, "idle", function() {
        h.redraw()
    }), f && (f.length || Object.keys(f).length) && this.addMarkers(f, !1)
}
function Cluster(b) {
    this.markerClusterer_ = b, this.map_ = b.getMap(), this.gridSize_ = b.getGridSize(), this.minClusterSize_ = b.getMinClusterSize(), this.averageCenter_ = b.isAverageCenter(), this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, b.getStyles(), b.getGridSize())
}
function ClusterIcon(e, d, f) {
    e.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = d, this.padding_ = f || 0, this.cluster_ = e, this.center_ = null, this.map_ = e.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(this.map_)
}
function _handleMultipleEvents(f, e, h, g) {
    vjs.arr.forEach(h, function(a) {
        f(e, a, g)
    })
}
function _logType(g, f) {
    var j, i, h;
    j = Array.prototype.slice.call(f), i = function() {
    }, h = window.console || {log: i, warn: i, error: i}, g ? j.unshift(g.toUpperCase() + ":") : g = "log", vjs.log.history.push(j), j.unshift("VIDEOJS:"), h[g].apply ? h[g].apply(h, j) : h[g](j.join(" "))
}
/*!
 * videojs-playlists - Playlists done right for Videojs
 * v0.1.1
 * 
 * copyright Antonio Laguna 2013
 * MIT License
 */
function playList(f, e) {
    var h = this;
    h.pl = h.pl || {};
    var g = parseInt(f, 10);
    return h.pl._guessVideoType = function(i) {
        var d = {webm: "video/webm", mp4: "video/mp4", m4v: "video/mp4", ogv: "video/ogg"}, j = i.split(".").pop();
        return d[j] || ""
    }, h.pl.init = function(d, c) {
        c = c || {}, h.pl.videos = [], h.pl.current = 0, h.on("ended", h.pl._videoEnd), c.getVideoSource && (h.pl.getVideoSource = c.getVideoSource), h.pl._addVideos(d)
    }, h.pl._updatePoster = function(b) {
        h.poster(b), h.removeChild(h.posterImage), h.posterImage = h.addChild("posterImage")
    }, h.pl._addVideos = function(i) {
        for (var c = 0, m = i.length;
                m > c;
                c++) {
            for (var l = [], k = 0, j = i[c].src.length;
                    j > k;
                    k++) {
                l.push({type: h.pl._guessVideoType(i[c].src[k]), src: i[c].src[k]})
            }
            i[c].src = l, h.pl.videos.push(i[c])
        }
    }, h.pl._nextPrev = function(i) {
        var c, k;
        if ("next" === i ? (c = h.pl.videos.length - 1, k = 1) : (c = 0, k = -1), h.pl.current !== c) {
            var j = h.pl.current + k;
            h.pl._setVideo(j), h.trigger(i, [h.pl.videos[j]])
        }
    }, h.pl._setVideo = function(b) {
        b < h.pl.videos.length && (h.pl.current = b, h.pl.currentVideo = h.pl.videos[b], h.paused() || h.pl._resumeVideo(), h.pl.getVideoSource ? h.pl.getVideoSource(h.pl.videos[b], function(d, c) {
            h.pl._setVideoSource(d, c)
        }) : h.pl._setVideoSource(h.pl.videos[b].src, h.pl.videos[b].poster))
    }, h.pl._setVideoSource = function(d, c) {
        h.src(d), h.pl._updatePoster(c)
    }, h.pl._resumeVideo = function() {
        h.one("loadstart", function() {
            h.play()
        })
    }, h.pl._videoEnd = function() {
        h.pl.current === h.pl.videos.length - 1 ? h.trigger("lastVideoEnded") : (h.pl._resumeVideo(), h.next())
    }, f instanceof Array ? (h.pl.init(f, e), h.pl._setVideo(0), h) : g === g ? (h.pl._setVideo(g), h) : "string" == typeof f && "undefined" != typeof h.pl[f] ? (h.pl[f].apply(h), h) : void 0
}
!function() {
    function d(f) {
        function e(aC) {
            function aB() {
                a = setTimeout(function() {
                    clearTimeout(aw), aC.horizontal = !aC.horizontal, aC.vertical = !aC.vertical, aw = setTimeout(aa, 1000)
                }, 200)
            }
            var aA, az, ay, ax, aw, av, au, at, ar, aq, ap, ao, an = "mouseup touchend mouseleave", am = "mousedown touchstart", al = "mousemove touchmove", ak = 350, aj = aC.swipeDistance || 50, ai = {x: 0, y: 0}, ah = {x: 0, y: 0}, ag = {}, af = {}, ae = aC.inertia ? "boolean" == typeof aC.inertia ? 200 : aC.inertia : !1, ad = aC.scrollSpeed || 500, ac = function(b) {
                return"string" == typeof b.MozTransform ? {j: "Moz", c: "-moz-"} : "string" == typeof b.WebkitTransform ? {j: "Webkit", c: "-webkit-"} : "string" != typeof b.msTransform && "string" != typeof b.MsTransform || /MSIE 9/.test(navigator.appVersion) ? "string" == typeof b.transform ? {j: "", c: ""} : {j: null, c: null} : {j: "ms", c: "-ms-"}
            }(document.body.style), ab = aC.node.find(".slide").length ? aC.node.find(".slide").parent().length ? aC.node.find(".slide").parent()[0] : aC.node.find(".slide")[0] : aC.node[0], aa = function(b) {
                return clearTimeout(aw), ax = ((b || {}).x || aC.boundsX || aC.node.width() + 20) - aC.node.parent().width(), av = ((b || {}).y || aC.boundsY || aC.node.height() + 20) - aC.node.parent().height(), ab
            }, Z = function(b, i) {
                var h = aC.horizontal || i ? b.pageX || ((b.touches || (b.originalEvent || {}).touches || [])[0] || {}).pageX || 0 : 0, g = aC.vertical || i ? b.pageY || ((b.touches || (b.originalEvent || {}).touches || [])[0] || {}).pageY || 0 : 0;
                return{x: h, y: g}
            }, Y = function(b) {
                var h, g = Math.abs;
                if (h = Z(b, !0), aC.horizontal && g(ag.x - h.x) > 15 || aC.vertical && g(ag.y - h.y) > 15) {
                    if (g(ag.x - h.x) > g(ag.y - h.y)) {
                        if (aC.horizontal) {
                            return !0
                        }
                    } else {
                        if (aC.vertical) {
                            return !0
                        }
                    }
                }
                return !1
            }, X = function(g, r, q, p) {
                var o, n, m, i;
                (az || q) && (n = {x: ah.x - g.x, y: ah.y - g.y}, q && (n = g), n.x > ax && (n.x = ax, o = !0), n.x < 0 && (n.x = 0, o = !0), n.y > av && (n.y = av, o = !0), n.y < 0 && (n.y = 0, o = !0), m = -(n.x || 0), i = -(n.y || 0), ac.j ? ab.style[ac.j + "Transform"] = "Webkit" === ac.j ? "translate3d(" + m + "px, " + i + "px, 0)" : "translate(" + m + "px, " + i + "px)" : q && 0 !== p ? f(ab).animate({left: m + "px", top: i + "px"}, p) : (ab.style.left = m + "px", ab.style.top = i + "px"), ai = n)
            }, W = function(b, g) {
                return ab.style[ac.j + "Transition"] = ac.c + "transform " + (g || ad) + "ms " + (aC.easing || "ease-out"), X(b, null, !0, g || ad), ab
            }, V = function(b, h, g) {
                if ((new Date).getTime() - b.getTime() < ak) {
                    if (aC.horizontal && Math.abs(h.x - g.x) > aj) {
                        return h.x > g.x ? 1 : -1
                    }
                    if (aC.vertical && Math.abs(h.y - g.y) > aj) {
                        return h.y > g.y ? 1 : -1
                    }
                }
                return !1
            }, U = function() {
                ap ? (ap.x = aq.x - ai.x, ap.y = aq.y - ai.y) : ap = {x: 0, y: 0}, aq = ai
            }, T = function() {
                if (clearInterval(ar), ae && ap) {
                    var h = Math.abs(ap.x), g = Math.abs(ap.y), j = ap.x, i = ap.y;
                    (h > 5 || g > 5) && (h > 200 || g > 200 ? W({x: -j * (ae / 200) * 3 + ai.x, y: -i * (ae / 200) * 3 + ai.y}, 3 * ae) : h > 150 || g > 150 ? W({x: -j * (ae / 200) * 2 + ai.x, y: -i * (ae / 200) * 2 + ai.y}, 2 * ae) : W({x: -j * (ae / 200) + ai.x, y: -i * (ae / 200) + ai.y}, ae)), ap = null
                }
            }, S = function(b) {
                if (aC.lockscroll && b.preventDefault(), !(au || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints && !b.isPrimary)) {
                    ay = !0, aA = new Date, ab.style[ac.j + "Transition"] = "";
                    var g = Z(b);
                    ah = ai ? {x: ai.x + g.x, y: ai.y + g.y} : g, ag = Z(b, !0), at = (new Date).getTime(), clearInterval(ar), ap = null, U(), ar = setInterval(U, 100)
                }
            }, R = function(g) {
                if (!(au || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints && !g.isPrimary)) {
                    var b = f(g.target).parents("." + aC.scrollable).length;
                    ay && (az = !0, !aC.lockscroll && !Y(g) || b || (g.stopPropagation(), g.preventDefault()), (!aC.scrollable || aC.scrollable && !b) && X(Z(g), g)), af = Z(g, !0)
                }
            }, Q = function(b) {
                au || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints && !b.isPrimary || (aC.callback && ay && aC.callback(f(b.target), ai, az, az ? V(aA, ag, af) : !1), ay = !1, az = !1, aA = null, T())
            }, P = function(m) {
                var l = aC.horizontal ? m.deltaX : 0, k = aC.vertical ? m.deltaY : 0, j = /MSIE ([6-8])/.test(navigator.appVersion) ? 40 : 1;
                if (aC.horizontal && !aC.vertical && Math.abs(m.deltaY) > Math.abs(m.deltaX) && (l = -m.deltaY), 0 !== l || 0 !== k) {
                    m.preventDefault(), m.stopPropagation(), az = !0;
                    var b = {x: ai.x + l * m.deltaFactor * j, y: ai.y - k * m.deltaFactor * j};
                    aA || (aA = new Date, ag = {x: ai.x, y: ai.y}), af = {x: ai.x, y: ai.y}, X(b, null, !0, 0), az = !1, clearTimeout(ao), ao = setTimeout(function() {
                        aC.callback && aC.callback(f(m.target), ai, az, az ? V(aA, ag, af) : !1), aA = ag = af = null
                    }, 150)
                }
            };
            window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints && (an = "MSPointerUp", am = "MSPointerDown", al = "MSPointerMove"), aa();
            var a;
            return aC.orientationchange && (window.addEventListener ? window.addEventListener("orientationchange", aB, !0) : f("window").on("orientationchange resize", aB)), f(ab).on(am, S), f(ab).on(al, R), f(ab).on(an, Q), aC.mousewheel && f.fn.mousewheel && !function() {
                f(ab).on("mousewheel.scroll", P)
            }(), f("body").bind("mouseup.scroll", function() {
                ay = !1
            }).bind("dragstart.scroll", function() {
                return !1
            }), {position: function() {
                    return ai
                }, scrollto: W, setBounds: aa, switchDirection: function() {
                    return aC.vertical = !aC.vertical, aC.horizontal = !aC.horizontal, ab
                }, suspend: function() {
                    au = !0
                }, resume: function() {
                    au = !1
                }}
        }
        f.fn.akscroller = function(g, b, a) {
            if ("string" != typeof g) {
                b = g, this.each(function() {
                    var h = f.extend({}, b);
                    h.node = f(this), f(this).attr("style", ""), this.akscroller = new e(h), f(this).data("scroller", !0)
                })
            } else {
                if ("scrollto" === g && this.each(function() {
                    this.akscroller.scrollto(b, a)
                }), "bounds" === g && this.each(function() {
                    this.akscroller.setBounds(b)
                }), "position" === g && this.eq(0) && this.eq(0)[0] && this.eq(0)[0].akscroller) {
                    return this.eq(0)[0].akscroller.position()
                }
                "switchdirection" === g && this.each(function() {
                    this.akscroller.switchDirection()
                }), "suspendscroll" === g && this.each(function() {
                    this.akscroller && this.akscroller.suspend()
                }), "resumescroll" === g && this.each(function() {
                    this.akscroller && this.akscroller.resume()
                })
            }
            return this
        }
    }
    function c() {
        window.jQuery || window.Zepto ? d(window.jQuery || window.Zepto) : setTimeout(c, 100)
    }
    c()
}(),
        /*! version 1.6.2 - Thu Nov 20 2014 17:09:22 GMT+0100 (CET). Author: Scott van Looy scott.vanlooy@akqa.com. (C) Copyright AKQA 2012-2014. All Rights Reserved. */
        !function() {
            function d(f) {
                function e(af, ae) {
                    function ad() {
                        clearTimeout(M), M = setTimeout(function() {
                            af.scrolltotop && window.scrollTo(0, 1), af.switchonorientationchange && (af.horizontal = !af.horizontal, af.vertical = !af.vertical), Z.akscroller("bounds", {x: E(), y: a()}), af.switchonorientationchange && Z.akscroller("switchdirection"), F(G)
                        }, 200)
                    }
                    function ac() {
                        var b;
                        clearTimeout(Y), Y = setTimeout(function() {
                            b = ++G, b === J.length && (b = G = 0), F(b), af.callback && af.callback(G, !1, !1, af.node), ac()
                        }, af.delay || 5000)
                    }
                    function ab(h) {
                        h.preventDefault(), h.stopPropagation();
                        var i = X.find("a").index(f(h.target));
                        F(i)
                    }
                    function aa() {
                        if (af.navarrows) {
                            var b = af.node.find(".cleftarrow").removeClass("off"), h = af.node.find(".crightarrow").removeClass("off");
                            (G >= J.length - I || I > J.length) && h.addClass("off"), (!G || 0 >= G) && b.addClass("off")
                        }
                    }
                    af.switchonorientationchange && (ae && document.width / document.height < 1 || !ae && document.width / document.height > 1) && (af.horizontal = !af.horizontal, af.vertical = !af.vertical);
                    var Z, Y, X, W, V, U, T, S, R, P, N = "undefined" == typeof window.ontouchstart ? "mouseup" : "touchend", L = "undefined" == typeof window.ontouchstart ? "mousedown" : "touchstart", J = af.node.find(".slide"), I = af.singleStep ? 1 : parseInt(af.node.width() / J.width(), 10), H = !1, G = 0, F = function(i, r) {
                        function q(k) {
                            for (var j = 0, m = h, l = n.length;
                                    l--;
                                    ) {
                                Math.abs(n[l] - k) < m && (m = n[l] - k, j = n[l], G = l)
                            }
                            return j
                        }
                        if (!(0 > i || i > J.length - 1 || H)) {
                            af.autoSwitch && (clearTimeout(Y), Y = setTimeout(ac, af.interruptionDelay || 15000));
                            var p, o = Z.akscroller("position"), n = [], h = af.horizontal ? J.width() : J.height(), b = "undefined" != typeof i ? i * h : af.horizontal ? o.x : o.y;
                            for (p = 0, P = af.node.find(".slide").length;
                                    P > p;
                                    p++) {
                                af.variablesizeslides ? (0 === p && (h = 0, n.push(0)), i && i === p && (b = h), h += af.horizontal ? J.eq(p).width() : J.eq(p).height(), n.push(h)) : n.push(h * p)
                            }
                            return Z.akscroller("scrollto", af.horizontal ? {x: q(b), y: 0} : {x: 0, y: q(b)}, r || af.scrollSpeed), Q(G), aa(), af.node
                        }
                    }, E = function() {
                        var b = J.length, h = 0;
                        if (af.horizontal) {
                            if (af.variablesizeslides) {
                                for (;
                                        b--;
                                        ) {
                                    h += J.eq(b).width()
                                }
                                return h
                            }
                            return af.node.find(".slide").width() * af.node.find(".slide").length
                        }
                        if (af.variablesizeslides) {
                            for (;
                                    b--;
                                    ) {
                                J.eq(b).width() > h && (h = J.eq(b).width())
                            }
                            return h
                        }
                        return J.width()
                    }, a = function() {
                        var b = J.length, h = 0;
                        if (af.vertical) {
                            if (af.variablesizeslides) {
                                for (;
                                        b--;
                                        ) {
                                    h += J.eq(b).height()
                                }
                                return h
                            }
                            return af.node.find(".slide").height() * af.node.find(".slide").length
                        }
                        if (af.variablesizeslides) {
                            for (;
                                    b--;
                                    ) {
                                J.eq(b).height() > h && (h = J.eq(b).height())
                            }
                            return h
                        }
                        return J.height()
                    }, Q = function(b) {
                        var h = J.eq(b);
                        X && (X.find("a").removeClass("active"), X.find("a").eq(b).addClass("active")), J.removeClass("active"), h.addClass("active"), af.hero && (W.find(".img").removeClass("active").eq(b).addClass("active"), W.find("article").html(h.find("article").html()), af.node.removeClass("light dark").addClass(h.hasClass("dark") ? "dark" : "light"))
                    }, O = {horizontal: af.horizontal, easing: af.easing, vertical: af.vertical, lockscroll: af.lockscroll, swipeDistance: af.swipeDistance, scrollable: af.scrollable ? "scrollable" : null, callback: function(b, l, k, j) {
                            var i, h;
                            !af.clickablelinks || k || j || (b.is("a") ? h = b : (b.find("a").length && (h = b.find("a").eq(0)), b.parent("a").length && (h = b.parent("a"))), h && window.open(h.attr("href"), h.attr("target"))), i = b.hasClass("slide") ? b.index() : b.parents(".slide").index(), j ? (G += j, 0 > G && (G = 0), G + I > J.length && (G = J.length - I), F(G, af.swipeSpeed || af.scrollSpeed / 4)) : !k && af.tapnavigation ? F(i, af.scrollSpeed / 2) : F(), af.callback && af.callback(G, l, k, af.node)
                        }, scrollSpeed: af.scrollSpeed, interruptionDelay: af.interruptionDelay};
                    window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints && (N = "MSPointerUp", L = "MSPointerDown"), af.skipbounds || (O.boundsX = E(), O.boundsY = a()), af.node.find("img").mousedown(function(b) {
                        b.preventDefault()
                    }), Z = af.scrollNode ? f(af.node).find(".scroll").akscroller(O) : f(af.node).akscroller(O);
                    var M;
                    if (window.addEventListener ? (window.addEventListener("orientationchange", ad, !1), window.addEventListener("resize", ad, !1)) : f("window").bind("orientationchange resize", ad), af.autoSwitch && ac(), X = af.node.find(".pager"), W = af.node.find(".hero"), X.length) {
                        for (T = function() {
                            f(this).removeAttr("style")
                        }, X.empty(), X.unbind().bind("click", function(b) {
                            b.preventDefault(), b.stopPropagation()
                        }).bind(N, ab), P = J.length - parseInt(af.node.width() / J.width() - 1, 10);
                                P--;
                                ) {
                            var K = f('<a href="#"></a>');
                            X.append(K), af.hero && W.length && (V = "", J.eq(P).hasClass("light") && (V = " light"), U = f('<img style="opacity:0" />').bind("load", T), U.attr("src", J.eq(P).data("hero") || J.eq(P).attr("data-hero")), R = f('<div class="img' + V + '"></div>').append(U), W.prepend(R))
                        }
                    } else {
                        X = null
                    }
                    return af.navarrows && (S = f('<a class="cleftarrow" href="#"></a>'), S.unbind().bind("click", function(b) {
                        b.preventDefault(), b.stopPropagation()
                    }).bind(N, function() {
                        G > 0 && (F(G - 1), af.callback && af.callback(G, !1, !1, af.node))
                    }), af.node.append(S), S = f('<a class="crightarrow" href="#"></a>'), S.unbind().bind("click", function(b) {
                        b.preventDefault(), b.stopPropagation()
                    }).bind(N, function() {
                        G < J.length - I && (F(G + 1), af.callback && af.callback(G, !1, !1, af.node))
                    }), af.node.append(S), af.node.bind(L + ".navicons", function() {
                        clearTimeout(f(this)[0].tmptimeout), f(this).addClass("touched")
                    }).bind(N + ".navicons", function() {
                        var h = f(this);
                        h[0].tmptimeout = setTimeout(function() {
                            h.removeClass("touched")
                        }, 3500)
                    }), af.node.addClass("touched"), af.node[0].tmptimeout = setTimeout(function() {
                        af.node.removeClass("touched")
                    }, 3500), aa()), Q(0), {moveto: F, forward: function() {
                            F(G + 1)
                        }, back: function() {
                            F(G - 1)
                        }, currentSlide: function() {
                            return G
                        }, suspend: function() {
                            f(af.node).akscroller("suspendscroll"), H = !0
                        }, resume: function() {
                            f(af.node).akscroller("resumescroll"), H = !1
                        }}
                }
                function g(b, h) {
                    return h ? /ipad/i.test(navigator.appVersion) || 0 !== window.screenX || !("ontouchstart" in window) || window.screen.width > 1023 && /android/i.test(navigator.appVersion) && !/mobile/i.test(navigator.appVersion) ? new e(b, !0) : new e(h, !1) : new e(b)
                }
                f.fn.akcarousel = function(a, j, i) {
                    if ("string" != typeof a) {
                        if ("function" != typeof f.fn.akscroller) {
                            throw"Error: $.fn.akscroller is required for this carousel to work correctly."
                        }
                        this.each(function() {
                            var k, b;
                            j && (b = f.extend({}, j), b.node = f(this)), k = f.extend({}, a), k.node = f(this), i && i.node && (b = f.extend({}, i), b.node = f(this)), this.akcarousel = new g(k, b)
                        })
                    } else {
                        if ("move" === a) {
                            return this.each(function() {
                                return this.akcarousel ? isNaN(j) ? -1 !== j.indexOf("+") ? void this.akcarousel.forward() : void (-1 !== j.indexOf("-") && this.akcarousel.back()) : void this.akcarousel.moveto(j) : void 0
                            }), this
                        }
                        if ("realign" === a) {
                            var h;
                            return this.each(function() {
                                this.akcarousel && this.akcarousel.moveto(this.akcarousel.currentSlide())
                            }), h
                        }
                        "suspend" === a ? this.each(function() {
                            this.akcarousel && this.akcarousel.suspend && this.akcarousel.suspend()
                        }) : "resume" === a ? this.each(function() {
                            this.akcarousel && this.akcarousel.resume && this.akcarousel.resume()
                        }) : window.console && window.console.warn && window.console.warn(this, "carousel: function " + a + " not recognised")
                    }
                    return this
                }
            }
            function c() {
                (window.jQuery || window.Zepto) && ((window.jQuery || window.Zepto).fn || {}).akscroller ? d(window.jQuery || window.Zepto) : setTimeout(c, 100)
            }
            c()
        }(), function(N) {
    function M(b) {
        return b.targetTouches ? b.targetTouches[0] : b
    }
    function L(b) {
        b.preventDefault(), b.stopPropagation();
        var a = N(b.target);
        C = M(b).pageX, B = M(b).pageY, E = v ? (G || 0) + C : -(C - a.offset().left), D = v ? (F || 0) + B : -(B - a.offset().top), w = !0
    }
    function K(k) {
        if (w) {
            var j = N(k.target), i = E - M(k).pageX, h = D - M(k).pageY, b = j.width() / 3, a = j.height() / 2;
            if (k.stopPropagation(), k.preventDefault(), !(b >= i && i >= -b && a >= h && h >= -a)) {
                return
            }
            "WebkitTransform" in document.body.style || "MozTransform" in document.body.style || "OTransform" in document.body.style || "transform" in document.body.style ? (i = 0, j[0].style[v.j.length ? v.j + "Transform" : "transform"] = "Webkit" === v.j ? "translate3d(" + -i + "px, " + -h + "px, 0)" : "translate(" + -i + "px, " + -h + "px)") : (j.css("left", -i), j.css("top", -h)), G = i, F = h
        }
    }
    function J() {
        E = G, D = F, w = !1
    }
    function I(b) {
        H = b.find(".zoom-image"), H.on(z, L).on(y, K).on(A, J).on("mouseout", J), b.parents().find(".crightarrow, .cleftarrow").on(z, function() {
            b.hasClass("zoomed") && (b.removeClass("zoomed"), H.off(), u(H))
        })
    }
    var H, G, F, E, D, C, B, A = "undefined" == typeof window.ontouchstart ? "mouseup" : "touchend", z = "undefined" == typeof window.ontouchstart ? "mousedown" : "touchstart", y = "undefined" == typeof window.ontouchstart ? "mousemove" : "touchmove", x = window.Zepto ? "ease-in-out 1ms" : void 0, w = !1, v = function(b) {
        return"string" == typeof b.transform ? {j: "", c: ""} : "string" == typeof b.WebkitTransform ? {j: "Webkit", c: "-webkit-"} : "string" == typeof b.MozTransform ? {j: "Moz", c: "-moz-"} : "string" == typeof b.OTransform ? {j: "O", c: "-O-"} : "string" != typeof b.msTransform && "string" != typeof b.MsTransform || /MSIE 9/.test(navigator.appVersion) ? {j: null, c: null} : {j: "ms", c: "-ms-"}
    }((document.body || document.head).style), u = function(a) {
        a = a || N(".zoom img.zoom-image"), "WebkitTransform" in document.body.style || "MozTransform" in document.body.style || "OTransform" in document.body.style || "transform" in document.body.style ? a.off().animate({translate3d: "0,0,0"}, 1, x).parents(".active").removeClass("zoomed") : a.off().css({left: "0", right: "0"})
    };
    N.fn.galleryZoom = function(a, d) {
        "string" != typeof a ? d = a : "zoomReset" === a && u(), d = d || {}, v = v, this.each(function() {
            var c = N(this);
            c.on(z, function() {
                I(c)
            })
        })
    }
}(window.Zepto || window.jQuery), function(b) {
    b.cookie = function(z, y, x) {
        if ("undefined" == typeof y) {
            var w = null;
            if (document.cookie && "" !== document.cookie) {
                for (var v = document.cookie.split(";"), u = v.length, t = 0;
                        u > t;
                        t++) {
                    var s = b.trim(v[t]);
                    if (s.substring(0, z.length + 1) == z + "=") {
                        w = decodeURIComponent(s.substring(z.length + 1));
                        break
                    }
                }
            }
            return w
        }
        x = x || {}, null === y && (y = "", x.expires = -1);
        var r = "";
        if (x.expires && ("number" == typeof x.expires || x.expires.toUTCString)) {
            var q;
            "number" == typeof x.expires ? (q = new Date, q.setTime(q.getTime() + 24 * x.expires * 60 * 60 * 1000)) : q = x.expires, r = "; expires=" + q.toUTCString()
        }
        var p = x.path ? "; path=" + x.path : "", o = x.domain ? "; domain=" + x.domain : "", a = x.secure ? "; secure" : "";
        document.cookie = [z, "=", encodeURIComponent(y), r, p, o, a].join("")
    }
}(window.jQuery || window.Zepto), function(d, c) {
    !function(b) {
        "function" == typeof define && define.amd ? define(["jquery", "jquery-mousewheel"], b) : b(jQuery)
    }(function(x) {
        var w = "mCustomScrollbar", v = "mCS", u = ".mCustomScrollbar", t = {setWidth: !1, setHeight: !1, setTop: 0, setLeft: 0, axis: "y", scrollbarPosition: "inside", scrollInertia: 950, autoDraggerLength: !0, autoHideScrollbar: !1, autoExpandScrollbar: !1, alwaysShowScrollbar: 0, snapAmount: null, snapOffset: 0, mouseWheel: {enable: !0, scrollAmount: "auto", axis: "y", preventDefault: !1, deltaFactor: "auto", normalizeDelta: !1, invert: !1, disableOver: ["select", "option", "keygen", "datalist", "textarea"]}, scrollButtons: {enable: !1, scrollType: "stepless", scrollAmount: "auto"}, keyboard: {enable: !0, scrollType: "stepless", scrollAmount: "auto"}, contentTouchScroll: 25, advanced: {autoExpandHorizontalScroll: !1, autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']", updateOnContentResize: !0, updateOnImageLoad: !0, updateOnSelectorChange: !1}, theme: "light", callbacks: {onScrollStart: !1, onScroll: !1, onTotalScroll: !1, onTotalScrollBack: !1, whileScrolling: !1, onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0, onOverflowY: !1, onOverflowX: !1, onOverflowYNone: !1, onOverflowXNone: !1}, live: !1, liveSelector: null}, s = 0, r = {}, q = function(e) {
            r[e] && (clearTimeout(r[e]), a._delete.call(null, r[e]))
        }, p = d.attachEvent && !d.addEventListener ? 1 : 0, o = !1, b = {init: function(f) {
                var f = x.extend(!0, {}, t, f), e = a._selector.call(this);
                if (f.live) {
                    var h = f.liveSelector || this.selector || u, g = x(h);
                    if ("off" === f.live) {
                        return void q(h)
                    }
                    r[h] = setTimeout(function() {
                        g.mCustomScrollbar(f), "once" === f.live && g.length && q(h)
                    }, 500)
                } else {
                    q(h)
                }
                return f.setWidth = f.set_width ? f.set_width : f.setWidth, f.setHeight = f.set_height ? f.set_height : f.setHeight, f.axis = f.horizontalScroll ? "x" : a._findAxis.call(null, f.axis), f.scrollInertia = f.scrollInertia > 0 && f.scrollInertia < 17 ? 17 : f.scrollInertia, "object" != typeof f.mouseWheel && 1 == f.mouseWheel && (f.mouseWheel = {enable: !0, scrollAmount: "auto", axis: "y", preventDefault: !1, deltaFactor: "auto", normalizeDelta: !1, invert: !1}), f.mouseWheel.scrollAmount = f.mouseWheelPixels ? f.mouseWheelPixels : f.mouseWheel.scrollAmount, f.mouseWheel.normalizeDelta = f.advanced.normalizeMouseWheelDelta ? f.advanced.normalizeMouseWheelDelta : f.mouseWheel.normalizeDelta, f.scrollButtons.scrollType = a._findScrollButtonsType.call(null, f.scrollButtons.scrollType), a._theme.call(null, f), x(e).each(function() {
                    var j = x(this);
                    if (!j.data(v)) {
                        j.data(v, {idx: ++s, opt: f, scrollRatio: {y: null, x: null}, overflowed: null, contentReset: {y: null, x: null}, bindEvents: !1, tweenRunning: !1, sequential: {}, langDir: j.css("direction"), cbOffsets: null, trigger: null});
                        var n = j.data(v).opt, m = j.data("mcs-axis"), l = j.data("mcs-scrollbar-position"), k = j.data("mcs-theme");
                        m && (n.axis = m), l && (n.scrollbarPosition = l), k && (n.theme = k, a._theme.call(null, n)), a._pluginMarkup.call(this), b.update.call(null, j)
                    }
                })
            }, update: function(f) {
                var e = f || a._selector.call(this);
                return x(e).each(function() {
                    var j = x(this);
                    if (j.data(v)) {
                        var i = j.data(v), n = i.opt, m = x("#mCSB_" + i.idx + "_container"), l = [x("#mCSB_" + i.idx + "_dragger_vertical"), x("#mCSB_" + i.idx + "_dragger_horizontal")];
                        if (!m.length) {
                            return
                        }
                        i.tweenRunning && a._stop.call(null, j), j.hasClass("mCS_disabled") && j.removeClass("mCS_disabled"), j.hasClass("mCS_destroyed") && j.removeClass("mCS_destroyed"), a._maxHeight.call(this), a._expandContentHorizontally.call(this), "y" === n.axis || n.advanced.autoExpandHorizontalScroll || m.css("width", a._contentWidth(m.children())), i.overflowed = a._overflowed.call(this), a._scrollbarVisibility.call(this), n.autoDraggerLength && a._setDraggerLength.call(this), a._scrollRatio.call(this), a._bindEvents.call(this);
                        var k = [Math.abs(m[0].offsetTop), Math.abs(m[0].offsetLeft)];
                        "x" !== n.axis && (i.overflowed[0] ? l[0].height() > l[0].parent().height() ? a._resetContentPosition.call(this) : (a._scrollTo.call(this, j, k[0].toString(), {dir: "y", dur: 0, overwrite: "none"}), i.contentReset.y = null) : (a._resetContentPosition.call(this), "y" === n.axis ? a._unbindEvents.call(this) : "yx" === n.axis && i.overflowed[1] && a._scrollTo.call(this, j, k[1].toString(), {dir: "x", dur: 0, overwrite: "none"}))), "y" !== n.axis && (i.overflowed[1] ? l[1].width() > l[1].parent().width() ? a._resetContentPosition.call(this) : (a._scrollTo.call(this, j, k[1].toString(), {dir: "x", dur: 0, overwrite: "none"}), i.contentReset.x = null) : (a._resetContentPosition.call(this), "x" === n.axis ? a._unbindEvents.call(this) : "yx" === n.axis && i.overflowed[0] && a._scrollTo.call(this, j, k[0].toString(), {dir: "y", dur: 0, overwrite: "none"}))), a._autoUpdate.call(this)
                    }
                })
            }, scrollTo: function(f, e) {
                if ("undefined" != typeof f && null != f) {
                    var g = a._selector.call(this);
                    return x(g).each(function() {
                        var B = x(this);
                        if (B.data(v)) {
                            var A = B.data(v), z = A.opt, y = {trigger: "external", scrollInertia: z.scrollInertia, scrollEasing: "mcsEaseInOut", moveDragger: !1, timeout: 60, callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0}, n = x.extend(!0, {}, y, e), m = a._arr.call(this, f), l = n.scrollInertia > 0 && n.scrollInertia < 17 ? 17 : n.scrollInertia;
                            m[0] = a._to.call(this, m[0], "y"), m[1] = a._to.call(this, m[1], "x"), n.moveDragger && (m[0] *= A.scrollRatio.y, m[1] *= A.scrollRatio.x), n.dur = l, setTimeout(function() {
                                null !== m[0] && "undefined" != typeof m[0] && "x" !== z.axis && A.overflowed[0] && (n.dir = "y", n.overwrite = "all", a._scrollTo.call(this, B, m[0].toString(), n)), null !== m[1] && "undefined" != typeof m[1] && "y" !== z.axis && A.overflowed[1] && (n.dir = "x", n.overwrite = "none", a._scrollTo.call(this, B, m[1].toString(), n))
                            }, n.timeout)
                        }
                    })
                }
            }, stop: function() {
                var e = a._selector.call(this);
                return x(e).each(function() {
                    var f = x(this);
                    f.data(v) && a._stop.call(null, f)
                })
            }, disable: function(f) {
                var e = a._selector.call(this);
                return x(e).each(function() {
                    var g = x(this);
                    if (g.data(v)) {
                        var h = g.data(v);
                        h.opt;
                        a._autoUpdate.call(this, "remove"), a._unbindEvents.call(this), f && a._resetContentPosition.call(this), a._scrollbarVisibility.call(this, !0), g.addClass("mCS_disabled")
                    }
                })
            }, destroy: function() {
                var e = a._selector.call(this);
                return x(e).each(function() {
                    var j = x(this);
                    if (j.data(v)) {
                        var z = j.data(v), y = z.opt, n = x("#mCSB_" + z.idx), m = x("#mCSB_" + z.idx + "_container"), l = x(".mCSB_" + z.idx + "_scrollbar");
                        y.live && q(e), a._autoUpdate.call(this, "remove"), a._unbindEvents.call(this), a._resetContentPosition.call(this), j.removeData(v), a._delete.call(null, this.mcs), l.remove(), n.replaceWith(m.contents()), j.removeClass(w + " _" + v + "_" + z.idx + " mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")
                    }
                })
            }}, a = {_selector: function() {
                return"object" != typeof x(this) || x(this).length < 1 ? u : this
            }, _theme: function(i) {
                var h = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"], m = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"], l = ["minimal", "minimal-dark"], k = ["minimal", "minimal-dark"], j = ["minimal", "minimal-dark"];
                i.autoDraggerLength = x.inArray(i.theme, h) > -1 ? !1 : i.autoDraggerLength, i.autoExpandScrollbar = x.inArray(i.theme, m) > -1 ? !1 : i.autoExpandScrollbar, i.scrollButtons.enable = x.inArray(i.theme, l) > -1 ? !1 : i.scrollButtons.enable, i.autoHideScrollbar = x.inArray(i.theme, k) > -1 ? !0 : i.autoHideScrollbar, i.scrollbarPosition = x.inArray(i.theme, j) > -1 ? "outside" : i.scrollbarPosition
            }, _findAxis: function(e) {
                return"yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            }, _findScrollButtonsType: function(e) {
                return"stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            }, _pluginMarkup: function() {
                var I = x(this), H = I.data(v), G = H.opt, F = G.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "", E = ["<div id='mCSB_" + H.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + H.idx + "_scrollbar mCS-" + G.theme + " mCSB_scrollTools_vertical" + F + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + H.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + H.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + H.idx + "_scrollbar mCS-" + G.theme + " mCSB_scrollTools_horizontal" + F + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + H.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"], D = "yx" === G.axis ? "mCSB_vertical_horizontal" : "x" === G.axis ? "mCSB_horizontal" : "mCSB_vertical", C = "yx" === G.axis ? E[0] + E[1] : "x" === G.axis ? E[1] : E[0], B = "yx" === G.axis ? "<div id='mCSB_" + H.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "", A = G.autoHideScrollbar ? " mCS-autoHide" : "", z = "x" !== G.axis && "rtl" === H.langDir ? " mCS-dir-rtl" : "";
                G.setWidth && I.css("width", G.setWidth), G.setHeight && I.css("height", G.setHeight), G.setLeft = "y" !== G.axis && "rtl" === H.langDir ? "989999px" : G.setLeft, I.addClass(w + " _" + v + "_" + H.idx + A + z).wrapInner("<div id='mCSB_" + H.idx + "' class='mCustomScrollBox mCS-" + G.theme + " " + D + "'><div id='mCSB_" + H.idx + "_container' class='mCSB_container' style='position:relative; top:" + G.setTop + "; left:" + G.setLeft + ";' dir=" + H.langDir + " /></div>");
                var y = x("#mCSB_" + H.idx), n = x("#mCSB_" + H.idx + "_container");
                "y" === G.axis || G.advanced.autoExpandHorizontalScroll || n.css("width", a._contentWidth(n.children())), "outside" === G.scrollbarPosition ? ("static" === I.css("position") && I.css("position", "relative"), I.css("overflow", "visible"), y.addClass("mCSB_outside").after(C)) : (y.addClass("mCSB_inside").append(C), n.wrap(B)), a._scrollButtons.call(this);
                var e = [x("#mCSB_" + H.idx + "_dragger_vertical"), x("#mCSB_" + H.idx + "_dragger_horizontal")];
                e[0].css("min-height", e[0].height()), e[1].css("min-width", e[1].width())
            }, _contentWidth: function(e) {
                return Math.max.apply(Math, e.map(function() {
                    return x(this).outerWidth(!0)
                }).get())
            }, _expandContentHorizontally: function() {
                var g = x(this), e = g.data(v), i = e.opt, h = x("#mCSB_" + e.idx + "_container");
                i.advanced.autoExpandHorizontalScroll && "y" !== i.axis && h.css({position: "absolute", width: "auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width: Math.ceil(h[0].getBoundingClientRect().right + 0.4) - Math.floor(h[0].getBoundingClientRect().left), position: "relative"}).unwrap()
            }, _scrollButtons: function() {
                var i = x(this), e = i.data(v), m = e.opt, l = x(".mCSB_" + e.idx + "_scrollbar:first"), k = ["<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"], j = ["x" === m.axis ? k[2] : k[0], "x" === m.axis ? k[3] : k[1], k[2], k[3]];
                m.scrollButtons.enable && l.prepend(j[0]).append(j[1]).next(".mCSB_scrollTools").prepend(j[2]).append(j[3])
            }, _maxHeight: function() {
                var j = x(this), e = j.data(v), y = (e.opt, x("#mCSB_" + e.idx)), n = j.css("max-height"), m = -1 !== n.indexOf("%"), l = j.css("box-sizing");
                if ("none" !== n) {
                    var k = m ? j.parent().height() * parseInt(n) / 100 : parseInt(n);
                    "border-box" === l && (k -= j.innerHeight() - j.height() + (j.outerHeight() - j.innerHeight())), y.css("max-height", Math.round(k))
                }
            }, _setDraggerLength: function() {
                var C = x(this), B = C.data(v), A = x("#mCSB_" + B.idx), z = x("#mCSB_" + B.idx + "_container"), y = [x("#mCSB_" + B.idx + "_dragger_vertical"), x("#mCSB_" + B.idx + "_dragger_horizontal")], n = [A.height() / z.outerHeight(!1), A.width() / z.outerWidth(!1)], m = [parseInt(y[0].css("min-height")), Math.round(n[0] * y[0].parent().height()), parseInt(y[1].css("min-width")), Math.round(n[1] * y[1].parent().width())], k = p && m[1] < m[0] ? m[0] : m[1], e = p && m[3] < m[2] ? m[2] : m[3];
                y[0].css({height: k, "max-height": y[0].parent().height() - 10}).find(".mCSB_dragger_bar").css({"line-height": m[0] + "px"}), y[1].css({width: e, "max-width": y[1].parent().width() - 10})
            }, _scrollRatio: function() {
                var j = x(this), e = j.data(v), y = x("#mCSB_" + e.idx), n = x("#mCSB_" + e.idx + "_container"), m = [x("#mCSB_" + e.idx + "_dragger_vertical"), x("#mCSB_" + e.idx + "_dragger_horizontal")], l = [n.outerHeight(!1) - y.height(), n.outerWidth(!1) - y.width()], k = [l[0] / (m[0].parent().height() - m[0].height()), l[1] / (m[1].parent().width() - m[1].width())];
                e.scrollRatio = {y: k[0], x: k[1]}
            }, _onDragClasses: function(h, g, l) {
                var k = l ? "mCSB_dragger_onDrag_expanded" : "", j = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag"], i = h.closest(".mCSB_scrollTools");
                "active" === g ? (h.toggleClass(j[0] + " " + k), i.toggleClass(j[1]), h[0]._draggable = h[0]._draggable ? 0 : 1) : h[0]._draggable || ("hide" === g ? (h.removeClass(j[0]), i.removeClass(j[1])) : (h.addClass(j[0]), i.addClass(j[1])))
            }, _overflowed: function() {
                var i = x(this), e = i.data(v), m = x("#mCSB_" + e.idx), l = x("#mCSB_" + e.idx + "_container"), k = null == e.overflowed ? l.height() : l.outerHeight(!1), j = null == e.overflowed ? l.width() : l.outerWidth(!1);
                return[k > m.height(), j > m.width()]
            }, _resetContentPosition: function() {
                var j = x(this), e = j.data(v), y = e.opt, n = x("#mCSB_" + e.idx), m = x("#mCSB_" + e.idx + "_container"), l = [x("#mCSB_" + e.idx + "_dragger_vertical"), x("#mCSB_" + e.idx + "_dragger_horizontal")];
                if (a._stop(j), ("x" !== y.axis && !e.overflowed[0] || "y" === y.axis && e.overflowed[0]) && (l[0].add(m).css("top", 0), a._scrollTo(j, "_resetY")), "y" !== y.axis && !e.overflowed[1] || "x" === y.axis && e.overflowed[1]) {
                    var k = dx = 0;
                    "rtl" === e.langDir && (k = n.width() - m.outerWidth(!1), dx = Math.abs(k / e.scrollRatio.x)), m.css("left", k), l[1].css("left", dx), a._scrollTo(j, "_resetX")
                }
            }, _bindEvents: function() {
                function h() {
                    i = setTimeout(function() {
                        x.event.special.mousewheel ? (clearTimeout(i), a._mousewheel.call(e[0])) : h()
                    }, 1000)
                }
                var e = x(this), k = e.data(v), j = k.opt;
                if (!k.bindEvents) {
                    if (a._draggable.call(this), j.contentTouchScroll && a._contentDraggable.call(this), j.mouseWheel.enable) {
                        var i;
                        h()
                    }
                    a._draggerRail.call(this), a._wrapperScroll.call(this), j.advanced.autoScrollOnFocus && a._focus.call(this), j.scrollButtons.enable && a._buttons.call(this), j.keyboard.enable && a._keyboard.call(this), k.bindEvents = !0
                }
            }, _unbindEvents: function() {
                var e = x(this), n = e.data(v), m = v + "_" + n.idx, l = ".mCSB_" + n.idx + "_scrollbar", k = x("#mCSB_" + n.idx + ",#mCSB_" + n.idx + "_container,#mCSB_" + n.idx + "_container_wrapper," + l + " .mCSB_draggerContainer,#mCSB_" + n.idx + "_dragger_vertical,#mCSB_" + n.idx + "_dragger_horizontal," + l + ">a"), j = x("#mCSB_" + n.idx + "_container");
                n.bindEvents && (x(c).unbind("." + m), k.each(function() {
                    x(this).unbind("." + m)
                }), clearTimeout(e[0]._focusTimeout), a._delete.call(null, e[0]._focusTimeout), clearTimeout(n.sequential.step), a._delete.call(null, n.sequential.step), clearTimeout(j[0].onCompleteTimeout), a._delete.call(null, j[0].onCompleteTimeout), n.bindEvents = !1)
            }, _scrollbarVisibility: function(k) {
                var e = x(this), A = e.data(v), z = A.opt, y = x("#mCSB_" + A.idx + "_container_wrapper"), n = y.length ? y : x("#mCSB_" + A.idx + "_container"), m = [x("#mCSB_" + A.idx + "_scrollbar_vertical"), x("#mCSB_" + A.idx + "_scrollbar_horizontal")], l = [m[0].find(".mCSB_dragger"), m[1].find(".mCSB_dragger")];
                "x" !== z.axis && (A.overflowed[0] && !k ? (m[0].add(l[0]).add(m[0].children("a")).css("display", "block"), n.removeClass("mCS_no_scrollbar_y mCS_y_hidden")) : (z.alwaysShowScrollbar ? (2 !== z.alwaysShowScrollbar && l[0].add(m[0].children("a")).css("display", "none"), n.removeClass("mCS_y_hidden")) : (m[0].css("display", "none"), n.addClass("mCS_y_hidden")), n.addClass("mCS_no_scrollbar_y"))), "y" !== z.axis && (A.overflowed[1] && !k ? (m[1].add(l[1]).add(m[1].children("a")).css("display", "block"), n.removeClass("mCS_no_scrollbar_x mCS_x_hidden")) : (z.alwaysShowScrollbar ? (2 !== z.alwaysShowScrollbar && l[1].add(m[1].children("a")).css("display", "none"), n.removeClass("mCS_x_hidden")) : (m[1].css("display", "none"), n.addClass("mCS_x_hidden")), n.addClass("mCS_no_scrollbar_x"))), A.overflowed[0] || A.overflowed[1] ? e.removeClass("mCS_no_scrollbar") : e.addClass("mCS_no_scrollbar")
            }, _coordinates: function(f) {
                var e = f.type;
                switch (e) {
                    case"pointerdown":
                    case"MSPointerDown":
                    case"pointermove":
                    case"MSPointerMove":
                    case"pointerup":
                    case"MSPointerUp":
                        return[f.originalEvent.pageY, f.originalEvent.pageX];
                    case"touchstart":
                    case"touchmove":
                    case"touchend":
                        var g = f.originalEvent.touches[0] || f.originalEvent.changedTouches[0];
                        return[g.pageY, g.pageX];
                    default:
                        return[f.pageY, f.pageX]
                }
            }, _draggable: function() {
                function F(g) {
                    var f = k.find("iframe");
                    if (f.length) {
                        var h = g ? "auto" : "none";
                        f.css("pointer-events", h)
                    }
                }
                function E(h, f, G, m) {
                    if (k[0].idleTimer = y.scrollInertia < 233 ? 250 : 0, D.attr("id") === l[1]) {
                        var j = "x", i = (D[0].offsetLeft - f + m) * z.scrollRatio.x
                    } else {
                        var j = "y", i = (D[0].offsetTop - h + G) * z.scrollRatio.y
                    }
                    a._scrollTo(A, i.toString(), {dir: j, drag: !0})
                }
                var D, C, B, A = x(this), z = A.data(v), y = z.opt, n = v + "_" + z.idx, l = ["mCSB_" + z.idx + "_dragger_vertical", "mCSB_" + z.idx + "_dragger_horizontal"], k = x("#mCSB_" + z.idx + "_container"), e = x("#" + l[0] + ",#" + l[1]);
                e.bind("mousedown." + n + " touchstart." + n + " pointerdown." + n + " MSPointerDown." + n, function(G) {
                    if (G.stopImmediatePropagation(), G.preventDefault(), a._mouseBtnLeft(G)) {
                        o = !0, p && (c.onselectstart = function() {
                            return !1
                        }), F(!1), a._stop(A), D = x(this);
                        var i = D.offset(), f = a._coordinates(G)[0] - i.top, m = a._coordinates(G)[1] - i.left, h = D.height() + i.top, g = D.width() + i.left;
                        h > f && f > 0 && g > m && m > 0 && (C = f, B = m), a._onDragClasses(D, "active", y.autoExpandScrollbar)
                    }
                }).bind("touchmove." + n, function(g) {
                    g.stopImmediatePropagation(), g.preventDefault();
                    var f = D.offset(), i = a._coordinates(g)[0] - f.top, h = a._coordinates(g)[1] - f.left;
                    E(C, B, i, h)
                }), x(c).bind("mousemove." + n + " pointermove." + n + " MSPointerMove." + n, function(g) {
                    if (D) {
                        var f = D.offset(), i = a._coordinates(g)[0] - f.top, h = a._coordinates(g)[1] - f.left;
                        if (C === i) {
                            return
                        }
                        E(C, B, i, h)
                    }
                }).add(e).bind("mouseup." + n + " touchend." + n + " pointerup." + n + " MSPointerUp." + n, function() {
                    D && (a._onDragClasses(D, "active", y.autoExpandScrollbar), D = null), o = !1, p && (c.onselectstart = null), F(!0)
                })
            }, _contentDraggable: function() {
                function W(g, f) {
                    var h = [1.5 * f, 2 * f, f / 1.5, f / 2];
                    return g > 90 ? f > 4 ? h[0] : h[3] : g > 60 ? f > 3 ? h[3] : h[2] : g > 30 ? f > 8 ? h[1] : f > 6 ? h[0] : f > 4 ? f : h[2] : f > 8 ? f : h[3]
                }
                function V(h, g, m, k, j, i) {
                    h && a._scrollTo(H, h.toString(), {dur: g, scrollEasing: m, dir: k, overwrite: j, drag: i})
                }
                var U, T, S, R, Q, P, O, N, M, L, J, H = x(this), G = H.data(v), F = G.opt, E = v + "_" + G.idx, D = x("#mCSB_" + G.idx), C = x("#mCSB_" + G.idx + "_container"), n = [x("#mCSB_" + G.idx + "_dragger_vertical"), x("#mCSB_" + G.idx + "_dragger_horizontal")], l = [], e = [], K = 0, I = "yx" === F.axis ? "none" : "all";
                C.bind("touchstart." + E + " pointerdown." + E + " MSPointerDown." + E, function(g) {
                    if (a._pointerTouch(g) && !o) {
                        var f = C.offset();
                        U = a._coordinates(g)[0] - f.top, T = a._coordinates(g)[1] - f.left
                    }
                }).bind("touchmove." + E + " pointermove." + E + " MSPointerMove." + E, function(Z) {
                    if (a._pointerTouch(Z) && !o) {
                        Z.stopImmediatePropagation(), P = a._getTime();
                        var Y = D.offset(), X = a._coordinates(Z)[0] - Y.top, B = a._coordinates(Z)[1] - Y.left, A = "mcsLinearOut";
                        if (l.push(X), e.push(B), G.overflowed[0]) {
                            var z = n[0].parent().height() - n[0].height(), y = U - X > 0 && X - U > -(z * G.scrollRatio.y)
                        }
                        if (G.overflowed[1]) {
                            var j = n[1].parent().width() - n[1].width(), f = T - B > 0 && B - T > -(j * G.scrollRatio.x)
                        }
                        (y || f) && Z.preventDefault(), L = "yx" === F.axis ? [U - X, T - B] : "x" === F.axis ? [null, T - B] : [U - X, null], C[0].idleTimer = 250, G.overflowed[0] && V(L[0], K, A, "y", "all", !0), G.overflowed[1] && V(L[1], K, A, "x", I, !0)
                    }
                }), D.bind("touchstart." + E + " pointerdown." + E + " MSPointerDown." + E, function(g) {
                    if (a._pointerTouch(g) && !o) {
                        g.stopImmediatePropagation(), a._stop(H), Q = a._getTime();
                        var f = D.offset();
                        S = a._coordinates(g)[0] - f.top, R = a._coordinates(g)[1] - f.left, l = [], e = []
                    }
                }).bind("touchend." + E + " pointerup." + E + " MSPointerUp." + E, function(z) {
                    if (a._pointerTouch(z) && !o) {
                        z.stopImmediatePropagation(), O = a._getTime();
                        var y = D.offset(), m = a._coordinates(z)[0] - y.top, k = a._coordinates(z)[1] - y.left;
                        if (!(O - P > 30)) {
                            M = 1000 / (O - Q);
                            var h = "mcsEaseOut", X = 2.5 > M, B = X ? [l[l.length - 2], e[e.length - 2]] : [0, 0];
                            N = X ? [m - B[0], k - B[1]] : [m - S, k - R];
                            var j = [Math.abs(N[0]), Math.abs(N[1])];
                            M = X ? [Math.abs(N[0] / 4), Math.abs(N[1] / 4)] : [M, M];
                            var i = [Math.abs(C[0].offsetTop) - N[0] * W(j[0] / M[0], M[0]), Math.abs(C[0].offsetLeft) - N[1] * W(j[1] / M[1], M[1])];
                            L = "yx" === F.axis ? [i[0], i[1]] : "x" === F.axis ? [null, i[1]] : [i[0], null], J = [4 * j[0] + F.scrollInertia, 4 * j[1] + F.scrollInertia];
                            var g = parseInt(F.contentTouchScroll) || 0;
                            L[0] = j[0] > g ? L[0] : 0, L[1] = j[1] > g ? L[1] : 0, G.overflowed[0] && V(L[0], J[0], h, "y", I, !1), G.overflowed[1] && V(L[1], J[1], h, "x", I, !1)
                        }
                    }
                })
            }, _mousewheel: function() {
                function C(g) {
                    var f = null;
                    try {
                        var i = g.contentDocument || g.contentWindow.document;
                        f = i.body.innerHTML
                    } catch (h) {
                    }
                    return null !== f
                }
                var B = x(this), A = B.data(v);
                if (A) {
                    var z = A.opt, y = v + "_" + A.idx, n = x("#mCSB_" + A.idx), m = [x("#mCSB_" + A.idx + "_dragger_vertical"), x("#mCSB_" + A.idx + "_dragger_horizontal")], k = x("#mCSB_" + A.idx + "_container").find("iframe"), e = n;
                    k.length && k.each(function() {
                        var f = this;
                        C(f) && (e = e.add(x(f).contents().find("body")))
                    }), e.bind("mousewheel." + y, function(J, I) {
                        if (a._stop(B), !a._disableMousewheel(B, J.target)) {
                            var H = "auto" !== z.mouseWheel.deltaFactor ? parseInt(z.mouseWheel.deltaFactor) : p && J.deltaFactor < 100 ? 100 : J.deltaFactor || 100;
                            if ("x" === z.axis || "x" === z.mouseWheel.axis) {
                                var G = "x", F = [Math.round(H * A.scrollRatio.x), parseInt(z.mouseWheel.scrollAmount)], E = "auto" !== z.mouseWheel.scrollAmount ? F[1] : F[0] >= n.width() ? 0.9 * n.width() : F[0], D = Math.abs(x("#mCSB_" + A.idx + "_container")[0].offsetLeft), i = m[1][0].offsetLeft, h = m[1].parent().width() - m[1].width(), f = J.deltaX || J.deltaY || I
                            } else {
                                var G = "y", F = [Math.round(H * A.scrollRatio.y), parseInt(z.mouseWheel.scrollAmount)], E = "auto" !== z.mouseWheel.scrollAmount ? F[1] : F[0] >= n.height() ? 0.9 * n.height() : F[0], D = Math.abs(x("#mCSB_" + A.idx + "_container")[0].offsetTop), i = m[0][0].offsetTop, h = m[0].parent().height() - m[0].height(), f = J.deltaY || I
                            }
                            "y" === G && !A.overflowed[0] || "x" === G && !A.overflowed[1] || (z.mouseWheel.invert && (f = -f), z.mouseWheel.normalizeDelta && (f = 0 > f ? -1 : 1), (f > 0 && 0 !== i || 0 > f && i !== h || z.mouseWheel.preventDefault) && (J.stopImmediatePropagation(), J.preventDefault()), a._scrollTo(B, (D - f * E).toString(), {dir: G}))
                        }
                    })
                }
            }, _disableMousewheel: function(h, e) {
                var k = e.nodeName.toLowerCase(), j = h.data(v).opt.mouseWheel.disableOver, i = ["select", "textarea"];
                return x.inArray(k, j) > -1 && !(x.inArray(k, i) > -1 && !x(e).is(":focus"))
            }, _draggerRail: function() {
                var i = x(this), e = i.data(v), m = v + "_" + e.idx, l = x("#mCSB_" + e.idx + "_container"), k = l.parent(), j = x(".mCSB_" + e.idx + "_scrollbar .mCSB_draggerContainer");
                j.bind("touchstart." + m + " pointerdown." + m + " MSPointerDown." + m, function() {
                    o = !0
                }).bind("touchend." + m + " pointerup." + m + " MSPointerUp." + m, function() {
                    o = !1
                }).bind("click." + m, function(A) {
                    if (x(A.target).hasClass("mCSB_draggerContainer") || x(A.target).hasClass("mCSB_draggerRail")) {
                        a._stop(i);
                        var z = x(this), y = z.find(".mCSB_dragger");
                        if (z.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!e.overflowed[1]) {
                                return
                            }
                            var n = "x", g = A.pageX > y.offset().left ? -1 : 1, f = Math.abs(l[0].offsetLeft) - 0.9 * g * k.width()
                        } else {
                            if (!e.overflowed[0]) {
                                return
                            }
                            var n = "y", g = A.pageY > y.offset().top ? -1 : 1, f = Math.abs(l[0].offsetTop) - 0.9 * g * k.height()
                        }
                        a._scrollTo(i, f.toString(), {dir: n, scrollEasing: "mcsEaseInOut"})
                    }
                })
            }, _focus: function() {
                var e = x(this), n = e.data(v), m = n.opt, l = v + "_" + n.idx, k = x("#mCSB_" + n.idx + "_container"), j = k.parent();
                k.bind("focusin." + l, function() {
                    var i = x(c.activeElement), h = k.find(".mCustomScrollBox").length, f = 0;
                    i.is(m.advanced.autoScrollOnFocus) && (a._stop(e), clearTimeout(e[0]._focusTimeout), e[0]._focusTimer = h ? (f + 17) * h : 0, e[0]._focusTimeout = setTimeout(function() {
                        var g = [i.offset().top - k.offset().top, i.offset().left - k.offset().left], A = [k[0].offsetTop, k[0].offsetLeft], z = [A[0] + g[0] >= 0 && A[0] + g[0] < j.height() - i.outerHeight(!1), A[1] + g[1] >= 0 && A[0] + g[1] < j.width() - i.outerWidth(!1)], y = "yx" !== m.axis || z[0] || z[1] ? "all" : "none";
                        "x" === m.axis || z[0] || a._scrollTo(e, g[0].toString(), {dir: "y", scrollEasing: "mcsEaseInOut", overwrite: y, dur: f}), "y" === m.axis || z[1] || a._scrollTo(e, g[1].toString(), {dir: "x", scrollEasing: "mcsEaseInOut", overwrite: y, dur: f})
                    }, e[0]._focusTimer))
                })
            }, _wrapperScroll: function() {
                var g = x(this), e = g.data(v), i = v + "_" + e.idx, h = x("#mCSB_" + e.idx + "_container").parent();
                h.bind("scroll." + i, function() {
                    h.scrollTop(0).scrollLeft(0)
                })
            }, _buttons: function() {
                var j = x(this), e = j.data(v), y = e.opt, n = e.sequential, m = v + "_" + e.idx, l = (x("#mCSB_" + e.idx + "_container"), ".mCSB_" + e.idx + "_scrollbar"), k = x(l + ">a");
                k.bind("mousedown." + m + " touchstart." + m + " pointerdown." + m + " MSPointerDown." + m + " mouseup." + m + " touchend." + m + " pointerup." + m + " MSPointerUp." + m + " mouseout." + m + " pointerout." + m + " MSPointerOut." + m + " click." + m, function(z) {
                    function i(g, h) {
                        n.scrollAmount = y.snapAmount || y.scrollButtons.scrollAmount, a._sequentialScroll.call(this, j, g, h)
                    }
                    if (z.preventDefault(), a._mouseBtnLeft(z)) {
                        var f = x(this).attr("class");
                        switch (n.type = y.scrollButtons.scrollType, z.type) {
                            case"mousedown":
                            case"touchstart":
                            case"pointerdown":
                            case"MSPointerDown":
                                if ("stepped" === n.type) {
                                    return
                                }
                                o = !0, e.tweenRunning = !1, i("on", f);
                                break;
                            case"mouseup":
                            case"touchend":
                            case"pointerup":
                            case"MSPointerUp":
                            case"mouseout":
                            case"pointerout":
                            case"MSPointerOut":
                                if ("stepped" === n.type) {
                                    return
                                }
                                o = !1, n.dir && i("off", f);
                                break;
                            case"click":
                                if ("stepped" !== n.type || e.tweenRunning) {
                                    return
                                }
                                i("on", f)
                        }
                    }
                })
            }, _keyboard: function() {
                var D = x(this), C = D.data(v), B = C.opt, A = C.sequential, z = v + "_" + C.idx, y = x("#mCSB_" + C.idx), n = x("#mCSB_" + C.idx + "_container"), m = n.parent(), e = "input,textarea,select,datalist,keygen,[contenteditable='true']";
                y.attr("tabindex", "0").bind("blur." + z + " keydown." + z + " keyup." + z, function(E) {
                    function j(h, i) {
                        A.type = B.keyboard.scrollType, A.scrollAmount = B.snapAmount || B.keyboard.scrollAmount, "stepped" === A.type && C.tweenRunning || a._sequentialScroll.call(this, D, h, i)
                    }
                    switch (E.type) {
                        case"blur":
                            C.tweenRunning && A.dir && j("off", null);
                            break;
                        case"keydown":
                        case"keyup":
                            var g = E.keyCode ? E.keyCode : E.which, f = "on";
                            if ("x" !== B.axis && (38 === g || 40 === g) || "y" !== B.axis && (37 === g || 39 === g)) {
                                if ((38 === g || 40 === g) && !C.overflowed[0] || (37 === g || 39 === g) && !C.overflowed[1]) {
                                    return
                                }
                                "keyup" === E.type && (f = "off"), x(c.activeElement).is(e) || (E.preventDefault(), E.stopImmediatePropagation(), j(f, g))
                            } else {
                                if (33 === g || 34 === g) {
                                    if ((C.overflowed[0] || C.overflowed[1]) && (E.preventDefault(), E.stopImmediatePropagation()), "keyup" === E.type) {
                                        a._stop(D);
                                        var F = 34 === g ? -1 : 1;
                                        if ("x" === B.axis || "yx" === B.axis && C.overflowed[1] && !C.overflowed[0]) {
                                            var l = "x", k = Math.abs(n[0].offsetLeft) - 0.9 * F * m.width()
                                        } else {
                                            var l = "y", k = Math.abs(n[0].offsetTop) - 0.9 * F * m.height()
                                        }
                                        a._scrollTo(D, k.toString(), {dir: l, scrollEasing: "mcsEaseInOut"})
                                    }
                                } else {
                                    if ((35 === g || 36 === g) && !x(c.activeElement).is(e) && ((C.overflowed[0] || C.overflowed[1]) && (E.preventDefault(), E.stopImmediatePropagation()), "keyup" === E.type)) {
                                        if ("x" === B.axis || "yx" === B.axis && C.overflowed[1] && !C.overflowed[0]) {
                                            var l = "x", k = 35 === g ? Math.abs(m.width() - n.outerWidth(!1)) : 0
                                        } else {
                                            var l = "y", k = 35 === g ? Math.abs(m.height() - n.outerHeight(!1)) : 0
                                        }
                                        a._scrollTo(D, k.toString(), {dir: l, scrollEasing: "mcsEaseInOut"})
                                    }
                                }
                            }
                    }
                })
            }, _sequentialScroll: function(E, D, C) {
                function B(K) {
                    var J = "stepped" !== n.type, I = K ? J ? y.scrollInertia / 1.5 : y.scrollInertia : 1000 / 60, H = K ? J ? 7.5 : 40 : 2.5, G = [Math.abs(m[0].offsetTop), Math.abs(m[0].offsetLeft)], F = [z.scrollRatio.y > 10 ? 10 : z.scrollRatio.y, z.scrollRatio.x > 10 ? 10 : z.scrollRatio.x], k = "x" === n.dir[0] ? G[1] + n.dir[1] * F[1] * H : G[0] + n.dir[1] * F[0] * H, j = "x" === n.dir[0] ? G[1] + n.dir[1] * parseInt(n.scrollAmount) : G[0] + n.dir[1] * parseInt(n.scrollAmount), i = "auto" !== n.scrollAmount ? j : k, h = K ? J ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear", f = K ? !0 : !1;
                    return K && 17 > I && (i = "x" === n.dir[0] ? G[1] : G[0]), a._scrollTo(E, i.toString(), {dir: n.dir[0], scrollEasing: h, dur: I, onComplete: f}), K ? void (n.dir = !1) : (clearTimeout(n.step), void (n.step = setTimeout(function() {
                        B()
                    }, I)))
                }
                function A() {
                    clearTimeout(n.step), a._stop(E)
                }
                var z = E.data(v), y = z.opt, n = z.sequential, m = x("#mCSB_" + z.idx + "_container"), e = "stepped" === n.type ? !0 : !1;
                switch (D) {
                    case"on":
                        if (n.dir = ["mCSB_buttonRight" === C || "mCSB_buttonLeft" === C || 39 === C || 37 === C ? "x" : "y", "mCSB_buttonUp" === C || "mCSB_buttonLeft" === C || 38 === C || 37 === C ? -1 : 1], a._stop(E), a._isNumeric(C) && "stepped" === n.type) {
                            return
                        }
                        B(e);
                        break;
                    case"off":
                        A(), (e || z.tweenRunning && n.dir) && B(!0)
                }
            }, _arr: function(f) {
                var e = x(this).data(v).opt, g = [];
                return"function" == typeof f && (f = f()), f instanceof Array ? g = f.length > 1 ? [f[0], f[1]] : "x" === e.axis ? [null, f[0]] : [f[0], null] : (g[0] = f.y ? f.y : f.x || "x" === e.axis ? null : f, g[1] = f.x ? f.x : f.y || "y" === e.axis ? null : f), "function" == typeof g[0] && (g[0] = g[0]()), "function" == typeof g[1] && (g[1] = g[1]()), g
            }, _to: function(I, H) {
                if (null != I && "undefined" != typeof I) {
                    var G = x(this), F = G.data(v), E = F.opt, D = x("#mCSB_" + F.idx + "_container"), C = D.parent(), B = typeof I;
                    H || (H = "x" === E.axis ? "x" : "y");
                    var A = "x" === H ? D.outerWidth(!1) : D.outerHeight(!1), z = "x" === H ? D.offset().left : D.offset().top, y = "x" === H ? D[0].offsetLeft : D[0].offsetTop, n = "x" === H ? "left" : "top";
                    switch (B) {
                        case"function":
                            return I();
                        case"object":
                            if (I.nodeType) {
                                var m = "x" === H ? x(I).offset().left : x(I).offset().top
                            } else {
                                if (I.jquery) {
                                    if (!I.length) {
                                        return
                                    }
                                    var m = "x" === H ? I.offset().left : I.offset().top
                                }
                            }
                            return m - z;
                        case"string":
                        case"number":
                            if (a._isNumeric.call(null, I)) {
                                return Math.abs(I)
                            }
                            if (-1 !== I.indexOf("%")) {
                                return Math.abs(A * parseInt(I) / 100)
                            }
                            if (-1 !== I.indexOf("-=")) {
                                return Math.abs(y - parseInt(I.split("-=")[1]))
                            }
                            if (-1 !== I.indexOf("+=")) {
                                var e = y + parseInt(I.split("+=")[1]);
                                return e >= 0 ? 0 : Math.abs(e)
                            }
                            if (-1 !== I.indexOf("px") && a._isNumeric.call(null, I.split("px")[0])) {
                                return Math.abs(I.split("px")[0])
                            }
                            if ("top" === I || "left" === I) {
                                return 0
                            }
                            if ("bottom" === I) {
                                return Math.abs(C.height() - D.outerHeight(!1))
                            }
                            if ("right" === I) {
                                return Math.abs(C.width() - D.outerWidth(!1))
                            }
                            if ("first" === I || "last" === I) {
                                var J = D.find(":" + I), m = "x" === H ? x(J).offset().left : x(J).offset().top;
                                return m - z
                            }
                            if (x(I).length) {
                                var m = "x" === H ? x(I).offset().left : x(I).offset().top;
                                return m - z
                            }
                            return D.css(n, I), void b.update.call(null, G[0])
                    }
                }
            }, _autoUpdate: function(N) {
                function M() {
                    clearTimeout(E[0].autoUpdate), E[0].autoUpdate = setTimeout(function() {
                        return F.advanced.updateOnSelectorChange && (D = J(), D !== n) ? (I(), void (n = D)) : (F.advanced.updateOnContentResize && (C = [E.outerHeight(!1), E.outerWidth(!1), A.height(), A.width(), y()[0], y()[1]], (C[0] !== m[0] || C[1] !== m[1] || C[2] !== m[2] || C[3] !== m[3] || C[4] !== m[4] || C[5] !== m[5]) && (I(), m = C)), F.advanced.updateOnImageLoad && (B = L(), B !== e && (E.find("img").each(function() {
                            K(this.src)
                        }), e = B)), void ((F.advanced.updateOnSelectorChange || F.advanced.updateOnContentResize || F.advanced.updateOnImageLoad) && M()))
                    }, 60)
                }
                function L() {
                    var f = 0;
                    return F.advanced.updateOnImageLoad && (f = E.find("img").length), f
                }
                function K(g) {
                    function f(k, j) {
                        return function() {
                            return j.apply(k, arguments)
                        }
                    }
                    function i() {
                        this.onload = null, I()
                    }
                    var h = new Image;
                    h.onload = f(h, i), h.src = g
                }
                function J() {
                    F.advanced.updateOnSelectorChange === !0 && (F.advanced.updateOnSelectorChange = "*");
                    var g = 0, f = E.find(F.advanced.updateOnSelectorChange);
                    return F.advanced.updateOnSelectorChange && f.length > 0 && f.each(function() {
                        g += x(this).height() + x(this).width()
                    }), g
                }
                function I() {
                    clearTimeout(E[0].autoUpdate), b.update.call(null, H[0])
                }
                var H = x(this), G = H.data(v), F = G.opt, E = x("#mCSB_" + G.idx + "_container");
                if (N) {
                    return clearTimeout(E[0].autoUpdate), void a._delete.call(null, E[0].autoUpdate)
                }
                var D, C, B, A = E.parent(), z = [x("#mCSB_" + G.idx + "_scrollbar_vertical"), x("#mCSB_" + G.idx + "_scrollbar_horizontal")], y = function() {
                    return[z[0].is(":visible") ? z[0].outerHeight(!0) : 0, z[1].is(":visible") ? z[1].outerWidth(!0) : 0]
                }, n = J(), m = [E.outerHeight(!1), E.outerWidth(!1), A.height(), A.width(), y()[0], y()[1]], e = L();
                M()
            }, _snapAmount: function(f, e, g) {
                return Math.round(f / e) * e - g
            }, _stop: function(f) {
                var e = f.data(v), g = x("#mCSB_" + e.idx + "_container,#mCSB_" + e.idx + "_container_wrapper,#mCSB_" + e.idx + "_dragger_vertical,#mCSB_" + e.idx + "_dragger_horizontal");
                g.each(function() {
                    a._stopTween.call(this)
                })
            }, _scrollTo: function(U, T, S) {
                function R(f) {
                    return O && N.callbacks[f] && "function" == typeof N.callbacks[f]
                }
                function Q() {
                    return[N.callbacks.alwaysTriggerOffsets || E >= D[0] + B, N.callbacks.alwaysTriggerOffsets || -A >= E]
                }
                function P() {
                    var g = [J[0].offsetTop, J[0].offsetLeft], j = [G[0].offsetTop, G[0].offsetLeft], i = [J.outerHeight(!1), J.outerWidth(!1)], h = [K.height(), K.width()];
                    U[0].mcs = {content: J, top: g[0], left: g[1], draggerTop: j[0], draggerLeft: j[1], topPct: Math.round(100 * Math.abs(g[0]) / (Math.abs(i[0]) - h[0])), leftPct: Math.round(100 * Math.abs(g[1]) / (Math.abs(i[1]) - h[1])), direction: S.dir}
                }
                var O = U.data(v), N = O.opt, M = {trigger: "internal", dir: "y", scrollEasing: "mcsEaseOut", drag: !1, dur: N.scrollInertia, overwrite: "all", callbacks: !0, onStart: !0, onUpdate: !0, onComplete: !0}, S = x.extend(M, S), L = [S.dur, S.drag ? 0 : S.dur], K = x("#mCSB_" + O.idx), J = x("#mCSB_" + O.idx + "_container"), I = N.callbacks.onTotalScrollOffset ? a._arr.call(U, N.callbacks.onTotalScrollOffset) : [0, 0], H = N.callbacks.onTotalScrollBackOffset ? a._arr.call(U, N.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (O.trigger = S.trigger, "_resetY" !== T || O.contentReset.y || (R("onOverflowYNone") && N.callbacks.onOverflowYNone.call(U[0]), O.contentReset.y = 1), "_resetX" !== T || O.contentReset.x || (R("onOverflowXNone") && N.callbacks.onOverflowXNone.call(U[0]), O.contentReset.x = 1), "_resetY" !== T && "_resetX" !== T) {
                    switch (!O.contentReset.y && U[0].mcs || !O.overflowed[0] || (R("onOverflowY") && N.callbacks.onOverflowY.call(U[0]), O.contentReset.x = null), !O.contentReset.x && U[0].mcs || !O.overflowed[1] || (R("onOverflowX") && N.callbacks.onOverflowX.call(U[0]), O.contentReset.x = null), N.snapAmount && (T = a._snapAmount(T, N.snapAmount, N.snapOffset)), S.dir) {
                        case"x":
                            var G = x("#mCSB_" + O.idx + "_dragger_horizontal"), F = "left", E = J[0].offsetLeft, D = [K.width() - J.outerWidth(!1), G.parent().width() - G.width()], C = [T, 0 === T ? 0 : T / O.scrollRatio.x], B = I[1], A = H[1], n = B > 0 ? B / O.scrollRatio.x : 0, e = A > 0 ? A / O.scrollRatio.x : 0;
                            break;
                        case"y":
                            var G = x("#mCSB_" + O.idx + "_dragger_vertical"), F = "top", E = J[0].offsetTop, D = [K.height() - J.outerHeight(!1), G.parent().height() - G.height()], C = [T, 0 === T ? 0 : T / O.scrollRatio.y], B = I[0], A = H[0], n = B > 0 ? B / O.scrollRatio.y : 0, e = A > 0 ? A / O.scrollRatio.y : 0
                    }
                    C[1] < 0 || 0 === C[0] && 0 === C[1] ? C = [0, 0] : C[1] >= D[1] ? C = [D[0], D[1]] : C[0] = -C[0], U[0].mcs || P(), clearTimeout(J[0].onCompleteTimeout), (O.tweenRunning || !(0 === E && C[0] >= 0 || E === D[0] && C[0] <= D[0])) && (a._tweenTo.call(null, G[0], F, Math.round(C[1]), L[1], S.scrollEasing), a._tweenTo.call(null, J[0], F, Math.round(C[0]), L[0], S.scrollEasing, S.overwrite, {onStart: function() {
                            S.callbacks && S.onStart && !O.tweenRunning && (R("onScrollStart") && (P(), N.callbacks.onScrollStart.call(U[0])), O.tweenRunning = !0, a._onDragClasses(G), O.cbOffsets = Q())
                        }, onUpdate: function() {
                            S.callbacks && S.onUpdate && R("whileScrolling") && (P(), N.callbacks.whileScrolling.call(U[0]))
                        }, onComplete: function() {
                            if (S.callbacks && S.onComplete) {
                                "yx" === N.axis && clearTimeout(J[0].onCompleteTimeout);
                                var f = J[0].idleTimer || 0;
                                J[0].onCompleteTimeout = setTimeout(function() {
                                    R("onScroll") && (P(), N.callbacks.onScroll.call(U[0])), R("onTotalScroll") && C[1] >= D[1] - n && O.cbOffsets[0] && (P(), N.callbacks.onTotalScroll.call(U[0])), R("onTotalScrollBack") && C[1] <= e && O.cbOffsets[1] && (P(), N.callbacks.onTotalScrollBack.call(U[0])), O.tweenRunning = !1, J[0].idleTimer = 0, a._onDragClasses(G, "hide")
                                }, f)
                            }
                        }}))
                }
            }, _tweenTo: function(S, R, Q, P, O, N, M) {
                function L() {
                    S._mcsstop || (A || E.call(), A = a._getTime() - B, K(), A >= S._mcstime && (S._mcstime = A > S._mcstime ? A + G - (A - S._mcstime) : A + G - 1, S._mcstime < A + 1 && (S._mcstime = A + 1)), S._mcstime < P ? S._mcsid = F(L) : C.call())
                }
                function K() {
                    P > 0 ? (S._mcscurrVal = H(S._mcstime, z, n, P, O), y[R] = Math.round(S._mcscurrVal) + "px") : y[R] = Q + "px", D.call()
                }
                function J() {
                    G = 1000 / 60, S._mcstime = A + G, F = d.requestAnimationFrame ? d.requestAnimationFrame : function(e) {
                        return K(), setTimeout(e, 0.01)
                    }, S._mcsid = F(L)
                }
                function I() {
                    null != S._mcsid && (d.requestAnimationFrame ? d.cancelAnimationFrame(S._mcsid) : clearTimeout(S._mcsid), S._mcsid = null)
                }
                function H(i, h, T, m, l) {
                    switch (l) {
                        case"linear":
                        case"mcsLinear":
                            return T * i / m + h;
                        case"mcsLinearOut":
                            return i /= m, i--, T * Math.sqrt(1 - i * i) + h;
                        case"easeInOutSmooth":
                            return i /= m / 2, 1 > i ? T / 2 * i * i + h : (i--, -T / 2 * (i * (i - 2) - 1) + h);
                        case"easeInOutStrong":
                            return i /= m / 2, 1 > i ? T / 2 * Math.pow(2, 10 * (i - 1)) + h : (i--, T / 2 * (-Math.pow(2, -10 * i) + 2) + h);
                        case"easeInOut":
                        case"mcsEaseInOut":
                            return i /= m / 2, 1 > i ? T / 2 * i * i * i + h : (i -= 2, T / 2 * (i * i * i + 2) + h);
                        case"easeOutSmooth":
                            return i /= m, i--, -T * (i * i * i * i - 1) + h;
                        case"easeOutStrong":
                            return T * (-Math.pow(2, -10 * i / m) + 1) + h;
                        case"easeOut":
                        case"mcsEaseOut":
                        default:
                            var k = (i /= m) * i, j = k * i;
                            return h + T * (0.499999999999997 * j * k + -2.5 * k * k + 5.5 * j + -6.5 * k + 4 * i)
                    }
                }
                var G, F, M = M || {}, E = M.onStart || function() {
                }, D = M.onUpdate || function() {
                }, C = M.onComplete || function() {
                }, B = a._getTime(), A = 0, z = S.offsetTop, y = S.style;
                "left" === R && (z = S.offsetLeft);
                var n = Q - z;
                S._mcsstop = 0, "none" !== N && I(), J()
            }, _getTime: function() {
                return d.performance && d.performance.now ? d.performance.now() : d.performance && d.performance.webkitNow ? d.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            }, _stopTween: function() {
                var e = this;
                null != e._mcsid && (d.requestAnimationFrame ? d.cancelAnimationFrame(e._mcsid) : clearTimeout(e._mcsid), e._mcsid = null, e._mcsstop = 1)
            }, _delete: function(f) {
                try {
                    delete f
                } catch (e) {
                    f = null
                }
            }, _mouseBtnLeft: function(e) {
                return !(e.which && 1 !== e.which)
            }, _pointerTouch: function(f) {
                var e = f.originalEvent.pointerType;
                return !(e && "touch" !== e && 2 !== e)
            }, _isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            }};
        x.fn[w] = function(e) {
            return b[e] ? b[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void x.error("Method " + e + " does not exist") : b.init.apply(this, arguments)
        }, x[w] = function(e) {
            return b[e] ? b[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void x.error("Method " + e + " does not exist") : b.init.apply(this, arguments)
        }, x[w].defaults = t, d[w] = !0, x(d).load(function() {
            x(u)[w]()
        })
    })
}(window, document), function(j) {
    var i = -1, p = -1, o = function(b) {
        return parseFloat(b) || 0
    }, n = function(a) {
        var f = null, d = [];
        return j(a).each(function() {
            var c = j(this), h = c.offset().top - o(c.css("margin-top")), e = 0 < d.length ? d[d.length - 1] : null;
            null === e ? d.push(c) : 1 >= Math.floor(Math.abs(f - h)) ? d[d.length - 1] = e.add(c) : d.push(c), f = h
        }), d
    }, m = function(a) {
        var d = {byRow: !0, property: "height", target: null, remove: !1};
        return"object" == typeof a ? j.extend(d, a) : ("boolean" == typeof a ? d.byRow = a : "remove" === a && (d.remove = !0), d)
    }, l = j.fn.matchHeight = function(a) {
        if (a = m(a), a.remove) {
            var d = this;
            return this.css(a.property, ""), j.each(l._groups, function(e, c) {
                c.elements = c.elements.not(d)
            }), this
        }
        return 1 >= this.length && !a.target ? this : (l._groups.push({elements: this, options: a}), l._apply(this, a), this)
    };
    l._groups = [], l._throttle = 80, l._maintainScroll = !1, l._beforeUpdate = null, l._afterUpdate = null, l._apply = function(d, s) {
        var r = m(s), q = j(d), g = [q], f = j(window).scrollTop(), e = j("html").outerHeight(!0), a = q.parents().filter(":hidden");
        return a.each(function() {
            var c = j(this);
            c.data("style-cache", c.attr("style"))
        }), a.css("display", "block"), r.byRow && !r.target && (q.each(function() {
            var h = j(this), t = "inline-block" === h.css("display") ? "inline-block" : "block";
            h.data("style-cache", h.attr("style")), h.css({display: t, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px"})
        }), g = n(q), q.each(function() {
            var c = j(this);
            c.attr("style", c.data("style-cache") || "")
        })), j.each(g, function(h, v) {
            var u = j(v), t = 0;
            if (r.target) {
                t = r.target.outerHeight(!1)
            } else {
                if (r.byRow && 1 >= u.length) {
                    return void u.css(r.property, "")
                }
                u.each(function() {
                    var w = j(this), x = {display: "inline-block" === w.css("display") ? "inline-block" : "block"};
                    x[r.property] = "", w.css(x), w.outerHeight(!1) > t && (t = w.outerHeight(!1)), w.css("display", "")
                })
            }
            u.each(function() {
                var w = j(this), x = 0;
                r.target && w.is(r.target) || ("border-box" !== w.css("box-sizing") && (x += o(w.css("border-top-width")) + o(w.css("border-bottom-width")), x += o(w.css("padding-top")) + o(w.css("padding-bottom"))), w.css(r.property, t - x))
            })
        }), a.each(function() {
            var c = j(this);
            c.attr("style", c.data("style-cache") || null)
        }), l._maintainScroll && j(window).scrollTop(f / e * j("html").outerHeight(!0)), this
    }, l._applyDataApi = function() {
        var a = {};
        j("[data-match-height], [data-mh]").each(function() {
            var e = j(this), b = e.attr("data-mh") || e.attr("data-match-height");
            a[b] = b in a ? a[b].add(e) : e
        }), j.each(a, function() {
            this.matchHeight(!0)
        })
    };
    var k = function(a) {
        l._beforeUpdate && l._beforeUpdate(a, l._groups), j.each(l._groups, function() {
            l._apply(this.elements, this.options)
        }), l._afterUpdate && l._afterUpdate(a, l._groups)
    };
    l._update = function(c, b) {
        if (b && "resize" === b.type) {
            var a = j(window).width();
            if (a === i) {
                return
            }
            i = a
        }
        c ? -1 === p && (p = setTimeout(function() {
            k(b), p = -1
        }, l._throttle)) : k(b)
    }, j(l._applyDataApi), j(window).bind("load", function(b) {
        l._update(!1, b)
    }), j(window).bind("resize orientationchange", function(b) {
        l._update(!0, b)
    })
}(jQuery), !function(R) {
    function Q() {
        var b = K();
        b !== J && (J = b, G.trigger("orientationchange"))
    }
    function P(a, j, i, h) {
        var g = i.type;
        i.type = j, R.event.dispatch.call(a, i, h), i.type = g
    }
    R.attrFn = R.attrFn || {};
    var O = navigator.userAgent.toLowerCase(), N = O.indexOf("chrome") > -1 && (O.indexOf("windows") > -1 || O.indexOf("macintosh") > -1 || O.indexOf("linux") > -1) && O.indexOf("mobile") < 0 && O.indexOf("android") < 0, M = {tap_pixel_range: 5, swipe_h_threshold: 50, swipe_v_threshold: 50, taphold_threshold: 750, doubletap_int: 500, touch_capable: "ontouchstart" in window && !N, orientation_support: "orientation" in window && "onorientationchange" in window, startevent: "ontouchstart" in window && !N ? "touchstart" : "mousedown", endevent: "ontouchstart" in window && !N ? "touchend" : "mouseup", moveevent: "ontouchstart" in window && !N ? "touchmove" : "mousemove", tapevent: "ontouchstart" in window && !N ? "tap" : "click", scrollevent: "ontouchstart" in window && !N ? "touchmove" : "scroll", hold_timer: null, tap_timer: null};
    R.isTouchCapable = function() {
        return M.touch_capable
    }, R.getStartEvent = function() {
        return M.startevent
    }, R.getEndEvent = function() {
        return M.endevent
    }, R.getMoveEvent = function() {
        return M.moveevent
    }, R.getTapEvent = function() {
        return M.tapevent
    }, R.getScrollEvent = function() {
        return M.scrollevent
    }, R.each(["tapstart", "tapend", "tapmove", "tap", "tap2", "tap3", "tap4", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(a, d) {
        R.fn[d] = function(b) {
            return b ? this.on(d, b) : this.trigger(d)
        }, R.attrFn[d] = !0
    }), R.event.special.tapstart = {setup: function() {
            var a = this, f = R(a);
            f.on(M.startevent, function c(b) {
                if (f.data("callee", c), b.which && 1 !== b.which) {
                    return !1
                }
                var e = b.originalEvent, d = {position: {x: M.touch_capable ? e.touches[0].screenX : b.screenX, y: M.touch_capable ? e.touches[0].screenY : b.screenY}, offset: {x: Math.round(M.touch_capable ? e.changedTouches[0].pageX - f.offset().left : b.pageX - f.offset().left), y: Math.round(M.touch_capable ? e.changedTouches[0].pageY - f.offset().top : b.pageY - f.offset().top)}, time: Date.now(), target: b.target};
                return P(a, "tapstart", b, d), !0
            })
        }, remove: function() {
            R(this).off(M.startevent, R(this).data.callee)
        }}, R.event.special.tapmove = {setup: function() {
            var a = this, f = R(a);
            f.on(M.moveevent, function c(b) {
                f.data("callee", c);
                var e = b.originalEvent, d = {position: {x: M.touch_capable ? e.touches[0].screenX : b.screenX, y: M.touch_capable ? e.touches[0].screenY : b.screenY}, offset: {x: Math.round(M.touch_capable ? e.changedTouches[0].pageX - f.offset().left : b.pageX - f.offset().left), y: Math.round(M.touch_capable ? e.changedTouches[0].pageY - f.offset().top : b.pageY - f.offset().top)}, time: Date.now(), target: b.target};
                return P(a, "tapmove", b, d), !0
            })
        }, remove: function() {
            R(this).off(M.moveevent, R(this).data.callee)
        }}, R.event.special.tapend = {setup: function() {
            var a = this, f = R(a);
            f.on(M.endevent, function c(b) {
                f.data("callee", c);
                var e = b.originalEvent, d = {position: {x: M.touch_capable ? e.changedTouches[0].screenX : b.screenX, y: M.touch_capable ? e.changedTouches[0].screenY : b.screenY}, offset: {x: Math.round(M.touch_capable ? e.changedTouches[0].pageX - f.offset().left : b.pageX - f.offset().left), y: Math.round(M.touch_capable ? e.changedTouches[0].pageY - f.offset().top : b.pageY - f.offset().top)}, time: Date.now(), target: b.target};
                return P(a, "tapend", b, d), !0
            })
        }, remove: function() {
            R(this).off(M.endevent, R(this).data.callee)
        }}, R.event.special.taphold = {setup: function() {
            var r, q = this, p = R(q), o = {x: 0, y: 0}, n = 0, m = 0;
            p.on(M.startevent, function f(e) {
                if (e.which && 1 !== e.which) {
                    return !1
                }
                p.data("tapheld", !1), r = e.target;
                var g = e.originalEvent, d = Date.now(), b = {x: M.touch_capable ? g.touches[0].screenX : e.screenX, y: M.touch_capable ? g.touches[0].screenY : e.screenY}, h = {x: M.touch_capable ? g.touches[0].pageX - g.touches[0].target.offsetLeft : e.offsetX, y: M.touch_capable ? g.touches[0].pageY - g.touches[0].target.offsetTop : e.offsetY};
                return o.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, o.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, n = o.x, m = o.y, M.hold_timer = window.setTimeout(function() {
                    var T = o.x - n, S = o.y - m;
                    if (e.target == r && (o.x == n && o.y == m || T >= -M.tap_pixel_range && T <= M.tap_pixel_range && S >= -M.tap_pixel_range && S <= M.tap_pixel_range)) {
                        p.data("tapheld", !0);
                        var v = Date.now(), l = {x: M.touch_capable ? g.touches[0].screenX : e.screenX, y: M.touch_capable ? g.touches[0].screenY : e.screenY}, k = {x: Math.round(M.touch_capable ? g.changedTouches[0].pageX - p.offset().left : e.pageX - p.offset().left), y: Math.round(M.touch_capable ? g.changedTouches[0].pageY - p.offset().top : e.pageY - p.offset().top)}, j = v - d, i = {startTime: d, endTime: v, startPosition: b, startOffset: h, endPosition: l, endOffset: k, duration: j, target: e.target};
                        p.data("callee1", f), P(q, "taphold", e, i)
                    }
                }, M.taphold_threshold), !0
            }).on(M.endevent, function c() {
                p.data("callee2", c), p.data("tapheld", !1), window.clearTimeout(M.hold_timer)
            }).on(M.moveevent, function a(b) {
                p.data("callee3", a), n = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, m = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY
            })
        }, remove: function() {
            R(this).off(M.startevent, R(this).data.callee1).off(M.endevent, R(this).data.callee2).off(M.moveevent, R(this).data.callee3)
        }}, R.event.special.doubletap = {setup: function() {
            var t, s, r, q, p = this, o = R(p), n = null, f = !1;
            o.on(M.startevent, function c(b) {
                return b.which && 1 !== b.which ? !1 : (o.data("doubletapped", !1), t = b.target, o.data("callee1", c), r = b.originalEvent, n || (n = {position: {x: M.touch_capable ? r.touches[0].screenX : b.screenX, y: M.touch_capable ? r.touches[0].screenY : b.screenY}, offset: {x: Math.round(M.touch_capable ? r.changedTouches[0].pageX - o.offset().left : b.pageX - o.offset().left), y: Math.round(M.touch_capable ? r.changedTouches[0].pageY - o.offset().top : b.pageY - o.offset().top)}, time: Date.now(), target: b.target}), !0)
            }).on(M.endevent, function a(d) {
                var b = Date.now(), i = o.data("lastTouch") || b + 1, h = b - i;
                if (window.clearTimeout(s), o.data("callee2", a), h < M.doubletap_int && d.target == t && h > 100) {
                    o.data("doubletapped", !0), window.clearTimeout(M.tap_timer);
                    var g = {position: {x: M.touch_capable ? d.originalEvent.changedTouches[0].screenX : d.screenX, y: M.touch_capable ? d.originalEvent.changedTouches[0].screenY : d.screenY}, offset: {x: Math.round(M.touch_capable ? r.changedTouches[0].pageX - o.offset().left : d.pageX - o.offset().left), y: Math.round(M.touch_capable ? r.changedTouches[0].pageY - o.offset().top : d.pageY - o.offset().top)}, time: Date.now(), target: d.target}, e = {firstTap: n, secondTap: g, interval: g.time - n.time};
                    f || (P(p, "doubletap", d, e), n = null), f = !0, q = window.setTimeout(function() {
                        f = !1
                    }, M.doubletap_int)
                } else {
                    o.data("lastTouch", b), s = window.setTimeout(function() {
                        n = null, window.clearTimeout(s)
                    }, M.doubletap_int, [d])
                }
                o.data("lastTouch", b)
            })
        }, remove: function() {
            R(this).off(M.startevent, R(this).data.callee1).off(M.endevent, R(this).data.callee2)
        }}, R.event.special.singletap = {setup: function() {
            var a = this, n = R(a), m = null, l = null, k = {x: 0, y: 0};
            n.on(M.startevent, function f(b) {
                return b.which && 1 !== b.which ? !1 : (l = Date.now(), m = b.target, n.data("callee1", f), k.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, k.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, !0)
            }).on(M.endevent, function c(b) {
                if (n.data("callee2", c), b.target == m) {
                    var e = b.originalEvent.changedTouches ? b.originalEvent.changedTouches[0].pageX : b.pageX, d = b.originalEvent.changedTouches ? b.originalEvent.changedTouches[0].pageY : b.pageY;
                    M.tap_timer = window.setTimeout(function() {
                        if (!n.data("doubletapped") && !n.data("tapheld") && k.x == e && k.y == d) {
                            var h = b.originalEvent, g = {position: {x: M.touch_capable ? h.changedTouches[0].screenX : b.screenX, y: M.touch_capable ? h.changedTouches[0].screenY : b.screenY}, offset: {x: Math.round(M.touch_capable ? h.changedTouches[0].pageX - n.offset().left : b.pageX - n.offset().left), y: Math.round(M.touch_capable ? h.changedTouches[0].pageY - n.offset().top : b.pageY - n.offset().top)}, time: Date.now(), target: b.target};
                            g.time - l < M.taphold_threshold && P(a, "singletap", b, g)
                        }
                    }, M.doubletap_int)
                }
            })
        }, remove: function() {
            R(this).off(M.startevent, R(this).data.callee1).off(M.endevent, R(this).data.callee2)
        }}, R.event.special.tap = {setup: function() {
            var r, q, p = this, o = R(p), n = !1, m = null, f = {x: 0, y: 0};
            o.on(M.startevent, function c(b) {
                return o.data("callee1", c), b.which && 1 !== b.which ? !1 : (n = !0, f.x = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageX : b.pageX, f.y = b.originalEvent.targetTouches ? b.originalEvent.targetTouches[0].pageY : b.pageY, r = Date.now(), m = b.target, q = b.originalEvent.targetTouches ? b.originalEvent.targetTouches : [b], !0)
            }).on(M.endevent, function a(l) {
                o.data("callee2", a);
                var j = l.originalEvent.targetTouches ? l.originalEvent.changedTouches[0].pageX : l.pageX, i = l.originalEvent.targetTouches ? l.originalEvent.changedTouches[0].pageY : l.pageY, h = f.x - j, g = f.y - i;
                if (m == l.target && n && Date.now() - r < M.taphold_threshold && (f.x == j && f.y == i || h >= -M.tap_pixel_range && h <= M.tap_pixel_range && g >= -M.tap_pixel_range && g <= M.tap_pixel_range)) {
                    for (var e = l.originalEvent, d = [], b = 0;
                            b < q.length;
                            b++) {
                        var t = {position: {x: M.touch_capable ? e.changedTouches[b].screenX : l.screenX, y: M.touch_capable ? e.changedTouches[b].screenY : l.screenY}, offset: {x: Math.round(M.touch_capable ? e.changedTouches[b].pageX - o.offset().left : l.pageX - o.offset().left), y: Math.round(M.touch_capable ? e.changedTouches[b].pageY - o.offset().top : l.pageY - o.offset().top)}, time: Date.now(), target: l.target};
                        d.push(t)
                    }
                    P(p, "tap", l, d)
                }
            })
        }, remove: function() {
            R(this).off(M.startevent, R(this).data.callee1).off(M.endevent, R(this).data.callee2)
        }}, R.event.special.swipe = {setup: function() {
            function t(e) {
                o = R(e.currentTarget), o.data("callee1", t), f.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, f.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, a.x = f.x, a.y = f.y, n = !0;
                var b = e.originalEvent;
                q = {position: {x: M.touch_capable ? b.touches[0].screenX : e.screenX, y: M.touch_capable ? b.touches[0].screenY : e.screenY}, offset: {x: Math.round(M.touch_capable ? b.changedTouches[0].pageX - o.offset().left : e.pageX - o.offset().left), y: Math.round(M.touch_capable ? b.changedTouches[0].pageY - o.offset().top : e.pageY - o.offset().top)}, time: Date.now(), target: e.target}
            }
            function s(v) {
                o = R(v.currentTarget), o.data("callee2", s), a.x = v.originalEvent.targetTouches ? v.originalEvent.targetTouches[0].pageX : v.pageX, a.y = v.originalEvent.targetTouches ? v.originalEvent.targetTouches[0].pageY : v.pageY;
                var u, l = o.parent().data("xthreshold") ? o.parent().data("xthreshold") : o.data("xthreshold"), k = o.parent().data("ythreshold") ? o.parent().data("ythreshold") : o.data("ythreshold"), j = "undefined" != typeof l && l !== !1 && parseInt(l) ? parseInt(l) : M.swipe_h_threshold, i = "undefined" != typeof k && k !== !1 && parseInt(k) ? parseInt(k) : M.swipe_v_threshold;
                if (f.y > a.y && f.y - a.y > i && (u = "swipeup"), f.x < a.x && a.x - f.x > j && (u = "swiperight"), f.y < a.y && a.y - f.y > i && (u = "swipedown"), f.x > a.x && f.x - a.x > j && (u = "swipeleft"), void 0 != u && n) {
                    f.x = 0, f.y = 0, a.x = 0, a.y = 0, n = !1;
                    var h = v.originalEvent, e = {position: {x: M.touch_capable ? h.touches[0].screenX : v.screenX, y: M.touch_capable ? h.touches[0].screenY : v.screenY}, offset: {x: Math.round(M.touch_capable ? h.changedTouches[0].pageX - o.offset().left : v.pageX - o.offset().left), y: Math.round(M.touch_capable ? h.changedTouches[0].pageY - o.offset().top : v.pageY - o.offset().top)}, time: Date.now(), target: v.target}, c = Math.abs(q.position.x - e.position.x), T = Math.abs(q.position.y - e.position.y), S = {startEvnt: q, endEvnt: e, direction: u.replace("swipe", ""), xAmount: c, yAmount: T, duration: e.time - q.time};
                    m = !0, o.trigger("swipe", S).trigger(u, S)
                }
            }
            function r(V) {
                o = R(V.currentTarget);
                var U = "";
                if (o.data("callee3", r), m) {
                    var T = o.data("xthreshold"), S = o.data("ythreshold"), v = "undefined" != typeof T && T !== !1 && parseInt(T) ? parseInt(T) : M.swipe_h_threshold, u = "undefined" != typeof S && S !== !1 && parseInt(S) ? parseInt(S) : M.swipe_v_threshold, j = V.originalEvent, i = {position: {x: M.touch_capable ? j.changedTouches[0].screenX : V.screenX, y: M.touch_capable ? j.changedTouches[0].screenY : V.screenY}, offset: {x: Math.round(M.touch_capable ? j.changedTouches[0].pageX - o.offset().left : V.pageX - o.offset().left), y: Math.round(M.touch_capable ? j.changedTouches[0].pageY - o.offset().top : V.pageY - o.offset().top)}, time: Date.now(), target: V.target};
                    q.position.y > i.position.y && q.position.y - i.position.y > u && (U = "swipeup"), q.position.x < i.position.x && i.position.x - q.position.x > v && (U = "swiperight"), q.position.y < i.position.y && i.position.y - q.position.y > u && (U = "swipedown"), q.position.x > i.position.x && q.position.x - i.position.x > v && (U = "swipeleft");
                    var h = Math.abs(q.position.x - i.position.x), e = Math.abs(q.position.y - i.position.y), d = {startEvnt: q, endEvnt: i, direction: U.replace("swipe", ""), xAmount: h, yAmount: e, duration: i.time - q.time};
                    o.trigger("swipeend", d)
                }
                n = !1, m = !1
            }
            var q, p = this, o = R(p), n = !1, m = !1, f = {x: 0, y: 0}, a = {x: 0, y: 0};
            o.on(M.startevent, t), o.on(M.moveevent, s), o.on(M.endevent, r)
        }, remove: function() {
            R(this).off(M.startevent, R(this).data.callee1).off(M.moveevent, R(this).data.callee2).off(M.endevent, R(this).data.callee3)
        }}, R.event.special.scrollstart = {setup: function() {
            function a(e, d) {
                l = d, P(j, l ? "scrollstart" : "scrollend", e)
            }
            var l, k, j = this, f = R(j);
            f.on(M.scrollevent, function c(b) {
                f.data("callee", c), l || a(b, !0), clearTimeout(k), k = setTimeout(function() {
                    a(b, !1)
                }, 50)
            })
        }, remove: function() {
            R(this).off(M.scrollevent, R(this).data.callee)
        }};
    var L, K, J, I, H, G = R(window), F = {0: !0, 180: !0};
    if (M.orientation_support) {
        var E = window.innerWidth || G.width(), D = window.innerHeight || G.height(), C = 50;
        I = E > D && E - D > C, H = F[window.orientation], (I && H || !I && !H) && (F = {"-90": !0, 90: !0})
    }
    R.event.special.orientationchange = L = {setup: function() {
            return M.orientation_support ? !1 : (J = K(), G.on("throttledresize", Q), !0)
        }, teardown: function() {
            return M.orientation_support ? !1 : (G.off("throttledresize", Q), !0)
        }, add: function(d) {
            var c = d.handler;
            d.handler = function(b) {
                return b.orientation = K(), c.apply(this, arguments)
            }
        }}, R.event.special.orientationchange.orientation = K = function() {
        var d = !0, c = document.documentElement;
        return d = M.orientation_support ? F[window.orientation] : c && c.clientWidth / c.clientHeight < 1.1, d ? "portrait" : "landscape"
    }, R.event.special.throttledresize = {setup: function() {
            R(this).on("resize", x)
        }, teardown: function() {
            R(this).off("resize", x)
        }};
    var B, A, z, y = 250, x = function() {
        A = Date.now(), z = A - w, z >= y ? (w = A, R(this).trigger("throttledresize")) : (B && window.clearTimeout(B), B = window.setTimeout(Q, y - z))
    }, w = 0;
    R.each({scrollend: "scrollstart", swipeup: "swipe", swiperight: "swipe", swipedown: "swipe", swipeleft: "swipe", swipeend: "swipe", tap2: "tap"}, function(a, d) {
        R.event.special[a] = {setup: function() {
                R(this).on(d, R.noop)
            }}
    })
}(jQuery),
        /*!
         * jQuery Mousewheel 3.1.12
         *
         * Copyright 2014 jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         */
                function(b) {
                    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b : b(jQuery)
                }(function(v) {
            function u(z) {
                var y = z || window.event, x = n.call(arguments, 1), w = 0, k = 0, i = 0, f = 0, e = 0, d = 0;
                if (z = v.event.fix(y), z.type = "mousewheel", "detail" in y && (i = -1 * y.detail), "wheelDelta" in y && (i = y.wheelDelta), "wheelDeltaY" in y && (i = y.wheelDeltaY), "wheelDeltaX" in y && (k = -1 * y.wheelDeltaX), "axis" in y && y.axis === y.HORIZONTAL_AXIS && (k = -1 * i, i = 0), w = 0 === i ? k : i, "deltaY" in y && (i = -1 * y.deltaY, w = i), "deltaX" in y && (k = y.deltaX, 0 === i && (w = -1 * k)), 0 !== i || 0 !== k) {
                    if (1 === y.deltaMode) {
                        var c = v.data(this, "mousewheel-line-height");
                        w *= c, i *= c, k *= c
                    } else {
                        if (2 === y.deltaMode) {
                            var a = v.data(this, "mousewheel-page-height");
                            w *= a, i *= a, k *= a
                        }
                    }
                    if (f = Math.max(Math.abs(i), Math.abs(k)), (!q || q > f) && (q = f, s(y, f) && (q /= 40)), s(y, f) && (w /= 40, k /= 40, i /= 40), w = Math[w >= 1 ? "floor" : "ceil"](w / q), k = Math[k >= 1 ? "floor" : "ceil"](k / q), i = Math[i >= 1 ? "floor" : "ceil"](i / q), l.settings.normalizeOffset && this.getBoundingClientRect) {
                        var A = this.getBoundingClientRect();
                        e = z.clientX - A.left, d = z.clientY - A.top
                    }
                    return z.deltaX = k, z.deltaY = i, z.deltaFactor = q, z.offsetX = e, z.offsetY = d, z.deltaMode = 0, x.unshift(z, w, k, i), r && clearTimeout(r), r = setTimeout(t, 200), (v.event.dispatch || v.event.handle).apply(this, x)
                }
            }
            function t() {
                q = null
            }
            function s(d, c) {
                return l.settings.adjustOldDeltas && "mousewheel" === d.type && c % 120 === 0
            }
            var r, q, p = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], o = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], n = Array.prototype.slice;
            if (v.event.fixHooks) {
                for (var m = p.length;
                        m;
                        ) {
                    v.event.fixHooks[p[--m]] = v.event.mouseHooks
                }
            }
            var l = v.event.special.mousewheel = {version: "3.1.12", setup: function() {
                    if (this.addEventListener) {
                        for (var a = o.length;
                                a;
                                ) {
                            this.addEventListener(o[--a], u, !1)
                        }
                    } else {
                        this.onmousewheel = u
                    }
                    v.data(this, "mousewheel-line-height", l.getLineHeight(this)), v.data(this, "mousewheel-page-height", l.getPageHeight(this))
                }, teardown: function() {
                    if (this.removeEventListener) {
                        for (var a = o.length;
                                a;
                                ) {
                            this.removeEventListener(o[--a], u, !1)
                        }
                    } else {
                        this.onmousewheel = null
                    }
                    v.removeData(this, "mousewheel-line-height"), v.removeData(this, "mousewheel-page-height")
                }, getLineHeight: function(a) {
                    var f = v(a), e = f["offsetParent" in v.fn ? "offsetParent" : "parent"]();
                    return e.length || (e = v("body")), parseInt(e.css("fontSize"), 10) || parseInt(f.css("fontSize"), 10) || 16
                }, getPageHeight: function(a) {
                    return v(a).height()
                }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}};
            v.fn.extend({mousewheel: function(b) {
                    return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
                }, unmousewheel: function(b) {
                    return this.unbind("mousewheel", b)
                }})
        }), !function(b) {
            "function" == typeof define && define.amd ? define(["jquery"], b) : b(jQuery)
        }(function(z) {
            function y(a) {
                var f = {}, e = /^jQuery\d+$/;
                return z.each(a.attributes, function(d, c) {
                    c.specified && !e.test(c.name) && (f[c.name] = c.value)
                }), f
            }
            function x(a, h) {
                var g = this, e = z(g);
                if (g.value == e.attr("placeholder") && e.hasClass(n.customClass)) {
                    if (e.data("placeholder-password")) {
                        if (e = e.hide().nextAll('input[type="password"]:first').show().attr("id", e.removeAttr("id").data("placeholder-id")), a === !0) {
                            return e[0].value = h
                        }
                        e.focus()
                    } else {
                        g.value = "", e.removeClass(n.customClass), g == v() && g.select()
                    }
                }
            }
            function w() {
                var j, i = this, c = z(i), b = this.id;
                if ("" === i.value) {
                    if ("password" === i.type) {
                        if (!c.data("placeholder-textinput")) {
                            try {
                                j = c.clone().attr({type: "text"})
                            } catch (a) {
                                j = z("<input>").attr(z.extend(y(this), {type: "text"}))
                            }
                            j.removeAttr("name").data({"placeholder-password": c, "placeholder-id": b}).bind("focus.placeholder", x), c.data({"placeholder-textinput": j, "placeholder-id": b}).before(j)
                        }
                        c = c.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", b).show()
                    }
                    c.addClass(n.customClass), c[0].value = c.attr("placeholder")
                } else {
                    c.removeClass(n.customClass)
                }
            }
            function v() {
                try {
                    return document.activeElement
                } catch (b) {
                }
            }
            var u, t, s = "[object OperaMini]" == Object.prototype.toString.call(window.operamini), r = "placeholder" in document.createElement("input") && !s, q = "placeholder" in document.createElement("textarea") && !s, p = z.valHooks, o = z.propHooks;
            if (r && q) {
                t = z.fn.placeholder = function() {
                    return this
                }, t.input = t.textarea = !0
            } else {
                var n = {};
                t = z.fn.placeholder = function(a) {
                    var d = {customClass: "placeholder"};
                    n = z.extend({}, d, a);
                    var c = this;
                    return c.filter((r ? "textarea" : ":input") + "[placeholder]").not("." + n.customClass).bind({"focus.placeholder": x, "blur.placeholder": w}).data("placeholder-enabled", !0).trigger("blur.placeholder"), c
                }, t.input = r, t.textarea = q, u = {get: function(a) {
                        var f = z(a), e = f.data("placeholder-password");
                        return e ? e[0].value : f.data("placeholder-enabled") && f.hasClass(n.customClass) ? "" : a.value
                    }, set: function(a, e) {
                        var d = z(a), c = d.data("placeholder-password");
                        return c ? c[0].value = e : d.data("placeholder-enabled") ? ("" === e ? (a.value = e, a != v() && w.call(a)) : d.hasClass(n.customClass) ? x.call(a, !0, e) || (a.value = e) : a.value = e, d) : a.value = e
                    }}, r || (p.input = u, o.value = u), q || (p.textarea = u, o.value = u), z(function() {
                    z(document).delegate("form", "submit.placeholder", function() {
                        var a = z("." + n.customClass, this).each(x);
                        setTimeout(function() {
                            a.each(w)
                        }, 10)
                    })
                }), z(window).bind("beforeunload.placeholder", function() {
                    z("." + n.customClass).each(function() {
                        this.value = ""
                    })
                })
            }
        }), function(e) {
            function d(a) {
                return PubSub.hasOwnProperty(a) && "function" == typeof PubSub[a] ? PubSub[a].apply(f, Array.prototype.slice.call(arguments, 1)) : void e.error("Method " + a + " does not exist on jQuery.pubsub")
            }
            var f = this;
            return function(g, c) {
                "function" == typeof define && define.amd ? define(["exports"], c) : c("object" == typeof exports ? exports : g.PubSub = {})
            }("object" == typeof window && window || this, function(v) {
                function u(g) {
                    var c;
                    for (c in g) {
                        if (g.hasOwnProperty(c)) {
                            return !0
                        }
                    }
                    return !1
                }
                function t(b) {
                    return function() {
                        throw b
                    }
                }
                function s(g, c, i) {
                    try {
                        g(c, i)
                    } catch (h) {
                        setTimeout(t(h), 0)
                    }
                }
                function r(h, g, i) {
                    h(g, i)
                }
                function q(k, j, A, z) {
                    var y, x = m[j], w = z ? r : s;
                    if (m.hasOwnProperty(j)) {
                        for (y in x) {
                            x.hasOwnProperty(y) && w(x[y], k, A)
                        }
                    }
                }
                function p(h, g, i) {
                    return function() {
                        var b = String(h), a = b.lastIndexOf(".");
                        for (q(h, h, g, i);
                                -1 !== a;
                                ) {
                            b = b.substr(0, a), a = b.lastIndexOf("."), q(h, b, g)
                        }
                    }
                }
                function o(b) {
                    for (var i = String(b), h = Boolean(m.hasOwnProperty(i) && u(m[i])), g = i.lastIndexOf(".");
                            !h && -1 !== g;
                            ) {
                        i = i.substr(0, g), g = i.lastIndexOf("."), h = Boolean(m.hasOwnProperty(i) && u(m[i]))
                    }
                    return h
                }
                function n(h, g, w, k) {
                    var j = p(h, g, k), i = o(h);
                    return i ? (w === !0 ? j() : setTimeout(j, 0), !0) : !1
                }
                var m = {}, l = -1;
                v.publish = function(a, g) {
                    return n(a, g, !1, v.immediateExceptions)
                }, v.publishSync = function(a, g) {
                    return n(a, g, !0, v.immediateExceptions)
                }, v.subscribe = function(h, g) {
                    if ("function" != typeof g) {
                        return !1
                    }
                    m.hasOwnProperty(h) || (m[h] = {});
                    var i = "uid_" + String(++l);
                    return m[h][i] = g, i
                }, v.clearAllSubscriptions = function() {
                    m = {}
                }, v.unsubscribe = function(j) {
                    var i, A, z, y = "string" == typeof j && m.hasOwnProperty(j), x = !y && "string" == typeof j, w = "function" == typeof j, k = !1;
                    if (y) {
                        return void delete m[j]
                    }
                    for (i in m) {
                        if (m.hasOwnProperty(i)) {
                            if (A = m[i], x && A[j]) {
                                delete A[j], k = j;
                                break
                            }
                            if (w) {
                                for (z in A) {
                                    A.hasOwnProperty(z) && A[z] === j && (delete A[z], k = !0)
                                }
                            }
                        }
                    }
                    return k
                }
            }), e.pubsub ? (e.error("pubsub is already defined on jQuery, skipping integration of PubSubJS"), !1) : (d.version = PubSub.name + " " + PubSub.version, void (e.pubsub = d))
        }(window.jQuery || window.Zepto), MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", MarkerClusterer.prototype.extend = function(d, c) {
            return function(f) {
                for (var e in f.prototype) {
                    this.prototype[e] = f.prototype[e]
                }
                return this
            }.apply(d, [c])
        }, MarkerClusterer.prototype.onAdd = function() {
            this.setReady_(!0)
        }, MarkerClusterer.prototype.draw = function() {
        }, MarkerClusterer.prototype.setupStyles_ = function() {
            if (!this.styles_.length) {
                for (var d, c = 0;
                        d = this.sizes[c];
                        c++) {
                    this.styles_.push({url: this.imagePath_ + (c + 1) + "." + this.imageExtension_, height: d, width: d})
                }
            }
        }, MarkerClusterer.prototype.fitMapToMarkers = function() {
            for (var f, e = this.getMarkers(), h = new google.maps.LatLngBounds, g = 0;
                    f = e[g];
                    g++) {
                h.extend(f.getPosition())
            }
            this.map_.fitBounds(h)
        }, MarkerClusterer.prototype.setStyles = function(b) {
            this.styles_ = b
        }, MarkerClusterer.prototype.getStyles = function() {
            return this.styles_
        }, MarkerClusterer.prototype.isZoomOnClick = function() {
            return this.zoomOnClick_
        }, MarkerClusterer.prototype.isAverageCenter = function() {
            return this.averageCenter_
        }, MarkerClusterer.prototype.getMarkers = function() {
            return this.markers_
        }, MarkerClusterer.prototype.getTotalMarkers = function() {
            return this.markers_.length
        }, MarkerClusterer.prototype.setMaxZoom = function(b) {
            this.maxZoom_ = b
        }, MarkerClusterer.prototype.getMaxZoom = function() {
            return this.maxZoom_
        }, MarkerClusterer.prototype.calculator_ = function(g, f) {
            for (var j = 0, i = g.length, h = i;
                    0 !== h;
                    ) {
                h = parseInt(h / 10, 10), j++
            }
            return j = Math.min(j, f), {text: i, index: j}
        }, MarkerClusterer.prototype.setCalculator = function(b) {
            this.calculator_ = b
        }, MarkerClusterer.prototype.getCalculator = function() {
            return this.calculator_
        }, MarkerClusterer.prototype.addMarkers = function(f, e) {
            if (f.length) {
                for (var h, g = 0;
                        h = f[g];
                        g++) {
                    this.pushMarkerTo_(h)
                }
            } else {
                if (Object.keys(f).length) {
                    for (var h in f) {
                        this.pushMarkerTo_(f[h])
                    }
                }
            }
            e || this.redraw()
        }, MarkerClusterer.prototype.pushMarkerTo_ = function(d) {
            if (d.isAdded = !1, d.draggable) {
                var c = this;
                google.maps.event.addListener(d, "dragend", function() {
                    d.isAdded = !1, c.repaint()
                })
            }
            this.markers_.push(d)
        }, MarkerClusterer.prototype.addMarker = function(d, c) {
            this.pushMarkerTo_(d), c || this.redraw()
        }, MarkerClusterer.prototype.removeMarker_ = function(f) {
            var e = -1;
            if (this.markers_.indexOf) {
                e = this.markers_.indexOf(f)
            } else {
                for (var h, g = 0;
                        h = this.markers_[g];
                        g++) {
                    if (h == f) {
                        e = g;
                        break
                    }
                }
            }
            return -1 == e ? !1 : (f.setMap(null), this.markers_.splice(e, 1), !0)
        }, MarkerClusterer.prototype.removeMarker = function(e, d) {
            var f = this.removeMarker_(e);
            return !d && f ? (this.resetViewport(), this.redraw(), !0) : !1
        }, MarkerClusterer.prototype.removeMarkers = function(h, g) {
            for (var l, k = !1, j = 0;
                    l = h[j];
                    j++) {
                var i = this.removeMarker_(l);
                k = k || i
            }
            return !g && k ? (this.resetViewport(), this.redraw(), !0) : void 0
        }, MarkerClusterer.prototype.setReady_ = function(b) {
            this.ready_ || (this.ready_ = b, this.createClusters_())
        }, MarkerClusterer.prototype.getTotalClusters = function() {
            return this.clusters_.length
        }, MarkerClusterer.prototype.getMap = function() {
            return this.map_
        }, MarkerClusterer.prototype.setMap = function(b) {
            this.map_ = b
        }, MarkerClusterer.prototype.getGridSize = function() {
            return this.gridSize_
        }, MarkerClusterer.prototype.setGridSize = function(b) {
            this.gridSize_ = b
        }, MarkerClusterer.prototype.getMinClusterSize = function() {
            return this.minClusterSize_
        }, MarkerClusterer.prototype.setMinClusterSize = function(b) {
            this.minClusterSize_ = b
        }, MarkerClusterer.prototype.getExtendedBounds = function(j) {
            var i = this.getProjection(), p = new google.maps.LatLng(j.getNorthEast().lat(), j.getNorthEast().lng()), o = new google.maps.LatLng(j.getSouthWest().lat(), j.getSouthWest().lng()), n = i.fromLatLngToDivPixel(p);
            n.x += this.gridSize_, n.y -= this.gridSize_;
            var m = i.fromLatLngToDivPixel(o);
            m.x -= this.gridSize_, m.y += this.gridSize_;
            var l = i.fromDivPixelToLatLng(n), k = i.fromDivPixelToLatLng(m);
            return j.extend(l), j.extend(k), j
        }, MarkerClusterer.prototype.isMarkerInBounds_ = function(d, c) {
            return c.contains(d.getPosition())
        }, MarkerClusterer.prototype.clearMarkers = function() {
            this.resetViewport(!0), this.markers_ = []
        }, MarkerClusterer.prototype.resetViewport = function(f) {
            for (var e, h = 0;
                    e = this.clusters_[h];
                    h++) {
                e.remove()
            }
            for (var g, h = 0;
                    g = this.markers_[h];
                    h++) {
                g.isAdded = !1, f && g.setMap(null)
            }
            this.clusters_ = []
        }, MarkerClusterer.prototype.repaint = function() {
            var b = this.clusters_.slice();
            this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function() {
                for (var a, d = 0;
                        a = b[d];
                        d++) {
                    a.remove()
                }
            }, 0)
        }, MarkerClusterer.prototype.redraw = function() {
            this.createClusters_()
        }, MarkerClusterer.prototype.distanceBetweenPoints_ = function(j, i) {
            if (!j || !i) {
                return 0
            }
            var p = 6371, o = (i.lat() - j.lat()) * Math.PI / 180, n = (i.lng() - j.lng()) * Math.PI / 180, m = Math.sin(o / 2) * Math.sin(o / 2) + Math.cos(j.lat() * Math.PI / 180) * Math.cos(i.lat() * Math.PI / 180) * Math.sin(n / 2) * Math.sin(n / 2), l = 2 * Math.atan2(Math.sqrt(m), Math.sqrt(1 - m)), k = p * l;
            return k
        }, MarkerClusterer.prototype.addToClosestCluster_ = function(i) {
            for (var h, n = 40000, m = null, l = (i.getPosition(), 0);
                    h = this.clusters_[l];
                    l++) {
                var k = h.getCenter();
                if (k) {
                    var j = this.distanceBetweenPoints_(k, i.getPosition());
                    n > j && (n = j, m = h)
                }
            }
            if (m && m.isMarkerInClusterBounds(i)) {
                m.addMarker(i)
            } else {
                var h = new Cluster(this);
                h.addMarker(i), this.clusters_.push(h)
            }
        }, MarkerClusterer.prototype.createClusters_ = function() {
            if (this.ready_) {
                for (var f, e = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), h = this.getExtendedBounds(e), g = 0;
                        f = this.markers_[g];
                        g++) {
                    !f.isAdded && this.isMarkerInBounds_(f, h) && this.addToClosestCluster_(f)
                }
            }
        }, Cluster.prototype.isMarkerAlreadyAdded = function(e) {
            if (this.markers_.indexOf) {
                return -1 != this.markers_.indexOf(e)
            }
            for (var d, f = 0;
                    d = this.markers_[f];
                    f++) {
                if (d == e) {
                    return !0
                }
            }
            return !1
        }, Cluster.prototype.addMarker = function(h) {
            if (this.isMarkerAlreadyAdded(h)) {
                return !1
            }
            if (this.center_) {
                if (this.averageCenter_) {
                    var g = this.markers_.length + 1, l = (this.center_.lat() * (g - 1) + h.getPosition().lat()) / g, k = (this.center_.lng() * (g - 1) + h.getPosition().lng()) / g;
                    this.center_ = new google.maps.LatLng(l, k), this.calculateBounds_()
                }
            } else {
                this.center_ = h.getPosition(), this.calculateBounds_()
            }
            h.isAdded = !0, this.markers_.push(h);
            var j = this.markers_.length;
            if (j < this.minClusterSize_ && h.getMap() != this.map_ && h.setMap(this.map_), j == this.minClusterSize_) {
                for (var i = 0;
                        j > i;
                        i++) {
                    this.markers_[i].setMap(null)
                }
            }
            return j >= this.minClusterSize_ && h.setMap(null), this.updateIcon(), !0
        }, Cluster.prototype.getMarkerClusterer = function() {
            return this.markerClusterer_
        }, Cluster.prototype.getBounds = function() {
            for (var f, e = new google.maps.LatLngBounds(this.center_, this.center_), h = this.getMarkers(), g = 0;
                    f = h[g];
                    g++) {
                e.extend(f.getPosition())
            }
            return e
        }, Cluster.prototype.remove = function() {
            this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_
        }, Cluster.prototype.getSize = function() {
            return this.markers_.length
        }, Cluster.prototype.getMarkers = function() {
            return this.markers_
        }, Cluster.prototype.getCenter = function() {
            return this.center_
        }, Cluster.prototype.calculateBounds_ = function() {
            var b = new google.maps.LatLngBounds(this.center_, this.center_);
            this.bounds_ = this.markerClusterer_.getExtendedBounds(b)
        }, Cluster.prototype.isMarkerInClusterBounds = function(b) {
            return this.bounds_.contains(b.getPosition())
        }, Cluster.prototype.getMap = function() {
            return this.map_
        }, Cluster.prototype.updateIcon = function() {
            var h = this.map_.getZoom(), g = this.markerClusterer_.getMaxZoom();
            if (g && h > g) {
                for (var l, k = 0;
                        l = this.markers_[k];
                        k++) {
                    l.setMap(this.map_)
                }
            } else {
                if (this.markers_.length < this.minClusterSize_) {
                    return void this.clusterIcon_.hide()
                }
                var j = this.markerClusterer_.getStyles().length, i = this.markerClusterer_.getCalculator()(this.markers_, j);
                this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(i), this.clusterIcon_.show()
            }
        }, ClusterIcon.prototype.triggerClusterClick = function() {
            var b = this.cluster_.getMarkerClusterer();
            google.maps.event.trigger(b, "clusterclick", this.cluster_), b.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds())
        }, ClusterIcon.prototype.onAdd = function() {
            if (this.div_ = document.createElement("DIV"), this.visible_) {
                var e = this.getPosFromLatLng_(this.center_);
                this.div_.style.cssText = this.createCss(e), this.div_.innerHTML = this.sums_.text
            }
            var d = this.getPanes();
            d.overlayMouseTarget.appendChild(this.div_);
            var f = this;
            google.maps.event.addDomListener(this.div_, "click", function() {
                f.triggerClusterClick()
            })
        }, ClusterIcon.prototype.getPosFromLatLng_ = function(d) {
            var c = this.getProjection().fromLatLngToDivPixel(d);
            return c.x -= parseInt(this.width_ / 2, 10), c.y -= parseInt(this.height_ / 2, 10), c
        }, ClusterIcon.prototype.draw = function() {
            if (this.visible_) {
                var b = this.getPosFromLatLng_(this.center_);
                this.div_.style.top = b.y + "px", this.div_.style.left = b.x + "px"
            }
        }, ClusterIcon.prototype.hide = function() {
            this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
        }, ClusterIcon.prototype.show = function() {
            if (this.div_) {
                var b = this.getPosFromLatLng_(this.center_);
                this.div_.style.cssText = this.createCss(b), this.div_.style.display = ""
            }
            this.visible_ = !0
        }, ClusterIcon.prototype.remove = function() {
            this.setMap(null)
        }, ClusterIcon.prototype.onRemove = function() {
            this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
        }, ClusterIcon.prototype.setSums = function(b) {
            this.sums_ = b, this.text_ = b.text, this.index_ = b.index, this.div_ && (this.div_.innerHTML = b.text), this.useStyle()
        }, ClusterIcon.prototype.useStyle = function() {
            var d = Math.max(0, this.sums_.index - 1);
            d = Math.min(this.styles_.length - 1, d);
            var c = this.styles_[d];
            this.url_ = c.url, this.height_ = c.height, this.width_ = c.width, this.textColor_ = c.textColor, this.anchor_ = c.anchor, this.textSize_ = c.textSize, this.backgroundPosition_ = c.backgroundPosition
        }, ClusterIcon.prototype.setCenter = function(b) {
            this.center_ = b
        }, ClusterIcon.prototype.createCss = function(g) {
            var f = [];
            f.push("background-image:url(" + this.url_ + ");");
            var j = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
            f.push("background-position:" + j + ";"), "object" == typeof this.anchor_ ? (f.push("number" == typeof this.anchor_[0] && this.anchor_[0] > 0 && this.anchor_[0] < this.height_ ? "height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;" : "height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), f.push("number" == typeof this.anchor_[1] && this.anchor_[1] > 0 && this.anchor_[1] < this.width_ ? "width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;" : "width:" + this.width_ + "px; text-align:center;")) : f.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
            var i = this.textColor_ ? this.textColor_ : "black", h = this.textSize_ ? this.textSize_ : 11;
            return f.push("cursor:pointer; top:" + g.y + "px; left:" + g.x + "px; color:" + i + "; position:absolute; font-size:" + h + "px; font-family:Arial,sans-serif; font-weight:bold"), f.join("")
        }, window.MarkerClusterer = MarkerClusterer, MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker, MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize, Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove, Object.keys = Object.keys || function(e) {
            var d = [];
            for (var f in e) {
                e.hasOwnProperty(f) && d.push(f)
            }
            return d
        },
                /*! Picturefill - v2.2.0 - 2014-10-30
                 * http://scottjehl.github.io/picturefill
                 * Copyright (c) 2014 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
                /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
                window.matchMedia || (window.matchMedia = function() {
                    var f = window.styleMedia || window.media;
                    if (!f) {
                        var e = document.createElement("style"), h = document.getElementsByTagName("script")[0], g = null;
                        e.type = "text/css", e.id = "matchmediajs-test", h.parentNode.insertBefore(e, h), g = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, f = {matchMedium: function(b) {
                                var d = "@media " + b + "{ #matchmediajs-test { width: 1px; } }";
                                return e.styleSheet ? e.styleSheet.cssText = d : e.textContent = d, "1px" === g.width
                            }}
                    }
                    return function(a) {
                        return{matches: f.matchMedium(a || "all"), media: a || "all"}
                    }
                }()),
                /*! Picturefill - Responsive Images that work today.
                 *  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
                 *  License: MIT/GPLv2
                 *  Spec: http://picture.responsiveimages.org/
                 */
                        function(h, g, l) {
                            function k(t) {
                                var s, r, q, p, o, n = t || {};
                                s = n.elements || i.getAllElements();
                                for (var m = 0, f = s.length;
                                        f > m;
                                        m++) {
                                    if (r = s[m], q = r.parentNode, p = void 0, o = void 0, "IMG" === r.nodeName.toUpperCase() && (r[i.ns] || (r[i.ns] = {}), n.reevaluate || !r[i.ns].evaluated)) {
                                        if ("PICTURE" === q.nodeName.toUpperCase()) {
                                            if (i.removeVideoShim(q), p = i.getMatch(r, q), p === !1) {
                                                continue
                                            }
                                        } else {
                                            p = void 0
                                        }
                                        ("PICTURE" === q.nodeName.toUpperCase() || r.srcset && !i.srcsetSupported || !i.sizesSupported && r.srcset && r.srcset.indexOf("w") > -1) && i.dodgeSrcset(r), p ? (o = i.processSourceSet(p), i.applyBestCandidate(o, r)) : (o = i.processSourceSet(r), (void 0 === r.srcset || r[i.ns].srcset) && i.applyBestCandidate(o, r)), r[i.ns].evaluated = !0
                                    }
                                }
                            }
                            function j() {
                                function b() {
                                    var c;
                                    h._picturefillWorking || (h._picturefillWorking = !0, h.clearTimeout(c), c = h.setTimeout(function() {
                                        k({reevaluate: !0}), h._picturefillWorking = !1
                                    }, 60))
                                }
                                k();
                                var a = setInterval(function() {
                                    return k(), /^loaded|^i|^c/.test(g.readyState) ? void clearInterval(a) : void 0
                                }, 250);
                                h.addEventListener ? h.addEventListener("resize", b, !1) : h.attachEvent && h.attachEvent("onresize", b)
                            }
                            if (h.HTMLPictureElement) {
                                return void (h.picturefill = function() {
                                })
                            }
                            g.createElement("picture");
                            var i = {};
                            i.ns = "picturefill", function() {
                                i.srcsetSupported = "srcset" in l, i.sizesSupported = "sizes" in l
                            }(), i.trim = function(b) {
                                return b.trim ? b.trim() : b.replace(/^\s+|\s+$/g, "")
                            }, i.endsWith = function(d, c) {
                                return d.endsWith ? d.endsWith(c) : -1 !== d.indexOf(c, d.length - c.length)
                            }, i.restrictsMixedContent = function() {
                                return"https:" === h.location.protocol
                            }, i.matchesMedia = function(a) {
                                return h.matchMedia && h.matchMedia(a).matches
                            }, i.getDpr = function() {
                                return h.devicePixelRatio || 1
                            }, i.getWidthFromLength = function(b) {
                                b = b && b.indexOf("%") > -1 == !1 && (parseFloat(b) > 0 || b.indexOf("calc(") > -1) ? b : "100vw", b = b.replace("vw", "%"), i.lengthEl || (i.lengthEl = g.createElement("div"), i.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden"), i.lengthEl.style.width = b, g.body.appendChild(i.lengthEl), i.lengthEl.className = "helper-from-picturefill-js", i.lengthEl.offsetWidth <= 0 && (i.lengthEl.style.width = g.documentElement.offsetWidth + "px");
                                var d = i.lengthEl.offsetWidth;
                                return g.body.removeChild(i.lengthEl), d
                            }, i.types = {}, i.types["image/jpeg"] = !0, i.types["image/gif"] = !0, i.types["image/png"] = !0, i.types["image/svg+xml"] = g.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), i.types["image/webp"] = function() {
                                var b = "image/webp";
                                l.onerror = function() {
                                    i.types[b] = !1, k()
                                }, l.onload = function() {
                                    i.types[b] = 1 === l.width, k()
                                }, l.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
                            }, i.verifyTypeSupport = function(d) {
                                var c = d.getAttribute("type");
                                return null === c || "" === c ? !0 : "function" == typeof i.types[c] ? (i.types[c](), "pending") : i.types[c]
                            }, i.parseSize = function(d) {
                                var c = /(\([^)]+\))?\s*(.+)/g.exec(d);
                                return{media: c && c[1], length: c && c[2]}
                            }, i.findWidthFromSourceSize = function(t) {
                                for (var s, r = i.trim(t).split(/\s*,\s*/), q = 0, p = r.length;
                                        p > q;
                                        q++) {
                                    var o = r[q], n = i.parseSize(o), m = n.length, f = n.media;
                                    if (m && (!f || i.matchesMedia(f))) {
                                        s = m;
                                        break
                                    }
                                }
                                return i.getWidthFromLength(s)
                            }, i.parseSrcset = function(n) {
                                for (var m = [];
                                        "" !== n;
                                        ) {
                                    n = n.replace(/^\s+/g, "");
                                    var s, r = n.search(/\s/g), q = null;
                                    if (-1 !== r) {
                                        s = n.slice(0, r);
                                        var p = s.slice(-1);
                                        if (("," === p || "" === s) && (s = s.replace(/,+$/, ""), q = ""), n = n.slice(r + 1), null === q) {
                                            var o = n.indexOf(",");
                                            -1 !== o ? (q = n.slice(0, o), n = n.slice(o + 1)) : (q = n, n = "")
                                        }
                                    } else {
                                        s = n, n = ""
                                    }
                                    (s || q) && m.push({url: s, descriptor: q})
                                }
                                return m
                            }, i.parseDescriptor = function(v, u) {
                                var t, s = u || "100vw", r = v && v.replace(/(^\s+|\s+$)/g, ""), q = i.findWidthFromSourceSize(s);
                                if (r) {
                                    for (var p = r.split(" "), o = p.length - 1;
                                            o >= 0;
                                            o--) {
                                        var n = p[o], m = n && n.slice(n.length - 1);
                                        if ("h" !== m && "w" !== m || i.sizesSupported) {
                                            if ("x" === m) {
                                                var f = n && parseFloat(n, 10);
                                                t = f && !isNaN(f) ? f : 1
                                            }
                                        } else {
                                            t = parseFloat(parseInt(n, 10) / q)
                                        }
                                    }
                                }
                                return t || 1
                            }, i.getCandidatesFromSourceSet = function(m, f) {
                                for (var r = i.parseSrcset(m), q = [], p = 0, o = r.length;
                                        o > p;
                                        p++) {
                                    var n = r[p];
                                    q.push({url: n.url, resolution: i.parseDescriptor(n.descriptor, f)})
                                }
                                return q
                            }, i.dodgeSrcset = function(b) {
                                b.srcset && (b[i.ns].srcset = b.srcset, b.removeAttribute("srcset"))
                            }, i.processSourceSet = function(f) {
                                var e = f.getAttribute("srcset"), n = f.getAttribute("sizes"), m = [];
                                return"IMG" === f.nodeName.toUpperCase() && f[i.ns] && f[i.ns].srcset && (e = f[i.ns].srcset), e && (m = i.getCandidatesFromSourceSet(e, n)), m
                            }, i.applyBestCandidate = function(t, s) {
                                var r, q, p;
                                t.sort(i.ascendingSort), q = t.length, p = t[q - 1];
                                for (var o = 0;
                                        q > o;
                                        o++) {
                                    if (r = t[o], r.resolution >= i.getDpr()) {
                                        p = r;
                                        break
                                    }
                                }
                                if (p && !i.endsWith(s.src, p.url)) {
                                    if (i.restrictsMixedContent() && "http:" === p.url.substr(0, "http:".length).toLowerCase()) {
                                        void 0 !== typeof console && console.warn("Blocked mixed content image " + p.url)
                                    } else {
                                        s.src = p.url, s.currentSrc = s.src;
                                        var n = s.style || {}, m = "webkitBackfaceVisibility" in n, f = n.zoom;
                                        m && (n.zoom = ".999", m = s.offsetWidth, n.zoom = f)
                                    }
                                }
                            }, i.ascendingSort = function(d, c) {
                                return d.resolution - c.resolution
                            }, i.removeVideoShim = function(f) {
                                var e = f.getElementsByTagName("video");
                                if (e.length) {
                                    for (var n = e[0], m = n.getElementsByTagName("source");
                                            m.length;
                                            ) {
                                        f.insertBefore(m[0], n)
                                    }
                                    n.parentNode.removeChild(n)
                                }
                            }, i.getAllElements = function() {
                                for (var b = [], o = g.getElementsByTagName("img"), n = 0, m = o.length;
                                        m > n;
                                        n++) {
                                    var f = o[n];
                                    ("PICTURE" === f.parentNode.nodeName.toUpperCase() || null !== f.getAttribute("srcset") || f[i.ns] && null !== f[i.ns].srcset) && b.push(f)
                                }
                                return b
                            }, i.getMatch = function(t, s) {
                                for (var r, q = s.childNodes, p = 0, o = q.length;
                                        o > p;
                                        p++) {
                                    var n = q[p];
                                    if (1 === n.nodeType) {
                                        if (n === t) {
                                            return r
                                        }
                                        if ("SOURCE" === n.nodeName.toUpperCase()) {
                                            null !== n.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                                            var m = n.getAttribute("media");
                                            if (n.getAttribute("srcset") && (!m || i.matchesMedia(m))) {
                                                var f = i.verifyTypeSupport(n);
                                                if (f === !0) {
                                                    r = n;
                                                    break
                                                }
                                                if ("pending" === f) {
                                                    return !1
                                                }
                                            }
                                        }
                                    }
                                }
                                return r
                            }, j(), k._ = i, "object" == typeof module && "object" == typeof module.exports ? module.exports = k : "function" == typeof define && define.amd ? define(function() {
                                return k
                            }) : "object" == typeof h && (h.picturefill = k)
                        }(this, this.document, new this.Image), function(g, f, j, i) {
                    var h = function(k, e, m) {
                        var l;
                        return function() {
                            function c() {
                                m || (k.apply(b, a), l = null)
                            }
                            var b = this, a = arguments;
                            l ? clearTimeout(l) : m && k.apply(b, a), l = setTimeout(c, e || 100)
                        }
                    };
                    j.fn[i] = function(b) {
                        return b ? this.bind("resize", h(b)) : this.trigger(i)
                    }
                }(document, window, window.jQuery || window.Zepto, "smartresize"), document.createElement("video"), document.createElement("audio"), document.createElement("track");
                var vjs = function(f, e, h) {
                    var g;
                    if ("string" == typeof f) {
                        if (0 === f.indexOf("#") && (f = f.slice(1)), vjs.players[f]) {
                            return e && vjs.log.warn('Player "' + f + '" is already initialised. Options will not be applied.'), h && vjs.players[f].ready(h), vjs.players[f]
                        }
                        g = vjs.el(f)
                    } else {
                        g = f
                    }
                    if (!g || !g.nodeName) {
                        throw new TypeError("The element or ID supplied is not valid. (videojs)")
                    }
                    return g.player || new vjs.Player(g, e, h)
                }, videojs = window.videojs = vjs;
                vjs.CDN_VERSION = "4.12", vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://", vjs.VERSION = "4.12.5", vjs.options = {techOrder: ["html5", "flash"], html5: {}, flash: {}, width: 300, height: 150, defaultVolume: 0, playbackRates: [], inactivityTimeout: 2000, children: {mediaLoader: {}, posterImage: {}, loadingSpinner: {}, textTrackDisplay: {}, bigPlayButton: {}, controlBar: {}, errorDisplay: {}, textTrackSettings: {}}, language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || "en", languages: {}, notSupportedMessage: "No compatible source was found for this video."}, "GENERATED_CDN_VSN" !== vjs.CDN_VERSION && (videojs.options.flash.swf = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf"), vjs.addLanguage = function(d, c) {
                    return vjs.options.languages[d] = void 0 !== vjs.options.languages[d] ? vjs.util.mergeOptions(vjs.options.languages[d], c) : c, vjs.options.languages
                }, vjs.players = {},
                        /*!
                         * Custom Universal Module Definition (UMD)
                         *
                         * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
                         * still support requirejs and browserify. This also needs to be closure
                         * compiler compatible, so string keys are used.
                         */
                        "function" == typeof define && define.amd ? define("videojs", [], function() {
                            return videojs
                        }) : "object" == typeof exports && "object" == typeof module && (module.exports = videojs), vjs.CoreObject = vjs.CoreObject = function() {
                }, vjs.CoreObject.extend = function(f) {
                    var e, h;
                    f = f || {}, e = f.init || f.init || this.prototype.init || this.prototype.init || function() {
                    }, h = function() {
                        e.apply(this, arguments)
                    }, h.prototype = vjs.obj.create(this.prototype), h.prototype.constructor = h, h.extend = vjs.CoreObject.extend, h.create = vjs.CoreObject.create;
                    for (var g in f) {
                        f.hasOwnProperty(g) && (h.prototype[g] = f[g])
                    }
                    return h
                }, vjs.CoreObject.create = function() {
                    var b = vjs.obj.create(this.prototype);
                    return this.apply(b, arguments), b
                }, vjs.on = function(f, e, h) {
                    if (vjs.obj.isArray(e)) {
                        return _handleMultipleEvents(vjs.on, f, e, h)
                    }
                    var g = vjs.getData(f);
                    g.handlers || (g.handlers = {}), g.handlers[e] || (g.handlers[e] = []), h.guid || (h.guid = vjs.guid++), g.handlers[e].push(h), g.dispatcher || (g.disabled = !1, g.dispatcher = function(a) {
                        if (!g.disabled) {
                            a = vjs.fixEvent(a);
                            var k = g.handlers[a.type];
                            if (k) {
                                for (var j = k.slice(0), i = 0, d = j.length;
                                        d > i && !a.isImmediatePropagationStopped();
                                        i++) {
                                    j[i].call(f, a)
                                }
                            }
                        }
                    }), 1 == g.handlers[e].length && (f.addEventListener ? f.addEventListener(e, g.dispatcher, !1) : f.attachEvent && f.attachEvent("on" + e, g.dispatcher))
                }, vjs.off = function(j, i, p) {
                    if (vjs.hasData(j)) {
                        var o = vjs.getData(j);
                        if (o.handlers) {
                            if (vjs.obj.isArray(i)) {
                                return _handleMultipleEvents(vjs.off, j, i, p)
                            }
                            var n = function(a) {
                                o.handlers[a] = [], vjs.cleanUpEvents(j, a)
                            };
                            if (i) {
                                var m = o.handlers[i];
                                if (m) {
                                    if (!p) {
                                        return void n(i)
                                    }
                                    if (p.guid) {
                                        for (var l = 0;
                                                l < m.length;
                                                l++) {
                                            m[l].guid === p.guid && m.splice(l--, 1)
                                        }
                                    }
                                    vjs.cleanUpEvents(j, i)
                                }
                            } else {
                                for (var k in o.handlers) {
                                    n(k)
                                }
                            }
                        }
                    }
                }, vjs.cleanUpEvents = function(e, d) {
                    var f = vjs.getData(e);
                    0 === f.handlers[d].length && (delete f.handlers[d], e.removeEventListener ? e.removeEventListener(d, f.dispatcher, !1) : e.detachEvent && e.detachEvent("on" + d, f.dispatcher)), vjs.isEmpty(f.handlers) && (delete f.handlers, delete f.dispatcher, delete f.disabled), vjs.isEmpty(f) && vjs.removeData(e)
                }, vjs.fixEvent = function(i) {
                    function h() {
                        return !0
                    }
                    function n() {
                        return !1
                    }
                    if (!i || !i.isPropagationStopped) {
                        var m = i || window.event;
                        i = {};
                        for (var l in m) {
                            "layerX" !== l && "layerY" !== l && "keyLocation" !== l && ("returnValue" == l && m.preventDefault || (i[l] = m[l]))
                        }
                        if (i.target || (i.target = i.srcElement || document), i.relatedTarget = i.fromElement === i.target ? i.toElement : i.fromElement, i.preventDefault = function() {
                            m.preventDefault && m.preventDefault(), i.returnValue = !1, i.isDefaultPrevented = h, i.defaultPrevented = !0
                        }, i.isDefaultPrevented = n, i.defaultPrevented = !1, i.stopPropagation = function() {
                            m.stopPropagation && m.stopPropagation(), i.cancelBubble = !0, i.isPropagationStopped = h
                        }, i.isPropagationStopped = n, i.stopImmediatePropagation = function() {
                            m.stopImmediatePropagation && m.stopImmediatePropagation(), i.isImmediatePropagationStopped = h, i.stopPropagation()
                        }, i.isImmediatePropagationStopped = n, null != i.clientX) {
                            var k = document.documentElement, j = document.body;
                            i.pageX = i.clientX + (k && k.scrollLeft || j && j.scrollLeft || 0) - (k && k.clientLeft || j && j.clientLeft || 0), i.pageY = i.clientY + (k && k.scrollTop || j && j.scrollTop || 0) - (k && k.clientTop || j && j.clientTop || 0)
                        }
                        i.which = i.charCode || i.keyCode, null != i.button && (i.button = 1 & i.button ? 0 : 4 & i.button ? 1 : 2 & i.button ? 2 : 0)
                    }
                    return i
                }, vjs.trigger = function(g, f) {
                    var j = vjs.hasData(g) ? vjs.getData(g) : {}, i = g.parentNode || g.ownerDocument;
                    if ("string" == typeof f && (f = {type: f, target: g}), f = vjs.fixEvent(f), j.dispatcher && j.dispatcher.call(g, f), i && !f.isPropagationStopped() && f.bubbles !== !1) {
                        vjs.trigger(i, f)
                    } else {
                        if (!i && !f.defaultPrevented) {
                            var h = vjs.getData(f.target);
                            f.target[f.type] && (h.disabled = !0, "function" == typeof f.target[f.type] && f.target[f.type](), h.disabled = !1)
                        }
                    }
                    return !f.defaultPrevented
                }, vjs.one = function(f, e, h) {
                    if (vjs.obj.isArray(e)) {
                        return _handleMultipleEvents(vjs.one, f, e, h)
                    }
                    var g = function() {
                        vjs.off(f, e, g), h.apply(this, arguments)
                    };
                    g.guid = h.guid = h.guid || vjs.guid++, vjs.on(f, e, g)
                };
                var hasOwnProp = Object.prototype.hasOwnProperty;
                vjs.createEl = function(e, d) {
                    var f;
                    return e = e || "div", d = d || {}, f = document.createElement(e), vjs.obj.each(d, function(g, c) {
                        -1 !== g.indexOf("aria-") || "role" == g ? f.setAttribute(g, c) : f[g] = c
                    }), f
                }, vjs.capitalize = function(b) {
                    return b.charAt(0).toUpperCase() + b.slice(1)
                }, vjs.obj = {}, vjs.obj.create = Object.create || function(d) {
                    function c() {
                    }
                    return c.prototype = d, new c
                }, vjs.obj.each = function(f, e, h) {
                    for (var g in f) {
                        hasOwnProp.call(f, g) && e.call(h || this, g, f[g])
                    }
                }, vjs.obj.merge = function(e, d) {
                    if (!d) {
                        return e
                    }
                    for (var f in d) {
                        hasOwnProp.call(d, f) && (e[f] = d[f])
                    }
                    return e
                }, vjs.obj.deepMerge = function(g, f) {
                    var j, i, h;
                    g = vjs.obj.copy(g);
                    for (j in f) {
                        hasOwnProp.call(f, j) && (i = g[j], h = f[j], g[j] = vjs.obj.isPlain(i) && vjs.obj.isPlain(h) ? vjs.obj.deepMerge(i, h) : f[j])
                    }
                    return g
                }, vjs.obj.copy = function(b) {
                    return vjs.obj.merge({}, b)
                }, vjs.obj.isPlain = function(b) {
                    return !!b && "object" == typeof b && "[object Object]" === b.toString() && b.constructor === Object
                }, vjs.obj.isArray = Array.isArray || function(b) {
                    return"[object Array]" === Object.prototype.toString.call(b)
                }, vjs.isNaN = function(b) {
                    return b !== b
                }, vjs.bind = function(f, e, h) {
                    e.guid || (e.guid = vjs.guid++);
                    var g = function() {
                        return e.apply(f, arguments)
                    };
                    return g.guid = h ? h + "_" + e.guid : e.guid, g
                }, vjs.cache = {}, vjs.guid = 1, vjs.expando = "vdata" + (new Date).getTime(), vjs.getData = function(d) {
                    var c = d[vjs.expando];
                    return c || (c = d[vjs.expando] = vjs.guid++), vjs.cache[c] || (vjs.cache[c] = {}), vjs.cache[c]
                }, vjs.hasData = function(d) {
                    var c = d[vjs.expando];
                    return !(!c || vjs.isEmpty(vjs.cache[c]))
                }, vjs.removeData = function(e) {
                    var d = e[vjs.expando];
                    if (d) {
                        delete vjs.cache[d];
                        try {
                            delete e[vjs.expando]
                        } catch (f) {
                            e.removeAttribute ? e.removeAttribute(vjs.expando) : e[vjs.expando] = null
                        }
                    }
                }, vjs.isEmpty = function(d) {
                    for (var c in d) {
                        if (null !== d[c]) {
                            return !1
                        }
                    }
                    return !0
                }, vjs.hasClass = function(d, c) {
                    return -1 !== (" " + d.className + " ").indexOf(" " + c + " ")
                }, vjs.addClass = function(d, c) {
                    vjs.hasClass(d, c) || (d.className = "" === d.className ? c : d.className + " " + c)
                }, vjs.removeClass = function(f, e) {
                    var h, g;
                    if (vjs.hasClass(f, e)) {
                        for (h = f.className.split(" "), g = h.length - 1;
                                g >= 0;
                                g--) {
                            h[g] === e && h.splice(g, 1)
                        }
                        f.className = h.join(" ")
                    }
                }, vjs.TEST_VID = vjs.createEl("video"), function() {
                    var b = document.createElement("track");
                    b.kind = "captions", b.srclang = "en", b.label = "English", vjs.TEST_VID.appendChild(b)
                }(), vjs.USER_AGENT = navigator.userAgent, vjs.IS_IPHONE = /iPhone/i.test(vjs.USER_AGENT), vjs.IS_IPAD = /iPad/i.test(vjs.USER_AGENT), vjs.IS_IPOD = /iPod/i.test(vjs.USER_AGENT), vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD, vjs.IOS_VERSION = function() {
                    var b = vjs.USER_AGENT.match(/OS (\d+)_/i);
                    return b && b[1] ? b[1] : void 0
                }(), vjs.IS_ANDROID = /Android/i.test(vjs.USER_AGENT), vjs.ANDROID_VERSION = function() {
                    var e, d, f = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
                    return f ? (e = f[1] && parseFloat(f[1]), d = f[2] && parseFloat(f[2]), e && d ? parseFloat(f[1] + "." + f[2]) : e ? e : null) : null
                }(), vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && /webkit/i.test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3, vjs.IS_FIREFOX = /Firefox/i.test(vjs.USER_AGENT), vjs.IS_CHROME = /Chrome/i.test(vjs.USER_AGENT), vjs.IS_IE8 = /MSIE\s8\.0/.test(vjs.USER_AGENT), vjs.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch), vjs.BACKGROUND_SIZE_SUPPORTED = "backgroundSize" in vjs.TEST_VID.style, vjs.setElementAttributes = function(d, c) {
                    vjs.obj.each(c, function(a, e) {
                        null === e || "undefined" == typeof e || e === !1 ? d.removeAttribute(a) : d.setAttribute(a, e === !0 ? "" : e)
                    })
                }, vjs.getElementAttributes = function(i) {
                    var h, n, m, l, k;
                    if (h = {}, n = ",autoplay,controls,loop,muted,default,", i && i.attributes && i.attributes.length > 0) {
                        m = i.attributes;
                        for (var j = m.length - 1;
                                j >= 0;
                                j--) {
                            l = m[j].name, k = m[j].value, ("boolean" == typeof i[l] || -1 !== n.indexOf("," + l + ",")) && (k = null !== k ? !0 : !1), h[l] = k
                        }
                    }
                    return h
                }, vjs.getComputedDimension = function(e, d) {
                    var f = "";
                    return document.defaultView && document.defaultView.getComputedStyle ? f = document.defaultView.getComputedStyle(e, "").getPropertyValue(d) : e.currentStyle && (f = e["client" + d.substr(0, 1).toUpperCase() + d.substr(1)] + "px"), f
                }, vjs.insertFirst = function(d, c) {
                    c.firstChild ? c.insertBefore(d, c.firstChild) : c.appendChild(d)
                }, vjs.browser = {}, vjs.el = function(b) {
                    return 0 === b.indexOf("#") && (b = b.slice(1)), document.getElementById(b)
                }, vjs.formatTime = function(i, h) {
                    h = h || i;
                    var n = Math.floor(i % 60), m = Math.floor(i / 60 % 60), l = Math.floor(i / 3600), k = Math.floor(h / 60 % 60), j = Math.floor(h / 3600);
                    return(isNaN(i) || i === 1 / 0) && (l = m = n = "-"), l = l > 0 || j > 0 ? l + ":" : "", m = ((l || k >= 10) && 10 > m ? "0" + m : m) + ":", n = 10 > n ? "0" + n : n, l + m + n
                }, vjs.blockTextSelection = function() {
                    document.body.focus(), document.onselectstart = function() {
                        return !1
                    }
                }, vjs.unblockTextSelection = function() {
                    document.onselectstart = function() {
                        return !0
                    }
                }, vjs.trim = function(b) {
                    return(b + "").replace(/^\s+|\s+$/g, "")
                }, vjs.round = function(d, c) {
                    return c || (c = 0), Math.round(d * Math.pow(10, c)) / Math.pow(10, c)
                }, vjs.createTimeRange = function(d, c) {
                    return{length: 1, start: function() {
                            return d
                        }, end: function() {
                            return c
                        }}
                }, vjs.setLocalStorage = function(f, e) {
                    try {
                        var h = window.localStorage || !1;
                        if (!h) {
                            return
                        }
                        h[f] = e
                    } catch (g) {
                        22 == g.code || 1014 == g.code ? vjs.log("LocalStorage Full (VideoJS)", g) : 18 == g.code ? vjs.log("LocalStorage not allowed (VideoJS)", g) : vjs.log("LocalStorage Error (VideoJS)", g)
                    }
                }, vjs.getAbsoluteURL = function(b) {
                    return b.match(/^https?:\/\//) || (b = vjs.createEl("div", {innerHTML: '<a href="' + b + '">x</a>'}).firstChild.href), b
                }, vjs.parseUrl = function(i) {
                    var h, n, m, l, k;
                    l = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"], n = vjs.createEl("a", {href: i}), m = "" === n.host && "file:" !== n.protocol, m && (h = vjs.createEl("div"), h.innerHTML = '<a href="' + i + '"></a>', n = h.firstChild, h.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(h)), k = {};
                    for (var j = 0;
                            j < l.length;
                            j++) {
                        k[l[j]] = n[l[j]]
                    }
                    return"http:" === k.protocol && (k.host = k.host.replace(/:80$/, "")), "https:" === k.protocol && (k.host = k.host.replace(/:443$/, "")), m && document.body.removeChild(h), k
                }, vjs.log = function() {
                    _logType(null, arguments)
                }, vjs.log.history = [], vjs.log.error = function() {
                    _logType("error", arguments)
                }, vjs.log.warn = function() {
                    _logType("warn", arguments)
                }, vjs.findPosition = function(t) {
                    var s, r, q, p, o, n, m, l, k;
                    return t.getBoundingClientRect && t.parentNode && (s = t.getBoundingClientRect()), s ? (r = document.documentElement, q = document.body, p = r.clientLeft || q.clientLeft || 0, o = window.pageXOffset || q.scrollLeft, n = s.left + o - p, m = r.clientTop || q.clientTop || 0, l = window.pageYOffset || q.scrollTop, k = s.top + l - m, {left: vjs.round(n), top: vjs.round(k)}) : {left: 0, top: 0}
                }, vjs.arr = {}, vjs.arr.forEach = function(g, f, j) {
                    if (vjs.obj.isArray(g) && f instanceof Function) {
                        for (var i = 0, h = g.length;
                                h > i;
                                ++i) {
                            f.call(j || vjs, g[i], i, g)
                        }
                    }
                    return g
                }, vjs.xhr = function(x, w) {
                    var v, u, t, s, r, q, p, o, n;
                    "string" == typeof x && (x = {uri: x}), videojs.util.mergeOptions({method: "GET", timeout: 45000}, x), w = w || function() {
                    }, o = function() {
                        window.clearTimeout(p), w(null, u, u.response || u.responseText)
                    }, n = function(b) {
                        window.clearTimeout(p), b && "string" != typeof b || (b = new Error(b)), w(b, u)
                    }, v = window.XMLHttpRequest, "undefined" == typeof v && (v = function() {
                        try {
                            return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
                        } catch (e) {
                        }
                        try {
                            return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
                        } catch (d) {
                        }
                        try {
                            return new window.ActiveXObject("Msxml2.XMLHTTP")
                        } catch (f) {
                        }
                        throw new Error("This browser does not support XMLHttpRequest.")
                    }), u = new v, u.uri = x.uri, t = vjs.parseUrl(x.uri), s = window.location, q = t.protocol + t.host !== s.protocol + s.host, !q || !window.XDomainRequest || "withCredentials" in u ? (r = "file:" == t.protocol || "file:" == s.protocol, u.onreadystatechange = function() {
                        if (4 === u.readyState) {
                            if (u.timedout) {
                                return n("timeout")
                            }
                            200 === u.status || r && 0 === u.status ? o() : n()
                        }
                    }, x.timeout && (p = window.setTimeout(function() {
                        4 !== u.readyState && (u.timedout = !0, u.abort())
                    }, x.timeout))) : (u = new window.XDomainRequest, u.onload = o, u.onerror = n, u.onprogress = function() {
                    }, u.ontimeout = function() {
                    });
                    try {
                        u.open(x.method || "GET", x.uri, !0)
                    } catch (m) {
                        return n(m)
                    }
                    x.withCredentials && (u.withCredentials = !0), x.responseType && (u.responseType = x.responseType);
                    try {
                        u.send()
                    } catch (m) {
                        return n(m)
                    }
                    return u
                }, vjs.util = {}, vjs.util.mergeOptions = function(g, f) {
                    var j, i, h;
                    g = vjs.obj.copy(g);
                    for (j in f) {
                        f.hasOwnProperty(j) && (i = g[j], h = f[j], g[j] = vjs.obj.isPlain(i) && vjs.obj.isPlain(h) ? vjs.util.mergeOptions(i, h) : f[j])
                    }
                    return g
                }, vjs.EventEmitter = function() {
                }, vjs.EventEmitter.prototype.allowedEvents_ = {}, vjs.EventEmitter.prototype.on = function(e, d) {
                    var f = this.addEventListener;
                    this.addEventListener = Function.prototype, vjs.on(this, e, d), this.addEventListener = f
                }, vjs.EventEmitter.prototype.addEventListener = vjs.EventEmitter.prototype.on, vjs.EventEmitter.prototype.off = function(d, c) {
                    vjs.off(this, d, c)
                }, vjs.EventEmitter.prototype.removeEventListener = vjs.EventEmitter.prototype.off, vjs.EventEmitter.prototype.one = function(d, c) {
                    vjs.one(this, d, c)
                }, vjs.EventEmitter.prototype.trigger = function(d) {
                    var c = d.type || d;
                    "string" == typeof d && (d = {type: c}), d = vjs.fixEvent(d), this.allowedEvents_[c] && this["on" + c] && this["on" + c](d), vjs.trigger(this, d)
                }, vjs.EventEmitter.prototype.dispatchEvent = vjs.EventEmitter.prototype.trigger, vjs.Component = vjs.CoreObject.extend({init: function(e, d, f) {
                        this.player_ = e, this.options_ = vjs.obj.copy(this.options_), d = this.options(d), this.id_ = d.id || d.el && d.el.id, this.id_ || (this.id_ = (e.id && e.id() || "no_player") + "_component_" + vjs.guid++), this.name_ = d.name || null, this.el_ = d.el || this.createEl(), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, this.initChildren(), this.ready(f), d.reportTouchActivity !== !1 && this.enableTouchActivity()
                    }}), vjs.Component.prototype.dispose = function() {
                    if (this.trigger({type: "dispose", bubbles: !1}), this.children_) {
                        for (var b = this.children_.length - 1;
                                b >= 0;
                                b--) {
                            this.children_[b].dispose && this.children_[b].dispose()
                        }
                    }
                    this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), vjs.removeData(this.el_), this.el_ = null
                }, vjs.Component.prototype.player_ = !0, vjs.Component.prototype.player = function() {
                    return this.player_
                }, vjs.Component.prototype.options_, vjs.Component.prototype.options = function(b) {
                    return void 0 === b ? this.options_ : this.options_ = vjs.util.mergeOptions(this.options_, b)
                }, vjs.Component.prototype.el_, vjs.Component.prototype.createEl = function(d, c) {
                    return vjs.createEl(d, c)
                }, vjs.Component.prototype.localize = function(e) {
                    var d = this.player_.language(), f = this.player_.languages();
                    return f && f[d] && f[d][e] ? f[d][e] : e
                }, vjs.Component.prototype.el = function() {
                    return this.el_
                }, vjs.Component.prototype.contentEl_, vjs.Component.prototype.contentEl = function() {
                    return this.contentEl_ || this.el_
                }, vjs.Component.prototype.id_, vjs.Component.prototype.id = function() {
                    return this.id_
                }, vjs.Component.prototype.name_, vjs.Component.prototype.name = function() {
                    return this.name_
                }, vjs.Component.prototype.children_, vjs.Component.prototype.children = function() {
                    return this.children_
                }, vjs.Component.prototype.childIndex_, vjs.Component.prototype.getChildById = function(b) {
                    return this.childIndex_[b]
                }, vjs.Component.prototype.childNameIndex_, vjs.Component.prototype.getChild = function(b) {
                    return this.childNameIndex_[b]
                }, vjs.Component.prototype.addChild = function(g, f) {
                    var j, i, h;
                    return"string" == typeof g ? (h = g, f = f || {}, i = f.componentClass || vjs.capitalize(h), f.name = h, j = new window.videojs[i](this.player_ || this, f)) : j = g, this.children_.push(j), "function" == typeof j.id && (this.childIndex_[j.id()] = j), h = h || j.name && j.name(), h && (this.childNameIndex_[h] = j), "function" == typeof j.el && j.el() && this.contentEl().appendChild(j.el()), j
                }, vjs.Component.prototype.removeChild = function(f) {
                    if ("string" == typeof f && (f = this.getChild(f)), f && this.children_) {
                        for (var e = !1, h = this.children_.length - 1;
                                h >= 0;
                                h--) {
                            if (this.children_[h] === f) {
                                e = !0, this.children_.splice(h, 1);
                                break
                            }
                        }
                        if (e) {
                            this.childIndex_[f.id()] = null, this.childNameIndex_[f.name()] = null;
                            var g = f.el();
                            g && g.parentNode === this.contentEl() && this.contentEl().removeChild(f.el())
                        }
                    }
                }, vjs.Component.prototype.initChildren = function() {
                    var j, i, p, o, n, m, l;
                    if (j = this, i = j.options(), p = i.children) {
                        if (l = function(b, a) {
                            void 0 !== i[b] && (a = i[b]), a !== !1 && (j[b] = j.addChild(b, a))
                        }, vjs.obj.isArray(p)) {
                            for (var k = 0;
                                    k < p.length;
                                    k++) {
                                o = p[k], "string" == typeof o ? (n = o, m = {}) : (n = o.name, m = o), l(n, m)
                            }
                        } else {
                            vjs.obj.each(p, l)
                        }
                    }
                }, vjs.Component.prototype.buildCSSClass = function() {
                    return""
                }, vjs.Component.prototype.on = function(r, q, p) {
                    var o, n, m, l, k, j;
                    return"string" == typeof r || vjs.obj.isArray(r) ? vjs.on(this.el_, r, vjs.bind(this, q)) : (o = r, n = q, m = vjs.bind(this, p), j = this, l = function() {
                        j.off(o, n, m)
                    }, l.guid = m.guid, this.on("dispose", l), k = function() {
                        j.off("dispose", l)
                    }, k.guid = m.guid, r.nodeName ? (vjs.on(o, n, m), vjs.on(o, "dispose", k)) : "function" == typeof r.on && (o.on(n, m), o.on("dispose", k))), this
                }, vjs.Component.prototype.off = function(h, g, l) {
                    var k, j, i;
                    return !h || "string" == typeof h || vjs.obj.isArray(h) ? vjs.off(this.el_, h, g) : (k = h, j = g, i = vjs.bind(this, l), this.off("dispose", i), h.nodeName ? (vjs.off(k, j, i), vjs.off(k, "dispose", i)) : (k.off(j, i), k.off("dispose", i))), this
                }, vjs.Component.prototype.one = function(j, i, p) {
                    var o, n, m, l, k;
                    return"string" == typeof j || vjs.obj.isArray(j) ? vjs.one(this.el_, j, vjs.bind(this, i)) : (o = j, n = i, m = vjs.bind(this, p), l = this, k = function() {
                        l.off(o, n, k), m.apply(this, arguments)
                    }, k.guid = m.guid, this.on(o, n, k)), this
                }, vjs.Component.prototype.trigger = function(b) {
                    return vjs.trigger(this.el_, b), this
                }, vjs.Component.prototype.isReady_, vjs.Component.prototype.isReadyOnInitFinish_ = !0, vjs.Component.prototype.readyQueue_, vjs.Component.prototype.ready = function(b) {
                    return b && (this.isReady_ ? b.call(this) : (void 0 === this.readyQueue_ && (this.readyQueue_ = []), this.readyQueue_.push(b))), this
                }, vjs.Component.prototype.triggerReady = function() {
                    this.isReady_ = !0;
                    var e = this.readyQueue_;
                    if (e && e.length > 0) {
                        for (var d = 0, f = e.length;
                                f > d;
                                d++) {
                            e[d].call(this)
                        }
                        this.readyQueue_ = [], this.trigger("ready")
                    }
                }, vjs.Component.prototype.hasClass = function(b) {
                    return vjs.hasClass(this.el_, b)
                }, vjs.Component.prototype.addClass = function(b) {
                    return vjs.addClass(this.el_, b), this
                }, vjs.Component.prototype.removeClass = function(b) {
                    return vjs.removeClass(this.el_, b), this
                }, vjs.Component.prototype.show = function() {
                    return this.removeClass("vjs-hidden"), this
                }, vjs.Component.prototype.hide = function() {
                    return this.addClass("vjs-hidden"), this
                }, vjs.Component.prototype.lockShowing = function() {
                    return this.addClass("vjs-lock-showing"), this
                }, vjs.Component.prototype.unlockShowing = function() {
                    return this.removeClass("vjs-lock-showing"), this
                }, vjs.Component.prototype.disable = function() {
                    this.hide(), this.show = function() {
                    }
                }, vjs.Component.prototype.width = function(d, c) {
                    return this.dimension("width", d, c)
                }, vjs.Component.prototype.height = function(d, c) {
                    return this.dimension("height", d, c)
                }, vjs.Component.prototype.dimensions = function(d, c) {
                    return this.width(d, !0).height(c)
                }, vjs.Component.prototype.dimension = function(g, f, j) {
                    if (void 0 !== f) {
                        return(null === f || vjs.isNaN(f)) && (f = 0), this.el_.style[g] = -1 !== ("" + f).indexOf("%") || -1 !== ("" + f).indexOf("px") ? f : "auto" === f ? "" : f + "px", j || this.trigger("resize"), this
                    }
                    if (!this.el_) {
                        return 0
                    }
                    var i = this.el_.style[g], h = i.indexOf("px");
                    return -1 !== h ? parseInt(i.slice(0, h), 10) : parseInt(this.el_["offset" + vjs.capitalize(g)], 10)
                }, vjs.Component.prototype.onResize, vjs.Component.prototype.emitTapEvents = function() {
                    var t, s, r, q, p, o, n, m, l, k;
                    t = 0, s = null, l = 10, k = 200, this.on("touchstart", function(a) {
                        1 === a.touches.length && (s = vjs.obj.copy(a.touches[0]), t = (new Date).getTime(), q = !0)
                    }), this.on("touchmove", function(b) {
                        b.touches.length > 1 ? q = !1 : s && (o = b.touches[0].pageX - s.pageX, n = b.touches[0].pageY - s.pageY, m = Math.sqrt(o * o + n * n), m > l && (q = !1))
                    }), p = function() {
                        q = !1
                    }, this.on("touchleave", p), this.on("touchcancel", p), this.on("touchend", function(a) {
                        s = null, q === !0 && (r = (new Date).getTime() - t, k > r && (a.preventDefault(), this.trigger("tap")))
                    })
                }, vjs.Component.prototype.enableTouchActivity = function() {
                    var e, d, f;
                    this.player().reportUserActivity && (e = vjs.bind(this.player(), this.player().reportUserActivity), this.on("touchstart", function() {
                        e(), this.clearInterval(d), d = this.setInterval(e, 250)
                    }), f = function() {
                        e(), this.clearInterval(d)
                    }, this.on("touchmove", e), this.on("touchend", f), this.on("touchcancel", f))
                }, vjs.Component.prototype.setTimeout = function(f, e) {
                    f = vjs.bind(this, f);
                    var h = setTimeout(f, e), g = function() {
                        this.clearTimeout(h)
                    };
                    return g.guid = "vjs-timeout-" + h, this.on("dispose", g), h
                }, vjs.Component.prototype.clearTimeout = function(d) {
                    clearTimeout(d);
                    var c = function() {
                    };
                    return c.guid = "vjs-timeout-" + d, this.off("dispose", c), d
                }, vjs.Component.prototype.setInterval = function(f, e) {
                    f = vjs.bind(this, f);
                    var h = setInterval(f, e), g = function() {
                        this.clearInterval(h)
                    };
                    return g.guid = "vjs-interval-" + h, this.on("dispose", g), h
                }, vjs.Component.prototype.clearInterval = function(d) {
                    clearInterval(d);
                    var c = function() {
                    };
                    return c.guid = "vjs-interval-" + d, this.off("dispose", c), d
                }, vjs.Button = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.emitTapEvents(), this.on("tap", this.onClick), this.on("click", this.onClick), this.on("focus", this.onFocus), this.on("blur", this.onBlur)
                    }}), vjs.Button.prototype.createEl = function(e, d) {
                    var f;
                    return d = vjs.obj.merge({className: this.buildCSSClass(), role: "button", "aria-live": "polite", tabIndex: 0}, d), f = vjs.Component.prototype.createEl.call(this, e, d), d.innerHTML || (this.contentEl_ = vjs.createEl("div", {className: "vjs-control-content"}), this.controlText_ = vjs.createEl("span", {className: "vjs-control-text", innerHTML: this.localize(this.buttonText) || "Need Text"}), this.contentEl_.appendChild(this.controlText_), f.appendChild(this.contentEl_)), f
                }, vjs.Button.prototype.buildCSSClass = function() {
                    return"vjs-control " + vjs.Component.prototype.buildCSSClass.call(this)
                }, vjs.Button.prototype.onClick = function() {
                }, vjs.Button.prototype.onFocus = function() {
                    vjs.on(document, "keydown", vjs.bind(this, this.onKeyPress))
                }, vjs.Button.prototype.onKeyPress = function(b) {
                    (32 == b.which || 13 == b.which) && (b.preventDefault(), this.onClick())
                }, vjs.Button.prototype.onBlur = function() {
                    vjs.off(document, "keydown", vjs.bind(this, this.onKeyPress))
                }, vjs.Slider = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.bar = this.getChild(this.options_.barName), this.handle = this.getChild(this.options_.handleName), this.on("mousedown", this.onMouseDown), this.on("touchstart", this.onMouseDown), this.on("focus", this.onFocus), this.on("blur", this.onBlur), this.on("click", this.onClick), this.on(d, "controlsvisible", this.update), this.on(d, this.playerEvent, this.update)
                    }}), vjs.Slider.prototype.createEl = function(d, c) {
                    return c = c || {}, c.className = c.className + " vjs-slider", c = vjs.obj.merge({role: "slider", "aria-valuenow": 0, "aria-valuemin": 0, "aria-valuemax": 100, tabIndex: 0}, c), vjs.Component.prototype.createEl.call(this, d, c)
                }, vjs.Slider.prototype.onMouseDown = function(b) {
                    b.preventDefault(), vjs.blockTextSelection(), this.addClass("vjs-sliding"), this.on(document, "mousemove", this.onMouseMove), this.on(document, "mouseup", this.onMouseUp), this.on(document, "touchmove", this.onMouseMove), this.on(document, "touchend", this.onMouseUp), this.onMouseMove(b)
                }, vjs.Slider.prototype.onMouseMove = function() {
                }, vjs.Slider.prototype.onMouseUp = function() {
                    vjs.unblockTextSelection(), this.removeClass("vjs-sliding"), this.off(document, "mousemove", this.onMouseMove), this.off(document, "mouseup", this.onMouseUp), this.off(document, "touchmove", this.onMouseMove), this.off(document, "touchend", this.onMouseUp), this.update()
                }, vjs.Slider.prototype.update = function() {
                    if (this.el_) {
                        var t, s = this.getPercent(), r = this.handle, q = this.bar;
                        if (("number" != typeof s || s !== s || 0 > s || s === 1 / 0) && (s = 0), t = s, r) {
                            var p = this.el_, o = p.offsetWidth, n = r.el().offsetWidth, m = n ? n / o : 0, l = 1 - m, k = s * l;
                            t = k + m / 2, r.el().style.left = vjs.round(100 * k, 2) + "%"
                        }
                        q && (q.el().style.width = vjs.round(100 * t, 2) + "%")
                    }
                }, vjs.Slider.prototype.calculateDistance = function(x) {
                    var w, v, u, t, s, r, q, p, o;
                    if (w = this.el_, v = vjs.findPosition(w), s = r = w.offsetWidth, q = this.handle, this.options().vertical) {
                        if (t = v.top, o = x.changedTouches ? x.changedTouches[0].pageY : x.pageY, q) {
                            var n = q.el().offsetHeight;
                            t += n / 2, r -= n
                        }
                        return Math.max(0, Math.min(1, (t - o + r) / r))
                    }
                    if (u = v.left, p = x.changedTouches ? x.changedTouches[0].pageX : x.pageX, q) {
                        var m = q.el().offsetWidth;
                        u += m / 2, s -= m
                    }
                    return Math.max(0, Math.min(1, (p - u) / s))
                }, vjs.Slider.prototype.onFocus = function() {
                    this.on(document, "keydown", this.onKeyPress)
                }, vjs.Slider.prototype.onKeyPress = function(b) {
                    37 == b.which || 40 == b.which ? (b.preventDefault(), this.stepBack()) : (38 == b.which || 39 == b.which) && (b.preventDefault(), this.stepForward())
                }, vjs.Slider.prototype.onBlur = function() {
                    this.off(document, "keydown", this.onKeyPress)
                }, vjs.Slider.prototype.onClick = function(b) {
                    b.stopImmediatePropagation(), b.preventDefault()
                }, vjs.SliderHandle = vjs.Component.extend(), vjs.SliderHandle.prototype.defaultValue = 0, vjs.SliderHandle.prototype.createEl = function(d, c) {
                    return c = c || {}, c.className = c.className + " vjs-slider-handle", c = vjs.obj.merge({innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"}, c), vjs.Component.prototype.createEl.call(this, "div", c)
                }, vjs.Menu = vjs.Component.extend(), vjs.Menu.prototype.addItem = function(b) {
                    this.addChild(b), b.on("click", vjs.bind(this, function() {
                        this.unlockShowing()
                    }))
                }, vjs.Menu.prototype.createEl = function() {
                    var d = this.options().contentElType || "ul";
                    this.contentEl_ = vjs.createEl(d, {className: "vjs-menu-content"});
                    var c = vjs.Component.prototype.createEl.call(this, "div", {append: this.contentEl_, className: "vjs-menu"});
                    return c.appendChild(this.contentEl_), vjs.on(c, "click", function(b) {
                        b.preventDefault(), b.stopImmediatePropagation()
                    }), c
                }, vjs.MenuItem = vjs.Button.extend({init: function(d, c) {
                        vjs.Button.call(this, d, c), this.selected(c.selected)
                    }}), vjs.MenuItem.prototype.createEl = function(d, c) {
                    return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({className: "vjs-menu-item", innerHTML: this.localize(this.options_.label)}, c))
                }, vjs.MenuItem.prototype.onClick = function() {
                    this.selected(!0)
                }, vjs.MenuItem.prototype.selected = function(b) {
                    b ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-selected", !0)) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-selected", !1))
                }, vjs.MenuButton = vjs.Button.extend({init: function(d, c) {
                        vjs.Button.call(this, d, c), this.update(), this.on("keydown", this.onKeyPress), this.el_.setAttribute("aria-haspopup", !0), this.el_.setAttribute("role", "button")
                    }}), vjs.MenuButton.prototype.update = function() {
                    var b = this.createMenu();
                    this.menu && this.removeChild(this.menu), this.menu = b, this.addChild(b), this.items && 0 === this.items.length ? this.hide() : this.items && this.items.length > 1 && this.show()
                }, vjs.MenuButton.prototype.buttonPressed_ = !1, vjs.MenuButton.prototype.createMenu = function() {
                    var d = new vjs.Menu(this.player_);
                    if (this.options().title && d.contentEl().appendChild(vjs.createEl("li", {className: "vjs-menu-title", innerHTML: vjs.capitalize(this.options().title), tabindex: -1})), this.items = this.createItems(), this.items) {
                        for (var c = 0;
                                c < this.items.length;
                                c++) {
                            d.addItem(this.items[c])
                        }
                    }
                    return d
                }, vjs.MenuButton.prototype.createItems = function() {
                }, vjs.MenuButton.prototype.buildCSSClass = function() {
                    return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this)
                }, vjs.MenuButton.prototype.onFocus = function() {
                }, vjs.MenuButton.prototype.onBlur = function() {
                }, vjs.MenuButton.prototype.onClick = function() {
                    this.one("mouseout", vjs.bind(this, function() {
                        this.menu.unlockShowing(), this.el_.blur()
                    })), this.buttonPressed_ ? this.unpressButton() : this.pressButton()
                }, vjs.MenuButton.prototype.onKeyPress = function(b) {
                    32 == b.which || 13 == b.which ? (this.buttonPressed_ ? this.unpressButton() : this.pressButton(), b.preventDefault()) : 27 == b.which && (this.buttonPressed_ && this.unpressButton(), b.preventDefault())
                }, vjs.MenuButton.prototype.pressButton = function() {
                    this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-pressed", !0), this.items && this.items.length > 0 && this.items[0].el().focus()
                }, vjs.MenuButton.prototype.unpressButton = function() {
                    this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-pressed", !1)
                }, vjs.MediaError = function(b) {
                    "number" == typeof b ? this.code = b : "string" == typeof b ? this.message = b : "object" == typeof b && vjs.obj.merge(this, b), this.message || (this.message = vjs.MediaError.defaultMessages[this.code] || "")
                }, vjs.MediaError.prototype.code = 0, vjs.MediaError.prototype.message = "", vjs.MediaError.prototype.status = null, vjs.MediaError.errorTypes = ["MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED"], vjs.MediaError.defaultMessages = {1: "You aborted the video playback", 2: "A network error caused the video download to fail part-way.", 3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.", 4: "The video could not be loaded, either because the server or network failed or because the format is not supported.", 5: "The video is encrypted and we do not have the keys to decrypt it."};
                for (var errNum = 0;
                        errNum < vjs.MediaError.errorTypes.length;
                        errNum++) {
                    vjs.MediaError[vjs.MediaError.errorTypes[errNum]] = errNum, vjs.MediaError.prototype[vjs.MediaError.errorTypes[errNum]] = errNum
                }
                if (function() {
                    var f, e, h, g;
                    for (vjs.browser.fullscreenAPI, f = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], e = f[0], g = 0;
                            g < f.length;
                            g++) {
                        if (f[g][1] in document) {
                            h = f[g];
                            break
                        }
                    }
                    if (h) {
                        for (vjs.browser.fullscreenAPI = {}, g = 0;
                                g < h.length;
                                g++) {
                            vjs.browser.fullscreenAPI[e[g]] = h[g]
                        }
                    }
                }(), vjs.Player = vjs.Component.extend({init: function(e, d, f) {
                        this.tag = e, e.id = e.id || "vjs_video_" + vjs.guid++, this.tagAttributes = e && vjs.getElementAttributes(e), d = vjs.obj.merge(this.getTagSettings(e), d), this.language_ = d.language || vjs.options.language, this.languages_ = d.languages || vjs.options.languages, this.cache_ = {}, this.poster_ = d.poster || "", this.controls_ = !!d.controls, e.controls = !1, d.reportTouchActivity = !1, this.isAudio("audio" === this.tag.nodeName.toLowerCase()), vjs.Component.call(this, this, d, f), this.addClass(this.controls() ? "vjs-controls-enabled" : "vjs-controls-disabled"), this.isAudio() && this.addClass("vjs-audio"), vjs.players[this.id_] = this, d.plugins && vjs.obj.each(d.plugins, function(g, c) {
                            this[g](c)
                        }, this), this.listenForUserActivity()
                    }}), vjs.Player.prototype.language_, vjs.Player.prototype.language = function(b) {
                    return void 0 === b ? this.language_ : (this.language_ = b, this)
                }, vjs.Player.prototype.languages_, vjs.Player.prototype.languages = function() {
                    return this.languages_
                }, vjs.Player.prototype.options_ = vjs.options, vjs.Player.prototype.dispose = function() {
                    this.trigger("dispose"), this.off("dispose"), vjs.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.tech && this.tech.dispose(), vjs.Component.prototype.dispose.call(this)
                }, vjs.Player.prototype.getTagSettings = function(r) {
                    var q, p, o = {sources: [], tracks: []};
                    if (q = vjs.getElementAttributes(r), p = q["data-setup"], null !== p && vjs.obj.merge(q, vjs.JSON.parse(p || "{}")), vjs.obj.merge(o, q), r.hasChildNodes()) {
                        var n, m, l, k, j;
                        for (n = r.childNodes, k = 0, j = n.length;
                                j > k;
                                k++) {
                            m = n[k], l = m.nodeName.toLowerCase(), "source" === l ? o.sources.push(vjs.getElementAttributes(m)) : "track" === l && o.tracks.push(vjs.getElementAttributes(m))
                        }
                    }
                    return o
                }, vjs.Player.prototype.createEl = function() {
                    var e, d = this.el_ = vjs.Component.prototype.createEl.call(this, "div"), f = this.tag;
                    return f.removeAttribute("width"), f.removeAttribute("height"), e = vjs.getElementAttributes(f), vjs.obj.each(e, function(a) {
                        "class" == a ? d.className = e[a] : d.setAttribute(a, e[a])
                    }), f.id += "_html5_api", f.className = "vjs-tech", f.player = d.player = this, this.addClass("vjs-paused"), this.width(this.options_.width, !0), this.height(this.options_.height, !0), f.initNetworkState_ = f.networkState, f.parentNode && f.parentNode.insertBefore(d, f), vjs.insertFirst(f, d), this.el_ = d, this.on("loadstart", this.onLoadStart), this.on("waiting", this.onWaiting), this.on(["canplay", "canplaythrough", "playing", "ended"], this.onWaitEnd), this.on("seeking", this.onSeeking), this.on("seeked", this.onSeeked), this.on("ended", this.onEnded), this.on("play", this.onPlay), this.on("firstplay", this.onFirstPlay), this.on("pause", this.onPause), this.on("progress", this.onProgress), this.on("durationchange", this.onDurationChange), this.on("fullscreenchange", this.onFullscreenChange), d
                }, vjs.Player.prototype.loadTech = function(f, e) {
                    this.tech && this.unloadTech(), "Html5" !== f && this.tag && (vjs.Html5.disposeMediaElement(this.tag), this.tag = null), this.techName = f, this.isReady_ = !1;
                    var h = function() {
                        this.player_.triggerReady()
                    }, g = vjs.obj.merge({source: e, parentEl: this.el_}, this.options_[f.toLowerCase()]);
                    e && (this.currentType_ = e.type, e.src == this.cache_.src && this.cache_.currentTime > 0 && (g.startTime = this.cache_.currentTime), this.cache_.src = e.src), this.tech = new window.videojs[f](this, g), this.tech.ready(h)
                }, vjs.Player.prototype.unloadTech = function() {
                    this.isReady_ = !1, this.tech.dispose(), this.tech = !1
                }, vjs.Player.prototype.onLoadStart = function() {
                    this.removeClass("vjs-ended"), this.error(null), this.paused() ? this.hasStarted(!1) : this.trigger("firstplay")
                }, vjs.Player.prototype.hasStarted_ = !1, vjs.Player.prototype.hasStarted = function(b) {
                    return void 0 !== b ? (this.hasStarted_ !== b && (this.hasStarted_ = b, b ? (this.addClass("vjs-has-started"), this.trigger("firstplay")) : this.removeClass("vjs-has-started")), this) : this.hasStarted_
                }, vjs.Player.prototype.onLoadedMetaData, vjs.Player.prototype.onLoadedData, vjs.Player.prototype.onLoadedAllData, vjs.Player.prototype.onPlay = function() {
                    this.removeClass("vjs-ended"), this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.hasStarted(!0), window.gdt.Tracking.PANtracking.videoTracking(this, "Play")
                }, vjs.Player.prototype.onWaiting = function() {
                    this.addClass("vjs-waiting")
                }, vjs.Player.prototype.onWaitEnd = function() {
                    this.removeClass("vjs-waiting")
                }, vjs.Player.prototype.onSeeking = function() {
                    this.addClass("vjs-seeking")
                }, vjs.Player.prototype.onSeeked = function() {
                    this.removeClass("vjs-seeking")
                }, vjs.Player.prototype.onFirstPlay = function() {
                    this.options_.starttime && this.currentTime(this.options_.starttime), this.addClass("vjs-has-started"), window.gdt.Tracking.PANtracking.videoTracking(this, "Start")
                }, vjs.Player.prototype.onPause = function() {
                    this.removeClass("vjs-playing"), this.addClass("vjs-paused"), window.gdt.Tracking.PANtracking.videoTracking(this, "Pause")
                }, vjs.Player.prototype.onTimeUpdate, vjs.Player.prototype.onProgress = function() {
                    1 == this.bufferedPercent() && this.trigger("loadedalldata")
                }, vjs.Player.prototype.onEnded = function() {
                    this.addClass("vjs-ended"), this.options_.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause()
                }, vjs.Player.prototype.onDurationChange = function() {
                    var b = this.techGet("duration");
                    b && (0 > b && (b = 1 / 0), this.duration(b), b === 1 / 0 ? this.addClass("vjs-live") : this.removeClass("vjs-live"))
                }, vjs.Player.prototype.onVolumeChange, vjs.Player.prototype.onFullscreenChange = function() {
                    this.isFullscreen() ? (this.addClass("vjs-fullscreen"), window.gdt.Tracking.PANtracking.videoTracking(this, "Full Screen")) : (this.removeClass("vjs-fullscreen"), window.gdt.Tracking.PANtracking.videoTracking(this, "Normal Size"))
                }, vjs.Player.prototype.onError, vjs.Player.prototype.cache_, vjs.Player.prototype.getCache = function() {
                    return this.cache_
                }, vjs.Player.prototype.techCall = function(e, d) {
                    if (this.tech && !this.tech.isReady_) {
                        this.tech.ready(function() {
                            this[e](d)
                        })
                    } else {
                        try {
                            this.tech[e](d)
                        } catch (f) {
                            throw vjs.log(f), f
                        }
                    }
                }, vjs.Player.prototype.techGet = function(d) {
                    if (this.tech && this.tech.isReady_) {
                        try {
                            return this.tech[d]()
                        } catch (c) {
                            throw void 0 === this.tech[d] ? vjs.log("Video.js: " + d + " method not defined for " + this.techName + " playback technology.", c) : "TypeError" == c.name ? (vjs.log("Video.js: " + d + " unavailable on " + this.techName + " playback technology element.", c), this.tech.isReady_ = !1) : vjs.log(c), c
                        }
                    }
                }, vjs.Player.prototype.play = function() {
                    return this.techCall("play"), this
                }, vjs.Player.prototype.pause = function() {
                    return this.techCall("pause"), this
                }, vjs.Player.prototype.paused = function() {
                    return this.techGet("paused") === !1 ? !1 : !0
                }, vjs.Player.prototype.currentTime = function(b) {
                    return void 0 !== b ? (this.techCall("setCurrentTime", b), this) : this.cache_.currentTime = this.techGet("currentTime") || 0
                }, vjs.Player.prototype.duration = function(b) {
                    return void 0 !== b ? (this.cache_.duration = parseFloat(b), this) : (void 0 === this.cache_.duration && this.onDurationChange(), this.cache_.duration || 0)
                }, vjs.Player.prototype.remainingTime = function() {
                    return this.duration() - this.currentTime()
                }, vjs.Player.prototype.buffered = function() {
                    var b = this.techGet("buffered");
                    return b && b.length || (b = vjs.createTimeRange(0, 0)), b
                }, vjs.Player.prototype.bufferedPercent = function() {
                    var h, g, l = this.duration(), k = this.buffered(), j = 0;
                    if (!l) {
                        return 0
                    }
                    for (var i = 0;
                            i < k.length;
                            i++) {
                        h = k.start(i), g = k.end(i), g > l && (g = l), j += g - h
                    }
                    return j / l
                }, vjs.Player.prototype.bufferedEnd = function() {
                    var e = this.buffered(), d = this.duration(), f = e.end(e.length - 1);
                    return f > d && (f = d), f
                }, vjs.Player.prototype.volume = function(d) {
                    var c;
                    return void 0 !== d ? (c = Math.max(0, Math.min(1, parseFloat(d))), this.cache_.volume = c, this.techCall("setVolume", c), vjs.setLocalStorage("volume", c), this) : (c = parseFloat(this.techGet("volume")), isNaN(c) ? 1 : c)
                }, vjs.Player.prototype.muted = function(b) {
                    return void 0 !== b ? (this.techCall("setMuted", b), this) : this.techGet("muted") || !1
                }, vjs.Player.prototype.supportsFullScreen = function() {
                    return this.techGet("supportsFullScreen") || !1
                }, vjs.Player.prototype.isFullscreen_ = !1, vjs.Player.prototype.isFullscreen = function(b) {
                    return void 0 !== b ? (this.isFullscreen_ = !!b, this) : this.isFullscreen_
                }, vjs.Player.prototype.isFullScreen = function(b) {
                    return vjs.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(b)
                }, vjs.Player.prototype.requestFullscreen = function() {
                    var b = vjs.browser.fullscreenAPI;
                    return this.isFullscreen(!0), b ? (vjs.on(document, b.fullscreenchange, vjs.bind(this, function() {
                        this.isFullscreen(document[b.fullscreenElement]), this.isFullscreen() === !1 && vjs.off(document, b.fullscreenchange, arguments.callee), this.trigger("fullscreenchange")
                    })), this.el_[b.requestFullscreen]()) : this.tech.supportsFullScreen() ? this.techCall("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this
                }, vjs.Player.prototype.requestFullScreen = function() {
                    return vjs.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")'), this.requestFullscreen()
                }, vjs.Player.prototype.exitFullscreen = function() {
                    var b = vjs.browser.fullscreenAPI;
                    return this.isFullscreen(!1), b ? document[b.exitFullscreen]() : this.tech.supportsFullScreen() ? this.techCall("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this
                }, vjs.Player.prototype.cancelFullScreen = function() {
                    return vjs.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()"), this.exitFullscreen()
                }, vjs.Player.prototype.enterFullWindow = function() {
                    this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, vjs.on(document, "keydown", vjs.bind(this, this.fullWindowOnEscKey)), document.documentElement.style.overflow = "hidden", vjs.addClass(document.body, "vjs-full-window"), this.trigger("enterFullWindow")
                }, vjs.Player.prototype.fullWindowOnEscKey = function(b) {
                    27 === b.keyCode && (this.isFullscreen() === !0 ? this.exitFullscreen() : this.exitFullWindow())
                }, vjs.Player.prototype.exitFullWindow = function() {
                    this.isFullWindow = !1, vjs.off(document, "keydown", this.fullWindowOnEscKey), document.documentElement.style.overflow = this.docOrigOverflow, vjs.removeClass(document.body, "vjs-full-window"), this.trigger("exitFullWindow")
                }, vjs.Player.prototype.selectSource = function(j) {
                    for (var i = 0, p = this.options_.techOrder;
                            i < p.length;
                            i++) {
                        var o = vjs.capitalize(p[i]), n = window.videojs[o];
                        if (n) {
                            if (n.isSupported()) {
                                for (var m = 0, l = j;
                                        m < l.length;
                                        m++) {
                                    var k = l[m];
                                    if (n.canPlaySource(k)) {
                                        return{source: k, tech: o}
                                    }
                                }
                            }
                        } else {
                            vjs.log.error('The "' + o + '" tech is undefined. Skipped browser support check for that tech.')
                        }
                    }
                    return !1
                }, vjs.Player.prototype.src = function(b) {
                    return void 0 === b ? this.techGet("src") : (vjs.obj.isArray(b) ? this.sourceList_(b) : "string" == typeof b ? this.src({src: b}) : b instanceof Object && (b.type && !window.videojs[this.techName].canPlaySource(b) ? this.sourceList_([b]) : (this.cache_.src = b.src, this.currentType_ = b.type || "", this.ready(function() {
                        window.videojs[this.techName].prototype.hasOwnProperty("setSource") ? this.techCall("setSource", b) : this.techCall("src", b.src), "auto" == this.options_.preload && this.load(), this.options_.autoplay && this.play()
                    }))), this)
                }, vjs.Player.prototype.sourceList_ = function(d) {
                    var c = this.selectSource(d);
                    c ? c.tech === this.techName ? this.src(c.source) : this.loadTech(c.tech, c.source) : (this.setTimeout(function() {
                        this.error({code: 4, message: this.localize(this.options().notSupportedMessage)})
                    }, 0), this.triggerReady())
                }, vjs.Player.prototype.load = function() {
                    return this.techCall("load"), this
                }, vjs.Player.prototype.currentSrc = function() {
                    return this.techGet("currentSrc") || this.cache_.src || ""
                }, vjs.Player.prototype.currentType = function() {
                    return this.currentType_ || ""
                }, vjs.Player.prototype.preload = function(b) {
                    return void 0 !== b ? (this.techCall("setPreload", b), this.options_.preload = b, this) : this.techGet("preload")
                }, vjs.Player.prototype.autoplay = function(b) {
                    return void 0 !== b ? (this.techCall("setAutoplay", b), this.options_.autoplay = b, this) : this.techGet("autoplay", b)
                }, vjs.Player.prototype.loop = function(b) {
                    return void 0 !== b ? (this.techCall("setLoop", b), this.options_.loop = b, this) : this.techGet("loop")
                }, vjs.Player.prototype.poster_, vjs.Player.prototype.poster = function(b) {
                    return void 0 === b ? this.poster_ : (b || (b = ""), this.poster_ = b, this.techCall("setPoster", b), this.trigger("posterchange"), this)
                }, vjs.Player.prototype.controls_, vjs.Player.prototype.controls = function(b) {
                    return void 0 !== b ? (b = !!b, this.controls_ !== b && (this.controls_ = b, b ? (this.removeClass("vjs-controls-disabled"), this.addClass("vjs-controls-enabled"), this.trigger("controlsenabled")) : (this.removeClass("vjs-controls-enabled"), this.addClass("vjs-controls-disabled"), this.trigger("controlsdisabled"))), this) : this.controls_
                }, vjs.Player.prototype.usingNativeControls_, vjs.Player.prototype.usingNativeControls = function(b) {
                    return void 0 !== b ? (b = !!b, this.usingNativeControls_ !== b && (this.usingNativeControls_ = b, b ? (this.addClass("vjs-using-native-controls"), this.trigger("usingnativecontrols")) : (this.removeClass("vjs-using-native-controls"), this.trigger("usingcustomcontrols"))), this) : this.usingNativeControls_
                }, vjs.Player.prototype.error_ = null, vjs.Player.prototype.error = function(b) {
                    return void 0 === b ? this.error_ : null === b ? (this.error_ = b, this.removeClass("vjs-error"), this) : (this.error_ = b instanceof vjs.MediaError ? b : new vjs.MediaError(b), this.trigger("error"), this.addClass("vjs-error"), vjs.log.error("(CODE:" + this.error_.code + " " + vjs.MediaError.errorTypes[this.error_.code] + ")", this.error_.message, this.error_), this)
                }, vjs.Player.prototype.ended = function() {
                    return this.techGet("ended")
                }, vjs.Player.prototype.seeking = function() {
                    return this.techGet("seeking")
                }, vjs.Player.prototype.userActivity_ = !0, vjs.Player.prototype.reportUserActivity = function() {
                    this.userActivity_ = !0
                }, vjs.Player.prototype.userActive_ = !0, vjs.Player.prototype.userActive = function(b) {
                    return void 0 !== b ? (b = !!b, b !== this.userActive_ && (this.userActive_ = b, b ? (this.userActivity_ = !0, this.removeClass("vjs-user-inactive"), this.addClass("vjs-user-active"), this.trigger("useractive")) : (this.userActivity_ = !1, this.tech && this.tech.one("mousemove", function(c) {
                        c.stopPropagation(), c.preventDefault()
                    }), this.removeClass("vjs-user-active"), this.addClass("vjs-user-inactive"), this.trigger("userinactive"))), this) : this.userActive_
                }, vjs.Player.prototype.listenForUserActivity = function() {
                    var r, q, p, o, n, m, l, k, j;
                    r = vjs.bind(this, this.reportUserActivity), q = function(a) {
                        (a.screenX != k || a.screenY != j) && (k = a.screenX, j = a.screenY, r())
                    }, p = function() {
                        r(), this.clearInterval(o), o = this.setInterval(r, 250)
                    }, n = function() {
                        r(), this.clearInterval(o)
                    }, this.on("mousedown", p), this.on("mousemove", q), this.on("mouseup", n), this.on("keydown", r), this.on("keyup", r), m = this.setInterval(function() {
                        if (this.userActivity_) {
                            this.userActivity_ = !1, this.userActive(!0), this.clearTimeout(l);
                            var b = this.options().inactivityTimeout;
                            b > 0 && (l = this.setTimeout(function() {
                                this.userActivity_ || this.userActive(!1)
                            }, b))
                        }
                    }, 250)
                }, vjs.Player.prototype.playbackRate = function(b) {
                    return void 0 !== b ? (this.techCall("setPlaybackRate", b), this) : this.tech && this.tech.featuresPlaybackRate ? this.techGet("playbackRate") : 1
                }, vjs.Player.prototype.isAudio_ = !1, vjs.Player.prototype.isAudio = function(b) {
                    return void 0 !== b ? (this.isAudio_ = !!b, this) : this.isAudio_
                }, vjs.Player.prototype.networkState = function() {
                    return this.techGet("networkState")
                }, vjs.Player.prototype.readyState = function() {
                    return this.techGet("readyState")
                }, vjs.Player.prototype.textTracks = function() {
                    return this.tech && this.tech.textTracks()
                }, vjs.Player.prototype.remoteTextTracks = function() {
                    return this.tech && this.tech.remoteTextTracks()
                }, vjs.Player.prototype.addTextTrack = function(e, d, f) {
                    return this.tech && this.tech.addTextTrack(e, d, f)
                }, vjs.Player.prototype.addRemoteTextTrack = function(b) {
                    return this.tech && this.tech.addRemoteTextTrack(b)
                }, vjs.Player.prototype.removeRemoteTextTrack = function(b) {
                    this.tech && this.tech.removeRemoteTextTrack(b)
                }, vjs.ControlBar = vjs.Component.extend(), vjs.ControlBar.prototype.options_ = {loadEvent: "play", children: {playToggle: {}, currentTimeDisplay: {}, timeDivider: {}, durationDisplay: {}, remainingTimeDisplay: {}, liveDisplay: {}, progressControl: {}, fullscreenToggle: {}, volumeControl: {}, muteToggle: {}, playbackRateMenuButton: {}, subtitlesButton: {}, captionsButton: {}, chaptersButton: {}}}, vjs.ControlBar.prototype.createEl = function() {
                    return vjs.createEl("div", {className: "vjs-control-bar"})
                }, vjs.LiveDisplay = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c)
                    }}), vjs.LiveDisplay.prototype.createEl = function() {
                    var b = vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-live-controls vjs-control"});
                    return this.contentEl_ = vjs.createEl("div", {className: "vjs-live-display", innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE"), "aria-live": "off"}), b.appendChild(this.contentEl_), b
                }, vjs.PlayToggle = vjs.Button.extend({init: function(d, c) {
                        vjs.Button.call(this, d, c), this.on(d, "play", this.onPlay), this.on(d, "pause", this.onPause)
                    }}), vjs.PlayToggle.prototype.buttonText = "Play", vjs.PlayToggle.prototype.buildCSSClass = function() {
                    return"vjs-play-control " + vjs.Button.prototype.buildCSSClass.call(this)
                }, vjs.PlayToggle.prototype.onClick = function() {
                    this.player_.paused() ? this.player_.play() : this.player_.pause()
                }, vjs.PlayToggle.prototype.onPlay = function() {
                    this.removeClass("vjs-paused"), this.addClass("vjs-playing"), this.el_.children[0].children[0].innerHTML = this.localize("Pause")
                }, vjs.PlayToggle.prototype.onPause = function() {
                    this.removeClass("vjs-playing"), this.addClass("vjs-paused"), this.el_.children[0].children[0].innerHTML = this.localize("Play")
                }, vjs.CurrentTimeDisplay = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.on(d, "timeupdate", this.updateContent)
                    }}), vjs.CurrentTimeDisplay.prototype.createEl = function() {
                    var b = vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-current-time vjs-time-controls vjs-control"});
                    return this.contentEl_ = vjs.createEl("div", {className: "vjs-current-time-display", innerHTML: '<span class="vjs-control-text">Current Time </span>0:00', "aria-live": "off"}), b.appendChild(this.contentEl_), b
                }, vjs.CurrentTimeDisplay.prototype.updateContent = function() {
                    var b = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
                    this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Current Time") + "</span> " + vjs.formatTime(b, this.player_.duration())
                }, vjs.DurationDisplay = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.on(d, "timeupdate", this.updateContent)
                    }}), vjs.DurationDisplay.prototype.createEl = function() {
                    var b = vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-duration vjs-time-controls vjs-control"});
                    return this.contentEl_ = vjs.createEl("div", {className: "vjs-duration-display", innerHTML: '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> 0:00", "aria-live": "off"}), b.appendChild(this.contentEl_), b
                }, vjs.DurationDisplay.prototype.updateContent = function() {
                    var b = this.player_.duration();
                    b && (this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> " + vjs.formatTime(b))
                }, vjs.TimeDivider = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c)
                    }}), vjs.TimeDivider.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-time-divider", innerHTML: "<div><span>/</span></div>"})
                }, vjs.RemainingTimeDisplay = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.on(d, "timeupdate", this.updateContent)
                    }}), vjs.RemainingTimeDisplay.prototype.createEl = function() {
                    var b = vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-remaining-time vjs-time-controls vjs-control"});
                    return this.contentEl_ = vjs.createEl("div", {className: "vjs-remaining-time-display", innerHTML: '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -0:00", "aria-live": "off"}), b.appendChild(this.contentEl_), b
                }, vjs.RemainingTimeDisplay.prototype.updateContent = function() {
                    this.player_.duration() && (this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> -" + vjs.formatTime(this.player_.remainingTime()))
                }, vjs.FullscreenToggle = vjs.Button.extend({init: function(d, c) {
                        vjs.Button.call(this, d, c)
                    }}), vjs.FullscreenToggle.prototype.buttonText = "Fullscreen", vjs.FullscreenToggle.prototype.buildCSSClass = function() {
                    return"vjs-fullscreen-control " + vjs.Button.prototype.buildCSSClass.call(this)
                }, vjs.FullscreenToggle.prototype.onClick = function() {
                    this.player_.isFullscreen() ? (this.player_.exitFullscreen(), this.controlText_.innerHTML = this.localize("Fullscreen")) : (this.player_.requestFullscreen(), this.controlText_.innerHTML = this.localize("Non-Fullscreen"))
                }, vjs.ProgressControl = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c)
                    }}), vjs.ProgressControl.prototype.options_ = {children: {seekBar: {}}}, vjs.ProgressControl.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-progress-control vjs-control"})
                }, vjs.SeekBar = vjs.Slider.extend({init: function(d, c) {
                        vjs.Slider.call(this, d, c), this.on(d, "timeupdate", this.updateARIAAttributes), d.ready(vjs.bind(this, this.updateARIAAttributes))
                    }}), vjs.SeekBar.prototype.options_ = {children: {loadProgressBar: {}, playProgressBar: {}, seekHandle: {}}, barName: "playProgressBar", handleName: "seekHandle"}, vjs.SeekBar.prototype.playerEvent = "timeupdate", vjs.SeekBar.prototype.createEl = function() {
                    return vjs.Slider.prototype.createEl.call(this, "div", {className: "vjs-progress-holder", "aria-label": "video progress bar"})
                }, vjs.SeekBar.prototype.updateARIAAttributes = function() {
                    var b = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
                    this.el_.setAttribute("aria-valuenow", vjs.round(100 * this.getPercent(), 2)), this.el_.setAttribute("aria-valuetext", vjs.formatTime(b, this.player_.duration()))
                }, vjs.SeekBar.prototype.getPercent = function() {
                    return this.player_.currentTime() / this.player_.duration()
                }, vjs.SeekBar.prototype.onMouseDown = function(b) {
                    vjs.Slider.prototype.onMouseDown.call(this, b), this.player_.scrubbing = !0, this.player_.addClass("vjs-scrubbing"), this.videoWasPlaying = !this.player_.paused(), this.player_.pause()
                }, vjs.SeekBar.prototype.onMouseMove = function(d) {
                    var c = this.calculateDistance(d) * this.player_.duration();
                    c == this.player_.duration() && (c -= 0.1), this.player_.currentTime(c)
                }, vjs.SeekBar.prototype.onMouseUp = function(b) {
                    vjs.Slider.prototype.onMouseUp.call(this, b), this.player_.scrubbing = !1, this.player_.removeClass("vjs-scrubbing"), this.videoWasPlaying && this.player_.play()
                }, vjs.SeekBar.prototype.stepForward = function() {
                    this.player_.currentTime(this.player_.currentTime() + 5)
                }, vjs.SeekBar.prototype.stepBack = function() {
                    this.player_.currentTime(this.player_.currentTime() - 5)
                }, vjs.LoadProgressBar = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.on(d, "progress", this.update)
                    }}), vjs.LoadProgressBar.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-load-progress", innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"})
                }, vjs.LoadProgressBar.prototype.update = function() {
                    var r, q, p, o, n = this.player_.buffered(), m = this.player_.duration(), l = this.player_.bufferedEnd(), k = this.el_.children, j = function(e, d) {
                        var f = e / d || 0;
                        return 100 * f + "%"
                    };
                    for (this.el_.style.width = j(l, m), r = 0;
                            r < n.length;
                            r++) {
                        q = n.start(r), p = n.end(r), o = k[r], o || (o = this.el_.appendChild(vjs.createEl())), o.style.left = j(q, l), o.style.width = j(p - q, l)
                    }
                    for (r = k.length;
                            r > n.length;
                            r--) {
                        this.el_.removeChild(k[r - 1])
                    }
                }, vjs.PlayProgressBar = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c)
                    }}), vjs.PlayProgressBar.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-play-progress", innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"})
                }, vjs.SeekHandle = vjs.SliderHandle.extend({init: function(d, c) {
                        vjs.SliderHandle.call(this, d, c), this.on(d, "timeupdate", this.updateContent)
                    }}), vjs.SeekHandle.prototype.defaultValue = "00:00", vjs.SeekHandle.prototype.createEl = function() {
                    return vjs.SliderHandle.prototype.createEl.call(this, "div", {className: "vjs-seek-handle", "aria-live": "off"})
                }, vjs.SeekHandle.prototype.updateContent = function() {
                    var b = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
                    this.el_.innerHTML = '<span class="vjs-control-text">' + vjs.formatTime(b, this.player_.duration()) + "</span>"
                }, vjs.VolumeControl = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), d.tech && d.tech.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(d, "loadstart", function() {
                            d.tech.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                        })
                    }}), vjs.VolumeControl.prototype.options_ = {children: {volumeBar: {}}}, vjs.VolumeControl.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-volume-control vjs-control"})
                }, vjs.VolumeBar = vjs.Slider.extend({init: function(d, c) {
                        vjs.Slider.call(this, d, c), this.on(d, "volumechange", this.updateARIAAttributes), d.ready(vjs.bind(this, this.updateARIAAttributes))
                    }}), vjs.VolumeBar.prototype.updateARIAAttributes = function() {
                    this.el_.setAttribute("aria-valuenow", vjs.round(100 * this.player_.volume(), 2)), this.el_.setAttribute("aria-valuetext", vjs.round(100 * this.player_.volume(), 2) + "%")
                }, vjs.VolumeBar.prototype.options_ = {children: {volumeLevel: {}, volumeHandle: {}}, barName: "volumeLevel", handleName: "volumeHandle"}, vjs.VolumeBar.prototype.playerEvent = "volumechange", vjs.VolumeBar.prototype.createEl = function() {
                    return vjs.Slider.prototype.createEl.call(this, "div", {className: "vjs-volume-bar", "aria-label": "volume level"})
                }, vjs.VolumeBar.prototype.onMouseMove = function(b) {
                    this.player_.muted() && this.player_.muted(!1), this.player_.volume(this.calculateDistance(b))
                }, vjs.VolumeBar.prototype.getPercent = function() {
                    return this.player_.muted() ? 0 : this.player_.volume()
                }, vjs.VolumeBar.prototype.stepForward = function() {
                    this.player_.volume(this.player_.volume() + 0.1)
                }, vjs.VolumeBar.prototype.stepBack = function() {
                    this.player_.volume(this.player_.volume() - 0.1)
                }, vjs.VolumeLevel = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c)
                    }}), vjs.VolumeLevel.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-volume-level", innerHTML: '<span class="vjs-control-text"></span>'})
                }, vjs.VolumeHandle = vjs.SliderHandle.extend(), vjs.VolumeHandle.prototype.defaultValue = "00:00", vjs.VolumeHandle.prototype.createEl = function() {
                    return vjs.SliderHandle.prototype.createEl.call(this, "div", {className: "vjs-volume-handle"})
                }, vjs.MuteToggle = vjs.Button.extend({init: function(d, c) {
                        vjs.Button.call(this, d, c), this.on(d, "volumechange", this.update), d.tech && d.tech.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(d, "loadstart", function() {
                            d.tech.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                        })
                    }}), vjs.MuteToggle.prototype.createEl = function() {
                    return vjs.Button.prototype.createEl.call(this, "div", {className: "vjs-mute-control vjs-control", innerHTML: '<div><span class="vjs-control-text">' + this.localize("Mute") + "</span></div>"})
                }, vjs.MuteToggle.prototype.onClick = function() {
                    this.player_.muted(this.player_.muted() ? !1 : !0)
                }, vjs.MuteToggle.prototype.update = function() {
                    var e = this.player_.volume(), d = 3;
                    0 === e || this.player_.muted() ? d = 0 : 0.33 > e ? d = 1 : 0.67 > e && (d = 2), this.player_.muted() ? this.el_.children[0].children[0].innerHTML != this.localize("Unmute") && (this.el_.children[0].children[0].innerHTML = this.localize("Unmute")) : this.el_.children[0].children[0].innerHTML != this.localize("Mute") && (this.el_.children[0].children[0].innerHTML = this.localize("Mute"));
                    for (var f = 0;
                            4 > f;
                            f++) {
                        vjs.removeClass(this.el_, "vjs-vol-" + f)
                    }
                    vjs.addClass(this.el_, "vjs-vol-" + d)
                }, vjs.VolumeMenuButton = vjs.MenuButton.extend({init: function(d, c) {
                        vjs.MenuButton.call(this, d, c), this.on(d, "volumechange", this.volumeUpdate), d.tech && d.tech.featuresVolumeControl === !1 && this.addClass("vjs-hidden"), this.on(d, "loadstart", function() {
                            d.tech.featuresVolumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                        }), this.addClass("vjs-menu-button")
                    }}), vjs.VolumeMenuButton.prototype.createMenu = function() {
                    var d = new vjs.Menu(this.player_, {contentElType: "div"}), c = new vjs.VolumeBar(this.player_, this.options_.volumeBar);
                    return c.on("focus", function() {
                        d.lockShowing()
                    }), c.on("blur", function() {
                        d.unlockShowing()
                    }), d.addChild(c), d
                }, vjs.VolumeMenuButton.prototype.onClick = function() {
                    vjs.MuteToggle.prototype.onClick.call(this), vjs.MenuButton.prototype.onClick.call(this)
                }, vjs.VolumeMenuButton.prototype.createEl = function() {
                    return vjs.Button.prototype.createEl.call(this, "div", {className: "vjs-volume-menu-button vjs-menu-button vjs-control", innerHTML: '<div><span class="vjs-control-text">' + this.localize("Mute") + "</span></div>"})
                }, vjs.VolumeMenuButton.prototype.volumeUpdate = vjs.MuteToggle.prototype.update, vjs.PlaybackRateMenuButton = vjs.MenuButton.extend({init: function(d, c) {
                        vjs.MenuButton.call(this, d, c), this.updateVisibility(), this.updateLabel(), this.on(d, "loadstart", this.updateVisibility), this.on(d, "ratechange", this.updateLabel)
                    }}), vjs.PlaybackRateMenuButton.prototype.buttonText = "Playback Rate", vjs.PlaybackRateMenuButton.prototype.className = "vjs-playback-rate", vjs.PlaybackRateMenuButton.prototype.createEl = function() {
                    var b = vjs.MenuButton.prototype.createEl.call(this);
                    return this.labelEl_ = vjs.createEl("div", {className: "vjs-playback-rate-value", innerHTML: 1}), b.appendChild(this.labelEl_), b
                }, vjs.PlaybackRateMenuButton.prototype.createMenu = function() {
                    var e = new vjs.Menu(this.player()), d = this.player().options().playbackRates;
                    if (d) {
                        for (var f = d.length - 1;
                                f >= 0;
                                f--) {
                            e.addChild(new vjs.PlaybackRateMenuItem(this.player(), {rate: d[f] + "x"}))
                        }
                    }
                    return e
                }, vjs.PlaybackRateMenuButton.prototype.updateARIAAttributes = function() {
                    this.el().setAttribute("aria-valuenow", this.player().playbackRate())
                }, vjs.PlaybackRateMenuButton.prototype.onClick = function() {
                    for (var f = this.player().playbackRate(), e = this.player().options().playbackRates, h = e[0], g = 0;
                            g < e.length;
                            g++) {
                        if (e[g] > f) {
                            h = e[g];
                            break
                        }
                    }
                    this.player().playbackRate(h)
                }, vjs.PlaybackRateMenuButton.prototype.playbackRateSupported = function() {
                    return this.player().tech && this.player().tech.featuresPlaybackRate && this.player().options().playbackRates && this.player().options().playbackRates.length > 0
                }, vjs.PlaybackRateMenuButton.prototype.updateVisibility = function() {
                    this.playbackRateSupported() ? this.removeClass("vjs-hidden") : this.addClass("vjs-hidden")
                }, vjs.PlaybackRateMenuButton.prototype.updateLabel = function() {
                    this.playbackRateSupported() && (this.labelEl_.innerHTML = this.player().playbackRate() + "x")
                }, vjs.PlaybackRateMenuItem = vjs.MenuItem.extend({contentElType: "button", init: function(f, e) {
                        var h = this.label = e.rate, g = this.rate = parseFloat(h, 10);
                        e.label = h, e.selected = 1 === g, vjs.MenuItem.call(this, f, e), this.on(f, "ratechange", this.update)
                    }}), vjs.PlaybackRateMenuItem.prototype.onClick = function() {
                    vjs.MenuItem.prototype.onClick.call(this), this.player().playbackRate(this.rate)
                }, vjs.PlaybackRateMenuItem.prototype.update = function() {
                    this.selected(this.player().playbackRate() == this.rate)
                }, vjs.PosterImage = vjs.Button.extend({init: function(d, c) {
                        vjs.Button.call(this, d, c), this.update(), d.on("posterchange", vjs.bind(this, this.update))
                    }}), vjs.PosterImage.prototype.dispose = function() {
                    this.player().off("posterchange", this.update), vjs.Button.prototype.dispose.call(this)
                }, vjs.PosterImage.prototype.createEl = function() {
                    var b = vjs.createEl("div", {className: "vjs-poster", tabIndex: -1});
                    return vjs.BACKGROUND_SIZE_SUPPORTED || (this.fallbackImg_ = vjs.createEl("img"), b.appendChild(this.fallbackImg_)), b
                }, vjs.PosterImage.prototype.update = function() {
                    var b = this.player().poster();
                    this.setSrc(b), b ? this.show() : this.hide()
                }, vjs.PosterImage.prototype.setSrc = function(d) {
                    var c;
                    this.fallbackImg_ ? this.fallbackImg_.src = d : (c = "", d && (c = 'url("' + d + '")'), this.el_.style.backgroundImage = c)
                }, vjs.PosterImage.prototype.onClick = function() {
                    this.player_.play()
                }, vjs.LoadingSpinner = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c)
                    }}), vjs.LoadingSpinner.prototype.createEl = function() {
                    return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-loading-spinner"})
                }, vjs.BigPlayButton = vjs.Button.extend(), vjs.BigPlayButton.prototype.createEl = function() {
                    return vjs.Button.prototype.createEl.call(this, "div", {className: "vjs-big-play-button", innerHTML: '<span aria-hidden="true"></span>', "aria-label": "play"})
                }, vjs.BigPlayButton.prototype.onClick = function() {
                    this.player_.play()
                }, vjs.ErrorDisplay = vjs.Component.extend({init: function(d, c) {
                        vjs.Component.call(this, d, c), this.update(), this.on(d, "error", this.update)
                    }}), vjs.ErrorDisplay.prototype.createEl = function() {
                    var b = vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-error-display"});
                    return this.contentEl_ = vjs.createEl("div"), b.appendChild(this.contentEl_), b
                }, vjs.ErrorDisplay.prototype.update = function() {
                    this.player().error() && (this.contentEl_.innerHTML = this.localize(this.player().error().message))
                }, function() {
                    var b;
                    vjs.MediaTechController = vjs.Component.extend({init: function(e, d, f) {
                            d = d || {}, d.reportTouchActivity = !1, vjs.Component.call(this, e, d, f), this.featuresProgressEvents || this.manualProgressOn(), this.featuresTimeupdateEvents || this.manualTimeUpdatesOn(), this.initControlsListeners(), this.featuresNativeTextTracks || this.emulateTextTracks(), this.initTextTrackListeners()
                        }}), vjs.MediaTechController.prototype.initControlsListeners = function() {
                        var d, c;
                        d = this.player(), c = function() {
                            d.controls() && !d.usingNativeControls() && this.addControlsListeners()
                        }, this.ready(c), this.on(d, "controlsenabled", c), this.on(d, "controlsdisabled", this.removeControlsListeners), this.ready(function() {
                            this.networkState && this.networkState() > 0 && this.player().trigger("loadstart")
                        })
                    }, vjs.MediaTechController.prototype.addControlsListeners = function() {
                        var c;
                        this.on("mousedown", this.onClick), this.on("touchstart", function() {
                            c = this.player_.userActive()
                        }), this.on("touchmove", function() {
                            c && this.player().reportUserActivity()
                        }), this.on("touchend", function(d) {
                            d.preventDefault()
                        }), this.emitTapEvents(), this.on("tap", this.onTap)
                    }, vjs.MediaTechController.prototype.removeControlsListeners = function() {
                        this.off("tap"), this.off("touchstart"), this.off("touchmove"), this.off("touchleave"), this.off("touchcancel"), this.off("touchend"), this.off("click"), this.off("mousedown")
                    }, vjs.MediaTechController.prototype.onClick = function(c) {
                        0 === c.button && this.player().controls() && (this.player().paused() ? this.player().play() : this.player().pause())
                    }, vjs.MediaTechController.prototype.onTap = function() {
                        this.player().userActive(!this.player().userActive())
                    }, vjs.MediaTechController.prototype.manualProgressOn = function() {
                        this.manualProgress = !0, this.trackProgress()
                    }, vjs.MediaTechController.prototype.manualProgressOff = function() {
                        this.manualProgress = !1, this.stopTrackingProgress()
                    }, vjs.MediaTechController.prototype.trackProgress = function() {
                        this.progressInterval = this.setInterval(function() {
                            var c = this.player().bufferedPercent();
                            this.bufferedPercent_ != c && this.player().trigger("progress"), this.bufferedPercent_ = c, 1 === c && this.stopTrackingProgress()
                        }, 500)
                    }, vjs.MediaTechController.prototype.stopTrackingProgress = function() {
                        this.clearInterval(this.progressInterval)
                    },
                            /*! Time Tracking -------------------------------------------------------------- */
                            vjs.MediaTechController.prototype.manualTimeUpdatesOn = function() {
                                var c = this.player_;
                                this.manualTimeUpdates = !0, this.on(c, "play", this.trackCurrentTime), this.on(c, "pause", this.stopTrackingCurrentTime), this.one("timeupdate", function() {
                                    this.featuresTimeupdateEvents = !0, this.manualTimeUpdatesOff()
                                })
                            }, vjs.MediaTechController.prototype.manualTimeUpdatesOff = function() {
                        var c = this.player_;
                        this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off(c, "play", this.trackCurrentTime), this.off(c, "pause", this.stopTrackingCurrentTime)
                    }, vjs.MediaTechController.prototype.trackCurrentTime = function() {
                        this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = this.setInterval(function() {
                            this.player().trigger("timeupdate")
                        }, 250)
                    }, vjs.MediaTechController.prototype.stopTrackingCurrentTime = function() {
                        this.clearInterval(this.currentTimeInterval), this.player().trigger("timeupdate")
                    }, vjs.MediaTechController.prototype.dispose = function() {
                        this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), vjs.Component.prototype.dispose.call(this)
                    }, vjs.MediaTechController.prototype.setCurrentTime = function() {
                        this.manualTimeUpdates && this.player().trigger("timeupdate")
                    }, vjs.MediaTechController.prototype.initTextTrackListeners = function() {
                        var e, d = this.player_, f = function() {
                            var c = d.getChild("textTrackDisplay");
                            c && c.updateDisplay()
                        };
                        e = this.textTracks(), e && (e.addEventListener("removetrack", f), e.addEventListener("addtrack", f), this.on("dispose", vjs.bind(this, function() {
                            e.removeEventListener("removetrack", f), e.removeEventListener("addtrack", f)
                        })))
                    }, vjs.MediaTechController.prototype.emulateTextTracks = function() {
                        var f, e, h, g = this.player_;
                        window.WebVTT || (h = document.createElement("script"), h.src = g.options()["vtt.js"] || "../node_modules/vtt.js/dist/vtt.js", g.el().appendChild(h), window.WebVTT = !0), e = this.textTracks(), e && (f = function() {
                            var i, d, j;
                            for (j = g.getChild("textTrackDisplay"), j.updateDisplay(), i = 0;
                                    i < this.length;
                                    i++) {
                                d = this[i], d.removeEventListener("cuechange", vjs.bind(j, j.updateDisplay)), "showing" === d.mode && d.addEventListener("cuechange", vjs.bind(j, j.updateDisplay))
                            }
                        }, e.addEventListener("change", f), this.on("dispose", vjs.bind(this, function() {
                            e.removeEventListener("change", f)
                        })))
                    }, vjs.MediaTechController.prototype.textTracks_, vjs.MediaTechController.prototype.textTracks = function() {
                        return this.player_.textTracks_ = this.player_.textTracks_ || new vjs.TextTrackList, this.player_.textTracks_
                    }, vjs.MediaTechController.prototype.remoteTextTracks = function() {
                        return this.player_.remoteTextTracks_ = this.player_.remoteTextTracks_ || new vjs.TextTrackList, this.player_.remoteTextTracks_
                    }, b = function(i, h, n, m, l) {
                        var k, j = i.textTracks();
                        return l = l || {}, l.kind = h, n && (l.label = n), m && (l.language = m), l.player = i.player_, k = new vjs.TextTrack(l), j.addTrack_(k), k
                    }, vjs.MediaTechController.prototype.addTextTrack = function(a, f, e) {
                        if (!a) {
                            throw new Error("TextTrack kind is required but was not provided")
                        }
                        return b(this, a, f, e)
                    }, vjs.MediaTechController.prototype.addRemoteTextTrack = function(a) {
                        var d = b(this, a.kind, a.label, a.language, a);
                        return this.remoteTextTracks().addTrack_(d), {track: d}
                    }, vjs.MediaTechController.prototype.removeRemoteTextTrack = function(c) {
                        this.textTracks().removeTrack_(c), this.remoteTextTracks().removeTrack_(c)
                    }, vjs.MediaTechController.prototype.setPoster = function() {
                    }, vjs.MediaTechController.prototype.featuresVolumeControl = !0, vjs.MediaTechController.prototype.featuresFullscreenResize = !1, vjs.MediaTechController.prototype.featuresPlaybackRate = !1, vjs.MediaTechController.prototype.featuresProgressEvents = !1, vjs.MediaTechController.prototype.featuresTimeupdateEvents = !1, vjs.MediaTechController.prototype.featuresNativeTextTracks = !1, vjs.MediaTechController.withSourceHandlers = function(c) {
                        c.registerSourceHandler = function(a, f) {
                            var e = c.sourceHandlers;
                            e || (e = c.sourceHandlers = []), void 0 === f && (f = e.length), e.splice(f, 0, a)
                        }, c.selectSourceHandler = function(a) {
                            for (var h, g = c.sourceHandlers || [], f = 0;
                                    f < g.length;
                                    f++) {
                                if (h = g[f].canHandleSource(a)) {
                                    return g[f]
                                }
                            }
                            return null
                        }, c.canPlaySource = function(a) {
                            var d = c.selectSourceHandler(a);
                            return d ? d.canHandleSource(a) : ""
                        }, c.prototype.setSource = function(a) {
                            var d = c.selectSourceHandler(a);
                            return d || (c.nativeSourceHandler ? d = c.nativeSourceHandler : vjs.log.error("No source hander found for the current source.")), this.disposeSourceHandler(), this.off("dispose", this.disposeSourceHandler), this.currentSource_ = a, this.sourceHandler_ = d.handleSource(a, this), this.on("dispose", this.disposeSourceHandler), this
                        }, c.prototype.disposeSourceHandler = function() {
                            this.sourceHandler_ && this.sourceHandler_.dispose && this.sourceHandler_.dispose()
                        }
                    }, vjs.media = {}
                }(), vjs.Html5 = vjs.MediaTechController.extend({init: function(t, s, r) {
                        var q, p, o, n, m, l;
                        (s.nativeCaptions === !1 || s.nativeTextTracks === !1) && (this.featuresNativeTextTracks = !1), vjs.MediaTechController.call(this, t, s, r), this.setupTriggers();
                        var k = s.source;
                        if (k && (this.el_.currentSrc !== k.src || t.tag && 3 === t.tag.initNetworkState_) && this.setSource(k), this.el_.hasChildNodes()) {
                            for (q = this.el_.childNodes, p = q.length, l = [];
                                    p--;
                                    ) {
                                n = q[p], m = n.nodeName.toLowerCase(), "track" === m && (this.featuresNativeTextTracks ? this.remoteTextTracks().addTrack_(n.track) : l.push(n))
                            }
                            for (o = 0;
                                    o < l.length;
                                    o++) {
                                this.el_.removeChild(l[o])
                            }
                        }
                        this.featuresNativeTextTracks && this.on("loadstart", vjs.bind(this, this.hideCaptions)), vjs.TOUCH_ENABLED && t.options().nativeControlsForTouch === !0 && this.useNativeControls(), t.ready(function() {
                            this.tag && this.options_.autoplay && this.paused() && (delete this.tag.poster, this.play())
                        }), this.triggerReady()
                    }}), vjs.Html5.prototype.dispose = function() {
                    vjs.Html5.disposeMediaElement(this.el_), vjs.MediaTechController.prototype.dispose.call(this)
                }, vjs.Html5.prototype.createEl = function() {
                    var t, s, r, q, p, o = this.player_, n = o.tag;
                    if (!n || this.movingMediaElementInDOM === !1) {
                        if (n ? (p = n.cloneNode(!1), vjs.Html5.disposeMediaElement(n), n = p, o.tag = null) : (n = vjs.createEl("video"), q = videojs.util.mergeOptions({}, o.tagAttributes), vjs.TOUCH_ENABLED && o.options().nativeControlsForTouch === !0 || delete q.controls, vjs.setElementAttributes(n, vjs.obj.merge(q, {id: o.id() + "_html5_api", "class": "vjs-tech"}))), n.player = o, o.options_.tracks) {
                            for (r = 0;
                                    r < o.options_.tracks.length;
                                    r++) {
                                t = o.options_.tracks[r], s = document.createElement("track"), s.kind = t.kind, s.label = t.label, s.srclang = t.srclang, s.src = t.src, "default" in t && s.setAttribute("default", "default"), n.appendChild(s)
                            }
                        }
                        vjs.insertFirst(n, o.el())
                    }
                    var m = ["autoplay", "preload", "loop", "muted"];
                    for (r = m.length - 1;
                            r >= 0;
                            r--) {
                        var l = m[r], k = {};
                        "undefined" != typeof o.options_[l] && (k[l] = o.options_[l]), vjs.setElementAttributes(n, k)
                    }
                    return n
                }, vjs.Html5.prototype.hideCaptions = function() {
                    for (var f, e = this.el_.querySelectorAll("track"), h = e.length, g = {captions: 1, subtitles: 1};
                            h--;
                            ) {
                        f = e[h].track, f && f.kind in g && !e[h]["default"] && (f.mode = "disabled")
                    }
                }, vjs.Html5.prototype.setupTriggers = function() {
                    for (var b = vjs.Html5.Events.length - 1;
                            b >= 0;
                            b--) {
                        this.on(vjs.Html5.Events[b], this.eventHandler)
                    }
                }, vjs.Html5.prototype.eventHandler = function(b) {
                    "error" == b.type && this.error() ? this.player().error(this.error().code) : (b.bubbles = !1, this.player().trigger(b))
                }, vjs.Html5.prototype.useNativeControls = function() {
                    var g, f, j, i, h;
                    g = this, f = this.player(), g.setControls(f.controls()), j = function() {
                        g.setControls(!0)
                    }, i = function() {
                        g.setControls(!1)
                    }, f.on("controlsenabled", j), f.on("controlsdisabled", i), h = function() {
                        f.off("controlsenabled", j), f.off("controlsdisabled", i)
                    }, g.on("dispose", h), f.on("usingcustomcontrols", h), f.usingNativeControls(!0)
                }, vjs.Html5.prototype.play = function() {
                    this.el_.play()
                }, vjs.Html5.prototype.pause = function() {
                    this.el_.pause()
                }, vjs.Html5.prototype.paused = function() {
                    return this.el_.paused
                }, vjs.Html5.prototype.currentTime = function() {
                    return this.el_.currentTime
                }, vjs.Html5.prototype.setCurrentTime = function(d) {
                    try {
                        this.el_.currentTime = d
                    } catch (c) {
                        vjs.log(c, "Video is not ready. (Video.js)")
                    }
                }, vjs.Html5.prototype.duration = function() {
                    return this.el_.duration || 0
                }, vjs.Html5.prototype.buffered = function() {
                    return this.el_.buffered
                }, vjs.Html5.prototype.volume = function() {
                    return this.el_.volume
                }, vjs.Html5.prototype.setVolume = function(b) {
                    this.el_.volume = b
                }, vjs.Html5.prototype.muted = function() {
                    return this.el_.muted
                }, vjs.Html5.prototype.setMuted = function(b) {
                    this.el_.muted = b
                }, vjs.Html5.prototype.width = function() {
                    return this.el_.offsetWidth
                }, vjs.Html5.prototype.height = function() {
                    return this.el_.offsetHeight
                }, vjs.Html5.prototype.supportsFullScreen = function() {
                    return"function" != typeof this.el_.webkitEnterFullScreen || !/Android/.test(vjs.USER_AGENT) && /Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT) ? !1 : !0
                }, vjs.Html5.prototype.enterFullScreen = function() {
                    var b = this.el_;
                    "webkitDisplayingFullscreen" in b && this.one("webkitbeginfullscreen", function() {
                        this.player_.isFullscreen(!0), this.one("webkitendfullscreen", function() {
                            this.player_.isFullscreen(!1), this.player_.trigger("fullscreenchange")
                        }), this.player_.trigger("fullscreenchange")
                    }), b.paused && b.networkState <= b.HAVE_METADATA ? (this.el_.play(), this.setTimeout(function() {
                        b.pause(), b.webkitEnterFullScreen()
                    }, 0)) : b.webkitEnterFullScreen()
                }, vjs.Html5.prototype.exitFullScreen = function() {
                    this.el_.webkitExitFullScreen()
                }, vjs.Html5.prototype.src = function(b) {
                    return void 0 === b ? this.el_.src : void this.setSrc(b)
                }, vjs.Html5.prototype.setSrc = function(b) {
                    this.el_.src = b
                }, vjs.Html5.prototype.load = function() {
                    this.el_.load()
                }, vjs.Html5.prototype.currentSrc = function() {
                    return this.el_.currentSrc
                }, vjs.Html5.prototype.poster = function() {
                    return this.el_.poster
                }, vjs.Html5.prototype.setPoster = function(b) {
                    this.el_.poster = b
                }, vjs.Html5.prototype.preload = function() {
                    return this.el_.preload
                }, vjs.Html5.prototype.setPreload = function(b) {
                    this.el_.preload = b
                }, vjs.Html5.prototype.autoplay = function() {
                    return this.el_.autoplay
                }, vjs.Html5.prototype.setAutoplay = function(b) {
                    this.el_.autoplay = b
                }, vjs.Html5.prototype.controls = function() {
                    return this.el_.controls
                }, vjs.Html5.prototype.setControls = function(b) {
                    this.el_.controls = !!b
                }, vjs.Html5.prototype.loop = function() {
                    return this.el_.loop
                }, vjs.Html5.prototype.setLoop = function(b) {
                    this.el_.loop = b
                }, vjs.Html5.prototype.error = function() {
                    return this.el_.error
                }, vjs.Html5.prototype.seeking = function() {
                    return this.el_.seeking
                }, vjs.Html5.prototype.ended = function() {
                    return this.el_.ended
                }, vjs.Html5.prototype.defaultMuted = function() {
                    return this.el_.defaultMuted
                }, vjs.Html5.prototype.playbackRate = function() {
                    return this.el_.playbackRate
                }, vjs.Html5.prototype.setPlaybackRate = function(b) {
                    this.el_.playbackRate = b
                }, vjs.Html5.prototype.networkState = function() {
                    return this.el_.networkState
                }, vjs.Html5.prototype.readyState = function() {
                    return this.el_.readyState
                }, vjs.Html5.prototype.textTracks = function() {
                    return this.featuresNativeTextTracks ? this.el_.textTracks : vjs.MediaTechController.prototype.textTracks.call(this)
                }, vjs.Html5.prototype.addTextTrack = function(e, d, f) {
                    return this.featuresNativeTextTracks ? this.el_.addTextTrack(e, d, f) : vjs.MediaTechController.prototype.addTextTrack.call(this, e, d, f)
                }, vjs.Html5.prototype.addRemoteTextTrack = function(d) {
                    if (!this.featuresNativeTextTracks) {
                        return vjs.MediaTechController.prototype.addRemoteTextTrack.call(this, d)
                    }
                    var c = document.createElement("track");
                    return d = d || {}, d.kind && (c.kind = d.kind), d.label && (c.label = d.label), (d.language || d.srclang) && (c.srclang = d.language || d.srclang), d["default"] && (c["default"] = d["default"]), d.id && (c.id = d.id), d.src && (c.src = d.src), this.el().appendChild(c), c.track.mode = "metadata" === c.track.kind ? "hidden" : "disabled", c.onload = function() {
                        var b = c.track;
                        c.readyState >= 2 && ("metadata" === b.kind && "hidden" !== b.mode ? b.mode = "hidden" : "metadata" !== b.kind && "disabled" !== b.mode && (b.mode = "disabled"), c.onload = null)
                    }, this.remoteTextTracks().addTrack_(c.track), c
                }, vjs.Html5.prototype.removeRemoteTextTrack = function(e) {
                    if (!this.featuresNativeTextTracks) {
                        return vjs.MediaTechController.prototype.removeRemoteTextTrack.call(this, e)
                    }
                    var d, f;
                    for (this.remoteTextTracks().removeTrack_(e), d = this.el().querySelectorAll("track"), f = 0;
                            f < d.length;
                            f++) {
                        if (d[f] === e || d[f].track === e) {
                            d[f].parentNode.removeChild(d[f]);
                            break
                        }
                    }
                }, vjs.Html5.isSupported = function() {
                    try {
                        vjs.TEST_VID.volume = 0.5
                    } catch (b) {
                        return !1
                    }
                    return !!vjs.TEST_VID.canPlayType
                }, vjs.MediaTechController.withSourceHandlers(vjs.Html5), vjs.Html5.nativeSourceHandler = {}, vjs.Html5.nativeSourceHandler.canHandleSource = function(f) {
                    function e(d) {
                        try {
                            return vjs.TEST_VID.canPlayType(d)
                        } catch (c) {
                            return""
                        }
                    }
                    var h, g;
                    return f.type ? e(f.type) : f.src ? (h = f.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i), g = h && h[1], e("video/" + g)) : ""
                }, vjs.Html5.nativeSourceHandler.handleSource = function(d, c) {
                    c.setSrc(d.src)
                }, vjs.Html5.nativeSourceHandler.dispose = function() {
                }, vjs.Html5.registerSourceHandler(vjs.Html5.nativeSourceHandler), vjs.Html5.canControlVolume = function() {
                    var b = vjs.TEST_VID.volume;
                    return vjs.TEST_VID.volume = b / 2 + 0.1, b !== vjs.TEST_VID.volume
                }, vjs.Html5.canControlPlaybackRate = function() {
                    var b = vjs.TEST_VID.playbackRate;
                    return vjs.TEST_VID.playbackRate = b / 2 + 0.1, b !== vjs.TEST_VID.playbackRate
                }, vjs.Html5.supportsNativeTextTracks = function() {
                    var b;
                    return b = !!vjs.TEST_VID.textTracks, b && vjs.TEST_VID.textTracks.length > 0 && (b = "number" != typeof vjs.TEST_VID.textTracks[0].mode), b && vjs.IS_FIREFOX && (b = !1), b
                }, vjs.Html5.prototype.featuresVolumeControl = vjs.Html5.canControlVolume(), vjs.Html5.prototype.featuresPlaybackRate = vjs.Html5.canControlPlaybackRate(), vjs.Html5.prototype.movingMediaElementInDOM = !vjs.IS_IOS, vjs.Html5.prototype.featuresFullscreenResize = !0, vjs.Html5.prototype.featuresProgressEvents = !0, vjs.Html5.prototype.featuresNativeTextTracks = vjs.Html5.supportsNativeTextTracks(), function() {
                    var e, d = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, f = /^video\/mp4/i;
                    vjs.Html5.patchCanPlayType = function() {
                        vjs.ANDROID_VERSION >= 4 && (e || (e = vjs.TEST_VID.constructor.prototype.canPlayType), vjs.TEST_VID.constructor.prototype.canPlayType = function(a) {
                            return a && d.test(a) ? "maybe" : e.call(this, a)
                        }), vjs.IS_OLD_ANDROID && (e || (e = vjs.TEST_VID.constructor.prototype.canPlayType), vjs.TEST_VID.constructor.prototype.canPlayType = function(a) {
                            return a && f.test(a) ? "maybe" : e.call(this, a)
                        })
                    }, vjs.Html5.unpatchCanPlayType = function() {
                        var a = vjs.TEST_VID.constructor.prototype.canPlayType;
                        return vjs.TEST_VID.constructor.prototype.canPlayType = e, e = null, a
                    }, vjs.Html5.patchCanPlayType()
                }(), vjs.Html5.Events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","), vjs.Html5.disposeMediaElement = function(b) {
                    if (b) {
                        for (b.player = null, b.parentNode && b.parentNode.removeChild(b);
                                b.hasChildNodes();
                                ) {
                            b.removeChild(b.firstChild)
                        }
                        b.removeAttribute("src"), "function" == typeof b.load && !function() {
                            try {
                                b.load()
                            } catch (a) {
                            }
                        }()
                    }
                }, vjs.Flash = vjs.MediaTechController.extend({init: function(v, u, t) {
                        vjs.MediaTechController.call(this, v, u, t);
                        var s = u.source, r = u.parentEl, q = this.el_ = vjs.createEl("div", {id: v.id() + "_temp_flash"}), p = v.id() + "_flash_api", o = v.options_, n = vjs.obj.merge({readyFunction: "videojs.Flash.onReady", eventProxyFunction: "videojs.Flash.onEvent", errorEventProxyFunction: "videojs.Flash.onError", autoplay: o.autoplay, preload: o.preload, loop: o.loop, muted: o.muted}, u.flashVars), m = vjs.obj.merge({wmode: "opaque", bgcolor: "#000000"}, u.params), l = vjs.obj.merge({id: p, name: p, "class": "vjs-tech"}, u.attributes);
                        s && this.ready(function() {
                            this.setSource(s)
                        }), vjs.insertFirst(q, r), u.startTime && this.ready(function() {
                            this.load(), this.play(), this.currentTime(u.startTime)
                        }), vjs.IS_FIREFOX && this.ready(function() {
                            this.on("mousemove", function() {
                                this.player().trigger({type: "mousemove", bubbles: !1})
                            })
                        }), v.on("stageclick", v.reportUserActivity), this.el_ = vjs.Flash.embed(u.swf, q, n, m, l)
                    }}), vjs.Flash.prototype.dispose = function() {
                    vjs.MediaTechController.prototype.dispose.call(this)
                }, vjs.Flash.prototype.play = function() {
                    this.el_.vjs_play()
                }, vjs.Flash.prototype.pause = function() {
                    this.el_.vjs_pause()
                }, vjs.Flash.prototype.src = function(b) {
                    return void 0 === b ? this.currentSrc() : this.setSrc(b)
                }, vjs.Flash.prototype.setSrc = function(d) {
                    if (d = vjs.getAbsoluteURL(d), this.el_.vjs_src(d), this.player_.autoplay()) {
                        var c = this;
                        this.setTimeout(function() {
                            c.play()
                        }, 0)
                    }
                }, vjs.Flash.prototype.setCurrentTime = function(b) {
                    this.lastSeekTarget_ = b, this.el_.vjs_setProperty("currentTime", b), vjs.MediaTechController.prototype.setCurrentTime.call(this)
                }, vjs.Flash.prototype.currentTime = function() {
                    return this.seeking() ? this.lastSeekTarget_ || 0 : this.el_.vjs_getProperty("currentTime")
                }, vjs.Flash.prototype.currentSrc = function() {
                    return this.currentSource_ ? this.currentSource_.src : this.el_.vjs_getProperty("currentSrc")
                }, vjs.Flash.prototype.load = function() {
                    this.el_.vjs_load()
                }, vjs.Flash.prototype.poster = function() {
                    this.el_.vjs_getProperty("poster")
                }, vjs.Flash.prototype.setPoster = function() {
                }, vjs.Flash.prototype.buffered = function() {
                    return vjs.createTimeRange(0, this.el_.vjs_getProperty("buffered"))
                }, vjs.Flash.prototype.supportsFullScreen = function() {
                    return !1
                }, vjs.Flash.prototype.enterFullScreen = function() {
                    return !1
                }, function() {
                    function h(d) {
                        var c = d.charAt(0).toUpperCase() + d.slice(1);
                        k["set" + c] = function(a) {
                            return this.el_.vjs_setProperty(d, a)
                        }
                    }
                    function g(b) {
                        k[b] = function() {
                            return this.el_.vjs_getProperty(b)
                        }
                    }
                    var l, k = vjs.Flash.prototype, j = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), i = "error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight".split(",");
                    for (l = 0;
                            l < j.length;
                            l++) {
                        g(j[l]), h(j[l])
                    }
                    for (l = 0;
                            l < i.length;
                            l++) {
                        g(i[l])
                    }
                }(), vjs.Flash.isSupported = function() {
                    return vjs.Flash.version()[0] >= 10
                }, vjs.MediaTechController.withSourceHandlers(vjs.Flash), vjs.Flash.nativeSourceHandler = {}, vjs.Flash.nativeSourceHandler.canHandleSource = function(d) {
                    var c;
                    return d.type ? (c = d.type.replace(/;.*/, "").toLowerCase(), c in vjs.Flash.formats ? "maybe" : "") : ""
                }, vjs.Flash.nativeSourceHandler.handleSource = function(d, c) {
                    c.setSrc(d.src)
                }, vjs.Flash.nativeSourceHandler.dispose = function() {
                }, vjs.Flash.registerSourceHandler(vjs.Flash.nativeSourceHandler), vjs.Flash.formats = {"video/flv": "FLV", "video/x-flv": "FLV", "video/mp4": "MP4", "video/m4v": "MP4"}, vjs.Flash.onReady = function(e) {
                    var d, f;
                    d = vjs.el(e), f = d && d.parentNode && d.parentNode.player, f && (d.player = f, vjs.Flash.checkReady(f.tech))
                }, vjs.Flash.checkReady = function(b) {
                    b.el() && (b.el().vjs_getProperty ? b.triggerReady() : this.setTimeout(function() {
                        vjs.Flash.checkReady(b)
                    }, 50))
                }, vjs.Flash.onEvent = function(e, d) {
                    var f = vjs.el(e).player;
                    f.trigger(d)
                }, vjs.Flash.onError = function(f, e) {
                    var h = vjs.el(f).player, g = "FLASH: " + e;
                    h.error("srcnotfound" == e ? {code: 4, message: g} : g)
                }, vjs.Flash.version = function() {
                    var e = "0,0,0";
                    try {
                        e = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                    } catch (d) {
                        try {
                            navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (e = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
                        } catch (f) {
                        }
                    }
                    return e.split(",")
                }, vjs.Flash.embed = function(r, q, p, o, n) {
                    var m = vjs.Flash.getEmbedCode(r, p, o, n), l = vjs.createEl("div", {innerHTML: m}).childNodes[0], k = q.parentNode;
                    q.parentNode.replaceChild(l, q);
                    var j = k.childNodes[0];
                    return setTimeout(function() {
                        j.style.display = "block"
                    }, 1000), l
                }, vjs.Flash.getEmbedCode = function(j, i, p, o) {
                    var n = '<object type="application/x-shockwave-flash" ', m = "", l = "", k = "";
                    return i && vjs.obj.each(i, function(d, c) {
                        m += d + "=" + c + "&amp;"
                    }), p = vjs.obj.merge({movie: j, flashvars: m, allowScriptAccess: "always", allowNetworking: "all"}, p), vjs.obj.each(p, function(d, c) {
                        l += '<param name="' + d + '" value="' + c + '" />'
                    }), o = vjs.obj.merge({data: j, width: "100%", height: "100%"}, o), vjs.obj.each(o, function(d, c) {
                        k += d + '="' + c + '" '
                    }), n + k + ">" + l + "</object>"
                }, vjs.Flash.streamingFormats = {"rtmp/mp4": "MP4", "rtmp/flv": "FLV"}, vjs.Flash.streamFromParts = function(d, c) {
                    return d + "&" + c
                }, vjs.Flash.streamToParts = function(f) {
                    var e = {connection: "", stream: ""};
                    if (!f) {
                        return e
                    }
                    var h, g = f.indexOf("&");
                    return -1 !== g ? h = g + 1 : (g = h = f.lastIndexOf("/") + 1, 0 === g && (g = h = f.length)), e.connection = f.substring(0, g), e.stream = f.substring(h, f.length), e
                }, vjs.Flash.isStreamingType = function(b) {
                    return b in vjs.Flash.streamingFormats
                }, vjs.Flash.RTMP_RE = /^rtmp[set]?:\/\//i, vjs.Flash.isStreamingSrc = function(b) {
                    return vjs.Flash.RTMP_RE.test(b)
                }, vjs.Flash.rtmpSourceHandler = {}, vjs.Flash.rtmpSourceHandler.canHandleSource = function(b) {
                    return vjs.Flash.isStreamingType(b.type) || vjs.Flash.isStreamingSrc(b.src) ? "maybe" : ""
                }, vjs.Flash.rtmpSourceHandler.handleSource = function(e, d) {
                    var f = vjs.Flash.streamToParts(e.src);
                    d.setRtmpConnection(f.connection), d.setRtmpStream(f.stream)
                }, vjs.Flash.registerSourceHandler(vjs.Flash.rtmpSourceHandler), vjs.MediaLoader = vjs.Component.extend({init: function(i, h, n) {
                        if (vjs.Component.call(this, i, h, n), i.options_.sources && 0 !== i.options_.sources.length) {
                            i.src(i.options_.sources)
                        } else {
                            for (var m = 0, l = i.options_.techOrder;
                                    m < l.length;
                                    m++) {
                                var k = vjs.capitalize(l[m]), j = window.videojs[k];
                                if (j && j.isSupported()) {
                                    i.loadTech(k);
                                    break
                                }
                            }
                        }
                    }}), vjs.TextTrackMode = {disabled: "disabled", hidden: "hidden", showing: "showing"}, vjs.TextTrackKind = {subtitles: "subtitles", captions: "captions", descriptions: "descriptions", chapters: "chapters", metadata: "metadata"}, function() {
                    vjs.TextTrack = function(x) {
                        var w, v, u, t, s, r, q, p, o, c, a;
                        if (x = x || {}, !x.player) {
                            throw new Error("A player was not provided.")
                        }
                        if (w = this, vjs.IS_IE8) {
                            w = document.createElement("custom");
                            for (a in vjs.TextTrack.prototype) {
                                w[a] = vjs.TextTrack.prototype[a]
                            }
                        }
                        return w.player_ = x.player, u = vjs.TextTrackMode[x.mode] || "disabled", t = vjs.TextTrackKind[x.kind] || "subtitles", s = x.label || "", r = x.language || x.srclang || "", v = x.id || "vjs_text_track_" + vjs.guid++, ("metadata" === t || "chapters" === t) && (u = "hidden"), w.cues_ = [], w.activeCues_ = [], q = new vjs.TextTrackCueList(w.cues_), p = new vjs.TextTrackCueList(w.activeCues_), c = !1, o = vjs.bind(w, function() {
                            this.activeCues, c && (this.trigger("cuechange"), c = !1)
                        }), "disabled" !== u && w.player_.on("timeupdate", o), Object.defineProperty(w, "kind", {get: function() {
                                return t
                            }, set: Function.prototype}), Object.defineProperty(w, "label", {get: function() {
                                return s
                            }, set: Function.prototype}), Object.defineProperty(w, "language", {get: function() {
                                return r
                            }, set: Function.prototype}), Object.defineProperty(w, "id", {get: function() {
                                return v
                            }, set: Function.prototype}), Object.defineProperty(w, "mode", {get: function() {
                                return u
                            }, set: function(b) {
                                vjs.TextTrackMode[b] && (u = b, "showing" === u && this.player_.on("timeupdate", o), this.trigger("modechange"))
                            }}), Object.defineProperty(w, "cues", {get: function() {
                                return this.loaded_ ? q : null
                            }, set: Function.prototype}), Object.defineProperty(w, "activeCues", {get: function() {
                                var h, g, k, j, i;
                                if (!this.loaded_) {
                                    return null
                                }
                                if (0 === this.cues.length) {
                                    return p
                                }
                                for (j = this.player_.currentTime(), h = 0, g = this.cues.length, k = [];
                                        g > h;
                                        h++) {
                                    i = this.cues[h], i.startTime <= j && i.endTime >= j ? k.push(i) : i.startTime === i.endTime && i.startTime <= j && i.startTime + 0.5 >= j && k.push(i)
                                }
                                if (c = !1, k.length !== this.activeCues_.length) {
                                    c = !0
                                } else {
                                    for (h = 0;
                                            h < k.length;
                                            h++) {
                                        -1 === f.call(this.activeCues_, k[h]) && (c = !0)
                                    }
                                }
                                return this.activeCues_ = k, p.setCues_(this.activeCues_), p
                            }, set: Function.prototype}), x.src ? e(x.src, w) : w.loaded_ = !0, vjs.IS_IE8 ? w : void 0
                    }, vjs.TextTrack.prototype = vjs.obj.create(vjs.EventEmitter.prototype), vjs.TextTrack.prototype.constructor = vjs.TextTrack, vjs.TextTrack.prototype.allowedEvents_ = {cuechange: "cuechange"}, vjs.TextTrack.prototype.addCue = function(h) {
                        var g = this.player_.textTracks(), i = 0;
                        if (g) {
                            for (;
                                    i < g.length;
                                    i++) {
                                g[i] !== this && g[i].removeCue(h)
                            }
                        }
                        this.cues_.push(h), this.cues.setCues_(this.cues_)
                    }, vjs.TextTrack.prototype.removeCue = function(h) {
                        for (var g, k = 0, j = this.cues_.length, i = !1;
                                j > k;
                                k++) {
                            g = this.cues_[k], g === h && (this.cues_.splice(k, 1), i = !0)
                        }
                        i && this.cues.setCues_(this.cues_)
                    };
                    var e, d, f;
                    e = function(b, g) {
                        vjs.xhr(b, vjs.bind(this, function(c, i, h) {
                            return c ? vjs.log.error(c) : (g.loaded_ = !0, void d(h, g))
                        }))
                    }, d = function(b, h) {
                        if ("function" != typeof window.WebVTT) {
                            return window.setTimeout(function() {
                                d(b, h)
                            }, 25)
                        }
                        var g = new window.WebVTT.Parser(window, window.vttjs, window.WebVTT.StringDecoder());
                        g.oncue = function(c) {
                            h.addCue(c)
                        }, g.onparsingerror = function(c) {
                            vjs.log.error(c)
                        }, g.parse(b), g.flush()
                    }, f = function(h, g) {
                        var l;
                        if (null == this) {
                            throw new TypeError('"this" is null or not defined')
                        }
                        var k = Object(this), j = k.length >>> 0;
                        if (0 === j) {
                            return -1
                        }
                        var i = +g || 0;
                        if (Math.abs(i) === 1 / 0 && (i = 0), i >= j) {
                            return -1
                        }
                        for (l = Math.max(i >= 0 ? i : j - Math.abs(i), 0);
                                j > l;
                                ) {
                            if (l in k && k[l] === h) {
                                return l
                            }
                            l++
                        }
                        return -1
                    }
                }(), vjs.TextTrackList = function(f) {
                    var e, h = this, g = 0;
                    if (vjs.IS_IE8) {
                        h = document.createElement("custom");
                        for (e in vjs.TextTrackList.prototype) {
                            h[e] = vjs.TextTrackList.prototype[e]
                        }
                    }
                    for (f = f || [], h.tracks_ = [], Object.defineProperty(h, "length", {get: function() {
                            return this.tracks_.length
                        }});
                            g < f.length;
                            g++) {
                        h.addTrack_(f[g])
                    }
                    return vjs.IS_IE8 ? h : void 0
                }, vjs.TextTrackList.prototype = vjs.obj.create(vjs.EventEmitter.prototype), vjs.TextTrackList.prototype.constructor = vjs.TextTrackList, vjs.TextTrackList.prototype.allowedEvents_ = {change: "change", addtrack: "addtrack", removetrack: "removetrack"}, function() {
                    var b;
                    for (b in vjs.TextTrackList.prototype.allowedEvents_) {
                        vjs.TextTrackList.prototype["on" + b] = null
                    }
                }(), vjs.TextTrackList.prototype.addTrack_ = function(d) {
                    var c = this.tracks_.length;
                    "" + c in this || Object.defineProperty(this, c, {get: function() {
                            return this.tracks_[c]
                        }}), d.addEventListener("modechange", vjs.bind(this, function() {
                        this.trigger("change")
                    })), this.tracks_.push(d), this.trigger({type: "addtrack", track: d})
                }, vjs.TextTrackList.prototype.removeTrack_ = function(f) {
                    for (var e, h = 0, g = this.length;
                            g > h;
                            h++) {
                        if (e = this[h], e === f) {
                            this.tracks_.splice(h, 1);
                            break
                        }
                    }
                    this.trigger({type: "removetrack", track: f})
                }, vjs.TextTrackList.prototype.getTrackById = function(g) {
                    for (var f, j = 0, i = this.length, h = null;
                            i > j;
                            j++) {
                        if (f = this[j], f.id === g) {
                            h = f;
                            break
                        }
                    }
                    return h
                }, vjs.TextTrackCueList = function(e) {
                    var d, f = this;
                    if (vjs.IS_IE8) {
                        f = document.createElement("custom");
                        for (d in vjs.TextTrackCueList.prototype) {
                            f[d] = vjs.TextTrackCueList.prototype[d]
                        }
                    }
                    return vjs.TextTrackCueList.prototype.setCues_.call(f, e), Object.defineProperty(f, "length", {get: function() {
                            return this.length_
                        }}), vjs.IS_IE8 ? f : void 0
                }, vjs.TextTrackCueList.prototype.setCues_ = function(g) {
                    var f, j = this.length || 0, i = 0, h = g.length;
                    if (this.cues_ = g, this.length_ = g.length, f = function(b) {
                        "" + b in this || Object.defineProperty(this, "" + b, {get: function() {
                                return this.cues_[b]
                            }})
                    }, h > j) {
                        for (i = j;
                                h > i;
                                i++) {
                            f.call(this, i)
                        }
                    }
                }, vjs.TextTrackCueList.prototype.getCueById = function(g) {
                    for (var f, j = 0, i = this.length, h = null;
                            i > j;
                            j++) {
                        if (f = this[j], f.id === g) {
                            h = f;
                            break
                        }
                    }
                    return h
                }, function() {
                    vjs.TextTrackDisplay = vjs.Component.extend({init: function(e, d, k) {
                            vjs.Component.call(this, e, d, k), e.on("loadstart", vjs.bind(this, this.toggleDisplay)), e.ready(vjs.bind(this, function() {
                                if (e.tech && e.tech.featuresNativeTextTracks) {
                                    return void this.hide()
                                }
                                var a, m, l;
                                for (e.on("fullscreenchange", vjs.bind(this, this.updateDisplay)), m = e.options_.tracks || [], a = 0;
                                        a < m.length;
                                        a++) {
                                    l = m[a], this.player_.addRemoteTextTrack(l)
                                }
                            }))
                        }}), vjs.TextTrackDisplay.prototype.toggleDisplay = function() {
                        this.player_.tech && this.player_.tech.featuresNativeTextTracks ? this.hide() : this.show()
                    }, vjs.TextTrackDisplay.prototype.createEl = function() {
                        return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-text-track-display"})
                    }, vjs.TextTrackDisplay.prototype.clearDisplay = function() {
                        "function" == typeof window.WebVTT && window.WebVTT.processCues(window, [], this.el_)
                    };
                    var g = function(d, c) {
                        return"rgba(" + parseInt(d[1] + d[1], 16) + "," + parseInt(d[2] + d[2], 16) + "," + parseInt(d[3] + d[3], 16) + "," + c + ")"
                    }, f = "#222", j = "#ccc", i = {monospace: "monospace", sansSerif: "sans-serif", serif: "serif", monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace', monospaceSerif: '"Courier New", monospace', proportionalSansSerif: "sans-serif", proportionalSerif: "serif", casual: '"Comic Sans MS", Impact, fantasy', script: '"Monotype Corsiva", cursive', smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'}, h = function(k, e, m) {
                        try {
                            k.style[e] = m
                        } catch (l) {
                        }
                    };
                    vjs.TextTrackDisplay.prototype.updateDisplay = function() {
                        var e, d = this.player_.textTracks(), k = 0;
                        if (this.clearDisplay(), d) {
                            for (;
                                    k < d.length;
                                    k++) {
                                e = d[k], "showing" === e.mode && this.updateForTrack(e)
                            }
                        }
                    }, vjs.TextTrackDisplay.prototype.updateForTrack = function(l) {
                        if ("function" == typeof window.WebVTT && l.activeCues) {
                            for (var e, d, c = 0, b = this.player_.textTrackSettings.getValues(), a = [];
                                    c < l.activeCues.length;
                                    c++) {
                                a.push(l.activeCues[c])
                            }
                            for (window.WebVTT.processCues(window, l.activeCues, this.el_), c = a.length;
                                    c--;
                                    ) {
                                e = a[c].displayState, b.color && (e.firstChild.style.color = b.color), b.textOpacity && h(e.firstChild, "color", g(b.color || "#fff", b.textOpacity)), b.backgroundColor && (e.firstChild.style.backgroundColor = b.backgroundColor), b.backgroundOpacity && h(e.firstChild, "backgroundColor", g(b.backgroundColor || "#000", b.backgroundOpacity)), b.windowColor && (b.windowOpacity ? h(e, "backgroundColor", g(b.windowColor, b.windowOpacity)) : e.style.backgroundColor = b.windowColor), b.edgeStyle && ("dropshadow" === b.edgeStyle ? e.firstChild.style.textShadow = "2px 2px 3px " + f + ", 2px 2px 4px " + f + ", 2px 2px 5px " + f : "raised" === b.edgeStyle ? e.firstChild.style.textShadow = "1px 1px " + f + ", 2px 2px " + f + ", 3px 3px " + f : "depressed" === b.edgeStyle ? e.firstChild.style.textShadow = "1px 1px " + j + ", 0 1px " + j + ", -1px -1px " + f + ", 0 -1px " + f : "uniform" === b.edgeStyle && (e.firstChild.style.textShadow = "0 0 4px " + f + ", 0 0 4px " + f + ", 0 0 4px " + f + ", 0 0 4px " + f)), b.fontPercent && 1 !== b.fontPercent && (d = window.parseFloat(e.style.fontSize), e.style.fontSize = d * b.fontPercent + "px", e.style.height = "auto", e.style.top = "auto", e.style.bottom = "2px"), b.fontFamily && "default" !== b.fontFamily && ("small-caps" === b.fontFamily ? e.firstChild.style.fontVariant = "small-caps" : e.firstChild.style.fontFamily = i[b.fontFamily])
                            }
                        }
                    }, vjs.TextTrackMenuItem = vjs.MenuItem.extend({init: function(l, k) {
                            var p, o, n = this.track = k.track, m = l.textTracks();
                            m && (p = vjs.bind(this, function() {
                                var q, e, s, r = "showing" === this.track.mode;
                                if (this instanceof vjs.OffTextTrackMenuItem) {
                                    for (r = !0, e = 0, s = m.length;
                                            s > e;
                                            e++) {
                                        if (q = m[e], q.kind === this.track.kind && "showing" === q.mode) {
                                            r = !1;
                                            break
                                        }
                                    }
                                }
                                this.selected(r)
                            }), m.addEventListener("change", p), l.on("dispose", function() {
                                m.removeEventListener("change", p)
                            })), k.label = n.label || n.language || "Unknown", k.selected = n["default"] || "showing" === n.mode, vjs.MenuItem.call(this, l, k), m && void 0 === m.onchange && this.on(["tap", "click"], function() {
                                if ("object" != typeof window.Event) {
                                    try {
                                        o = new window.Event("change")
                                    } catch (b) {
                                    }
                                }
                                o || (o = document.createEvent("Event"), o.initEvent("change", !0, !0)), m.dispatchEvent(o)
                            })
                        }}), vjs.TextTrackMenuItem.prototype.onClick = function() {
                        var k, e = this.track.kind, m = this.player_.textTracks(), l = 0;
                        if (vjs.MenuItem.prototype.onClick.call(this), m) {
                            for (;
                                    l < m.length;
                                    l++) {
                                k = m[l], k.kind === e && (k.mode = k === this.track ? "showing" : "disabled")
                            }
                        }
                    }, vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({init: function(d, c) {
                            c.track = {kind: c.kind, player: d, label: c.kind + " off", "default": !1, mode: "disabled"}, vjs.TextTrackMenuItem.call(this, d, c), this.selected(!0)
                        }}), vjs.CaptionSettingsMenuItem = vjs.TextTrackMenuItem.extend({init: function(d, c) {
                            c.track = {kind: c.kind, player: d, label: c.kind + " settings", "default": !1, mode: "disabled"}, vjs.TextTrackMenuItem.call(this, d, c), this.addClass("vjs-texttrack-settings")
                        }}), vjs.CaptionSettingsMenuItem.prototype.onClick = function() {
                        this.player().getChild("textTrackSettings").show()
                    }, vjs.TextTrackButton = vjs.MenuButton.extend({init: function(k, e) {
                            var m, l;
                            vjs.MenuButton.call(this, k, e), m = this.player_.textTracks(), this.items.length <= 1 && this.hide(), m && (l = vjs.bind(this, this.update), m.addEventListener("removetrack", l), m.addEventListener("addtrack", l), this.player_.on("dispose", function() {
                                m.removeEventListener("removetrack", l), m.removeEventListener("addtrack", l)
                            }))
                        }}), vjs.TextTrackButton.prototype.createItems = function() {
                        var k, e, m = [];
                        if (!(this instanceof vjs.CaptionsButton) || this.player().tech && this.player().tech.featuresNativeTextTracks || m.push(new vjs.CaptionSettingsMenuItem(this.player_, {kind: this.kind_})), m.push(new vjs.OffTextTrackMenuItem(this.player_, {kind: this.kind_})), e = this.player_.textTracks(), !e) {
                            return m
                        }
                        for (var l = 0;
                                l < e.length;
                                l++) {
                            k = e[l], k.kind === this.kind_ && m.push(new vjs.TextTrackMenuItem(this.player_, {track: k}))
                        }
                        return m
                    }, vjs.CaptionsButton = vjs.TextTrackButton.extend({init: function(e, d, k) {
                            vjs.TextTrackButton.call(this, e, d, k), this.el_.setAttribute("aria-label", "Captions Menu")
                        }}), vjs.CaptionsButton.prototype.kind_ = "captions", vjs.CaptionsButton.prototype.buttonText = "Captions", vjs.CaptionsButton.prototype.className = "vjs-captions-button", vjs.CaptionsButton.prototype.update = function() {
                        var b = 2;
                        vjs.TextTrackButton.prototype.update.call(this), this.player().tech && this.player().tech.featuresNativeTextTracks && (b = 1), this.items && this.items.length > b ? this.show() : this.hide()
                    }, vjs.SubtitlesButton = vjs.TextTrackButton.extend({init: function(e, d, k) {
                            vjs.TextTrackButton.call(this, e, d, k), this.el_.setAttribute("aria-label", "Subtitles Menu")
                        }}), vjs.SubtitlesButton.prototype.kind_ = "subtitles", vjs.SubtitlesButton.prototype.buttonText = "Subtitles", vjs.SubtitlesButton.prototype.className = "vjs-subtitles-button", vjs.ChaptersButton = vjs.TextTrackButton.extend({init: function(e, d, k) {
                            vjs.TextTrackButton.call(this, e, d, k), this.el_.setAttribute("aria-label", "Chapters Menu")
                        }}), vjs.ChaptersButton.prototype.kind_ = "chapters", vjs.ChaptersButton.prototype.buttonText = "Chapters", vjs.ChaptersButton.prototype.className = "vjs-chapters-button", vjs.ChaptersButton.prototype.createItems = function() {
                        var k, e, m = [];
                        if (e = this.player_.textTracks(), !e) {
                            return m
                        }
                        for (var l = 0;
                                l < e.length;
                                l++) {
                            k = e[l], k.kind === this.kind_ && m.push(new vjs.TextTrackMenuItem(this.player_, {track: k}))
                        }
                        return m
                    }, vjs.ChaptersButton.prototype.createMenu = function() {
                        for (var t, s, r = this.player_.textTracks() || [], q = 0, p = r.length, o = this.items = [];
                                p > q;
                                q++) {
                            if (t = r[q], t.kind == this.kind_) {
                                if (t.cues) {
                                    s = t;
                                    break
                                }
                                t.mode = "hidden", window.setTimeout(vjs.bind(this, function() {
                                    this.createMenu()
                                }), 100)
                            }
                        }
                        var n = this.menu;
                        if (void 0 === n && (n = new vjs.Menu(this.player_), n.contentEl().appendChild(vjs.createEl("li", {className: "vjs-menu-title", innerHTML: vjs.capitalize(this.kind_), tabindex: -1}))), s) {
                            var m, l, k = s.cues;
                            for (q = 0, p = k.length;
                                    p > q;
                                    q++) {
                                m = k[q], l = new vjs.ChaptersTrackMenuItem(this.player_, {track: s, cue: m}), o.push(l), n.addChild(l)
                            }
                            this.addChild(n)
                        }
                        return this.items.length > 0 && this.show(), n
                    }, vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({init: function(l, k) {
                            var o = this.track = k.track, n = this.cue = k.cue, m = l.currentTime();
                            k.label = n.text, k.selected = n.startTime <= m && m < n.endTime, vjs.MenuItem.call(this, l, k), o.addEventListener("cuechange", vjs.bind(this, this.update))
                        }}), vjs.ChaptersTrackMenuItem.prototype.onClick = function() {
                        vjs.MenuItem.prototype.onClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime)
                    }, vjs.ChaptersTrackMenuItem.prototype.update = function() {
                        var d = this.cue, c = this.player_.currentTime();
                        this.selected(d.startTime <= c && c < d.endTime)
                    }
                }(), function() {
                    function e(g) {
                        var c;
                        return g.selectedOptions ? c = g.selectedOptions[0] : g.options && (c = g.options[g.options.selectedIndex]), c.value
                    }
                    function d(h, g) {
                        var j, i;
                        if (g) {
                            for (j = 0;
                                    j < h.options.length && (i = h.options[j], i.value !== g);
                                    j++) {
                            }
                            h.selectedIndex = j
                        }
                    }
                    function f() {
                        return'<div class="vjs-tracksettings"><div class="vjs-tracksettings-colors"><div class="vjs-fg-color vjs-tracksetting"><label class="vjs-label">Foreground</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-text-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Opaque</option></select></span></div><div class="vjs-bg-color vjs-tracksetting"><label class="vjs-label">Background</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-bg-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div><div class="window-color vjs-tracksetting"><label class="vjs-label">Window</label><select><option value="">---</option><option value="#FFF">White</option><option value="#000">Black</option><option value="#F00">Red</option><option value="#0F0">Green</option><option value="#00F">Blue</option><option value="#FF0">Yellow</option><option value="#F0F">Magenta</option><option value="#0FF">Cyan</option></select><span class="vjs-window-opacity vjs-opacity"><select><option value="">---</option><option value="1">Opaque</option><option value="0.5">Semi-Transparent</option><option value="0">Transparent</option></select></span></div></div><div class="vjs-tracksettings-font"><div class="vjs-font-percent vjs-tracksetting"><label class="vjs-label">Font Size</label><select><option value="0.50">50%</option><option value="0.75">75%</option><option value="1.00" selected>100%</option><option value="1.25">125%</option><option value="1.50">150%</option><option value="1.75">175%</option><option value="2.00">200%</option><option value="3.00">300%</option><option value="4.00">400%</option></select></div><div class="vjs-edge-style vjs-tracksetting"><label class="vjs-label">Text Edge Style</label><select><option value="none">None</option><option value="raised">Raised</option><option value="depressed">Depressed</option><option value="uniform">Uniform</option><option value="dropshadow">Dropshadow</option></select></div><div class="vjs-font-family vjs-tracksetting"><label class="vjs-label">Font Family</label><select><option value="">Default</option><option value="monospaceSerif">Monospace Serif</option><option value="proportionalSerif">Proportional Serif</option><option value="monospaceSansSerif">Monospace Sans-Serif</option><option value="proportionalSansSerif">Proportional Sans-Serif</option><option value="casual">Casual</option><option value="script">Script</option><option value="small-caps">Small Caps</option></select></div></div></div><div class="vjs-tracksettings-controls"><button class="vjs-default-button">Defaults</button><button class="vjs-done-button">Done</button></div>'
                    }
                    vjs.TextTrackSettings = vjs.Component.extend({init: function(g, c) {
                            vjs.Component.call(this, g, c), this.hide(), vjs.on(this.el().querySelector(".vjs-done-button"), "click", vjs.bind(this, function() {
                                this.saveSettings(), this.hide()
                            })), vjs.on(this.el().querySelector(".vjs-default-button"), "click", vjs.bind(this, function() {
                                this.el().querySelector(".vjs-fg-color > select").selectedIndex = 0, this.el().querySelector(".vjs-bg-color > select").selectedIndex = 0, this.el().querySelector(".window-color > select").selectedIndex = 0, this.el().querySelector(".vjs-text-opacity > select").selectedIndex = 0, this.el().querySelector(".vjs-bg-opacity > select").selectedIndex = 0, this.el().querySelector(".vjs-window-opacity > select").selectedIndex = 0, this.el().querySelector(".vjs-edge-style select").selectedIndex = 0, this.el().querySelector(".vjs-font-family select").selectedIndex = 0, this.el().querySelector(".vjs-font-percent select").selectedIndex = 2, this.updateDisplay()
                            })), vjs.on(this.el().querySelector(".vjs-fg-color > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-bg-color > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".window-color > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-text-opacity > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-bg-opacity > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-window-opacity > select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-font-percent select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-edge-style select"), "change", vjs.bind(this, this.updateDisplay)), vjs.on(this.el().querySelector(".vjs-font-family select"), "change", vjs.bind(this, this.updateDisplay)), g.options().persistTextTrackSettings && this.restoreSettings()
                        }}), vjs.TextTrackSettings.prototype.createEl = function() {
                        return vjs.Component.prototype.createEl.call(this, "div", {className: "vjs-caption-settings vjs-modal-overlay", innerHTML: f()})
                    }, vjs.TextTrackSettings.prototype.getValues = function() {
                        var x, w, v, u, t, s, r, q, p, o, n, a;
                        x = this.el(), t = e(x.querySelector(".vjs-edge-style select")), s = e(x.querySelector(".vjs-font-family select")), r = e(x.querySelector(".vjs-fg-color > select")), v = e(x.querySelector(".vjs-text-opacity > select")), q = e(x.querySelector(".vjs-bg-color > select")), w = e(x.querySelector(".vjs-bg-opacity > select")), p = e(x.querySelector(".window-color > select")), u = e(x.querySelector(".vjs-window-opacity > select")), a = window.parseFloat(e(x.querySelector(".vjs-font-percent > select"))), o = {backgroundOpacity: w, textOpacity: v, windowOpacity: u, edgeStyle: t, fontFamily: s, color: r, backgroundColor: q, windowColor: p, fontPercent: a};
                        for (n in o) {
                            ("" === o[n] || "none" === o[n] || "fontPercent" === n && 1 === o[n]) && delete o[n]
                        }
                        return o
                    }, vjs.TextTrackSettings.prototype.setValues = function(b) {
                        var h, g = this.el();
                        d(g.querySelector(".vjs-edge-style select"), b.edgeStyle), d(g.querySelector(".vjs-font-family select"), b.fontFamily), d(g.querySelector(".vjs-fg-color > select"), b.color), d(g.querySelector(".vjs-text-opacity > select"), b.textOpacity), d(g.querySelector(".vjs-bg-color > select"), b.backgroundColor), d(g.querySelector(".vjs-bg-opacity > select"), b.backgroundOpacity), d(g.querySelector(".window-color > select"), b.windowColor), d(g.querySelector(".vjs-window-opacity > select"), b.windowOpacity), h = b.fontPercent, h && (h = h.toFixed(2)), d(g.querySelector(".vjs-font-percent > select"), h)
                    }, vjs.TextTrackSettings.prototype.restoreSettings = function() {
                        var g;
                        try {
                            g = JSON.parse(window.localStorage.getItem("vjs-text-track-settings"))
                        } catch (c) {
                        }
                        g && this.setValues(g)
                    }, vjs.TextTrackSettings.prototype.saveSettings = function() {
                        var g;
                        if (this.player_.options().persistTextTrackSettings) {
                            g = this.getValues();
                            try {
                                vjs.isEmpty(g) ? window.localStorage.removeItem("vjs-text-track-settings") : window.localStorage.setItem("vjs-text-track-settings", JSON.stringify(g))
                            } catch (c) {
                            }
                        }
                    }, vjs.TextTrackSettings.prototype.updateDisplay = function() {
                        var b = this.player_.getChild("textTrackDisplay");
                        b && b.updateDisplay()
                    }
                }(), vjs.JSON, "undefined" != typeof window.JSON && "function" == typeof window.JSON.parse) {
                    vjs.JSON = window.JSON
                } else {
                    vjs.JSON = {};
                    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                    vjs.JSON.parse = function(text, reviver) {
                        function walk(a, b) {
                            var c, d, e = a[b];
                            if (e && "object" == typeof e) {
                                for (c in e) {
                                    Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c])
                                }
                            }
                            return reviver.call(a, b, e)
                        }
                        var j;
                        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                            return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j
                        }
                        throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
                    }
                }
                vjs.autoSetup = function() {
                    var j, i, p, o, n, m = document.getElementsByTagName("video"), l = document.getElementsByTagName("audio"), k = [];
                    if (m && m.length > 0) {
                        for (o = 0, n = m.length;
                                n > o;
                                o++) {
                            k.push(m[o])
                        }
                    }
                    if (l && l.length > 0) {
                        for (o = 0, n = l.length;
                                n > o;
                                o++) {
                            k.push(l[o])
                        }
                    }
                    if (k && k.length > 0) {
                        for (o = 0, n = k.length;
                                n > o;
                                o++) {
                            if (i = k[o], !i || !i.getAttribute) {
                                vjs.autoSetupTimeout(1);
                                break
                            }
                            void 0 === i.player && (j = i.getAttribute("data-setup"), null !== j && (p = videojs(i)))
                        }
                    } else {
                        vjs.windowLoaded || vjs.autoSetupTimeout(1)
                    }
                }, vjs.autoSetupTimeout = function(b) {
                    setTimeout(vjs.autoSetup, b)
                }, "complete" === document.readyState ? vjs.windowLoaded = !0 : vjs.one(window, "load", function() {
                    vjs.windowLoaded = !0
                }), vjs.autoSetupTimeout(1), vjs.plugin = function(d, c) {
                    vjs.Player.prototype[d] = c
                }, function(h) {
                    var g = h.vttjs = {}, l = g.VTTCue, k = g.VTTRegion, j = h.VTTCue, i = h.VTTRegion;
                    g.shim = function() {
                        g.VTTCue = l, g.VTTRegion = k
                    }, g.restore = function() {
                        g.VTTCue = j, g.VTTRegion = i
                    }
                }(this), function(r, q) {
                    function p(d) {
                        if ("string" != typeof d) {
                            return !1
                        }
                        var c = k[d.toLowerCase()];
                        return c ? d.toLowerCase() : !1
                    }
                    function o(d) {
                        if ("string" != typeof d) {
                            return !1
                        }
                        var c = j[d.toLowerCase()];
                        return c ? d.toLowerCase() : !1
                    }
                    function n(f) {
                        for (var e = 1;
                                e < arguments.length;
                                e++) {
                            var h = arguments[e];
                            for (var g in h) {
                                f[g] = h[g]
                            }
                        }
                        return f
                    }
                    function m(N, M, L) {
                        var K = this, J = /MSIE\s8\.0/.test(navigator.userAgent), I = {};
                        J ? K = document.createElement("custom") : I.enumerable = !0, K.hasBeenReset = !1;
                        var H = "", G = !1, F = N, E = M, D = L, C = null, B = "", A = !0, z = "auto", y = "start", g = 50, e = "middle", d = 50, c = "middle";
                        return Object.defineProperty(K, "id", n({}, I, {get: function() {
                                return H
                            }, set: function(b) {
                                H = "" + b
                            }})), Object.defineProperty(K, "pauseOnExit", n({}, I, {get: function() {
                                return G
                            }, set: function(b) {
                                G = !!b
                            }})), Object.defineProperty(K, "startTime", n({}, I, {get: function() {
                                return F
                            }, set: function(b) {
                                if ("number" != typeof b) {
                                    throw new TypeError("Start time must be set to a number.")
                                }
                                F = b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "endTime", n({}, I, {get: function() {
                                return E
                            }, set: function(b) {
                                if ("number" != typeof b) {
                                    throw new TypeError("End time must be set to a number.")
                                }
                                E = b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "text", n({}, I, {get: function() {
                                return D
                            }, set: function(b) {
                                D = "" + b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "region", n({}, I, {get: function() {
                                return C
                            }, set: function(b) {
                                C = b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "vertical", n({}, I, {get: function() {
                                return B
                            }, set: function(h) {
                                var f = p(h);
                                if (f === !1) {
                                    throw new SyntaxError("An invalid or illegal string was specified.")
                                }
                                B = f, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "snapToLines", n({}, I, {get: function() {
                                return A
                            }, set: function(b) {
                                A = !!b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "line", n({}, I, {get: function() {
                                return z
                            }, set: function(b) {
                                if ("number" != typeof b && b !== l) {
                                    throw new SyntaxError("An invalid number or illegal string was specified.")
                                }
                                z = b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "lineAlign", n({}, I, {get: function() {
                                return y
                            }, set: function(h) {
                                var f = o(h);
                                if (!f) {
                                    throw new SyntaxError("An invalid or illegal string was specified.")
                                }
                                y = f, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "position", n({}, I, {get: function() {
                                return g
                            }, set: function(b) {
                                if (0 > b || b > 100) {
                                    throw new Error("Position must be between 0 and 100.")
                                }
                                g = b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "positionAlign", n({}, I, {get: function() {
                                return e
                            }, set: function(h) {
                                var f = o(h);
                                if (!f) {
                                    throw new SyntaxError("An invalid or illegal string was specified.")
                                }
                                e = f, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "size", n({}, I, {get: function() {
                                return d
                            }, set: function(b) {
                                if (0 > b || b > 100) {
                                    throw new Error("Size must be between 0 and 100.")
                                }
                                d = b, this.hasBeenReset = !0
                            }})), Object.defineProperty(K, "align", n({}, I, {get: function() {
                                return c
                            }, set: function(h) {
                                var f = o(h);
                                if (!f) {
                                    throw new SyntaxError("An invalid or illegal string was specified.")
                                }
                                c = f, this.hasBeenReset = !0
                            }})), K.displayState = void 0, J ? K : void 0
                    }
                    var l = "auto", k = {"": !0, lr: !0, rl: !0}, j = {start: !0, middle: !0, end: !0, left: !0, right: !0};
                    m.prototype.getCueAsHTML = function() {
                        return WebVTT.convertCueToDOMTree(window, this.text)
                    }, r.VTTCue = r.VTTCue || m, q.VTTCue = m
                }(this, this.vttjs || {}), function(h, g) {
                    function l(d) {
                        if ("string" != typeof d) {
                            return !1
                        }
                        var c = i[d.toLowerCase()];
                        return c ? d.toLowerCase() : !1
                    }
                    function k(b) {
                        return"number" == typeof b && b >= 0 && 100 >= b
                    }
                    function j() {
                        var d = 100, c = 3, q = 0, p = 100, o = 0, n = 100, m = "";
                        Object.defineProperties(this, {width: {enumerable: !0, get: function() {
                                    return d
                                }, set: function(a) {
                                    if (!k(a)) {
                                        throw new Error("Width must be between 0 and 100.")
                                    }
                                    d = a
                                }}, lines: {enumerable: !0, get: function() {
                                    return c
                                }, set: function(b) {
                                    if ("number" != typeof b) {
                                        throw new TypeError("Lines must be set to a number.")
                                    }
                                    c = b
                                }}, regionAnchorY: {enumerable: !0, get: function() {
                                    return p
                                }, set: function(b) {
                                    if (!k(b)) {
                                        throw new Error("RegionAnchorX must be between 0 and 100.")
                                    }
                                    p = b
                                }}, regionAnchorX: {enumerable: !0, get: function() {
                                    return q
                                }, set: function(b) {
                                    if (!k(b)) {
                                        throw new Error("RegionAnchorY must be between 0 and 100.")
                                    }
                                    q = b
                                }}, viewportAnchorY: {enumerable: !0, get: function() {
                                    return n
                                }, set: function(b) {
                                    if (!k(b)) {
                                        throw new Error("ViewportAnchorY must be between 0 and 100.")
                                    }
                                    n = b
                                }}, viewportAnchorX: {enumerable: !0, get: function() {
                                    return o
                                }, set: function(b) {
                                    if (!k(b)) {
                                        throw new Error("ViewportAnchorX must be between 0 and 100.")
                                    }
                                    o = b
                                }}, scroll: {enumerable: !0, get: function() {
                                    return m
                                }, set: function(f) {
                                    var e = l(f);
                                    if (e === !1) {
                                        throw new SyntaxError("An invalid or illegal string was specified.")
                                    }
                                    m = e
                                }}})
                    }
                    var i = {"": !0, up: !0};
                    h.VTTRegion = h.VTTRegion || j, g.VTTRegion = j
                }(this, this.vttjs || {}), function(T) {
                    function S(d, c) {
                        this.name = "ParsingError", this.code = d.code, this.message = c || d.message
                    }
                    function R(e) {
                        function d(h, g, j, i) {
                            return 3600 * (0 | h) + 60 * (0 | g) + (0 | j) + (0 | i) / 1000
                        }
                        var f = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
                        return f ? f[3] ? d(f[1], f[2], f[3].replace(":", ""), f[4]) : f[1] > 59 ? d(f[1], f[2], 0, f[4]) : d(0, f[1], f[2], f[4]) : null
                    }
                    function Q() {
                        this.values = F(null)
                    }
                    function P(r, q, p, o) {
                        var n = o ? r.split(o) : [r];
                        for (var m in n) {
                            if ("string" == typeof n[m]) {
                                var l = n[m].split(p);
                                if (2 === l.length) {
                                    var k = l[0], j = l[1];
                                    q(k, j)
                                }
                            }
                        }
                    }
                    function O(b, n, m) {
                        function l() {
                            var a = R(b);
                            if (null === a) {
                                throw new S(S.Errors.BadTimeStamp, "Malformed timestamp: " + c)
                            }
                            return b = b.replace(/^[^\sa-zA-Z-]+/, ""), a
                        }
                        function e(g, f) {
                            var h = new Q;
                            P(g, function(j, i) {
                                switch (j) {
                                    case"region":
                                        for (var p = m.length - 1;
                                                p >= 0;
                                                p--) {
                                            if (m[p].id === i) {
                                                h.set(j, m[p].region);
                                                break
                                            }
                                        }
                                        break;
                                    case"vertical":
                                        h.alt(j, i, ["rl", "lr"]);
                                        break;
                                    case"line":
                                        var o = i.split(","), k = o[0];
                                        h.integer(j, k), h.percent(j, k) ? h.set("snapToLines", !1) : null, h.alt(j, k, ["auto"]), 2 === o.length && h.alt("lineAlign", o[1], ["start", "middle", "end"]);
                                        break;
                                    case"position":
                                        o = i.split(","), h.percent(j, o[0]), 2 === o.length && h.alt("positionAlign", o[1], ["start", "middle", "end"]);
                                        break;
                                    case"size":
                                        h.percent(j, i);
                                        break;
                                    case"align":
                                        h.alt(j, i, ["start", "middle", "end", "left", "right"])
                                }
                            }, /:/, /\s/), f.region = h.get("region", null), f.vertical = h.get("vertical", ""), f.line = h.get("line", "auto"), f.lineAlign = h.get("lineAlign", "start"), f.snapToLines = h.get("snapToLines", !0), f.size = h.get("size", 100), f.align = h.get("align", "middle"), f.position = h.get("position", {start: 0, left: 0, middle: 50, end: 100, right: 100}, f.align), f.positionAlign = h.get("positionAlign", {start: "start", left: "start", middle: "middle", end: "end", right: "end"}, f.align)
                        }
                        function d() {
                            b = b.replace(/^\s+/, "")
                        }
                        var c = b;
                        if (d(), n.startTime = l(), d(), "-->" !== b.substr(0, 3)) {
                            throw new S(S.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + c)
                        }
                        b = b.substr(3), d(), n.endTime = l(), d(), e(b, n)
                    }
                    function N(Y, X) {
                        function W() {
                            function b(e) {
                                return X = X.substr(e.length), e
                            }
                            if (!X) {
                                return null
                            }
                            var d = X.match(/^([^<]*)(<[^>]+>?)?/);
                            return b(d[1] ? d[1] : d[2])
                        }
                        function V(b) {
                            return E[b]
                        }
                        function U(b) {
                            for (;
                                    c = b.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);
                                    ) {
                                b = b.replace(c[0], V)
                            }
                            return b
                        }
                        function w(e, d) {
                            return !B[d.localName] || B[d.localName] === e.localName
                        }
                        function v(a, j) {
                            var i = D[a];
                            if (!i) {
                                return null
                            }
                            var h = Y.document.createElement(i);
                            h.localName = i;
                            var g = C[a];
                            return g && j && (h[g] = j.trim()), h
                        }
                        for (var u, t = Y.document.createElement("div"), s = t, r = [];
                                null !== (u = W());
                                ) {
                            if ("<" !== u[0]) {
                                s.appendChild(Y.document.createTextNode(U(u)))
                            } else {
                                if ("/" === u[1]) {
                                    r.length && r[r.length - 1] === u.substr(2).replace(">", "") && (r.pop(), s = s.parentNode);
                                    continue
                                }
                                var q, p = R(u.substr(1, u.length - 2));
                                if (p) {
                                    q = Y.document.createProcessingInstruction("timestamp", p), s.appendChild(q);
                                    continue
                                }
                                var c = u.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                                if (!c) {
                                    continue
                                }
                                if (q = v(c[1], c[3]), !q) {
                                    continue
                                }
                                if (!w(s, q)) {
                                    continue
                                }
                                c[2] && (q.className = c[2].substr(1).replace(".", " ")), r.push(c[1]), s.appendChild(q), s = q
                            }
                        }
                        return t
                    }
                    function M(j) {
                        function i(e, d) {
                            for (var f = d.childNodes.length - 1;
                                    f >= 0;
                                    f--) {
                                e.push(d.childNodes[f])
                            }
                        }
                        function p(b) {
                            if (!b || !b.length) {
                                return null
                            }
                            var h = b.pop(), g = h.textContent || h.innerText;
                            if (g) {
                                var c = g.match(/^.*(\n|\r)/);
                                return c ? (b.length = 0, c[0]) : g
                            }
                            return"ruby" === h.tagName ? p(b) : h.childNodes ? (i(b, h), p(b)) : void 0
                        }
                        var o, n = [], m = "";
                        if (!j || !j.childNodes) {
                            return"ltr"
                        }
                        for (i(n, j);
                                m = p(n);
                                ) {
                            for (var l = 0;
                                    l < m.length;
                                    l++) {
                                o = m.charCodeAt(l);
                                for (var k = 0;
                                        k < A.length;
                                        k++) {
                                    if (A[k] === o) {
                                        return"rtl"
                                    }
                                }
                            }
                        }
                        return"ltr"
                    }
                    function L(g) {
                        if ("number" == typeof g.line && (g.snapToLines || g.line >= 0 && g.line <= 100)) {
                            return g.line
                        }
                        if (!g.track || !g.track.textTrackList || !g.track.textTrackList.mediaElement) {
                            return -1
                        }
                        for (var f = g.track, j = f.textTrackList, i = 0, h = 0;
                                h < j.length && j[h] !== f;
                                h++) {
                            "showing" === j[h].mode && i++
                        }
                        return -1 * ++i
                    }
                    function K() {
                    }
                    function J(h, g, p) {
                        var o = /MSIE\s8\.0/.test(navigator.userAgent), n = "rgba(255, 255, 255, 1)", m = "rgba(0, 0, 0, 0.8)";
                        o && (n = "rgb(255, 255, 255)", m = "rgb(0, 0, 0)"), K.call(this), this.cue = g, this.cueDiv = N(h, g.text);
                        var l = {color: n, backgroundColor: m, position: "relative", left: 0, right: 0, top: 0, bottom: 0, display: "inline"};
                        o || (l.writingMode = "" === g.vertical ? "horizontal-tb" : "lr" === g.vertical ? "vertical-lr" : "vertical-rl", l.unicodeBidi = "plaintext"), this.applyStyles(l, this.cueDiv), this.div = h.document.createElement("div"), l = {textAlign: "middle" === g.align ? "center" : g.align, font: p.font, whiteSpace: "pre-line", position: "absolute"}, o || (l.direction = M(this.cueDiv), l.writingMode = "" === g.vertical ? "horizontal-tb" : "lr" === g.vertical ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext"), this.applyStyles(l), this.div.appendChild(this.cueDiv);
                        var j = 0;
                        switch (g.positionAlign) {
                            case"start":
                                j = g.position;
                                break;
                            case"middle":
                                j = g.position - g.size / 2;
                                break;
                            case"end":
                                j = g.position - g.size
                        }
                        this.applyStyles("" === g.vertical ? {left: this.formatStyle(j, "%"), width: this.formatStyle(g.size, "%")} : {top: this.formatStyle(j, "%"), height: this.formatStyle(g.size, "%")}), this.move = function(b) {
                            this.applyStyles({top: this.formatStyle(b.top, "px"), bottom: this.formatStyle(b.bottom, "px"), left: this.formatStyle(b.left, "px"), right: this.formatStyle(b.right, "px"), height: this.formatStyle(b.height, "px"), width: this.formatStyle(b.width, "px")})
                        }
                    }
                    function I(i) {
                        var h, n, m, l, k = /MSIE\s8\.0/.test(navigator.userAgent);
                        if (i.div) {
                            n = i.div.offsetHeight, m = i.div.offsetWidth, l = i.div.offsetTop;
                            var j = (j = i.div.childNodes) && (j = j[0]) && j.getClientRects && j.getClientRects();
                            i = i.div.getBoundingClientRect(), h = j ? Math.max(j[0] && j[0].height || 0, i.height / j.length) : 0
                        }
                        this.left = i.left, this.right = i.right, this.top = i.top || l, this.height = i.height || n, this.bottom = i.bottom || l + (i.height || n), this.width = i.width || m, this.lineHeight = void 0 !== h ? h : i.lineHeight, k && !this.lineHeight && (this.lineHeight = 13)
                    }
                    function H(ac, ab, aa, Z) {
                        function Y(d, c) {
                            for (var o, n = new I(d), m = 1, k = 0;
                                    k < c.length;
                                    k++) {
                                for (;
                                        d.overlapsOppositeAxis(aa, c[k]) || d.within(aa) && d.overlapsAny(Z);
                                        ) {
                                    d.move(c[k])
                                }
                                if (d.within(aa)) {
                                    return d
                                }
                                var j = d.intersectPercentage(aa);
                                m > j && (o = new I(d), m = j), d = new I(n)
                            }
                            return o || n
                        }
                        var X = new I(ab), W = ab.cue, V = L(W), U = [];
                        if (W.snapToLines) {
                            var w;
                            switch (W.vertical) {
                                case"":
                                    U = ["+y", "-y"], w = "height";
                                    break;
                                case"rl":
                                    U = ["+x", "-x"], w = "width";
                                    break;
                                case"lr":
                                    U = ["-x", "+x"], w = "width"
                            }
                            var v = X.lineHeight, u = v * Math.round(V), t = aa[w] + v, s = U[0];
                            Math.abs(u) > t && (u = 0 > u ? -1 : 1, u *= Math.ceil(t / v) * v), 0 > V && (u += "" === W.vertical ? aa.height : aa.width, U = U.reverse()), X.move(s, u)
                        } else {
                            var l = X.lineHeight / aa.height * 100;
                            switch (W.lineAlign) {
                                case"middle":
                                    V -= l / 2;
                                    break;
                                case"end":
                                    V -= l
                            }
                            switch (W.vertical) {
                                case"":
                                    ab.applyStyles({top: ab.formatStyle(V, "%")});
                                    break;
                                case"rl":
                                    ab.applyStyles({left: ab.formatStyle(V, "%")});
                                    break;
                                case"lr":
                                    ab.applyStyles({right: ab.formatStyle(V, "%")})
                            }
                            U = ["+y", "-x", "+x", "-y"], X = new I(ab)
                        }
                        var i = Y(X, U);
                        ab.move(i.toCSSCompatValues(aa))
                    }
                    function G() {
                    }
                    var F = Object.create || function() {
                        function b() {
                        }
                        return function(a) {
                            if (1 !== arguments.length) {
                                throw new Error("Object.create shim only accepts one parameter.")
                            }
                            return b.prototype = a, new b
                        }
                    }();
                    S.prototype = F(Error.prototype), S.prototype.constructor = S, S.Errors = {BadSignature: {code: 0, message: "Malformed WebVTT signature."}, BadTimeStamp: {code: 1, message: "Malformed time stamp."}}, Q.prototype = {set: function(d, c) {
                            this.get(d) || "" === c || (this.values[d] = c)
                        }, get: function(e, d, f) {
                            return f ? this.has(e) ? this.values[e] : d[f] : this.has(e) ? this.values[e] : d
                        }, has: function(b) {
                            return b in this.values
                        }, alt: function(f, e, h) {
                            for (var g = 0;
                                    g < h.length;
                                    ++g) {
                                if (e === h[g]) {
                                    this.set(f, e);
                                    break
                                }
                            }
                        }, integer: function(d, c) {
                            /^-?\d+$/.test(c) && this.set(d, parseInt(c, 10))
                        }, percent: function(e, d) {
                            var f;
                            return(f = d.match(/^([\d]{1,3})(\.[\d]*)?%$/)) && (d = parseFloat(d), d >= 0 && 100 >= d) ? (this.set(e, d), !0) : !1
                        }};
                    var E = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&lrm;": "", "&rlm;": "", "&nbsp;": " "}, D = {c: "span", i: "i", b: "b", u: "u", ruby: "ruby", rt: "rt", v: "span", lang: "span"}, C = {v: "title", lang: "lang"}, B = {rt: "ruby"}, A = [1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1645, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1765, 1766, 1774, 1775, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1807, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2036, 2037, 2042, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2074, 2084, 2088, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2142, 2208, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 8207, 64285, 64287, 64288, 64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64434, 64435, 64436, 64437, 64438, 64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 65020, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 67584, 67585, 67586, 67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 67668, 67669, 67671, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863, 67864, 67865, 67866, 67867, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67903, 67968, 67969, 67970, 67971, 67972, 67973, 67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68000, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68221, 68222, 68223, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 1114109];
                    K.prototype.applyStyles = function(e, d) {
                        d = d || this.div;
                        for (var f in e) {
                            e.hasOwnProperty(f) && (d.style[f] = e[f])
                        }
                    }, K.prototype.formatStyle = function(d, c) {
                        return 0 === d ? 0 : d + c
                    }, J.prototype = F(K.prototype), J.prototype.constructor = J, I.prototype.move = function(d, c) {
                        switch (c = void 0 !== c ? c : this.lineHeight, d) {
                            case"+x":
                                this.left += c, this.right += c;
                                break;
                            case"-x":
                                this.left -= c, this.right -= c;
                                break;
                            case"+y":
                                this.top += c, this.bottom += c;
                                break;
                            case"-y":
                                this.top -= c, this.bottom -= c
                        }
                    }, I.prototype.overlaps = function(b) {
                        return this.left < b.right && this.right > b.left && this.top < b.bottom && this.bottom > b.top
                    }, I.prototype.overlapsAny = function(d) {
                        for (var c = 0;
                                c < d.length;
                                c++) {
                            if (this.overlaps(d[c])) {
                                return !0
                            }
                        }
                        return !1
                    }, I.prototype.within = function(b) {
                        return this.top >= b.top && this.bottom <= b.bottom && this.left >= b.left && this.right <= b.right
                    }, I.prototype.overlapsOppositeAxis = function(d, c) {
                        switch (c) {
                            case"+x":
                                return this.left < d.left;
                            case"-x":
                                return this.right > d.right;
                            case"+y":
                                return this.top < d.top;
                            case"-y":
                                return this.bottom > d.bottom
                        }
                    }, I.prototype.intersectPercentage = function(f) {
                        var e = Math.max(0, Math.min(this.right, f.right) - Math.max(this.left, f.left)), h = Math.max(0, Math.min(this.bottom, f.bottom) - Math.max(this.top, f.top)), g = e * h;
                        return g / (this.height * this.width)
                    }, I.prototype.toCSSCompatValues = function(b) {
                        return{top: this.top - b.top, bottom: b.bottom - this.bottom, left: this.left - b.left, right: b.right - this.right, height: this.height, width: this.width}
                    }, I.getSimpleBoxPosition = function(g) {
                        var f = g.div ? g.div.offsetHeight : g.tagName ? g.offsetHeight : 0, j = g.div ? g.div.offsetWidth : g.tagName ? g.offsetWidth : 0, i = g.div ? g.div.offsetTop : g.tagName ? g.offsetTop : 0;
                        g = g.div ? g.div.getBoundingClientRect() : g.tagName ? g.getBoundingClientRect() : g;
                        var h = {left: g.left, right: g.right, top: g.top || i, height: g.height || f, bottom: g.bottom || i + (g.height || f), width: g.width || j};
                        return h
                    }, G.StringDecoder = function() {
                        return{decode: function(b) {
                                if (!b) {
                                    return""
                                }
                                if ("string" != typeof b) {
                                    throw new Error("Error - expected string data.")
                                }
                                return decodeURIComponent(encodeURIComponent(b))
                            }}
                    }, G.convertCueToDOMTree = function(d, c) {
                        return d && c ? N(d, c) : null
                    };
                    var z = 0.05, y = "sans-serif", x = "1.5%";
                    G.processCues = function(t, s, r) {
                        function q(d) {
                            for (var c = 0;
                                    c < d.length;
                                    c++) {
                                if (d[c].hasBeenReset || !d[c].displayState) {
                                    return !0
                                }
                            }
                            return !1
                        }
                        if (!t || !s || !r) {
                            return null
                        }
                        for (;
                                r.firstChild;
                                ) {
                            r.removeChild(r.firstChild)
                        }
                        var p = t.document.createElement("div");
                        if (p.style.position = "absolute", p.style.left = "0", p.style.right = "0", p.style.top = "0", p.style.bottom = "0", p.style.margin = x, r.appendChild(p), q(s)) {
                            var o = [], n = I.getSimpleBoxPosition(p), m = Math.round(n.height * z * 100) / 100, l = {font: m + "px " + y};
                            !function() {
                                for (var e, b, a = 0;
                                        a < s.length;
                                        a++) {
                                    b = s[a], e = new J(t, b, l), p.appendChild(e.div), H(t, e, n, o), b.displayState = e.div, o.push(I.getSimpleBoxPosition(e))
                                }
                            }()
                        } else {
                            for (var k = 0;
                                    k < s.length;
                                    k++) {
                                p.appendChild(s[k].displayState)
                            }
                        }
                    }, G.Parser = function(e, d, f) {
                        f || (f = d, d = {}), d || (d = {}), this.window = e, this.vttjs = d, this.state = "INITIAL", this.buffer = "", this.decoder = f || new TextDecoder("utf8"), this.regionList = []
                    }, G.Parser.prototype = {reportOrThrowError: function(b) {
                            if (!(b instanceof S)) {
                                throw b
                            }
                            this.onparsingerror && this.onparsingerror(b)
                        }, parse: function(t) {
                            function s() {
                                for (var h = p.buffer, g = 0;
                                        g < h.length && "\r" !== h[g] && "\n" !== h[g];
                                        ) {
                                    ++g
                                }
                                var i = h.substr(0, g);
                                return"\r" === h[g] && ++g, "\n" === h[g] && ++g, p.buffer = h.substr(g), i
                            }
                            function r(h) {
                                var g = new Q;
                                if (P(h, function(j, m) {
                                    switch (j) {
                                        case"id":
                                            g.set(j, m);
                                            break;
                                        case"width":
                                            g.percent(j, m);
                                            break;
                                        case"lines":
                                            g.integer(j, m);
                                            break;
                                        case"regionanchor":
                                        case"viewportanchor":
                                            var l = m.split(",");
                                            if (2 !== l.length) {
                                                break
                                            }
                                            var k = new Q;
                                            if (k.percent("x", l[0]), k.percent("y", l[1]), !k.has("x") || !k.has("y")) {
                                                break
                                            }
                                            g.set(j + "X", k.get("x")), g.set(j + "Y", k.get("y"));
                                            break;
                                        case"scroll":
                                            g.alt(j, m, ["up"])
                                    }
                                }, /=/, /\s/), g.has("id")) {
                                    var i = new (p.vttjs.VTTRegion || p.window.VTTRegion);
                                    i.width = g.get("width", 100), i.lines = g.get("lines", 3), i.regionAnchorX = g.get("regionanchorX", 0), i.regionAnchorY = g.get("regionanchorY", 100), i.viewportAnchorX = g.get("viewportanchorX", 0), i.viewportAnchorY = g.get("viewportanchorY", 100), i.scroll = g.get("scroll", ""), p.onregion && p.onregion(i), p.regionList.push({id: g.get("id"), region: i})
                                }
                            }
                            function q(c) {
                                P(c, function(h, g) {
                                    switch (h) {
                                        case"Region":
                                            r(g)
                                    }
                                }, /:/)
                            }
                            var p = this;
                            t && (p.buffer += p.decoder.decode(t, {stream: !0}));
                            try {
                                var o;
                                if ("INITIAL" === p.state) {
                                    if (!/\r\n|\n/.test(p.buffer)) {
                                        return this
                                    }
                                    o = s();
                                    var f = o.match(/^WEBVTT([ \t].*)?$/);
                                    if (!f || !f[0]) {
                                        throw new S(S.Errors.BadSignature)
                                    }
                                    p.state = "HEADER"
                                }
                                for (var e = !1;
                                        p.buffer;
                                        ) {
                                    if (!/\r\n|\n/.test(p.buffer)) {
                                        return this
                                    }
                                    switch (e ? e = !1 : o = s(), p.state) {
                                        case"HEADER":
                                            /:/.test(o) ? q(o) : o || (p.state = "ID");
                                            continue;
                                        case"NOTE":
                                            o || (p.state = "ID");
                                            continue;
                                        case"ID":
                                            if (/^NOTE($|[ \t])/.test(o)) {
                                                p.state = "NOTE";
                                                break
                                            }
                                            if (!o) {
                                                continue
                                            }
                                            if (p.cue = new (p.vttjs.VTTCue || p.window.VTTCue)(0, 0, ""), p.state = "CUE", -1 === o.indexOf("-->")) {
                                                p.cue.id = o;
                                                continue
                                            }
                                        case"CUE":
                                            try {
                                                O(o, p.cue, p.regionList)
                                            } catch (d) {
                                                p.reportOrThrowError(d), p.cue = null, p.state = "BADCUE";
                                                continue
                                            }
                                            p.state = "CUETEXT";
                                            continue;
                                        case"CUETEXT":
                                            var b = -1 !== o.indexOf("-->");
                                            if (!o || b && (e = !0)) {
                                                p.oncue && p.oncue(p.cue), p.cue = null, p.state = "ID";
                                                continue
                                            }
                                            p.cue.text && (p.cue.text += "\n"), p.cue.text += o;
                                            continue;
                                        case"BADCUE":
                                            o || (p.state = "ID");
                                            continue
                                    }
                                }
                            } catch (d) {
                                p.reportOrThrowError(d), "CUETEXT" === p.state && p.cue && p.oncue && p.oncue(p.cue), p.cue = null, p.state = "INITIAL" === p.state ? "BADWEBVTT" : "BADCUE"
                            }
                            return this
                        }, flush: function() {
                            var b = this;
                            try {
                                if (b.buffer += b.decoder.decode(), (b.cue || "HEADER" === b.state) && (b.buffer += "\n\n", b.parse()), "INITIAL" === b.state) {
                                    throw new S(S.Errors.BadSignature)
                                }
                            } catch (d) {
                                b.reportOrThrowError(d)
                            }
                            return b.onflush && b.onflush(), this
                        }}, T.WebVTT = G
                }(this, this.vttjs || {}), videojs.Player.prototype.next = function() {
                    return this.pl._nextPrev("next"), this
                }, videojs.Player.prototype.prev = function() {
                    return this.pl._nextPrev("prev"), this
                }, videojs.plugin("playList", playList), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function l() {
                            var i = f.domain, n = i.split(".").splice(-2), m = n.join(".");
                            return m
                        }
                        var k = function(m) {
                            var i, p, o, n = document.cookie.split(";");
                            for (i = 0;
                                    i < n.length;
                                    i++) {
                                if (p = h.trim(n[i].substr(0, n[i].indexOf("="))), o = h.trim(n[i].substr(n[i].indexOf("=") + 1)), p === m) {
                                    return o
                                }
                            }
                            return !1
                        }, j = function(d) {
                            return d && d.data && ("POST" === d.type || "post" === d.type) && (d.data instanceof Object ? d.data._charset_ = "UTF-8" : d.data += "&_charset_=UTF-8"), h.ajax({type: d.type, url: d.url, data: d.data, options: d.options ? d.dataType : "", context: h("body"), success: function(i, n, m) {
                                    "function" == typeof d.callback && d.callback(i, n, m)
                                }, error: function(i, n, m) {
                                    "function" == typeof d.error && d.error(i, n, m)
                                }})
                        }, c = function() {
                            return"DISABLED" === h("body").data("cq-mode")
                        }, b = function() {
                            var d = k("RCHMFrontEndCookie");
                            return d ? decodeURI(e.escape(JSON.parse(e.unescape(d)).u.replace(/\+/gi, " "))) : !1
                        }, a = {mapIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAvVBMVEUAAADp2KXdzKLr26MAAAC9s5Tj0Z8AAADSxJ68spLIvJoWFBSyqIq3q4vdy6LZyaEGBgYIBwgGBAgJCQoNCw0iHx3i0aTPwpq6sJHGuJcUERS0qo/r2aRHQTqAfnnVxZ/Kvpu5sJHWx6IiIiK3rI2pn4ISEhLn1qTDuJnr2KUqKSlwb2mhl31OS0GblojHvJrOwJ7j0qUzMzNERERXV1caGhpqamrh0aTczaI4NS7fzqO9spPayqLSw5/AtZbT84H7AAAAHnRSTlMAhIBABYAQECAQo2X5QDpwJUExTFh6oGigjZYw7bvKeG7cAAABIklEQVR4Xs3S2VKDQBCG0RERRkBINCQm6rCTfXHfff/Hkh6GVLDoaW+s8r8+9WUqDftX8wMj8EnFhy8fafS5ix2udcHzm4Lb2YnGDW8P4Ncl6kbTFnwfIY5Pa+itihomyDuP5gDz17IsF4WEyI/PAebZIywrAOadzpdwndVbS3jWBY8BRotmnh7md81WRPG+WY5CLt8oHuot5RuvWNeuAabiCbZMAHq6/zHdCCE2sy1A5NyWukwaqxMmpwxJ/rg1BJFkG0IQSbYgBLFkC0IQm0F/4Sp5ACGoSe4hBHXJPYSgNqngmBGzFOSMmiGhw8hZEkKQTFYQgnSygr8JmvY4cmyTZucXbhwO+j1bDysXTm4modvvmWRx4LpkEahpVzPZn+8bWRhID7l4mFEAAAAASUVORK5CYII=", clusterIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAwFBMVEUAAAD/79T/8dP/8NP/78//78//8dH/8dP/8dP/79P/8dL/8tL/8dL/8NP/8NL/8dP/8dPh1bvv4sYAAACblIWRi30xLyl7d3C8sp1wamD16MyIg3hCQkLAt6VmZmVqampQS0K0rJr26c2poY9KSkpcXFwzMzM6OjpgWk8qKipmYllhYWHo3MJGRkYTExMODg5OTk5TU1MKCgohISEFBQUmJiY2NjYvLy8+Pj4cHBzb0LoYGBirpZjNxK/bz7dXV1d1xdOXAAAAEHRSTlMAMN+fIBBg74BAv1DPr49wRXuCfwAAATpJREFUeNqd1NdygzAQQFEbjAUGx5fqFvde0nv//79KiGJcYF9ynu+MdnYklf6j4qQqJZljGmjKdIsT1+CQUc0nVh0IouUiDMNkGPuAVz5pygr8Zbg3bIGq5ppmeKwdQPW4CYbhqSQAZx95BMl93k+lsm3YsL4tMof6boEwuirWzQ48I0guBT41HSkmb5I2/E7lwPmLZAUNPbZ/J2vp0Wu0HmQxho7ilawNaWQQPcnWOlJEc9lfVCN6lGXRZCGLUXrhn8+ykV65C9Nz0RY7jSzoXkjaoC+xyXYqaeFlVyW+Ltbc32CTTv+myMzHy56Twt98FejpiTQH/P4sp3f8XKrgNzfHBh9g7hNddUaD/oGoA/bpEzag0+sOtOZ7AMrNfwa2AsavqTGAaZUKWA2PHcOW/yjLsVOuWMi+AW6tfH02ALYoAAAAAElFTkSuQmCC", mapMobIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAApCAMAAAAcesn/AAAALVBMVEUAAAALCwsVFRUuLi45OTk7OzsuLi4+Pj4BAAD98NIHBgaon4vj17w4NSxfW06leJxAAAAACHRSTlMA88N9XDKmIv9G4e4AAADQSURBVHjajZPbDoMwDEPTG2QG9v+fO9HhrJX7sCOeOHJiImGk5gR3pFxtpiQPUhnEnn0i7zSNkSC1MJgN6LIvyL0BVgp3l2ERMKwzqxyP6zjP4wIX19+m96vz5oQc867XwxUTGTqoDr4JdVKd/6v1QK1BBSn/gOGC308Ok626HIrXsMH0h/C8SjLeV6jGmIZuykoV60AN7MumantUg4SaMaahALqJtFk1G4CGSHWE8GoTm3YIoONIoSomJPRMMmX3zm4LcvxXCthBKdFBwRT6AFvPF2lfkYx9AAAAAElFTkSuQmCC", clusterMobIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAMFBMVEUAAAD/8NP/8dP/8dP/8dP/8tP/8dMBAQL/8dNgW1AmJCDKv6dwal1APDSYkH5mYVW4jGWVAAAAB3RSTlMAHbzSmGtSQyoE5gAAAMhJREFUeNqNlFEOwyAMQwsJxUBZ73/bNaiTgK3M/qyebBdItl4uqBdAvAbXf+8Jj07+F7cLJsk+2yhMJdUcY66pwKRuYFpSip1Sy3QdI+aS46BsbuIGnyN+6ei9tI+aI/X+r9Fn9to/hV7xQa+7VgAQHwUgXJAHzmcoAf5Ka0ZLK2dpZQUVy1MgraATUKtUV1C1UgLkFZQB2VrvP80piIqjilNHQB0mdy1WKq0vmHoq1KNjni8zCNRIMcPJjDmzMLjVwy8xah2+AamCHXOpwq7bAAAAAElFTkSuQmCC"};
                        return{checkCookie: k, getNameFromCookie: b, ajaxCall: j, google: a, noWCM: c(), getCookieDomain: l}
                    };
                    e.gdt.Utils = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.Utils = e.gdt.Utils || {};
                    var g = function() {
                        function T() {
                            var d = !1;
                            return(h.os && h.os.phone || /android/i.test(z) && /mobile/i.test(z)) && (d = !0), d
                        }
                        function S() {
                            var d = /android 2/i.test(z);
                            return d && c.addClass("oldDroid"), d
                        }
                        function R() {
                            return E = /iPad/i.test(navigator.userAgent), E && c.addClass("ipad"), E
                        }
                        function Q() {
                            var d = !1;
                            return h("html").is(".ie6, .ie7, .ie8, .ie9") && (d = !0), d
                        }
                        function P() {
                            return h("html").is(".ie6, .ie7, .ie8")
                        }
                        function O() {
                            return D = /msie/i.test(navigator.userAgent), D && c.addClass("isIE"), D
                        }
                        function N() {
                            var d = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
                            return d && c.addClass("isIE"), d
                        }
                        function M() {
                            return h.os && (h.os.phone || h.os.ipod) && h.os.ios && parseInt(h.os.version, 10) > 6
                        }
                        function L() {
                            var d = h.os && h.os.ios && 6 === parseInt(h.os.version, 10);
                            return d && c.addClass("iOS6"), d
                        }
                        function K() {
                            var d = /iPhone OS 7|iPad.*OS 7/.test(navigator.appVersion);
                            return d && h("html").addClass("iOS7"), d
                        }
                        function J() {
                            var i = screen.height, d = screen.width;
                            /Android/.test(z) >= 0 && (1280 === d && 800 === i || 800 === d && 1280 === i || 1024 === d && 600 === i || 600 === d && 1024 === i) && (C = !0, c.addClass("galaxy"))
                        }
                        function I() {
                            var i = navigator.userAgent || "", d = i.indexOf("Mozilla/5.0") > -1 && i.indexOf("Android ") > -1 && i.indexOf("AppleWebKit") > -1 && -1 === i.indexOf("Chrome");
                            d && c.addClass("android-native")
                        }
                        function H() {
                            B = window.matchMedia ? window.matchMedia("only screen and (max-width: 668px)").matches : !1, b.isMobileLayout = B
                        }
                        function G() {
                            return window.matchMedia && (window.matchMedia("only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)").matches || window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)").matches) || window.devicePixelRatio && window.devicePixelRatio > 1.3
                        }
                        function F() {
                            var d = function(i) {
                                return"string" == typeof i.MozTransform ? !0 : "string" == typeof i.OTransform ? !0 : "string" == typeof i.WebkitTransform ? !0 : "string" != typeof i.msTransform && "string" != typeof i.MsTransform || /MSIE 9/.test(navigator.appVersion) ? "string" == typeof i.transform ? !0 : !1 : !0
                            }(((document || {}).body || {}).style || {});
                            return d
                        }
                        var E, D, C, B, A, z = e.navigator.appVersion, c = h("body"), b = {};
                        return e.addEventListener && (e.addEventListener("orientationchange", function() {
                            0 === e.orientation && (J(), H())
                        }, !1), e.addEventListener("resize", function() {
                            clearTimeout(A), A = setTimeout(H, 10)
                        }, !1)), J(), I(), H(), b = {isMobile: T(), oldDroid: S(), isOldIE: Q(), isiPad: R(), isGalaxy: C, isiOS7iPhone: M(), isiOS6: L(), isIE8: P(), isIE: O(), isiOS7: K(), isIE11: N(), isHighDPR: G(), isMobileLayout: B, hasTransforms: F()}
                    };
                    e.gdt.Utils.Browser = new g
                }(document, window, window.jQuery || window.Zepto), function(e, d) {
                    d.gdt = d.gdt || {}, d.gdt.Utils = d.gdt.Utils || {};
                    var f = function() {
                        function b(c) {
                            d.console && d.console.log && d.console.log(c)
                        }
                        function h(c) {
                            d.console && d.console.warn && d.console.warn(c)
                        }
                        function g(c) {
                            d.console && d.console.error && d.console.error(c)
                        }
                        return{log: b, warn: h, error: g}
                    };
                    d.gdt.Utils.Console = new f
                }(document, window), function(e, d) {
                    function f(h, g) {
                        var k, j = g.split("."), i = h;
                        for (k = 0;
                                k < j.length;
                                k++) {
                            if (void 0 === i[j[k]]) {
                                i = void 0;
                                break
                            }
                            i = i[j[k]]
                        }
                        return i
                    }
                    d.gdt = d.gdt || {}, d.gdt.Utils = d.gdt.Utils || {}, d.gdt.Utils.Objects = d.gdt.Utils.Objects || {}, d.gdt.Utils.Objects.getPropByPathStr = f
                }(document, window), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.Utils = e.gdt.Utils || {};
                    var g = function() {
                        function b(m, d) {
                            this.src = m, this.dpr = d
                        }
                        function l(m, d) {
                            this.srcset = m, this.media = d
                        }
                        function k(m, d) {
                            return m.media > d.media ? -1 : m.media < d.media ? 1 : 0
                        }
                        function j(a) {
                            var d = [];
                            return a.find("[srcset]").each(function() {
                                var m, r, q, p = h(this), o = p.attr("srcset").split(","), n = [];
                                for (r = 0;
                                        r < o.length;
                                        r++) {
                                    o[r] = h.trim(o[r]), q = new b(h.trim(o[r].split(" ")[0]), h.trim(o[r].split(" ")[1])), n.push(q)
                                }
                                m = new l(n, p.attr("media") || "(min-width: 0px)"), d.push(m)
                            }), d.sort(k)
                        }
                        function i(m, d) {
                            for (var n = 0;
                                    n < m.length;
                                    n++) {
                                if (d === m[n].dpr) {
                                    return m[n].src
                                }
                            }
                        }
                        var c = function(m) {
                            var s, r, q, p, o = m.find('[type="text/x-tmpl"]'), n = h.trim(o.html());
                            if (s = h(n), r = j(s), !e.matchMedia || h(".ie8").length) {
                                return i(r[0].srcset, "1x")
                            }
                            for (q = 0;
                                    q < r.length;
                                    q++) {
                                if (e.matchMedia(r[q].media).matches) {
                                    return p = e.gdt.Utils.Browser.isHighDPR ? "2x" : "1x", i(r[q].srcset, p)
                                }
                            }
                        };
                        return{getImgSrcFromTemplate: c}
                    };
                    e.gdt.Utils.Picture = new g
                }(document, window, window.jQuery || window.Zepto), function(e, d) {
                    d.gdt = d.gdt || {}, d.gdt.Utils = d.gdt.Utils || {};
                    var f = function() {
                        var b = {modal: {open: "open modal", close: "close modal", opening: "modal opening", closing: "modal closing", productGallery: {open: "open product gallery", close: "close product gallery"}, verticalGallery: {open: "open vertical gallery", close: "close vertical gallery"}, basketError: {open: "open basket error", close: "close basket error"}, ipDetectionPopup: {open: "open ip warning", close: "close ip warning"}, loginOverlay: {open: "open login overlay", close: "close login overlay"}, homeVideo: {open: "open Home Video", close: "close Home Video"}}, shade: {open: "open shade", close: "close shade", opening: "shade opening", closing: "shade closing"}, paginatedList: {reinitialise: "refresh results", dealerList: {navigate: "navigate pagination"}}, commerceContentJSON: "commerce content JSON loaded", wishlistUpdated: "wishlist updated", basketUpdated: "basket updated", basketError: "basket error", loginOverlay: "login overlay", accordionContentUpdated: "accordion updated", ipDetectionPopup: "IP Detection Popup", productGallery: "Open Product Gallery", homeVideo: "Open Home Video", checkCountry: "check country", mapApiLoaded: "Maps API Loaded", mapApiNotLoaded: "Maps API Not Loaded", createCaptchaOnPage: "Create captcha now", languageSelectorPopupClose: "Close Language Selector", boutiqueTabClicked: "Boutique Tab Clicked", shippingTabClicked: "Shipping Tab Clicked", catalogueMsgClosed: "catalogue Msg Closed", baiduMaps: "Load Baidu Maps", tabClicked: "tab clicked"};
                        return{UI_EVENTS: b}
                    };
                    d.gdt.Utils.PubSub = new f
                }(document, window, window.jQuery || window.Zepto), function(e, d) {
                    function f() {
                        var b, j, i = d.location.search.substr(1), h = i.split("&"), g = {};
                        for (j = 0;
                                j < h.length;
                                j++) {
                            b = h[j].split("="), g[b[0]] = b[1]
                        }
                        return g
                    }
                    d.gdt = d.gdt || {}, d.gdt.Utils = d.gdt.Utils || {}, d.gdt.Utils.queryParams = f()
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    function g() {
                        var i;
                        if (h(".ie8").length || h(".ie9").length) {
                            var c = h('<textarea cols="10" rows="2"></textarea>').css({position: "absolute", top: -1000, left: -1000}).appendTo("body"), k = h('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position: "absolute", top: -1000, left: -1000}).appendTo("body");
                            i = c.width() - k.width(), c.add(k).remove()
                        } else {
                            var j = h("<div />").css({width: 100, height: 100, overflow: "auto", position: "absolute", top: -1000, left: -1000}).prependTo("body").append("<div />").find("div").css({width: "100%", height: 200});
                            i = 100 - j.width(), j.parent().remove()
                        }
                        return i
                    }
                    e.gdt = e.gdt || {}, e.gdt.Utils = e.gdt.Utils || {}, e.gdt.Utils.scrollWidth = g()
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.Utils = e.gdt.Utils || {};
                    var g = function() {
                        function b(c) {
                            if (!c) {
                                return void e.gdt.Utils.Console.warn("No template options")
                            }
                            var k, j = c.data, i = c.template;
                            return i = i.replace(/\{\{(.+?)\}\}/g, function(l, n) {
                                var m = e.gdt.Utils.Objects.getPropByPathStr(j, n);
                                return void 0 !== m ? m : n + "-is-undefined"
                            }), k = h(i)
                        }
                        return{render: b}
                    };
                    e.gdt.Utils.Template = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.Tracking = e.gdt.Tracking || {};
                    var g = function() {
                        function a6(d) {
                            return{"25%": parseInt(0.25 * d, 10), "50%": parseInt(0.5 * d, 10), "75%": parseInt(0.75 * d, 10), "100%": d - 5}
                        }
                        function a5(i, d, j) {
                            return d[i] && (j[i] = d[i]), j
                        }
                        function a4(i, d) {
                            for (var l = {}, k = {}, j = 0;
                                    j < i.length;
                                    j++) {
                                l = a5(i[j], d, k)
                            }
                            return l
                        }
                        function a3() {
                            var j = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop, i = j, a = a6(aC);
                            h.each(a, function(k, l) {
                                -1 === h.inArray(k, a8) && i >= l && (aF.event = "scrollLevel", aF.scrollLevel = k, aF = a4(["event", "scrollLevel"], aF), a8.push(k), e.gdt.Utils.Console.log(aF), aD.push(aF))
                            })
                        }
                        function a2(i) {
                            if (i) {
                                var d = i.indexOf("uid"), j = i.slice(d, i.length);
                                return j.replace("uid", "")
                            }
                        }
                        function a1(d) {
                            return d = d.replace(/(?:_| |\b)(\w)/g, function(j, i) {
                                return i.toUpperCase()
                            }), d = d.charAt(0).toLowerCase() + d.slice(1).replace("-", "")
                        }
                        function a0(d) {
                            return d
                        }
                        function aZ(i) {
                            if (i) {
                                for (var d in i) {
                                    (null === i[d] || void 0 === i[d] || i[d] && 0 === i[d].length || "object" == typeof i[d] && 0 === i[d].length || "object" == typeof i[d] && 0 === h.map(i[d], a0).length) && delete i[d]
                                }
                            }
                        }
                        function aY(j) {
                            for (var i = [], k = j.length - 1;
                                    k >= 0;
                                    k--) {
                                i.push(h(j[k]).find("h1").text())
                            }
                            return i.reverse().toString()
                        }
                        function aX(p) {
                            if (p = h(p), 0 !== p.length) {
                                if (ap = p.data("trackable-cache") ? p.data("trackable-cache") : p.data("trackable") ? p.data("trackable") : !1, ao = p.data("tracking-event") ? p.data("tracking-event") : p[0].event ? p[0].event : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.event : "", an = p.data("tracking-label") ? p.data("tracking-label") : p[0].label ? p[0].label : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.label : "", aF.category = p.data("tracking-category") ? p.data("tracking-category") : p[0].category ? p[0].category : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.category : "", aF.productCategory = p.data("tracking-productcategory") ? p.data("tracking-productcategory") : p[0].productCategory ? p[0].productCategory : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.productCategory : "", aF.productCollection = p.data("tracking-productcollection") ? p.data("tracking-productcollection") : p[0].productCollection ? p[0].productCollection : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.productCollection : "", aF.productSKU = p.data("tracking-productsku") ? p.data("tracking-productsku") : p[0].productSKU ? p[0].productSKU : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.productSKU : "", aF.productName = p.data("tracking-productname") ? p.data("tracking-productname") : p[0].productName ? p[0].productName : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.productName : "", aF.refillSKU = p.data("tracking-refillsku") ? p.data("tracking-refillsku") : p[0].refillSKU ? p[0].refillSKU : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.refillSKU : "", aF.shoppingBagValue = p.data("tracking-shoppingbagvalue") ? p.data("tracking-shoppingbagvalue") : p[0].shoppingBagValue ? p[0].shoppingBagValue : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.shoppingBagValue : "", aF.productAvailability = p.data("tracking-productavailability") ? p.data("tracking-productavailability") : p[0].productAvailability ? p[0].productAvailability : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.productAvailability : "false", aF.siteSearchTerm = am ? am : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.siteSearchTerm : "", aF.siteSearchResults = al ? al : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.siteSearchResults : "", aF.page = p.data("tracking-page") ? p.data("tracking-page") : e.gdt.Tracking.trackingObject.page ? e.gdt.Tracking.trackingObject.page : document.location.pathname, aF.productEvent = e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.productEvent : "", aF.visitorStatus = e.gdt.Utils.checkCookie("RCHMFrontEndCookie") ? "loggedin" : "guest", aF.pageCategory = e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.pageCategory : "", aF.language = e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.trackingLanguage : "", aF.market = e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.trackingMarket : "", aF.summaryPaymentMethod = e.gdt.Tracking.trackingObject.summaryPaymentMethod ? e.gdt.Tracking.trackingObject.summaryPaymentMethod : {}, aF.searchLink = p.data("tracking-kw") ? p.data("tracking-kw") : p[0].kw ? p[0].kw : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.kw : "", aF.additionalFooterLink = p.data("tracking-additionalfooterlink") ? p.data("tracking-additionalfooterlink") : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.additionalFooterLink : "", aF.bannerTheme = p.data("tracking-theme") ? p.data("tracking-theme") : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.bannerTheme : "", aF.bannerPosition = p.data("tracking-position") ? p.data("tracking-position") : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.bannerPosition : "", aF.Product_subsection = p.data("tracking-Product_subsection") ? p.data("tracking-Product_subsection") : p[0].Product_subsection ? p[0].Product_subsection : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.Product_subsection : "", aF.Product_type = p.data("tracking-Product_type") ? p.data("tracking-Product_type") : p[0].Product_type ? p[0].Product_type : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.Product_type : "", aF.view = p.data("tracking-view") ? p.data("tracking-view") : p[0].view ? p[0].view : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.view : "", aF.itemlookup = p.data("tracking-itemlookup") ? p.data("tracking-itemlookup") : p[0].itemlookup ? p[0].itemlookup : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.itemlookup : "", aF.item = p.data("tracking-item") ? p.data("tracking-item") : p[0].item ? p[0].item : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.item : "", aF.applatform = p.data("tracking-applatform") ? p.data("tracking-applatform") : p[0].applatform ? p[0].applatform : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.applatform : "", aF.socialNetwork = p.data("tracking-socialnetwork") ? p.data("tracking-socialnetwork") : p[0].socialnetwork ? p[0].socialnetwork : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.socialnetwork : "", aF.socialAction = p.data("tracking-socialaction") ? p.data("tracking-socialaction") : p[0].socialaction ? p[0].socialaction : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.socialaction : "", aF.socialTarget = p.data("tracking-socialtarget") ? p.data("tracking-socialtarget") : p[0].socialtarget ? p[0].socialtarget : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.socialtarget : "", aF.website = p.data("tracking-website") ? p.data("tracking-website") : p[0].website ? p[0].website : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.website : "", aF.download_type = p.data("tracking-downloadtype") ? p.data("tracking-downloadtype") : p[0].downloadtype ? p[0].downloadtype : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.downloadtype : "", aF.boutique = p.data("tracking-boutique") ? p.data("tracking-boutique") : p[0].boutique ? p[0].boutique : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.boutique : "", aF.section = p.data("tracking-section") ? p.data("tracking-section") : p[0].section ? p[0].section : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.section : "", aF.boutique = p.data("tracking-boutique") ? p.data("tracking-boutique") : p[0].boutique ? p[0].boutique : e.gdt.Tracking.trackingObject ? e.gdt.Tracking.trackingObject.boutique : "", aF.boutiqueId = p.data("tracking-boutiqueId") ? p.data("tracking-boutiqueId") : "", aF.boutiqueCity = p.data("tracking-boutiqueCity") ? p.data("tracking-boutiqueCity") : "", aF.boutiqueName = p.data("tracking-boutiqueName") ? p.data("tracking-boutiqueName") : "", ad = e.gdt.Tracking.transactionTrackingObject ? e.gdt.Tracking.transactionTrackingObject : {}, ak = e.gdt.Tracking.trackingObject.errorType ? e.gdt.Tracking.trackingObject.errorType : "", ai = h("input[name=termsAndCondition]") || "", ah = p.data("tracking-newsletter") ? p.data("tracking-newsletter") : h("input[name=newsletter]").attr("checked") ? "true" : "false", ag = h("select[name=country]").val() || "", ae = h("select[id=globalcountry]").val() || "", af = h("select[name=topic]").val() || "", ac = h("select[name=messageCard_0]").val(), aZ(aF), ao && ao.length > 0 && (ao = a1(ao), aF.event = ao), an && an.length > 0 && (aF.label = an), aF && aF.page && -1 !== aF.page.indexOf("home.html") && h(e).on("scroll", a3), ao && -1 !== ao.indexOf("homepageBannerClicked") && (aF = a4(["event", "bannerTheme", "bannerPosition"], aF)), ao && ("loggedIn" === ao || "showCollectionsHeader" === ao || "discoverHeader" === ao || "findMontblancHeader" === ao || "myMontblanc" === ao || "proceedToCheckout" === ao || "logIn" === ao || "zoom" === ao || "allDetails" === ao || "productCare" === ao || "callAConcierge" === ao || "continueShopping" === ao || "signUp" === ao && -1 === document.location.pathname.indexOf("account/register/confirmation") || "contactFooter" === ao || "corporateGiftShopFooter" === ao || "corporateGiftShopFooter" === ao || "customServicesFooter" === ao || "termsAndLegalFooter" === ao || "montblancAppsFooter" === ao || "signUpFromWishlist" === ao || "logInFromWishlist" === ao) && (aF = a4(["event"], aF)), ao && "socialShareProductPage" === ao && (aF = a4(["event", "label"], aF)), ao && "socialShareProductPage" === ao && an && "print" === an && (aF.event = "printProduct", aF = a4(["event"], aF)), ao && "bookmarkArticleFromPrivateSection" === ao) {
                                    var s = aF.page, q = s.lastIndexOf("/"), k = s.lastIndexOf(".");
                                    s = s.slice(q + 1, k), aF.articleTitle = s, aF = a4(["event", "articleTitle"], aF)
                                }
                                if (ao && "collectionClicked" === ao && (aF.category = aF.productCategory, aF.collection = aF.productCollection, aF = a4(["event", "category", "collection"], aF)), ao && "logInWithSocial" === ao && (-1 !== document.location.href.indexOf("reservation.get-reservations") ? (aF.event = "virtualPageview", aF.page = "checkout/loginwithsocialnetwork/" + an, aF = a4(["event", "page"], aF)) : aF = a4(["event", "label"], aF)), aF.page && -1 !== aF.page.indexOf("account/newsletter-register") && ak && ak.length > 0 && (aF.event = "submitNewsletterWithError", aF.errorType = ak, aF = a4(["event", "errorType"], aF)), aF.page && -1 !== aF.page.indexOf("newsletter-register/confirmation") && (-1 !== aF.page.indexOf("success") ? (aF.page = aF.page + "/newslettersubscriptionvalidated", aF = a4(["page"], aF)) : (aF.page = aF.page + "/newslettercompleted", aF.event = "newsletterSubscribed", aF = a4(["event", "page"], aF))), ao && "signUp" === ao || aF.page && -1 !== aF.page.indexOf("account/register")) {
                                    if (ak && ak.length > 0) {
                                        aF.event = "createAnAccountError", aF.errorType = ak, aF = a4(["event", "errorType"], aF)
                                    } else {
                                        if (-1 !== document.location.pathname.indexOf("confirmation")) {
                                            var j = e.gdt.Utils.checkCookie("registerFormObj");
                                            j && (aF = JSON.parse(decodeURIComponent(j)), az("registerFormObj"))
                                        }
                                    }
                                }
                                if (ao && "additionalFooterLinkClicked" === ao && (aF = a4(["event", "additionalFooterLink"], aF)), ao && "newsletterform" === ao && (aF.page = aF.page + "/newsletterform", aF = a4(["page"], aF)), ao && (ao && "addToWishlistProductPage" === ao || "removeFromWishlistProductPage" === ao) && aF.page && -1 === aF.page.indexOf("refill") && (aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Homepage") && "addToWishlistProductPage" === ao ? (aF.event = "addToWishlistHomePage", aF = a4(["event", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)) : aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Homepage") && "removeFromWishlistProductPage" === ao ? (aF.event = "removeWishlistHomePage", aF = a4(["event", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)) : aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Catalogue page") && "addToWishlistProductPage" === ao ? (aF.event = "addToWishlistCataPage", aF = a4(["event", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)) : aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Catalogue page") && "removeFromWishlistProductPage" === ao ? (aF.event = "removeWishlistCataPage", aF = a4(["event", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)) : aF = a4(["event"], aF)), aF && aF.searchLink && "searchResult" === ao && (aF = a4(["siteSearchTerm"], aF)), ao && "nibSelected" === ao && (aF = a4(["event", "nibSelected"], aF)), ao && "boutiqueSearch" === ao && -1 !== document.location.pathname.indexOf("zh-cn/boutique") && (aF = a4(["event", "citySelected"], aF)), ao && "boutiqueResultClicked" === ao && -1 !== document.location.pathname.indexOf("zh-cn/boutique") && (aF = a4(["event", "citySelected", "boutiqueName"], aF)), ao && "addToBagProductPage" === ao && ao && "productClickedOnCollectionOrCataloguePage" !== ao && (aF.label = aF.pageCategory + "-" + aF.productCollection + "-" + aF.productSKU, aF && aF.pageCategory && "Homepage" === aF.pageCategory ? aF.event = "addToBagHomePage" : aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Catalogue page") && (aF.event = "addToBagCatePage"), aF.refillSKU && aF.refillSKU.length > 0 ? (aF.event = "addToBagRefill", aF.refillSKU = aF.refillSKU ? aF.refillSKU : aF.productSKU, aF = a4(["event", "label", "productCategory", "productCollection", "productSKU", "refillSKU", "shoppingBagValue"], aF)) : aF = a4(["event", "label", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)), ao && "productClickedOnCollectionOrCataloguePage" === ao && (aF.productAvailability = aF.productAvailability ? aF.productAvailability : "false", aF = a4(["event", "productCategory", "productCollection", "productSKU", "productAvailability"], aF)), aF && aF.pageCategory && "productPage" === aF.pageCategory && ao && -1 === ao.indexOf("addToBagProductPage") && -1 === ao.indexOf("countrySelectorFooter") && (ao && "findRefills" === ao || "findABoutique" === ao ? (aF.event = ao, aF = a4(["event", "productCategory", "productCollection", "productSKU"], aF)) : (aF.label = aF.pageCategory + "-" + aF.productCollection + "-" + aF.productSKU, aF = a4(["label", "pageCategory", "productCollection", "productSKU"], aF))), (ao && "addToBagFromWishlist" === ao || "addToWishlistFromBag" === ao && aF.page && -1 === aF.page.indexOf("refill")) && (aF && aF.pageCategory && "Homepage" === aF.pageCategory ? aF.event = "addToWishlistHomePage" : aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Catalogue page") && (aF.event = "addToWishlistCataPage"), aF = a4(["event", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)), (ao && "buyRefillsNow" === ao || "confirmEngraving" === ao) && (aF.event = ao, aF = a4(["event", "productCategory", "productCollection", "productSKU"], aF)), (ao && "removeFromShoppingBag" === ao || "removeFromWishlist" === ao) && (aF = a4(["event", "productCategory", "productCollection", "productSKU", "shoppingBagValue"], aF)), ao && "addToBagRefill" === ao && (aF.refillSKU = aF.refillSKU ? aF.refillSKU : aF.productSKU), ao && "virtualPageview" === ao && (aF = a4(["event", "page"], aF)), am && al && (aF = a4(["siteSearchTerm", "siteSearchResults"], aF)), ao && "virtualPageview" === ao && aF.page && -1 !== aF.page.indexOf("shopping/checkout") && -1 === aF.page.indexOf("payment.html") && (aF.event = "virtualPageview", aF.page = aF.page.replace(".html", "") + "/pickfromprofile", aF = a4(["event", "page"], aF)), aF && aF.page && -1 !== aF.page.indexOf("billing-shipping.html") && void 0 !== h("#submitBoutique").find('input[name="shipping.deliveryBoutiqueCode"]').val() && 0 === h("#submitBoutique").find('input[name="shipping.deliveryBoutiqueCode"]').val().length ? aF.page = aF.page + "/homedelivery" : aF && aF.page && -1 !== aF.page.indexOf("billing-shipping.html") && void 0 !== h("#submitBoutique").find('input[name="shipping.deliveryBoutiqueCode"]').val() && h("#submitBoutique").find('input[name="shipping.deliveryBoutiqueCode"]').val().length && (aF.page = aF.page + "/boutiquepickup"), h("#orderReviewBTQP").length && aF && aF.page && -1 !== aF.page.indexOf("order-review.html") ? (aF.page = aF.page + "/boutiquepickup", aF.boutiqueId = document.getElementById("trackingOrderReviewBTQPId").value, aF.boutiqueCity = document.getElementById("trackingOrderReviewBTQPCity").value, aF.boutiqueName = document.getElementById("trackingOrderReviewBTQPName").value) : !h("#orderReviewBTQP").length && aF && aF.page && -1 !== aF.page.indexOf("order-review.html") && (aF.page = aF.page + "/homedelivery"), h("#orderReviewBTQP").length && aF && aF.page && h("#creditCard").is(":checked") && -1 !== aF.page.indexOf("payment.html") ? aF.page = aF.page + "/boutiquepickup" : !h("#orderReviewBTQP").length && aF && aF.page && h("#creditCard").is(":checked") && -1 !== aF.page.indexOf("payment.html") && (aF.page = aF.page + "/homedelivery"), (ao && "countrySelectorFooter" === ao || "socialShareFooter" === ao || "socialWishlist" === ao) && (aF = a4(["event", "label"], aF)), aF && aF.page && -1 !== aF.page.indexOf("/register/confirmation/success") && (aF.page = aF.page + "/accountcreationconfirmed", aF = a4(["page"], aF)), aF && aF.pageCategory && "Checkout" === aF.pageCategory && (aF.page = e.gdt.Utils.checkCookie("RCHMFrontEndCookie") ? document.location.pathname + "/checkout/billingandshippinginformation/loggedin" : document.location.pathname + "/checkout/billingandshippinginformation/guest"), aF && aF.page && aF.page.indexOf("/checkout/paymentmethod/") >= 0 && (aF.page = aF.page + aF.visitorStatus, aF = a4(["page"], aF)), h("#orderReviewBTQP").length && ad && ad && "virtualPageview" !== ao && ad.transactionId) {
                                    var t = aF.visitorStatus;
                                    aF = ad, aF.visitorStatus = t, aF.page = document.location.pathname + "/boutiquepickup", aF = a4(["country", "transactionCurrency", "transactionId", "transactionPaymentMethod", "transactionProducts", "transactionShipping", "transactionTax", "transactionTotal", "visitorStatus", "messageSelected", "page"], aF)
                                } else {
                                    if (!h("#orderReviewBTQP").length && ad && ad && "virtualPageview" !== ao && ad.transactionId) {
                                        var t = aF.visitorStatus;
                                        aF = ad, aF.visitorStatus = t, aF.page = document.location.pathname + "/homedelivery", aF = a4(["country", "transactionCurrency", "transactionId", "transactionPaymentMethod", "transactionProducts", "transactionShipping", "transactionTax", "transactionTotal", "visitorStatus", "messageSelected", "page"], aF)
                                    }
                                }
                                if (aF && aF.transactionId && "guest" === aF.visitorStatus && ak && ak.length > 0 && (aF.event = "createAnAccountErrorAfterCheckOut", aF.errorType = ak, aF = a4(["event", "errorType"], aF)), aF && aF.page && -1 !== aF.page.indexOf("shopping/guest/order-confirmation/confirmation")) {
                                    var r = e.gdt.Utils.checkCookie("registerFormObj");
                                    r ? (aF = JSON.parse(decodeURIComponent(r)), aF.accountCreationAfterCheckOut = aF.accountCreation ? "true" : "false", aF = a4(["accountCreationAfterCheckOut", "newsletterSubscription"], aF), az("registerFormObj")) : -1 !== aF.page.indexOf("success") ? (aF.page = aF.page + "/accountcreationconfirmedafterguestcheckout", aF = a4(["page"], aF)) : (aF.accountCreationAfterCheckOut = aF.accountCreation ? "true" : "false", aF = a4(["accountCreationAfterCheckOut", "newsletterSubscription"], aF))
                                }
                                return aF && aF.summaryPaymentMethod && a4(["summaryPaymentMethod", "page"], aF), aF && aF.page && -1 !== aF.page.indexOf("checkout-login") && "logInWithSocial" !== ao && (aF.page = e.gdt.Utils.checkCookie("RCHMFrontEndCookie") ? aF.page + "/checkout/selection/loggedin" : aF.page + "/checkout/selection/guest", aF = a4(["page"], aF)), aF && aF.pageCategory && -1 !== aF.pageCategory.indexOf("Contact page") && ai.attr("checked") && (aF.contactConfirmation = ai.attr("checked") ? "true" : "false", aF.newsletterSubscription = ah, aF.countryContact = ag, aF.topic = af, aF.selectedShop = aY(h(".country_" + ae)), aF = a4(["contactConfirmation", "newsletterSubscription", "countryContact", "topic", "selectedShop"], aF)), ao && "boutiqueSearch" !== ao && "boutiqueResultClicked" !== ao && "confirmEngraving" !== ao && "addToBagProductPage" !== ao && !ap && "signUp" !== ao && "createAnAccountError" !== ao && aF && aF.page && -1 !== aF.page.indexOf("checkout-login") && (e.gdt.Utils.checkCookie("RCHMFrontEndCookie").length > 0 ? (aF.userId = a2(e.gdt.Utils.checkCookie("RCHMFrontEndCookie")), aF.visitorStatus = e.gdt.Utils.checkCookie("RCHMFrontEndCookie") ? "loggedin" : "guest", aF.pageCategory && aF.pageCategory.length > 0 && (aF.pageCategory = aF.pageCategory)) : aF && "loggedIn" !== ao && (aF.visitorStatus = e.gdt.Utils.checkCookie("RCHMFrontEndCookie") ? "loggedin" : "guest", aF.pageCategory && aF.pageCategory.length > 0 && (aF.pageCategory = aF.pageCategory)), ao && "CollectionClicked" === ao && (aF = a4(["event", "productCategory", "productCollection"], aF))), ao && ao.indexOf("subCategoryOf") >= 0 && (aF = a4(["event", "label"], aF)), aF && "loggedin" === aF.visitorStatus && (aF.userId = a2(e.gdt.Utils.checkCookie("RCHMFrontEndCookie"))), ao && "itemDisplay" === ao && (aF = a4(["event", "Product_subsection", "Product_type", "view"], aF)), ao && "accessoriesLookup" === ao && (aF = a4(["event", "itemlookup", "item"], aF)), ao && "productPageNightView" === ao && (aF = a4(["event", "Product_page"], aF)), ao && "productPagePrint" === ao && (aF = a4(["event", "Product_page"], aF)), ao && "productPageSectionClicked" === ao && (aF = a4(["event", "Product_page", "Section"], aF)), ao && "productPageSectionClicked" === ao && (aF = a4(["event", "Product_page", "Section"], aF)), (ao && "searchEboutiqueBoxTicked" === ao || "eboutiqueBoxTicked" === ao) && (aF = a4(["event", "box_name"], aF)), (ao && "productPageViewAll" === ao || "productPagePurchase" === ao || "productPageAddToWishlist" === ao || "ppComparatorFeatures" === ao || "viewComparator" === ao) && (aF = a4(["event", "Product_page"], aF)), ao && "productOverlay" === ao && (aF = a4(["event", "Product_page", "overlayAction"], aF)), ao && "comparatorPageAction" === ao && (!aF.comparatorPageFeatures && aF.socialAction && (aF.comparatorPageFeatures = aF.socialAction), aF = a4(["event", "comparatorPageFeatures"], aF)), ao && "comparatorPageCombinations" === ao && (aF = a4(["event", "productCategory", "comparisonProduct1", "comparisonProduct2", "comparisonProduct3"], aF)), ao && "saveAsPDFFromWishlist" === ao && (aF = a4(["event", "productSKU"], aF)), ao && "removeItemShoppingbag" === ao && (aF = a4(["event", "productSKU"], aF)), ao && "removeFromWishlist" === ao && (aF = a4(["event", "productSKU"], aF)), (ao && -1 !== ao.indexOf("outiqueReset") || "createAccountHeader" === ao || "discoverMoreHome" === ao || "historyTimeline" === ao || "dateChoose" === ao || "signinReset" === ao) && (aF = a4(["event"], aF)), ao && "platformClickFooter" === ao && (aF = a4(["event", "applatform"], aF)), ao && "social" === ao && (aF = a4(["event", "socialNetwork", "socialAction", "socialTarget"], aF)), ao && "worldLinkFooter" === ao && (aF = a4(["event", "website"], aF)), ao && "download" === ao && (aF = a4(["event", "download_type"], aF)), ao && "boutiqueSectionClicked" === ao && (aF = a4(["event", "boutique", "section"], aF)), ao && "boutiqueEmail" === ao && (aF = a4(["event", "boutique"], aF)), ao && "accessoriesDropdown" === ao && (aF = a4(["event", "dropdownchoice", "item"], aF)), ao && "specialEditionClicked" === ao && (aF = a4(["event", "boutique"], aF)), ao && "chooseBoutique" === ao && (aF = a4(["event", "boutiqueId", "boutiqueCity", "boutiqueName"], aF)), ao && "wishlistaction" === ao && (aF = a4(["event", "wishlistFeatures"], aF)), aF
                            }
                        }
                        function aW(d) {
                            ("loggedIn" !== d.event || e.gdt.Utils.checkCookie("RCHMFrontEndCookie")) && (aD.push(d), e.gdt.Utils.Console.log(d))
                        }
                        function aV(i) {
                            var d = {"tracking-event": "virtualPageview", "tracking-page": document.location.pathname + "/paypal"};
                            i = h(i.target), i.data(d), aU(i)
                        }
                        function aU(d) {
                            aF = aX(d), aF && aF.event && "findRefills" === aF.event || "productCare" === aF.event || "montblancAppsFooter" === aF.event || "contactFooter" === aF.event || "corporateGiftShopFooter" === aF.event || "customServicesFooter" === aF.event || "termsAndLegalFooter" === aF.event || "findMontblancHeader" === aF.event || "productClickedOnCollectionOrCataloguePage" === aF.event || "signUp" === aF.event ? aO(aF) : aW(aF)
                        }
                        function aT(i, k) {
                            var j = i ? i.currentTarget : i ? i.target : e.gdt.Tracking.trackingObject;
                            k && (j = k), 0 !== j.length && aU(j)
                        }
                        function aS(i) {
                            var d = {"tracking-productcollection": h(i).find("input[name=productCollection]").val() || "", "tracking-productcategory": h(i).find("input[name=productCategory]").val() || "", "tracking-productsku": h(i).find("input[name=productSKU]").val() || "", "tracking-event": h(i).find("input[name=event]").val() || "", "tracking-shoppingbagvalue": h(i).find("input[name=shoppingbagvalue]").val() || "", "tracking-productavailability": h(i).find("input[name=productAvailability]").val() || "false"};
                            return d
                        }
                        function aR(i) {
                            var d = aS(i.target);
                            i = h(i), i.data(d), aU(i)
                        }
                        function aQ(d) {
                            aF.event = "nibSelected", aF.nibSelected = h(d.target).find("option").filter(function() {
                                return h(this).prop("selected") === !0
                            })[0].innerHTML, aF = aX(aF), aW(aF)
                        }
                        function aP(d) {
                            aF.strapSelected = h(d.target).find("option").filter(function() {
                                return h(this).prop("selected") === !0
                            })[0].innerHTML, aF.event = h(d.target).find("option:selected").data("tracking-event"), aF.dropdownchoice = h(d.target).find("option:selected").data("tracking-dropdownchoice"), aF.item = h(d.target).find("option:selected").data("tracking-item"), aF = aX(aF), aW(aF)
                        }
                        function aO(i, k) {
                            k = k || "trackingObject";
                            var j = {path: "/", domain: e.gdt.domainName};
                            h.cookie(k, JSON.stringify(i), j)
                        }
                        function aN() {
                            return aj = e.gdt.Utils.checkCookie("trackingObject").length > 0 ? !0 : !1
                        }
                        function aM(d) {
                            var i = d ? d.currentTarget : d ? d.target : e.gdt.Tracking.trackingObject;
                            aF = aX(i), aF && aF.event && -1 !== aF.event.indexOf("Header") || -1 === aF.event.indexOf("wishlistFromHeader") || -1 === aF.event.indexOf("discoverMoreHome") || -1 === aF.event.indexOf("worldLinkFooter") ? aW(aF) : (delete aF.pageCategory, aO(aF))
                        }
                        function aL(i) {
                            var d = {"tracking-page": document.location.pathname + "/confirmengraving", "tracking-event": "virtualPagePreview"};
                            i = h(i.target), i.data(d), aU(i)
                        }
                        function aK(i) {
                            var d = {"tracking-page": document.location.pathname + "/find-your-panerai", "tracking-event": "virtualPageview"};
                            i = h(i.target), i.data(d), aU(i)
                        }
                        function aJ(i) {
                            var d = {"tracking-event": "loggedIn"};
                            i = h(i.target), i.data(d), aF = aX(i), aO(aF)
                        }
                        function aB() {
                            var d = {};
                            aF.page && -1 !== aF.page.indexOf("shopping/guest/order-confirmation/confirmation/success") ? d = {signinWithNewsletter: h("input[name=paneraiupdates]").prop("checked") ? "true" : "false", accountCreationAfterCheckOut: "true"} : h("input[name=paneraiupdates]").prop("checked") === !0 && (d = {event: "signinWithNewsletter"}), aO(d, "registerFormObj")
                        }
                        function aA(i) {
                            var d = {"tracking-page": document.location.pathname + "/contact-concierge-success", "tracking-event": "virtualPageview"};
                            i = h(i.target), i.data(d), aU(i)
                        }
                        function az(i) {
                            var j = {path: "/", domain: e.gdt.domainName, expires: -1};
                            h.cookie(i, "", j)
                        }
                        function ay() {
                            var d = e.gdt.Utils.checkCookie("trackingObject");
                            aW(JSON.parse(decodeURIComponent(d))), az("trackingObject")
                        }
                        function ax(d) {
                            aF.event = "boutiqueSearch", aF.citySelected = h(d.target).find("option").filter(function() {
                                return h(this).prop("selected") === !0
                            })[0], aF.citySelected = h(aF.citySelected).data("tracking-label"), aF = aX(aF), aW(aF)
                        }
                        function aw(d) {
                            aF.event = h(d.target).parents("button").data("tracking-event") || h(d.target).parents("a").data("tracking-event") || h(d.target).data("tracking-event"), aF.productSKU = h(d.target).parents("button").data("tracking-productsku") || h(d.target).data("tracking-productsku"), aF.productName = h(d.target).parents("button").data("tracking-productname") || h(d.target).data("tracking-productname"), aF.Product_page = h(d.target).parents("button").data("tracking-page") || h(d.target).data("tracking-page") || h(d.target).parents("a").data("tracking-page"), aF.Section = h(d.target).data("tracking-section"), aF.box_name = h(d.target).data("tracking-boxname"), aF.comparatorPageFeatures = h(d.target).data("tracking-comparatorfeature") || h(d.target).data("tracking-comparatorfeature") || h(d.target).parents("a").data("tracking-comparatorfeature"), aF.wishlistFeatures = h(d.target).parents("button").data("tracking-wishlistfeatures") || h(d.target).data("tracking-wishlistfeatures") || h(d.target).parents("a").data("tracking-wishlistfeatures"), aF.overlayAction = h(d.target).parents("button").data("tracking-action") || h(d.target).parents("a").data("tracking-action") || h(d.target).data("tracking-action"), aF = aX(aF), aW(aF), "viewComparator" === aF.event ? av() : "comparatorPageAction" === aF.event && "navigate" === aF.comparatorPageFeatures && aO(aF)
                        }
                        function av() {
                            var d = {"/from": "ProductPage"};
                            aO(d)
                        }
                        function au(i, d) {
                            aF.event = d.trackevent, aF.productCategory = d.productCategory, aF.comparisonProduct1 = d.comparisonProduct1, aF.comparisonProduct2 = d.comparisonProduct2, aF.comparisonProduct3 = d.comparisonProduct3, aF = aX(aF), aW(aF)
                        }
                        function at(d) {
                            aF.event = h(d.target).parents("button").data("tracking-event") || h(d.target).data("tracking-event"), aF.Product_page = h(d.target).parents("button").data("tracking-productpage") || h(d.target).data("tracking-productpage"), aF = aX(aF), aW(aF)
                        }
                        function ar(i) {
                            var d = h(i.target);
                            aF.event = "boutiqueResultClicked", aF.boutiqueName = d.data("tracking-value"), aF.citySelected = d.data("tracking-key"), aF = aX(aF), aW(aF)
                        }
                        function aq(j) {
                            if (j) {
                                var i = Math.round(j.currentTime()), m = Math.round(j.duration()), l = "<25%", k = Math.round(i / m * 100);
                                return k >= 25 && (l = "25%"), k >= 50 && (l = "50%"), k >= 75 && (l = "75%"), 100 === k && (l = "100%"), l
                            }
                        }
                        var ap, ao, an, am, al, ak, aj, ai, ah, ag, af, ae, ad, ac, ab = "undefined" == typeof e.ontouchstart ? "click" : "touchend", aF = e.gdt.trackingObject || {}, a8 = [], aC = h(e).height(), a7 = h("body"), aG = e.gdt.Utils.noWCM, aD = e.dataLayer || [], b = e.gdt.Utils.PubSub.UI_EVENTS, aH = function(d) {
                            return d = d || 0
                        }, aE = function(d) {
                            d = d || "", e.gdt.Tracking.trackingObject && "Shopping Bag" !== e.gdt.Tracking.trackingObject.pageCategory && d.length > 0 ? (e.gdt.Tracking.trackingObject.errorType = d, aX(e.gdt.Tracking.trackingObject), aW(aF)) : e.gdt.Tracking.trackingObject.errorType = ""
                        }, c = function(j, i) {
                            var k = {event: "videoInteraction", videoStatus: "Played " + aq(j), videoInteractions: i + " Video"};
                            -1 !== k.videoStatus.indexOf("100%") && (k.videoInteractions = "Ended Video"), h("#" + j.id_).parent().data("tracking-nameofthevideo") && (k.nameOfTheVideo = h("#" + j.id_).parent().data("tracking-nameofthevideo")), aW(k)
                        }, aI = function(j, i) {
                            var l, k = h(this);
                            k.hasClass("cleftarrow") ? l = "left" : k.hasClass("crightarrow") && (l = "right");
                            var i = {event: "historyArrow", direction: l};
                            aW(i)
                        };
                        return a7.on("filters:filter:added", function(i, d) {
                            d.event = "filterProduct", aW(d)
                        }), a7.on("filters:sort", function(i, d) {
                            d.event = "sortProduct", aW(d)
                        }), a7.on("print", function() {
                            -1 !== document.location.pathname.indexOf("collection") && aW({event: "printProduct"})
                        }), a7.on("boutique:results", function(i, d) {
                            d.event = "boutiqueSearch", aW(d)
                        }), a7.on("boutique:result:clicked", function(i, d) {
                            d.event = "boutiqueResultClicked", aW(d)
                        }), a7.on("boutique:pin:clicked", function(i, d) {
                            var d = {event: "pinsClicked"};
                            aW(d)
                        }), a7.on("change", "select[name=product-path]", aQ), a7.on(ab, "a[data-trackable=true]", aT), a7.on(ab, "li[data-trackable=true]", aT), h("a[data-trackable-cache=true]").on(ab, aM), a7.on("submit", ".contactform[data-trackable-cache=true] form", aM), a7.on("submit", "form[name=login-form]", aJ), a7.on("submit", "form[name=registration]", aB), a7.on("submit", "form[name=contact-concierge-form]", aA), a7.on("submit", "form[name=checkout-payment]", aV), a7.on("submit", "form[data-trackable=true]", aR), a7.on("submit", "form[data-trackable-cache=true]", aM), a7.on("basketUpdated", aT), a7.on("wishlistUpdated", aT), a7.on("engravingLightboxClose", aL), h(".findPan").on(ab, aK), a7.on("collectionsViewFilter", aT), h(".cta-nightview").on(ab, aw), h(".cta-print").on(ab, aw), a7.on(ab, ".newWishList", aw), h("#js-product-details li").find("a").on(ab, aw), h(".eboutique-filter").find("input[type=checkbox]").on(ab, aw), a7.on(ab, ".cta-purchase", aw), h(".view-all").on(ab, at), a7.on(ab, "button[data-trackable=true]", aT), h(".product-detail .cta-gallery").on(ab, aT), h(".accMoreFilters").find("input[type=checkbox]").on(ab, aw), h("#accFilters").find("input[type=radio]").on(ab, aT), h("#newShippingOptions").find(".accordion-tabs-nav li").on(ab, aT), a7.on("strapsBraceSelector", aT), a7.on("specialEditionClick", aT), h(".comparator-btn").on(ab, aw), h(".view-comparator-btn").on(ab, aw), a7.on(ab, ".product-list-item-compare-btn", aw), a7.on(ab, ".view-comparison", function(d) {
                            aw(d)
                        }), a7.on(ab, ".removeProduct", aw), a7.on(ab, ".edit-compare-list", aw), h.pubsub("subscribe", b.tabClicked, au), h(".saveIcon, .socialShare, .printWishlistSlide").on(ab, aw), a7.on(ab, ".image-wrapper", aw), setTimeout(function() {
                            h("#js-timeline-content-carousel > a").on(ab, aI)
                        }, 1000), a7.on("change", ".news-filter select", aT), a7.on("change", ".accFilters select", aP), -1 !== document.location.pathname.indexOf("zh-cn/boutique") && (a7.on("change", "select.topic-picker", ax), a7.find(".montblanc-accordion").find("dt").on(ab, ar)), aG && (aN() ? (ay(), aT()) : aT()), {trackingValidation: aE, homepageTrackingSlideNumber: aH, videoTracking: c}
                    };
                    e.gdt.Tracking.PANtracking = new g, e.gdt.Tracking.trackingObject = e.trackingObject || {}
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.bmapWithMarker = function() {
                        var b = d.BMap;
                        return this.each(function(a, n) {
                            function m() {
                                var g = new b.Map(k), h = new b.Point(l.data("lng"), l.data("lat"));
                                b.Convertor.translate(h, 2, function(q) {
                                    g.enableScrollWheelZoom(), g.centerAndZoom(q, 15), g.addControl(new b.NavigationControl), g.addControl(new b.ScaleControl), g.addControl(new b.OverviewMapControl), g.addControl(new b.MapTypeControl);
                                    var p = q.lat + "," + q.lng, o = c.replace("latlng=&", "latlng=" + p + "&");
                                    j.attr("href", o);
                                    var i = new b.Marker(q);
                                    g.addOverlay(i)
                                })
                            }
                            var l = f(n), k = l.prop("id"), j = l.siblings(".boutique-info").find(".china-maplinks a:first"), c = j.attr("href");
                            l.hasClass("js-dealer-map") && (j = f(this).siblings(".dealer-info").find(".multiMaps .china-maplinks a:first"), c = j.attr("href")), m()
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(b) {
                    b.fn.columnize = function(a) {
                        var d = {width: 400, columns: !1, buildOnce: !1, overflow: !1, doneFunc: function() {
                            }, target: !1, ignoreImageLoading: !0, columnFloat: "left", lastNeverTallest: !1, accuracy: !1, manualBreaks: !1, cssClassPrefix: ""};
                        return a = b.extend(d, a), "string" == typeof a.width && (a.width = parseInt(a.width, 10), isNaN(a.width) && (a.width = d.width)), this.each(function() {
                            function D(f, e) {
                                var g = e ? "." : "";
                                return s.length ? g + s + "-" + f : g + f
                            }
                            function C(P, O, N, M) {
                                for (;
                                        (t || N.height() < M) && O[0].childNodes.length;
                                        ) {
                                    var L = O[0].childNodes[0];
                                    if (b(L).find(D("columnbreak", !0)).length) {
                                        return
                                    }
                                    if (b(L).hasClass(D("columnbreak"))) {
                                        return
                                    }
                                    P.append(L)
                                }
                                if (0 !== P[0].childNodes.length) {
                                    var K = P[0].childNodes, J = K[K.length - 1];
                                    P[0].removeChild(J);
                                    var I = b(J);
                                    if (3 == I[0].nodeType) {
                                        var H = I[0].nodeValue, G = a.width / 18;
                                        a.accuracy && (G = a.accuracy);
                                        for (var F, E = null;
                                                N.height() < M && H.length;
                                                ) {
                                            var n = H.indexOf(" ", G);
                                            F = -1 != n ? H.substring(0, H.indexOf(" ", G)) : H, E = document.createTextNode(F), P.append(E), H = H.length > G && -1 != n ? H.substring(n) : ""
                                        }
                                        if (N.height() >= M && null !== E && (P[0].removeChild(E), H = E.nodeValue + H), !H.length) {
                                            return !1
                                        }
                                        I[0].nodeValue = H
                                    }
                                    return O.contents().length ? O.prepend(I) : O.append(I), 3 == I[0].nodeType
                                }
                            }
                            function B(f, e, m, l) {
                                if (!f.contents(":last").find(D("columnbreak", !0)).length && !f.contents(":last").hasClass(D("columnbreak")) && e.contents().length) {
                                    var k = e.contents(":first");
                                    if (1 != k.get(0).nodeType) {
                                        return
                                    }
                                    var j = k.clone(!0);
                                    k.hasClass(D("columnbreak")) ? (f.append(j), k.remove()) : t ? (f.append(j), k.remove()) : 1 != j.get(0).nodeType || j.hasClass(D("dontend")) || (f.append(j), j.is("img") && m.height() < l + 20 ? k.remove() : !k.hasClass(D("dontsplit")) && m.height() < l + 20 ? k.remove() : j.is("img") || k.hasClass(D("dontsplit")) ? j.remove() : (j.empty(), C(j, k, m, l) ? k.addClass(D("split")) : (k.addClass(D("split")), k.children().length && B(j, k, m, l)), 0 === j.get(0).childNodes.length && j.remove()))
                                }
                            }
                            function A() {
                                if (!x.data("columnized") || 1 != x.children().length) {
                                    if (x.data("columnized", !0), x.data("columnizing", !0), x.empty(), x.append(b("<div class='" + D("first") + " " + D("last") + " " + D("column") + " ' style='width:100%; float: " + a.columnFloat + ";'></div>")), $col = x.children().eq(x.children().length - 1), $destroyable = v.clone(!0), a.overflow) {
                                        for (targetHeight = a.overflow.height, C($col, $destroyable, $col, targetHeight), $destroyable.contents().find(":first-child").hasClass(D("dontend")) || B($col, $destroyable, $col, targetHeight);
                                                $col.contents(":last").length && z($col.contents(":last").get(0));
                                                ) {
                                            var o = $col.contents(":last");
                                            o.remove(), $destroyable.prepend(o)
                                        }
                                        for (var j = "", h = document.createElement("DIV");
                                                $destroyable[0].childNodes.length > 0;
                                                ) {
                                            var f = $destroyable[0].childNodes[0];
                                            if (f.attributes) {
                                                for (var e = 0;
                                                        e < f.attributes.length;
                                                        e++) {
                                                    0 === f.attributes[e].nodeName.indexOf("jQuery") && f.removeAttribute(f.attributes[e].nodeName)
                                                }
                                            }
                                            h.innerHTML = "", h.appendChild($destroyable[0].childNodes[0]), j += h.innerHTML
                                        }
                                        var l = b(a.overflow.id)[0];
                                        l.innerHTML = j
                                    } else {
                                        $col.append($destroyable)
                                    }
                                    x.data("columnizing", !1), a.overflow && a.overflow.doneFunc && a.overflow.doneFunc()
                                }
                            }
                            function z(e) {
                                return 3 == e.nodeType ? /^\s+$/.test(e.nodeValue) && e.previousSibling ? z(e.previousSibling) : !1 : 1 != e.nodeType ? !1 : b(e).hasClass(D("dontend")) ? !0 : 0 === e.childNodes.length ? !1 : z(e.childNodes[e.childNodes.length - 1])
                            }
                            function y() {
                                if (r = 0, u != x.width()) {
                                    u = x.width();
                                    var aa = Math.round(x.width() / a.width), Z = a.width, Y = a.height;
                                    if (a.columns && (aa = a.columns), t && (aa = v.find(D("columnbreak", !0)).length + 1, Z = !1), 1 >= aa) {
                                        return A()
                                    }
                                    if (!x.data("columnizing")) {
                                        x.data("columnized", !0), x.data("columnizing", !0), x.empty(), x.append(b("<div style='width:" + Math.floor(100 / aa) + "%; float: " + a.columnFloat + ";'></div>")), n = x.children(":last"), n.append(v.clone()), w = n.height(), x.empty();
                                        var W = w / aa, U = 3, R = !1;
                                        a.overflow ? (U = 1, W = a.overflow.height) : Y && Z && (U = 1, W = Y, R = !0);
                                        for (var Q = 0;
                                                U > Q && 20 > Q;
                                                Q++) {
                                            x.empty();
                                            var O, M, n, l;
                                            try {
                                                O = v.clone(!0)
                                            } catch (j) {
                                                O = v.clone()
                                            }
                                            O.css("visibility", "hidden");
                                            for (var g = 0;
                                                    aa > g;
                                                    g++) {
                                                M = 0 === g ? D("first") : "", M += " " + D("column"), M = g == aa - 1 ? D("last") + " " + M : M, x.append(b("<div class='" + M + "' style='width:" + Math.floor(100 / aa) + "%; float: " + a.columnFloat + ";'></div>"))
                                            }
                                            for (g = 0;
                                                    g < aa - (a.overflow ? 0 : 1) || R && O.contents().length;
                                                    ) {
                                                for (x.children().length <= g && x.append(b("<div class='" + M + "' style='width:" + Math.floor(100 / aa) + "%; float: " + a.columnFloat + ";'></div>")), n = x.children().eq(g), R && n.width(Z + "px"), C(n, O, n, W), B(n, O, n, W);
                                                        n.contents(":last").length && z(n.contents(":last").get(0));
                                                        ) {
                                                    l = n.contents(":last"), l.remove(), O.prepend(l)
                                                }
                                                g++, 0 === n.contents().length && O.contents().length ? n.append(O.contents(":first")) : g != aa - (a.overflow ? 0 : 1) || a.overflow || O.find(D("columnbreak", !0)).length && aa++
                                            }
                                            if (a.overflow && !R) {
                                                var X = !1, V = document.all && -1 != navigator.appVersion.indexOf("MSIE 7.");
                                                if (X || V) {
                                                    for (var T = "", S = document.createElement("DIV");
                                                            O[0].childNodes.length > 0;
                                                            ) {
                                                        var P = O[0].childNodes[0];
                                                        for (g = 0;
                                                                g < P.attributes.length;
                                                                g++) {
                                                            0 === P.attributes[g].nodeName.indexOf("jQuery") && P.removeAttribute(P.attributes[g].nodeName)
                                                        }
                                                        S.innerHTML = "", S.appendChild(O[0].childNodes[0]), T += S.innerHTML
                                                    }
                                                    var N = b(a.overflow.id)[0];
                                                    N.innerHTML = T
                                                } else {
                                                    b(a.overflow.id).empty().append(O.contents().clone(!0))
                                                }
                                            } else {
                                                if (R) {
                                                    x.children().each(function(i) {
                                                        n = x.children().eq(i), n.width(Z + "px"), 0 === i ? n.addClass(D("first")) : i == x.children().length - 1 ? n.addClass(D("last")) : (n.removeClass(D("first")), n.removeClass(D("last")))
                                                    }), x.width(x.children().length * Z + "px")
                                                } else {
                                                    n = x.children().eq(x.children().length - 1), O.contents().each(function() {
                                                        n.append(b(this))
                                                    });
                                                    var p = (n.height(), 0), m = 10000000, k = 0, h = !1, f = 0;
                                                    x.children().each(function(i) {
                                                        return function(o) {
                                                            var F = i.children().eq(o), E = F.children(":last").find(D("columnbreak", !0)).length;
                                                            if (!E) {
                                                                var q = F.height();
                                                                h = !1, p += q, q > k && (k = q, h = !0), m > q && (m = q), f++
                                                            }
                                                        }
                                                    }(x));
                                                    var e = p / f;
                                                    0 === p ? Q = U : a.lastNeverTallest && h ? (r += 30, W += 30, Q == U - 1 && U++) : k - m > 30 ? W = e + 30 : Math.abs(e - W) > 20 ? W = e : Q = U
                                                }
                                            }
                                            x.append(b("<br style='clear:both;'>"))
                                        }
                                        x.find(D("column", !0)).find(":first" + D("removeiffirst", !0)).remove(), x.find(D("column", !0)).find(":last" + D("removeiflast", !0)).remove(), x.data("columnizing", !1), a.overflow && a.overflow.doneFunc(), a.doneFunc()
                                    }
                                }
                            }
                            var x = b(a.target ? a.target : this), w = b(this).height(), v = b("<div></div>"), u = 0, t = a.manualBreaks, s = d.cssClassPrefix;
                            "string" == typeof a.cssClassPrefix && (s = a.cssClassPrefix);
                            var r = 0;
                            if (v.append(b(this).contents().clone(!0)), !a.ignoreImageLoading && !a.target && !x.data("imageLoaded") && (x.data("imageLoaded", !0), b(this).find("img").length > 0)) {
                                var c = function(e, f) {
                                    return function() {
                                        e.data("firstImageLoaded") || (e.data("firstImageLoaded", "true"), e.empty().append(f.children().clone(!0)), e.columnize(a))
                                    }
                                }(b(this), v);
                                return b(this).find("img").one("load", c), void b(this).find("img").one("abort", c)
                            }
                            x.empty(), y(), a.buildOnce || b(window).resize(function() {
                                a.buildOnce || (x.data("timeout") && clearTimeout(x.data("timeout")), x.data("timeout", setTimeout(y, 200)))
                            })
                        })
                    }
                }(jQuery), function(e, d, f) {
                    f.fn.creditcard = function(b) {
                        var g = {AMEX: "amex", MAST: "mast", DISC: "discover", DINE: "dine", JCB: "jcb", VISA: "visa"}, c = {amex: "AMEX", mastercard: "MAST", diners_club_international: "DINE", diners_club_carte_blanche: "DINE", discover: "DISC", jcb: "JCB", visa: "VISA", visa_electron: "VISA"};
                        return this.each(function(p, o) {
                            var n = f(o), m = f(b), l = m.closest("label").find(".cc-icon"), a = l.data("src") || "";
                            n.on("change paste keyup", function() {
                                var h = d.gdt.Validate.ext.CreditCards.getValidity(n.val());
                                n.val(f(this).val().replace(/\s+/g, "")), h && h.length ? m.val(c[h]).trigger("change") : (m.val("").trigger("change"), l.removeClass("show"))
                            }), m.on("change", function() {
                                this.value && this.value.length && g[this.value] ? l.attr("src", a.replace("{{cardtype}}", g[this.value])).addClass("show") : l.removeClass("show")
                            })
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.lazyloadContent = function(b) {
                        var g, c;
                        return g = {contentSelector: ".content", loadingHeight: "50px"}, c = f.extend(g, b), this.each(function(k, q) {
                            var p = f(q), o = p.find(c.contentSelector), n = q.id, m = p.data("href"), l = location.protocol + "//" + location.host + m;
                            p.one("click", function() {
                                o.parent().css("min-height", c.loadingHeight).addClass("loading"), d.gdt.Utils.ajaxCall({type: "GET", url: l, callback: function(h) {
                                        var j = f(h), i = f("#" + n + " .content", j);
                                        i.length ? (o.html(i.html()), o.parent().css({height: o.height(), "min-height": 0}).removeClass("loading"), c.callback && c.callback(o)) : (d.console.error("no contentFragment"), d.location.href = l)
                                    }, error: function(h) {
                                        403 === h.status ? (d.console.warn("Authentication error"), d.location.href = d.gdt.loginURL + "?resource=" + window.location.pathname.split(".html")[0]) : (d.console.error("XHR Error"), d.location.href = l)
                                    }})
                            })
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.mapWithMarker = function() {
                        return this.each(function(t, s) {
                            function r() {
                                q = new google.maps.Map(o.get(0), m), q.setOptions({styles: c}), p = new google.maps.Marker({position: n, icon: b, map: q})
                            }
                            var q, p, o = f(s), n = new google.maps.LatLng(o.data("lat"), o.data("lng")), m = {zoom: 14, mapTypeControl: !0, center: n, panControl: !1, zoomControl: !0, zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL, position: google.maps.ControlPosition.LEFT_TOP}, minZoom: 3, scaleControl: !1, streetViewControl: !0, mapTypeId: google.maps.MapTypeId.ROADMAP}, c = [{stylers: [{saturation: -100}]}], b = d.gdt.Utils.google.mapIcon;
                            r()
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.modal = function() {
                        return this.each(function(X, W) {
                            function V() {
                                var g = N.height() > f(d).height() ? !0 : !1;
                                return g
                            }
                            function U(h) {
                                var g = {$el: N, config: h};
                                H.addClass(c.bodyClass).css("margin-right", b + "px"), G.add(F).css("right", b + "px"), P.addClass(c.bgVisible), E.css("z-index", -1), O.scrollTop(0).addClass(c.wrapVisible), V() ? setTimeout(function() {
                                    O.addClass(c.wrapScroll)
                                }, 1000) : N.addClass(c.vCentre), f.pubsub("publish", K.modal.opening), B.eventGroup && f.pubsub("publish", K.modal[B.eventGroup].opening, g), f("#checkout").length && O.find("form textarea").focus()
                            }
                            function T() {
                                H.removeClass(c.bodyClass).css("margin-right", 0), G.add(F).css("right", 0), P.removeClass(c.bgVisible), E.removeAttr("style"), O.removeClass(c.wrapVisible + " " + c.wrapScroll), N.removeClass(c.vCentre), H.find(".modal-wrap").removeClass(c.wrapVisible), f.pubsub("publish", K.modal.closing), B.eventGroup && f.pubsub("publish", K.modal[B.eventGroup].closing), O.has("#languageSelectorOverlay").length && f.pubsub("publish", K.languageSelectorPopupClose), O.has("#js-subscription-msg-wrapper") && f.pubsub("publish", K.catalogueMsgClosed)
                            }
                            function S() {
                                switch (B.triggerMode) {
                                    case"list":
                                        I.on(L, "li", function(h) {
                                            var g = {index: f(this).index()};
                                            U(g), h.preventDefault()
                                        });
                                        break;
                                    case"error":
                                        f.pubsub("subscribe", K[B.eventGroup], function() {
                                            U()
                                        });
                                        break;
                                    default:
                                        I.on(L, function(g) {
                                            U(), g.preventDefault()
                                        })
                                }
                                O.on("click", function(g) {
                                    f(g.target).parents("#" + B.contentId).length || T()
                                }), M.on(L, function() {
                                    T()
                                }), f(d).smartresize(function() {
                                    !V() && H.hasClass(c.bodyClass) ? (N.addClass(c.vCentre), O.removeClass(c.wrapScroll)) : (N.removeClass(c.vCentre), O.addClass(c.wrapScroll))
                                })
                            }
                            function R() {
                                P = f("#" + B.bgElementId), N = f("#" + B.contentId), N.parent().hasClass(c.wrap) || N.wrap('<div class="' + c.wrap + '">'), O = N.closest("." + c.wrap), M = N.find("." + c.close)
                            }
                            function Q() {
                                B = f.extend(D, C), R(), "desktopOnly" === B.displayMode ? d.matchMedia("only screen and (max-width: 699px)").matches || S() : "all" === B.displayMode && S(), f.pubsub("subscribe", K.modal.close, T), f.pubsub("subscribe", K.modal.open, U)
                            }
                            var P, O, N, M, L = "click", K = d.gdt.Utils.PubSub.UI_EVENTS, I = f(W), H = f("body"), G = f("#gdt .navp header"), F = f("#gdt .navp footer"), E = f("#gdt .navp"), D = {bgElementId: "js-modal-bg", displayMode: "all", triggerMode: "button"}, C = f.parseJSON(I.attr("data-config")), B = {}, c = {close: "modal-close", wrap: "modal-wrap", bgVisible: "modal-bg-visible", wrapVisible: "modal-wrap-visible", wrapScroll: "modal-wrap-scroll", vCentre: "modal-vcentre", bodyClass: "modal-opened"}, b = d.gdt.Utils.scrollWidth, J = f(".cq-wcm-edit");
                            J.length || Q()
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.paginatedList = function(b, l) {
                        var k, j;
                        k = {scrollTopOffset: 20}, j = f.extend(k, b);
                        var i = "undefined" == typeof window.ontouchstart ? "click" : "touchend", c = d.gdt.Utils.PubSub.UI_EVENTS;
                        return this.each(function(E, D) {
                            function C() {
                                f("html,body").scrollTop(g.position().top - j.scrollTopOffset)
                            }
                            function B(m) {
                                G.each(function() {
                                    var a = f(this);
                                    a.find("li").removeClass("active"), a.find("li").eq(m - 1).addClass("active"), a.find("li").removeClass("visible")
                                }).find("button").prop("disabled", !1), m === h && G.find('[rel="next"]').prop("disabled", !0), 1 === m && G.find('[rel="prev"]').prop("disabled", !0), G.each(1 === m || 2 === m || 3 === m ? function() {
                                    f(this).find("li").slice(0, 5).addClass("visible")
                                } : m === h || m === h - 1 || m === h - 2 ? function() {
                                    f(this).find("li").slice(h - 5, h).addClass("visible")
                                } : function() {
                                    f(this).find("li").eq(m - 1).prev().addClass("visible").prev().addClass("visible"), f(this).find("li").eq(m - 1).next().addClass("visible").next().addClass("visible")
                                })
                            }
                            function A(n) {
                                var m = g.find('[data-page="' + n + '"]');
                                g.removeClass("paginated-list-visible").find("li").hide(), m.show(), B(n), setTimeout(function() {
                                    z()
                                }, 100), f.pubsub("publish", c.paginatedList.navigate, m), j.eventGroup && f.pubsub("publish", c.paginatedList[j.eventGroup].navigate, m)
                            }
                            function z() {
                                g.addClass("paginated-list-visible")
                            }
                            function y() {
                                var m = 0, o = f("<ol></ol>"), n = G.find("ol");
                                H.each(function(a) {
                                    a % F === 0 && (m++, o.append(f('<li data-page="' + m + '"><a href="#">' + m + "</a></li>"))), f(this).attr("data-page", m)
                                }), G.find("ol").empty().append(o.html()), h = m, d.matchMedia("only screen and (min-width: 668px)").matches ? A(1) : z(), n.find("li").size() || G.hide()
                            }
                            function x() {
                                G.on(i, "a", function(m) {
                                    A(parseInt(f(this).closest("li").attr("data-page"), 10)), C(), m.preventDefault()
                                }).on(i, "button:enabled", function() {
                                    var n = G.eq(0).find(".active").index() + 1, m = n;
                                    switch (f(this).attr("rel")) {
                                        case"next":
                                            m++;
                                            break;
                                        case"prev":
                                            m--
                                    }
                                    A(m), C()
                                }), f.pubsub("subscribe", c.paginatedList.reinitialise, w)
                            }
                            function w(n, m) {
                                m.$listEl.attr("id") === g.attr("id") && (g.html(m.$newList.html()), H = g.find("li"), y())
                            }
                            function v() {
                                y(), x()
                            }
                            var h, g = f(D), H = g.find("li"), G = g.parent().find(".pagination"), F = parseInt(g.attr("data-pageitems"), 10);
                            return g.attr("data-ordernumber", l), v(), {reinitialise: w, init: v}
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    function g(t, s) {
                        function r() {
                            p && (m.length ? c.attr("class", m.pop()) : (c.attr("class", b), p = !1, h.pubsub("publish", n.shade.closing)))
                        }
                        function q(i, d) {
                            p ? (m.push(c.attr("class")), c.attr("class", b).addClass("open" + (d.clsname ? " " + d.clsname : ""))) : (h.pubsub("publish", n.shade.opening), c.attr("class", b).addClass("open"), d.clsname && setTimeout(function() {
                                c.addClass(d.clsname)
                            }, 10)), p = !0, c.off(), d.clicktoclose && c.on(o, function(j) {
                                h(j.target).is(c) && (r(), "function" == typeof d.clicktoclose && d.clicktoclose(j))
                            })
                        }
                        var p, o = "undefined" == typeof e.ontouchstart ? "click" : "touchend", n = e.gdt.Utils.PubSub.UI_EVENTS, m = [], c = h(s), b = c.attr("class");
                        h.pubsub("subscribe", n.shade.open, q), h.pubsub("subscribe", n.shade.close, r), c.shade = {openShade: q}
                    }
                    h.fn.shade = function(d, c) {
                        return d ? void ("open" === d && this.shade && this.shade.openShade(c)) : this.each(g)
                    }, h("#js-modal-bg").shade()
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.shippingInfo = function() {
                        return this.each(function(x, w) {
                            function v(g) {
                                r.empty().parent().addClass("loading"), s.find(".error").prop("hidden", !0).attr("hidden", "hidden"), d.gdt.Utils.ajaxCall({type: "GET", url: g, callback: function(a, i, h) {
                                        r.parent().removeClass("loading"), h.responseURL && h.responseURL !== g ? h.responseURL && (o.val(""), s.find('.error[data-type="' + h.responseURL.split("j_reason=")[1] + '"]').prop("hidden", !1).removeAttr("hidden")) : a.length ? r.html(a) : (o.val(""), s.find('.error[data-type="org.apache.sling.api.SlingException"]').prop("hidden", !1).removeAttr("hidden")), s.css("background", "none")
                                    }})
                            }
                            function u() {
                                o.on("change", function() {
                                    var g = b.prop("checked");
                                    g && v(p + this.value)
                                }), c.on("change", function() {
                                    v(p + this.value)
                                })
                            }
                            function t() {
                                var g = c[0].value;
                                g.length ? v(p + g) : (g = o[0].value, g.length && v(p + g)), u()
                            }
                            var s = f(w), r = s.find(".shipping-provider-content"), q = s.data("trigger"), p = location.protocol + "//" + location.host + s.data("href"), o = f('[name="' + q + '"]'), c = f('[name="shipping.state"]'), b = f("[name=sameBillingAddress]");
                            t()
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(i, h, n) {
                    h.gdt = h.gdt || {};
                    var m = "undefined" == typeof h.ontouchstart ? "click" : "touchend", l = h.gdt.Utils.PubSub.UI_EVENTS, k = n("#my-account .component-myactsubscription a.js-edit-btn"), j = n("#my-account .component-myactsubscription a.edit");
                    n.fn.subscriptions = function() {
                        return this.each(function(y, x) {
                            function w() {
                                "YES" === n("input[name=newsletter]:checked", "#update-subscriptions").val() ? (z.removeAttr("hidden").show(), b.removeAttr("disabled")) : (z.attr("hidden", "hidden").hide(), b.attr("disabled", "disabled"))
                            }
                            function v(o) {
                                n("#js-subscription-msg-wrapper .error-msg").append("<div>" + h.gdt.Utils.Console.log(o) + "<div>").show()
                            }
                            function u() {
                                n("#js-show-subscription-msg").modal(), n("#js-show-subscription-msg").trigger("click"), n("#js-subscription-msg-wrapper .success-msg").show(), n("#js-subscription-submit-btn").removeClass("loading")
                            }
                            var t = n(x), g = n(".subEdit", t), f = n(".summary", t), e = n("form", t), d = n(".gdt-form", t), c = n("input[name=newsletter]"), b = n("#newsletter-language"), z = b.closest("label");
                            g.on(m, function(o) {
                                o.preventDefault(), f.attr("hidden", "hidden").hide(), d.removeAttr("hidden").show(), g.hide(), n.pubsub("publish", h.gdt.Utils.PubSub.UI_EVENTS.accordionContentUpdated)
                            }), c.on("change", function() {
                                "YES" === this.value ? (z.removeAttr("hidden").show(), b.removeAttr("disabled")) : (z.attr("hidden", "hidden").hide(), b.attr("disabled", "disabled")), n.pubsub("publish", h.gdt.Utils.PubSub.UI_EVENTS.accordionContentUpdated)
                            }), w(), n("div.modal-subscription-msg .close-btn").on(m, function(o) {
                                n("div.modal-subscription-msg .modal-close").click(), o.preventDefault()
                            }), n.pubsub("subscribe", l.catalogueMsgClosed, function() {
                                f.removeAttr("hidden").show(), d.attr("hidden", "hidden").hide(), h.gdt.Utils.Browser.isMobileLayout ? k.show() : j.show(), n('#update-subscriptions .paneraiupdates input[type="radio"]:checked').each(function() {
                                    n("div.summary p:first").find("strong").text(n(this).next("span").text())
                                }), n('#update-subscriptions .newsletter input[type="radio"]:checked').each(function() {
                                    n("div.summary p:last").find("strong").text(n(this).next("span").text())
                                })
                            }), n("#js-subscription-submit-btn").on(m, function(o) {
                                n("#js-subscription-submit-btn").addClass("loading"), n.ajax({type: e.attr("method"), url: e.attr("action"), data: e.serialize(), success: u, error: v}), o.preventDefault()
                            })
                        })
                    }, n(".component-myactsubscription").subscriptions()
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.tabAccordion = function(b) {
                        function h(i) {
                            i.parents(".accordion-tabs-content-active").each(function() {
                                var k = f(this).children(".accordion-tabs-inner"), j = k.children(".mobile-height-calc").height();
                                k.css("height", j + "px")
                            })
                        }
                        var g, c;
                        return g = {trigger: ".accordion-tabs-trigger", closeOthers: !1}, c = f.extend(g, b), this.each(function(n, t) {
                            function s() {
                                o.on(q, "li", function(i) {
                                    var k = f(this), j = f(k.find("a").attr("href"));
                                    i.preventDefault(), o.find(".accordion-tabs-nav-active").removeClass("accordion-tabs-nav-active"), k.addClass("accordion-tabs-nav-active"), m.children(".accordion-tabs-content-active").removeClass("accordion-tabs-content-active"), j.addClass("accordion-tabs-content-active"), h(p), "boutiquePickTab" === k.prop("id") && f.pubsub("publish", d.gdt.Utils.PubSub.UI_EVENTS.boutiqueTabClicked), "shippingOptionsTab" === k.prop("id") && f.pubsub("publish", d.gdt.Utils.PubSub.UI_EVENTS.shippingTabClicked)
                                }), m.on("click", c.trigger, function() {
                                    f.pubsub("publish", d.gdt.Utils.PubSub.UI_EVENTS.orderTabClicked);
                                    var j = f(this), v = j.closest("section"), u = v.children(".accordion-tabs-inner"), l = u.children(".mobile-height-calc").height(), k = j.hasClass("close");
                                    c.closeOthers && (m.children("section").children(c.trigger).removeClass("close"), m.children("section").children(".accordion-tabs-inner").css("height", 0)), k ? (j.removeClass("close"), v.removeClass("accordion-tabs-content-active"), u.css("height", "0px")) : (j.addClass("close"), v.addClass("accordion-tabs-content-active"), u.css("height", l + "px")), h(p)
                                }), f.pubsub("subscribe", d.gdt.Utils.PubSub.UI_EVENTS.accordionContentUpdated, function() {
                                    h(p), d.gdt.MyOrderHistory.addListeners()
                                })
                            }
                            function r() {
                                s(), m.children(".accordion-tabs-content-active").children(c.trigger + ".initial").trigger(q)
                            }
                            var q = "undefined" == typeof window.ontouchstart ? "click" : "touchend", p = f(t), o = p.children(".accordion-tabs-nav"), m = p.children(".accordion-tabs-content");
                            r()
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(e, d, f) {
                    f.fn.verticalGallery = function() {
                        var b = "undefined" == typeof window.ontouchstart ? "click" : "touchend", c = d.gdt.Utils.PubSub.UI_EVENTS;
                        return this.each(function() {
                            function E(g) {
                                var i, h = f.trim(g.html());
                                h = f.parseHTML(h), i = f(h), g.replaceWith(i), d.picturefill()
                            }
                            function D() {
                                s.each(function() {
                                    var g = f(this);
                                    g.find('[type="text/x-tmpl"]').length && E(f(this).find('[type="text/x-tmpl"]'))
                                })
                            }
                            function C(g) {
                                u.find(".scroll").addClass("no-transition"), u.akcarousel("move", g), setTimeout(function() {
                                    u.find(".scroll").removeClass("no-transition")
                                }, 1000)
                            }
                            function B(g) {
                                u.akcarousel({delay: 5000, horizontal: !0, scrollNode: !0, autoSwitch: !1, scrollSpeed: 1000, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", navarrows: !0}), C(g)
                            }
                            function A(g) {
                                for (var j = g.controlBar, i = j.addChild("button").addClass("pan-volume"), h = 0;
                                        4 > h;
                                        h++) {
                                    i.addChild("button").addClass("volumelevel level" + (h + 1) + " active")
                                }
                                f(i.el_).on(b, ".volumelevel", function() {
                                    var k = f(this), n = ".volumelevel", m = k.parent().find(n), l = k.index(n) + 1 / m.size();
                                    g.volume(l), m.removeClass("active").filter(":lt(" + parseInt(k.index(n) + 1, 10) + ")").addClass("active")
                                }), g.on("play", function() {
                                    f(g.el_).parent().addClass("video-playing"), j.show()
                                }), g.on("ended", function() {
                                    f(g.el_).parent().removeClass("video-playing"), j.hide()
                                })
                            }
                            function z() {
                                a.each(function() {
                                    d.videojs(f(this).get(0), {nativeControlsForTouch: !1}).ready(function() {
                                        A(this)
                                    })
                                })
                            }
                            function y() {
                                t.on(b, function(h) {
                                    var g = f(this), j = g.index() - 1, i = 0 === j ? "--" : "++";
                                    u.akcarousel("move", i), h.preventDefault()
                                })
                            }
                            function x(g) {
                                u = g.find(".js-vertical-gallery-carousel"), t = u.find(".carousel-hero-nav"), s = u.find("li")
                            }
                            function w(g, j) {
                                var i = {message: g, $modalContent: j.$el, startIndex: j.config.index}, h = i.$modalContent;
                                h.attr("data-initialised") ? C(i.startIndex) : (x(h), B(i.startIndex), z(), D(), d.picturefill(), y(), h.attr("data-initialised", !0))
                            }
                            function v() {
                                f.pubsub("subscribe", c.modal.verticalGallery.opening, w)
                            }
                            var u, t, s, a = f(".video-js");
                            v()
                        })
                    }
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function ad(d) {
                            return d && d.name && "radio" !== d.type
                        }
                        function ac(d) {
                            d && (h(d).prop("hidden", !1), h(d).removeAttr("hidden"))
                        }
                        function ab(d) {
                            d && (h(d).prop("hidden", !0), h(d).attr("hidden", "hidden"))
                        }
                        function aa(i) {
                            if (i) {
                                var d = h(i);
                                d.find("span." + N + ":not([hidden])").length || d.removeClass(J)
                            }
                        }
                        function Z(a, k) {
                            if (ad(a)) {
                                var j = h(a), i = j.closest("label");
                                i.find("span." + N + (k ? "." + k : "")).each(function(l, d) {
                                    ab(d)
                                }), i.find("span." + N + ":not([hidden])").length || (j.removeClass(L), i.removeClass(L), aa(a.form))
                            }
                        }
                        function Y(i) {
                            if (i) {
                                var d = h(i);
                                d.removeClass(J), d.find("span." + N).each(function(k, j) {
                                    ab(j)
                                }), d.find("." + L).removeClass(L)
                            }
                        }
                        function X(a, l) {
                            if (ad(a) && l) {
                                var k = h(a), j = k.closest("label"), d = j.find("span." + N + "." + l)[0];
                                Z(a), k.addClass(L), j.addClass(L), h(a.form).addClass(J), ac(d)
                            }
                        }
                        function W(a) {
                            return !ad(a) || !e.gdt.Utils.Browser.isOldIE || a.value !== h(a).attr("placeholder")
                        }
                        function V(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var d;
                            return d = "checkbox" === a.type ? a.checked : a.value.length > 0
                        }
                        function U(a) {
                            return !ad(a) || cq5forms_regcheck(a.value, b)
                        }
                        function T(a) {
                            return !ad(a) || cq5forms_regcheck(a.value, P)
                        }
                        function S(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var i = parseInt(h(a).attr("minlength"), 10);
                            return 0 === a.value.length || a.value.length >= i
                        }
                        function R(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var i = parseInt(h(a).attr("maxlength"), 10);
                            return a.value.length <= i
                        }
                        function Q(i, d) {
                            return i && d ? i.value === d.value : !0
                        }
                        function O(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var i = !h(a).attr("required") || W(a) && V(a);
                            return Z(a, "required"), i || X(a, "required"), i
                        }
                        function M(a) {
                            if (!ad(a) || !a.name) {
                                return !0
                            }
                            var d = "email" !== a.type && a.name.indexOf("email") < 0 && a.className.indexOf("email") < 0 || U(a);
                            return Z(a, "email"), d || X(a, "email"), d
                        }
                        function K(a) {
                            if (!ad(a) || !a.name) {
                                return !0
                            }
                            var i = !h(a).attr("required") || a.name.indexOf("phone") < 0 && a.name.indexOf("mobile") < 0 || T(a);
                            return Z(a, "phone"), i || X(a, "phone"), i
                        }
                        function I(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var i = !h(a).attr("minlength") || S(a);
                            return Z(a, "minlength"), i || X(a, "minlength"), i
                        }
                        function H(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var i = !h(a).attr("maxlength") || R(a);
                            return Z(a, "maxlength"), i || X(a, "maxlength"), i
                        }
                        function G(a) {
                            if (!ad(a)) {
                                return !0
                            }
                            var j, i = !0;
                            return 0 === a.name.indexOf("confirm-") && (j = a.form.elements[a.name.replace("confirm-", "")], i = Q(a, j)), Z(a, "confirm"), i || X(a, "confirm"), i
                        }
                        function F(k) {
                            if (!ad(k) || !k.value.length) {
                                return !0
                            }
                            var j, i = e.gdt.Validate.ext || {}, a = !0;
                            for (j in i) {
                                a && i.hasOwnProperty(j) && k.className.indexOf(i[j].type) >= 0 && !i[j].getValidity(k.value) && (X(k, i[j].type), a = !1)
                            }
                            return a
                        }
                        function E(i) {
                            var d = !0;
                            return"undefined" === i || h(i).prop("disabled") || h(i).parents("[disabled]").length || (d = O(i), d = d ? M(i) : !1, d = d ? K(i) : !1, d = d ? I(i) : !1, d = d ? H(i) : !1, d = d ? G(i) : !1, d = d ? F(i) : !1), d
                        }
                        function c(j) {
                            var i, n, m = document.getElementById(j) || document.forms(j), l = [], k = !0;
                            for (i = m.elements.length - 1;
                                    i >= 0;
                                    i--) {
                                m.elements[i].name && "hidden" !== m.elements[i].type && "none" !== m.elements[i].style.display && l.push(m.elements[i])
                            }
                            for (n = l.length - 1;
                                    n >= 0;
                                    n--) {
                                E(l[n], m) || (k = !1)
                            }
                            return k
                        }
                        var b = /^[^@]+([@]{1})[0-9a-zA-Z\._-]+([\.]{1})[0-9a-zA-Z\._-]+$/, P = /^[+]?[0-9\-.()\s]{1,}$/, N = "error", L = "has-error", J = "has-error";
                        return e.gdt.test = e.gdt.test || {}, e.gdt.test.validate = {getPlaceholderValidity: W, getRequiredValidity: V, getEmailValidity: U, getPhoneNumberValidity: T, getMinLengthValidity: S, getMaxLengthValidity: R, getConfirmValidity: Q, checkRequired: O, checkEmail: M, checkPhoneNumber: K, checkMinLength: I, checkMaxLength: H, checkConfirm: G}, {field: E, form: c, clear: Y}
                    };
                    e.gdt.Validate = new g
                }(document, window, window.jQuery || window.Zepto), function(Z, Y, X) {
                    function W(f) {
                        f = f.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                        var e = "[\\?&]" + f + "=([^&#]*)", h = new RegExp(e), g = h.exec(window.location.href);
                        return null === g ? "" : g[1]
                    }
                    function V() {
                        X(document).on(M, "#snb-selection .mView", function() {
                            X(this).parents("#snb-selection").toggleClass("active")
                        }), X(".accMoreFilters .fColumn h3").on(M, function() {
                            var e = X(this).parents(".fColumn");
                            e.siblings().removeClass("active"), X(this).parents(".fColumn").toggleClass("active")
                        }), X(".accMoreFilters .mView .closeMe").on(M, function(e) {
                            e.preventDefault(), A.removeClass("accMoreFiltersOpen"), L.removeClass("openMobile"), X(".section.navp").show()
                        }), J.on(M, function(e) {
                            e.preventDefault(), A.addClass("accMoreFiltersOpen"), L.addClass("openMobile"), X(".section.navp").hide()
                        }), K.on(M, function(f) {
                            f.preventDefault();
                            var e = X(this).data("minimise"), g = X(this).text();
                            L.toggleClass("inactive"), X(this).data("minimise", g), K.text(e)
                        }), I.on(M, function(e) {
                            e.preventDefault(), X(this).parents("form:first").trigger("reset"), L.find("fieldset").each(function() {
                                var f = X(this);
                                f.find('input[type="checkbox"]').prop("checked", !1), f.find('input[type="checkbox"][id$="-all"]').prop("checked", !0)
                            }), X("#accMoreFilters form button").trigger("click"), I.removeClass("visible")
                        }), L.find("fieldset").each(function() {
                            var f = X(this), e = f.find('input[type="checkbox"]');
                            e.on("change", function() {
                                X(this).is('[id$="-all"]') ? (e.filter(':not([id$="-all"]):checked').prop("checked", !1), I.removeClass("visible")) : e.filter(':not([id$="-all"]):checked').val() ? f.find('input[type="checkbox"][id$="-all"]').prop("checked", !1) : (f.find('input[type="checkbox"][id$="-all"]').prop("checked", !0), I.removeClass("visible")), L.find('input[type="checkbox"]').not('input[value="0"]').each(function() {
                                    return X(this).prop("checked") ? (I.addClass("visible"), !1) : void 0
                                })
                            })
                        });
                        var aj = window.gdt.snbData, ai = W("case"), ah = W("case-diameter"), ag = W("buckle-type"), af = W("buckle-size"), ae = ag.replace(/[&\/\\#,+()$~.'":*<>{}]/gi, " "), ad = Y.location.search, ac = W("wid"), w = W("bid"), q = W("sid"), ab = W("ref"), aa = ad.indexOf("wid="), z = ad.indexOf("ref=");
                        ai = ai.replace(new RegExp("%7C", "g"), "|"), ah = ah.replace(new RegExp("%7C", "g"), "|"), ae = ae.replace(new RegExp("%7C", "g"), "|"), af = af.replace(new RegExp("%7C", "g"), "|");
                        var y, v, u, t;
                        if (y = ai.substring(ai.indexOf("|") + 1), ai = ai.substring(0, ai.indexOf("|")), v = ae.substring(ae.indexOf("|") + 1), ae = ae.substring(0, ae.indexOf("|")), u = ah.substring(ah.indexOf("|") + 1), ah = ah.substring(0, ah.indexOf("|")), t = af.substring(af.indexOf("|") + 1), af = af.substring(0, af.indexOf("|")), (q || w) && X("header").find("a.back:first").remove(), aa > 0 && z > 0) {
                            var r = X("header").find("a.back:first");
                            if (r.length) {
                                var p = r.attr("href"), o = window.location.href.slice(window.location.href.indexOf("?") + 1), n = p.replace(".html", ".REF-" + ab + ".html?" + o);
                                r.attr("href", n)
                            }
                        } else {
                            if (ai.length > 0 && ah.length > 0) {
                                var k = X("header").find("a.back:first");
                                if (k.length) {
                                    var j = k.attr("href"), d = window.location.href.slice(window.location.href.indexOf("?") + 1), c = j.replace(".html", ".html?" + d);
                                    k.attr("href", c)
                                }
                            }
                        }
                        X("#mobileAccCheckFilters").find("[name=mobile-acc-filter]").on("click", function() {
                            "online" === X(this).val() && X("#accMoreFilters").find(".resetBtn").addClass("visible")
                        }), X("#accMoreFilters form button").on(M, function(a1) {
                            a1.preventDefault(), X("#openFiltersM").addClass("clicked"), X("#accMoreFilters").removeClass("openMobile"), A.removeClass("accMoreFiltersOpen"), X(".soldOnlnie").find("a").removeClass("active"), X(".soldOnlnie").find("a:first").addClass("active"), X(".section.navp").show();
                            var a0 = X(this).parents("form:first"), aZ = "";
                            a0.find("input[type=checkbox]").each(function() {
                                X(this).is(":checked") && (aZ += X(this).attr("name") + "=" + X(this).val() + "&")
                            });
                            for (var aY = aZ.split("&"), aX = {}, aW = aY.length;
                                    aW--;
                                    ) {
                                var aV = aY[aW].split("="), aU = aV[0].replace("[]", ""), aT = aV[1];
                                aX[aU] = aX[aU] || [], aX[aU].push(aT)
                            }
                            var aS = aX["snb-material"], aR = aX["snb-finishing"], aQ = aX["snb-color"], aP = aX["snb-size"];
                            if (void 0 !== aS) {
                                for (var aO = 0;
                                        aO < aS.length;
                                        aO++) {
                                    Y.console.log(aS[aO])
                                }
                            }
                            if (void 0 !== aR) {
                                for (var aN = 0;
                                        aN < aR.length;
                                        aN++) {
                                    Y.console.log(aR[aN])
                                }
                            }
                            if (void 0 !== aQ) {
                                for (var aM = 0;
                                        aM < aQ.length;
                                        aM++) {
                                    Y.console.log(aQ[aM])
                                }
                            }
                            if (void 0 !== aP) {
                                for (var aL = 0;
                                        aL < aP.length;
                                        aL++) {
                                    Y.console.log(aP[aL])
                                }
                            }
                            X("#resultsummary").each(function() {
                                var bc = X(this), bb = bc.find(".material"), ba = bc.find(".finishing"), a9 = bc.find(".color"), a8 = bc.find(".size"), a7 = [];
                                if (void 0 !== aS) {
                                    for (var a6 = 0;
                                            a6 < aS.length;
                                            a6++) {
                                        a7.push(a0.find('input[name="snb-material"][value="' + aS[a6] + '"]').next().text())
                                    }
                                }
                                var a5 = [];
                                if (void 0 !== aR) {
                                    for (var a4 = 0;
                                            a4 < aR.length;
                                            a4++) {
                                        a5.push(a0.find('input[name="snb-finishing"][value="' + aR[a4] + '"]').next().text())
                                    }
                                }
                                var a3 = [];
                                if (void 0 !== aQ) {
                                    for (var a2 = 0;
                                            a2 < aQ.length;
                                            a2++) {
                                        a3.push(a0.find('input[name="snb-color"][value="' + aQ[a2] + '"]').next().text())
                                    }
                                }
                                var x = [];
                                if (void 0 !== aP) {
                                    for (var bd = 0;
                                            bd < aP.length;
                                            bd++) {
                                        x.push(a0.find('input[name="snb-size"][value="' + aP[bd] + '"]').next().text())
                                    }
                                }
                                bb.text(a7), ba.text(a5), a9.text(a3), a8.text(x)
                            });
                            var aK, aJ = [], aI = {};
                            aI.property = "material", aI.data = aS, void 0 !== aI.data && 1 === aI.data.length && "0" === aI.data[0] && (aI.data = [], aK = !0), aJ.push(aI);
                            var aH, aG = {};
                            aG.property = "finishing", aG.data = aR, void 0 !== aG.data && 1 === aG.data.length && "0" === aG.data[0] && (aG.data = [], aH = !0), aJ.push(aG);
                            var aF, aE = {};
                            aE.property = "color", aE.data = aQ, void 0 !== aE.data && 1 === aE.data.length && "0" === aE.data[0] && (aE.data = [], aF = !0), aJ.push(aE);
                            var aD, aC = {};
                            if (aC.property = "size", aC.data = aP, void 0 !== aC.data && 1 === aC.data.length && "0" === aC.data[0] && (aC.data = [], aD = !0), aJ.push(aC), aK && aH || aK && aF && aD) {
                                X("#js-search-results").empty();
                                var aB, aA = [], az = 0;
                                X.each(Y.gdt.snbFilteredResultsData.data, function(f, e) {
                                    az++, aB = Q(e), aA.push(aB)
                                });
                                var ay = X("#resultsummary");
                                ay.each(function() {
                                    var f = X(this), e = f.find(".count");
                                    e.text(az)
                                }), X("<div/>", {"class": "my-new-list", html: aA.join("")}).appendTo("#js-search-results"), P()
                            } else {
                                X("#js-search-results").empty();
                                var ax = Y.gdt.snbFilteredResultsData.data, aw = 0, av = [];
                                X.each(aJ, function(f, e) {
                                    av = [], void 0 !== e.data && e.data.length > 0 && (X.each(ax, function(g, i) {
                                        for (var h = 0;
                                                h < e.data.length;
                                                h++) {
                                            e.data[h] === i[e.property] && av.push(i)
                                        }
                                    }), ax = av)
                                });
                                var au, at = [];
                                X.each(ax, function(f, e) {
                                    aw++, au = Q(e), at.push(au), P()
                                });
                                var ar = X("#resultsummary");
                                ar.each(function() {
                                    var f = X(this), e = f.find(".count");
                                    e.text(aw)
                                }), X("<div/>", {"class": "my-new-list", html: at.join("")}).appendTo("#js-search-results"), P()
                            }
                            if (Y.gdt.Utils.Browser.isMobileLayout) {
                                var aq = X("#mobileAccCheckFilters").find("[name=mobile-acc-filter]:checked").val(), ap = X("#mobileAccCheckFilters").find("[name=mobile-acc-filter]:checked").next().text();
                                if ("online" === aq) {
                                    var ao = X("#js-search-results"), an = ao.find("a"), am = an.length, al = ao.find(".sFALSE").length, ak = X("#resultsummary");
                                    ak.each(function() {
                                        var f = X(this), e = f.find(".count");
                                        e.text(am - al)
                                    }), X(".soldOnlineAccessories").text(ap), X("#js-search-results").find(".sFALSE").hide()
                                }
                                Y.gdt.ProdComparator.overlayPositionHandler()
                            }
                        }), X.getJSON(aj, function(ar) {
                            Y.gdt.snbFilteredResultsData.data = [];
                            var ao, an = X("#mobileAccCheckFilters").find("[name=mobile-acc-filter]:checked").val(), am = [], al = [], ak = 0;
                            -1 !== D ? X.each(ar.productsDetail, function(g, m) {
                                var l = "";
                                "WBR" === m["product-family"] && Y.gdt.Utils.Browser.isMobileLayout && (l = ""), ak++, ao = Q(m), am.push(ao), P(), Y.gdt.snbFilteredResultsData.data.push(m)
                            }) : X.each(ar.productsDetail, function(l, m) {
                                void 0 !== m.collections[ai] && m.collections[ai].length > 0 && X.each(m.collections[ai], function(g, x) {
                                    var s = "";
                                    "WBR" === m["product-family"] && Y.gdt.Utils.Browser.isMobileLayout && (s = ""), -1 !== E ? ("" === af && "" === ae ? x === ah.toString() && "TRUE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)) : "" === ae ? (x === ah.toString() && m["buckle-width"] === af && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)), x === ah.toString() && m["buckle-width"] === af && "TRUE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m))) : "" === af ? x === ah.toString() && m["buckle-type"] === ae && "TRUE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)) : x === ah.toString() && m["buckle-type"] === ae && m["buckle-width"] === af && "TRUE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)), "" !== ae && x === ah.toString() && m["buckle-type"] !== ae && "TRUE" === m["sold-online"] && (ao = Q(m), al.push(ao))) : 0 === B.length ? ("" === af && "" === ae ? x === ah.toString() && "FALSE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)) : "" === ae ? x === ah.toString() && m["buckle-width"] === af && "FALSE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)) : "" === af ? x === ah.toString() && m["buckle-type"] === ae && "FALSE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)) : x === ah.toString() && m["buckle-type"] === ae && m["buckle-width"] === af && "FALSE" === m["sold-online"] && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)), "" !== ae && x === ah.toString() && m["buckle-type"] !== ae && "FALSE" === m["sold-online"] && (ao = Q(m), al.push(ao))) : ("" === af && "" === ae ? x === ah.toString() && (ao = Q(m), am.push(ao), ak++, Y.gdt.snbFilteredResultsData.data.push(m)) : "" === ae ? x === ah.toString() && m["buckle-width"] === af && (Y.console.log(m.length), ao = Q(m), am.push(ao), ak++, Y.gdt.snbFilteredResultsData.data.push(m)) : "" === af ? x === ah.toString() && m["buckle-type"] === ae && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)) : x === ah.toString() && m["buckle-type"] === ae && m["buckle-width"] === af && (ak++, ao = Q(m), am.push(ao), Y.gdt.snbFilteredResultsData.data.push(m)), "" !== ae && x === ah.toString() && m["buckle-type"] !== ae && (ao = Q(m), al.push(ao)))
                                })
                            });
                            var i = X("#strapsWidhDiffBuckles");
                            if (!Y.gdt.Utils.Browser.isMobileLayout && i.length && al.length) {
                                for (var h = al, f = '<ul class="product-list">', e = 0;
                                        2 >= e;
                                        e++) {
                                    h.length > e && (f += '<li class="product-list-item">' + h[e] + "</li>")
                                }
                                i.append(f).show()
                            }
                            var av = X("#resultsummary");
                            if (av.each(function() {
                                var l = X(this), g = l.find(".count");
                                g.text(ak), -1 !== E && 0 !== ak ? X("#mobileAccCheckFilters").hide() : X("mobileAccCheckFilters").show()
                            }), X("<div/>", {"class": "my-new-list", html: am.join("")}).appendTo("#js-search-results"), "online" === an) {
                                var au = X("#js-search-results"), at = au.find("a"), aq = at.length, ap = au.find(".sFALSE").length;
                                av = X("#resultsummary"), av.each(function() {
                                    var l = X(this), g = l.find(".count");
                                    g.text(aq - ap)
                                }), X("#js-search-results").find(".sFALSE").hide()
                            }
                            P()
                        });
                        var b = X("#snb-selection");
                        b.each(function() {
                            var l = X(this), i = l.find(".case"), al = l.find(".diameter"), ak = l.find(".pin"), x = l.find(".ref"), s = l.find(".bref"), m = l.find(".sref");
                            (t || v) && ("" === t && "" !== v ? ak.text(v.replace(/[+]/gi, " ")).parent().show() : "" !== t && "" === v ? ak.text(t.replace(/[+]/gi, " ")).parent().show() : ak.text(v.replace(/[+]/gi, " ") + "-" + t.replace(/[+]/gi, " ")).parent().show()), w && s.text(w).parent().show(), q && m.text(q).parent().show(), y && i.text(y.replace(/[+]/gi, " ")).parent().show(), u && al.text(u.replace(/[+]/gi, " ")).parent().show(), x.text(ac)
                        }), -1 !== aa ? (F.addClass("show"), G.removeClass("show")) : (F.removeClass("show"), G.addClass("show"))
                    }
                    function U() {
                        X("#accFilters").find(".accFilters").each(function() {
                            var h = X(this), c = h.find("label"), l = c.find("input[type=text]"), k = h.find("label.mandatory"), j = k.find("select"), i = h.find(".error");
                            h.on("submit", function(e) {
                                var d = !1;
                                j.each(function() {
                                    "" === X(this).val() && (d = !0)
                                }), d && (e.preventDefault(), k.addClass("has-error"), l.addClass("has-error"), i.addClass("has-error"))
                            })
                        })
                    }
                    function T() {
                        var b = Y.location.search, f = b.indexOf("checkBoutique=");
                        if (H.each(function() {
                            var a = X(this), i = a.find("a"), h = i.attr("href"), d = i.data("eboutique");
                            -1 !== f ? i.attr("href", d + b) : i.attr("href", h + b)
                        }), Y.gdt.Utils.Browser.isMobileLayout) {
                            var c = H.clone(!0);
                            X("main").prepend(c), H.hide()
                        }
                    }
                    function S() {
                        var b = C.find(".radio-list");
                        b.find('input[type="radio"]').click(function() {
                            "REF" === X(this).attr("value") ? (C.find(".refSection").addClass("show"), C.find(".watchDetailBox").removeClass("show")) : (C.find(".watchDetailBox").addClass("show"), C.find(".refSection").removeClass("show"))
                        })
                    }
                    function R() {
                        var t = W("case"), s = W("case-diameter"), r = W("buckle-type"), q = W("buckle-size"), p = W("wid"), o = W("sid"), n = W("bid"), d = C.find(".accordion-tabs-nav"), c = Y.location.search.indexOf("ref="), b = Y.location.search.indexOf("found=");
                        t = t.replace(new RegExp("%7C", "g"), "|"), s = s.replace(new RegExp("%7C", "g"), "|"), r = r.replace(new RegExp("%7C", "g"), "|"), q = q.replace(new RegExp("%7C", "g"), "|"), t = t.replace(/[+]/gi, " "), s = s.replace(/[+]/gi, " "), r = r.replace(/[+]/gi, " "), q = q.replace(/[+]/gi, " "), (1 === c || b > 0 || o || n) && (d.find("input").attr("checked", !1), d.find("input.refbutton").trigger("click"), p && X(".accFilters input[type=text]:first").val(p), X(".accFilters input[type=text]:last").val(o ? o : n), b > 0 && C.find(".refSection").find("form").find("label:last input, span.error").addClass("has-error")), t && s && C.find(".watchDetailBox").find(".accFilters").each(function() {
                            var a = X(this), k = a.find("select:first"), g = a.find("select:eq(1)"), f = a.find("select:eq(2)"), e = a.find("select:eq(3)");
                            k.val(t), g.val(s), f.val(r), e.val(q)
                        })
                    }
                    function Q(ag) {
                        var af, ae, ad = X("#tpl-product-overlay").html(), ac = /{{ prodCode }}/gi, ab = /{{ prodPathValue }}/gi, aa = /{{ prodFamily }}/gi, z = /{{ prodImgUrl }}/gi, y = /{{ prodTitle }}/gi, x = /{{ prodSubTitle }}/gi, w = /{{ prodDetailUrl }}/gi, v = /{{ prodPrice }}/gi, u = /{{ prodComparable }}/gi, t = /{{ prodPurchasable }}/gi, l = /{{ addTocartAllowed }}/gi, c = /{{ productPath }}/gi, ah = /{{ prodTitleEnglish }}/gi;
                        return af = ad.replace(ac, ag["global-reference"]).replace(aa, ag["product-family"]).replace(z, ag["image-path"]).replace(y, ag.title).replace(x, ag.subtitle).replace(w, ag.url).replace(v, ag.price).replace(ab, ag.productPath).replace(u, ag.isComparable).replace(t, ag.isPurchasable).replace(l, ag.isAddToCartAllowed).replace(c, ag.url).replace(ah, ag["product-title-english"]), ae = X(af), ae.addClass("s" + ag["sold-online"]), O(ae), ae.prop("outerHTML")
                    }
                    function P() {
                        Y.gdt.ProdComparator.toggleProdInfo(), Y.gdt.ComparatorUtil.setComparatorItem(), Y.gdt.BasketAndWishlist.setWishlistOverlay(X("#mulipleWishList")), Y.gdt.ProdComparator.overlayPositionHandler()
                    }
                    function O(f) {
                        var e = f.data("prod-purchaseable"), h = f.data("prod-comparable"), g = f.data("prod-addtocart");
                        "FALSE" === h && f.find(".product-list-item-compare-btn").addClass("hide-prod-detail"), "FALSE" === e && f.find(".price-tag").addClass("hide-prod-detail"), "FALSE" === g && f.find(".save-product").addClass("hide-prod-detail")
                    }
                    function N() {
                        1 === X("#accMoreFilters").length && V(), 1 === H.length && T(), 1 === X("#accFilters").length && (U(), S(), R())
                    }
                    Y.gdt = Y.gdt || {}, Y.gdt.snbFilteredResultsData = {};
                    var M = "undefined" == typeof window.ontouchstart ? "click" : "touchend", L = X("#accMoreFilters"), K = X("#showHideFiltersBtn"), J = X("#openFiltersM"), I = L.find(".resetBtn"), H = X("#snb-selection"), G = H.find(".normSelection"), F = H.find(".refSelection"), E = Y.location.search.indexOf("checkBoutique="), D = Y.location.search.indexOf("wid="), C = X("#accFilters"), B = X("#soldOnlnie"), A = X("html");
                    Y.gdt.Utils.Browser.isMobileLayout || L.find(".showHideFilters .fColumn").mCustomScrollbar({scrollInertia: 0}), X(".soldOnlnie").each(function() {
                        var b = X(this), h = b.find(".soldOnline"), g = b.find(".viewAll"), c = X("#resultsummary .count");
                        h.on(M, function(d) {
                            d.preventDefault();
                            var f = X("#js-search-results"), e = f.find(".sTRUE").length;
                            h.addClass("active"), g.removeClass("active"), X("#js-search-results").find(".sFALSE").hide(), c.text(e), Y.gdt.ProdComparator.overlayPositionHandler()
                        }), g.on(M, function(d) {
                            d.preventDefault();
                            var f = X("#js-search-results"), e = f.find("div.list-item-detail-wrapper").length;
                            g.addClass("active"), h.removeClass("active"), X("#js-search-results").find(".sFALSE").show(), c.text(e), Y.gdt.ProdComparator.overlayPositionHandler()
                        })
                    }), N()
                }(document, window, window.jQuery || window.Zepto), function(t, s, r) {
                    function q() {
                        function y() {
                            for (var u = this, E = r("body"), D = 0, C = n.length;
                                    C > D;
                                    D++) {
                                n[D].name === u.getTitle() && (s.location = n[D].pagePath)
                            }
                            E.trigger("boutique:pin:clicked")
                        }
                        function x() {
                            var u = this, D = r("body"), C = u.getTitle();
                            console.log(u.getTitle()), s.gdt.dealerData.mapData.places[C] && (window.location.href = s.gdt.dealerData.mapData.places[C]), D.trigger("boutique:pin:clicked")
                        }
                        var w = new l.Map("coverMap"), v = new l.Point(104.195397, 35.86166);
                        w.enableScrollWheelZoom(), w.centerAndZoom(v, 4);
                        var j = {features: ["road", "building", "water", "land"], style: "dark"};
                        w.setMapStyle(j), w.addControl(new l.NavigationControl), w.addControl(new l.ScaleControl), w.addControl(new l.OverviewMapControl), w.addControl(new l.MapTypeControl);
                        var i = (new l.Icon(o, new l.Size(36, 36), {anchor: new l.Size(36, 36), infoWindowAnchor: new l.Size(18, 35)}), []), h = null, g = null;
                        if (n) {
                            for (var f = 0, c = n.length;
                                    c > f;
                                    f++) {
                                g = new l.Point(n[f].location.longitude, n[f].location.latitude), h = new l.Marker(g, {title: n[f].name}), i.push(h), h.addEventListener("click", y)
                            }
                            new k.MarkerClusterer(w, {markers: i})
                        }
                        if (m) {
                            var b = [];
                            for (var B in s.gdt.dealerData.mapData.places) {
                                s.gdt.dealerData.mapData.places.hasOwnProperty(B) && b.push(B)
                            }
                            for (var A = 0;
                                    A < b.length;
                                    A++) {
                                for (var z = 0;
                                        z < s.countriesWithCapitals.length;
                                        z++) {
                                    b[A] === s.countriesWithCapitals[z].CountryName.toUpperCase() && (g = new l.Point(s.countriesWithCapitals[z].CapitalLongitude, s.countriesWithCapitals[z].CapitalLatitude), h = new l.Marker(g, {title: b[A]}), w.addOverlay(h), h.addEventListener("click", x))
                                }
                            }
                        }
                    }
                    var p = s.gdt.Utils.PubSub.UI_EVENTS, o = s.gdt.Utils.google.mapIcon, n = (s.gdt.boutiqueData || {}).storeData, m = (s.gdt.dealerData || {}).mapData, l = s.BMap, k = s.BMapLib;
                    r.pubsub("subscribe", p.baiduMaps, function() {
                        r("#coverMap").length && q()
                    })
                }(document, window, window.jQuery), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.BasketAndWishlist = e.gdt.BasketAndWishlist || {};
                    var g = function() {
                        function ap(i, m, l) {
                            var k = h(i).find("button[clicked=true]")[0], j = h(i).serialize();
                            return k && (j += "&" + k.name + "=" + k.value), S = {productCollection: h(i).find("input[name=productCollection]").val(), productCategory: h(i).find("input[name=productCategory]").val(), productSKU: h(i).find("input[name=productSKU]").val(), refillSKU: h(i).find("input[name=refillsku]").val(), event: h(i).find("input[name=event]").val(), shoppingBagValue: h(i).find("input[name=shoppingbagvalue]").val()}, e.gdt.Utils.ajaxCall({type: h(i).attr("method"), url: h(i).attr("action"), data: j, callback: m, error: l})
                        }
                        function ao(k) {
                            h(".newWishList").modal();
                            var j = k, q = j.find("form"), p = q.find("#wishlistName"), o = q.find("#defaultLabel"), n = o.find("input"), m = o.find("span.label-text"), l = q.find(".cta-wishlist");
                            h(".newWishList").modal(), h(document).on("click", ".newWishList", function(d) {
                                d.preventDefault();
                                var r = h(this).data("path"), i = h(this).data("id");
                                j.find("[name=product-path]").val(r), 0 === U.wishlist.count ? (n.val(U.wishlist.newWishlistName), p.val(U.wishlist.newWishlistName), m.text(U.wishlist.messages.addto.label.replace("{0}", " ") + U.wishlist.newWishlistName), l.find("span").text(U.wishlist.messages.save.label)) : q.each(function() {
                                    var t = q.find("fieldset");
                                    h("#wishlistName").val(U.wishlist.newWishlistName), l.find("span").text(U.wishlist.messages.addto.label.replace("{0}", " ") + U.wishlist.newWishlistName);
                                    var s = "";
                                    h.each(U.wishlist.wishlists, function(u, y) {
                                        var x = U.wishlist.messages.addto.label, w = "", v = "";
                                        h.each(this.items, function(A, z) {
                                            z.id === i && (w = " disabled", v = " checked disabled")
                                        }), s += "<label class='checkbox" + w + "'><input type='checkbox' " + v + " value='" + y.name + "'><span class='label-text'>" + x.replace("{0}", "<span>" + y.name) + "</span></span></label>"
                                    }), t.find("#newContent").html(s)
                                })
                            })
                        }
                        function an() {
                            e.gdt.CommerceContent.update()
                        }
                        function am() {
                            U = e.gdt.CommerceContent.data();
                            var d = U.wishlist && U.wishlist.items ? U.wishlist.items : [];
                            if (U.wishlist != undefined) {
                                U.wishlist.itemsArray = h.map(d, function(i) {
                                    return i.id
                                }), al(), ao(h("#mulipleWishList"))
                            } else {
                                U.wishlist = [];
                            }
                        }
                        function al() {
                            U.wishlist.count > 0 ? (h(".ecom .wishlist span").addClass("show").text("(" + U.wishlist.count + ")"), h(".noEComm .wishlist span").addClass("show").text("(" + U.wishlist.count + ")")) : (h(".ecom .wishlist span").removeClass("show"), h(".noEComm .wishlist span").removeClass("show")), U.shoppingbag.count > 0 ? (h(".ecom .sbag").addClass("show").find("span").text("(" + U.shoppingbag.count + ")"), h("#shopping-bag-overlay").find("h1:first span").text(U.shoppingbag.count), h(".sBMicon sup").text(U.shoppingbag.count).addClass("show")) : (h(".ecom .sbag").removeClass("show"), h("#mobileCartCount").text("").removeClass("show")), e.gdt.Utils.Browser.isMobileLayout && h.pubsub("subscribe", b.basketUpdated, function() {
                                var i = h("#shoppingBagMobile").find(".sBMicon").clone(!0), d = i.addClass("blink");
                                h("#top").before(d), d.on("click", function() {
                                    h("html, body").animate({scrollTop: 0}, 300)
                                }), setTimeout(function() {
                                    i.remove()
                                }, 5000)
                            })
                        }
                        function ak(i) {
                            var d = h("<div>" + i + "</div>");
                            aa.empty().html(d.find("#wishlist").html())
                        }
                        function aj(i) {
                            var d = h("<div>" + i + "</div>");
                            Y.empty().html(d.find("#shoppingbag").html())
                        }
                        function ai(i) {
                            var d = h("<div>" + i + "</div>");
                            W.find(".basket-overlay-content").empty().removeClass("loading").html(d.find("#shoppingbag").html()), W.find(".basket-overlay-content .mcItems").mCustomScrollbar({scrollInertia: 0})
                        }
                        function ah(i) {
                            var j = h(".shopping-nav .wishlist a").data("href");
                            j && N && e.gdt.Utils.ajaxCall({type: "GET", url: j + "?cachebust=" + (new Date).getTime(), callback: i})
                        }
                        function ag(d) {
                            var i;
                            i = Y.length ? e.gdt.shoppingBagFragment : e.gdt.shoppingMiniBagFragment, i && N && e.gdt.Utils.ajaxCall({type: "GET", url: i + "?cachebust=" + (new Date).getTime(), callback: d})
                        }
                        function af(d) {
                            d && ai(d), W.addClass("show")
                        }
                        function ae() {
                            W.removeClass("show")
                        }
                        function ad(i, d) {
                            h("#js-wishlist-caro li.slide").each(function() {
                                var j = h(this), l = j.find(".product-list-item"), k = l.length;
                                1 === k ? location.reload() : l.each(function() {
                                    var m = h(this), n = m.find("input[value=" + d + "]");
                                    n.parents(".product-list-item.noPlacement").remove()
                                })
                            })
                        }
                        function ab(d) {
                            return d.replace(/\s/g, "")
                        }
                        function Z() {
                            document.getElementById("card-number").value = ab(document.getElementById("card-number").value), P = h("#card-types option:selected").val(), O.contents().find("#Paymetric_CreditCardType").val(V(P)), O.contents().find("#Paymetric_CreditCardNumber").val(document.getElementById("card-number").value), O.contents().find("#Paymetric_Exp_Month").val(document.getElementById("card-expiration-month").value), O.contents().find("#Paymetric_Exp_Year").val(document.getElementById("card-expiration-year").value), O.contents().find("#Paymetric_CVV").val(document.getElementById("card-cvv").value), h("#sendCounter").val(parseInt(h("#sendCounter").val(), null) + 1)
                        }
                        function X() {
                            if (h("#sendCounter").val() > 0) {
                                var i = h.parseJSON(h("#ifrm").contents().find("#responseJson").text());
                                ("0" === i.binRangeType || 0 === i.binRangeType) && (h(".card-number.creditcard").addClass("has-error").find("input").addClass("has-error"), h(".card-number.creditcard").find("span.creditcard").removeAttr("hidden"), document.getElementById("ifrm").contentDocument.location.reload(!0)), "true" === i.backendStatus ? (P = h("#card-types option:selected").val(), document.getElementById("parsepaymreqdata[0]").value = "true", document.getElementById("paytypekey[0]").value = "paytype1", document.getElementById("paytype[0]").value = "3", document.getElementById("nolog_cardtype[0]").value = i.binRangeType, document.getElementById("nolog_cardno[0]").value = i.responseToken, document.getElementById("CCToken").value = i.responseToken, document.getElementById("nolog_cardholder[0]").value = "{dynamic from server}", document.getElementById("nolog_cardmonth[0]").value = i.expirationMonth, document.getElementById("nolog_cardyear[0]").value = i.expirationYear, document.getElementById("cc_bin").value = document.getElementById("card-number").value.substring(0, 6), document.getElementById("ECO_CreditCardText").value = T(P), h.trim(document.getElementById("nolog_cardtype[0]").value).length > 0 && T(P) === document.getElementById("nolog_cardtype[0]").value && (h("#card-number").attr("disabled", !0), document.getElementById("nolog_cardtype[0]").value = P, document.getElementById("checkout-payment").submit())) : h("#checkout-payment").prepend('<div class="form-errors"><h2>' + i.errorHeading + "</h2><p>" + i.errorMessage + "</p></div>")
                            } else {
                                if (-1 !== h("#ifrm").contents().find("body").text().indexOf("Status")) {
                                    var d = document.getElementById("ifrm");
                                    d.src = d.src
                                }
                            }
                        }
                        function V(d) {
                            return"VISA" === d ? "4000" : "DISC" === d ? "6000" : "MAST" === d ? "5000" : "AMEX" === d ? "3000" : "DINE" === d ? "PM_Cust_Card_Type_Header1000" : "JCB" === d ? "PM_Cust_Card_Type_Header7000" : void 0
                        }
                        function T(d) {
                            return"VISA" === d ? "4000" : "DISC" === d ? "6000" : "MAST" === d ? "5000" : "AMEX" === d ? "3000" : "DINE" === d ? "1000" : "JCB" === d ? "7000" : void 0
                        }
                        function R() {
                            return e.gdt.CommerceContent && e.gdt.CommerceContent.update(), f.getElementById("shoppingbag") || ag(ai), {contents: function() {
                                    return U
                                }, showOverlay: af, hideOverlay: ae}
                        }
                        var P, N = e.gdt.Utils.noWCM, L = "undefined" == typeof window.ontouchstart ? "click" : "touchend", b = e.gdt.Utils.PubSub.UI_EVENTS, ac = h("body"), aa = h("#wishlist"), Y = h("#shoppingbag"), W = h("#shopping-bag-overlay"), U = {}, S = {}, Q = h("#checkout-payment"), O = h("#ifrm"), M = h("#checkout-payment button.form_button_submit"), c = h("#checkout-payment label.card-cvv input");
                        c.on(L, function() {
                            c.select()
                        }), h("#shoppingBagMobile").each(function() {
                            var i = h(this), d = i.find(".sBMicon");
                            d.on(L, function() {
                                i.toggleClass("openIt")
                            })
                        }), h(".editWishlist").modal(), h("#js-wishlist-caro li.slide").each(function() {
                            var j = h(this), i = j.find(".product-list-item"), k = j.find("h2").text();
                            i.each(function() {
                                h(this).find("input[name=wishlist-name]").val(k)
                            })
                        }), ac.on(L, ".editWishlist", function() {
                            var j = h(this).parents(".slide:first").addClass("active").find("h2.editWishlist"), i = h("#renameWishList"), m = j.text(), l = i.find("[name=old-wishlist-name]"), k = i.find(".currentName");
                            l.val(m), k.val(m)
                        }), h("#js-wishlist-caro").each(function() {
                            var i = h(this), d = i.find("li.slide");
                            1 === d.length && d.addClass("active")
                        }), h("#mulipleWishList").each(function() {
                            var j = h(this).find("form"), i = j.find(".cta-wishlist"), k = j.find("[name=wishlist-name]");
                            j.parents(".slide:first").addClass("active"), ac.on(L, "#mulipleWishList .checkbox:not(.disabled)", function() {
                                var d = h(this).find("input:first").val();
                                k.val(d), i.trigger("click")
                            })
                        }), h(".topnav .sbag").on(L, function(d) {
                            U.shoppingbag.count > 0 && d.preventDefault(), !U.shoppingbag || !U.shoppingbag.count || W.hasClass("show") || f.getElementById("shoppingbag") || f.getElementById("checkout") ? W.removeClass("show") : "" === W.find(".basket-overlay-content").html() ? ag(function(i) {
                                af(i), W.find(".basket-overlay-content .mcItems").mCustomScrollbar({scrollInertia: 0})
                            }) : W.addClass("show")
                        }), ac.on(L, "button[name]", function() {
                            h("button[clicked=true]").removeAttr("clicked"), h(this).attr("clicked", "true")
                        }), ac.on("submit", ".save-product", function(t) {
                            t.preventDefault();
                            var s = h(this), r = h(".currentName").val(), q = s.find("button[clicked=true]"), p = q.length ? q.val() : this.elements["op:"].value, o = p === U.shoppingbag.actions.add.value, n = p === U.wishlist.actions.add.value, m = p === U.wishlist.actions.remove.value, d = "rename-wishlist" === p;
                            q.addClass("loading"), ap(s, function(i, k, j) {
                                j.getResponseHeader("x-error-message") ? (h("#js-basket-error").find(".error-message").html(j.getResponseHeader("x-error-message")), h.pubsub("publish", b.basketError)) : o ? (e.gdt.Utils.Browser.isMobileLayout || ag(function(l) {
                                    af(l)
                                }), h.pubsub("publish", b.basketUpdated)) : n || m ? (h.pubsub("publish", b.wishlistUpdated), h.pubsub("publish", b.modal.close), h(".newWishList").removeClass("loading"), h(".mySelection").addClass("opened")) : d && (h(".slide.active").find("h2.editWishlist").text(r), h(".slide.active").find(".product-list-item").each(function() {
                                    h(this).find("input[name=wishlist-name]").val(r)
                                }), h.pubsub("publish", b.modal.close)), q.removeClass("loading")
                            }, function(j) {
                                var i, k;
                                q.removeClass("loading"), 409 === j.status && (i = h("<div/>").html(j.responseText), k = i.find("h1").html(), h("#js-basket-error").find(".error-message").html(k), h.pubsub("publish", b.basketError))
                            })
                        }), ac.on("submit", ".basket-remove", function(i) {
                            i.preventDefault();
                            var d = h(this);
                            d.find("button").addClass("loading"), ap(d, function() {
                                d.find("button").removeClass("loading"), ae(), h.pubsub("publish", b.basketUpdated), 1 === U.shoppingbag.count ? (U.shoppingbag.count = 0, S.event = "removeFromShoppingBag", ac.trigger("basketUpdated", S)) : (S.event = "removeFromShoppingBag", ac.trigger("basketUpdated", S), U.shoppingbag.count = U.shoppingbag.count - 1), al(), am()
                            })
                        }), ac.on("submit", ".addAnother", function(i) {
                            i.preventDefault();
                            var d = h(this);
                            d.find("button").addClass("loading"), ap(d, function(j, l, k) {
                                k.getResponseHeader("x-error-message") ? (h("#js-basket-error").find(".error-message").html(k.getResponseHeader("x-error-message")), h.pubsub("publish", b.basketError), d.find("button").removeClass("loading")) : (ae(), h.pubsub("publish", b.basketUpdated), 1 === U.shoppingbag.count && (U.shoppingbag.count = 0, ac.trigger("basketUpdated", S)), al(), am())
                            })
                        }), ac.on("submit", ".wishlist-remove", function(i) {
                            i.preventDefault();
                            var d = h(this), k = d.find("[name=product-id]").val(), j = d.find("[name=wishlist-name]").val();
                            d.find("button").addClass("loading"), ap(d, function() {
                                h.pubsub("publish", b.wishlistUpdated), am(), ad(j, k), ac.trigger("wishlistUpdated", S), d.find("button").removeClass("loading")
                            })
                        }), ac.on(L, function(d) {
                            h(d.target).parents("#shopping-bag-overlay").length || W.removeClass("show")
                        }), h("body").on(L, ".sbag", function(d) {
                            d.stopPropagation()
                        }), M.on(L, function(d) {
                            d.preventDefault(), e.gdt.Validate.form(document.forms["checkout-payment"].name) === !0 && (h("#creditCard").is(":checked") ? (Z(), h("#sendCounter").val(parseInt(h("#sendCounter").val(), null) + 1), h("#PayNowButton", document.getElementById("ifrm").contentWindow.document).click()) : h("form[name=checkout-payment]").submit())
                        }), Q.length && (O.on("load", X), h("#checkout-payment").on("click", ".radio", function() {
                            var i = h(this), d = h("#ccFormFieldset");
                            i.on("click", function() {
                                i.hasClass("paypal") ? d.attr("disabled", !0) : d.attr("disabled", !1)
                            })
                        })), h.pubsub("subscribe", b.commerceContentJSON, function() {
                            am()
                        }), h.pubsub("subscribe", b.basketUpdated, function() {
                            ag(f.getElementById("shoppingbag") ? aj : ai), an()
                        }), h.pubsub("subscribe", b.wishlistUpdated, function() {
                            f.getElementById("wishlist") ? ah(ak) : an()
                        });
                        var a = h(".press-header");
                        return a ? {setWishlistOverlay: ao} : R()
                    };
                    e.gdt.BasketAndWishlist = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function P() {
                            E.removeAttr("disabled").prop("disabled", !1).removeAttr("hidden").addClass("show")
                        }
                        function O() {
                            E.attr("disabled", "disabled").prop("disabled", !0).attr("hidden", "hidden").removeClass("show")
                        }
                        function N() {
                            C.removeAttr("disabled").prop("disabled", !1).removeAttr("hidden").addClass("show")
                        }
                        function M() {
                            C.attr("disabled", "disabled").prop("disabled", !0).attr("hidden", "hidden").removeClass("show")
                        }
                        function L(i) {
                            var d = y.prev(".label-text"), j = d.text();
                            "IE" === i || "HK" === i || "MO" === i || "AE" === i || "QA" === i ? (z.find("option:eq(0)").prop("selected", !0), z.prop("disabled", !0), z.parents("label").addClass("disabled"), y.prop("required", !1), B.prop("checked", !1), B.prop("disabled", !0), N(), d.text(j.replace("*", ""))) : "" !== i && "US" !== i ? (z.find("option:eq(0)").prop("selected", !0), z.prop("disabled", !0), z.parents("label").addClass("disabled"), y.prop("required", !0), B.prop("checked", !1), B.prop("disabled", !0), N(), d.text(x)) : (z.prop("disabled", !1), z.parents("label").removeClass("disabled"), y.prop("required", !0), B.prop("checked", !0), B.prop("disabled", !1), M(), d.text(x))
                        }
                        function K() {
                            var d = !0;
                            return E.find("input, select, textarea").each(function() {
                                if ("hidden" !== this.getAttribute("type")) {
                                    var a, j = h(this), i = this.name.replace("billing", "shipping");
                                    "radio" === this.type ? (a = D.find('[name="' + i + '"][value="' + this.value + '"]').first(), j.prop("checked") !== a.prop("checked") && (d = !1)) : (a = D.find('[name="' + i + '"]').first(), j.val() !== a.val() && (d = !1))
                                }
                            }), "" === h("#shippingAddress input[type=text]:first").val() && (d = !0), d
                        }
                        function J() {
                            B.on("change", function() {
                                B.prop("checked") && e.gdt.Utils.noWCM ? M() : N()
                            })
                        }
                        function I() {
                            var j = h("#order-review .component-orderreview .personalise .checkbox"), i = h("#order-review .component-orderreview .personalise .resourcePath").val(), k = h("#order-review .component-orderreview .personalise .entryIndexValue").val();
                            j.find('input[type="checkbox"]').change(function() {
                                this.checked && h.ajax({url: i + ".gift-wrap.html", type: "POST", data: {strID: k, strState: "checked"}})
                            })
                        }
                        function H(i, d) {
                            i.change(function() {
                                var j = h(this).val();
                                j ? (h(d).find(".city:not(:contains(" + j + "))").parents("li").slideUp(), h(d).find(".city:contains(" + j + ")").parents("li").slideDown()) : h(d).find("li").slideDown()
                            }).keyup(function() {
                                h(this).change()
                            })
                        }
                        function G() {
                            var d = K();
                            J(), I(), B.prop("checked", d), d ? M() : (N(), e.gdt.Utils.Browser.isMobileLayout && c.find("div.form").addClass("openNewShippingOptions")), H(h("#filterResults"), h("#boutiquePick ul"))
                        }
                        var F = e.gdt.Utils.PubSub.UI_EVENTS, E = h("#billingAddress"), D = h("#shippingAddress"), C = h("#shippingAddress").find("fieldset"), B = h('[name="sameBillingAddress"]'), A = h('[name="billing.country"]'), z = h('[name="billing.state"]'), y = h('[name="billing.zipcode"]'), x = y.prev(".label-text").text(), c = h("#checkout.billing-shipping");
                        e.gdt.Utils.Browser.isMobileLayout && c.on("click", ".editable-richtext h2, h2.noLine, #contactInfo h2", function() {
                            var d = h(this);
                            void 0 !== d.parents(".editable-richtext").next().prop("id") && "billingAddress" === d.parents(".editable-richtext").next().prop("id") && d.parents("div.form").hasClass("openBillingAddress") ? d.parents("div.form").removeClass("openNewShippingOptions openContactInfo openBillingAddress").addClass("nothingOpened") : void 0 !== d.parents(".editable-richtext").next().prop("id") && "billingAddress" === d.parents(".editable-richtext").next().prop("id") ? d.parents("div.form").removeClass("openNewShippingOptions openContactInfo nothingOpened").addClass("openBillingAddress") : "" !== d.prop("class") && "noLine" === d.prop("class") && d.parents("div.form").hasClass("openNewShippingOptions") ? d.parents("div.form").removeClass("openBillingAddress openContactInfo openNewShippingOptions").addClass("nothingOpened") : "" !== d.prop("class") && "noLine" === d.prop("class") ? d.parents("div.form").removeClass("openBillingAddress openContactInfo nothingOpened").addClass("openNewShippingOptions") : void 0 !== d.parents("#contactInfo").prop("id") && "contactInfo" === d.parents("#contactInfo").prop("id") && d.parents("div.form").hasClass("openContactInfo") ? d.parents("div.form").removeClass("openBillingAddress openNewShippingOptions openContactInfo").addClass("nothingOpened") : void 0 !== d.parents("#contactInfo").prop("id") && "contactInfo" === d.parents("#contactInfo").prop("id") && d.parents("div.form").removeClass("openBillingAddress openNewShippingOptions nothingOpened").addClass("openContactInfo")
                        });
                        var b = A.val();
                        return h("#checkout").length && L(b), A.on("change", function(i) {
                            var d = this.options[i.target.selectedIndex].value;
                            L(d)
                        }), h.pubsub("subscribe", F.shippingTabClicked, function() {
                            "US" !== A.val() && (N(), B.prop("checked", !1), B.prop("disabled", !0))
                        }), G(), {show: P, hide: O}
                    };
                    e.gdt.billingAddress = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function R() {
                            G.on(K, function(j) {
                                j.preventDefault(), j.stopPropagation();
                                var i = "promo-open", l = H.hasClass(i) ? c : b, k = H.hasClass(i) ? 0 : H.find("ul").outerHeight();
                                H.hasClass(i) ? H.hasClass(i) && H.removeClass(i) : H.addClass(i), H.toggleClass(i).css("max-height", k + "px"), G.text(l), y = {event: "specialEditionClicked", boutique: h(this).data("tracking-boutique")}, B.trigger("specialEditionClick", y)
                            })
                        }
                        function Q() {
                            F.on("change", function() {
                                0 !== this.selectedIndex && e.location.replace(h(this).val())
                            })
                        }
                        function P() {
                            h.pubsub("subscribe", J.mapApiLoaded, function() {
                                E.mapWithMarker(), E.show(), A.addClass("visible")
                            }), h.pubsub("subscribe", J.baiduMaps, function() {
                                E.bmapWithMarker(), E.show(), z.addClass("visible")
                            })
                        }
                        function O() {
                            D.tabAccordion({trigger: "h4"})
                        }
                        function N() {
                            I.akcarousel({delay: 6000, horizontal: !0, scrollNode: !0, autoSwitch: !0, scrollSpeed: 5, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", navarrows: !1})
                        }
                        function M() {
                            h(e).smartresize(function() {
                                e.matchMedia("only screen and (min-width: 668px)").matches ? E.insertBefore(C) : E.insertAfter(C)
                            }), h(e).trigger("resize")
                        }
                        function L() {
                            I.length && (e.matchMedia("only screen and (min-width: 668px)").matches || D.find(".accordion-tabs-content-active").removeClass("accordion-tabs-content-active"), N(), R(), P(), O(), Q(), M())
                        }
                        var K = "click touchend", J = e.gdt.Utils.PubSub.UI_EVENTS, I = h("#js-carousel-boutique"), H = h("#js-splash-promo"), G = h("#js-show-promo"), F = h("#js-boutique-select").find("select"), E = h("#js-boutique-map"), D = h("#js-boutique-details"), C = h("#js-boutique-hours"), B = h("body"), A = h(".boutique-info > .boutique-maplink"), z = h(".boutique-info .china-maplinks .boutique-maplink"), y = {}, c = G.text(), b = G.data("closetext");
                        L()
                    };
                    e.gdt.Boutique = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function r(j) {
                            j = j.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                            var i = "[\\?&]" + j + "=([^&#]*)", s = new RegExp(i), k = s.exec(window.location.href);
                            return null === k ? "" : k[1]
                        }
                        function q() {
                            var a = r("case"), v = r("case-diameter");
                            a = a.replace(new RegExp("%7C", "g"), "|"), v = v.replace(new RegExp("%7C", "g"), "|"), a = a.substring(0, a.indexOf("|")), v = v.substring(0, v.indexOf("|"));
                            var u = window.location.protocol, t = window.location.host, s = window.location.pathname;
                            s = s.substring(0, s.indexOf("."));
                            var k = h("input.strapsVariantsPath").data("path"), j = h("input.bucklesVariantsPath").data("path");
                            h("input.strapsVariantsPath").val(u + "//" + t + s + k + a + "." + v + ".html"), h("input.bucklesVariantsPath").val(u + "//" + t + s + j + a + "." + v + ".html")
                        }
                        function p() {
                            var a = h("input.strapsVariantsPath").val();
                            if (l > 0 && c > 0) {
                                var i = r("ref");
                                a = a.slice(0, -6), a = a + "REF-" + i + ".html"
                            }
                            h.ajax({type: "GET", url: a, dataType: "html", success: function(k) {
                                    var j = h("div.related-straps");
                                    j.html(k), h("main div.related-straps ul li").length < 1 && h("div.related-straps").remove(), h("div.related-straps a").attr("href", function(u, d) {
                                        return d + "?" + m
                                    });
                                    var t, s = j.find("a.view-all").attr("href");
                                    void 0 !== s && (t = s.replace("BOUCLE_", "")), j.find("a.view-all").attr("href", t)
                                }})
                        }
                        function o() {
                            var a = h("input.bucklesVariantsPath").val();
                            if (l > 0 && c > 0) {
                                var i = r("ref");
                                a = a.slice(0, -6), a = a + "REF-" + i + ".html"
                            }
                            h.ajax({type: "GET", url: a, dataType: "html", success: function(d) {
                                    h("div.related-buckle").html(d), h("div.related-buckle a").attr("href", function(k, j) {
                                        return j + "?" + m
                                    }), h("main div.related-buckle ul li").length < 1 && h("div.related-buckle").remove()
                                }})
                        }
                        function n() {
                            if (h("main #bucklesDetailPage").length > 0) {
                                q(), 1 !== b && (p(), o()), h("nav.product-crumb span a").attr("href", function(j, i) {
                                    return i + "?" + m
                                });
                                var d = document.URL.split("?")[1];
                                void 0 !== d ? (h("#snb-selection .selectionView").show(), h("#snb-selection .selectionView p a").attr("href", function(j, i) {
                                    return i + "?" + m
                                })) : h("#snb-selection .selectionView").hide()
                            }
                        }
                        var m = window.location.href.slice(window.location.href.indexOf("?") + 1), l = e.location.search.indexOf("ref="), c = e.location.search.indexOf("wid="), b = e.location.search.indexOf("bid=");
                        n()
                    };
                    e.gdt.Buckles = new g
                }(document, window, window.jQuery || window.Zepto), function(D, C, B) {
                    function A() {
                        function b() {
                            function o(m, h, F, n) {
                                F = F.toUpperCase(), B.each(m, function(G, J) {
                                    var I = J.value.toUpperCase();
                                    if (F === I) {
                                        var H = "";
                                        B.each(J.values, function(L, K) {
                                            H += "<option value='" + K.value + "'>" + K.label + "</option>"
                                        }), h.html("<option value=''>" + n + "</option>" + H)
                                    }
                                })
                            }
                            function l() {
                                v.hide().prop({disabled: "disabled", hidden: "hidden"})
                            }
                            function k() {
                                v.show().prop({disabled: !1, hidden: !1})
                            }
                            var j = B.cookie("catalogs_catalogRequested");
                            if (null === j || "" === j) {
                                if (p) {
                                    var i = B(".dynamic-dropdown[name=" + p.field + "]"), g = B(".dynamic-dropdown[name=" + p.field + "] option:first").text();
                                    e(p.values, i, g)
                                }
                            } else {
                                var f = B("#catalogs_catalogRequested option:first").text();
                                e(p.values, s, f), c()
                            }
                            if (p && 1 === y.length) {
                                var d = B("#paper_catalog_catalogLanguage"), E = B("#paper_catalog_catalogLanguage option:first").text();
                                o(p.values, d, t, E), u.on("click", function() {
                                    var a = B(this).val();
                                    o(p.values, d, a, E)
                                })
                            }
                            l(), x.on("change", function() {
                                "paper" === B(this).val() ? k() : l()
                            })
                        }
                        function e(g, d, i) {
                            if (d) {
                                var h = "";
                                B.each(g, function(j, f) {
                                    var k = f["cookie-name"] ? 'data-cookie-name="' + f["cookie-name"] + '"' : "";
                                    h += "<option value='" + f.value + "' " + k + ">" + f.label + "</option>"
                                }), d.html("<option value=''>" + i + "</option>" + h)
                            }
                            d && void 0 !== d.val() && "" !== d.val() && B.each(g, function(j, m) {
                                if (d.val() === m.value && void 0 !== m.field) {
                                    var l = B(".dynamic-dropdown[name=" + m.field + "]"), k = B(".dynamic-dropdown[name=" + m.field + "] option:first").text();
                                    e(m.values, l, k)
                                }
                            }), d.on("change", function() {
                                void 0 !== d.val() && "" !== d.val() && B.each(g, function(j, m) {
                                    if (d.val() === m.value && void 0 !== m.field) {
                                        var l = B(".dynamic-dropdown[name=" + m.field + "]"), k = B(".dynamic-dropdown[name=" + m.field + "] option:first").text();
                                        e(m.values, l, k)
                                    }
                                })
                            })
                        }
                        function c() {
                            var H = B("#catalogs_catalogRequested option:first").text(), G = B.cookie("catalogs_catalogRequested"), F = B("#catalogs_catalogType option:first").text(), E = B.cookie("catalogs_catalogType"), o = B("#catalogs_catalogLanguage option:first").text(), n = B.cookie("catalogs_catalogLanguage");
                            if (p) {
                                var m = "", l = "", k = "";
                                B.each(p.values, function(g, i) {
                                    var h = i["cookie-name"] ? 'data-cookie-name="' + i["cookie-name"] + '"' : "";
                                    m += "<option value='" + i.value + "' " + h + ">" + i.label + "</option>", G === i.value && B.each(i.values, function(f, d) {
                                        l += "<option value='" + d.value + "'>" + d.label + "</option>", E === d.value && B.each(d.values, function(I, j) {
                                            k += "<option value='" + j.value + "'>" + j.label + "</option>"
                                        })
                                    })
                                }), s.html("<option value=''>" + H + "</option>" + m), r.html("<option value=''>" + F + "</option>" + l), q.html("<option value=''>" + o + "</option>" + k)
                            }
                            s.val(G), r.val(E), q.val(n)
                        }
                        (1 === z.length || 1 === y.length && Object.keys(p).length) && b(), B("#my-account section.lazy").on("click", function() {
                            B(document).ajaxComplete(function() {
                                z = B("#catalogs"), y = B("#paper_catalog"), x = B("#catalogs_catalogType"), w = z.find("label.streetNumber"), v = w.parent(), u = B('[name="catalogRequested"]'), t = B('[name="catalogRequested"]:checked').val(), s = B("#catalogs_catalogRequested"), r = B("#catalogs_catalogType"), q = B("#catalogs_catalogLanguage"), p = C.gdt.catalogJson, b()
                            })
                        })
                    }
                    C.gdt = C.gdt || {}, C.gdt.Utils = C.gdt.Utils || {};
                    var z = B("#catalogs"), y = B("#paper_catalog"), x = B("#catalogs_catalogType"), w = z.find("label.streetNumber"), v = w.parent(), u = B('[name="catalogRequested"]'), t = B('[name="catalogRequested"]:checked').val(), s = B("#catalogs_catalogRequested"), r = B("#catalogs_catalogType"), q = B("#catalogs_catalogLanguage"), p = C.gdt.catalogJson;
                    B("#catalogs").submit(function() {
                        B.cookie("catalogs_catalogRequested", "", {path: "/"}), B.cookie("catalogs_catalogType", "", {path: "/"}), B.cookie("catalogs_catalogLanguage", "", {path: "/"}), B.cookie("catalogs_catalogRequested", s.val(), {path: "/"}), B.cookie("catalogs_catalogType", r.val(), {path: "/"}), B.cookie("catalogs_catalogLanguage", q.val(), {path: "/"})
                    }), C.gdt.CatalogueConfig = new A
                }(document, window, window.jQuery || window.Zepto), function(aM, aL, aK) {
                    function aJ() {
                        aK("#boutiquePick").find(".checkoutBoutiques").addClass("fullView");
                        for (var b = 0;
                                b < window.gdt.btqpData.boutiqueData.boutiques.length;
                                b++) {
                            var j, i, h = window.gdt.btqpData.boutiqueData.boutiques[b];
                            j = "" !== h.imageURL && void 0 !== h.imageURL ? '<img src="' + h.imageURL + '">' : "", i = "" !== h.storeURL && void 0 !== h.storeURL ? '<a href="' + h.storeURL + '" target="_blank">' + h.moreInfoLabel + "</a>" : "";
                            var c = '<li data-details=\'{"name":"' + h.name + '", "streetNumber": "' + h.streetNumber + '", "streetName": "' + h.streetName + '", "city": "' + h.city + '", "state": "' + h.state + '", "country": "' + h.country + '", "countryName": "' + h.countryName + '", "zipcode": "' + h.zipcode + '"}\' id="' + h.deliveryBoutiqueCode + '"><label class="radio">' + j;
                            c += '<input type="radio" name="btqpCode">', c += '<span class="name">' + h.name + '</span> <span class="firstLine">' + h.streetNumber + ", " + h.streetName + "</br>" + h.state + ", " + h.zipcode + "<br />" + h.countryName + "</span></label>", c += i + "</li>", W.push(c)
                        }
                        at.find("ul").html(W), aL.gdt.Utils.Browser.isMobileLayout || at.mCustomScrollbar(), ax.find(".count").text(window.gdt.btqpData.boutiqueData.boutiques.length), 1 === window.gdt.btqpData.boutiqueData.boutiques.length ? (ax.find(".boutiques").addClass("hide"), ax.find(".boutique").removeClass("hide")) : (ax.find(".boutiques").removeClass("hide"), ax.find(".boutique").addClass("hide")), at.find("li").on("click", function(g) {
                            g.preventDefault();
                            var f = aK(this), l = f.prop("id"), k = f.data("details");
                            aq.val(l), ap.val(k.name), ao.val(k.name), an.val(k.streetNumber), am.val(k.streetName), al.val(k.zipcode), ak.val(k.state), aj.val(k.city), ai.val(k.country), f.find("input").prop("checked", !0)
                        }), at.find("li:first").trigger("click"), jQuery.expr[":"].Contains = function(e, d, f) {
                            return(e.textContent || e.innerText || "").toUpperCase().indexOf(f[3].toUpperCase()) >= 0
                        }, ay.on("click", function(f) {
                            f.preventDefault();
                            var e = au.val();
                            if (e) {
                                aA.addClass("visible"), aK(at).find("li").addClass("opacityZero"), "" !== e ? (aK(at).find("label.radio:Contains(" + e + ")").parents("li").removeClass("opacityZero"), aB.find(".errorMsg").removeClass("visible")) : (aK(at).find("li").removeClass("opacityZero"), aB.find(".errorMsg").removeClass("visible")), 0 === aK(at).find("li:not(.opacityZero)").length && aB.find(".errorMsg").addClass("visible");
                                var g = (at.find("ul").find("li:not(.opacityZero):first").index(), at.find("ul").find("li:not(.opacityZero)").length);
                                ax.find(".count").html(g), 1 === g ? (ax.find(".boutiques").addClass("hide"), ax.find(".boutique").removeClass("hide")) : (ax.find(".boutiques").removeClass("hide"), ax.find(".boutique").addClass("hide"))
                            }
                        }), aA.on("click", function() {
                            aK("#searchInput").focus(), aA.removeClass("visible"), aB.find(".errorMsg").removeClass("visible"), at.find("li").each(function() {
                                var e = aK(this);
                                e.removeClass("opacityZero")
                            });
                            var d = (at.find("ul").find("li:not(.opacityZero):first").index(), at.find("ul").find("li:not(.opacityZero)").length);
                            ax.find(".count").html(d), 1 === d ? (ax.find(".boutiques").addClass("hide"), ax.find(".boutique").removeClass("hide")) : (ax.find(".boutiques").removeClass("hide"), ax.find(".boutique").addClass("hide"))
                        })
                    }
                    function aI() {
                        function r() {
                            at.find("ul").find("#" + this.deliveryBoutiqueCode).find("input").prop("checked", !0);
                            var d = aK("#" + this.deliveryBoutiqueCode).position().top;
                            at.mCustomScrollbar("scrollTo", d), aq.val(this.deliveryBoutiqueCode), ap.val(this.name), ao.val(this.name), an.val(this.streetNumber), am.val(this.streetName), al.val(this.zipcode), ak.val(this.state), aj.val(this.city), ai.val(this.country)
                        }
                        var q = new google.maps.LatLng(37.09024, -95.712891), p = [[{url: av, height: 36, width: 36, anchor: [0, 0], textColor: "#FFFFFF", textSize: 12}, {url: av, height: 36, width: 36, anchor: [0, 0], textColor: "#FFFFFF", textSize: 12}, {url: av, width: 36, height: 36, anchor: [0, 0], textColor: "#FFFFFF", textSize: 12}]];
                        aE = new google.maps.Map(document.getElementById("checkoutMap"), {zoom: 3, center: q, styles: U, mapTypeId: google.maps.MapTypeId.ROADMAP});
                        for (var n = 0;
                                n < window.gdt.btqpData.boutiqueData.boutiques.length;
                                n++) {
                            var m, i, b = window.gdt.btqpData.boutiqueData.boutiques[n], v = new google.maps.LatLng(b.latitude, b.longitude), t = new google.maps.Marker({position: v, icon: aw, deliveryBoutiqueCode: b.deliveryBoutiqueCode, name: b.name, streetNumber: b.streetNumber, streetName: b.streetName, city: b.city, state: b.state, country: b.country, countryName: b.countryName, zipcode: b.zipcode});
                            m = "" !== b.imageURL && void 0 !== b.imageURL ? '<img src="' + b.imageURL + '">' : "", i = "" !== b.storeURL && void 0 !== b.storeURL ? '<a href="' + b.storeURL + '" target="_blank">' + b.moreInfoLabel + "</a>" : "";
                            var l = '<li id="' + b.deliveryBoutiqueCode + '" class="getIndex' + n + '"><label class="radio">' + m;
                            l += '<input type="radio" name="btqpCode">', l += '<span class="name">' + b.name + '</span> <span class="firstLine">' + b.streetNumber + ", " + b.streetName + "</br>" + b.state + ", " + b.zipcode + "<br />" + b.countryName + "</span></label>", l += i + "</li>", X.push(t), V.push(t), W.push(l), google.maps.event.addListener(t, "click", r)
                        }
                        at.find("ul").html(W), aL.gdt.Utils.Browser.isMobileLayout || at.mCustomScrollbar(), ax.find(".count").text(window.gdt.btqpData.boutiqueData.boutiques.length), 1 === window.gdt.btqpData.boutiqueData.boutiques.length ? (ax.find(".boutiques").addClass("hide"), ax.find(".boutique").removeClass("hide")) : (ax.find(".boutiques").removeClass("hide"), ax.find(".boutique").addClass("hide"));
                        var g = new MarkerClusterer(aE, X, {gridSize: 20, styles: p[0]});
                        if (at.find("li").on("click", function() {
                            var e = aK(this), d = e.index();
                            google.maps.event.trigger(V[d], "click")
                        }), Y.length) {
                            aK("#shippingAddress").attr("disabled", !0), az.attr("disabled", !0), aK("#submitBoutique").removeAttr("disabled"), aK("#newShippingOptions").find(".accordion-tabs-nav li").removeClass("accordion-tabs-nav-active"), aK("#newShippingOptions").find(".accordion-tabs-content > section").removeClass("accordion-tabs-content-active"), aK("#boutiquePickTab").addClass("accordion-tabs-nav-active"), aK("#boutiquePick").addClass("accordion-tabs-content-active"), ag.val(""), af.val(""), ae.val(""), ad.val(""), ac.val(""), ab.val(""), aa.val(""), ah.find("select").val(""), aK('input[name="sameBillingAddress"]').prop("checked", !0), aK("#shippingAddress").find("fieldset").prop({hidden: !0, disabled: !0});
                            var f = at.find("ul").find("li#" + Y).index();
                            google.maps.event.trigger(X[f], "click")
                        } else {
                            google.maps.event.trigger(X[0], "click")
                        }
                        aA.on("click", function(e) {
                            e.preventDefault(), aE.setZoom(3), aE.setCenter(new google.maps.LatLng(37.09024, -95.712891)), aK("#searchInput").val(""), aK("#searchInput").focus(), aA.removeClass("visible"), aB.find(".errorMsg").removeClass("visible"), X = [], g.clearMarkers(), at.find("li").each(function() {
                                var j = aK(this), h = j.index();
                                j.removeClass("opacityZero"), X.push(V[h])
                            }), g = new MarkerClusterer(aE, X, {gridSize: 20, styles: p[0]});
                            var d = (at.find("ul").find("li:not(.opacityZero):first").index(), at.find("ul").find("li:not(.opacityZero)").length);
                            ax.find(".count").html(d), 1 === d ? (ax.find(".boutiques").addClass("hide"), ax.find(".boutique").removeClass("hide")) : (ax.find(".boutiques").removeClass("hide"), ax.find(".boutique").addClass("hide")), google.maps.event.trigger(X[0], "click")
                        }), google.maps.event.addListener(aE, "idle", function() {
                            aH()
                        }), Z.on("click", ".showMapIcon", function(e) {
                            e.preventDefault();
                            var d = aK(this);
                            d.hasClass("hideMapIcon") ? (Z.removeClass("showMap"), d.removeClass("hideMapIcon")) : (Z.addClass("showMap"), d.addClass("hideMapIcon"))
                        }), Z.on("click", ".viewMore a", function(k) {
                            k.preventDefault();
                            var j, x = aK(this), w = Z.find("div.list"), u = w.data("count"), s = Z.find("div.list li:not(.opacityZero)"), o = s.length;
                            o >= u && (w.data("count", u + 2), j = w.data("count")), o >= j ? Z.find("div.list li:not(.opacityZero):lt(" + j + ")").removeClass("tempHidden") : j >= o && (Z.find("div.list li:not(.opacityZero):lt(" + j + ")").removeClass("tempHidden"), x.hide()), j >= o ? (Z.find("div.list li:not(.opacityZero):lt(" + j + ")").removeClass("tempHidden"), x.hide()) : Z.find("div.list li:not(.opacityZero):lt(" + j + ")").removeClass("tempHidden")
                        });
                        var c = new google.maps.Geocoder;
                        document.getElementById("searchInputButtonPins").addEventListener("click", function(d) {
                            d.preventDefault(), aG(c, aE)
                        })
                    }
                    function aH() {
                        for (var b = aE.getBounds(), l = 0, k = 0;
                                k < X.length;
                                k++) {
                            var j = X[k], i = aK(".getIndex" + k);
                            b.contains(j.getPosition()) === !0 ? (i.removeClass("opacityZero"), l++) : i.addClass("opacityZero")
                        }
                        if (ax.find(".count").html(l), 0 === l) {
                            aB.find(".errorMsg").addClass("visible"), aB.find(".results").addClass("noBoutiqueError")
                        } else {
                            var c = at.find("li:not(.opacityZero):first").prop("id");
                            T ? aK("#" + c).find("input").trigger("click") : T = !0, aB.find(".errorMsg").removeClass("visible"), aB.find(".results").removeClass("noBoutiqueError")
                        }
                        aL.gdt.Utils.Browser.isMobileLayout && (2 >= l ? Z.find(".viewMore a").hide() : l > 2 && Z.find(".viewMore a").show(), Z.find("div.list").data("count", 2), Z.find("div.list li").removeClass("tempHidden"), Z.find("div.list li:not(.opacityZero):gt(1)").addClass("tempHidden"))
                    }
                    function aG(e, d) {
                        aA.addClass("visible");
                        var f = document.getElementById("searchInput").value;
                        e.geocode({address: f}, function(b, g) {
                            g === google.maps.GeocoderStatus.OK ? (d.setZoom(10), d.setCenter(b[0].geometry.location)) : aB.find(".errorMsg").addClass("visible")
                        })
                    }
                    var aF, aE, aD = aL.gdt.Utils.PubSub.UI_EVENTS, aC = aK("#newShippingOptions"), aB = aK("#boutiquePick"), aA = aB.find('[type="reset"]'), az = aC.find(".component-shippinginfo"), ay = aK(".search"), ax = aB.find(".numBoutiques"), aw = aL.gdt.Utils.google.mapIcon, av = aL.gdt.Utils.google.clusterIcon, au = aK("#searchInput"), at = aK(".list"), ar = aK("#submitBoutique"), aq = ar.find('input[name="shipping.deliveryBoutiqueCode"]'), ap = ar.find('input[name="shipping.firstname"]'), ao = ar.find('input[name="shipping.lastname"]'), an = ar.find('input[name="shipping.streetNumber"]'), am = ar.find('input[name="shipping.streetName"]'), al = ar.find('input[name="shipping.zipcode"]'), ak = ar.find('input[name="shipping.state"]'), aj = ar.find('input[name="shipping.city"]'), ai = ar.find('input[name="shipping.country"]'), ah = aK("#shippingAddress"), ag = ah.find('input[name="shipping.firstname"]'), af = ah.find('input[name="shipping.lastname"]'), ae = ah.find('input[name="shipping.streetNumber"]'), ad = ah.find('input[name="shipping.streetName"]'), ac = ah.find('input[name="shipping.zipcode"]'), ab = ah.find('input[name="shipping.state"]'), aa = ah.find('input[name="shipping.city"]'), Z = aB.find(".checkoutBoutiques"), Y = aq.val(), X = [], W = [], V = [], U = [{elementType: "geometry", stylers: [{invert_lightness: !0}, {visibility: "simplified"}, {saturation: -100}, {lightness: -40}]}, {featureType: "poi.park", stylers: [{lightness: -100}]}, {featureType: "administrative.country", stylers: [{visibility: "on"}, {color: "#fff0d2"}, {weight: "0.5"}]}, {featureType: "administrative.locality", stylers: [{visibility: "off"}]}, {featureType: "water"}, {featureType: "road.highway.controlled_access", stylers: [{visibility: "off"}]}, {featureType: "transit", stylers: [{visibility: "off"}]}, {featureType: "administrative", stylers: [{visibility: "off"}]}, {featureType: "water", elementType: "geometry", stylers: [{visibility: "off"}, {color: "#454545"}]}, {stylers: [{visibility: "simplified"}]}, {elementType: "labels", stylers: [{visibility: "off"}]}, {featureType: "landscape", elementType: "labels.icon", stylers: [{visibility: "simplified"}]}, {featureType: "administrative.country", stylers: [{visibility: "on"}]}, {featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{color: "#ffffff"}, {visibility: "off"}]}, {featureType: "administrative.country", elementType: "labels.text.stroke", stylers: [{visibility: "off"}]}, {featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{visibility: "on"}, {color: "#ffffff"}]}, {featureType: "water", elementType: "labels.text", stylers: [{visibility: "off"}]}, {featureType: "administrative.province", elementType: "labels.text.fill", stylers: [{visibility: "off"}]}, {featureType: "landscape.natural", stylers: [{color: "#000000"}]}, {featureType: "road.highway.controlled_access", elementType: "labels", stylers: [{visibility: "off"}]}, {featureType: "poi", stylers: [{visibility: "off"}]}, {featureType: "poi", elementType: "labels.text", stylers: [{visibility: "off"}]}, {featureType: "transit.station", elementType: "labels.text", stylers: [{visibility: "off"}]}, {featureType: "transit.line", elementType: "labels.text.fill", stylers: [{color: "#ffffff"}]}, {featureType: "transit.station", elementType: "labels.text", stylers: [{visibility: "off"}]}, {featureType: "transit.station", elementType: "labels.text.fill", stylers: [{color: "#ffffff"}]}, {featureType: "administrative.land_parcel", stylers: [{visibility: "off"}]}, {featureType: "administrative.neighborhood", elementType: "labels.text", stylers: [{visibility: "off"}]}, {featureType: "road.arterial", stylers: [{visibility: "on"}, {color: "#333333"}]}, {elementType: "labels.icon", stylers: [{visibility: "off"}]}, {featureType: "road.arterial", elementType: "labels.text", stylers: [{color: "#FFFFFF"}, {weight: 0.1}]}, {featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{weight: 0.1}, {visibility: "off"}]}, {featureType: "road.local", elementType: "labels.text", stylers: [{color: "#808080"}, {weight: 0.1}]}, {featureType: "road.local", elementType: "labels.text.fill", stylers: [{visibility: "off"}]}, {featureType: "landscape", elementType: "labels.text.fill", stylers: [{weight: 0.1}, {visibility: "off"}]}, {featureType: "road", stylers: [{visibility: "on"}]}, {featureType: "road.highway.controlled_access", stylers: [{visibility: "off"}]}, {elementType: "labels.text", stylers: [{visibility: "on"}, {color: "#808080"}, {weight: 0.1}]}, {featureType: "road", elementType: "labels.icon", stylers: [{visibility: "off"}]}, {featureType: "road.local", elementType: "geometry", stylers: [{weight: 0.8}, {color: "#343435"}]}], T = !1;
                    aK.pubsub("subscribe", aD.mapApiLoaded, function() {
                        aF || (aF = !0, aB.length && aI())
                    }), aK.pubsub("subscribe", aD.mapApiNotLoaded, function() {
                        aB.length && aJ()
                    }), aK.pubsub("subscribe", aD.baiduMaps, function() {
                        aB.length && aJ()
                    }), aK.pubsub("subscribe", aD.boutiqueTabClicked, function() {
                        aK("#shippingAddress").attr("disabled", !0), aK("#newShippingOptions .component-shippinginfo").prop("disabled", !0), aK("#submitBoutique").removeAttr("disabled")
                    }), aK.pubsub("subscribe", aD.shippingTabClicked, function() {
                        aK("#shippingAddress").removeAttr("disabled"), aK("#newShippingOptions .component-shippinginfo").removeAttr("disabled"), aK("#submitBoutique").attr("disabled", !0), aK("#chooseBoutiqueId").find("input").val("")
                    })
                }(document, window, window.jQuery), function(t, s, r) {
                    function q() {
                        var b = s.gdt.Utils.ajaxCall({type: "GET", url: s.gdt.commerceContenUrl = '' + "?cachebust=" + (new Date).getTime(), callback: function(c) {
                                o = c, m && k && !l && 0 !== o.wishlist.count && (r("#loginOverlay").modal(), r.pubsub("publish", n.loginOverlay)), m = !1, r.pubsub("publish", n.commerceContentJSON)
                            }});
                        return b
                    }
                    function p() {
                        return 0 === r(".press-header").length ? (q(), {update: q, data: function() {
                                return o
                            }}) : void 0
                    }
                    var o, n = s.gdt.Utils.PubSub.UI_EVENTS, m = !0, l = r("html").hasClass("logged-in"), k = r("#js-wishlist-caro").length;
                    s.gdt = s.gdt || {}, s.gdt.CommerceContent = new p
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function L(i, m) {
                            var l = v[m], k = h("html").hasClass("logged-in");
                            if (l && E(l, m, i)) {
                                if (l.itemList.push(i), l.listName || (l.listName = c[m]), k) {
                                    var j = B(i, m, w.OPADDTOCOMPARE);
                                    j.success(function() {
                                        F(z), h.pubsub("publish", y.prodAdded, l.itemList.length)
                                    })
                                } else {
                                    F(z), h.pubsub("publish", y.prodAdded, l.itemList.length)
                                }
                                H(i, m), e.console.log("product added")
                            }
                        }
                        function K(i, r, q) {
                            if (v[r]) {
                                var p = v[r].itemList, o = h.inArray(i, p), n = h("html").hasClass("logged-in"), m = {tdIndex: q, prodType: r};
                                if (-1 !== o) {
                                    if (n) {
                                        var l = B(i, r, w.OPREMOVEFROMCOMPARE);
                                        l.success(function() {
                                            v[r].itemList.splice(o, 1), F(z), h.pubsub("publish", y.prodRemoved, m)
                                        })
                                    } else {
                                        v[r].itemList.splice(o, 1), F(z), h.pubsub("publish", y.prodRemoved, m)
                                    }
                                    C(), e.console.log("product removed")
                                }
                            }
                        }
                        function J() {
                            return z
                        }
                        function I() {
                            h.each(z, function(j, i) {
                                var k = j;
                                h.each(i.itemList, function(l, d) {
                                    H(d, k)
                                })
                            })
                        }
                        function H(j, i) {
                            if (h(".product-detail").length > 0) {
                                var m = h(".product-detail").find(".cta-primary .comparator-btn"), l = m.data("prod-code"), k = m.data("prod-family");
                                l === j && k === i && (h(".product-detail").find(".cta-primary .comparator-btn").hide(), h(".product-detail").find(".cta-primary .view-comparator-btn").css("display", "inline-block"), C())
                            } else {
                                h(".product-list").each(function() {
                                    h(this).find("li").each(function() {
                                        var o = h(this), n = o.closest(x.productCard).data("prod-code"), a = o.closest(x.productCard).data("product-family");
                                        return n === j && a === i ? (h.pubsub("subscribe", y.prodAdded, function(p, d) {
                                            G(o, d), C(), h(".mySelection").addClass("opened")
                                        }), o.find(".prod-item-right-content").addClass("list-item-added").delay(w.TIMEDELAY).queue(function() {
                                            h(this).removeClass("list-item-added").dequeue(), h(this).find(".view-comparison").css("display", "inline-block"), h(this).find(".product-list-item-compare-btn").css("display", "none")
                                        }), !1) : void 0
                                    })
                                })
                            }
                        }
                        function G(j, i) {
                            var m, l = j.find(".product-list-show-comparison .comparator-msg"), k = l.text();
                            m = k.replace("{}", i), l.text(m)
                        }
                        function F(d) {
                            b = JSON.stringify(d), h.cookie(w.COMPARECOOKIE, b, {path: "/", domain: e.gdt.Utils.getCookieDomain()})
                        }
                        function E(i, m, l) {
                            var k = v[m].itemList, j = h.inArray(l, k);
                            return k.length === w.MAXPRODCOMPARESIZE ? (h.pubsub("publish", y.comparatorFull, l), e.console.log("Comparator already full for " + m), !1) : j >= 0 ? (h.pubsub("publish", y.prodExist + "." + m), e.console.log("Product " + l + " already exist in " + m + " comparator"), !1) : !0
                        }
                        function D(d) {
                            h(".product-list li").each(function() {
                                var a = h(this), i = a.data("prod-code");
                                return i === d ? (a.find(".prod-item-right-content").addClass("comparator-full").delay(w.TIMEDELAY).queue(function() {
                                    h(this).removeClass("comparator-full").dequeue()
                                }), !1) : void 0
                            })
                        }
                        function C() {
                            var j = 0;
                            for (var i in z) {
                                if (z.hasOwnProperty(i)) {
                                    var k = z[i].itemList.length;
                                    j += k
                                }
                            }
                            return j > 0 && h(".mySelection .comparelist").find("span").text("(" + j + ")"), j
                        }
                        function B(j, i, n) {
                            var m = location.pathname.split("."), l = location.pathname.split(".").pop(-1), k = m[0] + ".commerce-op." + l;
                            return h.post(k, {"op:": n, "product-category": i, product: j, "comparelist-name": "Name 1"})
                        }
                        function A() {
                            h.cookie(w.COMPARECOOKIE) && (z = h.parseJSON(h.cookie(w.COMPARECOOKIE))), z || (z = {WMF: {listName: "", itemList: []}, WBR: {listName: "", itemList: []}, WBU: {listName: "", itemList: []}}), v = {WMF: z.WMF, WBU: z.WBU, WBR: z.WBR}, c = {WMF: "Name #1", WBU: "Name #1", WBR: "Name #1"}, (h(".product-list").length > 0 || h(".product-detail").length > 0) && I(), C()
                        }
                        var z, y = {comparatorFull: "comparator.full", prodExist: "comparator.prod.exist", prodAdded: "comparator.prod.added", prodRemoved: "comparator.prod.removed"}, x = {productCard: "li.product-list-item", compareBtn: ".product-list-item-compare-btn", showResultBtn: ".product-list-show-comparison"}, w = {COMPARECOOKIE: "compare-product", MAXPRODCOMPARESIZE: 3, TIMEDELAY: 4000, OPADDTOCOMPARE: "add-to-comparelist", OPREMOVEFROMCOMPARE: "delete-from-comparelist"}, v = {}, c = {}, b = "{}";
                        return A(), {getItems: J, addItems: L, removeItems: K, setComparatorItem: I, showComparatorFullMsg: D, getTotalCount: C, updateCompareCookie: F}
                    };
                    e.gdt.ComparatorUtil = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function D() {
                            v.prepend('<div class="next">Next</div><div class="prev">Previous</div>'), u.find("td:first").addClass(c.activeClass), B()
                        }
                        function C(j, i, p) {
                            var o, n, m = p, l = j.parents(".compareSlide").find(".translate"), k = l.find(".product td").length;
                            i === b.next && m !== k ? (m += 1, m !== k ? (o = l.find(".product td:eq(" + m + ")"), l.removeClass("show-" + (m - 1)).addClass("show-" + m), l.find(".product td").removeClass(c.activeClass).eq(m).addClass(c.activeClass), n = o.find(r.sticky).length ? o.find(r.sticky).clone(!0) : o.find("a").clone(!0), s.html(n)) : m === k && (o = l.find(".product td:eq(0)"), l.removeClass("show-" + (m - 1)), l.find(".product td").removeClass(c.activeClass).eq(0).addClass(c.activeClass), n = o.find(r.sticky).length ? o.find(r.sticky).clone(!0) : o.find("a").clone(!0), s.html(n))) : i === b.prev && (0 !== m ? (o = l.find(".product td").eq(m - 1), l.removeClass("show-" + m).addClass("show-" + (m - 1)), l.find(".product td").removeClass(c.activeClass).eq(m - 1).addClass(c.activeClass), n = o.find(r.sticky).length ? o.find(r.sticky).clone(!0) : o.find("a").clone(!0), s.html(n)) : 0 === m && (o = l.find(".product td").eq(k - 1), l.removeClass("show-" + m).addClass("show-" + (k - 1)), l.find(".product td").removeClass(c.activeClass).eq(m - 1).addClass(c.activeClass), n = o.find(r.sticky).length ? o.find(r.sticky).clone(!0) : o.find("a").clone(!0), s.html(n)))
                        }
                        function B() {
                            h(document).on(x, r.next, function() {
                                var i = h(this), d = b.next, j = w.find(".compareSlide.active").find("td.active").index();
                                C(i, d, j)
                            }), h(document).on(x, r.prev, function() {
                                var i = h(this), d = b.prev, j = w.find(".compareSlide.active").find("td.active").index();
                                C(i, d, j)
                            })
                        }
                        function A() {
                            h(".compareSlide.active .translate, #stickyHeader").on("swipeleft", function(i) {
                                i.stopImmediatePropagation();
                                var d = w.find(".compareSlide.active").find(r.next), k = b.next, j = w.find(".compareSlide.active").find("td.active").index();
                                C(d, k, j)
                            }), h(".compareSlide.active .translate, #stickyHeader").on("swiperight", function(i) {
                                i.stopImmediatePropagation();
                                var d = w.find(".compareSlide.active").find(r.next), k = b.prev, j = w.find(".compareSlide.active").find("td.active").index();
                                C(d, k, j)
                            })
                        }
                        function z(j) {
                            var i = w.find(".compareSlide.active").find(".product:first .active .title"), n = i.length ? i.offset().top : 0, m = n - 20, l = m + j, k = h(".compareSlide.active .product:first").find(".active .sticky").clone(!0);
                            s.html(k), h(window).scroll(function() {
                                h(window).scrollTop() > l ? t.addClass("stickyTitle") : t.removeClass("stickyTitle")
                            })
                        }
                        function y() {
                            e.gdt.Utils.Browser.isMobileLayout && w.length && D()
                        }
                        var x = "undefined" == typeof window.ontouchstart ? "click" : "touchend", w = h("#compareListTableWrapper"), v = w.find(".compareSlide"), u = v.find("tr:first"), t = h("html"), s = h("#stickyHeader"), r = {sticky: ".sticky", next: ".next", prev: ".prev"}, c = {activeClass: "active"}, b = {next: "next", prev: "prev"};
                        return y(), {stickyHeader: z, swipeFunction: A}
                    };
                    e.gdt.ComparelistCarousel = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function d(j) {
                            var i = j.split("||"), k = h("main div.country-telephone");
                            i[1].length ? (k.find("span").text(i[1]), k.addClass("icon-telephone")) : (k.find("span").text(""), k.removeClass("icon-telephone"))
                        }
                        function c() {
                            if (h("#contact-us").length) {
                                var a = h("#contact-us").find("#contact-us_country"), i = h("#contact-us_country option:selected").val();
                                d(i), a.on("change", function() {
                                    i = h("#contact-us_country option:selected").val(), d(i)
                                })
                            }
                        }
                        c()
                    };
                    e.gdt.ContactUs = new g
                }(document, window, window.jQuery || window.Zepto), function(r, q, p) {
                    function o() {
                        var g, c, s = p("#selectedCountry").val(), i = p("main div.country-telephone"), h = p("div.countryBtn:first select option[value^='" + s + "||']").val();
                        "" !== s && j.val(h), g = p("div.countryBtn:first select option:selected").val(), g && (c = g.split("||"), c[1].length && i.addClass("visible").find("a").text(c[1]).attr("href", "tel:" + c[1]), c[0].length && p("#contact-concierge-form_country").val(c[0]), c[2].length && p("#contact-concierge-form_country-email").val(c[2])), j.on("change", function() {
                            var e = p("div.countryBtn:first select option:selected").val(), d = e.split("||");
                            "" === e ? i.removeClass("visible").find("a").text("").attr("href", "#") : d[1].length ? (k.removeClass("has-error").find(".error").prop("hidden", !0), i.addClass("visible").find("a").text(d[1]).attr("href", "tel:" + d[1])) : (k.removeClass("has-error").find(".error").prop("hidden", !0), i.removeClass("visible").find("a").text("").attr("href", "#")), d.length && d.length > 0 && p("#contact-concierge-form_country").val(d[0]), d.length && d.length > 2 && p("#contact-concierge-form_country-email").val(d[2])
                        })
                    }
                    function n(b) {
                        p("#contact-concierge-form").find(".form_button_submit").addClass("loading"), p("#contact-concierge-form_share-url").val(q.location);
                        var c = p("div.countryBtn:first select option:selected").val();
                        return"" === c ? (b.preventDefault(), k.addClass("has-error").find(".error").removeAttr("hidden"), p("#contact-concierge-form").find(".form_button_submit").removeClass("loading"), p("#gdt .modal-wrap.modal-wrap-scroll").animate({scrollTop: 0}, 300), !1) : (p.ajax({type: "post", url: p("#contact-concierge-form").attr("action"), data: p("#contact-concierge-form").serialize(), dataType: "json", success: function(e) {
                                var f = p("#contact-concierge-form");
                                e.status === !0 ? (f.parents(".gdt-form").hide().after("<div class='gdt-message'>" + e.message + "</div>"), q.Recaptcha.reload(), f.find("[type=reset]").trigger("click"), f.find(".captchaDiv").removeClass("captchaError")) : e.status === !1 && void 0 !== e.validCaptcha && e.validCaptcha === !1 ? (f.find(".captchaDiv").addClass("captchaError"), q.Recaptcha.reload()) : (f.parents(".gdt-form").after("<div class='gdt-message'>" + e.message + "</div>"), q.Recaptcha.reload(), f.find("[type=reset]").trigger("click"), f.find(".captchaDiv").removeClass("captchaError")), p("#contact-concierge-form").find(".form_button_submit").removeClass("loading")
                            }, error: function(f, e, g) {
                                p("#js-contact-concierge").find(".gdt-form").hide().after("<div class='gdt-message'>" + g + "</div>"), p("#contact-concierge-form").find(".form_button_submit").removeClass("loading")
                            }}), void b.preventDefault())
                    }
                    q.gdt = q.gdt || {};
                    var m = "undefined" == typeof q.ontouchstart ? "click" : "touchend", l = p("div.countryBtn:first"), k = l.find("label.select"), j = k.find("select");
                    p(".js-contact-concierge-btn").modal(), p("body").on(m, ".js-contact-concierge-btn", function() {
                        var d = p("#js-contact-concierge"), c = d.find(".captchaID"), h = c.prop("id"), g = c.data("sitekey");
                        d.find(".gdt-message").hide().prev(".gdt-form").show(), o(), p("#recaptcha_challenge_field_holder").remove(), p("#recaptcha_response_field").remove(), d.find(".captchaID").append('<input type="text" id="recaptcha_response_field" required name="recaptcha_response_field" />'), p.getScript("//www.google.com/recaptcha/api/js/recaptcha_ajax.js", function() {
                            p("#recaptcha_image").remove(), p('<div id="recaptcha_image"></div>').insertBefore(p("#" + h + " .recaptcha_only_if_incorrect_sol")), window.Recaptcha.create(g, h, window.RecaptchaOptions)
                        })
                    }), p("#contact-concierge-form").submit(n)
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function x() {
                            var d = e.getComputedStyle ? parseInt(e.getComputedStyle(p[0], ":after").getPropertyValue("height"), 10) : 0;
                            p.css("max-height", o.height() + d + "px"), e.gdt.Utils.Browser.isMobileLayout && q.css("margin-top", o.height() + d + "px")
                        }
                        function w() {
                            p.show(), q.addClass(b), x()
                        }
                        function v() {
                            p.css({"max-height": 0, "margin-bottom": 0}), e.gdt.Utils.Browser.isMobileLayout && q.css("margin-top", 0), setTimeout(function() {
                                q.removeClass(b)
                            }, 500);
                            try {
                                e.localStorage.setItem("cookieMessage", JSON.stringify({hide: !0}))
                            } catch (d) {
                            }
                        }
                        function u() {
                            c.on(s, function(d) {
                                v(), d.preventDefault()
                            }), h(e).smartresize(function() {
                                q.hasClass(b) && x()
                            }), h('footer .cookies[href$="#cookies"]').on("click", function(d) {
                                d.preventDefault(), d.stopPropagation(), "undefined" != typeof cookieconsent && e.cookieconsent("show"), p.length && w()
                            })
                        }
                        function t() {
                            p.length && (r && r.hide || w()), u()
                        }
                        var s = "undefined" == typeof window.ontouchstart ? "click" : "touchend", r = e.localStorage.cookieMessage ? JSON.parse(e.localStorage.cookieMessage) : void 0, q = h("body"), p = h("#js-cookies-bar"), o = p.find(".cookies-bar-inner"), c = h("#js-cookies-bar-accept"), b = "cookies-bar-visible";
                        t()
                    };
                    e.gdt.CookiesBar = new g
                }(document, window, window.jQuery || window.Zepto), function(d, c) {
                    c.countriesWithCapitals = [{CountryName: "Somaliland", CapitalName: "Hargeisa", CapitalLatitude: "9.55", CapitalLongitude: "44.050000", CountryCode: "NULL", ContinentName: "Africa"}, {CountryName: "South Georgia and South Sandwich Islands", CapitalName: "King Edward Point", CapitalLatitude: "-54.283333", CapitalLongitude: "-36.500000", CountryCode: "GS", ContinentName: "Antarctica"}, {CountryName: "French Southern and Antarctic Lands", CapitalName: "Port-aux-FranÃƒÂ§ais", CapitalLatitude: "-49.35", CapitalLongitude: "70.216667", CountryCode: "TF", ContinentName: "Antarctica"}, {CountryName: "PALESTINIAN TERRITORY, OCCUPIED", CapitalName: "Jerusalem", CapitalLatitude: "31.766666666666666", CapitalLongitude: "35.233333", CountryCode: "PS", ContinentName: "Asia"}, {CountryName: "Aland Islands", CapitalName: "Mariehamn", CapitalLatitude: "60.116667", CapitalLongitude: "19.900000", CountryCode: "AX", ContinentName: "Europe"}, {CountryName: "Nauru", CapitalName: "Yaren", CapitalLatitude: "-0.5477", CapitalLongitude: "166.920867", CountryCode: "NR", ContinentName: "Australia"}, {CountryName: "Saint Martin", CapitalName: "Marigot", CapitalLatitude: "18.0731", CapitalLongitude: "-63.082200", CountryCode: "MF", ContinentName: "North America"}, {CountryName: "Tokelau", CapitalName: "Atafu", CapitalLatitude: "-9.166667", CapitalLongitude: "-171.833333", CountryCode: "TK", ContinentName: "Australia"}, {CountryName: "Western Sahara", CapitalName: "El-AaiÃƒÂºn", CapitalLatitude: "27.153611", CapitalLongitude: "-13.203333", CountryCode: "EH", ContinentName: "Africa"}, {CountryName: "Afghanistan", CapitalName: "Kabul", CapitalLatitude: "34.516666666666666", CapitalLongitude: "69.183333", CountryCode: "AF", ContinentName: "Asia"}, {CountryName: "Albania", CapitalName: "Tirana", CapitalLatitude: "41.31666666666667", CapitalLongitude: "19.816667", CountryCode: "AL", ContinentName: "Europe"}, {CountryName: "Algeria", CapitalName: "Algiers", CapitalLatitude: "36.75", CapitalLongitude: "3.050000", CountryCode: "DZ", ContinentName: "Africa"}, {CountryName: "American Samoa", CapitalName: "Pago Pago", CapitalLatitude: "-14.266666666666667", CapitalLongitude: "-170.700000", CountryCode: "AS", ContinentName: "Australia"}, {CountryName: "Andorra", CapitalName: "Andorra la Vella", CapitalLatitude: "42.5", CapitalLongitude: "1.516667", CountryCode: "AD", ContinentName: "Europe"}, {CountryName: "Angola", CapitalName: "Luanda", CapitalLatitude: "-8.833333333333334", CapitalLongitude: "13.216667", CountryCode: "AO", ContinentName: "Africa"}, {CountryName: "Anguilla", CapitalName: "The Valley", CapitalLatitude: "18.216666666666665", CapitalLongitude: "-63.050000", CountryCode: "AI", ContinentName: "North America"}, {CountryName: "ANTIGUA AND BARBUDA", CapitalName: "Saint John's", CapitalLatitude: "17.116666666666667", CapitalLongitude: "-61.850000", CountryCode: "AG", ContinentName: "North America"}, {CountryName: "ARGENTINA", CapitalName: "Buenos Aires", CapitalLatitude: "-34.583333333333336", CapitalLongitude: "-58.666667", CountryCode: "AR", ContinentName: "South America"}, {CountryName: "ARMENIA", CapitalName: "Yerevan", CapitalLatitude: "40.166666666666664", CapitalLongitude: "44.500000", CountryCode: "AM", ContinentName: "Europe"}, {CountryName: "ARUBA", CapitalName: "Oranjestad", CapitalLatitude: "12.516666666666667", CapitalLongitude: "-70.033333", CountryCode: "AW", ContinentName: "North America"}, {CountryName: "AUSTRALIA", CapitalName: "Canberra", CapitalLatitude: "-35.266666666666666", CapitalLongitude: "149.133333", CountryCode: "AU", ContinentName: "Australia"}, {CountryName: "AUSTRIA", CapitalName: "Vienna", CapitalLatitude: "48.2", CapitalLongitude: "16.366667", CountryCode: "AT", ContinentName: "Europe"}, {CountryName: "Azerbaijan", CapitalName: "Baku", CapitalLatitude: "40.38333333333333", CapitalLongitude: "49.866667", CountryCode: "AZ", ContinentName: "Europe"}, {CountryName: "Bahamas", CapitalName: "Nassau", CapitalLatitude: "25.083333333333332", CapitalLongitude: "-77.350000", CountryCode: "BS", ContinentName: "North America"}, {CountryName: "Bahrain", CapitalName: "Manama", CapitalLatitude: "26.233333333333334", CapitalLongitude: "50.566667", CountryCode: "BH", ContinentName: "Asia"}, {CountryName: "Bangladesh", CapitalName: "Dhaka", CapitalLatitude: "23.716666666666665", CapitalLongitude: "90.400000", CountryCode: "BD", ContinentName: "Asia"}, {CountryName: "Barbados", CapitalName: "Bridgetown", CapitalLatitude: "13.1", CapitalLongitude: "-59.616667", CountryCode: "BB", ContinentName: "North America"}, {CountryName: "Belarus", CapitalName: "Minsk", CapitalLatitude: "53.9", CapitalLongitude: "27.566667", CountryCode: "BY", ContinentName: "Europe"}, {CountryName: "Belgium", CapitalName: "Brussels", CapitalLatitude: "50.833333333333336", CapitalLongitude: "4.333333", CountryCode: "BE", ContinentName: "Europe"}, {CountryName: "Belize", CapitalName: "Belmopan", CapitalLatitude: "17.25", CapitalLongitude: "-88.766667", CountryCode: "BZ", ContinentName: "Central America"}, {CountryName: "Benin", CapitalName: "Porto-Novo", CapitalLatitude: "6.483333333333333", CapitalLongitude: "2.616667", CountryCode: "BJ", ContinentName: "Africa"}, {CountryName: "Bermuda", CapitalName: "Hamilton", CapitalLatitude: "32.28333333333333", CapitalLongitude: "-64.783333", CountryCode: "BM", ContinentName: "North America"}, {CountryName: "Bhutan", CapitalName: "Thimphu", CapitalLatitude: "27.466666666666665", CapitalLongitude: "89.633333", CountryCode: "BT", ContinentName: "Asia"}, {CountryName: "BOLIVIA, PLURINATIONAL STATE OF", CapitalName: "La Paz", CapitalLatitude: "-16.5", CapitalLongitude: "-68.150000", CountryCode: "BO", ContinentName: "South America"}, {CountryName: "Bosnia and Herzegovina", CapitalName: "Sarajevo", CapitalLatitude: "43.86666666666667", CapitalLongitude: "18.416667", CountryCode: "BA", ContinentName: "Europe"}, {CountryName: "Botswana", CapitalName: "Gaborone", CapitalLatitude: "-24.633333333333333", CapitalLongitude: "25.900000", CountryCode: "BW", ContinentName: "Africa"}, {CountryName: "Brazil", CapitalName: "Brasilia", CapitalLatitude: "-15.783333333333333", CapitalLongitude: "-47.916667", CountryCode: "BR", ContinentName: "South America"}, {CountryName: "VIRGIN ISLANDS-BRITISH", CapitalName: "Road Town", CapitalLatitude: "18.416666666666668", CapitalLongitude: "-64.616667", CountryCode: "VG", ContinentName: "North America"}, {CountryName: "Brunei Darussalam", CapitalName: "Bandar Seri Begawan", CapitalLatitude: "4.883333333333333", CapitalLongitude: "114.933333", CountryCode: "BN", ContinentName: "Asia"}, {CountryName: "Bulgaria", CapitalName: "Sofia", CapitalLatitude: "42.68333333333333", CapitalLongitude: "23.316667", CountryCode: "BG", ContinentName: "Europe"}, {CountryName: "Burkina Faso", CapitalName: "Ouagadougou", CapitalLatitude: "12.366666666666667", CapitalLongitude: "-1.516667", CountryCode: "BF", ContinentName: "Africa"}, {CountryName: "Myanmar", CapitalName: "Rangoon", CapitalLatitude: "16.8", CapitalLongitude: "96.150000", CountryCode: "MM", ContinentName: "Asia"}, {CountryName: "Burundi", CapitalName: "Bujumbura", CapitalLatitude: "-3.3666666666666667", CapitalLongitude: "29.350000", CountryCode: "BI", ContinentName: "Africa"}, {CountryName: "Cambodia", CapitalName: "Phnom Penh", CapitalLatitude: "11.55", CapitalLongitude: "104.916667", CountryCode: "KH", ContinentName: "Asia"}, {CountryName: "Cameroon", CapitalName: "Yaounde", CapitalLatitude: "3.8666666666666667", CapitalLongitude: "11.516667", CountryCode: "CM", ContinentName: "Africa"}, {CountryName: "Canada", CapitalName: "Ottawa", CapitalLatitude: "45.416666666666664", CapitalLongitude: "-75.700000", CountryCode: "CA", ContinentName: "Central America"}, {CountryName: "Cape Verde", CapitalName: "Praia", CapitalLatitude: "14.916666666666666", CapitalLongitude: "-23.516667", CountryCode: "CV", ContinentName: "Africa"}, {CountryName: "Cayman Islands", CapitalName: "George Town", CapitalLatitude: "19.3", CapitalLongitude: "-81.383333", CountryCode: "KY", ContinentName: "North America"}, {CountryName: "Central African Republic", CapitalName: "Bangui", CapitalLatitude: "4.366666666666666", CapitalLongitude: "18.583333", CountryCode: "CF", ContinentName: "Africa"}, {CountryName: "Chad", CapitalName: "N'Djamena", CapitalLatitude: "12.1", CapitalLongitude: "15.033333", CountryCode: "TD", ContinentName: "Africa"}, {CountryName: "Chile", CapitalName: "Santiago", CapitalLatitude: "-33.45", CapitalLongitude: "-70.666667", CountryCode: "CL", ContinentName: "South America"}, {CountryName: "China", CapitalName: "Beijing", CapitalLatitude: "39.916666666666664", CapitalLongitude: "116.383333", CountryCode: "CN", ContinentName: "Asia"}, {CountryName: "Christmas Island", CapitalName: "The Settlement", CapitalLatitude: "-10.416666666666666", CapitalLongitude: "105.716667", CountryCode: "CX", ContinentName: "Australia"}, {CountryName: "Cocos Islands", CapitalName: "West Island", CapitalLatitude: "-12.166666666666666", CapitalLongitude: "96.833333", CountryCode: "CC", ContinentName: "Australia"}, {CountryName: "Colombia", CapitalName: "Bogota", CapitalLatitude: "4.6", CapitalLongitude: "-74.083333", CountryCode: "CO", ContinentName: "South America"}, {CountryName: "Comoros", CapitalName: "Moroni", CapitalLatitude: "-11.7", CapitalLongitude: "43.233333", CountryCode: "KM", ContinentName: "Africa"}, {CountryName: "CONGO, THE DEMOCRATIC REPUBLIC OF THE", CapitalName: "Kinshasa", CapitalLatitude: "-4.316666666666666", CapitalLongitude: "15.300000", CountryCode: "CD", ContinentName: "Africa"}, {CountryName: "Republic of Congo", CapitalName: "Brazzaville", CapitalLatitude: "-4.25", CapitalLongitude: "15.283333", CountryCode: "CG", ContinentName: "Africa"}, {CountryName: "Cook Islands", CapitalName: "Avarua", CapitalLatitude: "-21.2", CapitalLongitude: "-159.766667", CountryCode: "CK", ContinentName: "Australia"}, {CountryName: "Costa Rica", CapitalName: "San Jose", CapitalLatitude: "9.933333333333334", CapitalLongitude: "-84.083333", CountryCode: "CR", ContinentName: "Central America"}, {CountryName: "Cote d'Ivoire", CapitalName: "Yamoussoukro", CapitalLatitude: "6.816666666666666", CapitalLongitude: "-5.266667", CountryCode: "CI", ContinentName: "Africa"}, {CountryName: "Croatia", CapitalName: "Zagreb", CapitalLatitude: "45.8", CapitalLongitude: "16.000000", CountryCode: "HR", ContinentName: "Europe"}, {CountryName: "Cuba", CapitalName: "Havana", CapitalLatitude: "23.116666666666667", CapitalLongitude: "-82.350000", CountryCode: "CU", ContinentName: "North America"}, {CountryName: "CURACAO", CapitalName: "Willemstad", CapitalLatitude: "12.1", CapitalLongitude: "-68.916667", CountryCode: "CW", ContinentName: "North America"}, {CountryName: "Cyprus", CapitalName: "Nicosia", CapitalLatitude: "35.166666666666664", CapitalLongitude: "33.366667", CountryCode: "CY", ContinentName: "Europe"}, {CountryName: "Czech Republic", CapitalName: "Prague", CapitalLatitude: "50.083333333333336", CapitalLongitude: "14.466667", CountryCode: "CZ", ContinentName: "Europe"}, {CountryName: "Denmark", CapitalName: "Copenhagen", CapitalLatitude: "55.666666666666664", CapitalLongitude: "12.583333", CountryCode: "DK", ContinentName: "Europe"}, {CountryName: "Djibouti", CapitalName: "Djibouti", CapitalLatitude: "11.583333333333334", CapitalLongitude: "43.150000", CountryCode: "DJ", ContinentName: "Africa"}, {CountryName: "Dominica", CapitalName: "Roseau", CapitalLatitude: "15.3", CapitalLongitude: "-61.400000", CountryCode: "DM", ContinentName: "North America"}, {CountryName: "Dominican Republic", CapitalName: "Santo Domingo", CapitalLatitude: "18.466666666666665", CapitalLongitude: "-69.900000", CountryCode: "DO", ContinentName: "North America"}, {CountryName: "Ecuador", CapitalName: "Quito", CapitalLatitude: "-0.21666666666666667", CapitalLongitude: "-78.500000", CountryCode: "EC", ContinentName: "South America"}, {CountryName: "Egypt", CapitalName: "Cairo", CapitalLatitude: "30.05", CapitalLongitude: "31.250000", CountryCode: "EG", ContinentName: "Africa"}, {CountryName: "El Salvador", CapitalName: "San Salvador", CapitalLatitude: "13.7", CapitalLongitude: "-89.200000", CountryCode: "SV", ContinentName: "Central America"}, {CountryName: "Equatorial Guinea", CapitalName: "Malabo", CapitalLatitude: "3.75", CapitalLongitude: "8.783333", CountryCode: "GQ", ContinentName: "Africa"}, {CountryName: "Eritrea", CapitalName: "Asmara", CapitalLatitude: "15.333333333333334", CapitalLongitude: "38.933333", CountryCode: "ER", ContinentName: "Africa"}, {CountryName: "Estonia", CapitalName: "Tallinn", CapitalLatitude: "59.43333333333333", CapitalLongitude: "24.716667", CountryCode: "EE", ContinentName: "Europe"}, {CountryName: "Ethiopia", CapitalName: "Addis Ababa", CapitalLatitude: "9.033333333333333", CapitalLongitude: "38.700000", CountryCode: "ET", ContinentName: "Africa"}, {CountryName: "Falkland Islands", CapitalName: "Stanley", CapitalLatitude: "-51.7", CapitalLongitude: "-57.850000", CountryCode: "FK", ContinentName: "South America"}, {CountryName: "Faroe Islands", CapitalName: "Torshavn", CapitalLatitude: "62", CapitalLongitude: "-6.766667", CountryCode: "FO", ContinentName: "Europe"}, {CountryName: "Fiji", CapitalName: "Suva", CapitalLatitude: "-18.133333333333333", CapitalLongitude: "178.416667", CountryCode: "FJ", ContinentName: "Australia"}, {CountryName: "Finland", CapitalName: "Helsinki", CapitalLatitude: "60.166666666666664", CapitalLongitude: "24.933333", CountryCode: "FI", ContinentName: "Europe"}, {CountryName: "France", CapitalName: "Paris", CapitalLatitude: "48.86666666666667", CapitalLongitude: "2.333333", CountryCode: "FR", ContinentName: "Europe"}, {CountryName: "French Polynesia", CapitalName: "Papeete", CapitalLatitude: "-17.533333333333335", CapitalLongitude: "-149.566667", CountryCode: "PF", ContinentName: "Australia"}, {CountryName: "Gabon", CapitalName: "Libreville", CapitalLatitude: "0.38333333333333336", CapitalLongitude: "9.450000", CountryCode: "GA", ContinentName: "Africa"}, {CountryName: "The Gambia", CapitalName: "Banjul", CapitalLatitude: "13.45", CapitalLongitude: "-16.566667", CountryCode: "GM", ContinentName: "Africa"}, {CountryName: "Georgia", CapitalName: "Tbilisi", CapitalLatitude: "41.68333333333333", CapitalLongitude: "44.833333", CountryCode: "GE", ContinentName: "Europe"}, {CountryName: "Germany", CapitalName: "Berlin", CapitalLatitude: "52.516666666666666", CapitalLongitude: "13.400000", CountryCode: "DE", ContinentName: "Europe"}, {CountryName: "Ghana", CapitalName: "Accra", CapitalLatitude: "5.55", CapitalLongitude: "-0.216667", CountryCode: "GH", ContinentName: "Africa"}, {CountryName: "Gibraltar", CapitalName: "Gibraltar", CapitalLatitude: "36.13333333333333", CapitalLongitude: "-5.350000", CountryCode: "GI", ContinentName: "Europe"}, {CountryName: "Greece", CapitalName: "Athens", CapitalLatitude: "37.983333333333334", CapitalLongitude: "23.733333", CountryCode: "GR", ContinentName: "Europe"}, {CountryName: "Greenland", CapitalName: "Nuuk", CapitalLatitude: "64.18333333333334", CapitalLongitude: "-51.750000", CountryCode: "GL", ContinentName: "Central America"}, {CountryName: "Grenada", CapitalName: "Saint George's", CapitalLatitude: "12.05", CapitalLongitude: "-61.750000", CountryCode: "GD", ContinentName: "North America"}, {CountryName: "Guam", CapitalName: "Hagatna", CapitalLatitude: "13.466666666666667", CapitalLongitude: "144.733333", CountryCode: "GU", ContinentName: "Australia"}, {CountryName: "Guatemala", CapitalName: "Guatemala City", CapitalLatitude: "14.616666666666667", CapitalLongitude: "-90.516667", CountryCode: "GT", ContinentName: "Central America"}, {CountryName: "Guernsey", CapitalName: "Saint Peter Port", CapitalLatitude: "49.45", CapitalLongitude: "-2.533333", CountryCode: "GG", ContinentName: "Europe"}, {CountryName: "Guinea", CapitalName: "Conakry", CapitalLatitude: "9.5", CapitalLongitude: "-13.700000", CountryCode: "GN", ContinentName: "Africa"}, {CountryName: "Guinea-Bissau", CapitalName: "Bissau", CapitalLatitude: "11.85", CapitalLongitude: "-15.583333", CountryCode: "GW", ContinentName: "Africa"}, {CountryName: "Guyana", CapitalName: "Georgetown", CapitalLatitude: "6.8", CapitalLongitude: "-58.150000", CountryCode: "GY", ContinentName: "South America"}, {CountryName: "Haiti", CapitalName: "Port-au-Prince", CapitalLatitude: "18.533333333333335", CapitalLongitude: "-72.333333", CountryCode: "HT", ContinentName: "North America"}, {CountryName: "Vatican City", CapitalName: "Vatican City", CapitalLatitude: "41.9", CapitalLongitude: "12.450000", CountryCode: "VA", ContinentName: "Europe"}, {CountryName: "Honduras", CapitalName: "Tegucigalpa", CapitalLatitude: "14.1", CapitalLongitude: "-87.216667", CountryCode: "HN", ContinentName: "Central America"}, {CountryName: "Hungary", CapitalName: "Budapest", CapitalLatitude: "47.5", CapitalLongitude: "19.083333", CountryCode: "HU", ContinentName: "Europe"}, {CountryName: "Iceland", CapitalName: "Reykjavik", CapitalLatitude: "64.15", CapitalLongitude: "-21.950000", CountryCode: "IS", ContinentName: "Europe"}, {CountryName: "India", CapitalName: "New Delhi", CapitalLatitude: "28.6", CapitalLongitude: "77.200000", CountryCode: "IN", ContinentName: "Asia"}, {CountryName: "Indonesia", CapitalName: "Jakarta", CapitalLatitude: "-6.166666666666667", CapitalLongitude: "106.816667", CountryCode: "ID", ContinentName: "Asia"}, {CountryName: "IRAN. ISLAMIC REPUBLIC OF", CapitalName: "Tehran", CapitalLatitude: "35.7", CapitalLongitude: "51.416667", CountryCode: "IR", ContinentName: "Asia"}, {CountryName: "Iraq", CapitalName: "Baghdad", CapitalLatitude: "33.333333333333336", CapitalLongitude: "44.400000", CountryCode: "IQ", ContinentName: "Asia"}, {CountryName: "Ireland", CapitalName: "Dublin", CapitalLatitude: "53.31666666666667", CapitalLongitude: "-6.233333", CountryCode: "IE", ContinentName: "Europe"}, {CountryName: "Isle of Man", CapitalName: "Douglas", CapitalLatitude: "54.15", CapitalLongitude: "-4.483333", CountryCode: "IM", ContinentName: "Europe"}, {CountryName: "Israel", CapitalName: "Jerusalem", CapitalLatitude: "31.766666666666666", CapitalLongitude: "35.233333", CountryCode: "IL", ContinentName: "Asia"}, {CountryName: "Italy", CapitalName: "Rome", CapitalLatitude: "41.9", CapitalLongitude: "12.483333", CountryCode: "IT", ContinentName: "Europe"}, {CountryName: "Jamaica", CapitalName: "Kingston", CapitalLatitude: "18", CapitalLongitude: "-76.800000", CountryCode: "JM", ContinentName: "North America"}, {CountryName: "Japan", CapitalName: "Tokyo", CapitalLatitude: "35.68333333333333", CapitalLongitude: "139.750000", CountryCode: "JP", ContinentName: "Asia"}, {CountryName: "Jersey", CapitalName: "Saint Helier", CapitalLatitude: "49.18333333333333", CapitalLongitude: "-2.100000", CountryCode: "JE", ContinentName: "Europe"}, {CountryName: "Jordan", CapitalName: "Amman", CapitalLatitude: "31.95", CapitalLongitude: "35.933333", CountryCode: "JO", ContinentName: "Asia"}, {CountryName: "Kazakhstan", CapitalName: "Astana", CapitalLatitude: "51.166666666666664", CapitalLongitude: "71.416667", CountryCode: "KZ", ContinentName: "Asia"}, {CountryName: "Kenya", CapitalName: "Nairobi", CapitalLatitude: "-1.2833333333333332", CapitalLongitude: "36.816667", CountryCode: "KE", ContinentName: "Africa"}, {CountryName: "Kiribati", CapitalName: "Tarawa", CapitalLatitude: "-0.8833333333333333", CapitalLongitude: "169.533333", CountryCode: "KI", ContinentName: "Australia"}, {CountryName: "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF", CapitalName: "Pyongyang", CapitalLatitude: "39.016666666666666", CapitalLongitude: "125.750000", CountryCode: "KP", ContinentName: "Asia"}, {CountryName: "KOREA. REPUBLIC OF", CapitalName: "Seoul", CapitalLatitude: "37.55", CapitalLongitude: "126.983333", CountryCode: "KR", ContinentName: "Asia"}, {CountryName: "Kosovo", CapitalName: "Pristina", CapitalLatitude: "42.666666666666664", CapitalLongitude: "21.166667", CountryCode: "KO", ContinentName: "Europe"}, {CountryName: "Kuwait", CapitalName: "Kuwait City", CapitalLatitude: "29.366666666666667", CapitalLongitude: "47.966667", CountryCode: "KW", ContinentName: "Asia"}, {CountryName: "Kyrgyzstan", CapitalName: "Bishkek", CapitalLatitude: "42.86666666666667", CapitalLongitude: "74.600000", CountryCode: "KG", ContinentName: "Asia"}, {CountryName: "LAO PEOPLE'S DEMOCRATIC REPUBLIC", CapitalName: "Vientiane", CapitalLatitude: "17.966666666666665", CapitalLongitude: "102.600000", CountryCode: "LA", ContinentName: "Asia"}, {CountryName: "Latvia", CapitalName: "Riga", CapitalLatitude: "56.95", CapitalLongitude: "24.100000", CountryCode: "LV", ContinentName: "Europe"}, {CountryName: "Lebanon", CapitalName: "Beirut", CapitalLatitude: "33.86666666666667", CapitalLongitude: "35.500000", CountryCode: "LB", ContinentName: "Asia"}, {CountryName: "Lesotho", CapitalName: "Maseru", CapitalLatitude: "-29.316666666666666", CapitalLongitude: "27.483333", CountryCode: "LS", ContinentName: "Africa"}, {CountryName: "Liberia", CapitalName: "Monrovia", CapitalLatitude: "6.3", CapitalLongitude: "-10.800000", CountryCode: "LR", ContinentName: "Africa"}, {CountryName: "Libya", CapitalName: "Tripoli", CapitalLatitude: "32.88333333333333", CapitalLongitude: "13.166667", CountryCode: "LY", ContinentName: "Africa"}, {CountryName: "Liechtenstein", CapitalName: "Vaduz", CapitalLatitude: "47.13333333333333", CapitalLongitude: "9.516667", CountryCode: "LI", ContinentName: "Europe"}, {CountryName: "Lithuania", CapitalName: "Vilnius", CapitalLatitude: "54.68333333333333", CapitalLongitude: "25.316667", CountryCode: "LT", ContinentName: "Europe"}, {CountryName: "Luxembourg", CapitalName: "Luxembourg", CapitalLatitude: "49.6", CapitalLongitude: "6.116667", CountryCode: "LU", ContinentName: "Europe"}, {CountryName: "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF", CapitalName: "Skopje", CapitalLatitude: "42", CapitalLongitude: "21.433333", CountryCode: "MK", ContinentName: "Europe"}, {CountryName: "Madagascar", CapitalName: "Antananarivo", CapitalLatitude: "-18.916666666666668", CapitalLongitude: "47.516667", CountryCode: "MG", ContinentName: "Africa"}, {CountryName: "Malawi", CapitalName: "Lilongwe", CapitalLatitude: "-13.966666666666667", CapitalLongitude: "33.783333", CountryCode: "MW", ContinentName: "Africa"}, {CountryName: "Malaysia", CapitalName: "Kuala Lumpur", CapitalLatitude: "3.1666666666666665", CapitalLongitude: "101.700000", CountryCode: "MY", ContinentName: "Asia"}, {CountryName: "Maldives", CapitalName: "Male", CapitalLatitude: "4.166666666666667", CapitalLongitude: "73.500000", CountryCode: "MV", ContinentName: "Asia"}, {CountryName: "Mali", CapitalName: "Bamako", CapitalLatitude: "12.65", CapitalLongitude: "-8.000000", CountryCode: "ML", ContinentName: "Africa"}, {CountryName: "Malta", CapitalName: "Valletta", CapitalLatitude: "35.88333333333333", CapitalLongitude: "14.500000", CountryCode: "MT", ContinentName: "Europe"}, {CountryName: "Marshall Islands", CapitalName: "Majuro", CapitalLatitude: "7.1", CapitalLongitude: "171.383333", CountryCode: "MH", ContinentName: "Australia"}, {CountryName: "Mauritania", CapitalName: "Nouakchott", CapitalLatitude: "18.066666666666666", CapitalLongitude: "-15.966667", CountryCode: "MR", ContinentName: "Africa"}, {CountryName: "Mauritius", CapitalName: "Port Louis", CapitalLatitude: "-20.15", CapitalLongitude: "57.483333", CountryCode: "MU", ContinentName: "Africa"}, {CountryName: "Mexico", CapitalName: "Mexico City", CapitalLatitude: "19.433333333333334", CapitalLongitude: "-99.133333", CountryCode: "MX", ContinentName: "Central America"}, {CountryName: "Federated States of Micronesia", CapitalName: "Palikir", CapitalLatitude: "6.916666666666667", CapitalLongitude: "158.150000", CountryCode: "FM", ContinentName: "Australia"}, {CountryName: "MOLDOVA, REPUBLIC OF", CapitalName: "Chisinau", CapitalLatitude: "47", CapitalLongitude: "28.850000", CountryCode: "MD", ContinentName: "Europe"}, {CountryName: "Monaco", CapitalName: "Monaco", CapitalLatitude: "43.733333333333334", CapitalLongitude: "7.416667", CountryCode: "MC", ContinentName: "Europe"}, {CountryName: "Mongolia", CapitalName: "Ulaanbaatar", CapitalLatitude: "47.916666666666664", CapitalLongitude: "106.916667", CountryCode: "MN", ContinentName: "Asia"}, {CountryName: "Montenegro", CapitalName: "Podgorica", CapitalLatitude: "42.43333333333333", CapitalLongitude: "19.266667", CountryCode: "ME", ContinentName: "Europe"}, {CountryName: "Montserrat", CapitalName: "Plymouth", CapitalLatitude: "16.7", CapitalLongitude: "-62.216667", CountryCode: "MS", ContinentName: "North America"}, {CountryName: "Morocco", CapitalName: "Rabat", CapitalLatitude: "34.016666666666666", CapitalLongitude: "-6.816667", CountryCode: "MA", ContinentName: "Africa"}, {CountryName: "Mozambique", CapitalName: "Maputo", CapitalLatitude: "-25.95", CapitalLongitude: "32.583333", CountryCode: "MZ", ContinentName: "Africa"}, {CountryName: "Namibia", CapitalName: "Windhoek", CapitalLatitude: "-22.566666666666666", CapitalLongitude: "17.083333", CountryCode: "NA", ContinentName: "Africa"}, {CountryName: "Nepal", CapitalName: "Kathmandu", CapitalLatitude: "27.716666666666665", CapitalLongitude: "85.316667", CountryCode: "NP", ContinentName: "Asia"}, {CountryName: "Netherlands", CapitalName: "Amsterdam", CapitalLatitude: "52.35", CapitalLongitude: "4.916667", CountryCode: "NL", ContinentName: "Europe"}, {CountryName: "New Caledonia", CapitalName: "Noumea", CapitalLatitude: "-22.266666666666666", CapitalLongitude: "166.450000", CountryCode: "NC", ContinentName: "Australia"}, {CountryName: "New Zealand", CapitalName: "Wellington", CapitalLatitude: "-41.3", CapitalLongitude: "174.783333", CountryCode: "NZ", ContinentName: "Australia"}, {CountryName: "Nicaragua", CapitalName: "Managua", CapitalLatitude: "12.133333333333333", CapitalLongitude: "-86.250000", CountryCode: "NI", ContinentName: "Central America"}, {CountryName: "Niger", CapitalName: "Niamey", CapitalLatitude: "13.516666666666667", CapitalLongitude: "2.116667", CountryCode: "NE", ContinentName: "Africa"}, {CountryName: "Nigeria", CapitalName: "Abuja", CapitalLatitude: "9.083333333333334", CapitalLongitude: "7.533333", CountryCode: "NG", ContinentName: "Africa"}, {CountryName: "Niue", CapitalName: "Alofi", CapitalLatitude: "-19.016666666666666", CapitalLongitude: "-169.916667", CountryCode: "NU", ContinentName: "Australia"}, {CountryName: "Norfolk Island", CapitalName: "Kingston", CapitalLatitude: "-29.05", CapitalLongitude: "167.966667", CountryCode: "NF", ContinentName: "Australia"}, {CountryName: "Northern Mariana Islands", CapitalName: "Saipan", CapitalLatitude: "15.2", CapitalLongitude: "145.750000", CountryCode: "MP", ContinentName: "Australia"}, {CountryName: "Norway", CapitalName: "Oslo", CapitalLatitude: "59.916666666666664", CapitalLongitude: "10.750000", CountryCode: "NO", ContinentName: "Europe"}, {CountryName: "Oman", CapitalName: "Muscat", CapitalLatitude: "23.616666666666667", CapitalLongitude: "58.583333", CountryCode: "OM", ContinentName: "Asia"}, {CountryName: "Pakistan", CapitalName: "Islamabad", CapitalLatitude: "33.68333333333333", CapitalLongitude: "73.050000", CountryCode: "PK", ContinentName: "Asia"}, {CountryName: "Palau", CapitalName: "Melekeok", CapitalLatitude: "7.483333333333333", CapitalLongitude: "134.633333", CountryCode: "PW", ContinentName: "Australia"}, {CountryName: "Panama", CapitalName: "Panama City", CapitalLatitude: "8.966666666666667", CapitalLongitude: "-79.533333", CountryCode: "PA", ContinentName: "Central America"}, {CountryName: "Papua New Guinea", CapitalName: "Port Moresby", CapitalLatitude: "-9.45", CapitalLongitude: "147.183333", CountryCode: "PG", ContinentName: "Australia"}, {CountryName: "Paraguay", CapitalName: "Asuncion", CapitalLatitude: "-25.266666666666666", CapitalLongitude: "-57.666667", CountryCode: "PY", ContinentName: "South America"}, {CountryName: "Peru", CapitalName: "Lima", CapitalLatitude: "-12.05", CapitalLongitude: "-77.050000", CountryCode: "PE", ContinentName: "South America"}, {CountryName: "Philippines", CapitalName: "Manila", CapitalLatitude: "14.6", CapitalLongitude: "120.966667", CountryCode: "PH", ContinentName: "Asia"}, {CountryName: "Pitcairn Islands", CapitalName: "Adamstown", CapitalLatitude: "-25.066666666666666", CapitalLongitude: "-130.083333", CountryCode: "PN", ContinentName: "Australia"}, {CountryName: "Poland", CapitalName: "Warsaw", CapitalLatitude: "52.25", CapitalLongitude: "21.000000", CountryCode: "PL", ContinentName: "Europe"}, {CountryName: "Portugal", CapitalName: "Lisbon", CapitalLatitude: "38.71666666666667", CapitalLongitude: "-9.133333", CountryCode: "PT", ContinentName: "Europe"}, {CountryName: "Puerto Rico", CapitalName: "San Juan", CapitalLatitude: "18.466666666666665", CapitalLongitude: "-66.116667", CountryCode: "PR", ContinentName: "North America"}, {CountryName: "Qatar", CapitalName: "Doha", CapitalLatitude: "25.283333333333335", CapitalLongitude: "51.533333", CountryCode: "QA", ContinentName: "Asia"}, {CountryName: "Romania", CapitalName: "Bucharest", CapitalLatitude: "44.43333333333333", CapitalLongitude: "26.100000", CountryCode: "RO", ContinentName: "Europe"}, {CountryName: "Russia", CapitalName: "Moscow", CapitalLatitude: "55.75", CapitalLongitude: "37.600000", CountryCode: "RU", ContinentName: "Europe"}, {CountryName: "RUSSIAN FEDERATION", CapitalName: "Moscow", CapitalLatitude: "55.75", CapitalLongitude: "37.600000", CountryCode: "RU", ContinentName: "Europe"}, {CountryName: "Rwanda", CapitalName: "Kigali", CapitalLatitude: "-1.95", CapitalLongitude: "30.050000", CountryCode: "RW", ContinentName: "Africa"}, {CountryName: "Saint Barthelemy", CapitalName: "Gustavia", CapitalLatitude: "17.883333333333333", CapitalLongitude: "-62.850000", CountryCode: "BL", ContinentName: "North America"}, {CountryName: "Saint Helena", CapitalName: "Jamestown", CapitalLatitude: "-15.933333333333334", CapitalLongitude: "-5.716667", CountryCode: "SH", ContinentName: "Africa"}, {CountryName: "Saint Kitts and Nevis", CapitalName: "Basseterre", CapitalLatitude: "17.3", CapitalLongitude: "-62.716667", CountryCode: "KN", ContinentName: "North America"}, {CountryName: "Saint Lucia", CapitalName: "Castries", CapitalLatitude: "14", CapitalLongitude: "-61.000000", CountryCode: "LC", ContinentName: "North America"}, {CountryName: "Saint Pierre and Miquelon", CapitalName: "Saint-Pierre", CapitalLatitude: "46.766666666666666", CapitalLongitude: "-56.183333", CountryCode: "PM", ContinentName: "Central America"}, {CountryName: "Saint Vincent and the Grenadines", CapitalName: "Kingstown", CapitalLatitude: "13.133333333333333", CapitalLongitude: "-61.216667", CountryCode: "VC", ContinentName: "Central America"}, {CountryName: "Samoa", CapitalName: "Apia", CapitalLatitude: "-13.816666666666666", CapitalLongitude: "-171.766667", CountryCode: "WS", ContinentName: "Australia"}, {CountryName: "San Marino", CapitalName: "San Marino", CapitalLatitude: "43.93333333333333", CapitalLongitude: "12.416667", CountryCode: "SM", ContinentName: "Europe"}, {CountryName: "Sao Tome and Principe", CapitalName: "Sao Tome", CapitalLatitude: "0.3333333333333333", CapitalLongitude: "6.733333", CountryCode: "ST", ContinentName: "Africa"}, {CountryName: "Saudi Arabia", CapitalName: "Riyadh", CapitalLatitude: "24.65", CapitalLongitude: "46.700000", CountryCode: "SA", ContinentName: "Asia"}, {CountryName: "Senegal", CapitalName: "Dakar", CapitalLatitude: "14.733333333333333", CapitalLongitude: "-17.633333", CountryCode: "SN", ContinentName: "Africa"}, {CountryName: "Serbia", CapitalName: "Belgrade", CapitalLatitude: "44.833333333333336", CapitalLongitude: "20.500000", CountryCode: "RS", ContinentName: "Europe"}, {CountryName: "Seychelles", CapitalName: "Victoria", CapitalLatitude: "-4.616666666666667", CapitalLongitude: "55.450000", CountryCode: "SC", ContinentName: "Africa"}, {CountryName: "Sierra Leone", CapitalName: "Freetown", CapitalLatitude: "8.483333333333333", CapitalLongitude: "-13.233333", CountryCode: "SL", ContinentName: "Africa"}, {CountryName: "Singapore", CapitalName: "Singapore", CapitalLatitude: "1.2833333333333332", CapitalLongitude: "103.850000", CountryCode: "SG", ContinentName: "Asia"}, {CountryName: "SINT MAARTEN (DUTCH PART)", CapitalName: "Philipsburg", CapitalLatitude: "18.016666666666666", CapitalLongitude: "-63.033333", CountryCode: "SX", ContinentName: "North America"}, {CountryName: "Slovakia", CapitalName: "Bratislava", CapitalLatitude: "48.15", CapitalLongitude: "17.116667", CountryCode: "SK", ContinentName: "Europe"}, {CountryName: "Slovenia", CapitalName: "Ljubljana", CapitalLatitude: "46.05", CapitalLongitude: "14.516667", CountryCode: "SI", ContinentName: "Europe"}, {CountryName: "Solomon Islands", CapitalName: "Honiara", CapitalLatitude: "-9.433333333333334", CapitalLongitude: "159.950000", CountryCode: "SB", ContinentName: "Australia"}, {CountryName: "Somalia", CapitalName: "Mogadishu", CapitalLatitude: "2.066666666666667", CapitalLongitude: "45.333333", CountryCode: "SO", ContinentName: "Africa"}, {CountryName: "South Africa", CapitalName: "Pretoria", CapitalLatitude: "-25.7", CapitalLongitude: "28.216667", CountryCode: "ZA", ContinentName: "Africa"}, {CountryName: "South Sudan", CapitalName: "Juba", CapitalLatitude: "4.85", CapitalLongitude: "31.616667", CountryCode: "SS", ContinentName: "Africa"}, {CountryName: "Spain", CapitalName: "Madrid", CapitalLatitude: "40.4", CapitalLongitude: "-3.683333", CountryCode: "ES", ContinentName: "Europe"}, {CountryName: "Sri Lanka", CapitalName: "Colombo", CapitalLatitude: "6.916666666666667", CapitalLongitude: "79.833333", CountryCode: "LK", ContinentName: "Asia"}, {CountryName: "Sudan", CapitalName: "Khartoum", CapitalLatitude: "15.6", CapitalLongitude: "32.533333", CountryCode: "SD", ContinentName: "Africa"}, {CountryName: "Suriname", CapitalName: "Paramaribo", CapitalLatitude: "5.833333333333333", CapitalLongitude: "-55.166667", CountryCode: "SR", ContinentName: "South America"}, {CountryName: "Svalbard", CapitalName: "Longyearbyen", CapitalLatitude: "78.21666666666667", CapitalLongitude: "15.633333", CountryCode: "SJ", ContinentName: "Europe"}, {CountryName: "Swaziland", CapitalName: "Mbabane", CapitalLatitude: "-26.316666666666666", CapitalLongitude: "31.133333", CountryCode: "SZ", ContinentName: "Africa"}, {CountryName: "Sweden", CapitalName: "Stockholm", CapitalLatitude: "59.333333333333336", CapitalLongitude: "18.050000", CountryCode: "SE", ContinentName: "Europe"}, {CountryName: "Switzerland", CapitalName: "Bern", CapitalLatitude: "46.916666666666664", CapitalLongitude: "7.466667", CountryCode: "CH", ContinentName: "Europe"}, {CountryName: "SYRIAN ARAB REPUBLIC", CapitalName: "Damascus", CapitalLatitude: "33.5", CapitalLongitude: "36.300000", CountryCode: "SY", ContinentName: "Asia"}, {CountryName: "Taiwan", CapitalName: "Taipei", CapitalLatitude: "25.033333333333335", CapitalLongitude: "121.516667", CountryCode: "TW", ContinentName: "Asia"}, {CountryName: " TAIWAN, PROVINCE OF CHINA", CapitalName: "Taipei", CapitalLatitude: "25.033333333333335", CapitalLongitude: "121.516667", CountryCode: "TW", ContinentName: "Asia"}, {CountryName: "Tajikistan", CapitalName: "Dushanbe", CapitalLatitude: "38.55", CapitalLongitude: "68.766667", CountryCode: "TJ", ContinentName: "Asia"}, {CountryName: "TANZANIA, UNITED REPUBLIC OF", CapitalName: "Dar es Salaam", CapitalLatitude: "-6.8", CapitalLongitude: "39.283333", CountryCode: "TZ", ContinentName: "Africa"}, {CountryName: "Thailand", CapitalName: "Bangkok", CapitalLatitude: "13.75", CapitalLongitude: "100.516667", CountryCode: "TH", ContinentName: "Asia"}, {CountryName: "Timor-Leste", CapitalName: "Dili", CapitalLatitude: "-8.583333333333334", CapitalLongitude: "125.600000", CountryCode: "TL", ContinentName: "Asia"}, {CountryName: "Togo", CapitalName: "Lome", CapitalLatitude: "6.116666666666666", CapitalLongitude: "1.216667", CountryCode: "TG", ContinentName: "Africa"}, {CountryName: "Tonga", CapitalName: "Nuku'alofa", CapitalLatitude: "-21.133333333333333", CapitalLongitude: "-175.200000", CountryCode: "TO", ContinentName: "Australia"}, {CountryName: "Trinidad and Tobago", CapitalName: "Port of Spain", CapitalLatitude: "10.65", CapitalLongitude: "-61.516667", CountryCode: "TT", ContinentName: "North America"}, {CountryName: "Tunisia", CapitalName: "Tunis", CapitalLatitude: "36.8", CapitalLongitude: "10.183333", CountryCode: "TN", ContinentName: "Africa"}, {CountryName: "Turkey", CapitalName: "Ankara", CapitalLatitude: "39.93333333333333", CapitalLongitude: "32.866667", CountryCode: "TR", ContinentName: "Europe"}, {CountryName: "Turkmenistan", CapitalName: "Ashgabat", CapitalLatitude: "37.95", CapitalLongitude: "58.383333", CountryCode: "TM", ContinentName: "Asia"}, {CountryName: "Turks and Caicos Islands", CapitalName: "Grand Turk", CapitalLatitude: "21.466666666666665", CapitalLongitude: "-71.133333", CountryCode: "TC", ContinentName: "North America"}, {CountryName: "Tuvalu", CapitalName: "Funafuti", CapitalLatitude: "-8.516666666666667", CapitalLongitude: "179.216667", CountryCode: "TV", ContinentName: "Australia"}, {CountryName: "Uganda", CapitalName: "Kampala", CapitalLatitude: "0.31666666666666665", CapitalLongitude: "32.550000", CountryCode: "UG", ContinentName: "Africa"}, {CountryName: "Ukraine", CapitalName: "Kyiv", CapitalLatitude: "50.43333333333333", CapitalLongitude: "30.516667", CountryCode: "UA", ContinentName: "Europe"}, {CountryName: "United Arab Emirates", CapitalName: "Abu Dhabi", CapitalLatitude: "24.466666666666665", CapitalLongitude: "54.366667", CountryCode: "AE", ContinentName: "Asia"}, {CountryName: "United Kingdom", CapitalName: "London", CapitalLatitude: "51.5", CapitalLongitude: "-0.083333", CountryCode: "GB", ContinentName: "Europe"}, {CountryName: "United States", CapitalName: "Washington", CapitalLatitude: " D.C.", CapitalLongitude: "38.883333", CountryCode: "-77.000000", ContinentName: "US"}, {CountryName: "USA", CapitalName: "Washington", CapitalLatitude: " D.C.", CapitalLongitude: "38.883333", CountryCode: "-77.000000", ContinentName: "US"}, {CountryName: "Uruguay", CapitalName: "Montevideo", CapitalLatitude: "-34.85", CapitalLongitude: "-56.166667", CountryCode: "UY", ContinentName: "South America"}, {CountryName: "Uzbekistan", CapitalName: "Tashkent", CapitalLatitude: "41.31666666666667", CapitalLongitude: "69.250000", CountryCode: "UZ", ContinentName: "Asia"}, {CountryName: "Vanuatu", CapitalName: "Port-Vila", CapitalLatitude: "-17.733333333333334", CapitalLongitude: "168.316667", CountryCode: "VU", ContinentName: "Australia"}, {CountryName: "Venezuela", CapitalName: "Caracas", CapitalLatitude: "10.483333333333333", CapitalLongitude: "-66.866667", CountryCode: "VE", ContinentName: "South America"}, {CountryName: "Vietnam", CapitalName: "Hanoi", CapitalLatitude: "21.033333333333335", CapitalLongitude: "105.850000", CountryCode: "VN", ContinentName: "Asia"}, {CountryName: "VIRGIN ISLANDS, U.S.", CapitalName: "Charlotte Amalie", CapitalLatitude: "18.35", CapitalLongitude: "-64.933333", CountryCode: "VI", ContinentName: "North America"}, {CountryName: "Wallis and Futuna", CapitalName: "Mata-Utu", CapitalLatitude: "-13.95", CapitalLongitude: "-171.933333", CountryCode: "WF", ContinentName: "Australia"}, {CountryName: "Yemen", CapitalName: "Sanaa", CapitalLatitude: "15.35", CapitalLongitude: "44.200000", CountryCode: "YE", ContinentName: "Asia"}, {CountryName: "Zambia", CapitalName: "Lusaka", CapitalLatitude: "-15.416666666666666", CapitalLongitude: "28.283333", CountryCode: "ZM", ContinentName: "Africa"}, {CountryName: "Zimbabwe", CapitalName: "Harare", CapitalLatitude: "-17.816666666666666", CapitalLongitude: "31.033333", CountryCode: "ZW", ContinentName: "Africa"}, {CountryName: "US Minor Outlying Islands", CapitalName: "Washington", CapitalLatitude: " D.C.", CapitalLongitude: "38.883333", CountryCode: "-77.000000", ContinentName: "UM"}, {CountryName: "Antarctica", CapitalName: "N/A", CapitalLatitude: "0", CapitalLongitude: "0.000000", CountryCode: "AQ", ContinentName: "Antarctica"}, {CountryName: "Northern Cyprus", CapitalName: "North Nicosia", CapitalLatitude: "35.183333", CapitalLongitude: "33.366667", CountryCode: "NULL", ContinentName: "Europe"}, {CountryName: "Hong Kong", CapitalName: "N/A", CapitalLatitude: "0", CapitalLongitude: "0.000000", CountryCode: "HK", ContinentName: "Asia"}, {CountryName: "Heard Island and McDonald Islands", CapitalName: "N/A", CapitalLatitude: "0", CapitalLongitude: "0.000000", CountryCode: "HM", ContinentName: "Antarctica"}, {CountryName: "British Indian Ocean Territory", CapitalName: "Diego Garcia", CapitalLatitude: "-7.3", CapitalLongitude: "72.400000", CountryCode: "IO", ContinentName: "Africa"}, {CountryName: "Macau", CapitalName: "N/A", CapitalLatitude: "0", CapitalLongitude: "0.000000", CountryCode: "MO", ContinentName: "Asia"}]
                }(document, window, window.jQuery), function(g, f, j) {
                    var i = f.gdt.Utils.PubSub.UI_EVENTS, h = "undefined" == typeof f.ontouchstart ? "click" : "touchend";
                    j("div.captchaDiv").each(function() {
                        if (!j(this).parents(".modal").length) {
                            var e = j(this).find(".captchaID"), c = e.prop("id"), k = e.data("sitekey");
                            j("#recaptcha_challenge_field_holder").remove(), j("#recaptcha_response_field").remove(), j(this).find(".captchaID").append('<input type="text" id="recaptcha_response_field" required name="recaptcha_response_field" autocomplete="off"/>'), j.getScript("//www.google.com/recaptcha/api/js/recaptcha_ajax.js", function() {
                                j("#recaptcha_image").remove(), j('<div id="recaptcha_image"></div>').insertBefore(j("#" + c + " .recaptcha_only_if_incorrect_sol")), window.Recaptcha.create(k, c, window.RecaptchaOptions)
                            })
                        }
                    }), j("#js-contact-concierge").parent().on(h, function(b) {
                        "modal-wrap" === b.target.className && j.pubsub("publish", i.createCaptchaOnPage)
                    }), j("#js-contact-concierge .modal-close").on(h, function() {
                        j.pubsub("publish", i.createCaptchaOnPage)
                    }), j.pubsub("subscribe", i.createCaptchaOnPage, function() {
                        j("div.captchaDiv").each(function() {
                            if (!j(this).parents(".modal").length) {
                                var e = j(this).find(".captchaID"), c = e.prop("id"), k = e.data("sitekey");
                                j("#recaptcha_challenge_field_holder").remove(), j("#recaptcha_response_field").remove(), j(this).find(".captchaID").append('<input type="text" id="recaptcha_response_field" required name="recaptcha_response_field" autocomplete="off"/>'), j.getScript("//www.google.com/recaptcha/api/js/recaptcha_ajax.js", function() {
                                    j("#recaptcha_image").remove(), j('<div id="recaptcha_image"></div>').insertBefore(j("#" + c + " .recaptcha_only_if_incorrect_sol")), window.Recaptcha.create(k, c, window.RecaptchaOptions)
                                })
                            }
                        })
                    })
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function au(i, l, k, j) {
                            this.$submitBtn = j, j.parents("form").on("submit", function(n) {
                                n.preventDefault(), n.stopPropagation();
                                var m = {$listEl: i}, d = k.val(), a = h("<ol></ol>");
                                a.append("" !== d ? l.find("li").filter('[data-name*="' + d.toLowerCase() + '"], [data-city*="' + d.toLowerCase() + '"]').clone() : l.find("li").clone()), ad && a.find("li").find(".multiMaps").addClass("show-china-links"), a.find("li").length ? h(".dealers h4.nope").hide() : h(".dealers h4.nope").show(), m.$newList = a, e.matchMedia("only screen and (max-width: 668px)").matches && ar(), h.pubsub("publish", ab.paginatedList.reinitialise, m)
                            }), this.resetSearch = function() {
                                var a = {$listEl: i, $newList: l};
                                h.pubsub("publish", ab.paginatedList.reinitialise, a), ad && a.$newList.find("li").find(".multiMaps").addClass("show-china-links")
                            }
                        }
                        function at() {
                            ah = new au(X, V, T, R), ag = new au(W, U, S, Q)
                        }
                        function ar() {
                            N.show(), Z.hide()
                        }
                        function aq() {
                            N.hide(), Z.show()
                        }
                        function ap() {
                            var d = ah;
                            return M.parent().hasClass("accordion-tabs-nav-active") && (d = ag), d
                        }
                        function ao() {
                            P.on("keyup", function() {
                                var d = T;
                                ap() === ag && (d = S), d.val(h(this).val()), N.find("input").val(h(this).val())
                            }), O.parents("form").on("submit", function(i) {
                                i.preventDefault(), i.stopPropagation();
                                var d = ap();
                                d.$submitBtn.trigger("click")
                            }), N.find("span").on(ac, function() {
                                var d = ap();
                                d.resetSearch(), aq()
                            })
                        }
                        function an() {
                            Y.each(function(d) {
                                h(this).paginatedList({eventGroup: "dealerList"}, d)
                            })
                        }
                        function am(j, i) {
                            var k = i.parents(".js-dealer-list:first").data("ordernumber");
                            h.pubsub("subscribe", ab.baiduMaps, function() {
                                ae = !0, i.find(".js-dealer-map").each(function(l) {
                                    var d = h(this);
                                    d.prop("id", "js-dealer-map" + k + l);
                                    var m = d.prop("id");
                                    al(d, m)
                                })
                            }), ae && ae === !0 && (h("#js-authorised-dealers").find(".js-dealer-map").prop("id", ""), i.find(".js-dealer-map").each(function(m) {
                                var l = h(this);
                                l.prop("id", "js-dealer-map" + m);
                                var n = l.prop("id");
                                al(l, n)
                            })), af && af === !0 && i.each(function() {
                                ak(h(this))
                            }), h.pubsub("subscribe", ab.mapApiLoaded, function() {
                                af = !0, i.each(function() {
                                    ak(h(this))
                                })
                            })
                        }
                        function al(i) {
                            var d = i.prop("id");
                            i.show(), i.siblings(".dealer-info").find(".multiMaps").addClass("show-china-links");
                            new b.Map(d);
                            i.bmapWithMarker()
                        }
                        function ak(i) {
                            var d = i.find("." + c);
                            d.show(), d.mapWithMarker()
                        }
                        function aj() {
                            aa.tabAccordion()
                        }
                        function ai() {
                            if (aa.length && (h.pubsub("subscribe", ab.paginatedList.dealerList.navigate, am), aj(), an(), at(), ao()), ((e.gdt.dealerData || {}).mapData || {}).places) {
                                var d = h(".dealer-mobile-nav #js-dealer-select .places"), m = [];
                                for (var l in e.gdt.dealerData.mapData.places) {
                                    if (e.gdt.dealerData.mapData.places.hasOwnProperty(l)) {
                                        var j = e.gdt.dealerData.mapData.places[l], i = h("#js-dealers h2.dealer-heading").text().toLowerCase() === l.toLowerCase() ? ' selected="selected"' : "";
                                        m.push("<option" + i + ' value="' + j + '">' + l + "</option>")
                                    }
                                }
                                d.append(m), d.on("change", function() {
                                    location.href = h(this).val()
                                })
                            }
                        }
                        var ah, ag, af, ae, ad, ac = "undefined" == typeof window.ontouchstart ? "click" : "touchend", ab = e.gdt.Utils.PubSub.UI_EVENTS, aa = h("#js-dealers"), Z = aa.find(".accordion-tabs-nav"), Y = h(".js-dealer-list"), X = h("#js-authorised-dealers"), W = h("#js-service-centres"), V = X.clone(), U = W.clone(), T = h("#js-authorised-dealers-input"), S = h("#js-service-centres-input"), R = h("#js-authorised-dealers-submit"), Q = h("#js-service-centres-submit"), P = h("#js-mobile-dealersearch-input"), O = h("#js-mobile-dealersearch-submit"), N = h("#js-dealer-search-mobileheader"), M = h('[href="#service"]'), c = "js-dealer-map", b = e.BMap;
                        h.pubsub("subscribe", ab.baiduMaps, function() {
                            aa.length && e.gdt.Utils.Browser.isMobileLayout && (ad = !0, h("#js-authorised-dealers li, #js-service-centres li").each(function() {
                                h(this).find(".multiMaps").addClass("show-china-links")
                            }))
                        }), ai()
                    };
                    e.gdt.Dealers = new g
                }(document, window, window.jQuery || window.Zepto), function(d, c) {
                    d("#find, #findfilter").each(function(T, S) {
                        function R() {
                            H.on(J, function() {
                                var e = "find-open", g = I.hasClass(e) ? G : F, f = I.hasClass(e) ? 0 : I.find("div").outerHeight() + 30;
                                c.gdt.Utils.Browser.isMobileLayout || (I.toggleClass(e).css("max-height", f + "px"), H.text(g))
                            })
                        }
                        function Q() {
                            d("html").hasClass("pageFilterOpen") ? a && !c.localStorage.getItem("cookieMessage") && d("body").addClass("cookies-bar-visible") : (a = d("body").hasClass("cookies-bar-visible"), d("body").removeClass("cookies-bar-visible")), d(".topnav .find").toggleClass("open"), d("html").toggleClass("pageFilterOpen"), M = d("html").hasClass("pageFilterOpen"), A || d(".topnav nav.main").animate(M ? {"margin-top": 550} : {"margin-top": 0})
                        }
                        function P() {
                            c.gdt.Utils.Browser.isMobileLayout ? (E.add(D).find("fieldset").parent(".mCustomScrollbar").mCustomScrollbar("destroy"), B.off().on("click", function() {
                                var j, q, p, o, n, m = d(this), l = m.parent(), k = B.parent();
                                l.hasClass("open") ? (j = l.height(), k.removeClass("open"), q = l.height(), l.css("height", j).animate({height: q}, function() {
                                    l.removeAttr("style")
                                })) : (n = k.filter(".open"), j = n.height(), n.removeClass("open"), j && (q = n.height(), n.css("height", j).animate({height: q}, function() {
                                    n.removeAttr("style")
                                })), p = l.height(), l.addClass("open"), o = l.height(), l.css("height", p).animate({height: o}, function() {
                                    l.removeAttr("style")
                                }))
                            })) : (E.add(D).find("form > div:not(.btm, .search), form .btm > div").mCustomScrollbar({scrollInertia: 0}).off(), B.off(), E.find('form input[type="submit"]').off("click.mob"))
                        }
                        function O(j, q) {
                            for (var p = q || c.location.search.substring(1), o = p.split(/&|\?/), n = [], m = new RegExp("^" + j + "="), l = 0, k = o.length;
                                    k > l;
                                    l++) {
                                m.test(o[l]) && n.push(decodeURIComponent(o[l].replace(m, "").replace(/\+/gi, "%20")))
                            }
                            return n
                        }
                        function N() {
                            if (d(E, D).find('input[type="search"]').placeholder(), d(E, D).find('input[type="search"]').on("keyup", function() {
                                d(this).val() ? E.find(".clear").addClass("visible") : E.find(".clear").removeClass("visible")
                            }), c.gdt.Utils.Browser.isMobileLayout && (d("#js-splash-find").removeAttr("style"), d("#js-show-find-mobile").modal()), c.gdt.filterData || c.gdt.eboutiqueData) {
                                !c.gdt.Utils.Browser.isMobileLayout && E.is("#findfilter") && c.gdt.filterData && (d("html").addClass("results"), c.gdt.filterData || Q());
                                var h = {}, g = {};
                                c.gdt.Utils.Browser.isMobileLayout && !d("#eboutiqueFinder") ? d("#findfilter").find("input[name]").each(function() {
                                    var j = d(this).attr("name"), n = C.find(".wmf-" + j), m = [];
                                    if (!h[j]) {
                                        h[j] = !0, g[j] = O(j);
                                        for (var l = 0, k = g[j].length;
                                                k > l;
                                                l++) {
                                            "0" !== g[j][l] && (m.push(d("#findfilter").find('input[name="' + j + '"][value="' + g[j][l] + '"]').next().text()), d("#find").find('input[name="' + j + '"][value="' + g[j][l] + '"]').click())
                                        }
                                        m.length ? n.addClass("sh").find("span").html(m.join(", ")) : n.removeClass("sh")
                                    }
                                }) : d("#find").find("input[name]").each(function() {
                                    var j = d(this).attr("name"), n = C.find("." + j), m = [];
                                    if (!h[j]) {
                                        h[j] = !0, g[j] = O(j);
                                        for (var l = 0, k = g[j].length;
                                                k > l;
                                                l++) {
                                            "0" !== g[j][l] && (m.push(E.find('input[name="' + j + '"][value="' + g[j][l] + '"]').next().text()), d("#find").find('input[name="' + j + '"][value="' + g[j][l] + '"]').click())
                                        }
                                        m.length ? n.addClass("sh").find("span").html(m.join(", ")) : n.removeClass("sh")
                                    }
                                }), E.find("form").on("change", function() {
                                    z = !0
                                }), E.find('input[name="search"]').on("keyup search", function() {
                                    (!d(this).val() || d(this).val().length > 1) && (z = !0), d(this).val() ? E.find(".clear").addClass("visible") : E.find(".clear").removeClass("visible")
                                });
                                var f = E.find('input[name="search"]');
                                f.val(O("search")), f.val() ? (E.find(".clear").addClass("visible"), C.find(".search").addClass("sh").find("span").html(f.val())) : C.find(".search").removeClass("sh"), b = !0, E.is("#find") && C.find("li.sh").last().addClass("last")
                            }
                            d("body").on("submit", ".filter", function() {
                                if (d(this).data("search-path-alternate")) {
                                    var e = d(this).data("search-path-alternate");
                                    d(this).attr("action", e), d(this).submit()
                                }
                            })
                        }
                        var M, L = c.gdt.Utils.PubSub.UI_EVENTS, K = "undefined" == typeof c.ontouchstart ? "mouseup" : "touchend", J = "undefined" == typeof window.ontouchstart ? "click" : "touchend", I = d("#find"), H = d("#js-show-find"), G = H.text(), F = H.data("closetext"), E = d(S), D = d("#find"), C = d("#resultsummary"), B = E.add(D).find("form > div:not(.btm, .search) h4, form .btm > div h4"), A = c.gdt.Utils.Browser.hasTransforms, z = !1, b = !1;
                        c.gdt.Utils.Browser.isMobileLayout && d(".fyp").modal(), E.is("#findfilter") ? d(".topnav .find, #findfilter .close").on(K, function(e) {
                            e.preventDefault(), e.stopPropagation(), M ? c.gdt.filterData || c.gdt.Utils.Browser.isMobileLayout || d.pubsub("publish", L.shade.open, {clsname: "findopen"}) : d.pubsub("publish", L.shade.close)
                        }).on("click", function(e) {
                            e.preventDefault(), e.stopPropagation()
                        }) : R(), E.find(".clear").on("click", function(e) {
                            e.preventDefault(), e.stopPropagation(), E.find("form").trigger("reset"), E.find("form").trigger("change"), d(this).removeClass("visible")
                        });
                        var a;
                        E.find("fieldset").each(function() {
                            var e = d(this), f = e.find('input[type="checkbox"]');
                            f.off().on("change", function() {
                                d(this).is('[id$="-all"]') ? (f.filter(':not([id$="-all"]):checked').prop("checked", !1), E.find(".clear").removeClass("visible")) : f.filter(':not([id$="-all"]):checked').val() ? e.find('input[type="checkbox"][id$="-all"]').prop("checked", !1) : (e.find('input[type="checkbox"][id$="-all"]').prop("checked", !0), E.find(".clear").removeClass("visible")), E.find('input[type="checkbox"]').not('input[value="0"]').each(function() {
                                    return d(this).prop("checked") ? (E.find(".clear").addClass("visible"), !1) : void 0
                                })
                            })
                        }), P(), d(c).smartresize(P), E.is("#find") && N()
                    })
                }(window.jQuery, window), function(g, f, j) {
                    function i() {
                        function b() {
                            var d = j(".gdt-form").find("form");
                            d.attr("novalidate", "novalidate")
                        }
                        function k() {
                            j(".gdt-form").each(function(l, n) {
                                var m = j(n).find("form");
                                m.find("input, select, textarea").on("change", function() {
                                    j(this).hasClass("has-error") && f.gdt.Validate.field(this, m[0])
                                })
                            })
                        }
                        function e() {
                            var d;
                            d = j(".gdt-form").each(function(l, o) {
                                var n = j(o).find("form"), m = n.find(".form_button_reset");
                                m.on(h, function() {
                                    f.gdt.Validate.clear(n[0])
                                })
                            })
                        }
                        j("select").on("focus", function() {
                            j(this).closest(".moz-select").addClass("focus")
                        }).on("blur", function() {
                            j(this).closest(".moz-select").removeClass("focus")
                        }), b(), e(), k();
                        var c = j("button.form_button_submit");
                        c.on(h, function(m) {
                            var l = j(this).parents("form:first").find("input.recaptchaTextbox"), o = j.trim(l.val()), n = j("#gdt form label.captcha span.required");
                            1 === l.length && ("" === o ? (n.removeAttr("hidden"), n.addClass("captcha-error"), m.preventDefault()) : (n.attr("hidden", "hidden"), n.removeClass("captcha-error")))
                        })
                    }
                    f.gdt = f.gdt || {}, f.gdt.Utils = f.gdt.Utils || {};
                    var h = "undefined" == typeof window.ontouchstart ? "click" : "touchend";
                    f.gdt.Forms = new i, j("#forgot_password .form label.email input[type=email]").placeholder()
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function r(i, j) {
                            i.css("background-image", "url(" + j + ")"), e.gdt.Utils.Browser.isMobileLayout && (i.css("height", h(window).height()), m.css("height", h(window).height()))
                        }
                        function q(i) {
                            var a = e.gdt.Utils.Picture.getImgSrcFromTemplate(i);
                            i.removeClass(b), r(i, a)
                        }
                        function p() {
                            m.akcarousel({delay: 5000, horizontal: !0, scrollNode: !0, autoSwitch: !0, scrollSpeed: 5, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", callback: function(i) {
                                    var d = h(this.node).find(".slide").size(), k = i === d ? 0 : i + 1, j = h(this.node).find(".slide").eq(k);
                                    j.hasClass(b) && q(j)
                                }}), q(l.eq(0)), q(l.eq(1))
                        }
                        function o() {
                            c.on("click", "a", function() {
                                var i = h(this), d = i.index();
                                q(m.find(".slide:eq(" + d + ")")), m.akcarousel("move", i.index())
                            })
                        }
                        function n() {
                            m.length && (p(), o())
                        }
                        var m = h("#js-carousel-hero"), l = h("#js-carousel-hero").find("li"), c = h(".pager"), b = "carousel-hero-image-lazyload";
                        e.gdt.Utils.Browser.isMobileLayout && h("main.home").parent().css("min-height", "135%"), n()
                    };
                    e.gdt.HomeSlider = new g
                }(document, window, window.jQuery || window.Zepto), function(B, A, z) {
                    function y() {
                        s.each(function() {
                            var b = z(this).get(0);
                            A.videojs(b, {nativeControlsForTouch: !1}).ready(function() {
                                t = this, this.nativeControlsForTouch = !1, w(t), r = this.techName
                            })
                        })
                    }
                    function x() {
                        p.find("li").each(function() {
                            var d = z(this), c = d.find("video").length;
                            c && d.find(".carousel-hero-link a").on("click", function(g) {
                                g.preventDefault();
                                var f = z(this), i = f.attr("href"), h = f.parents("li:first").find("video").clone(!0);
                                v(h, i)
                            })
                        })
                    }
                    function w(f) {
                        for (var c = f.controlBar, h = c.addChild("button").addClass("pan-volume"), g = 0;
                                4 > g;
                                g++) {
                            h.addChild("button").addClass("volumelevel level" + (g + 1) + " active")
                        }
                        z(h.el_).on("click", ".volumelevel", function() {
                            var a = z(this), k = ".volumelevel", j = a.parent().find(k), i = a.index(k) + 1 / j.size();
                            f.volume(i), j.removeClass("active").filter(":lt(" + parseInt(a.index(k) + 1, 10) + ")").addClass("active")
                        })
                    }
                    function v(d, c) {
                        o.append(d);
                        var h = z("#homeVideoSlide"), g = h.find(".overlapClose");
                        g.attr("href", c), s = h.find("video"), y(), o.modal(), z.pubsub("publish", q.homeVideo), z("#homeVideoSlide video")[0].play(), z("#homeVideoSlide").find("video").on("ended", function() {
                            window.location.assign(c)
                        })
                    }
                    function u() {
                        x()
                    }
                    var t, s, r, q = A.gdt.Utils.PubSub.UI_EVENTS, p = z("#js-carousel-hero"), o = z("#homeVideoSlide");
                    p.length && u()
                }(document, window, window.jQuery || window.Zepto), function(h, g, l) {
                    function k() {
                        l.getJSON(window.gdt.multisiteURL, function(b, p, o) {
                            var n = "", m = "", f = o.getResponseHeader("X-geoip-country-code"), c = "";
                            l.pubsub("publish", i.checkCountry, f), l.each(b.siteDetails[0], function(e, d) {
                                n = d["popup-url"], m = d.countryCode
                            }), l.each(b.siteDetails, function(e, d) {
                                for (var q in d) {
                                    d[q].countryCode === f && (c = d[q].url)
                                }
                            }), f !== m && "US" === f ? l.cookie("eboutique-pan") || "" === n || l.ajax({url: n, cache: !1}).done(function(e) {
                                l("#ipDetection").append(e), l("#ipDetection").modal(), l.pubsub("publish", i.ipDetectionPopup);
                                var q = new Date;
                                q.setTime(q.getTime() + 2592000000), l.cookie("eboutique-pan", "true", {path: "/", domain: g.gdt.Utils.getCookieDomain(), expires: q})
                            }) : f !== m && "US" === m && (l.cookie("eboutique-pan") || "" === n || l.ajax({url: n, cache: !1}).done(function(e) {
                                l("#ipDetection").append(e), l("#ipDetection").modal(), l.pubsub("publish", i.ipDetectionPopup);
                                var q = new Date;
                                q.setTime(q.getTime() + 2592000000), l.cookie("eboutique-pan", "true", {path: "/", domain: g.gdt.Utils.getCookieDomain(), expires: q})
                            }))
                        })
                    }
                    function j() {
                        var b = l(".press-header");
                        b.length || k()
                    }
                    var i = g.gdt.Utils.PubSub.UI_EVENTS;
                    j()
                }(document, window, window.jQuery || window.Zepto), function(j, i, p) {
                    function o(b) {
                        p.ajax({type: "post", url: b.attr("action"), data: b.serialize(), dataType: "json", success: function(a) {
                                k.removeClass("loading"), a.status === !0 ? (l.addClass("formSubmitted"), p(".gdt-message").remove(), b.after("<div class='gdt-message'>" + a.message + "</div>"), i.Recaptcha.reload(), b.find("[type=reset]").trigger("click"), b.find(".captchaDiv").removeClass("captchaError"), b.find("span.error.captcha").attr("hidden", "hidden")) : a.status === !1 && void 0 !== a.validCaptcha && a.validCaptcha === !1 ? (b.find(".captchaDiv").addClass("captchaError"), b.find("span.error.captcha").removeAttr("hidden"), i.Recaptcha.reload()) : (l.addClass("formSubmitted"), p(".gdt-message").remove(), b.after("<div class='gdt-message'>" + a.message + "</div>"), i.Recaptcha.reload(), b.find("[type=reset]").trigger("click"), b.find(".captchaDiv").removeClass("captchaError"), b.find("span.error.captcha").attr("hidden", "hidden"))
                            }, error: function(a, f, c) {
                                p(".gdt-message").remove(), b.hide().after("<div class='gdt-message'>" + c + "</div>")
                            }})
                    }
                    i.gdt = i.gdt || {}, i.gdt.Utils = i.gdt.Utils || {};
                    var n = "undefined" == typeof window.ontouchstart ? "click" : "touchend", m = i.gdt.Utils.PubSub.UI_EVENTS, l = p("#languageSelectorOverlay"), k = p("#language-selector div.send-request .form_button_submit");
                    p.pubsub("subscribe", m.languageSelectorPopupClose, function() {
                        p(".topnav nav.main .inner > a").each(function() {
                            p(this).hasClass("active") && (p("body").addClass("hideMain"), p("#js-modal-bg").addClass("navopen"))
                        })
                    }), l.find(".bottomText a").on(n, function(b) {
                        b.preventDefault(), l.addClass("modifiedState"), l.removeClass("firstState"), l.parent().addClass("modal-wrap-scroll")
                    }), k.on(n, function(b) {
                        b.preventDefault(), window.gdt.Validate.form("language-selector") && (o(p("#language-selector")), k.addClass("loading"))
                    })
                }(document, window, window.jQuery || window.Zepto), function(T, S, R) {
                    function Q() {
                        R.each(x, function(d, c) {
                            c.paused() || c.pause()
                        })
                    }
                    function P(b) {
                        b.target && (b = R(b.target)), clearTimeout(D), D = setTimeout(function() {
                            var a = b.parents(".slide"), d = a.attr("id");
                            "string" == typeof d && (d = d.replace("#", "")), a.hasClass("active") || (B.find(".slide").removeClass("active"), a.addClass("active"), Q(), a.find("video[autoplay]").each(function() {
                                videojs(this).play()
                            }), y.find("a").removeClass("active"), y.find("a." + d).addClass("active"))
                        }, 50)
                    }
                    function O() {
                        B.find(".library-intro, .mobileNav").one("touchstart mousedown scroll mousewheel", function() {
                            var b = B.find(".library-intro");
                            b.removeClass("show"), setTimeout(function() {
                                b.addClass("back")
                            }, 250), "" === window.location.hash && P(R("#overview .box1"))
                        }), B.find("nav.library").on("click touchend", function(d) {
                            d.preventDefault(), d.stopPropagation(), R(this).removeClass("open");
                            var c = R(R(d.target).attr("href"));
                            B.find(".slider").akscroller("scrollto", {x: c.position().left, y: 0}), setTimeout(function() {
                                P(c.find("section").eq(0)), window.location.hash = "lib-" + d.target.href.split("#")[1]
                            }, 250)
                        }), B.on("touchmove", function() {
                            C = !0
                        }).on("touchend", function() {
                            C = !1
                        }), B.on("click touchend", ".libbutton", function(d) {
                            if (d.preventDefault(), d.stopPropagation(), !C) {
                                var c = R(d.target).parent(".content");
                                c.hasClass("open") ? N(c) : K(c)
                            }
                        }), B.on("click", ".mobileNav", function(b) {
                            b.preventDefault(), b.stopPropagation(), C || (B.find("nav.library").hasClass("open") ? I() : J())
                        })
                    }
                    function N(b) {
                        b.removeClass("open"), A.removeClass("show"), setTimeout(function() {
                            A.removeClass("open").find(".clone").empty(), R("html").removeClass("lib-open"), b.parent(".slide").find("video[autoplay]").each(function() {
                                videojs(this).play()
                            })
                        }, 250)
                    }
                    function M(b) {
                        b.addClass("infoopen").on("click touchend", function(c) {
                            c.preventDefault(), c.stopPropagation(), c.stopImmediatePropagation()
                        })
                    }
                    function L(b) {
                        b.removeClass("infoopen").off()
                    }
                    function K(t) {
                        R("html").addClass("lib-open");
                        var s = t.find(".overlay").clone(!0), r = s.find("[id^=video_]"), o = r.data("config") || "", n = r.data("poster") ? 'poster="' + r.data("poster") + '"' : "", i = r.data("mp4") ? '<source src="' + r.data("mp4") + '" type="video/mp4" />' : "", h = r.data("webm") ? '<source src="' + r.data("webm") + '" type="video/webm" />' : "", g = r.data("ogg") ? '<source src="' + r.data("ogg") + '" type="video/ogg" />' : "", d = '<video id="' + r.attr("id") + '_active"' + o + ' data-setup="{}" width="100%" height="100%" webkit-playsinline ' + n + ' class="video-js vjs-default-skin vjs-big-play-button">';
                        d += i + h + g + "</video>", t.addClass("open"), Q(), s.find(".back").on("click touchend", function(a) {
                            a.preventDefault(), a.stopPropagation(), N(t)
                        }), s.children(".info").on("click touchend", function(b) {
                            b.preventDefault(), b.stopPropagation(), M(s)
                        }), s.children(".close").on("click touchend", function(b) {
                            b.preventDefault(), b.stopPropagation(), L(s)
                        }), s.find("[id^=video_]").replaceWith(d), A.addClass("open").find(".clone").append(s);
                        var c = s.find("[id^=video_]").get(0);
                        c && videojs(c).on("play", G).on("pause", F), setTimeout(function() {
                            A.addClass("show"), s.on("click", ".vjs-big-play-button", function() {
                                s.find(">p").hide()
                            })
                        }, 5)
                    }
                    function J() {
                        clearTimeout(D), D = setTimeout(function() {
                            B.find("nav.library, .mobileNav").addClass("open").off("click").one("click", function() {
                                I()
                            }), setTimeout(function() {
                                B.find("nav.library").addClass("show")
                            }, 5)
                        }, 10)
                    }
                    function I() {
                        clearTimeout(D), D = setTimeout(function() {
                            B.find("nav.library").removeClass("show"), setTimeout(function() {
                                B.find("nav.library, .mobileNav").removeClass("open")
                            }, 200)
                        }, 10)
                    }
                    function H() {
                        var b = window.location.hash;
                        "" !== b && (b = b.replace("lib-", ""), B.find(".slider").akscroller("scrollto", {x: R(b).position().left, y: 0}), setTimeout(function() {
                            P(R(b).find("section").eq(0)), y.find("a").removeClass("active"), y.find("a." + b.replace("#", "")).addClass("active"), S.console.log("my nav is", y.find("a." + b.replace("#", "")))
                        }, 1000))
                    }
                    function G() {
                        var b = R(this.tag).parents(".overlay");
                        b.hasClass("infoopen") ? this.pause() : b.find(".info, .social-button, p").css({opacity: 0})
                    }
                    function F() {
                        var d = this.tag, c = R(d).parents(".overlay");
                        c.hasClass("infoopen") || setTimeout(function() {
                            R(d).parents(".overlay").find(".info, .social-button, p").attr("style", "")
                        }, 200)
                    }
                    function E() {
                        for (var b = 0, d = z.length;
                                d > b;
                                b++) {
                            var c = videojs(z[b]);
                            x.push(c)
                        }
                        B.find("nav.library a").each(function() {
                            var e = R(this);
                            e.attr("style", "background-image: url(" + B.find(e.attr("href")).find("img").get(0).src + ")")
                        }), B.find(".slider").akscroller({horizontal: !0, inertia: !0, mousewheel: !0, lockscroll: !1, callback: P}).on("mouseenter", ".slide", P), setTimeout(function() {
                            Q(), setTimeout(function() {
                                S.gdt.Utils.Browser.isMobileLayout ? H() : (R("html,body").animate({scrollTop: B.find("h1").offset().top - 20}, 1000), setTimeout(function() {
                                    H()
                                }, 1000))
                            })
                        }, 500), O()
                    }
                    var D, C, B = R("#library"), A = B.find(".mainOverlay"), z = B.find("video"), y = B.find("nav"), x = [];
                    B.length && E()
                }(document, window, window.jQuery), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function G(i, d, j) {
                            this.src = d, this.poster = i, this.title = j
                        }
                        function F() {
                            var a = !1;
                            e.gdt.Utils.Browser.isHighDPR && e.matchMedia("only screen and (min-width: 669px)").matches && (a = !0), v.find("li").each(function() {
                                for (var d, n = h(this), m = n.attr(a ? "data-poster-2x" : "data-poster"), l = n.attr("title"), k = n.attr("data-src").split(","), j = 0;
                                        j < k.length;
                                        j++) {
                                    k[j] = h.trim(k[j])
                                }
                                d = new G(m, k, l), H.push(d)
                            })
                        }
                        function E(j) {
                            for (var i = j.controlBar, l = i.addChild("button").addClass("pan-volume"), k = 0;
                                    4 > k;
                                    k++) {
                                l.addChild("button").addClass("volumelevel level" + (k + 1) + " active")
                            }
                            h(l.el_).on(x, ".volumelevel", function() {
                                var a = h(this), o = ".volumelevel", n = a.parent().find(o), m = a.index(o) + 1 / n.size();
                                j.volume(m), n.removeClass("active").filter(":lt(" + parseInt(a.index(o) + 1, 10) + ")").addClass("active")
                            }), j.on("play", function() {
                                h(j.el_).parent().addClass("video-playing"), i.show()
                            }), j.on("ended", function() {
                                h(j.el_).parent().removeClass("video-playing"), i.hide()
                            })
                        }
                        function D(d) {
                            v.find("li").removeClass("active").eq(d).addClass("active"), w.parent().find("figcaption").text(v.find("li").eq(d).find("figcaption").text())
                        }
                        function C() {
                            e.videojs(w[0], {nativeControlsForTouch: !1, autoplay: !1}).ready(function() {
                                y = this, E(y), y.playList(H, {getVideoSource: function(i, d) {
                                        d(i.src, i.poster)
                                    }}), z = w.parent().find(".vjs-big-play-button"), z.attr("aria-label", w.attr("data-playtext"))
                            }).on("play", function() {
                                D(this.pl.current)
                            }), w = h("#js-splash-video")
                        }
                        function B() {
                            v.find("li").on(x, function() {
                                y.playList(h(this).index()), w.find(".vjs-play-progress").width(0), D(h(this).index())
                            }), t.on(x, function() {
                                var i = "playlist-open", d = v.hasClass(i) ? c : b, j = v.hasClass(i) ? 0 : v.find("ul").outerHeight();
                                v.toggleClass(i).css("max-height", j + "px"), t.text(d)
                            }), u.on(x, "a", function(d) {
                                switch (y.poster(""), h(this).attr("rel")) {
                                    case"next":
                                        y.next(), D(y.pl.current);
                                        break;
                                    case"prev":
                                        y.prev(), D(y.pl.current)
                                }
                                d.preventDefault(), u.find("a").show(), 0 === y.pl.current ? u.find('a[rel="prev"]').hide() : y.pl.current === H.length - 1 && u.find('a[rel="next"]').hide()
                            }), h(e).smartresize(function() {
                                e.matchMedia("only screen and (min-width: 669px)").matches ? h(".thumbs").appendTo(h(".title-text-thumbs")) : (e.console.log("do it now"), h(".thumbs").insertBefore(h(".link-list")))
                            }), h(e).trigger("resize")
                        }
                        function A() {
                            w.length && (F(), C(), B(), u.find('a[rel="prev"]').hide())
                        }
                        var z, y, x = "undefined" == typeof window.ontouchstart ? "click" : "touchend", w = h("#js-splash-video"), v = h("#js-splash-video-playlist"), u = h("#js-video-playlist-nav"), t = h("#js-show-playlist"), c = t.text(), b = t.data("closetext"), H = [];
                        A()
                    };
                    e.gdt.Manufacture = new g
                }(document, window, window.jQuery || window.Zepto), function(i, h, n) {
                    function m() {
                        n.pubsub("subscribe", k.checkCountry, function(d, c) {
                            n("#googleMapsAPI") && l(c)
                        })
                    }
                    function l(e) {
                        var c = "//maps.google.com/maps/api/js?callback=initialize";
                        if ("CN" === e && j === !0) {
                            n.pubsub("publish", k.baiduMaps)
                        } else {
                            if ("CN" === e && j === !1) {
                                return void n.pubsub("publish", k.mapApiNotLoaded)
                            }
                            var f = document.createElement("script");
                            f.type = "text/javascript", f.src = c, n("#googleMapsAPI").after(f)
                        }
                    }
                    var k = h.gdt.Utils.PubSub.UI_EVENTS, j = n("#googleMapsAPI").data("setchinamap");
                    window.initialize = function() {
                        var b = h.google;
                        void 0 !== b && n.pubsub("publish", k.mapApiLoaded)
                    }, m()
                }(document, window, window.jQuery), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function b() {
                            c()
                        }
                        var c = function() {
                            function i() {
                                var k = h("input[name=havepanerai]:checked", "form").val(), d = h("form label.model");
                                "false" === k ? d.css("display", "none") : d.css("display", "block")
                            }
                            var j = h("#my-account > .accordion-tabs.accordion-tabs-content > section");
                            j.each(function(k, p) {
                                var o = h(p), n = o.children("h2"), m = o.data("href"), l = location.protocol + "//" + location.host + m;
                                n.on("click", function() {
                                    e.history.pushState({}, "", l), h("#my-account > .accordion-tabs-nav li.active").removeClass("active"), h('#my-account > .accordion-tabs-nav a[href="' + m + '"]').parent().addClass("active"), h("#my-account > .accordion-tabs > .accordion-tabs-content > .accordion-tabs-content-active").removeClass("accordion-tabs-content-active"), o.addClass("accordion-tabs-content-active")
                                })
                            }), h("form .havepanerai input").on("change", function() {
                                i()
                            }), i(), e.gdt.Utils.Browser.isMobileLayout && h("#my-account > .accordion-tabs .accordion-tabs-content .moreInfoHide").removeClass("accordion-tabs-content-active")
                        };
                        return b(), {addListeners: c}
                    };
                    e.gdt.MyAccount = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function b() {
                            c()
                        }
                        var l, k, j, i, c = function() {
                            l = h("#my-account .accordion-tabs .accordion-tabs-inner .component-orderreview .orderHead"), k = h("#my-account .accordion-tabs .accordion-tabs-inner .component-orderreview .orderDetail"), j = h("#my-account .accordion-tabs .accordion-tabs-inner .component-orderreview .orderHead .orderPlus"), i = h("#my-account .accordion-tabs .accordion-tabs-inner .component-orderreview .orderHead .orderMin"), l.length > 1 ? (e.gdt.Utils.Browser.isMobileLayout || k.hide(), i.hide(), l.off().on("click", function() {
                                h(this).next(".orderDetail").slideToggle(200), "none" === h(this).find(".orderPlus").css("display") ? (h(this).find(".orderPlus").show(), h(this).find(".orderMin").hide()) : (h(this).find(".orderPlus").hide(), h(this).find(".orderMin").show())
                            })) : (k.show(), j.hide(), i.hide())
                        };
                        return b(), {addListeners: c}
                    };
                    e.gdt.MyOrderHistory = new g
                }(document, window, window.jQuery || window.Zepto), function(N, M) {
                    function L(b) {
                        b.preventDefault(), b.stopPropagation()
                    }
                    function K(h, c, b) {
                        var a, i;
                        h.on("click", function(d) {
                            L(d), B = !1
                        }).on(D, function() {
                            B = !0
                        }).off(G).on(G, function(d) {
                            L(d), "undefined" != typeof d && (a = d), B || c(N(this), a), B = !1
                        }), b && C && (h.off(F).on(F, function(g) {
                            if (M.gdt.Utils.Browser.isMobileLayout === !1) {
                                var e = N(this);
                                L(g), clearTimeout(i), "undefined" != typeof g && (a = g), i = setTimeout(function() {
                                    c(e, a, !0)
                                }, 200)
                            }
                        }), b.off(E).on(E, function(g) {
                            if (M.gdt.Utils.Browser.isMobileLayout === !1) {
                                var e = N(this);
                                L(g), clearTimeout(i), "undefined" != typeof g && (a = g), i = setTimeout(function() {
                                    c(e, a, !1)
                                }, 200)
                            }
                        }))
                    }
                    function J() {
                        var a = N(".navp h1.logo a").prop("href");
                        N(".container").find("h1.logo:first a").prop("href", a)
                    }
                    function I(r, q, p) {
                        var o, n = r.hasClass("active"), m = "navopen";
                        if (p === !0 && (n = !1), p === !1 && (n = !0), M.gdt.Utils.Browser.isMobileLayout === !0 && (n = r.hasClass("active")), r.parents(".hassub").length && M.gdt.Utils.Browser.isMobileLayout && (M.location.href = r.data("href") || r.href), !(r.parents(".hassub").length && n || r.hasClass("active") && p)) {
                            if (M.gdt.Utils.Browser.isMobileLayout || N.pubsub("publish", A.shade.close), N("body").removeClass("hideMain"), z) {
                                if (M.gdt.Utils.Browser.isMobileLayout) {
                                    o = r.parent().find(".sub.open, .subsub.open");
                                    var l = o.height();
                                    r.parent().find("a.active, .sub.open, .subsub.open").removeClass("active open"), o.next().css("margin-top", l).animate({"margin-top": 0})
                                } else {
                                    r.parent().find(".sub.open, .subsub.open").css({height: 400}), setTimeout(function() {
                                        r.parent().find(".sub, .subsub").removeAttr("style")
                                    }, 400), r.parent().find("a.active, .sub.open, .subsub.open").removeClass("active open")
                                }
                            } else {
                                o = r.parent().find(".sub.open, .subsub.open"), r.parent().find("a.active").removeClass("active"), o.removeClass("open"), o.css({display: "block", "min-height": 400, opacity: 1, "margin-top": 0}).animate({opacity: 0, "margin-top": -50}, function() {
                                    o.removeAttr("style")
                                })
                            }
                            if (0 === r.next(".sub, .subsub").length) {
                                var b = r.prop("target");
                                "_blank" === b ? M.open(r.prop("href"), "_blank") : M.location.href = r.prop("href")
                            } else {
                                if (!n) {
                                    r.addClass("active");
                                    var a = r.next();
                                    (a.hasClass("sub") || a.hasClass("subsub")) && (z || a.css({"min-height": 400, "margin-top": -50, opacity: 0}).animate({"margin-top": 0, opacity: 1}, function() {
                                        a.removeAttr("style")
                                    }), a.addClass("open").removeClass("hideimage").find("a").eq(0).addClass("active").next().addClass("open"), a.parents("subsub").find(".hideimage").removeClass("hideimage"), a.find(".hideimage").removeClass("hideimage"), M.gdt.Utils.Browser.isMobileLayout && a.next().css("margin-top", -a.height()).animate({"margin-top": 0})), M.gdt.Utils.Browser.isMobileLayout || (N.pubsub("publish", A.shade.open, {clsname: m, clicktoclose: C}), N("body").addClass("hideMain").removeClass("navOpened"), N(".navtab").removeClass("open"), setTimeout(function() {
                                        N("body").addClass("openSubSection")
                                    }, 300))
                                }
                            }
                        }
                    }
                    var H = "undefined" == typeof M.ontouchstart ? "click" : "touchend", G = "touchend.bce click.bce", F = "mouseenter.bce", E = "mouseleave.bce", D = "touchmove.bce", C = !1, B = !1, A = M.gdt.Utils.PubSub.UI_EVENTS, z = M.gdt.Utils.Browser.hasTransforms;
                    /iPad|iPhone/i.test(navigator.appVersion) && N(document).on("blur", "input, textarea", function() {
                        N(".navp header, .footerContainer").show()
                    }).on("focus", "input, textarea", function() {
                        N(".navp header, .footerContainer").hide()
                    }), N(".navp .topnav nav.main .inner > a").each(function() {
                        var a = N(this);
                        0 === a.next(".sub").length && a.addClass("noIcon")
                    }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && J(), N(".navp header .inner ul > li a").on("click", function(a) {
                        a.stopPropagation();
                        var h = N(this), g = h.parent("li"), f = g.find("ul");
                        N(".navp header .inner ul > li").removeClass("opened"), f.length && g.hasClass("opened") ? (a.preventDefault(), g.removeClass("opened"), N("#shopping-bag-overlay").removeClass("show")) : f.length && (g.addClass("opened"), N("#shopping-bag-overlay").removeClass("show"))
                    }), N("html").click(function() {
                        N(".navp header .inner ul > li").removeClass("opened")
                    }), N(".navp header .inner ul > li .back").on("click", function() {
                        var a = N(this), d = a.parents(".opened");
                        d.removeClass("opened")
                    }), K(N(".navtab"), function(a) {
                        N("body").hasClass("navOpened") ? (N("body").removeClass("navOpened hideMain openSubSection"), a.removeClass("open"), a.next(".navp").removeClass("open")) : (N("body").addClass("navOpened").removeClass("openSubSection"), N(".navp .head .inner > a").removeClass("active"), setTimeout(function() {
                            N("body").removeClass("hideMain"), N("#js-modal-bg").removeClass("open navopen")
                        }, 300), a.addClass("open"), a.next(".navp").addClass("open")), a.next(".navp").hasClass("open") && N("header .find:not(.mobile)").one(G, function(b) {
                            L(b), a.next(".navp").removeClass("open")
                        }), z || a.next(".navp").animate(a.next(".navp").hasClass("open") ? {left: "100%"} : {left: "0%"})
                    });
                    var y;
                    if (K(N("nav.main>.head>.inner>a, nav.main>.head>.inner>.hassub>a"), function(e, d, f) {
                        clearTimeout(y), y = setTimeout(function() {
                            I(e, d, f)
                        }, 250)
                    }, N("nav.main>.head, nav.main .sub")), N("#languageSelectorOverlayBtn").length) {
                        N("#languageSelectorOverlayBtn").modal();
                        var x = N("#languageSelectorOverlay"), w = x.find("li");
                        M.gdt.Utils.Browser.isMobileLayout && w.find("select").on("change", function() {
                            var a = N(this).val();
                            "" !== a && (M.location.href = a)
                        }), N("#languageSelectorOverlayBtn").on(H, function() {
                            x.addClass("firstState"), x.removeClass("modifiedState"), x.removeClass("formSubmitted"), N("body").removeClass("hideMain"), N("#js-modal-bg").removeClass("navopen");
                            var a = N("#language-selector"), h = a.find(".captchaID"), g = h.prop("id"), f = h.data("sitekey");
                            x.find(".gdt-message").remove(), N("#recaptcha_challenge_field_holder").remove(), N("#recaptcha_response_field").remove(), a.find(".captchaID").append('<input type="text" id="recaptcha_response_field" required name="recaptcha_response_field" />'), N.getScript("//www.google.com/recaptcha/api/js/recaptcha_ajax.js", function() {
                                N("#recaptcha_image").remove(), N('<div id="recaptcha_image"></div>').insertBefore(N("#" + g + " .recaptcha_only_if_incorrect_sol")), window.Recaptcha.create(f, g, window.RecaptchaOptions)
                            })
                        })
                    } else {
                        N("header .lang").on("click", function(a) {
                            a.preventDefault();
                            var d = N(this);
                            d.hasClass("active") ? (d.removeClass("active"), N("html").removeClass("lang-open")) : (d.addClass("active"), N("html").addClass("lang-open"))
                        }), N("header .lang a").on("click", function(a) {
                            N(a.target).attr("href") && (M.location.href = N(a.target).attr("href"))
                        }), N('header .lang a[href="#close"]').on("click", function(a) {
                            L(a), N("header .lang").removeClass("active"), N("html").removeClass("lang-open")
                        })
                    }
                    K(N(".navp .boutique"), function(b, a) {
                        if (N(a.target).attr("href") && (M.location.href = N(a.target).attr("href")), N(".navp .boutique").hasClass("active")) {
                            if (N(a.target).parents(".boutique") && !N(a.target).is("h3")) {
                                return
                            }
                            N(".navp .boutique").removeClass("active"), N("body").off("click.close")
                        } else {
                            N(".navp .boutique").addClass("active"), N("body").on("click.close", function() {
                                N(".navp .boutique").removeClass("active"), N("body").off("click.close")
                            })
                        }
                    }), N(".press-header").length && (N(".footerContainer").addClass("open"), N(".footerContainer .slide").addClass("open"), N("html").is(".ie6, .ie7, .ie8, .ie9") && N(".footerContainer .slide").css("height", "250px"), N(".arrow").addClass("close")), K(N("footer.slide .arrow, footer.slide > .inner > a"), function(a) {
                        if (!N(".press-header").length) {
                            var d = a.parents("footer");
                            d.toggleClass("open"), N(".footerContainer").hasClass("open") ? setTimeout(function() {
                                N(".footerContainer").removeClass("open")
                            }, 500) : N(".footerContainer").addClass("open").find(".hideimage").removeClass("hideimage"), z || d.animate(d.hasClass("open") ? {bottom: 20} : {bottom: -100})
                        }
                    });
                    var v = N(".collectionDetail.special-editions");
                    K(v.find(".select"), function(b) {
                        v.find(".hidden").toggleClass("open"), b.toggleClass("open")
                    });
                    var u = M.gdt.Utils.getNameFromCookie();
                    u && (N("html").addClass("logged-in"), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || N("#accountName").html(u))
                }(window.jQuery, window), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function T(d) {
                            d.each(function() {
                                var j, i = h(this), l = i.find('[type="text/x-tmpl"]'), k = h.trim(l.html());
                                k = h.parseHTML(k), j = h(k), l.replaceWith(j)
                            }), e.picturefill()
                        }
                        function S() {
                            D.find("li:odd").addClass("even")
                        }
                        function R() {
                            h("html,body").scrollTop(B.eq(0).position().top - 20)
                        }
                        function Q(d) {
                            B.each(function() {
                                var a = h(this);
                                a.find("li").removeClass("active"), a.find("li").eq(d - 1).addClass("active"), a.find("li").removeClass("visible")
                            }).find("button").prop("disabled", !1), d === I && B.find('[rel="next"]').prop("disabled", !0), 1 === d && B.find('[rel="prev"]').prop("disabled", !0), B.each(1 === d || 2 === d || 3 === d ? function() {
                                h(this).find("li").slice(0, 5).addClass("visible")
                            } : d === I || d === I - 1 || d === I - 2 ? function() {
                                h(this).find("li").slice(I - 5, I).addClass("visible")
                            } : function() {
                                h(this).find("li").eq(d - 1).prev().addClass("visible").prev().addClass("visible"), h(this).find("li").eq(d - 1).next().addClass("visible").next().addClass("visible")
                            })
                        }
                        function P(a) {
                            var d = D.find('[data-page="' + a + '"]');
                            D.hide().find("li").hide(), d.show().filter(function(i) {
                                return 2 > i
                            }).addClass("top"), T(d), Q(a), D.fadeIn(2000)
                        }
                        function O() {
                            var j = 0, i = h("<ol></ol>"), l = B.find("ol"), k = window.location;
                            C.each(function(a) {
                                a % A === 0 && (j++, i.append(h('<li data-page="' + j + '"><a href="#" data-tracking-page="' + k + "/" + j + '" data-tracking-event="virtualPageview" data-trackable="true">' + j + "</a></li>"))), h(this).attr("data-page", j)
                            }), B.find("ol").empty().append(i.html()), I = j, P(1), l.find("li").size() || B.hide()
                        }
                        function N() {
                            var a = D.find("li").not(".loaded").filter(function(d) {
                                return z > d
                            }).addClass("loaded").hide().fadeIn(2000);
                            T(a), setTimeout(function() {
                                a.addClass("active")
                            }, 2000), D.find("li").not(".loaded").length || c.hide()
                        }
                        function M() {
                            e.gdt.Utils.Browser.isMobileLayout ? N() : O()
                        }
                        function L(d) {
                            e.location.href = e.location.href.split("?")[0] + "?q=" + d.val()
                        }
                        function K() {
                            E.on("change", function() {
                                e.location.replace(h(this).val())
                            }), G.keypress(function(d) {
                                13 === d.keyCode && L(h(this))
                            }), F.on(H, function() {
                                L(G)
                            }), B.on(H, "a", function(d) {
                                P(parseInt(h(this).closest("li").attr("data-page"), 10)), R(), d.preventDefault()
                            }).on(H, "button:enabled", function() {
                                var i = B.eq(0).find(".active").index() + 1, d = i;
                                switch (h(this).attr("rel")) {
                                    case"next":
                                        d++;
                                        break;
                                    case"prev":
                                        d--
                                }
                                P(d), R()
                            }), c.on(H, function() {
                                N()
                            }), b.on(H, function() {
                                h("html,body").scrollTop(0)
                            })
                        }
                        function J() {
                            M(), K(), h(".ie8").length && S()
                        }
                        var I, H = "undefined" == typeof window.ontouchstart ? "click" : "touchend", G = h("#js-news-search"), F = h("#js-news-submit"), E = h("#js-news-filter").find("select"), D = h("#js-news-list"), C = D.find("li"), B = h(".js-news-pagination"), A = parseInt(D.attr("data-pageitems"), 10), z = parseInt(D.attr("data-pageitems-mobile"), 10), c = h("#js-mobile-load"), b = h(".back-to-top");
                        return{init: J}
                    };
                    e.gdt.NewsList = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.ToggleNightView = e.gdt.ToggleNightView || {};
                    var g = function() {
                        function i() {
                            j()
                        }
                        var c = "undefined" == typeof window.ontouchstart ? "click" : "touchend", j = function() {
                            var b = h(".js-toggle-nightview"), k = h("#js-nightview-img").closest("figure");
                            b.on(c, function() {
                                var d = h(this);
                                d.hasClass("cta-nightview") ? (k.addClass("product-image-nightview-visible"), d.hide().parents(".product-image-cta").find(".cta-dayview").show()) : (k.removeClass("product-image-nightview-visible"), d.hide().parents(".product-image-cta").find(".cta-nightview").show())
                            })
                        };
                        return i(), {addListeners: j}
                    };
                    e.gdt.ToggleNightView = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function b(o) {
                            var i = h(o), r = o.personalMessage.value, q = o.entryIndex.value, p = c.eq(q);
                            i.parents(".add-message-form").find(".modal-close").click(), r.length ? (p.find(".has-message").prop("hidden", !1).removeAttr("hidden"), p.find(".add-message-cta").prop("hidden", !0).attr("hidden", "hidden")) : (p.find(".has-message").prop("hidden", !0).attr("hidden", "hidden"), p.find(".add-message-cta").prop("hidden", !1).removeAttr("hidden"))
                        }
                        function n(d) {
                            e.gdt.Utils.Console.log(d)
                        }
                        function m(q) {
                            var p = h(q), o = p.data("form"), d = document.forms[o], a = h(d);
                            p.addClass("loading"), d.personalMessage.value = "", e.gdt.Utils.ajaxCall({type: a.attr("method"), url: a.attr("action"), data: a.serialize(), callback: function() {
                                    p.removeClass("loading"), b(d)
                                }, error: n})
                        }
                        function l(d) {
                            return d = d.replace(/\%0D%0A/g, "\r")
                        }
                        function k() {
                            h("body").on(j, ".remove-message", function() {
                                m(this)
                            }), h("body").on("submit", ".personal-message", function(q) {
                                var p = this, o = h(p), d = o.serialize(), a = l(d);
                                q.preventDefault(), o.find("button").addClass("loading"), e.gdt.Utils.ajaxCall({type: o.attr("method"), url: o.attr("action"), data: a, callback: function() {
                                        o.find("button").removeClass("loading"), b(p)
                                    }, error: n})
                            })
                        }
                        var j = "undefined" == typeof e.ontouchstart ? "click" : "touchend", c = h(".personalise");
                        k()
                    };
                    e.gdt.PersonalMessage = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function z() {
                            var i = h(q.productCard), j = q.productCard;
                            e.Modernizr.touch ? v.find(j).on("click", function(k) {
                                var a = h(this);
                                (!u.length || u.length && !e.gdt.Utils.Browser.isMobileLayout) && (a.hasClass(p.toggleView) || (k.preventDefault(), i.removeClass(p.toggleView), a.addClass(p.toggleView)))
                            }) : v.find(j).hover(function() {
                                var a = h(this);
                                a.hasClass(p.toggleView) || (i.stop(!0, !0).removeClass(p.toggleView), a.stop(!0, !0).delay(b.TIME_TO_DELAY).queue(function() {
                                    h(this).addClass(p.toggleView).dequeue()
                                }))
                            }, function() {
                                i.removeClass(p.toggleView)
                            }), h(document).on("click touchstart", function(a) {
                                i.is(a.target) || 0 !== i.has(a.target).length || i.removeClass(p.toggleView)
                            }), h(".close-overlay").on("click touchend", function(d) {
                                d.preventDefault(), d.stopPropagation(), h(this).parents(j).stop(!0, !0).removeClass(p.toggleView)
                            })
                        }
                        function y() {
                            h(document).on("click", ".product-list-item-compare-btn", function(i) {
                                i.preventDefault();
                                var k = h(i.currentTarget).closest(q.productCard).data("prod-code"), j = h(i.currentTarget).closest(q.productCard).data("product-family");
                                e.gdt.ComparatorUtil.addItems(k, j)
                            }), t.length > 0 && (s.on("click", function(i) {
                                var k = h(i.currentTarget).data("prod-code"), j = h(i.currentTarget).data("prod-family");
                                i.preventDefault(), e.gdt.ComparatorUtil.addItems(k, j)
                            }), s.modal()), h.pubsub("subscribe", c.prodAdded, function(j, i) {
                                var m, l = h(".prod-comparator-msg-wrapper .product-detail-item-added").find(".message-text"), k = l.text();
                                m = k.replace("{}", i), l.text(m), t.length > 0 && (t.find(".cta-primary .comparator-btn").hide(), t.find(".cta-primary .view-comparator-btn").css("display", "inline-block"), h(".prod-comparator-msg-wrapper").find(".modal-close").on("click", function() {
                                    setTimeout(function() {
                                        h(".mySelection").addClass("opened")
                                    }, 500)
                                }))
                            }), h.pubsub("subscribe", c.comparatorFull, function(d, i) {
                                e.gdt.ComparatorUtil.showComparatorFullMsg(i)
                            }), h.pubsub("subscribe", c.comparatorFull, function() {
                                t.length > 0 && h("#comparatorMsgWrapper").addClass("comparator-full")
                            })
                        }
                        function x() {
                            var d = h(".watch-search");
                            h(q.productCard).removeClass(p.firstProdCard), h(q.visibleProductCard).each(function(a) {
                                r ? a % 2 === 0 && h(this).addClass(p.firstProdCard) : d.length > 0 ? a % 4 === 0 && h(this).addClass(p.firstProdCard) : a % 3 === 0 && h(this).addClass(p.firstProdCard)
                            })
                        }
                        function w() {
                            y(), z(), x()
                        }
                        var v = h("#js-product-list, #js-search-results"), u = h("#js-wishlist-caro"), t = h(".product-detail"), s = h(".comparator-btn"), r = e.gdt.Utils.Browser.isMobileLayout, q = {productCard: "li.product-list-item", visibleProductCard: "li.product-list-item:visible"}, p = {toggleView: "change-view", firstProdCard: "first-prod-card"}, c = {comparatorFull: "comparator.full", prodAdded: "comparator.prod.added"}, b = {TIME_TO_DELAY: 500};
                        return w(), {toggleProdInfo: z, overlayPositionHandler: x}
                    };
                    e.gdt.ProdComparator = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function an() {
                            var i, l, k, j = e.gdt.ComparatorUtil.getTotalCount();
                            0 === j ? K.addClass("emptyComparisonList").removeClass("filledComparisonList") : (h.each(S, function(a, m) {
                                if (i = m, l = i.itemList.length, k = a, l) {
                                    var d = h(".tabs." + k).index();
                                    return al(i, l, k), h(".tabs." + k).addClass("active").siblings().removeClass("active"), c.find(".compareSlide:eq(" + d + ")").addClass("active").siblings().removeClass("active"), !1
                                }
                            }), L || (h("#loginOverlay").modal(), h.pubsub("publish", V.loginOverlay)))
                        }
                        function am() {
                            S && h.each(S, function(j, i) {
                                var m = i, l = j, k = m.itemList.length;
                                k > 0 && (h(".tabs." + l + " .tabCount").html(" (" + k + ")"), h(".tabs." + l).removeClass("disabled-tab"))
                            })
                        }
                        function al(o, s, r) {
                            var q, p, n = r, d = [];
                            h.each(o.itemList, function(j, i) {
                                q = i, p = ak(q, n), d.push(aj(p, n))
                            }), h.when.apply(h, d).then(function() {
                                for (var i in b) {
                                    if (b.hasOwnProperty(i) && b[i].length > 0) {
                                        var l, k = i, j = X[k];
                                        am(), h.each(b[i], function(t, m) {
                                            l = m, ai(j, l, k, t)
                                        }), h("#compareListTable-" + i).addClass("column-" + b[i].length)
                                    }
                                }
                                c.removeClass("loading"), W(r), e.gdt.Utils.Browser.isMobileLayout && h(".fyp").modal()
                            })
                        }
                        function ak(i) {
                            var l, k = e.location.pathname, j = k.split(".");
                            return l = j[0] + ".compareproduct." + i + ".json"
                        }
                        function aj(i, k) {
                            var j = h.Deferred();
                            return e.gdt.Utils.ajaxCall({type: "GET", url: i}).done(function(d) {
                                b[k].push(d), j.resolve()
                            }), j.promise()
                        }
                        function ai(aR, aQ, aP, aO) {
                            var aN = e.location.pathname, aM = aN.replace(".html", ".commerce-op.html"), aL = aR, aK = '<img class="dayView" src="' + aQ.imagePath + '" alt="' + aQ.title + '">', aJ = aQ.imageNightPath ? '<img class="nightView" src="' + aQ.imageNightPath + '" alt="' + aQ.title + '">' : "", aI = aQ.isPurchasable ? "<h4>" + aQ.price + '</h4><span class="content"> ' + aR.data("excluding-tax") + " </span>" : "", aH = aQ.isAddToCartAllowed ? '<form class="save-product" method="POST" action="' + aM + '"><input type="hidden" name="product-path" value="' + aQ.productPath + '" /><button class="cta-purchase" data-tracking-event="comparatorPageAction" data-tracking-comparatorfeature="purchase"  name="op:" value="add-to-cart" data-tracking-page="' + aQ.title + '">Purchase</button></form>' : "", aG = aQ.caseWatch ? aQ.caseWatch : "", aF = aQ["case"] ? aQ["case"] : "", aE = aQ.movement ? aQ.movement : "", aD = aQ.functions ? aQ.functions : "", aC = aQ.dial ? aQ.dial : "", aB = aQ.bezel ? aQ.bezel : "", aA = aQ.back ? aQ.back : "", az = aQ.waterResistant ? aQ.waterResistant : "", ay = aQ.strap ? aQ.strap : "", ax = aQ.buckleType ? aQ.buckleType : "", aw = aQ.buckleSize ? aQ.buckleSize : "", av = aQ.threadColor ? aQ.threadColor : "", au = aQ.size ? aQ.size : "", at = aQ.color ? aQ.color : "", ar = aQ.hasColorVariants, aq = aQ.url, ap = aQ.material ? aQ.material : "", ao = aQ.finishing ? aQ.finishing : "", G = aQ.reference ? aQ.reference : "", E = h(".compareListTable").data("day-view"), x = h(".compareListTable").data("night-view");
                            if (aL.find(".product td:eq(" + aO + ")").addClass("showTitle").removeClass("empty").html('<button data-tracking-event="comparatorPageAction" data-tracking-comparatorfeature="delete" class="removeProduct" data-prod-code="' + aQ.globalReference + '" data-prodcut-family="' + aP + '" >Close</button><a class="image-wrapper day-view" href="' + aQ.url + '" data-tracking-event="comparatorPageAction" data-tracking-comparatorfeature="navigate">' + aK + aJ + '<span class="title">' + aQ.title + '</span><span class="subTitle">' + aQ.reference + '</span><span class="sticky"><span class="title">' + aQ.title + '</span><span class="subTitle">' + aQ.reference + "</span></span></a>"), aL.find(".price td:eq(" + aO + ")").addClass("showTitle").find(".fillData").html(aI + aH), aL.find(".product td:eq(" + aO + ")").attr("data-reference-code", G), aJ && !N && aL.find(".product td:eq(" + aO + ")").append('<a class="toggle-image-view cta-night-view" href="#">' + x + '</a><a class="toggle-image-view cta-day-view hide-btn" href="#">' + E + "</a>"), aE && aL.find(".movement td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aE), aD && aL.find(".functions td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aD), aG && aL.find(".caseWatch td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aG), aF) {
                                var w = "";
                                if (aF) {
                                    w = '<ul class="case-description">';
                                    for (var p in aF) {
                                        aF.hasOwnProperty(p) && (w += "<li><span>" + p + "</span><span>" + aF[p] + "</span></li>")
                                    }
                                    w += "</ul>"
                                }
                                aL.find(".case td:eq(" + aO + ")").addClass("showTitle").find(".content").html(w)
                            }
                            if (aC && aL.find(".dial td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aC), aB && aL.find(".bezel td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aB), aA && aL.find(".back td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aA), az && aL.find(".waterResistant td:eq(" + aO + ")").addClass("showTitle").find(".content").text(az), ay && aL.find(".strap td:eq(" + aO + ")").addClass("showTitle").find(".content").text(ay), ax && aL.find(".buckleType td:eq(" + aO + ")").addClass("showTitle").find(".content").text(ax), aw && aL.find(".buckleSize td:eq(" + aO + ")").addClass("showTitle").find(".content").text(aw), at && aL.find(".color td:eq(" + aO + ")").addClass("showTitle").find(".content").text(at), "TRUE" === ar && (aL.find(".color td:eq(" + aO + ")").find(".available-options").addClass("available"), aL.find(".color td:eq(" + aO + ")").find(".available-options").attr("href", aq)), av && aL.find(".lining td:eq(" + aO + ")").addClass("showTitle").find(".content").text(av), au && aL.find(".size td:eq(" + aO + ")").addClass("showTitle").find(".content").text(au), ap && aL.find(".material td:eq(" + aO + ")").addClass("showTitle").find(".content").text(ap), ao && aL.find(".finishing td:eq(" + aO + ")").addClass("showTitle").find(".content").text(ao), N ? aL.find(".price td:eq(" + aO + ")").find(".newWishList").removeClass("hide").addClass("mobileOnly").attr({"data-id": aQ.globalReference, "data-path": aQ.productPath}) : aL.find(".wishlist td:eq(" + aO + ")").addClass("showThis").find(".newWishList").attr({"data-id": aQ.globalReference, "data-path": aQ.productPath}), ah(aL), ag(aL), K.addClass("filledComparisonList"), h("#compareListTable-" + aP).replaceWith(aL).parents(".compareSlide").addClass("prod-data-added"), R > -1) {
                                var j = aa("name");
                                j = decodeURIComponent(j), h("#compareListTable-" + aP).parents(".compareSlide").find(".comparelist-suffix").text(j)
                            } else {
                                h("#compareListTable-" + aP).parents(".compareSlide").find(".comparelist-suffix").text(M[aP].listName)
                            }
                            var i = !0;
                            e.gdt.ComparelistCarousel.stickyHeader(0, i), N && e.gdt.ComparelistCarousel.swipeFunction(), h(".newWishList").modal()
                        }
                        function ah(d) {
                            d.find("tr").not(".product, .wishlist").each(function() {
                                var j = h(this), i = "";
                                j.removeClass("hide"), j.find("td").each(function() {
                                    var k = h(this).find(".content").text();
                                    i += k
                                }), "" === i && j.addClass("hide")
                            })
                        }
                        function ag(d) {
                            d.find("tr").each(function() {
                                for (var j = h(this), i = 0;
                                        3 > i;
                                        i++) {
                                    var k = j.find("td").eq(i).find(".content").height();
                                    k > 38 && (j.find("td").eq(i).find(".large-content").length || j.find("td").eq(i).find(".content").addClass("large-content").after('<a class="toggle-content" href="#">view more</a>'))
                                }
                            })
                        }
                        function af(s, r) {
                            var q = h("#rename-comparelist-form"), p = h("#product-category"), o = h("#old-comparelist-name"), n = h("#comparelist-name"), m = location.pathname.split("."), l = location.pathname.split(".").pop(-1), k = m[0] + ".commerce-op." + l;
                            q.attr("action", k), p.val(s), o.val(r), n.val(r)
                        }
                        function ae(i, n) {
                            var m = i.serialize(), l = i.attr("method"), k = i.attr("action"), j = i.find("#comparelist-name").val();
                            L ? (e.console.log("logged in user"), h.ajax({type: l, url: k, data: m, success: function() {
                                    M[n].listName = j, h("#compareListTable-" + n).parents(".compareSlide").find(".comparelist-suffix").text(M[n].listName), e.gdt.ComparatorUtil.updateCompareCookie(S)
                                }, beforeSend: function() {
                                    i.find(".cta-comparelist").addClass("loading")
                                }, complete: function() {
                                    h.pubsub("publish", V.modal.close), i.find(".cta-comparelist").removeClass("loading")
                                }})) : (e.console.log("anonymous user"), M[n].listName = j, e.gdt.ComparatorUtil.updateCompareCookie(S), h("#compareListTable-" + n).parents(".compareSlide").find(".comparelist-suffix").text(M[n].listName), h.pubsub("publish", V.modal.close))
                        }
                        function ad(j) {
                            var i, l, k;
                            i = M[j], i && (l = i.itemList.length, k = h(".tabs." + j).index(), al(i, l, j), h(".tabs." + j).addClass("active").siblings().removeClass("active"), c.find(".compareSlide:eq(" + k + ")").addClass("active").siblings().removeClass("active"))
                        }
                        function ac() {
                            h(".tabs").on("click", function() {
                                var u, t, s = h(this), r = h("#tab-parent").find(".tabs").length, q = s.height(), p = q * (r - 1), o = s.parent(), n = s.data("product-family"), m = s.index();
                                u = M[n], t = u.itemList.length, s.hasClass("active") ? o.hasClass("open") ? (o.removeClass("open"), e.gdt.ComparelistCarousel.stickyHeader(-p)) : (o.addClass("open"), e.gdt.ComparelistCarousel.stickyHeader(p)) : t && (s.addClass("active").siblings().removeClass("active"), c.find(".compareSlide:eq(" + m + ")").addClass("active").siblings().removeClass("active"), c.find(".compareSlide:eq(" + m + ")").hasClass("prod-data-added") ? (W(n), o.removeClass("open"), e.gdt.ComparelistCarousel.stickyHeader(-p)) : (c.addClass("loading"), al(u, t, n), o.removeClass("open"), e.gdt.ComparelistCarousel.stickyHeader(-p)))
                            }), h(document).on("click", ".edit-compare-list", function(j) {
                                j.preventDefault();
                                var i = h(this).data("prod-family"), k = h(this).parents(".compareSlide").find(".comparelist-suffix").text();
                                af(i, k)
                            }), O.on("submit", ".rename-comparelist", function(j) {
                                j.preventDefault();
                                var i = h(this), k = i.find("#product-category").val();
                                ae(i, k)
                            }), h("body").on("click", ".removeProduct", function() {
                                var i = h(this), l = i.data("prod-code"), k = i.data("prodcut-family"), j = h(this).parents("td").index();
                                e.gdt.ComparatorUtil.removeItems(l, k, j), i.addClass("loading")
                            }), h.pubsub("subscribe", J.prodRemoved, function(j, i) {
                                var n, m = i.prodType, l = i.tdIndex;
                                if (X[m] = Z[m].clone(), n = X[m], b[m].splice(l, 1), h.cookie(Q.COMPARECOOKIE) && (S = h.parseJSON(h.cookie(Q.COMPARECOOKIE)), M = {WMF: S.WMF, WBU: S.WBU, WBR: S.WBR}), b[m].length > 0) {
                                    h.each(b[m], function(o, d) {
                                        ai(n, d, m, o)
                                    }), h("#compareListTable-" + m).addClass("column-" + b[m].length), h(".tabs." + m + " .tabCount").html(" (" + b[m].length + ")")
                                } else {
                                    h("#compareListTable-" + m).replaceWith(n), h("#compareListTable-" + m).parent(".compareSlide").removeClass("prod-data-added"), h(".tabs." + m).addClass("disabled-tab").find(".tabCount").html(""), h("#tab-parent").find(".tabs:not(.disabled-tab):first").trigger("click"), h("#compareListTable-" + m).addClass("column-" + b[m].length);
                                    var k = h("#tab-parent").find(".disabled-tab").length;
                                    k === Q.MAXPRODCOMPARESIZE && K.addClass("emptyComparisonList").removeClass("filledComparisonList")
                                }
                            }), O.on("click", ".toggle-content", function(i) {
                                i.preventDefault();
                                var d = h(this).parents(".showTitle").find(".content");
                                d.hasClass("large-content") ? (d.removeClass("large-content"), h(this).text("view less").addClass("less")) : (d.addClass("large-content"), h(this).text("view more").removeClass("less"))
                            }), O.on("click", ".toggle-image-view", function(j) {
                                j.preventDefault();
                                var i = h(this).parents("td").find(".image-wrapper"), k = h(this).parents("td");
                                i.hasClass("day-view") ? i.removeClass("day-view").addClass("night-view") : i.removeClass("night-view").addClass("day-view"), k.find(".cta-day-view").toggleClass("hide-btn"), k.find(".cta-night-view").toggleClass("hide-btn")
                            }), c.length && O.on("click", ".print", function(d) {
                                d.preventDefault(), e.print()
                            })
                        }
                        function ab() {
                            O.on("click", ".tip", function() {
                                var j = h(this), i = j.position().left, m = j.next(".tipContent"), l = m.height(), k = j.parent();
                                h(".titleTip").removeClass("visible"), N || m.css({"margin-top": -(l / 2), "margin-left": i}), k.addClass("visible")
                            }), O.on("click", function() {
                                h(".titleTip").removeClass("visible")
                            }), O.on("click", ".tipContent, .tip", function(d) {
                                d.stopPropagation()
                            })
                        }
                        function aa(j) {
                            j = j.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                            var i = "[\\#&]" + j + "=([^&#]*)", l = new RegExp(i), k = l.exec(window.location.hash.substr());
                            return null === k ? "" : k[1]
                        }
                        function Y() {
                            var j = aa("products"), i = h(".edit-compare-list").data("prod-family"), m = j.split(","), l = m.length, k = {listName: "", itemList: m};
                            al(k, l, i), K.addClass("filledSharedView")
                        }
                        function W(j) {
                            var i = {WBU: "Buckles", WBR: "Straps", WMF: "Watches"}, l = h(".compareListTable-" + j).find("tr.first td"), k = [];
                            h(l).each(function() {
                                k.push(h(this).data("reference-code"))
                            }), P.trackevent = h(".tabs").data("tracking-event"), P.comparisonProduct1 = k[0], P.comparisonProduct2 = k[1], P.comparisonProduct3 = k[2], P.productCategory = i[j], h.pubsub("publish", V.tabClicked, P)
                        }
                        function U() {
                            h(".edit-compare-list").modal(), Z = {WMF: h(".compareListTable-WMF"), WBU: h(".compareListTable-WBU"), WBR: h(".compareListTable-WBR")}, X = {WMF: Z.WMF.clone(), WBU: Z.WBU.clone(), WBR: Z.WBR.clone()}, h.cookie(Q.COMPARECOOKIE) && (S = h.parseJSON(h.cookie(Q.COMPARECOOKIE)), M = {WMF: S.WMF, WBU: S.WBU, WBR: S.WBR}), ac(), h("#compareListTableWrapper").length > 0 && (T = T.substr(1), T && "WBU" === T || "WBR" === T || "WMF" === T ? ad(T) : an(), ab()), R > -1 && (Y(), ab())
                        }
                        var S, Q = {COMPARECOOKIE: "compare-product", WATCH: "WMF", BUCKLE: "WBU", STRAP: "WBR", MAXPRODCOMPARESIZE: 3}, O = h("body"), M = [], K = h("html"), c = h("#compareListTableWrapper"), b = {WMF: [], WBU: [], WBR: []}, Z = {}, X = {}, V = e.gdt.Utils.PubSub.UI_EVENTS, T = location.hash, R = window.location.href.indexOf("shared"), P = {event: "", productCategory: "", comparisonProduct1: "", comparisonProduct2: "", comparisonProduct3: ""}, N = e.gdt.Utils.Browser.isMobileLayout, L = h("html").hasClass("logged-in"), J = {prodRemoved: "comparator.prod.removed"};
                        U()
                    };
                    e.gdt.ProdComparatorResult = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {}, e.gdt.ProductGallery = e.gdt.ProductGallery || {}, e.videojs.options = {flash: {swf: "/swf/video-js.swf", params: {wmode: "transparent"}}};
                    var g = function() {
                        function aw(i, d) {
                            i.find(".zoom-image").attr("src", d), i.find(".zoom-image").get(0).remove()
                        }
                        function av(i) {
                            var a = e.gdt.Utils.Picture.getImgSrcFromTemplate(i);
                            aw(i, a)
                        }
                        function au() {
                            Z.hasClass("zoomed") && h(".slide.zoomed").each(function() {
                                h(this).find('[type="text/x-tmpl"]').length && av(h(this))
                            })
                        }
                        function at() {
                            ak(W), ak(V), h(".video-playing").removeClass("video-playing")
                        }
                        function ar(i, d) {
                            ad.find(".scroll").addClass("no-transition"), ad.akcarousel("move", i.index()), setTimeout(function() {
                                ad.find(".scroll").removeClass("no-transition")
                            }, 1000), ac.addClass("moodboard-hidden"), ad.addClass("carousel-hero-productgallery-visible"), aa.addClass("modal-full-gallery-visible"), Y.addClass("modal-full-ft-visible"), Z.removeClass(c), ap(d), am(W, "pause")
                        }
                        function aq() {
                            ac.removeClass("moodboard-hidden"), ad.removeClass("carousel-hero-productgallery-visible"), aa.removeClass("modal-full-gallery-visible"), Y.removeClass("modal-full-ft-visible")
                        }
                        function ap(d) {
                            switch (d) {
                                case Z.size() - 1:
                                    Y.removeClass("modal-full-ft-visible");
                                    break;
                                default:
                                    Y.addClass("modal-full-ft-visible")
                            }
                        }
                        function ao() {
                            "click" === T && (ac.on("mouseover", "li", function() {
                                var d = h(this);
                                d.closest("ul").find("li").not(d).addClass("unhover")
                            }), ac.on("mouseout", "li", function() {
                                var d = h(this);
                                d.closest("ul").find("li").removeClass("unhover")
                            })), ac.on(T, "li:not(.video-container)", function() {
                                var i = h(this), j = i.index();
                                e.matchMedia("only screen and (min-width: 700px)").matches && ar(i, j)
                            }).on(T, ".video-container:not(.video-playing)", function() {
                                am(W, "play")
                            }), aa.on(T, function() {
                                aq(), am(V, "pause")
                            })
                        }
                        function an(j) {
                            for (var i = j.controlBar, l = i.addChild("button").addClass("pan-volume"), k = 0;
                                    4 > k;
                                    k++) {
                                l.addChild("button").addClass("volumelevel level" + (k + 1) + " active")
                            }
                            h(l.el_).on(T, ".volumelevel", function() {
                                var a = h(this), o = ".volumelevel", n = a.parent().find(o), m = a.index(o) + 1 / n.size();
                                j.volume(m), n.removeClass("active").filter(":lt(" + parseInt(a.index(o) + 1, 10) + ")").addClass("active")
                            })
                        }
                        function am(i, d) {
                            switch (d) {
                                case"play":
                                    i.paused() && i.play();
                                    break;
                                case"pause":
                                    i.paused() || i.pause()
                            }
                        }
                        function al() {
                            b.each(function() {
                                var d = h(this).get(0);
                                e.videojs(d, {nativeControlsForTouch: !1}).ready(function() {
                                    V = this, this.nativeControlsForTouch = !1, an(V), U = this.techName, ao(this)
                                })
                            })
                        }
                        function ak(d) {
                            void 0 !== d && (d.pause(), setTimeout(function() {
                                d.dispose()
                            }, 0))
                        }
                        function aj() {
                            N.removeClass("slidenavvisible").addClass("slidenavhidden"), Q.removeClass("slidenavvisible").addClass("slidenavhidden"), P.removeClass("arrow-down").addClass("arrow-up")
                        }
                        function ai() {
                            ad.akcarousel({delay: 5000, horizontal: !0, scrollNode: !0, autoSwitch: !1, scrollSpeed: 1000, navarrows: !0, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", callback: function(d) {
                                    h(".desktop.slidenavigation").akcarousel("move", d)
                                }}), h(".desktop.slidenavigation").akcarousel({horizontal: !0, delay: 5000, scrollSpeed: 500, scrollNode: !0, interruptionDelay: 10000, skipbounds: !0, lockscroll: !0, tapnavigation: !0, variablesizeslides: !0, navarrows: !0, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", callback: function(d) {
                                    ad.akcarousel("move", d), N.removeClass("slidenavvisible").addClass("slidenavhidden"), Q.removeClass("slidenavvisible").addClass("slidenavhidden"), P.removeClass("arrow-down").addClass("arrow-up"), P.removeClass("btndisappear")
                                }}), setTimeout(function() {
                                aj()
                            }, 2000), ab = ad.find(".cleftarrow, .crightarrow"), Q.on(T + ".buttonslideup", function(l) {
                                l.preventDefault(), l.stopPropagation();
                                var d = h(this).find("button").attr("class");
                                O || ("cta-gallery arrow-up" === d ? (N.addClass("slidenavvisible").removeClass("slidenavhidden"), Q.addClass("slidenavvisible").removeClass("slidenavhidden"), P.addClass("arrow-down").removeClass("arrow-up"), P.addClass("btndisappear").removeClass("btnappear")) : (N.removeClass("slidenavvisible").addClass("slidenavhidden"), Q.removeClass("slidenavvisible").addClass("slidenavhidden"), P.removeClass("arrow-down").addClass("arrow-up")), R.on(T + ".buttonslideup", function(m) {
                                    h(m.target).parents(".slidenavigation").length || (N.removeClass("slidenavvisible").addClass("slidenavhidden"), Q.removeClass("slidenavvisible").addClass("slidenavhidden"), P.removeClass("arrow-down").addClass("arrow-up"), P.removeClass("btndisappear"), R.off(T + ".buttonslideup"))
                                }))
                            }), h(".zoom").length > 0 && h(".zoom").galleryZoom();
                            var j = window.location.hash, i = [];
                            i = j.split("-");
                            var k = i[1];
                            "#gallery" === i[0] && (h("#js-product-gallery-carousel").akcarousel("move", k - 1), h(".desktop.slidenavigation").akcarousel("move", k - 1)), au()
                        }
                        function ah() {
                            ad = h("#js-product-gallery-carousel"), Z = ad.find("li"), X = ad.find(".video-js").clone()
                        }
                        function ag() {
                            ad || (ah(), ai(), al())
                        }
                        function af() {
                            h("#js-product-gallery").modal(), h("body").on("click", "#js-product-gallery-btn", function() {
                                h.pubsub("publish", S.productGallery), h("#js-product-gallery").find(".slidenavigation .slide").each(function() {
                                    var k = h(this), j = k.find("img");
                                    j.each(function() {
                                        var m = h(this), l = m.data("src");
                                        m.attr("src", l)
                                    })
                                })
                            });
                            var i = window.location.hash, d = [];
                            d = i.split("-"), "#gallery" === d[0] && (h.pubsub("publish", S.productGallery), h("#js-product-gallery").find(".slidenavigation .slide").each(function() {
                                var k = h(this), j = k.find("img");
                                j.each(function() {
                                    var m = h(this), l = m.data("src");
                                    m.attr("src", l)
                                })
                            }))
                        }
                        function ae() {
                            h.pubsub("subscribe", S.modal.productGallery.opening, ag), h.pubsub("subscribe", S.modal.productGallery.closing, at), af()
                        }
                        var ad, ac, ab, aa, Z, Y, X, W, V, U, T = "undefined" == typeof window.ontouchstart ? "click" : "touchend", S = e.gdt.Utils.PubSub.UI_EVENTS, R = h("body"), Q = h(".buttonslideup"), P = h(".buttonslideup button"), O = !1, N = h(".slidenavigation"), c = "carousel-hero-image-lazyload", b = h(".video-js");
                        return h(".video-container").on("click", function() {
                            var j = h(this), i = j.find("video.vjs-tech"), k = i.get(0).player.controlBar;
                            am(i.get(0).player, "play"), i.get(0).player.on("play", function() {
                                h(i.get(0).player.el_).parent().addClass("video-playing"), k.show()
                            }), i.get(0).player.on("pause", function() {
                                h(i.get(0).player.el_).parent().removeClass("video-playing"), am(i.get(0).player, "pause"), k.hide()
                            }), i.on("ended", function() {
                                h(i.get(0).player.el_).parent().removeClass("video-playing"), k.hide()
                            })
                        }), ae(), {init: ae}
                    };
                    e.gdt.ProductGallery = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function v() {
                            o.on(s, function() {
                                var j = "promo-open", i = p.hasClass(j) ? n : c, l = q.prev("h3").outerHeight(!0), k = p.hasClass(j) ? 0 : p.find("ul").outerHeight(!0) + l;
                                p.toggleClass(j).css("max-height", k + "px"), o.text(i).toggleClass("button-minimise")
                            })
                        }
                        function u() {
                            "click" !== s && q.on(s, "li.product-list-item", function() {
                            }).on("touchstart", function() {
                                r = !1
                            }).on("touchmove", function() {
                                r = !0
                            }), b.on("change", function() {
                                var i, k = q.find('[data-purchaseable="false"]'), j = h("body");
                                "online" === h(this).val() ? (k.hide(), i = "sold online") : (k.show(), i = "view all"), q.hide().fadeIn(2000), e.gdt.ProdComparator.overlayPositionHandler(), j.trigger("collectionsViewFilter", {event: "itemDisplay", Product_subsection: h("input[name=Product_subsection]").val(), Product_type: h("input[name=Product_type]").val(), view: i})
                            })
                        }
                        function t() {
                            u(), v()
                        }
                        var s = "undefined" == typeof window.ontouchstart ? "click" : "touchend", r = !1, q = h("#js-product-list"), p = h("#js-splash-promo"), o = h("#js-show-promo"), n = o.text(), c = o.data("closetext"), b = h("#js-product-list-filters").find("[name=product-filter]");
                        return{init: t}
                    };
                    e.gdt.ProductList = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function t(i, d) {
                            i.css("background-image", "url(" + d + ")")
                        }
                        function s(i) {
                            var a = e.gdt.Utils.Picture.getImgSrcFromTemplate(i);
                            i.removeClass(b), t(i, a)
                        }
                        function r() {
                            n.akcarousel({horizontal: !0, scrollNode: !0, autoSwitch: !1, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", callback: function(i) {
                                    var d = h(this.node).find(".slide").size(), k = i === d ? 0 : i + 1, j = h(this.node).find(".slide").eq(k);
                                    j.hasClass(b) && s(j)
                                }}), s(m.eq(0)), s(m.eq(1))
                        }
                        function q() {
                            c.on(o, "a", function() {
                                s(n.find("." + b)), n.akcarousel("move", h(this).index())
                            })
                        }
                        function p() {
                            n.length && (r(), q()), e.gdt.Utils.Browser.isMobileLayout && h(".qualityContentContainer").parent().find(".mobile-links").find("a.back").hide()
                        }
                        var o = "undefined" == typeof window.ontouchstart ? "click" : "touchend", n = h("#js-carousel-QualityControl"), m = h("#js-carousel-QualityControl").find("li"), c = h(".pager"), b = "carousel-hero-image-lazyload";
                        p()
                    };
                    e.gdt.QualityControlSlider = new g
                }(document, window, window.jQuery || window.Zepto), function(R, Q) {
                    var P = "undefined" == typeof window.ontouchstart ? "click" : "touchend", O = R(".social-wrapper"), N = O.find("dl"), M = O.find(".emailOverlay"), L = O.find(".close, .modal-close"), K = R("#library"), J = R("#empty-comparelist, #emptyWishlist, #js-wishlist-caro"), I = R("html"), H = R("#empty-comparelist"), G = ".social-wrapper .facebook a, .social-wrapper .twitter a, .social-wrapper .linkedin a, .social-wrapper .googleplus a, .social-wrapper .pinterest a, .close", F = R(".socialShare"), E = R("#compareListTableWrapper"), D = R("#js-wishlist-caro"), C = R(".carousel-wishlist-wrap"), B = R(".equalTitle").length ? R(".equalTitle") : 0;
                    if (!Q.gdt.Utils.Browser.isMobileLayout && (H.length || D.length) && B) {
                        var A = B.offset().top;
                        O.css("top", A + 100), R("body").on("click", G, function() {
                            I.removeClass("mobileSite openOptions openTellFriend")
                        })
                    }
                    if (O.length) {
                        var z = R(".socialShare.social-button");
                        if (Q.gdt.Utils.Browser.isMobileLayout) {
                            var y = F.clone(!0);
                            R(".product-image-cta").append(y)
                        } else {
                            z.length && (M.css({top: F.offset().top, left: F.offset().left - 410, marginTop: -M.height() / 2}), N.css({top: F.offset().top, left: F.offset().left + 4, marginTop: -(N.height() + 15)}), R(window).on("orientationchange", function() {
                                M.css({top: F.offset().top, left: F.offset().left - 410, marginTop: -M.height() / 2}), N.css({top: F.offset().top, left: F.offset().left + 4, marginTop: -(N.height() + 15)})
                            }))
                        }
                        if (!z.length && Q.gdt.Utils.Browser.isMobileLayout ? O.find("dd.email").on(P, function(b) {
                            b.preventDefault(), I.addClass("openTellFriend")
                        }) : z.length || K.length || J.length || I.addClass("footerShare"), J.length && !Q.gdt.Utils.Browser.isMobileLayout && I.addClass("compareAndwishlistShare"), R("body").on(P, ".socialShare", function(v) {
                            v.preventDefault();
                            var u = M.find(".captchaID"), p = u.prop("id"), o = u.data("sitekey");
                            if (I.addClass(Q.gdt.Utils.Browser.isMobileLayout ? "openOptions mobileSite" : "openOptions"), R("#recaptcha_challenge_field_holder").remove(), R("#recaptcha_response_field").remove(), M.find(".captchaID").append('<input type="text" id="recaptcha_response_field" required name="recaptcha_response_field" />'), R.getScript("//www.google.com/recaptcha/api/js/recaptcha_ajax.js", function() {
                                R("#recaptcha_image").remove(), R('<div id="recaptcha_image"></div>').insertBefore(R("#" + p + " .recaptcha_only_if_incorrect_sol")), window.Recaptcha.create(o, p, window.RecaptchaOptions)
                            }), E.length || D.length) {
                                var n = R("#compareListTableWrapper").find(".compareSlide.active table"), j = n.data("description"), f = R("#compareListTableWrapper").find(".compareSlide.active h1 .comparelist-suffix").text() ? R("#compareListTableWrapper").find(".compareSlide.active h1 .comparelist-suffix").text() : C.data("title"), d = n.data("media") ? n.data("media") : C.data("media"), b = n.data("share-url") ? n.data("share-url") : C.data("share-url"), a = n.data("title") ? n.data("title") : C.data("title"), T = [];
                                f = encodeURIComponent(f), n.find("tr.first td.showTitle").each(function() {
                                    var c = R(this).find(".removeProduct").data("prod-code");
                                    T.push(c)
                                }), Q.gdt.Utils.Browser.isMobileLayout ? R(this).parents(".slide:first").find(".wishlist-prod-list li").each(function() {
                                    var c = R(this).data("prod-code");
                                    T.push(c)
                                }) : D.find(".slide.active .wishlist-prod-list li").each(function() {
                                    var c = R(this).data("prod-code");
                                    T.push(c)
                                }), O.find("dd a").not(".email a, .footerShareThis a, .close a, .title a").each(function() {
                                    var g = R(this), k = g.data("href-original"), i = "products=" + T + "&name=" + f;
                                    i = encodeURIComponent(i);
                                    var h = k.replace(/{url}/g, b + i).replace(/{description}/g, j).replace(/{pagetitle}/g, a).replace(/{media}/g, d);
                                    g.prop("href", h)
                                });
                                var S = decodeURIComponent(b);
                                R("#share-url").prop("value", S + "products=" + T + "&name=" + f)
                            }
                        }), R("body").find("dd.email").on(P, function(a) {
                            a.preventDefault();
                            var h = M.find(".captchaID"), g = h.prop("id"), f = h.data("sitekey");
                            I.addClass("openTellFriend"), M.find("form").show(), M.find(".gdt-message").remove(), R("#recaptcha_challenge_field_holder").remove(), R("#recaptcha_response_field").remove(), M.find(".captchaID").append('<input type="text" id="recaptcha_response_field" required name="recaptcha_response_field" />'), R.getScript("//www.google.com/recaptcha/api/js/recaptcha_ajax.js", function() {
                                R("#recaptcha_image").remove(), R('<div id="recaptcha_image"></div>').insertBefore(R("#" + g + " .recaptcha_only_if_incorrect_sol")), window.Recaptcha.create(f, g, window.RecaptchaOptions)
                            })
                        }), K.length) {
                            if (Q.gdt.Utils.Browser.isMobileLayout) {
                                var x = R(".emailOverlay"), w = R(".social-button:first dl").clone(!0);
                                x.wrap('<div class="social-wrapper createdOne"></div>').parent().prepend(w), R("body").on(P, "#library .social-button", function() {
                                    I.addClass("libEmail"), R("#library").hide()
                                }), R("body").on(P, "dd.close", function() {
                                    I.removeClass("libEmail"), R("#library").show()
                                })
                            } else {
                                R("body").on(P, "#library .social-button", function() {
                                    R(this).addClass("visible")
                                })
                            }
                            R("body").on(P, function() {
                                R("#library .social-button").removeClass("visible")
                            }), R("body").on(P, "#library .social-button", function(b) {
                                b.stopPropagation()
                            }), R(".modal-close").on(P, function(b) {
                                b.preventDefault(), I.removeClass("openTellFriend")
                            })
                        }
                        L.on(P, function(b) {
                            b.preventDefault(), I.removeClass("mobileSite openOptions openTellFriend")
                        }), R("body").on(P, function() {
                            I.removeClass("mobileSite openOptions openTellFriend")
                        }), R("body").on(P, ".socialShare, .social-wrapper, .emailOverlay", function(b) {
                            b.stopPropagation()
                        })
                    }
                }(window.jQuery, window), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function t(j) {
                            j = j.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                            var i = "[\\?&]" + j + "=([^&#]*)", l = new RegExp(i), k = l.exec(window.location.href);
                            return null === k ? "" : k[1]
                        }
                        function s() {
                            var a = t("case"), y = t("case-diameter");
                            a = a.replace(new RegExp("%7C", "g"), "|"), y = y.replace(new RegExp("%7C", "g"), "|"), a = a.substring(0, a.indexOf("|")), y = y.substring(0, y.indexOf("|"));
                            var x = window.location.protocol, w = window.location.host, v = window.location.pathname;
                            v = v.substring(0, v.indexOf("."));
                            var u = h("input.colorVariantsPathVar").data("path"), l = h("input.sizeVariantsPathVar").data("path"), k = h("input.relatedVariantsPathVar").data("path");
                            h("input.colorVariantsPathVar").val(x + "//" + w + v + u + a + "." + y + ".html"), h("input.sizeVariantsPathVar").val(x + "//" + w + v + l + a + "." + y + ".html"), h("input.relatedVariantsPathVar").val(x + "//" + w + v + k + a + "." + y + ".html")
                        }
                        function r() {
                            var a = h("input.colorVariantsPathVar").val();
                            if (h("div.moreVariants").hide(), h("div.availableVariantsSection").hide(), h("div.strap-Size").hide(), m > 0 && c > 0) {
                                var i = t("ref");
                                a = a.slice(0, -6), a = a + "REF-" + i + ".html"
                            }
                            h.ajax({type: "GET", url: a, dataType: "html", success: function(d) {
                                    h("div.availableVariantsCont").html(d), h("div.availableData:gt(3)").hide(), h("div.availableData").length >= 5 ? h("div.moreVariants").show() : h("div.moreVariants").hide(), h("div.availableData").length >= 1 && h("div.availableVariantsSection").show(), h("#strapDetailPage .availableVariantsSection .availableVariantsCont .availableData a").attr("href", function(k, j) {
                                        return j + "?" + n
                                    })
                                }}), h("div.variantsAvailable .moreVariants span").on("click", function() {
                                h("div.availableData:gt(3)").animate({height: "toggle"}, 600, function() {
                                }), h("div.availableData").not(":visible").animate({height: "toggle"}, 500, function() {
                                });
                                var k = h("div.variantsAvailable .moreVariants span"), j = "more", l = "less";
                                k.hasClass("more") ? (h(".availableVariantsSection").addClass("visibleAvailableColors"), k.removeClass("more"), h(this).addClass("slideUp"), k.html(l)) : (h(".availableVariantsSection").removeClass("visibleAvailableColors"), h(this).addClass("more"), h(this).removeClass("slideUp"), h(this).html(j))
                            })
                        }
                        function q() {
                            var a = h("input.sizeVariantsPathVar").val();
                            if (m > 0 && c > 0) {
                                var i = t("ref");
                                a = a.slice(0, -6), a = a + "REF-" + i + ".html"
                            }
                            h.ajax({type: "GET", url: a, dataType: "html", success: function(d) {
                                    h("span.product-size").html(d), h("span.product-size select option").length >= 1 && h("div.strap-Size").show(), h("#strapDetailPage .product-overview .strap-Size .product-size select").bind("change", function() {
                                        var j = this.value + "?" + n;
                                        return j && (window.location = j), !1
                                    })
                                }})
                        }
                        function p() {
                            var a = h("input.relatedVariantsPathVar").val();
                            if (m > 0 && c > 0) {
                                var i = t("ref");
                                a = a.slice(0, -6), a = a + "REF-" + i + ".html"
                            }
                            h.ajax({type: "GET", url: a, dataType: "html", success: function(d) {
                                    h("div.products-related-accessories").html(d), h(".products-related-accessories a").attr("href", function(k, j) {
                                        return j + "?" + n
                                    }), h("main div.products-related-accessories ul li").length < 1 && h("div.products-related-accessories").remove()
                                }})
                        }
                        function o() {
                            if (h("main #strapDetailPage").length > 0) {
                                s(), r(), 1 !== b && (q(), p()), h("main div.related-buckle ul li").length < 1 ? h("main div.related-buckle").remove() : h(".related-buckle ul li a").attr("href", function(j, i) {
                                    return -1 === i.indexOf("?") ? i + "?" + n : void 0
                                }), h("nav.product-crumb span a").attr("href", function(j, i) {
                                    return i + "?" + n
                                });
                                var d = document.URL.split("?")[1];
                                void 0 !== d ? (h("#snb-selection .selectionView").show(), h("#snb-selection .selectionView p a").attr("href", function(j, i) {
                                    return i + "?" + n
                                })) : h("#snb-selection .selectionView").hide()
                            }
                        }
                        var n = window.location.href.slice(window.location.href.indexOf("?") + 1), m = e.location.search.indexOf("ref="), c = e.location.search.indexOf("wid="), b = e.location.search.indexOf("sid=");
                        o()
                    };
                    e.gdt.strapsBracelets = new g
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function z() {
                            var i, j = h.trim(c.html());
                            j = h.parseHTML(j), i = h(j), c.replaceWith(i), r = p.find("picture"), e.picturefill()
                        }
                        function y() {
                            r.hide()
                        }
                        function x() {
                            r.show()
                        }
                        function w() {
                        }
                        function v() {
                            b.each(function() {
                                var d = h(this);
                                d.parent().prepend(d)
                            })
                        }
                        function u() {
                        }
                        function t() {
                            h(e).smartresize(function() {
                                var a = "undefined" != typeof r;
                                e.matchMedia("only screen and (min-width: 668px)").matches ? (u(), a ? x() : z()) : (w(), 0 !== q.data("index") && v(), a || 0 !== q.data("index") ? 0 !== q.data("index") && y() : z())
                            }), h(e).trigger("resize")
                        }
                        function s() {
                            q.length && t()
                        }
                        var r, q = h("#js-sustainability-wrap"), p = q.find(".splash"), c = p.find("script"), b = q.find(".thumbs");
                        s()
                    };
                    e.gdt.SustainabilityWrap = new g
                }(document, window, window.jQuery || window.Zepto), function(g, f, j) {
                    function i() {
                        function b(d) {
                            j.ajax({type: "post", url: d.attr("action"), data: d.serialize(), dataType: "json", success: function(a) {
                                    c.removeClass("loading"), d.parents("div.emailOverlay").addClass("messageTellaFriend"), a.status === !0 ? (d.hide().after("<div class='gdt-message'>" + a.message + "</div>"), f.Recaptcha.reload(), d.find("[type=reset]").trigger("click"), d.find(".captchaDiv").removeClass("captchaError")) : a.status === !1 && void 0 !== a.validCaptcha && a.validCaptcha === !1 ? (d.find(".captchaDiv").addClass("captchaError"), f.Recaptcha.reload()) : (d.hide().after("<div class='gdt-message'>" + a.message + "</div>"), f.Recaptcha.reload(), d.find("[type=reset]").trigger("click"), d.find(".captchaDiv").removeClass("captchaError"))
                                }, error: function(a, k, e) {
                                    d.hide().after("<div class='gdt-message'>" + e + "</div>")
                                }})
                        }
                        var c = j("#js-tell-a-friend div.send-request button");
                        c.on(h, function(a) {
                            a.preventDefault(), window.gdt.Validate.form("tellafriend") && (b(j("#tellafriend")), c.addClass("loading"))
                        })
                    }
                    f.gdt = f.gdt || {}, f.gdt.Utils = f.gdt.Utils || {};
                    var h = "undefined" == typeof window.ontouchstart ? "click" : "touchend";
                    f.gdt.Tellafriend = new i
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function z(i) {
                            var k, j = h.trim(i.html());
                            j = h.parseHTML(j), k = h(j), i.replaceWith(k), e.picturefill()
                        }
                        function y(a) {
                            z(p.eq(a).find('[type="text/x-tmpl"]')), z(p.eq(a + 1).find('[type="text/x-tmpl"]'))
                        }
                        function x() {
                            q.akcarousel({delay: 5000, horizontal: !0, scrollNode: !0, autoSwitch: !1, scrollSpeed: 1000, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", navarrows: !0, callback: function(d) {
                                    r.akcarousel("move", d), v(c.eq(d)), y(d)
                                }})
                        }
                        function w() {
                            r.akcarousel({horizontal: !0, scrollNode: !0, autoSwitch: !1, scrollSpeed: 600, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)", navarrows: !0})
                        }
                        function v(d) {
                            c.removeClass("clicked"), d.addClass("clicked"), window.location.hash = d.data("year")
                        }
                        function u() {
                            r.find(".slide").on("click", function() {
                                var i = h(this), d = i.index();
                                v(i), q.akcarousel("move", d), r.akcarousel("move", d), y(d)
                            }), h(document).on(s, function() {
                                q.find(".scroll").addClass("scroll-interacted")
                            })
                        }
                        function t() {
                            if (r.length) {
                                x(), w(), u();
                                var a = window.location.href.split("#")[1], d = a ? r.find('[data-year="' + a + '"]').index() : 0;
                                d = -1 === d ? 0 : d, c.eq(d).addClass("clicked"), q.akcarousel("move", d), r.akcarousel("move", d), y(d), h(".carousel-history-container").find(".slide section").mCustomScrollbar({scrollInertia: 0})
                            }
                            b.length && p.each(function() {
                                z(h(this).find('[type="text/x-tmpl"]'))
                            })
                        }
                        var s = "undefined" == typeof window.ontouchstart ? "click" : "touchstart", r = h("#js-timeline-carousel"), q = h("#js-timeline-content-carousel"), p = q.find(".slide"), c = r.find(".slide"), b = h(".cq-wcm-edit");
                        t()
                    };
                    e.gdt.Timeline = new g
                }(document, window, window.jQuery || window.Zepto), function(g, f, j) {
                    function i() {
                        function b(d, k) {
                            d.hasClass("myCustomTooltip") ? (d.css("opacity", 0), d.prop("hidden", !1), d.removeAttr("hidden"), d.css("top", (k.position().top + k.height()) / 2 - d.height() - 24), d.css("opacity", 1)) : (d.css("opacity", 0), d.prop("hidden", !1), d.removeAttr("hidden"), f.gdt.Utils.Browser.isMobileLayout ? (d.css("left", 0), d.css("top", -(k.position().top + k.height() + d.height() + 10))) : (d.css("left", k.position().left + k.width() + 10), d.css("top", (k.position().top + k.height()) / 2 - d.height() / 2 - 10)), d.css("opacity", 1))
                        }
                        function e(d) {
                            d.animate({opacity: 0}, 200, function() {
                                d.prop("hidden", !0), d.attr("hidden", "hidden")
                            }), c.removeClass("mobileTip")
                        }
                        var c = j("button.btn-tooltip");
                        c.each(function(q, p) {
                            var o = j(p), n = o.closest(o.closest("label").length ? "label" : "fieldset"), m = n.find("span.tooltip").length ? n.find("span.tooltip") : o.next("span.tooltip"), d = n.find("input, select, textarea"), a = m.find(".closeBtn");
                            o.on(h, function(k) {
                                j(".tooltip").attr("hidden", "hidden"), j(".tooltip").prop("hidden", !0), f.gdt.Utils.Browser.isMobileLayout && o.addClass("mobileTip"), m.prop("hidden") ? b(m, o) : e(m), k.stopPropagation()
                            }), m.on(h, function(k) {
                                k.preventDefault(), k.stopPropagation()
                            }), n.on(h, function(k) {
                                j("#js-strapsBracelets-wrap").length || j(k.target).is("input") && j(k.target).is("label") || (k.preventDefault(), k.stopPropagation())
                            }), d.on("focus", function() {
                                e(m)
                            }), j(document.body).on(h, function() {
                                e(m)
                            }), a.on(h, function() {
                                e(m)
                            })
                        })
                    }
                    f.gdt = f.gdt || {}, f.gdt.Utils = f.gdt.Utils || {};
                    var h = "undefined" == typeof window.ontouchstart ? "click" : "touchend";
                    f.gdt.Tooltips = new i, j("#my-account #profile-section-1").on("click", function() {
                        j(document).ajaxComplete(function() {
                            f.gdt.Tooltips = new i
                        })
                    })
                }(document, window, window.jQuery || window.Zepto), function(e, d) {
                    d.gdt = d.gdt || {}, d.gdt.Validate = d.gdt.Validate || {};
                    var f = function() {
                        function h(l) {
                            var k, o, n, m;
                            for (n = [], k = 0, o = l.length;
                                    o > k;
                                    k++) {
                                i[k] && l.match(i[k].pattern) && (m = i[k].name)
                            }
                            return m
                        }
                        function g(l) {
                            var k, q, p = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9], o = 0, n = !1, m = String(l).replace(/[^\d]/g, "");
                            if (0 === m.length) {
                                return !1
                            }
                            for (q = m.length - 1;
                                    q >= 0;
                                    --q) {
                                k = parseInt(m.charAt(q), 10), o += (n = !n) ? k : p[k]
                            }
                            return o % 10 === 0
                        }
                        function j(k) {
                            var b = g(k), a = h(k);
                            return b ? a : !1
                        }
                        var i = [{name: "amex", pattern: /^3[47]/}, {name: "diners_club_carte_blanche", pattern: /^30[0-5]/}, {name: "diners_club_international", pattern: /^36/}, {name: "jcb", pattern: /^35(2[89]|[3-8][0-9])/}, {name: "laser", pattern: /^(6304|670[69]|6771)/}, {name: "visa_electron", pattern: /^(4026|417500|4508|4844|491(3|7))/}, {name: "visa", pattern: /^4/}, {name: "mastercard", pattern: /^5[1-5]/}, {name: "maestro", pattern: /^(5018|5020|5038|6304|6759|676[1-3])/}, {name: "discover", pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/}];
                        return{type: "creditcard", luhnChk: g, creditCardName: h, getValidity: j}
                    };
                    d.gdt.Validate.ext = d.gdt.Validate.ext || {}, d.gdt.Validate.ext.CreditCards = new f
                }(document, window), function(h, g, l) {
                    g.gdt = g.gdt || {}, g.gdt.snbFilteredResultsData = {};
                    var k = l("#find"), j = (l("#watchOptions"), k.find("form")), i = g.gdt.Utils.PubSub.UI_EVENTS;
                    l("#watch-list-filters").find("[name=watch-filter]").on("click", function() {
                        "online" === l(this).val() && l("#find").find(".clear").addClass("visible")
                    }), j.on("submit", function(al) {
                        if (k.hasClass("open-from-filter")) {
                            al.preventDefault(), k.removeClass("open-from-filter");
                            var ak = l(this), aj = ak.find("div.search input"), ai = aj.val(), ah = l("#watch-list-filters").find("[name=watch-filter]:checked").val(), ag = l("#watch-list-filters").find("[name=watch-filter]:checked").next().text();
                            l.pubsub("publish", i.modal.close), l("#watchListFilterLink").addClass("clicked");
                            var af = "";
                            j.find("input[type=checkbox]").each(function() {
                                l(this).is(":checked") && (af += l(this).attr("name") + "=" + l(this).val() + "&")
                            });
                            for (var ae = af.split("&"), ad = {}, ac = ae.length;
                                    ac--;
                                    ) {
                                var ab = ae[ac].split("="), aa = ab[0].replace("[]", ""), Y = ab[1];
                                ad[aa] = ad[aa] || [], ad[aa].push(Y)
                            }
                            var W = ad.movement, U = ad["function"], S = ad.casediameter, Q = ad.material, O = ad.color, M = [], K = [], e = [], c = [], Z = [];
                            if (void 0 !== W) {
                                for (var X = 0;
                                        X < W.length;
                                        X++) {
                                    M.push(j.find('input[name="movement"][value="' + W[X] + '"]').next().text())
                                }
                            }
                            if (void 0 !== U) {
                                for (var V = 0;
                                        V < U.length;
                                        V++) {
                                    K.push(j.find('input[name="function"][value="' + U[V] + '"]').next().text())
                                }
                            }
                            if (void 0 !== S) {
                                for (var T = 0;
                                        T < S.length;
                                        T++) {
                                    e.push(j.find('input[name="casediameter"][value="' + S[T] + '"]').next().text())
                                }
                            }
                            if (void 0 !== Q) {
                                for (var R = 0;
                                        R < Q.length;
                                        R++) {
                                    c.push(j.find('input[name="material"][value="' + Q[R] + '"]').next().text())
                                }
                            }
                            if (void 0 !== O) {
                                for (var P = 0;
                                        P < O.length;
                                        P++) {
                                    Z.push(j.find('input[name="color"][value="' + O[P] + '"]').next().text())
                                }
                            }
                            if ("" !== ai) {
                                l("#js-product-list").find("li").addClass("hide").removeClass("show"), l("#js-product-list").find("li").each(function() {
                                    var x = l(this), w = x.data("filter"), v = x.data("purchaseable"), u = ai.toUpperCase(), t = w.movement, s = w["function"], r = w.casediameter, q = w.material, p = w.name, o = w.reference, n = w.color;
                                    null !== p && "" !== p && (p = p.toUpperCase(), -1 !== p.indexOf(u) && x.addClass("show")), null !== o && "" !== o && (o = o.toUpperCase(), -1 !== o.indexOf(u) && x.addClass("show")), null !== t && "" !== t && (t = t.toUpperCase(), -1 !== t.indexOf(u) && x.addClass("show")), null !== s && "" !== s && (s = s.toUpperCase(), -1 !== s.indexOf(u) && x.addClass("show")), null !== r && "" !== r && (r = r.toUpperCase(), -1 !== r.indexOf(u) && x.addClass("show")), null !== q && "" !== q && (q = q.toUpperCase(), -1 !== q.indexOf(u) && x.addClass("show")), null !== n && "" !== n && (n = n.toUpperCase(), -1 !== n.indexOf(u) && x.addClass("show")), null !== n && "" !== n && (n = n.toUpperCase(), -1 !== n.indexOf(u) && x.addClass("show")), v === !1 && x.removeClass("show")
                                }), l("#resultsummary span.resultsCount").text(l("#js-product-list").find("li.show").length), l("#resultsummary li").removeClass("sh"), l("#resultsummary").find("li.search").addClass("sh").find("span:last").text(ai)
                            } else {
                                l("#js-product-list").find("li").addClass("hide").removeClass("show");
                                var N = ["movement", "function", "casediameter", "material", "color"];
                                l("#js-product-list").find("li").addClass("show").removeClass("hide");
                                for (var L = 0;
                                        L < N.length;
                                        L++) {
                                    var f = N[L], d = l("#find fieldset." + f).find("input:checkbox:checked").map(function() {
                                        return l(this).val()
                                    }).get();
                                    d && 1 === d.length && "0" === d[0] || l("#js-product-list").find("li.show").each(function() {
                                        for (var n = l(this), m = n.data("filter"), p = !1, o = 0;
                                                o < d.length;
                                                o++) {
                                            m[f] === d[o] && (p = !0)
                                        }
                                        p || (n.addClass("hide"), n.removeClass("show"))
                                    })
                                }
                                l("#resultsummary").find("li").removeClass("sh"), l("#js-product-list").find("li.show").each(function() {
                                    var n = l(this), m = n.data("purchaseable");
                                    "online" === ah && m === !1 && (n.addClass("hide").removeClass("show"), l("#resultsummary").find("li.soldOnlineWatch").addClass("sh").find("span:last").text(ag))
                                }), W && "0" !== W[0] && l("#resultsummary").find("li.movement").addClass("sh").find("span:last").text(M), U && "0" !== U[0] && l("#resultsummary").find("li.function").addClass("sh").find("span:last").text(K), S && "0" !== S[0] && l("#resultsummary").find("li.casediameter").addClass("sh").find("span:last").text(e), Q && "0" !== Q[0] && l("#resultsummary").find("li.material").addClass("sh").find("span:last").text(c), O && "0" !== O[0] && l("#resultsummary").find("li.color").addClass("sh").find("span:last").text(Z), l("#resultsummary span.resultsCount").text(l("#js-product-list").find("li.show").length)
                            }
                        }
                    }), l(".gdt-form").on("click", ".clear", function() {
                        l(this).removeClass("visible"), l(this).parents("form:first").trigger("reset")
                    }), l("#watchListFilterLink").modal(), l("#watchListFilterLink").on("click", function() {
                        l("#watch-list-filters").addClass("product-list-filters-show"), k.addClass("open-from-filter");
                        var d = l("#find").find("div.case").data("default-case"), c = l("#find").find('div.case input[type="checkbox"]');
                        c.each(function() {
                            l(this).removeAttr("checked").attr("disabled", "disabled"), l(this).val() === d && l(this).prop("checked", "checked")
                        })
                    }), l(".modal-close.mobileOnly").on("click", function() {
                        l("#watch-list-filters").removeClass("product-list-filters-show");
                        var b = l("#find").find('div.case input[type="checkbox"]');
                        k.removeClass("open-from-filter"), b.each(function() {
                            l(this).removeAttr("checked").removeAttr("disabled"), "0" === l(this).val() && l(this).prop("checked", "checked")
                        })
                    })
                }(document, window, window.jQuery || window.Zepto), function(f, e, h) {
                    e.gdt = e.gdt || {};
                    var g = function() {
                        function z() {
                            u.akcarousel({delay: 5000, horizontal: !0, scrollNode: !0, autoSwitch: !1, scrollSpeed: 500, easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)"});
                            var d = c.find("li.slide:first .shareIconsMobile").data("pdf-url");
                            b.prop("href", d)
                        }
                        function y() {
                            r.on(v, "a", function() {
                                u.akcarousel("move", h(this).index());
                                var j = u.find("ul li.active").index(), i = u.find("ul li.active").height();
                                h("#profile-section-2 .accordion-tabs-inner").removeAttr("style"), u.find("#js-product-list").height(i);
                                var m = parseInt(s);
                                0 === j ? (p.hide(), q.show()) : j === m - 1 ? (q.hide(), p.show()) : (p.show(), q.show());
                                var l = h(this).index(), k = c.find("li.slide:eq(" + l + ") .shareIconsMobile").data("pdf-url");
                                b.prop("href", k)
                            }), s > 1 && q.show(), q.on(v, function(j) {
                                j.preventDefault();
                                var i = u.find("ul li.active").index(), n = u.find("ul li.active").next().height();
                                u.akcarousel("move", h(this).index() + i);
                                var m = h(this).index() + i, l = c.find("li.slide:eq(" + m + ") .shareIconsMobile").data("pdf-url");
                                b.prop("href", l), h("#profile-section-2 .accordion-tabs-inner").removeAttr("style"), u.find("#js-product-list").height(n);
                                var k = parseInt(s);
                                i === k - 2 && q.hide(), p.show()
                            }), p.on(v, function(j) {
                                j.preventDefault();
                                var i = u.find("ul li.active").index() - 1, m = u.find("ul li.active").prev().height();
                                u.akcarousel("move", h(this).index() + i);
                                var l = h(this).index() + i, k = c.find("li.slide:eq(" + l + ") .shareIconsMobile").data("pdf-url");
                                b.prop("href", k), h("#profile-section-2 .accordion-tabs-inner").removeAttr("style"), u.find("#js-product-list").height(m), q.show(), 0 === i && p.hide()
                            })
                        }
                        function x() {
                            t.each(function() {
                                var i = h(this).find("ul li"), d = h(this).find("h2:first").text();
                                i.each(function() {
                                    h(this).find("[name=wishlist-name]").val(d)
                                })
                            })
                        }
                        function w() {
                            t.length && !e.gdt.Utils.Browser.isMobileLayout && (z(), y(), x())
                        }
                        var v = "undefined" == typeof window.ontouchstart ? "click" : "touchend", u = h("#js-wishlist-caro"), t = u.find(".slide"), s = t.length, r = h(".pager"), q = u.find(".next"), p = u.find(".prev"), c = u.find("#js-product-list"), b = h(".printWishlistSlide");
                        w()
                    };
                    e.gdt.WishlistSlider = new g
                }(document, window, window.jQuery || window.Zepto), function(ah, ag, af) {
                    function ae() {
                        af(".js-show-cataglogue-msg-btn").modal(), af.trim(I.html()).length && af(".js-show-cataglogue-msg-btn").trigger("click"), H.on("click", function() {
                            I.find(".modal-close").trigger("click")
                        })
                    }
                    ag.gdt = ag.gdt || {};
                    var ad = "undefined" == typeof ag.ontouchstart ? "click" : "touchend", ac = af("body"), ab = af("form label span.tooltip").next("input"), aa = af("html");
                    if (ab.on(ad, function() {
                        af(this).select()
                    }), af("#my-account section.lazy").lazyloadContent({callback: function(b) {
                            af(".component-cataloguetab", b).tabAccordion(), af(".component-myactsubscription", b).subscriptions()
                        }}), af("#my-account section.lazy").on("click", function() {
                        af(document).ajaxComplete(function() {
                            af.pubsub("publish", ag.gdt.Utils.PubSub.UI_EVENTS.accordionContentUpdated), af(".js-contact-concierge-btn").modal(), af(".editWishlistMobile").modal()
                        })
                    }), ag.gdt.Utils.Browser.isMobileLayout) {
                        if (af("#emptyWishlist").length || af("#empty-comparelist").length && 0 === af("#my-account").length) {
                            var Z = af(".equalTitle:first .rightLinks").find("a").removeClass("button-primary").clone(!0), Y = af(".equalTitle:first .leftIcons").clone(!0);
                            af("#empty-comparelist").length && af(".shoppingbag-ctas:first").prepend(Y, Z), af("#emptyWishlist").length && af(".shoppingbag-ctas:first").prepend(Z)
                        }
                        if (af("#js-wishlist-caro").length && 0 === af("#my-account").length) {
                            for (var X = af(".equalTitle:first .leftIcons").clone(!0), W = 0;
                                    W < af("#js-product-list li.slide").length;
                                    W++) {
                                af("#js-product-list li.slide").find(".shareIconsMobile").html(X)
                            }
                            for (var V = 0;
                                    V < af("#js-product-list li.slide").length;
                                    V++) {
                                var U = af("#js-product-list li.slide:eq(" + V + ")").find(".shareIconsMobile").data("pdf-url");
                                af("#js-product-list li.slide:eq(" + V + ")").find(".shareIconsMobile .printWishlistSlide").prop("href", U)
                            }
                        }
                    }
                    if (af(".product-detail").length && ag.gdt.Utils.Browser.isMobileLayout && af(".product-detail-top").length) {
                        var T = af(".product-detail-top").offset().top;
                        af(document).scrollTop(T)
                    }
                    if (af(".findYourPaneraiSearch").length) {
                        var S = ag.location.search, Q = af("#top").offset().top;
                        S.indexOf("setTopSearch") > -1 && af(document).scrollTop(Q)
                    }
                    if (af("#shoppingbag").length && ag.gdt.Utils.Browser.isMobileLayout) {
                        var O = af("#shoppingbag").find(".mobileScroll .row").length;
                        O > 1 && af(".mobileScroll").addClass("height").mCustomScrollbar()
                    }
                    af("input, textarea").placeholder(), af("#my-account > .accordion-tabs").tabAccordion({closeOthers: !0}), af("#js-wishlist-caro").length && (af(".product-list-item .product-list-item-info").matchHeight(), aa.addClass("wishListPage")), af("#saveLink, #saveLinkMobile").modal(), af(".eboutiqueContainer").length && af("main").addClass("blackBoutique"), (!ag.gdt.Utils.Browser.isMobileLayout && af("#shoppingbag").length || af("#checkout").length) && af(".component-ecommercehighlights").each(function() {
                        var b = 0;
                        af("section", this).each(function() {
                            af(this).height() > b && (b = af(this).height())
                        }), af("section", this).height(b)
                    }), af(".nav-secondary").each(function() {
                        var b = 0;
                        af("a", this).each(function() {
                            af(this).height() > b && (b = af(this).height())
                        }), af("a", this).height(b)
                    }), ah.getElementById("js-product-list") && ag.gdt.ProductList.init();
                    var M = af(".search-results-watch, .search-results-eboutique-watch");
                    if (M.length && M.each(function() {
                        af(this).find("a").each(function() {
                            var b = af(this).attr("href");
                            af(this).attr("href", b + ag.location.search)
                        })
                    }), af("#js-product-details").tabAccordion({trigger: "h4"}), af("#js-basket-error").modal(), af("#confirmWishlistAdded").modal(), ag.gdt.Utils.Browser.isMobileLayout && af(".order-confirmation").length && af(".form-errors").length) {
                        var K = af(".form-errors").offset().top;
                        setTimeout(function() {
                            af("html, body").animate({scrollTop: K}, 300)
                        }, 200)
                    }
                    if (af("#js-movement-details").tabAccordion({trigger: "h4"}), af(".component-shippinginfo").shippingInfo(), af(".personalise a").modal(), 1 === af("#exceptionMsg").length) {
                        var J = af("#exceptionMsgA");
                        J.modal(), J.trigger("click")
                    }
                    af("#card-number").creditcard("#card-types"), ah.getElementById("js-news-list") && ag.gdt.NewsList.init(), af(".js-vertical-gallery-thumbs").length && (af(".js-vertical-gallery-thumbs").modal(), af(".js-vertical-gallery-content").verticalGallery()), af(".component-cataloguetab").tabAccordion(), af("#newShippingOptions").tabAccordion(), af(".component-cataloguetab .accordion-tabs-content .download a.download-file").on(ad, function() {
                        var b = af(this).data("cookie-name");
                        af.cookie(b, "1", {path: "/", domain: "panerai.com", expires: 999999})
                    }), af(".gdt-form #catalogs").submit(function() {
                        var d = af("#catalogs_catalogType").val();
                        if (void 0 !== d && "digital" === d) {
                            var c = af("#catalogs .catalogRequested select option:selected").data("cookie-name");
                            void 0 === c && (c = "panerai_catalogo"), af.cookie(c, "1", {path: "/", domain: "panerai.com", expires: 999999})
                        }
                    });
                    var I = af("#js-catalogue-msg-wrapper"), H = af("#js-catalogue-msg-wrapper .close-btn");
                    if (af("#js-catalogue-msg-container").length > 0 && ae(), ag.gdt.Utils.Browser.isMobileLayout && af(".photographers").length > 0 && (af(".photographers").addClass("open"), af(".photographers .editable-title h4").on("click", function() {
                        af(".photographers .two-column").slideToggle(1000), af(".photographers").hasClass("open") ? af(".photographers").removeClass("open") : af(".photographers").addClass("open")
                    })), ag.gdt.Utils.Browser.isIE && "#top" === document.location.hash) {
                        var G = af("#top").offset().top;
                        window.scrollTo(0, G)
                    }
                    ag.gdt.Utils.Browser.isMobileLayout && (af("#gdt main div.history-wrap").next("p.mobile-links").css("display", "none"), af("#gdt main div.history-wrap").prev("h1").css("display", "none"), af("#gdt main div.history-wrap").css("margin-top", "20px"));
                    var F = new Date, E = F.getMonth() + 1, R = F.getDate(), P = F.getFullYear();
                    9 >= E && (E = "0" + E), 9 >= R && (R = "0" + R);
                    var N = R + "." + E + "." + P;
                    af(".c-date span").html(N), ac.on(ad, ".cta-print", function(b) {
                        b.preventDefault(), ag.print && (ag.print(), ac.trigger("print:product"))
                    }), ac.on(ad, ".cta-strapsize", function(b) {
                        b.preventDefault(), af("#strapDetailPage .findStrapLinkSection a").click(), location.href = af("#strapDetailPage .findStrapLinkSection a").attr("href")
                    }), af(".ie9 #js-product-details .mobile-height-calc").columnize({width: 400});
                    var L = window.location.href.slice(window.location.href.indexOf("?") + 1);
                    window.location.href.indexOf("?") > -1 ? (af(".product-detail .product-detail-top a.watchBack").attr("href", function(d, c) {
                        return c + "?" + L
                    }), af(".product-detail .product-detail-top a.strapBack").attr("href", function(d, c) {
                        return c
                    }), af(".product-detail .product-detail-top a.buckleBack").attr("href", function(d, c) {
                        return c
                    })) : (af(".product-detail .product-detail-top a.watchBack").attr("href", function(d, c) {
                        return c
                    }), af(".product-detail .product-detail-top a.strapBack").hide(), af(".product-detail .product-detail-top a.buckleBack").hide())
                }(document, window, window.jQuery || window.Zepto);