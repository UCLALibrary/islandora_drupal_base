<?php

/**
 * @file
 * Contains methods to search solr and display results. Depends on
 * Apache_Solr_Php client.
 */


/**
 * Extention of IslandoraSolrResults to create an alternative display type.
 */
class IslandoraSolrResultsCSV extends IslandoraSolrResults {

  function IslandoraSolrResultsCSV() {

  }

  /**
   * Renders the Solr results as a comma separated values file (.csv). Resets
   * the html headers so it'll prompt to be downloaded.
   *
   * @global type $base_url
   * @param type $islandoraSolrQuery
   *   the IslandoraSolrQueryProcessor object which includes the current query
   *   settings and the raw Solr results.
   *
   * @see IslandoraSolrResults
   */
  function printCSV($islandoraSolrQuery) {

    // Note: solrLimit is really stating the number of rows wanted,
    // not the row number of the upper limit document.  That is, if you
    // want results 40-60, you set solrStart=40, solrLimit=20 -- *not*
    // solrStart=40, solrLimit=60.

    global $base_url;

    // First off, update outer limits
    $upperLimit = $islandoraSolrQuery->solrResult->response->numFound;
    $lowerLimit = 0;
    $increment = 5000;
    // typical failure point for an unbounded query seems to be around 10000-15000,
    // but we must allow for the every-growing output memory structure.

    $row_count = 0;
    $field_counts = array();
    $values = array();

    $seperator = ",";
    $wrap = '"';
    $replace_value = '""';

    $islandoraSolrQuery->solrStart = $lowerLimit;
    $islandoraSolrQuery->solrLimit = $increment;

    $docfile = tmpfile();

    while ($islandoraSolrQuery->solrStart < $upperLimit) {

      // Perform the incremental re-query.
      $islandoraSolrQuery->resetResults();
      $islandoraSolrQuery->executeQuery();

      // Update incremental limits for the next round.
      $lowerLimit += $increment;
      $islandoraSolrQuery->solrStart = $lowerLimit;

      // If there are no results, skip ahead (i.e. exit).
      if (empty($islandoraSolrQuery->solrResult)) {
        continue;
      }

      // else ...
      $rawResponse = $islandoraSolrQuery->solrResult->getRawResponse();
      $responseData = json_decode($rawResponse, TRUE); // TRUE == associative array, not object
      unset($rawResponse); // unknown usefulness

      $docs = $responseData['response']['docs'];

      // This loop is just to update the maximum value counts for each field
      // because if any field in the entire resultset has multiple values,
      // we must break the field into multiple iterated fields.
      foreach ($docs as $doc) {
        fputs($docfile, addcslashes(serialize($doc), "\n\r\\") . "\n");
        foreach ($doc as $field => $value) {

          $field_count = is_array($value) ? count($value) : 1;

          if (!isset( $field_counts[$field])) {
            $field_counts[$field] = $field_count;
          }
          else {
            $field_counts[$field] = max($field_counts[$field], $field_count);
          }

          unset($value);
          unset($field);
        }
        $row_count++;
        unset($doc); // unknown usefulness
        // I have read that PHP sometimes retains loop variables out of scope,
        // so I'm manually unsetting them with each iteration.
      }
      unset($docs);
      unset($responseData); // unknown usefulness

      // Let's try writing a serialized version of the each doc to a file and removing it from
      // memory, then digging through said file line by line at the output stage.

    }

    fseek($docfile, 0);

    $header = array();
    $rows = array();

    // Generate Header
    // For fields with a single value, the header is simply wrapped.
    // For fields where at least one multiple value was found across
    // the resultset, the field is iterated the maximum number of times.
    foreach ($field_counts as $field => $count) {
      if ($count == 1) {
        $header[] = $wrap . str_replace('"', $replace_value, $field) . $wrap;
      }
      else {
        $i = 1;
        while ($i <= $count) {
          $header[] = $wrap . str_replace('"', $replace_value, $field . "_" . $i) . $wrap;
          $i++;
        }
      }
    }

    // Generate refactored output matrix.
    $row_count = 0;
    while ($line = fgets($docfile)) {
      $doc = unserialize( stripcslashes($line));
      foreach ($field_counts as $field => $count) {
        $i = 0;
        while ($i < $count) {
          if (isset($doc[$field])) {
            if ($i === 0 && is_string($doc[$field])) {
              $rows[$row_count][] = $wrap . str_replace('"', $replace_value, $doc[$field]) . $wrap;
            }
            elseif (isset( $doc[$field][$i])) {
              $rows[$row_count][] = $wrap . str_replace('"', $replace_value, $doc[$field][$i]) . $wrap;
            }
            else {
              $rows[$row_count][] = "";
            }
          }
          else {
            $rows[$row_count][] = "";
          }
          $i++;
        }
      }
      $row_count++;
    }

    drupal_add_http_header('Content-Type', 'text/csv; utf-8');
    drupal_add_http_header('Content-Disposition', 'attachment; filename="searchresults.csv');

    print implode($seperator, $header) . "\r\n";
    foreach ($rows as $count => $row) {
      print implode($seperator, $row) . "\r\n";
    }

    drupal_set_message(check_plain(t('Exported !count records from index to CSV', array('!count' => $count+1))));

    fclose($docfile);

    exit;

  }

}
