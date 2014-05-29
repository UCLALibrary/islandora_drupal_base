<?php
/**
 * @file
 * mods_basic_image.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function mods_basic_image_field_group_info() {
  $export = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_cartographics|node|mods_image|form';
  $field_group->group_name = 'group_cartographics';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'mods_image';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_subject';
  $field_group->data = array(
    'label' => 'Cartographics',
    'weight' => '19',
    'children' => array(
      0 => 'field_coordinates',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_cartographics|node|mods_image|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_geographic_information|node|mods_image|form';
  $field_group->group_name = 'group_geographic_information';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'mods_image';
  $field_group->mode = 'form';
  $field_group->parent_name = 'group_subject';
  $field_group->data = array(
    'label' => 'Geographic Information',
    'weight' => '18',
    'children' => array(
      0 => 'field_city',
      1 => 'field_city_section',
      2 => 'field_continent',
      3 => 'field_county',
      4 => 'field_geo_country',
      5 => 'field_province',
      6 => 'field_region',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_geographic_information|node|mods_image|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_origin_information|node|mods_image|form';
  $field_group->group_name = 'group_origin_information';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'mods_image';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Origin Information',
    'weight' => '5',
    'children' => array(
      0 => 'field_country',
      1 => 'field_date_issued',
      2 => 'field_place',
      3 => 'field_publisher',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_origin_information|node|mods_image|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_physical_description|node|mods_image|form';
  $field_group->group_name = 'group_physical_description';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'mods_image';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Physical Description',
    'weight' => '9',
    'children' => array(
      0 => 'field_extent',
      1 => 'field_form',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_physical_description|node|mods_image|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_subject|node|mods_image|form';
  $field_group->group_name = 'group_subject';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'mods_image';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Subject',
    'weight' => '11',
    'children' => array(
      0 => 'field_geographic',
      1 => 'field_temporal',
      2 => 'field_topic',
      3 => 'group_geographic_information',
      4 => 'group_cartographics',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_subject|node|mods_image|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_title_info|node|mods_image|form';
  $field_group->group_name = 'group_title_info';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'mods_image';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Title Info',
    'weight' => '1',
    'children' => array(
      0 => 'field_sub_title',
      1 => 'title',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => '',
        'required_fields' => 1,
      ),
    ),
  );
  $export['group_title_info|node|mods_image|form'] = $field_group;

  return $export;
}
