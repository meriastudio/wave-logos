var Strut = {
	random: function(e, t) {
		return Math.random() * (t - e) + e
	},
	arrayRandom: function(e) {
		return e[Math.floor(Math.random() * e.length)]
	},
	interpolate: function(e, t, n) {
		return e * (1 - n) + t * n
	},
	rangePosition: function(e, t, n) {
		return (n - e) / (t - e)
	},
	clamp: function(e, t, n) {
		return Math.max(Math.min(e, n), t)
	},
	queryArray: function(e, t) {
		return t || (t = document.body), Array.prototype.slice.call(t.querySelectorAll(e))
	},
	ready: function(e) {
		document.readyState == "complete" ? e() : document.addEventListener("DOMContentLoaded", e)
	}
};

Strut.isRetina = window.devicePixelRatio > 1.3, Strut.mobileViewportWidth = 670, Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth, window.addEventListener("resize", function() {
	Strut.isMobileViewport = window.innerWidth < Strut.mobileViewportWidth
}), Strut.touch = {
	isSupported: "ontouchstart" in window || navigator.maxTouchPoints,
	isDragging: !1
}, document.addEventListener("DOMContentLoaded", function() {
	document.body.addEventListener("touchmove", function() {
		Strut.touch.isDragging = !0
	}), document.body.addEventListener("touchstart", function() {
		Strut.touch.isDragging = !1
	})
}), Strut.load = {
	images: function(e, t) {
		typeof e == "string" && (e = [e]);
		var n = -e.length;
		e.forEach(function(e) {
			var r = new Image;
			r.src = e, r.onload = function() {
				n++, n === 0 && t && t()
			}
		})
	},
	css: function(e, t) {
		var n = document.createElement("link"),
			r = window.readConfig("strut_files") || {},
			i = r[e];
		if (!i) throw new Error('CSS file "' + e + '" not found in strut_files config');
		n.href = i, n.rel = "stylesheet", document.head.appendChild(n), t && (n.onload = t)
	},
	js: function(e, t) {
		var n = document.createElement("script"),
			r = window.readConfig("strut_files") || {},
			i = r[e];
		if (!i) throw new Error('Javascript file "' + e + '" not found in strut_files config');
		n.src = i, document.head.appendChild(n), t && (n.onload = t)
	}
}, Strut.supports = {
	es6: function() {
		try {
			return new Function("(a = 0) => a"), !0
		} catch (e) {
			return !1
		}
	}(),
	pointerEvents: function() {
		var e = document.createElement("a").style;
		return e.cssText = "pointer-events:auto", e.pointerEvents === "auto"
	}(),
	positionSticky: function() {
		var e = "position:",
			t = "sticky",
			n = document.createElement("a"),
			r = n.style,
			i = " -webkit- -moz- -o- -ms- ".split(" ");
		return r.cssText = e + i.join(t + ";" + e).slice(0, -e.length), r.position.indexOf(t) !== -1
	}(),
	masks: function() {
		return !/MSIE|Trident|Edge/i.test(navigator.userAgent)
	}()
}, Strut.supports.pointerEvents || Strut.load.css("v3/shared/navigation_ie10.css");

