document.addEventListener("DOMContentLoaded", function() {
	
	var pop = Popcorn('#demo_video', {
		pauseOnlinkClicked: true
	});

	pop.tagthisperson({

		start: 2,
		target: 'tags',
		person: 'Hugh Hou (Developer)',
		image: 'img/Hugh_Headshot.png',
		href: 'http://hughdesign.net'

	});

	pop.facebook({

		start: 1,
		end: 20,
		type: "LIKE",
		target: 'side'

	});

	pop.image({

		start: 1,
		end: 20,
		target:'imagecontainer',
		href:'http://www.legendfc.com/',
		src:'img/Legend-Fighting-Championship-Logo.png',
		effect: "applyclass",
        applyclass: "opclass",
		//text: 'Legend Fighting Championship 10 is coming to your house!'
	});

	pop.subtitle({
       	start: 3,
      	end: 7,
       	text: "this is the a subtitle showcase.",
		target:'subtitle',
    });

    	pop.subtitle({
       	start: 7,
      	end: 11,
       	text: "Cool Chinese music is playing...",
		target:'subtitle',
    });

    	pop.subtitle({
       	start: 11,
      	end: 15,
       	text: "I know, it is very cool :)",
		target:'subtitle',
    });

    pop.image({

		start: 20,
		end: 21,
		target:'side',
		//href:'http://www.legendfc.com/',
		src:'img/fist.png',
		text: 'IN YOUR FACE!'
	});

	pop.image({

		start: 22.5,
		end: 23.5,
		target:'side',
		//href:'http://www.legendfc.com/',
		src:'img/fist.png',
		text: 'IN YOUR FACE AGAIN!'
	});

	pop.image({

		start: 36,
		end: 39,
		target:'side',
		//href:'http://www.legendfc.com/',
		src:'img/dropkick.jpg',
		//text: 'IN YOUR FACE AGAIN!'
	});
	
	/*	pop.text({
	        'start': 2,
	        'end': 30,
	        'title': 'Tear Gas',
	        'text': '<blockquote class="tooltip"><span id="closeWindow">CLOSE</span><p><a href="http://en.wikipedia.org/wiki/Tear_gas" target="_blank">Tear gas</a>,  formally known as a lachrymatory agent or lachrymator (from lacrima  meaning "a tear" in Latin).</p></blockquote>',
	        'top': '10%',
	        'left': '50%'       
	   });
	   */

	pop.subtitle({
       	start: 39,
      	end: 45,
       	text: "Rock and Roll music ~~~ Go well with the real fight!",
		target:'subtitle',
    });

    pop.googlemap({

    	start: 25,
    	end: 36,
    	target:'side',
    	type:'ROADMAP',
    	location: 'Hong Kong',
    	zoom: 8
    })

    pop.tagthisperson({

		start: 25,
		end: 36,
		target: 'tags',
		person: 'Its in Hong Kong! Check out the Google Map',
		//image: 'img/Hugh_Headshot.png',
		href: 'https://maps.google.com/maps?q=hong+kong+google+map&ie=UTF-8&hq=&hnear=0x3403e2eda332980f:0xf08ab3badbeac97c,Hong+Kong&gl=us&ei=DqUgUJqJCYP-iQKCzIHIBw&ved=0CAgQ8gEwAA'

	});

	pop.image({

		start: 45,
		//end: 60,
		target:'side',
		href:'http://kwokmanproductions.com/',
		src:'img/kplogo.png',
	});
	
	pop.imageOverlay({
      	// seconds
        start: 1,
        // seconds
        end: 45,
        //href: "http://www.drumbeat.org/",
        src: "http://hughdesign.net/video/images/Legendfc-poster10.png",
        //text: "DRUMBEAT",
        row:3,
        column:400,
        target: "overlay",
		maxSize: 200
      });
	  
	  /*

    pop.imageOverlay({
      	// seconds
        start: 1,
        // seconds
        end: 30,
        row: 0,
        column: 150,
        posMode: "absolute",
        // no href
        src: "http://patriciabergeron.net/wp-content/uploads/web.made_.movie_marquee.gif",
        target: "overlay"
      });
	  */



	pop.play();

	
})