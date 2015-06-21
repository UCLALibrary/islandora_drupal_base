(function ($) {
    Drupal.behaviors.islandora_paged_tei_seadragon_tei_toggle = {
        attach: function (context, settings) {
            $("#paged-tei-seadragon-viewer-tei-toggle").click(function () {
                if ($("#paged-tei-seadragon-viewer-tei").css("display") == "none") {
                    $("#paged-tei-seadragon-viewer-seadragon-pane").width("49%");
                    $("#paged-tei-seadragon-viewer-tei-toggle").text('Hide Transcription');
                }
                else {
                    // XXX: Should be something more like
                    // `width of parents-width of sibling`. But taking manual
                    // control is a can of worms with re-size.
                    $("#paged-tei-seadragon-viewer-seadragon-pane").width("98%");
                    $("#paged-tei-seadragon-viewer-tei-toggle").text('Show Transcription');
                }
                $("#paged-tei-seadragon-viewer-tei").toggle();

                // Quick fix to recenter the image -- probably a better way to do it
                tile_source = new OpenSeadragon.DjatokaTileSource(
                  settings.islandoraOpenSeadragon.settings.djatokaServerBaseURL,
                  settings.islandoraOpenSeadragon.resourceUri,
                  settings.islandoraOpenSeadragon
                );
                Drupal.settings.islandora_open_seadragon_viewer.openTileSource(tile_source);
            });
        }
    }
})(jQuery);
