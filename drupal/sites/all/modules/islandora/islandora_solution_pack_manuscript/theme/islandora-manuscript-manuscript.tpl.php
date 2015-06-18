<?php
/**
 * @file
 * Template file to style output.
 */
?>
<?php if (isset($viewer)): ?>
  <div id="manuscript-viewer">
    <?php print $viewer; ?>
  </div>
<?php endif; ?>
<?php print $metadata; ?>