# Grid Bookmarklet

Ever need to overlay a grid onto a website to verify grid alignment? This bookmarklet is for you! It's easy to use and configurable!

## Usage

To use, simply create a new bookmark in your browser of choice but set the URL to the code below. After creating this bookmark, simply visit the site you wish to overlay a grid onto and click the bookmark. Clicking once will overlay the bookmark, but clicking again will hide it.

## Bookmarklet Code

```javascript
javascript:!function(){var t="grid-bookmarklet",n=function(n,o){var c=window.localStorage.getItem("".concat(t,"-").concat(n));return c||(c||window.localStorage.setItem("".concat(t,"-").concat(n),o),o)},o={color:n("color","#e74c3c"),opacity:n("opacity",.1),breakpoints:{mobile:{breakpoint:0,columns:n("breakpoint-mobile-columns",4),gap:n("breakpoint-mobile-gap",24),gutter:n("breakpoint-mobile-gutter",32)},tablet:{breakpoint:n("breakpoint-tablet-px",700),columns:n("breakpoint-tablet-columns",8),gap:n("breakpoint-tablet-gap",24),gutter:n("breakpoint-tablet-gutter",32)},desktop:{breakpoint:n("breakpoint-desktop-px",1200),columns:n("breakpoint-desktop-columns",12),gap:n("breakpoint-desktop-gap",48),gutter:n("breakpoint-desktop-gutter",32)},desktopLarge:{breakpoint:n("breakpoint-desktopLarge-px",1600),columns:n("breakpoint-desktopLarge-columns",12),gap:n("breakpoint-desktopLarge-gap",48),gutter:n("breakpoint-desktopLarge-gutter",32)}}},c=document.querySelector(".".concat(t,"-debug")),e=document.getElementById("".concat(t,"-styles"));if(c)return document.body.removeChild(c),void(e&&document.body.removeChild(e));var a=document.createElement("div");a.classList.add("".concat(t,"-debug"));for(var r=0;r<12;r++){var p=document.createElement("div");p.classList.add("".concat(t,"-col")),a.appendChild(p)}document.body.appendChild(a);var i=document.createElement("style");i.id="".concat(t,"-styles"),i.innerHTML=" .".concat(t,"-debug { --").concat(t,"-color: ").concat(o.color,"; --").concat(t,"-opacity: ").concat(o.opacity,"; --").concat(t,"-columns: ").concat(o.breakpoints.mobile.columns,"; --").concat(t,"-gutter: ").concat(o.breakpoints.mobile.gutter,"px; --").concat(t,"-gap: ").concat(o.breakpoints.mobile.gap,"px; position: fixed; top: 0; left: var(--").concat(t,"-gutter); width: calc(100vw - var(--").concat(t,"-gutter) * 2); height: 100vh; z-index: 9999999999; display: grid; grid-template-columns: repeat(var(--").concat(t,"-columns), [col-start] 1fr); gap: var(--").concat(t,"-gap); } .").concat(t,"-col { background: var(--").concat(t,"-color); opacity: var(--").concat(t,"-opacity); display: none; } "),Object.keys(o.breakpoints).forEach((function(n){var c=o.breakpoints[n];i.innerHTML+=" @media screen and (min-width: ".concat(c.breakpoint,"px) { .").concat(t,"-debug { --").concat(t,"-columns: ").concat(c.columns,"; --").concat(t,"-gutter: ").concat(c.gutter,"px; --").concat(t,"-gap: ").concat(c.gap,"px; } .").concat(t,"-col:nth-child(-n+").concat(c.columns,") { display: block; } } ")})),document.body.appendChild(i)}();
```

## Configuration

Not all websites follow the same grid overlays. This bookmarklet has default values built-in, but once you run the bookmarklet for the first time on a site, it will store all values into the local storage.

Open up your browsers dev tools and navigate to the local storage. There, you will see several stored keys labeled as "grid-bookmarklet". Change these values to best match the grid for your particular site and click the bookmarklet once again.

Since all configuration is built-in to local storage, you can have different grid configuration for different websites.

## Breakpoints

The bookmarklet supports 4 different breakpoints: mobile, tablet, desktop, and large desktop. *`(This will be updated in the future to support any number of breakpoints)`*

Each breakpoint is independently configurable via local storage.