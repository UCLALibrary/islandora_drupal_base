(function ($) {
    Drupal.behaviors.islandora_paged_tei_seadragon_update_page = {
        attach: function (context, settings) {
            // TEI pane's height can't be set via CSS.
            $("#paged-tei-seadragon-viewer-tei").height($(".openseadragon-canvas").height());
            // If there's no TEI populated want the viewer to take up the whole page.
            var tei_defined = Drupal.settings.islandora_paged_tei_tei !== undefined && Drupal.settings.islandora_paged_tei_tei.populated_tei !== undefined;
            var tei_populated = tei_defined && Drupal.settings.islandora_paged_tei_tei.populated_tei;
            var tei_html_name = tei_defined && Drupal.settings.islandora_paged_tei_tei.tei_html_name;
            var tei_html_path = tei_defined && Drupal.settings.islandora_paged_tei_tei.tei_html_path;
            if (!tei_populated) {
                $("#paged-tei-seadragon-viewer-seadragon-pane").width("100%");
            }
            // Function for handling page changes.
            Drupal.settings.islandora_paged_tei_seadragon_update_page = function (pid, page_number) {
                // Drop out here if we are the most current request.
                if (pid == Drupal.settings.islandora_paged_tei_seadragon.current_page) {
                    return;
                }
                // Update current URL.
                // @todo preserve query params here.
                var params = {};
                params.islandora_paged_content_page = page_number;
                history.pushState({}, "", location.pathname + "?" + $.param(params));
                // Update current page to prevent race conditions.
                Drupal.settings.islandora_paged_tei_seadragon.current_page = pid;

                settings.islandoraOpenSeadragon.resourceUri = location.protocol + "//"
                  + location.host + "/" + Drupal.settings.basePath + "islandora/object/"
                  + pid + "/datastream/JP2/view";

                tile_source = new OpenSeadragon.DjatokaTileSource(
                    settings.islandoraOpenSeadragon.settings.djatokaServerBaseURL,
                    settings.islandoraOpenSeadragon.resourceUri,
                    settings.islandoraOpenSeadragon
                );
                Drupal.settings.islandora_open_seadragon_viewer.open(tile_source);

                if (tei_defined && tei_html_path != "empty") {
                  $("#paged-tei-seadragon-viewer-tei").empty();
                  $("#paged-tei-seadragon-viewer-tei").load(tei_html_path + "/" + tei_html_name + "-" + page_number + ".html",
                    /* There is overlap here with what's in theme.inc [FIXME] */
                    function() {
                      $button = $("button#toggle");
                      $button.removeClass("tei-hidden");

                      $button.click(function() {
                        $(".tei-diplomatic").toggleClass("tei-hidden");
                        $(".tei-edited").toggleClass("tei-hidden");

                        if ($(this).text() == "Show Edited Text") {
                          $(this).text("Show Unedited Text");
                        } else {
                          $(this).text("Show Edited Text");
                        }
                      });
                    }
                  );
                }
            };

            // Bind page changes to the select.
            $("#islandora_paged_tei_seadragon_pager").change(function () {
                Drupal.settings.islandora_paged_tei_seadragon_update_page(
                    $(this).val(),
                    $(this).children("option:selected").text()
                );
            });
        }
    }
})(jQuery);
