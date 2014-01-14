<?php
/**
 * @file
 * mods_basic_image.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function mods_basic_image_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "field_group" && $api == "field_group") {
    return array("version" => "1");
  }
  list($module, $api) = func_get_args();
  if ($module == "relation" && $api == "relation_type_default") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_islandora_sync_bundle_settings_defaults().
 */
function mods_basic_image_islandora_sync_bundle_settings_defaults() {
$islandora_sync_bundle_settings = array();
  $islandora_sync_bundle_settings['mods_image'] = array(
  'bundle' => 'mods_image',
  'entity_type' => 'node',
  'sync_fedora' => '0',
  'sync_fedora_timing' => '',
  'sync_fedora_create' => '1',
  'sync_fedora_update' => '1',
  'sync_fedora_delete' => '1',
  'namespace' => '',
  'sync_drupal' => '1',
  'sync_drupal_timing' => 'real_time',
  'sync_drupal_create' => '1',
  'sync_drupal_update' => '1',
  'sync_drupal_delete' => '1',
);
  $islandora_sync_bundle_settings['mods_image']['cmodels'] = array(
  0 => array(
    'bundle' => 'mods_image',
    'cmodel' => 'islandora:sp_basic_image',
  ),
);
return $islandora_sync_bundle_settings;
}

/**
 * Implements hook_islandora_sync_field_datastreams_defaults().
 */
