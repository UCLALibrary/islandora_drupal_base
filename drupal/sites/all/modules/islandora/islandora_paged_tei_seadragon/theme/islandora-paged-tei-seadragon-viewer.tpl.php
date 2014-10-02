<?php
/**
 * @file
 * Template file for the paged TEI seadragon viewer.
 */
?>
<?php if ($tei_pages_populated): ?>
  <?php if ($tei): ?>
    <div class="paged-tei-seadragon-viewer-pane" id="paged-tei-seadragon-viewer-tei-pane<?php print $tei_pane_class; ?>">
      <div>
        <div class="left-toolbar">
          <?php if (isset($seadragon)): ?>
            <button type="button" id="paged-tei-seadragon-viewer-tei-toggle">Toggle TEI</button>
          <?php endif; ?>
        </div>
      </div>
      <div id="paged-tei-seadragon-viewer-tei">
        <?php print $tei;?>
      </div>
    </div>
  <?php endif; ?>
  <div class="paged-tei-seadragon-viewer-pane" id="paged-tei-seadragon-viewer-seadragon-pane">
    <div>
      <div class="paged-tei-seadragon-viewer-left-toolbar">
        <?php print isset($pager) ? $pager : '';?>
      </div>
      <div class="paged-tei-seadragon-viewer-right-toolbar">
        <?php print isset($clipper) ? $clipper : '';?>
      </div>
    </div>
    <div id="paged-tei-seadragon-viewer-seadragon">
      <?php print isset($seadragon) ? $seadragon : '';?>
    </div>
  </div>
  <div class="paged-tei-seadragon-viewer-download-datastreams">
    <?php print isset($datastreams) ? $datastreams : '';?>
  </div>
<?php else: ?>
  <p><?php print t('This manuscript currently does not contain any page image(s) or text.'); ?></p>
<?php endif; ?>