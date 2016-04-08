/*dfikx.js*/

/*
  * Normalized hide address bar for iOS & Android
  * (c) Scott Jehl, scottjehl.com
  * MIT License
*/
(function( win ){
	var doc = win.document;
	
	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){
		
		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
		
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );
		
		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		} );
	}
})( this );

/**/

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w ){
	
	// Enable strict mode
	"use strict";

	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "div" );
		
		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

				var sources = ps[ i ].getElementsByTagName( "div" ),
					matches = [];
			
				// See if which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var media = sources[ j ].getAttribute( "data-media" );
					// if there's no media specified, OR w.matchMedia is supported 
					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						matches.push( sources[ j ] );
					}
				}

              
// Find any existing img element in the picture element
			var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

			if( matches.length ){			
				if( !picImg ){
					picImg = w.document.createElement( "img" );
					picImg.alt = ps[ i ].getAttribute( "data-alt" );
					ps[ i ].appendChild( picImg );
				}
				
				picImg.src =  matches.pop().getAttribute( "data-src" );
			}
			else if( picImg ){
				ps[ i ].removeChild( picImg );
			}
		}
		}
	};
	
// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill();
			// Run once only
			w.removeEventListener( "load", w.picturefill, false );
		}, false );
		w.addEventListener( "load", w.picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
	}
	
}( this ));

/*
	Image Cross Fade Redux
	Version 1.0
	Last revision: 02.15.2006
	steve@slayeroffice.com

	Rewrite of old code found here: http://slayeroffice.com/code/imageCrossFade/index.html
*/

window.addEventListener?window.addEventListener('load',so_init,false):window.attachEvent('onload',so_init);

var d=document, imgs = new Array(), zInterval = null, current=0, pause=false;

function so_init()
{
	if(!d.getElementById || !d.createElement)return;

	css = d.createElement('link');
	css.setAttribute('href','/assets/css/slideshow2.css');
	css.setAttribute('rel','stylesheet');
	css.setAttribute('type','text/css');
	d.getElementsByTagName('head')[0].appendChild(css);

	imgs = d.getElementById('rotator').getElementsByTagName('img');
	for(i=1;i<imgs.length;i++) imgs[i].xOpacity = 0;
	imgs[0].style.display = 'block';
	imgs[0].xOpacity = .99;

	setTimeout(so_xfade,5000);
}

function so_xfade()
{
	cOpacity = imgs[current].xOpacity;
	nIndex = imgs[current+1]?current+1:0;
	nOpacity = imgs[nIndex].xOpacity;

	cOpacity-=.05;
	nOpacity+=.05;

	imgs[nIndex].style.display = 'block';
	imgs[current].xOpacity = cOpacity;
	imgs[nIndex].xOpacity = nOpacity;

	setOpacity(imgs[current]);
	setOpacity(imgs[nIndex]);

	if(cOpacity<=0)
	{
		imgs[current].style.display = 'none';
		current = nIndex;
		setTimeout(so_xfade,11000);
	}
	else
	{
		setTimeout(so_xfade,50);
	}

	function setOpacity(obj)
	{
		if(obj.xOpacity>.99)
		{
			obj.xOpacity = .99;
			return;
		}

		obj.style.opacity = obj.xOpacity;
		obj.style.MozOpacity = obj.xOpacity;
		obj.style.filter = 'alpha(opacity=' + (obj.xOpacity*100) + ')';
	}
}

// JavaScript Document
