/**
 * @file
 * Create a jsTree for use in rendering a manuscript.
 */

(function ($) {
    Drupal.behaviors.islandora_manuscript_jstree = {
        attach: function (context, settings) {
            if (typeof settings.islandora_manuscript != 'undefined') {
                for (var id in settings.islandora_manuscript.jstree.info) {
                    $('#' + id).once('islandora-manuscript-jstree', function () {
                        $(this)
                            .jstree(settings.islandora_manuscript.jstree.info[id])
                            .bind('select_node.jstree', function (e, data) {
                              window.location.href = data.event.currentTarget.href;
                            });
                    });
                }
            }
        }
    };
})(jQuery.noConflict(true));
