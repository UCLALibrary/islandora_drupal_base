<?php

/**
 * @file
 * The admin form for the Islandora Saxon module.
 */

/**
 * Defines the admin settings form.
 *
 * @param array $form
 *   The Drupal form definition.
 * @param array $form_state
 *   The Drupal form state.
 *
 * @return array
 *   The Drupal form definition.
 */
function islandora_saxon_admin_form(array $form, array &$form_state) {
  module_load_include('inc', 'islandora', 'includes/utilities');

  $get_default_value = function($name, $default) use(&$form_state) {
    return isset($form_state['values'][$name]) ? $form_state['values'][$name] : variable_get($name, $default);
  };

  $form['islandora_saxon_saxon_configuration'] = array(
    '#type' => 'fieldset',
    '#title' => t('Saxon configuration'),
  );

  $form['islandora_saxon_saxon_configuration']['islandora_saxon_enable_saxon'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Saxon'),
    '#description' => t('Enables the use of XSLT 2.0 in modules that support it.'),
    '#default_value' => variable_get('islandora_saxon_enable_saxon', FALSE),
  );

  $form['islandora_saxon_saxon_configuration']['islandora_saxon_engine_type'] = array(
    '#type' => 'fieldset',
    '#type' => 'select',
    '#title' => t('Saxon processor type'),
    '#states' => array(
      'visible' => array(
        ':input[name="islandora_saxon_enable_saxon"]' => array('checked' => TRUE),
      ),
    ),
    '#default_value' => variable_get('islandora_saxon_engine_type', 'DISABLED'),
    '#multiple' => FALSE,
    '#options' => array(
      'native' => t('Native Library'),
      'servlet' => t('Servlet Engine'),
    ),
  );

  return system_settings_form($form);
}