function LogoBubbles(e) {
    function n() {
            c.vertShrink = s(1e3, 800, window.innerHeight),
            c.vertShrink = l(c.vertShrink, 0, 1)
    }
    function t() {
            var e = c.container.getBoundingClientRect();
            (e.bottom < 0 || e.top > window.innerHeight) && 1 == c.playing ? c.playing = !1 : e.bottom > 0 && e.top < window.innerHeight && 0 == c.playing && (c.playing = !0,
            requestAnimationFrame(function(e) {
                    c.tick(e)
            }))
    }
    function o(e) {
            var n = e.x + e.noiseX + c.scrollX
                , t = e.y + e.noiseY;
            t = a(t, c.containerHeight / 2, c.vertShrink * c.maxShrink),
            n < -200 && (e.x += c.containerWidth);
            var o = r(e.introProgress) / 20 + .95;
            o *= e.scale,
            e.el.style.opacity = r(e.introProgress),
            e.el.style.transform = "translate(" + n + "px, " + t + "px) scale(" + o + ")"
    }
    function i(e) {
            var n = 0
                , t = 0
                , o = null;
            for (n = e.length - 1; n > 0; n -= 1)
                    t = Math.floor(Math.random() * (n + 1)),
                    o = e[n],
                    e[n] = e[t],
                    e[t] = o
    }
    function r(e) {
            return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
    }
    function a(e, n, t) {
            return e * (1 - t) + n * t
    }
    function s(e, n, t) {
            return (t - e) / (n - e)
    }
    function l(e, n, t) {
            return Math.max(Math.min(e, t), n)
    }
    var c = this;
    for (u in e)
            c[u] = e[u];
    c.container = document.querySelector(c.containerSelector),
    c.noiseT = 0,
    c.scrollX = 0,
    c.logos.forEach(function(e, n) {
            c.logos[n] = {
                    index: n,
                    title: e
            }
    }),
    i(c.logos),
    c.vertShrink = 0,
    n(),
    window.addEventListener("resize", n),
    c.playing = !1,
    t(),
    window.addEventListener("scroll", t),
    c.logosLoaded = !1;
    
    var d = "https://cdn.sportsrecruits.com/assets/Demo-landing-pages/header-logos" + (Strut.isRetina ? "@2x" : "") + (Modernizr.webp ? ".webp" : ".png");

    Strut.load.images(d, function() {
            c.logosLoaded = !0
    });
    for (var u = 0; u < c.bubbles.length; u++) {
            var f = c.bubbles[u]
                , y = u % c.logos.length;
            f.scale = f.s || 1,
            f.seedX = 1e4 * Math.random(),
            f.seedY = 1e4 * Math.random(),
            f.noiseX = f.noiseY = 0,
            f.introDelay = Math.random() * c.introDelay,
            f.introProgress = 0,
            f.el = document.createElement("div"),
            f.el.className = c.classPrefix + c.logos[y].index,
            f.tagEl = document.createElement("span"),
            f.tagEl.innerHTML = c.logos[y].title,
            f.el.appendChild(f.tagEl),
            o(f),
            c.container.appendChild(f.el)
    }
    c.firstTick = null,
    c.lastTick = 0,
    c.tick = function(e) {
            c.firstTick || (c.firstTick = e),
            e -= c.firstTick;
            var n = e - c.lastTick;
            c.lastTick = e,
            c.noiseT += n * c.noiseSpeed,
            c.scrollX -= n * c.scrollSpeed;
            for (var t = 0; t < c.bubbles.length; t++) {
                    var i = c.bubbles[t];
                    i.noiseX = noise(i.seedX + c.noiseT) * c.noiseScale - c.noiseScale / 2,
                    i.noiseY = noise(i.seedY + c.noiseT) * c.noiseScale - c.noiseScale / 2,
                    c.logosLoaded && i.introProgress < 1 && e > i.introDelay && (i.introProgress = Math.min(1, i.introProgress + n / c.introDuration)),
                    o(i)
            }
            c.playing && requestAnimationFrame(c.tick)
    }
}
var bubbles = [
{
    s: .6,
    x: 1134,
    y: 45
}, {
        s: .6,
        x: 1620,
        y: 271
}, {
        s: .6,
        x: 1761,
        y: 372
}, {
        s: .6,
        x: 2499,
        y: 79
}, {
        s: .6,
        x: 2704,
        y: 334
}, {
        s: .6,
        x: 2271,
        y: 356
}, {
        s: .6,
        x: 795,
        y: 226
}, {
        s: .6,
        x: 276,
        y: 256
}, {
        s: .6,
        x: 1210,
        y: 365
}, {
        s: .6,
        x: 444,
        y: 193
}, {
        s: .6,
        x: 2545,
        y: 387
}, {
        s: .8,
        x: 1303,
        y: 193
}, {
        s: .8,
        x: 907,
        y: 88
}, {
        s: .8,
        x: 633,
        y: 320
}, {
        s: .8,
        x: 323,
        y: 60
}, {
        s: .8,
        x: 129,
        y: 357
}, {
        s: .8,
        x: 1440,
        y: 342
}, {
        s: .8,
        x: 1929,
        y: 293
}, {
        s: .8,
        x: 2135,
        y: 198
}, {
        s: .8,
        x: 2276,
        y: 82
}, {
        s: .8,
        x: 2654,
        y: 182
}, {
        s: .8,
        x: 2783,
        y: 60
}, {
        x: 1519,
        y: 118
}, {
        x: 1071,
        y: 233
}, {
        x: 1773,
        y: 148
}, {
        x: 2098,
        y: 385
}, {
        x: 2423,
        y: 244
}, {
        x: 901,
        y: 385
}, {
        x: 624,
        y: 111
}, {
        x: 75,
        y: 103
}, {
        x: 413,
        y: 367
}, {
        x: 2895,
        y: 271
}, {
        x: 1990,
        y: 75
}, {
        s: .95,
        x: 3033,
        y: 98,

}, {
        s: .55,
        x: 3069,
        y: 341,

}, {
        s: .65,
        x: 3180,
        y: 218,

}, {
        s: .85,
        x: 3332,
        y: 108,

}, {
        s: .75,
        x: 3312,
        y: 359.8,

}, {
        s: .45,
        x: 3463,
        y: 234.8,

}, {
    s: .85,
    x: 3606,
    y: 133.8,

}, {
    s: .65,
    x: 3564,
    y: 386.8,

}, {
    s: .95,
    x: 3764,
    y: 310,

}, {
    s: .65,
    x: 3818,
    y: 92.8,

}, {
    s: .45,
    x: 3921,
    y: 214.8,

}, {
    s: .65,
    x: 4018,
    y: 344.8,

}, {
    s: .95,
    x: 4081,
    y: 117.8,

}, {
    s: .95,
    x: 4196,
    y: 367.8,

}, {
    s: .65,
    x: 4264,
    y: 171.8,

}, {
    s: .65,
    x: 4351,
    y: 338.8,

}, {
    s: .95,
    x: 4453,
    y: 138.8,

}, {
    s: .85,
    x: 4493,
    y: 382.8,

}

], logos = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z', 'ka', 'sa', 'ea', 'pa',
  'la', 'va', 'na', 'wa', 'aa', 'ta', 'da', 'ba', 'ga', 'ia',
  'ja', 'oa', 'ma', 'ra', 'ha', 'ua', 'ca', 'fa', 'qa','aa', 'ab'
]


