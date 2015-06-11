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
function islandora_paged_tei_seadragon_do_transform(AbstractObject $manuscript, AbstractObject $transform, $page_num, $generate) {
  if (variable_get('islandora_saxon_enable_saxon') == TRUE) {
    watchdog('islandora_paged_tei_seadragon', "Using experimental Saxon transformation", array(), WATCHDOG_DEBUG);

    // The directory name of the object's HTML directory
    $dir_name = str_replace(':', '_', $manuscript->id);

    if ($dir = file_stream_wrapper_get_instance_by_uri('public://')) {
      $dir_path = $dir->realpath() . DIRECTORY_SEPARATOR . 'teihtml' . DIRECTORY_SEPARATOR . $dir_name;

      // If we're asked to regenerate the HTML files, clean out the old ones then delete the directory
      if ($generate == "html" && file_exists($dir_path)) {
        watchdog('islandora_paged_tei_seadragon', "Cleaning existing HTML fragments directory", array(), WATCHDOG_DEBUG);
        $files = scandir($dir_path);

        foreach ($files as $file) {
          if ($file != "." && $file != "..") {
            unlink($dir_path . DIRECTORY_SEPARATOR . $file);
          }
        }

        rmdir($dir_path);
      }

      // If our HTML files directory doesn't exist, we need to create it
      if (!file_exists($dir_path) && !mkdir($dir_path, 0755, TRUE)) {
        drupal_set_message(t('Unable to write HTML to: ' . $dir_path), 'error');
        return FALSE;
      }

      // Construct path to the what would be the pre-generated HTML fragment file
      $html_file = $dir_path . DIRECTORY_SEPARATOR . $dir_name . '-' . $page_num  . '.html';

      // If that file already exists, go ahead and use it instead of running the XSLT
      if (file_exists($html_file)) {
        return file_get_contents($html_file);
      }
    }
    else {
      drupal_set_message(t('Unable to resolve location of Drupal files directory'), 'error');
      return FALSE;
    }

    // If the file didn't exist, we'll need to go ahead and generate it
    $tmpdir = file_directory_temp() . DIRECTORY_SEPARATOR;
    $xslt = $tmpdir . file_munge_filename($transform->id, '', FALSE) . 'xslt';

    // Right now, we have to write TEI to a file and read from there
    $tei = tempnam($tmpdir, 'paged-tei-');
    file_put_contents($tei, $manuscript['TEI']->content);

    // For now, just a very simple XSLT "file exists" test
    if (!file_exists($xslt)) {
      file_put_contents($xslt, $transform['XSLT']->content, LOCK_EX);
    }

    $xsl_processor = new Saxon\XsltProcessor();
    $obj_dir = new Saxon\XdmValue($dir_path);
    $obj_id = new Saxon\XdmValue($dir_name);

    $xsl_processor->setParameter("", "HTML_DIR", $obj_dir);
    $xsl_processor->setParameter("", "OBJECT_ID", $obj_id);

    try {
      // This will return NULL if there was an error thrown
      $xsl_processor->xsltApplyStylesheet($tei, $xslt);

      if ($xsl_processor->getExceptionCount() > 1) {
        drupal_set_message(t($xsl_processor->getErrorMessage()), 'error');
        $html = FALSE;
      }
      else {
        $html_file = $dir_path . DIRECTORY_SEPARATOR . $dir_name . '-' . $page_num  . '.html';

        if (file_exists($html_file)) {
          $html = file_get_contents($html_file);
        }
        else {
          drupal_set_message(t("Configured XSLT failed to generate TEI HTML fragment"), 'error');
          $html = FALSE;
        }
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
