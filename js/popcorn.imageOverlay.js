//**********************************************************************
//IMAGE OVERLAY PLUGIN
//**********************************************************************
//This Source Code Form is subject to the terms of the Mozilla Public
//License, v. 2.0. If a copy of the MPL was not distributed with this file,
//You can obtain one at http://mozilla.org/MPL/2.0/.

//PLUGIN: IMAGE OVERLAY

(function (Popcorn) {

/**
 * ImageOverlay popcorn plug-in 
 * Shows an image element overlayed on video or other item.
 * Creating and using a div at 0,0 with auto width and height is recommended (in the 
 * layout file).
 * Image will appear as a translucent thumbnail form until the mouse enters the image.
 * Upon mouseover, the image display is enlarged and becomes opague. If mouseover text
 * was supplied, it appears on the image. Also, a button appears at the top of the image.  
 * Clicking the button causes the video to pause and the image to be displayed at full 
 * size with a button to restart the video.  Clicking the restart button removes the full
 * size image and restarts the video.
 * Clicking within the image thumbnail causes a new tab to be opened at the URL specified
 * in "href" if one was supplied.
 * Options parameters 
 * Start: the time that you want this plug-in to execute
 * End: the time that you want this plug-in to stop executing 
 * href: optional url of the destination of a link, nominally a full resolution copy
 * of the image but could be anything 
 * Target: the id of the document element that the iframe needs to be attached to, 
 * this target element must exist on the DOM
 * Column and row: positioning offsets in pixels from the upper left corner of the
 * target div
 * PosMode: absolute or relative, defaults to relative to allow overlapping items to 
 * automatically move
 * Maxsize: the maximum thumbnail size to use when the cursor is not over the overlay 
 * image
 * Src: the url of the image that you want to display
 * text: optional text the overlayed text on the image on mouseover  
 *
 * Many thanks to Scott Downe for the Image plugin, it proved useful for learning
 * both javascript and popcorn.js.
 * @param {Object} options
 * 
 * Example:
 * var p = Popcorn('#video')
 *   .imageOverlay({
 *     start: 5, // seconds
 *     end: 15, // seconds
 *     href: 'http://www.drumbeat.org/',
 *     src: 'http://www.drumbeat.org/sites/default/files/domain-2/drumbeat_logo.png',
 *     text: 'DRUMBEAT',
 *     target: 'overlay',
 *     column: 20,
 *     row: 20,
 *     posMode: 'absolute',
 *     maxSize: 100
 *   } )
 *
 */ 

var that;

Popcorn.plugin( "imageOverlay", {
  manifest: {
    about:{
      name: "Popcorn image overlay Plugin",
      version: "0.1",
      author: "Russ Sieron, General Dynamics Advanced Information Systems",
      website: "http://www.gd-ais.com/"
    },
    options: {
      start: {
        elem: "input",
        type: "number",
        label: "In"
      },
      end: {
        elem: "input",
        type: "number",
        label: "Out"
      },
      href: {
        elem: "input",
        type: "text",
        label: "Link URL"
      },
      target: "image-container",
      column: {
        elem: "input",
        type: "number",
        label: "Column position"
      },
      row: {
        elem: "input",
        type: "number",
        label: "Row position"
      },
      posMode: {       
        elem: "input",
        type: "text",
        label: "absolute or relative positioning"
      },
      maxSize: {
        elem: "input", 
        type: "number",   
        label: "Maximum width"
      },
      src: {
        elem: "input", 
        type: "text",   
        label: "Source URL"
      },
      text: {
        elem: "input",
        type: "text",
        label: "Mouseover text"
      }
    }
  },


  _setup: function( options ) {

    var target = document.getElementById( options.target );

    // Create a div to contain the image and all components related to the image
    options.imgDiv = document.createElement( "div");
    options.imgDiv.id = options.src + "imgDiv";
    var useMode = "relative";
    if ( options.posMode == "absolute"){
      useMode = "absolute";
    }
      
    Popcorn.extend ( options.imgDiv.style, {
      position: useMode,
      padding: "10px",
      top: options.row + "px",
      left: options.column + "px",
      display: "none"
    });

    // the element to contain the image
    options.img = document.createElement( "img" );
    if ( ! options.maxSize ){
      options.useMaxWidth = 100;  
    }
    else{
      options.useMaxWidth = options.maxSize;
    }

    Popcorn.extend ( options.img.style, {
      opacity: "0.4",
      position: "relative",
      top: "20px",
      width: options.useMaxWidth + "px"
    });
    options.img.id = options.src + "img";
    options.imgDiv.appendChild ( options.img);

    // The element to contain the button
    options.linkButton = document.createElement( "button");
    options.linkButton.id= options.src + "linkButton";

    options.imgDiv.appendChild(options.linkButton);



    // Text appearing on mouseover
    options.mouseOverText = document.createElement( "div" );
    options.imgDiv.appendChild( options.mouseOverText );


    // The link used when clicking on the image
    options.link = document.createElement( "a" );
    options.link.style.position = "relative";
    options.link.style.textDecoration = "none";


    if ( !target && Popcorn.plugin.debug ) {
      throw new Error( "target container doesn't exist" );
    }
    else
    {     
      target && target.appendChild( options.imgDiv);
    }

    // add the on-click widget's div to the target div
    target && target.appendChild( options.link );




    options.img.addEventListener( "load", function() {

      if ( options.img ) {
        // borders look really bad, if someone wants it they can put it on their div target
        options.img.style.borderStyle = "none";
      }

      Popcorn.extend( target.style,{
        zindex: "100",
        position: "absolute"
      });


      if ( options.href ) {
        options.link.href = options.href;
      }

      if ( options.link ){
        options.link.target = "_blank";
      }

      // handle the optional text and the pop-up text during mouseover
      var fontHeight = ( options.useMaxWidth / 8 ) + "px"; 

      if ( options.linkButton ) {
        Popcorn.extend(options.linkButton.style,{
          backgroundcolor: "white",
          color: "black",
          fontSize: "10px",
          opacity: "0.4",
          position: "absolute",
          width: options.useMaxWidth,
          top: "10px",
          left: "10px"
        });
        options.linkButton.innerHTML = "Click for full size";
      }

      if ( options.mouseOverText ) {
        Popcorn.extend( options.mouseOverText.style, {
          color: "black",
          fontSize: fontHeight,
          fontWeight: "bold",
          position: "absolute",
          textAlign: "center",
          zIndex: "10"
        });

        options.mouseOverText.innerHTML = "";
        options.mouseOverText.id= options.src + "mouseOverText";
        options.mouseOverText.style.top = (options.useMaxWidth * 3 / 8  ) + "px";
        options.mouseOverText.style.left = (options.useMaxWidth * 3 / 8 ) + "px";
      }
    }, false );

    // add event listener for button click on the show full image button

    options.linkButton.addEventListener( "click", function() {  
      // create the full image display div if it does not already exist

      if ( ! options.fullImageDiv ){
        options.fullImageDiv = document.createElement( "div" );
        options.fullImageDiv.id = options.src + "fullImage";
        // set the attributes for the div
        options.fullImageDiv.style.margin = 1;
        options.fullImageDiv.style.position = "absolute";
        options.fullImageDiv.style.top = "10px";
        options.fullImageDiv.style.left = "10px";
        options.fullImageDiv.style.width = "auto";
        options.fullImageDiv.style.height = "auto";
        options.fullImageDiv.style.zindex = "0";
        options.fullImageDiv.style.display = "none";
        // add it to the document
        document.documentElement.appendChild ( options.fullImageDiv );

        // Create the restart button at the top of the div
        options.restartButton = document.createElement( "input");
        options.restartButton.id = options.src + "imageRestart";
        options.restartButton.type = "button";
        options.restartButton.value = "Click to resume";
        options.restartButton.style.position = "absolute";
        options.restartButton.style.top = "0px";
        options.restartButton.style.left = "0px";
        options.restartButton.style.color = "Red";
        options.restartButton.style.backgroundColor = "Black";
        options.restartButton.style.width = (options.useMaxWidth * 4.0) + "px";
        options.restartButton.style.height = "30px";
        options.restartButton.style.zindex = "0";
        // add the restart button to the full image div
        options.fullImageDiv.appendChild ( options.restartButton);

        // create the element for the image
        options.fullImageImage = document.createElement( "img");
        options.fullImageImage.id = options.src + "displayFull";
        options.fullImageImage.style.position = "absolute";
        options.fullImageImage.style.top = "30px";
        options.fullImageImage.style.left = "0px";
        options.fullImageImage.style.width = "auto";
        options.fullImageImage.style.zindex = "0";
        // add it to the full image div
        options.fullImageDiv.appendChild ( options.fullImageImage);


      }

      options.fullImageImage.src = options.src;
      options.fullImageDiv.style.display = "block";
      options.fullImageDiv.style.zIndex = 3000;


      // add handler to remove full image and restart playback
      options.restartButton.addEventListener ( "click", function(){
        var temp;
        temp = options.fullImageDiv.removeChild (options.fullImageImage);
        options.fullImageImage = null;
        temp = options.fullImageDiv.removeChild (options.restartButton);
        options.restartButton = null;
        document.documentElement.removeChild ( options.fullImageDiv );
        options.fullImageDiv = null;

        options.img.style.width = (options.useMaxWidth) + "px";
        options.img.style.opacity = "0.4";
        options.linkButton.style.width = (options.useMaxWidth) + "px";
        options.linkButton.style.opacity = "0.4";
        if ( options.mouseOverText ){
          options.mouseOverText.innerHTML = "";
        }
        that.media.play();
      });


      that.media.pause();
    }, true);

    // add event listeners for mouseover
    // the image is enlarged, becomes opaque and shows a prompt on mouseover
	
	options.imgDiv.addEventListener( "mouseover", function() {

      if ( options.mouseOverText){     
        var fontHeight = (options.useMaxWidth * 2.25) / ( options.text.length + 1.);
        options.mouseOverText.style.fontSize = fontHeight;
        options.mouseOverText.innerHTML = options.text;

      }
	  
	  // Right alignment adjustment. 
      options.imgDiv.style.left = (parseInt(options.imgDiv.style.left,10) - ((options.useMaxWidth * 1.5) - options.useMaxWidth)) + "px";
	  
	  options.img.style.width = (options.useMaxWidth * 1.5) + "px";
	  
      options.img.style.opacity = "1.0";
      var buttonElem = document.getElementById ( options.src + "linkButton");
      buttonElem.style.width = (options.useMaxWidth * 1.5) + "px";
      buttonElem.style.opacity = "1.0";
    }, true);


    // event listener for mouse leaving image, undo mouseover actions
    options.imgDiv.addEventListener( "mouseout", function() {
     
	  // Right alignment adjustment.  
	  options.imgDiv.style.left = (parseInt(options.imgDiv.style.left,10) + ((options.useMaxWidth * 1.5) - options.useMaxWidth)) + "px";
	  
	  options.img.style.width = (options.useMaxWidth) + "px";
	  
      options.img.style.opacity = "0.4";
      options.linkButton.style.width = (options.useMaxWidth) + "px";
      options.linkButton.style.opacity = "0.4";
      if ( options.mouseOverText){
        options.mouseOverText.innerHTML = "";
      }
    }, true);


    // actions for click on image.  
    options.img.addEventListener( "click", function() {
      this.style.opacity = "0.4";
      if ( options.href.length > 0)
      {
        window.open( options.href, "_blank");
      }
    }, true);

  },

  /**
   * @member imageOverlay 
   * The start function will be executed when the currentTime 
   * of the video  reaches the start time provided by the 
   * options variable
   */
  start: function( event, options ) {

    if ( options.img ){
      options.img.src = options.src;
      if ( options.imgDiv ) {
        options.imgDiv.style.display = "block";
      }
    }
    if ( !options.text) {
      options.text = " ";
    }
    that = this;
  },
  /**
   * @member imageOverlay 
   * The end function will be executed when the currentTime 
   * of the video  reaches the end time provided by the 
   * options variable
   */
  end: function( event, options ) {
    if ( options.imgDiv) {
      options.imgDiv.style.display = "none";
    }
    if ( options.img ){
      img.src = "";
    }
  },


  _teardown: function( options ) {
    var temp;
    var target = document.getElementById( options.target );
    if ( target ) {
      temp = options.imgDiv.removeChild ( options.img);
      options.img = null;
      temp = options.imgDiv.removeChild( options.mouseOverText );
      options.mouseOverText = null;
      temp = options.imgDiv.removeChild(options.linkButton);
      options.linkButton = null;
      temp = target.removeChild( options.imgDiv);
      options.imgDiv = null;
      target.removeChild( options.link );
    }
  }
});
})( Popcorn );