function mods_basic_image_islandora_sync_field_datastreams_defaults() {
$islandora_sync_field_datastreams = array();
  $islandora_sync_field_datastreams['field_names:field_names_name'] = array(
  'bundle' => 'field_names',
  'field' => 'field_names_name',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<namePart>%value%</namePart>',
  'read_context' => 'parent',
  'read_path' => 'mods:namePart',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['field_names:field_role'] = array(
  'bundle' => 'field_names',
  'field' => 'field_role',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<role><roleTerm authority="marcrelator" type="text">%value%</roleTerm></role>',
  'read_context' => 'parent',
  'read_path' => 'mods:role/mods:roleTerm',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['field_names:field_type'] = array(
  'bundle' => 'field_names',
  'field' => 'field_type',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'attribute',
  'create_value' => 'type',
  'read_context' => 'parent',
  'read_path' => '@type',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_abstract'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_abstract',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'abstract',
  'read_context' => 'parent',
  'read_path' => 'mods:abstract',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_city'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_city',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'city',
  'read_context' => 'parent',
  'read_path' => 'mods:city',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_city_section'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_city_section',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'citySection',
  'read_context' => 'parent',
  'read_path' => 'mods:citySection',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_continent'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_continent',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'continent',
  'read_context' => 'parent',
  'read_path' => 'mods:continent',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_coordinates'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_coordinates',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'coordinates',
  'read_context' => 'parent',
  'read_path' => 'mods:coordinates',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_country'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_country',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<place><placeTerm authority=\'marccountry\' type=\'code\'>%value%</placeTerm></place>',
  'read_context' => 'parent',
  'read_path' => 'mods:place/mods:placeTerm[@type = \'code\']',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_county'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_county',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'county',
  'read_context' => 'parent',
  'read_path' => 'mods:county',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_date_issued'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_date_issued',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'dateIssued',
  'read_context' => 'parent',
  'read_path' => 'mods:dateIssued',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_extent'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_extent',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'extent',
  'read_context' => 'parent',
  'read_path' => 'mods:extent',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_form'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_form',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<form authority="marcform">%value%</form>',
  'read_context' => 'parent',
  'read_path' => 'mods:form',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_genre'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_genre',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<genre authority="lctgm">%value%</genre>',
  'read_context' => 'parent',
  'read_path' => 'mods:genre',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_geo_country'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_geo_country',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'country',
  'read_context' => 'parent',
  'read_path' => 'mods:country',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_geographic'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_geographic',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'geographic',
  'read_context' => 'parent',
  'read_path' => 'mods:geographic',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_identifier'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_identifier',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<identifier type="local">%value%</identifier>',
  'read_context' => 'parent',
  'read_path' => 'mods:identifier[@type=\'local\']',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_image'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_image',
  'export' => '1',
  'export_type' => 'managed_datastream',
  'dsid' => 'OBJ',
  'create_context' => '',
  'create_path' => '',
  'create_type' => '',
  'create_value' => '',
  'read_context' => '',
  'read_path' => '',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_language'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_language',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<language><languageTerm authority="iso639-2b" type="code">%value%</languageTerm></language>',
  'read_context' => 'parent',
  'read_path' => 'mods:language/mods:languageTerm',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_names'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_names',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'name',
  'read_context' => 'parent',
  'read_path' => 'mods:name',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_note'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_note',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'note',
  'read_context' => 'parent',
  'read_path' => 'mods:note[not(@*)]',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_place'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_place',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'xml',
  'create_value' => '<place><placeTerm type="text">%value%</placeTerm></place>',
  'read_context' => 'parent',
  'read_path' => 'mods:place/mods:placeTerm[@type = \'text\']',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_province'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_province',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'province',
  'read_context' => 'parent',
  'read_path' => 'mods:province',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_publisher'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_publisher',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'publisher',
  'read_context' => 'parent',
  'read_path' => 'mods:publisher',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_region'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_region',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'region',
  'read_context' => 'parent',
  'read_path' => 'mods:region',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_sub_title'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_sub_title',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'subTitle',
  'read_context' => 'parent',
  'read_path' => 'mods:subTitle',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_temporal'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_temporal',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'temporal',
  'read_context' => 'parent',
  'read_path' => 'mods:temporal',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_topic'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_topic',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'topic',
  'read_context' => 'parent',
  'read_path' => 'mods:topic',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:field_type_of_resource'] = array(
  'bundle' => 'mods_image',
  'field' => 'field_type_of_resource',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'typeOfResource',
  'read_context' => 'parent',
  'read_path' => 'mods:typeOfResource',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:group_cartographics'] = array(
  'bundle' => 'mods_image',
  'field' => 'group_cartographics',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'cartographics',
  'read_context' => 'parent',
  'read_path' => 'mods:cartographics',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:group_geographic_information'] = array(
  'bundle' => 'mods_image',
  'field' => 'group_geographic_information',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'hierarchicalGeographic',
  'read_context' => 'parent',
  'read_path' => 'mods:hierarchicalGeographic',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:group_origin_information'] = array(
  'bundle' => 'mods_image',
  'field' => 'group_origin_information',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'originInfo',
  'read_context' => 'parent',
  'read_path' => 'mods:originInfo',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:group_physical_description'] = array(
  'bundle' => 'mods_image',
  'field' => 'group_physical_description',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'physicalDescription',
  'read_context' => 'parent',
  'read_path' => 'mods:physicalDescription',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:group_subject'] = array(
  'bundle' => 'mods_image',
  'field' => 'group_subject',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'subject',
  'read_context' => 'parent',
  'read_path' => 'mods:subject',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:group_title_info'] = array(
  'bundle' => 'mods_image',
  'field' => 'group_title_info',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'titleInfo',
  'read_context' => 'parent',
  'read_path' => 'mods:titleInfo',
  'predicate' => '',
  'predicate_uri' => '',
);
  $islandora_sync_field_datastreams['mods_image:title'] = array(
  'bundle' => 'mods_image',
  'field' => 'title',
  'export' => '1',
  'export_type' => 'xml_value',
  'dsid' => 'MODS',
  'create_context' => 'parent',
  'create_path' => 'self::node()',
  'create_type' => 'element',
  'create_value' => 'title',
  'read_context' => 'parent',
  'read_path' => 'mods:title',
  'predicate' => '',
  'predicate_uri' => '',
);
return $islandora_sync_field_datastreams;
}

/**
 * Implements hook_islandora_sync_xml_ds_settings_defaults().
 */
function mods_basic_image_islandora_sync_xml_ds_settings_defaults() {
$islandora_sync_xml_ds_settings = array();
  $islandora_sync_xml_ds_settings['MODS'] = array(
  'ds_id' => 'MODS',
  'root' => 'mods',
  'namespace_uri' => 'http://www.loc.gov/mods/v3',
);
  $islandora_sync_xml_ds_settings['MODS']['namespaces'] = array(
  0 => array(
    'ds_id' => 'MODS',
    'prefix' => 'mods',
    'uri' => 'http://www.loc.gov/mods/v3',
  ),
  1 => array(
    'ds_id' => 'MODS',
    'prefix' => 'xsi',
    'uri' => 'http://www.w3.org/2001/XMLSchema-instance',
  ),
  2 => array(
    'ds_id' => 'MODS',
    'prefix' => 'xlink',
    'uri' => 'http://www.w3.org/1999/xlink',
  ),
);
return $islandora_sync_xml_ds_settings;
}

/**
 * Implements hook_node_info().
 */
function mods_basic_image_node_info() {
  $items = array(
    'mods_image' => array(
      'name' => t('MODS Image'),
      'base' => 'node_content',
      'description' => t('Drupal content type representing the fields of the Islandora Basic Image MODS form.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}
