<?php

/**
 *  @file Collection of utility functions for the custom UCLA pdf solution pack.
 */

/**
 *  Formats text from a datastream for html viewing.
 *
 *  @param $object AbstractObject
 *    Tuque object containing the datastream
 *  @param $dsid string
 *    The id of the datastream in the Tuque object that contains the text
 */
function ucla_pdf_format_datastream_text($object, $dsid) {
  return check_plain($object[$dsid]->content);
}

