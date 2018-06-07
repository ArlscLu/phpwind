window.Modernizr=function(an,am,al){function H(b){ae.cssText=b
}function Y(d,c){return H(ab.join(d+";")+(c||""))
}function W(d,c){return typeof d===c
}function U(d,c){return !!~(""+d).indexOf(c)
}function S(f,c){for(var h in f){var g=f[h];
if(!U(g,"-")&&ae[g]!==al){return c=="pfx"?g:!0
}}return !1
}function Q(g,c,j){for(var i in g){var h=c[g[i]];
if(h!==al){return j===!1?g[i]:W(h,"function")?h.bind(j||c):h
}}return !1
}function O(g,f,j){var i=g.charAt(0).toUpperCase()+g.slice(1),h=(g+" "+Z.join(i+" ")+i).split(" ");
return W(f,"string")||W(f,"undefined")?S(h,f):(h=(g+" "+X.join(i+" ")+i).split(" "),Q(h,f,j))
}var ak="2.8.3",aj={},ai=!0,ah=am.documentElement,ag="modernizr",af=am.createElement(ag),ae=af.style,ad,ac={}.toString,ab=" -webkit- -moz- -o- -ms- ".split(" "),aa="Webkit Moz O ms",Z=aa.split(" "),X=aa.toLowerCase().split(" "),V={},T={},R={},P=[],N=P.slice,M,K=function(v,u,t,s){var r,q,p,o,h=am.createElement("div"),g=am.body,b=g||am.createElement("body");
if(parseInt(t,10)){while(t--){p=am.createElement("div"),p.id=s?s[t]:ag+(t+1),h.appendChild(p)
}}return r=["&#173;",'<style id="s',ag,'">',v,"</style>"].join(""),h.id=ag,(g?h:b).innerHTML+=r,b.appendChild(h),g||(b.style.background="",b.style.overflow="hidden",o=ah.style.overflow,ah.style.overflow="hidden",ah.appendChild(b)),q=u(h,v),g?h.parentNode.removeChild(h):(b.parentNode.removeChild(b),ah.style.overflow=o),!!q
},J={}.hasOwnProperty,I;
!W(J,"undefined")&&!W(J.call,"undefined")?I=function(d,c){return J.call(d,c)
}:I=function(d,c){return c in d&&W(d.constructor.prototype[c],"undefined")
},Function.prototype.bind||(Function.prototype.bind=function(a){var h=this;
if(typeof h!="function"){throw new TypeError
}var g=N.call(arguments,1),f=function(){if(this instanceof f){var b=function(){};
b.prototype=h.prototype;
var d=new b,c=h.apply(d,g.concat(N.call(arguments)));
return Object(c)===c?c:d
}return h.apply(a,g.concat(N.call(arguments)))
};
return f
}),V.touch=function(){var a;
return"ontouchstart" in an||an.DocumentTouch&&am instanceof DocumentTouch?a=!0:K(["@media (",ab.join("touch-enabled),("),ag,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(b){a=b.offsetTop===9
}),a
},V.csstransforms3d=function(){var b=!!O("perspective");
return b&&"webkitPerspective" in ah.style&&K("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(a,d){b=a.offsetLeft===9&&a.offsetHeight===3
}),b
};
for(var L in V){I(V,L)&&(M=L.toLowerCase(),aj[M]=V[L](),P.push((aj[M]?"":"no-")+M))
}return aj.addTest=function(e,c){if(typeof e=="object"){for(var f in e){I(e,f)&&aj.addTest(f,e[f])
}}else{e=e.toLowerCase();
if(aj[e]!==al){return aj
}c=typeof c=="function"?c():c,typeof ai!="undefined"&&ai&&(ah.className+=" "+(c?"":"no-")+e),aj[e]=c
}return aj
},H(""),af=ad=null,function(at,ar){function A(f,e){var h=f.createElement("p"),g=f.getElementsByTagName("head")[0]||f.documentElement;
return h.innerHTML="x<style>"+e+"</style>",g.insertBefore(h.lastChild,g.firstChild)
}function z(){var b=t.elements;
return typeof b=="string"?b.split(" "):b
}function y(d){var c=C[d[E]];
return c||(c={},D++,d[E]=D,C[D]=c),c
}function x(b,h,f){h||(h=ar);
if(B){return h.createElement(b)
}f||(f=y(h));
var e;
return f.cache[b]?e=f.cache[b].cloneNode():G.test(b)?e=(f.cache[b]=f.createElem(b)).cloneNode():e=f.createElem(b),e.canHaveChildren&&!ao.test(b)&&!e.tagUrn?f.frag.appendChild(e):e
}function w(b,l){b||(b=ar);
if(B){return b.createDocumentFragment()
}l=l||y(b);
var k=l.frag.cloneNode(),j=0,i=z(),h=i.length;
for(;
j<h;
j++){k.createElement(i[j])
}return k
}function v(d,c){c.cache||(c.cache={},c.createElem=d.createElement,c.createFrag=d.createDocumentFragment,c.frag=c.createFrag()),d.createElement=function(a){return t.shivMethods?x(a,d,c):c.createElem(a)
},d.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+z().join().replace(/[\w\-]+/g,function(b){return c.createElem(b),c.frag.createElement(b),'c("'+b+'")'
})+");return n}")(t,c.frag)
}function u(b){b||(b=ar);
var d=y(b);
return t.shivCSS&&!F&&!d.hasCSS&&(d.hasCSS=!!A(b,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),B||v(b,d),b
}var aq="3.7.0",ap=at.html5||{},ao=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,G=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,F,E="_html5shiv",D=0,C={},B;
(function(){try{var b=ar.createElement("a");
b.innerHTML="<xyz></xyz>",F="hidden" in b,B=b.childNodes.length==1||function(){ar.createElement("a");
var c=ar.createDocumentFragment();
return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"
}()
}catch(d){F=!0,B=!0
}})();
var t={elements:ap.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:aq,shivCSS:ap.shivCSS!==!1,supportsUnknownElements:B,shivMethods:ap.shivMethods!==!1,type:"default",shivDocument:u,createElement:x,createDocumentFragment:w};
at.html5=t,u(ar)
}(this,am),aj._version=ak,aj._prefixes=ab,aj._domPrefixes=X,aj._cssomPrefixes=Z,aj.testProp=function(b){return S([b])
},aj.testAllProps=O,aj.testStyles=K,ah.className=ah.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(ai?" js "+P.join(" "):""),aj
}(this,this.document);