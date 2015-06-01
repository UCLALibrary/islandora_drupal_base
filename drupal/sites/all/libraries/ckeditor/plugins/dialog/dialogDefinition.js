/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.on( 'dialogDefinition', function( ev ) {
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    if ( dialogName == 'table' ) {
        var info = dialogDefinition.getContents( 'info' );

        info.get( 'txtWidth' )[ 'default' ] = '100%';       // Set default width to 100%
        info.get( 'txtBorder' )[ 'default' ] = '0';         // Set default border to 0
        info.get( 'txtCols' )[ 'default' ] = '1';        
        info.get( 'txtRows' )[ 'default' ] = '2';         
    }
});
