/**
 * The "Problem" with the "Red Peak" NZ Flag Design
 *
 * /u/krikienoid
 *
 */

;(function ( window, document, $, undefined ) {

    var $enterImgLink,
        $setImgLink,
        $openImgFile,
        $wrapperHeader,
        $wrapperBody,
        $redPeakScene,
        $redPeakArms;

    //
    // Functions
    //

    // Set image scene to proportion
    function setSceneSize () {
        var outerWidth  = $wrapperBody.width(),
            outerHeight = $wrapperBody.height() - $wrapperHeader.height(),
            outerRatio  = outerWidth / outerHeight,
            padding     = 20;
        if ( outerRatio > 1 ) { // landscape
            outerHeight -= padding * 2;
            $redPeakScene.width( outerHeight + 'px' );
            $redPeakScene.height( outerHeight + 'px' );
        }
        else { // portrait
            outerWidth -= padding * 2;
            $redPeakScene.width( outerWidth+ 'px' );
            $redPeakScene.height( outerWidth + 'px' );
        }
    }

    // Set flag image
    function setImg ( imgSrc ) {
        if ( imgSrc ) {
            $redPeakArms.attr( { 'src' : imgSrc } );
        }
        else {
            $redPeakArms.attr( { 'src' : 'img/red-peak.png' } );
        }
    }

    // Get hash data
    function fromHash () {
        var hashData = window.location.hash.split( '#' )[ 1 ],
            imgSrc;
        if ( hashData ) {
            imgSrc = window.unescape( hashData );
        }
        if ( hashData && imgSrc ) {
            setImg( imgSrc );
            $enterImgLink.val( imgSrc );
        }
    }

    // Set hash data
    function toHash () {
        window.location.hash = window.escape( $enterImgLink.val() );
    }

    // Init
    $( window.document ).ready( function () {

        // Add event handlers
        $enterImgLink  = $( '#enter-img-link' );
        $setImgLink    = $( '#set-img-link' );
        $openImgFile   = $( '#open-img-file' );
        $wrapperHeader = $( '#wrapper-header' );
        $wrapperBody   = $( '#wrapper-body' );
        $redPeakScene  = $( '#wrapper-scene' );
        $redPeakArms   = $( '.red-peak-img' );

        // Resize image scene
        $( window ).on( 'resize', setSceneSize );

        // Load flag image from hash on user entered hash
        $( window ).on( 'hashchange', fromHash );

        // Load flag image from user given url
        $setImgLink.on( 'click', function () {
            toHash();
            setImg( $enterImgLink.val() );
        } );

        // Load from file
        $openImgFile.on( 'change', function () {
            var file   = $openImgFile[ 0 ].files[ 0 ],
                reader = new FileReader();
            reader.onload = function (e) {
                setImg( e.target.result );
                $enterImgLink.val( '' );
                toHash();
            };
            reader.readAsDataURL( file );
        } );

        // Load flag image on page load
        setSceneSize();
        fromHash();

    } );

}( window, document, jQuery ));
