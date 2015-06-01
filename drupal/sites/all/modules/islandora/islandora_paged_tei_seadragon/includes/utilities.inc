<?php
/**
 * @file
 * Helpers for this module.
 */

/**
 * Runs the transform on a manuscript.
 *
 * @param AbstractObject $manuscript
 *   The manuscript containing the TEI.
 * @param AbstractObject $transform
 *   The object containing the transform.
 *
 * @return string|bool
 *   The string of the transformed TEI, FALSE if it does not exist.
 */
function islandora_paged_tei_seadragon_do_transform(AbstractObject $manuscript, AbstractObject $transform) {
  if (variable_get('islandora_saxon_enable_saxon') == TRUE) {
    watchdog('islandora_paged_tei_seadragon', "Using experimental Saxon transformation", array(), WATCHDOG_DEBUG);

    $tmpdir = file_directory_temp() . DIRECTORY_SEPARATOR;
    $xslt = $tmpdir . file_munge_filename($transform->id, '', FALSE) . 'xslt';

    // Right now, we have to write TEI to a file and read from there
    $tei = tempnam($tmpdir, 'paged-tei-');
    file_put_contents($tei, $manuscript['TEI']->content);

    // For now, just a very simple XSLT "file exists" test [FIXME]
    if (!file_exists($xslt)) {
      file_put_contents($xslt, $transform['XSLT']->content, LOCK_EX);
    }

    $xsl_processor = new Saxon\XsltProcessor();

    try {
      // This will return NULL if there was an error thrown
      $html = $xsl_processor->xsltApplyStylesheet($tei, $xslt);

      if ($xsl_processor->getExceptionCount() > 1) {
        drupal_set_message(t($xsl_processor->getErrorMessage()), 'error');
      }
    } finally {
      if (file_exists($tei)) {
        unlink($tei);
      }

      // Not actually implemented in Saxon yet
      $xsl_processor->close();
    }

    return $html;
  } else {
    $tei_dom = new DOMDocument();
    $xsl_dom = new DOMDocument();
    $xsl_processor = new XSLTProcessor();

    if (isset($manuscript['TEI'])) {
      $tei_dom->loadXML($manuscript['TEI']->content);
      $xsl_dom->loadXML($transform['XSLT']->content);
      $xsl_processor->importStyleSheet($xsl_dom);

      return $xsl_processor->transformToXML($tei_dom);
    }
    else {
      return FALSE;
    }
  }
}