// , logos = ["University of Tennessee, Knoxville", "Georgetown University", "University of Miami", "University of Southern California", "Florida State University", "University of Virginia", "University of California, Berkeley", "Brown University", "University of Georgia", "University of Oregon", "Stanford University", "Cornell University", "Ohio State University", "University of North Carolina, Chapel Hill", "UMass, Amherst", "Trinity College", "University of Notre Dame", "Duke University", "Syracuse University", "Xavier University", "Wesleyan University", "Bucknell University", "Vassar College", "University of Texas, Austin", "Ithaca College", "University of Michigan", "Boston University", "Yale University", "Western New England", "UCLA", "San Diego State", "Marist College", "Harvard University", "Connecticut College", "University of Florida", "University of Louisville", "Villanova University", "University of Maryland, College Park", "Johns Hopkins University", "Johns Hopkins Universitya", "Johns Hopkins Universityb", "Johns Hopkins Universityac", "Johns Hopkins Universityad", "Johns Hopkins Universityae", "Johns Hopkins Universityaf", "Johns Hopkins Universityag", "Johns Hopkins Universityah", "Johns Hopkins Universityai", "Johns Hopkins Universityaj"];

console.log(logos.length)
Strut.ready(function() {
    window.logoBubbles = new LogoBubbles({
				bubbles: bubbles,
				logos: logos,
				classPrefix: "Icon Icon-img",
				containerSelector: ".IconsContainer",
				containerWidth: 4e3+600,
				containerHeight: 460,
				maxShrink: .1,
				noiseSpeed: 6e-5,
				noiseScale: 80,
				scrollSpeed: .0275,
				introDelay: 1500,
				introDuration: 1500
    })
});
var PERLIN_ZWRAPB = 8, PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB, PERLIN_SIZE = 4095, perlin_octaves = 4, perlin_amp_falloff = .5, scaled_cosine = function(e) {
    return .5 * (1 - Math.cos(e * Math.PI))
}, perlin, noise = function(e) {
    if (null == perlin) {
            perlin = new Array(PERLIN_SIZE + 1);
            for (var n = 0; n < PERLIN_SIZE + 1; n++)
                    perlin[n] = Math.random()
    }
    e < 0 && (e = -e);
    for (var t, o, i = Math.floor(e), r = e - i, a = 0, s = .5, l = 0; l < perlin_octaves; l++)
            t = scaled_cosine(r),
            o = perlin[i & PERLIN_SIZE],
            o += t * (perlin[i + 1 & PERLIN_SIZE] - o),
            a += o * s,
            s *= perlin_amp_falloff,
            i <<= 1,
            (r *= 2) >= 1 && (i++,
            r--);
    return a
};