/******************************************************************************************************************************

 * @ Original idea by by Binny V A, Original version: 2.00.A 
 * @ http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * @ Original License : BSD
 
 * @ jQuery Plugin by Tzury Bar Yochay 
        mail: tzury.by@gmail.com
        blog: evalinux.wordpress.com
        face: facebook.com/profile.php?id=513676303
        
        (c) Copyrights 2007
        
 * @ jQuery Plugin version Beta (0.0.3)
 * @ License: jQuery-License.
 
TODO:
    add queue support (as in gmail) e.g. 'x' then 'y', etc.
    add mouse + mouse wheel events.

USAGE:
    $.hotkeys.add('Ctrl+c', function(){ alert('copy anyone?');});
    $.hotkeys.add('Ctrl+c', {target:'div#editor', type:'keyup', propagate: true},function(){ alert('copy anyone?');});>
    $.hotkeys.remove('Ctrl+c'); 
    $.hotkeys.remove('Ctrl+c', {target:'div#editor', type:'keypress'}); 
    
******************************************************************************************************************************/
(function (jQuery) {

  this.version = '(beta)(0.0.3)';

  this.all = {};

  this.special_keys = {
    27: 'esc', 9: 'tab', 32:'space', 13: 'return', 8:'backspace', 145: 'scroll', 20: 'capslock', 
    144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',35:'end', 33: 'pageup', 
    34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 112:'f1',113:'f2', 114:'f3', 
    115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 120:'f9', 121:'f10', 122:'f11', 123:'f12'};        

  this.shift_nums = { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", 
    "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", 
    ".":">",  "/":"?",  "\\":"|" };        

  this.add = function(combi, options, callback) {
    if (jQuery.isFunction(options)) {
      callback = options;
      options = {};
    }
    var opt = {};
    var defaults = {type: 'keydown', propagate: false, disableInInput: false, target: 'html'};
    var that = this;
    var opt = jQuery.extend( opt , defaults, options || {} );
    combi = combi.toLowerCase();        
        
    // inspect if keystroke matches
    var inspector = function(event) {
      event = jQuery.event.fix(event); // jQuery event normalization.
      var selector = event.data.selector;
      var element = jQuery(event.target);

      // Disable shortcut keys in Input, Textarea fields
      if(opt['disableInInput'] && element.is('textarea, input')) {
        return;
      }

      var
        code = event.which,
        type = event.type,
        character = String.fromCharCode(code).toLowerCase(),
        special = that.special_keys[code],
        shift = event.shiftKey,
        ctrl = event.ctrlKey,
        alt= event.altKey,
        propagate = true, // default behaivour
        mapPoint = null;

      var cbMap = that.all[selector].events[type].callbackMap;
      if(!shift && !ctrl && !alt) { // No Modifiers
        mapPoint = cbMap[special] ||  cbMap[character]
      }
      
      // deals with combinaitons (alt|ctrl|shift+anything)
      else{
        var modif = '';
        if(alt) modif +='alt+';
        if(ctrl) modif+= 'ctrl+';
        if(shift) modif += 'shift+';
        // modifiers + special keys or modifiers + characters or modifiers + shift characters
        mapPoint = cbMap[modif+special] || cbMap[modif+character] || cbMap[modif+that.shift_nums[character]]
      }

      if (mapPoint){
        mapPoint.cb(event);
        if(!mapPoint.propagate) {
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
      }
    };

    // first hook for this element
    if (!this.all[opt.target]){
      this.all[opt.target] = {events:{}};
    }
    if (!this.all[opt.target].events[opt.type]){
      this.all[opt.target].events[opt.type] = {callbackMap: {}}
      jQuery(opt.target).bind(opt.type, {selector: opt.target}, inspector);
    }
    this.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};                
    return jQuery;
	};    

  this.remove = function(exp, opt) {
    opt = opt || {};
    target = opt.target || 'html';
    type = opt.type || 'keydown';
    exp = exp.toLowerCase();
    jQuery(target).unbind(type);
    delete this.all[target].events[type].callbackMap[exp];
    return jQuery;
	};
	
  jQuery.hotkeys = this;
  return jQuery;    

})(jQuery);;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
(function ($, Drupal, undefined) {

// Store all l10n_client related data + methods in its own object
  Drupal.l10nClient = {
    // Set "selected" string to unselected, i.e. -1
    selected: -1,

    // Keybindings
    keys: {'toggle': 'ctrl+shift+s', 'clear': 'esc'}, // Keybindings

    // Keybinding functions
    key: function (pressed) {
      var $l10nClient = Drupal.l10nClient.$l10nClient;
      switch (pressed) {
        case 'toggle':
          // Grab user-hilighted text & send it into the search filter
          var userSelection = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text;
          userSelection = String(userSelection);
          if (userSelection.length > 0) {
            this.filter(userSelection);
            this.toggle(1);
            $l10nClient.find('.string-search').val(userSelection).focus();
          } else {
            if ($l10nClient.is('.l10n-client-minimized')) {
              this.toggle(1);
              if (!$.browser.safari) {
                $l10nClient.find('.string-search').focus();
              }
            }
            else {
              this.toggle(0);
            }
          }
          break;
        case 'clear':
          this.filter(false);
          break;
      }
    },

    // Toggle the l10nclient
    toggle: function (state) {
      var $l10nClient = Drupal.l10nClient.$l10nClient;
      var $clientWrapper = $('#l10n-client-string-select, #l10n-client-string-editor, #l10n-client .labels .label');
      if (!!state == true) {
        $clientWrapper.show();
        $l10nClient.removeClass('l10n-client-minimized').addClass('l10n-client-maximized').find('.labels .toggle').text('X');
        if (!$.browser.msie) {
          $('body').addClass('toggle-expanded');
        }
        $.cookie('Drupal_l10n_client', '1', {expires: 7, path: '/'});
      } else {
        $clientWrapper.hide();
        $l10nClient.removeClass('l10n-client-maximized').addClass('l10n-client-minimized').find('.labels .toggle').text(Drupal.t('Translate Text'));
        if (!$.browser.msie) {
          $('body').removeClass('toggle-expanded');
        }
        $.cookie('Drupal_l10n_client', '0', {expires: 7, path: '/'});
      }
    },

    // Get a string from the DOM tree
    getString: function (index, type) {
      return $('#l10n-client-data').find('div:eq(' + index + ') .' + type).text();
    },

    // Set a string in the DOM tree
    setString: function (index, data) {
      $('#l10n-client-data').find('div:eq(' + index + ') .target').text(data);
    },

    // Filter the the string list by a search string
    filter: function (search) {
      var $l10nClient = Drupal.l10nClient.$l10nClient;
      var $stringSearch = $l10nClient.find('.string-search');
      var $stringSelect = $('#l10n-client-string-select').find('li');
      if (search === false || search === '') {
        $('#l10n-client-search-filter-clear').focus();
        $stringSelect.show();
        $stringSearch.val('').focus();
      } else if (search.length > 0) {
        $stringSelect.show().not(':contains(' + search + ')').hide();
      }
    }
  };

  // Attaches the localization editor behavior to all required fields.
  Drupal.behaviors.l10nClient = {
    attach: function (context) {
      $('#l10n-client').once('l10n-client', function () {
        $('body').addClass('l10n-client');
        var $l10nClient = $(this);
        var $l10nClientForm = $('#l10n-client-form');
        var $stringEditor = $('#l10n-client-string-editor');
        var $stringEditorSoruceText = $stringEditor.find('.source-text');
        var $stringSelect = $('#l10n-client-string-select');
        var cookie = parseInt($.cookie('Drupal_l10n_client'), 2);
        Drupal.l10nClient.$l10nClient = $l10nClient;
        Drupal.l10nClient.toggle(isNaN(cookie) ? 0 : cookie);

        // If the selection changes, copy string values to the source and target fields.
        // Add class to indicate selected string in list widget.
        $stringSelect.find('li').click(function () {
          var $this = $(this);
          var $lis = $stringSelect.find('li');
          var index = $lis.index(this);

          $lis.removeClass('active');
          $this.addClass('active');

          $stringEditorSoruceText.text(Drupal.l10nClient.getString(index, 'source'));
          $l10nClientForm.find('.translation-target').val(Drupal.l10nClient.getString(index, 'target'));
          $l10nClientForm.find('.source-textgroup').val(Drupal.l10nClient.getString(index, 'textgroup'));
          $l10nClientForm.find('.source-context').val(Drupal.l10nClient.getString(index, 'context'));
          $stringEditor.find('.context').text(Drupal.l10nClient.getString(index, 'context'));

          Drupal.l10nClient.selected = index;
          $l10nClientForm.find('.form-submit').removeAttr("disabled");
        });

        // When l10n_client window is clicked, toggle based on current state.
        $l10nClient.find('.labels .toggle').click(function () {
          Drupal.l10nClient.toggle($l10nClient.is('.l10n-client-minimized'));
        });

        // Copy source text to translation field on button click.
        $l10nClientForm.find('.edit-copy').click(function () {
          $l10nClientForm.find('.translation-target').val($stringEditorSoruceText.text());
          return false;
        });

        // Clear translation field on button click.
        $l10nClientForm.find('.edit-clear').click(function () {
          $l10nClientForm.find('.translation-target').val('');
          return false;
        });

        // Register keybindings using jQuery hotkeys
        if ($.hotkeys) {
          $.hotkeys.add(Drupal.l10nClient.keys.toggle, function () {
            Drupal.l10nClient.key('toggle');
          });
          $.hotkeys.add(Drupal.l10nClient.keys.clear, {target: '#l10n-client .string-search', type: 'keyup'}, function () {
            Drupal.l10nClient.key('clear');
          });
        }

        // Custom listener for l10n_client livesearch
        $l10nClient.find('.string-search').keyup(function () {
          Drupal.l10nClient.filter($l10nClient.find('.string-search').val());
        });

        // Clear search
        $l10nClient.find('#l10n-client-search-filter-clear').click(function () {
          Drupal.l10nClient.filter(false);
          return false;
        });

        // Send AJAX POST data on form submit.
        $l10nClientForm.submit(function () {
          var $this = $(this);

          // Prevent submit empty strings.
          $this.find('.form-submit').attr("disabled", true);
          $this.find('.edit-save').after('<div class="ajax-progress ajax-progress-throbber">' +
            '<div class="throbber">&nbsp;</div><div class="message">' +
            Drupal.t('Please wait...') + '</div></div>');

          $.ajax({
            type: "POST",
            url: $this.attr('action'),
            // Send source and target strings.
            data: {
              source: $stringEditorSoruceText.text(),
              target: $this.find('.translation-target').val(),
              textgroup: $this.find('.source-textgroup').val(),
              context: $stringEditor.find('.context').text(),
              'form_token': $this.find('input[name=form_token]').val()
            },
            success: function (data) {
              var $translationTarget = $l10nClientForm.find('.translation-target');
              var newTranslation = $translationTarget.val();
              // Store string in local js
              Drupal.l10nClient.setString(Drupal.l10nClient.selected, newTranslation);

              // Figure out the display of the new translation in the selection list.
              var newTranslationStripped = newTranslation.replace(/<\/?[^<>]+>/gi, '')
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&amp;/g, "&");

              // Only contains HTML tags (edge case). Keep the whole string.
              // HTML tags will show up in the selector, but that is normal in this case.
              var newTranslationDisplay = newTranslation;
              if (newTranslationStripped.length > 81) {
                // Long translation, strip length to display only first part.
                // We strip at 78 chars and add three dots, if the total length is
                // above 81.
                newTranslationDisplay = newTranslationStripped.substr(0, 78) + '...';
              }

              // Mark string as translated.
              $stringSelect.find('li')
                .eq(Drupal.l10nClient.selected)
                .removeClass('untranslated active')
                .addClass('translated')
                .text(newTranslationDisplay);

              // Empty input fields.
              $stringEditorSoruceText.html(data);
              $translationTarget.val('');
              $this.find('div.ajax-progress-throbber').remove();
            },
            error: function (xmlhttp) {
              alert(Drupal.t('An HTTP error @status occured.', { '@status': xmlhttp.status }));
            }
          });
          return false;
        });
      });
    }
  };
})(jQuery, Drupal);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + Drupal.settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Create Namespace for this application.
 */
Ext.ns('Ext.formbuilder');

/**
 * Application Object.
 */
Ext.formbuilder = (function() {
  var url = window.location.pathname; // Private Variable.
  var that = {
    /**
         * Create all the components required to render this application.
         */
    create: function() {
      /* Create Display Panel: Card Layout */
      this.propertiesForm = this.createPropertiesForm(); // Defined in PropertiesForm.js
      this.elementForm = this.createElementForm(); // Defined in ElementForm.js
      this.previewPanel = this.createPreviewPanel(url); // Defined in PreviewPanel.js
      this.displayPanel = this.createDisplayPanel([this.previewPanel, this.elementForm, this.propertiesForm]); // Defined in DisplayPanel.js
      this.displayPanel.activeItem = 0;// TODO: remove.
      /* Create Tree Panel */
      this.treePanel = this.createTreePanel(); // Defined in TreePanel.js
      this.treePanel.expandAll();
      /* Create Main Panel */
      this.mainPanel = this.createMainPanel([this.treePanel, this.displayPanel]); // Defined in MainPanel.js
    //this.createToolTips(); // Defined in Tooltips.js
    },
    /**
         * Creates an array based store.
         */
    createArrayStore: function () {
      return new Ext.data.Store({
        model: 'ArrayModel'
      });
    },
    /**
         * Creates a map based store.
         */
    createMapStore: function () {
      return new Ext.data.Store({
        model: 'MapModel'
      });
    },
    /**
     *
     */
    showPreview: function () {
      this.refreshPreviewPanel(url);
    },
    /**
     *
     */
    showElementForm: function () {
      var display = this.displayPanel.layout;
      display.setActiveItem(1);
      var element = Ext.getCmp('xml-form-builder-element-form-tab-panel');
      element.setActiveTab(0);
    },
    /**
     *
     */
    showPropertiesForm: function () {
      var display = this.displayPanel.layout;
      display.setActiveItem(2);
      var record = Ext.formbuilder.propertiesStore.getAt(0);
      var form = this.propertiesForm.getForm();
      form.loadRecord(record);
      var namespaces = [];
      if(record.data['namespaces'] instanceof Object) {
        jQuery.each(record.data['namespaces'], function(i, n) {
          namespaces.push({
            key: i,
            value: n
          });
        });
      }
      Ext.getCmp('namespaces').store.loadData(namespaces, false);
    },
    saveElementForm: function() {
      var form = this.elementForm.getForm();
      if (form.isValid()) {
        var record = form.getRecord();
        record.beginEdit();
        if(record.store === undefined) { // Store is undefined when the element is removed.
          return;
        }
        // Normal Form Fields
        var values = form.getValues();
        for(var i in values) {
          if(record.data[i] !== undefined) {
            record.set(i, values[i]);
          }
        }
        if(values['required'] === undefined) { // Hack
          record.set('required', false);
        }
        /* Form Array Grids */
        var form_array_grids = [ 'element_validate', 'process', 'pre_render', 'post_render', 'after_build', 'submit', 'validate' ];
        var toArray = function(store) {
          var output = [];
          store.each(function(item){
            item = item.data;
            output.push(item.value);
          });
          return output;
        }
        Ext.Array.each(form_array_grids, function(name) {
          var store = Ext.getCmp(name).store;
          record.set(name, toArray(store));
        });
        /* Form Map Grids */
        var form_map_grids = [ 'attributes', 'options', 'user_data' ];
        var toObject = function(store) {
          var output = {};
          store.each(function(item){
            item = item.data;
            output[item.key] = item.value;
          });
          return output;
        }
        Ext.Array.each(form_map_grids, function(name) {
          var store = Ext.getCmp(name).store;
          record.set(name, toObject(store));
        });
        /* Ahah */
        if(values['ahah'] == "on") {
          var ahah = {
            effect: values['ahah_effect'],
            event: values['ahah_event'],
            method: values['ahah_method'],
            path: values['ahah_path'],
            wrapper: values['ahah_wrapper'],
            keypress: values['ahah_keypress']
          };
          if(values['ahah_progress'] == "on") {
            ahah.progress = {
              type: values['ahah_progress_type'],
              message: values['ahah_progress_message'],
              url: values['ahah_progress_url'],
              interval: values['ahah_progress_interval']
            };
          }
          record.set('ahah', ahah);
        }
        var actions = {};
        var has_actions = false;
        if(values['actions_create'] == "on" && !form.findField('actions_create').disabled) {
          has_actions = true;
          actions.create = {
            context: values['actions_create_context'],
            path: values['actions_create_path'],
            schema: values['actions_create_schema'],
            type: values['actions_create_type'],
            value: values['actions_create_value']
          };
        }
        if(values['actions_read'] == "on" && !form.findField('actions_create').disabled) {
          has_actions = true;
          actions.read = {
            context: values['actions_read_context'],
            path: values['actions_read_path']
          };
        }
        if(values['actions_update'] == "on" && !form.findField('actions_create').disabled) {
          has_actions = true;
          actions.update = {
            context: values['actions_update_context'],
            path: values['actions_update_path'],
            schema: values['actions_update_schema']
          };
        }
        if(values['actions_delete'] == "on" && !form.findField('actions_create').disabled) {
          has_actions = true;
          actions['delete'] = {
            context: values['actions_delete_context'],
            path: values['actions_delete_path']
          };
        }
        if(has_actions) {
          record.set('actions', actions);
        }
        else {
          record.set('actions', undefined);
        }
        record.set('text', values.key + ' (' + values.type + ')');
        record.endEdit();
        record.commit();
        record.store.sync();
        Ext.formbuilder.elementStore.sync();
      }
    },
    savePropertiesForm: function() {
      var form = this.propertiesForm.getForm();
      if (form.isValid()) {
        var record = form.getRecord();
        // Start
        record.beginEdit();
        // Normal form fields
        var values = form.getValues();
        for(var i in values) {
          record.set(i, values[i]);
        }
        // Grids
        var toObject = function(store) {
          var output = {};
          store.each(function(item){
            item = item.data;
            output[item.key] = item.value;
          });
          return output;
        }
        var store = Ext.getCmp('namespaces').store;
        record.set('namespaces', toObject(store));
        // End
        record.endEdit();
      }
    }
  };
  return that;
})();

/**
* Run the application.
*/
Ext.onReady(function() {
  Ext.formbuilder.create();
});
;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * A grid that can be used to enter information in a form. 
 * Requires some extra logic to be populated and submitted.
 */
Ext.define('Form.Grid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.formgrid',
  initComponent: function() {
    var me = this;
    Ext.apply(me, {
      height: 200,
      collapsible: true,
      iconCls: 'icon-grid',
      selType: 'rowmodel',
      plugins:[ Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2
      }) ],
      viewConfig: {
        plugins: {
          ptype: 'gridviewdragdrop',
          dragText: Drupal.t('Drag and drop to reorganize')
        }
      },
      dockedItems: [{
        xtype: 'toolbar',
        items: [{
          iconCls: 'icon-add',
          text: Drupal.t('Add'),
          scope: this,
          handler: function() {
            var rec = Ext.ModelManager.create(me.modelInitTmpl, me.store.model.modelName);
            var plugin = me.getPlugin();
            plugin.cancelEdit();
            this.store.insert(0, rec);
            plugin.startEdit(rec, me.columns[0]);
          }
        }, {
          iconCls: 'icon-delete',
          text: Drupal.t('Delete'),
          disabled: true,
          itemId: 'delete',
          scope: this,
          handler: function() {
            var selection = me.getView().getSelectionModel().getSelection()[0];
            if (selection) {
              this.store.remove(selection);
            }
          }
        }]
      }],
      listeners: {
        selectionchange: function(selModel, selections) {
          this.down('#delete').setDisabled(selections.length === 0);
        }
      }
    });
    me.callParent();
  }
});
;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.formbuilder.createToolTips = function() {  
    Ext.QuickTips.init();
};;
/**
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var types = Ext.data.Types;


Ext.define('ArrayModel', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }  
    },
    fields: [{
        name: 'value', // This objects key in the form elements array.
        type: 'string',
        defaultValue: ''
    }]
});


Ext.define('MapModel', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }  
    },
    fields: [{
        name: 'key', // This objects key in the form elements array.
        type: 'string',
        defaultValue: ''
    }, {
        name: 'value', // This objects key in the form elements array.
        type: 'string',
        defaultValue: ''
    }]
});

/**
 * PHP Map object.
 */
Ext.data.Types.MAP = {
    type: 'map',
    convert: function(v, data) {
        if(v instanceof Object) {
          var obj = {};
          for(key in v) {
            if(key == '') {
              obj.NULL = v[key];  
            }
            else {
              obj[key] = v[key];
            }
          }
          return obj;
        } 
        return {};
    }
};
/**
 *
 */
Ext.data.Types.AHAH_PROCESS = {
    type: 'AHAH_PROCESS',
    fields: [{
        name: 'type',
        type: 'string'
    }, {
        name: 'message',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'interval',
        type: 'string'
    }]
}
/**
 *
 */
Ext.data.Types.AHAH = {
    type: 'AHAH',
    fields: [{
        name: 'effect',
        type: 'string'
    }, {
        name: 'event',
        type: 'string'
    }, {
        name: 'method',
        type: 'string'
    }, {
        name: 'path',
        type: 'string'
    }, {
        name: 'wrapper',
        type: 'string'
    }, {
        name: 'keypress',
        type: 'boolean'
    }, {
        name: 'process',
        type: types.AHAH_PROCESS
    }]
}

/**
 * Form Element Model
 */
Ext.define('Element', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }  
    },
    fields: [{
        name: 'key', // This objects key in the form elements array.
        type: 'string',
        defaultValue: 'new element'
    }, {
        name: 'text', // The title that appears on the tree view.
        type: 'string',
        defaultValue: 'new element'
    }, {
        name: 'type', // The type of form element this is.
        type: 'string',
        defaultValue: 'textfield'
    }, {
        name: 'access', // Access Form Control
        type: 'boolean',
        defaultValue: true
    }, {
        name: 'after_build', // After Build Form Control
        type: 'array'
    }, {
        name: 'ahah', 
        type: types.AHAH
    }, {
        name: 'attributes',
        type: types.MAP
    }, {
        name: 'autocomplete_path',
        type: 'string'
    }, {
        name: 'button_type',
        type: 'string'
    }, {
        name: 'collapsed',
        type: 'boolean'
    }, {
        name: 'collapsible',
        type: 'boolean'
    }, {
        name: 'cols'
    }, {
        name: 'default_value',
        type: 'string'
    }, {
        name: 'delta'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'disabled',
        type: 'boolean'
    }, {
        name: 'element_validate',
        type: 'array'
    }, {
        name: 'executes_submit_callback',
        type: 'boolean'
    }, {
        name: 'field_prefix',
        type: 'string'
    }, {
        name: 'field_suffix',
        type: 'string'
    }, {
        name: 'maxlength'
    }, {
        name: 'method',
        type: 'string'
    }, {
        name: 'multiple',
        type: 'boolean'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'options',
        type: types.MAP
    }, {
        name: 'post_render',
        type: 'array'
    }, {
        name: 'prefix',
        type: 'string'
    }, {
        name: 'pre_render',
        type: 'array'
    }, {
        name: 'process',
        type: 'array'
    }, {
        name: 'required',
        type: 'boolean'
    }, {
        name: 'resizable',
        type: 'boolean'
    }, {
        name: 'return_value',
        type: 'string'
    }, {
        name: 'rows'
    }, {
        name: 'size'
    }, {
        name: 'src',
        type: 'string'
    }, {
        name: 'submit',
        type: 'array'
    }, {
        name: 'suffix',
        type: 'string'
    }, {
        name: 'theme',
        type: 'string'
    }, {
        name: 'title',
        type: 'string'
    }, {
        name: 'tree',
        type: 'boolean',
        defaultValue: true
    }, {
        name: 'validate',
        type: 'array'
    }, {
        name: 'value',
        type: 'string'
    }, {
        name: 'weight'
    }, {
        name: 'user_data',
        type: types.MAP
    }, {
        name: 'actions'
    }],
    associations: [{
        type: 'hasMany',
        model: 'Element',
        associationKey: 'children'
    }, {
        type: 'belongsTo',
        model: 'Element',
        associatedKey: 'parent'
    }]
});

;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var types = Ext.data.Types; 

/**
 * Form Properties Model
 */
Ext.define('Properties', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }  
    },
    fields: [{
        name: 'localName',
        type: 'string'
    }, {
        name: 'prefix',
        type: 'string'
    }, {
        name: 'uri',
        type: 'string'  
    }, {
        name: 'namespaces',
        type: types.MAP
    }, {
        name: 'schema',
        type: 'string'
    }]
});

;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Create the Application
 */
Ext.formbuilder.save = function(showPreview) {
    Ext.formbuilder.savePropertiesForm();
    Ext.formbuilder.saveElementForm();
    var url = window.location.pathname + '/save';
    var properties_record = Ext.formbuilder.propertiesStore.getAt(0);
    var data = {
        properties: properties_record.data, 
        elements: []
    };
    var root = Ext.formbuilder.elementStore.getRootNode();//.getChildAt(0);
    root.eachChild(function(child) {
        var elements = this;
        elements.push(child.data);
        var last = elements.length-1;
        this[last].elements = [];
        child.eachChild(arguments.callee, elements[last].elements);
    }, data.elements);
    Ext.Ajax.request({
        url: url,
        params: {
            data: Ext.encode(data)
        },
        success: function(response) {
            if(showPreview) {
                Ext.formbuilder.showPreview();
            }
        }
    });
};

/**
 * Create
 */
Ext.formbuilder.createMainPanel = function(children){
    return Ext.create('Ext.panel.Panel', {
        width: 960,
        height: 820,
        title: Drupal.t('Form Editor'),
        layout: 'border',
        renderTo: 'xml-form-builder-editor',
        items: children,
        defaults: {
            margin: '1 0 1 0',
            frame: true
        },
        tbar: {
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: Drupal.t('Form Properties'),
                handler: function() {
                    Ext.formbuilder.showPropertiesForm();
                }
            },{
                xtype: 'tbfill'
            },{
                xtype: 'button',
                text: Drupal.t('Save & Preview'),
                handler: function() {
                    Ext.formbuilder.save(true);
                }
            },{
                xtype: 'tbseparator'
            },{
                xtype: 'button',
                text: Drupal.t('Save'),
                handler: function() {
                    Ext.formbuilder.save(false);
                }
            }]
        }
    });
};
;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * 
 */
Ext.formbuilder.createDisplayPanel = function (children) {
    return Ext.create('Ext.panel.Panel', {
        id: 'xml-form-builder-display',
        region: 'center',
        layout: 'card',
        margin: '1 1 1 0',
        activeItem: 2,
        unstyled: true,
        defaults: {
            bodyStyle: 'padding:15px'
        },
        items: children
    });
};
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.formbuilder.createTreePanel = function() {
  return Ext.create('Ext.tree.Panel', {
    viewConfig: {
      plugins: {
        ptype: 'treeviewdragdrop'
      }
    },
    title: Drupal.t('Elements'),
    store: this.elementStore,
    region: 'west',
    width: 230,
    margin: '1 0 1 1',
    autoScroll: true,
    rootVisible: false,
    split: true,
    tbar: {
      xtype: 'toolbar',
      items: [{
        xtype: 'button',
        text: Drupal.t('Add'),
        handler: function() {
          var tree = Ext.formbuilder.treePanel;
          var selectionModel = tree.getSelectionModel();
          var selection = selectionModel.getSelection();
          if(selection.length > 0) {
            var element = new Element({
              children: []
            });
            var selected = selection[0];
            var node = selected.createNode(element);
            selected.appendChild(node);
            selected.expand();
            selectionModel.select(node);
          }
        }
      }, {
        xtype: 'button',
        text: Drupal.t('Copy'),
        handler: function() {
          var tree = Ext.formbuilder.treePanel;
          var selectionModel = tree.getSelectionModel();
          var selection = selectionModel.getSelection();
          if(selection.length > 0) {
            Ext.formbuilder.treePanel.clipboard = selection[0];
          }
        }
      }, {
        xtype: 'button',
        text: Drupal.t('Paste'),
        handler: function() {
          var tree = Ext.formbuilder.treePanel;
          var selectionModel = tree.getSelectionModel();
          var selection = selectionModel.getSelection();
          var source = Ext.formbuilder.treePanel.clipboard;
          if(selection.length > 0 && source) {
            var selected = selection[0];
            var node = source.copy();
            Ext.data.Model.id(node);
            selected.appendChild(node);
            selected.expand();
            selectionModel.select(node);
          }
        }
      }, {
        xtype: 'button',
        text: Drupal.t('Delete'),
        handler: function() {
          var tree = Ext.formbuilder.treePanel;
          var selectionModel = tree.getSelectionModel();
          var selection = selectionModel.getSelection();
          if(selection.length > 0) {
            var selected = selection[0];
            selected.remove(true);
          }
        }
      }]
    },
    listeners: {
      itemmousedown: function() {
        Ext.formbuilder.showElementForm();
      },
      selectionchange: function(view, selections) {
        Ext.formbuilder.saveElementForm();
        if(selections.length > 0) {
          var record = selections[0];
          var form = Ext.formbuilder.elementForm.getForm();
          //var data = Ext.clone(record.data);
          var data = record.data;
          form.reset();
          form.loadRecord(record);
          //attributes
          var form_grids = [ 'attributes', 'element_validate', 'process', 'pre_render', 'post_render', 'after_build', 'options', 'user_data', 'submit', 'validate'];
          Ext.Array.each(form_grids, function(name) {
            var converted = [];
            if(data[name] instanceof Object) {
              jQuery.each(data[name], function(i, n) {
                converted.push({
                  key: i,
                  value: n
                });
              });
            }
            else if(data[name] instanceof Array) {
              jQuery.each(data[name], function(i, n) {
                converted.push({
                  value: n
                });
              });
            }
            Ext.getCmp(name).store.loadData(converted, false);
          });
          /* Ahah */
          var ahah = data.ahah;
          if(ahah !== undefined && ahah != "") {
            var values = {
              ahah: "on",
              ahah_effect: ahah.effect,
              ahah_event: ahah.event,
              ahah_method: ahah.method,
              ahah_path: ahah.path,
              ahah_wrapper: ahah.wrapper,
              ahah_keypress: ahah.keypress
            };
            if(ahah.progress !== undefined && ahah.progress != "") {
              var progress = ahah.progress;
              values.ahah_progress = "on";
              values.ahah_progress_type = progress.type;
              values.ahah_progress_message = progress.message;
              values.ahah_progress_url = progress.url;
              values.ahah_progress_interval = progress.interval;
            }
            else {
              Ext.getCmp('ahah_progress').collapse();
            }
            form.setValues(values);
          }
          else {
            Ext.getCmp('ajax').collapse();
            Ext.getCmp('ahah_progress').collapse();
          }
          var actions = data.actions;
          if(actions !== undefined && actions != "") {
            if(actions.create !== undefined && actions.create != "" && actions.create !== null) {
              var create = actions.create;
              var values = {
                actions_create: "on",
                actions_create_context: create.context,
                actions_create_path: create.path,
                actions_create_schema: create.schema,
                actions_create_type: create.type,
                actions_create_value: create.value
              };
              form.setValues(values);
            }
            else {
              Ext.getCmp('actions_create').collapse();
            }
            if(actions.read !== undefined && actions.read != "" && actions.read !== null) {
              var read = actions.read;
              var values = {
                actions_read: "on",
                actions_read_context: read.context,
                actions_read_path: read.path
              };
              form.setValues(values);
            }
            else {
              Ext.getCmp('actions_read').collapse();
            }
            if(actions.update !== undefined && actions.update != "" && actions.update !== null) {
              var update = actions.update;
              var values = {
                actions_update: "on",
                actions_update_context: update.context,
                actions_update_path: update.path,
                actions_update_schema: update.schema
              };
              form.setValues(values);
            }
            else {
              Ext.getCmp('actions_update').collapse();
            }
            if(actions['delete'] !== undefined && actions['delete'] != "" && actions['delete'] !== null) {
              var remove = actions['delete'];
              var values = {
                actions_delete: "on",
                actions_delete_context: remove.context,
                actions_delete_path: remove.path
              };
              form.setValues(values);
            }
            else {
              Ext.getCmp('actions_delete').collapse();
            }
          }
          else {
            Ext.getCmp('actions_create').collapse();
            Ext.getCmp('actions_read').collapse();
            Ext.getCmp('actions_update').collapse();
            Ext.getCmp('actions_delete').collapse();
          }

        }
        // Load by name...
        Ext.formbuilder.enableDisableXMLFields();
        Ext.formbuilder.showElementForm();
      }
    }
  });
}
;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.formbuilder.enableDisableXMLFields = function() {
  var actions = [
    'actions_create',
    'actions_read',
    'actions_update',
    'actions_delete'
  ];
  var not_supported = [
    'checkbox', 'checkboxes', 'date', 'file', 'managed_file',
    'password_confirm', 'radio', 'radios', 'tableselect',
    'vertical_tabs', 'weight', 'button', 'image_button', 'submit'
  ];
  var value = Ext.getCmp('type').getValue();
  if (Ext.Array.contains(not_supported, value) ||
      (value == 'select' && Ext.getCmp('multiple').getValue() == true)) {
    Ext.Array.each(actions, function(action)  {
      Ext.getCmp(action).cascade(function(c) {
        if (c.isFormField)
          c.disable();
      }).disable();
    });
  }
  else {
    Ext.Array.each(actions, function(action)  {
      Ext.getCmp(action).cascade(function(c) {
        if (c.isFormField)
          c.enable();
      }).enable();
    });
  }
};

/**
 * Create a Form for Manipulating Element data.
 */
Ext.formbuilder.createElementForm = function () {
  return Ext.create('Ext.form.Panel', {
    id: 'xml-form-builder-element-form',
    title: Drupal.t('Element Form'),
    region: 'center',
    frame: true,
    margin: '1 1 1 0',
    items: [{
      xtype: 'textfield',
      id: 'key',
      name: 'key',
      fieldLabel: Drupal.t('Identifier'),
      width: 640,
      regex: /^[^!"#$%&'()*+,.\/\\:;<=>?@[\]^`{|}~]+$/,
      regexText: "Invalid Identifier it must not contain (^!\"#$%&'()*+,.\/:;<=>?@[\]^`{|}~)",
      listeners: {
        render: function() {
          Ext.create('Ext.tip.ToolTip', {
            target: 'key',
            anchor: 'left',
            html: Drupal.t('Identifies this form element. It is used as the Drupal form array key for this element.')
          });
        }
      }
    }, {
      xtype: 'tabpanel',
      height: 640,
      id: 'xml-form-builder-element-form-tab-panel',
      plain: true,
      unstyled: true,
      defaults: {
        frame: true
      },
      items:[{
        title: Drupal.t('Common Form Controls'),
        collapsible: true,
        autoScroll: true,
        items: [{
          xtype: 'combobox',
          id: 'type',
          name: 'type',
          store: this.elementTypeStore,
          displayField: 'display',
          valueField: 'value',
          fieldLabel: Drupal.t('Type'),
          queryMode: 'local',
          editable: false,
          allowBlank: false,
          listeners: {
            select: function(combo, records, eOpts) {
              Ext.formbuilder.enableDisableXMLFields();
            },
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'type',
                anchor: 'left',
                html: Drupal.t('<h3><a name="type" id="type"></a>#type</h3>'+
                               '<p><strong>Used by</strong>: All</p>' +
                               '<p><strong>Description</strong>: Used to determine the type of form element.</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'title',
          name: 'title',
          fieldLabel: Drupal.t('Title'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'title',
                anchor: 'left',
                html: Drupal.t('<h3><a name="title" id="title"></a>#title</h3>' +
                               '<p><strong>Used by</strong>: <a href="#checkbox">checkbox</a>, <a href="#checkboxes">checkboxes</a>, <a href="#date">date</a>, <a href="#fieldset">fieldset</a>, <a href="#file">file</a>, <a href="#item">item</a>, <a href="#password">password</a>, <a href="#password_confirm">password_confirm</a>, <a href="#radio">radio</a>, <a href="#radios">radios</a>, <a href="#select">select</a>, <a href="#textarea">textarea</a>, <a href="#textfield">textfield</a>, <a href="#weight">weight</a></p>' +
                               '<p><strong>Description</strong>: The title of the form element.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'textarea',
          id: 'description',
          name: 'description',
          fieldLabel: Drupal.t('Description'),
          width: 500,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'description',
                anchor: 'left',
                html: Drupal.t('<h3><a name="description" id="description"></a>#description</h3>' +
                               '<p><strong>Used by</strong>: <a href="#checkbox">checkbox</a>, <a href="#checkboxes">checkboxes</a>, <a href="#date">date</a>, <a href="#fieldset">fieldset</a>, <a href="#file">file</a>, <a href="#item">item</a>, <a href="#password">password</a>, <a href="#password_confirm">password_confirm</a>, <a href="#radio">radio</a>, <a href="#radios">radios</a>, <a href="#select">select</a>, <a href="#textarea">textarea</a>, <a href="#textfield">textfield</a>, <a href="#weight">weight</a></p>' +
                               '<p><strong>Description</strong>: The description of the form element. Make sure to enclose inside the <a href="http://api.drupal.org/api/function/t">t</a>() function so that this property can be translated.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        },  {
          xtype: 'textfield',
          id: 'default_value',
          name: 'default_value',
          fieldLabel: Drupal.t('Default Value'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'default_value',
                anchor: 'left',
                html: Drupal.t('<h3><a name="default_value" id="default_value"></a>#default_value</h3>' +
                               '<p><strong>Used by</strong>: <a href="#checkbox">checkbox</a>, <a href="#checkboxes">checkboxes</a>, <a href="#date">date</a>, <a href="#hidden">hidden</a>, <a href="#radio">radio</a>, <a href="#radios">radios</a>, <a href="#select">select</a>, <a href="#textarea">textarea</a>, <a href="#textfield">textfield</a>, <a href="#token">token</a>, <a href="#weight">weight</a></p>' +
                               '<p><strong>Description</strong>: The value of the form element that will be displayed or selected initially if the form has not been submitted yet. <strong>Should NOT be confused with</strong> <strong><a href="#value">#value</a></strong>, which is a hard-coded value that the user cannot change!</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'required',
          name: 'required',
          fieldLabel: Drupal.t('Required'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'required',
                anchor: 'left',
                html: Drupal.t('<h3><a name="required" id="required"></a>#required</h3>' +
                               '<p><strong>Used by</strong>: <a href="#checkbox">checkbox</a>, <a href="#checkboxes">checkboxes</a>, <a href="#date">date</a>, <a href="#file">file</a>, <a href="#password">password</a>, <a href="#password_confirm">password_confirm</a>, <a href="#radio">radio</a>, <a href="#radios">radios</a>, <a href="#select">select</a>, <a href="#textarea">textarea</a>, <a href="#textfield">textfield</a>, <a href="#weight">weight</a></p>' +
                               '<p><strong>Description</strong>: Indicates whether or not the element is required. This automatically validates for empty fields and flags inputs as required. File fields are <strong>NOT</strong> allowed to be required.</p>' +
                               '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype:'fieldset',
          checkboxToggle: true,
          collapsed: true,
          title: Drupal.t('Create'),
          id: 'actions_create',
          checkboxName: 'actions_create',
          items: [{
            xtype: 'combobox',
            fieldLabel: Drupal.t('Path Context'),
            displayField: 'display',
            valueField: 'value',
            editable: false,
            allowBlank: false,
            queryMode: 'local',
            value: 'document',
            id: 'actions-create-context',
            name: 'actions_create_context',
            store: new Ext.data.Store({
              storeId: 'ElementTypes',
              fields: ['display', 'value'],
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json'
                }
              },
              data: [{
                display:'document',
                value:'document'
              },{
                display:'parent',
                value:'parent'
              }]
            }),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-create-context',
                  anchor: 'left',
                  html: Drupal.t('<h3>Create - Context</h3>' +
                                 '<p class="help">The context in which the path will be executed.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            fieldLabel: Drupal.t('Path'),
            name: 'actions_create_path',
            id: 'actions-create-path',
            width: 600,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-create-path',
                  anchor: 'left',
                  html: Drupal.t('<h3>Create - Path</h3>' +
                                 '<p class="help">An XPath expression to this element\'s parent. Used to detemine where this element will be inserted.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            fieldLabel: Drupal.t('Schema'),
            name: 'actions_create_schema',
            id: 'actions-create-schema',
            width: 600,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-create-schema',
                  anchor: 'left',
                  html: Drupal.t('<h3>Create - Schema</h3>' +
                                 '<p class="help">An XPath exporession to the definition of this element\'s parent. The XPath expression is executed in the schema defined in this form\'s properties. This is used to determine the insert order for this element.</p>')
                });
              }
            }
          }, {
            xtype: 'combobox',
            fieldLabel: Drupal.t('Type'),
            displayField: 'display',
            valueField: 'value',
            editable: false,
            allowBlank: false,
            queryMode: 'local',
            value: 'document',
            name: 'actions_create_type',
            id: 'actions-create-type',
            value: 'element',
            store: new Ext.data.Store({
              storeId: 'ElementTypes',
              fields: ['display', 'value'],
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json'
                }
              },
              data: [{
                display:'element',
                value:'element'
              }, {
                display:'attribute',
                value:'attribute'
              }, {
                display:'xml',
                value:'xml'
              }]
            }),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-create-type',
                  anchor: 'left',
                  html: Drupal.t('<h3>Create - Type</h3>' +
                                 '<p class="help">The type of node that will be created. If XML is specified, an XML snippet is expected in the value field.</p>')
                });
              }
            }
          }, {
            xtype: 'textarea',
            fieldLabel: Drupal.t('Value'),
            name: 'actions_create_value',
            id: 'actions-create-value',
            width: 600,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-create-value',
                  anchor: 'left',
                  html: Drupal.t('<h3>Create - Value</h3>' +
                                 '<p class="help">If the type is either Element or Attribute, the name of the element or attribute is expected. If the type is XML, an XML snippet is expected. The value of the form field will be inserted wherever the string %value% is used in the XML snippet.</p>')
                });
              }
            }
          }]
        }, {
          xtype:'fieldset',
          checkboxToggle: true,
          collapsed: true,
          title: Drupal.t('Read'),
          id: 'actions_read',
          checkboxName: 'actions_read',
          items: [{
            xtype: 'combobox',
            fieldLabel: Drupal.t('Path Context'),
            displayField: 'display',
            valueField: 'value',
            editable: false,
            allowBlank: false,
            queryMode: 'local',
            value: 'document',
            name: 'actions_read_context',
            id: 'actions-read-context',
            store: new Ext.data.Store({
              storeId: 'ElementTypes',
              fields: ['display', 'value'],
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json'
                }
              },
              data: [{
                display:'document',
                value:'document'
              },{
                display:'parent',
                value:'parent'
              }]
            }),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-read-context',
                  anchor: 'left',
                  html: Drupal.t('<h3>Read - Context</h3>' +
                                 '<p class="help">The context in which the path will be executed.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            fieldLabel: Drupal.t('Path'),
            name: 'actions_read_path',
            id: 'actions-read-path',
            width: 600,
            listeners: { //The context in which the path will be executed in.
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-read-path',
                  anchor: 'left',
                  html: Drupal.t('<h3>Read - Path</h3>' +
                                 '<p class="help">An XPath expression to the node this form field repersents. The node\'s value will be used to automatically populate this form field. The node selected by this XPath expression can be used as the self context for the \'update\' and \'delete\' actions.</p>')
                });
              }
            }
          }]
        }, {
          xtype:'fieldset',
          checkboxToggle: true,
          collapsed: true,
          title: Drupal.t('Update'),
          id: 'actions_update',
          checkboxName: 'actions_update',
          items: [{
            xtype: 'combobox',
            fieldLabel: Drupal.t('Path Context'),
            displayField: 'display',
            valueField: 'value',
            editable: false,
            allowBlank: false,
            queryMode: 'local',
            value: 'self',
            name: 'actions_update_context',
            id: 'actions-update-context',
            store: new Ext.data.Store({
              storeId: 'ElementTypes',
              fields: ['display', 'value'],
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json'
                }
              },
              data: [{
                display:'document',
                value:'document'
              },{
                display:'parent',
                value:'parent'
              },{
                display:'self',
                value:'self'
              }]
            }),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-update-context',
                  anchor: 'left',
                  html: Drupal.t('<h3>Update - Context</h3>' +
                                 '<p class="help">The context in which the path will be executed.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            fieldLabel: Drupal.t('Path'),
            value: 'self::node()',
            name: 'actions_update_path',
            id: 'actions-update-path',
            width: 600,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-update-path',
                  anchor: 'left',
                  html: Drupal.t('<h3>Update - Path</h3>' +
                                 '<p class="help">An XPath expression used to select one or more existing nodes within the document to update. The selected nodes values will be replaced by the value in the this form field.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            fieldLabel: Drupal.t('Schema'),
            name: 'actions_update_schema',
            id: 'actions-update-schema',
            width: 600,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-update-schema',
                  anchor: 'left',
                  html: Drupal.t('<h3>Update - Schema</h3>' +
                                 '<p class="help">An XPath expression to the definition of this element. The XPath expression is executed in the schema defined in this form\'s properties. This is used to automatically validate submitted values for this form field.</p>')
                });
              }
            }
          }]
        }, {
          xtype:'fieldset',
          checkboxToggle: true,
          collapsed: true,
          title: Drupal.t('Delete'),
          id: 'actions_delete',
          checkboxName: 'actions_delete',
          items: [{
            xtype: 'combobox',
            fieldLabel: Drupal.t('Path Context'),
            displayField: 'display',
            valueField: 'value',
            editable: false,
            allowBlank: false,
            queryMode: 'local',
            value: 'self',
            name: 'actions_delete_context',
            id: 'actions-delete-context',
            store: new Ext.data.Store({
              storeId: 'ElementTypes',
              fields: ['display', 'value'],
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json'
                }
              },
              data: [{
                display:'document',
                value:'document'
              },{
                display:'parent',
                value:'parent'
              },{
                display:'self',
                value:'self'
              }]
            }),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-delete-context',
                  anchor: 'left',
                  html: Drupal.t('<h3>Delete - Context</h3>' +
                                 '<p class="help">The context in which the path will be executed.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            fieldLabel: Drupal.t('Path'),
            value: 'self::node()',
            name: 'actions_delete_path',
            id: 'actions-delete-path',
            width: 600,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'actions-delete-path',
                  anchor: 'left',
                  html: Drupal.t('<h3>Delete - Path</h3>' +
                                 '<p class="help">An XPath expression used to select one or more existing nodes within the document to delete. The selected nodes will be removed from the document.</p>')
                });
              }
            }
          }]
        }]
      }, {
        title: Drupal.t('Advanced Form Controls'),
        autoScroll: true,
        items: [{
          xtype: 'checkbox',
          id: 'access',
          name: 'access',
          fieldLabel: Drupal.t('Access'),
          checked: true,
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'access',
                anchor: 'left',
                html:  Drupal.t('<h3><a name="access" id="access"></a>#access</h3>' +
                                '<p><strong>Used by</strong>: All elements and forms</p>' +
                                '<p><strong>Description</strong>: Defines whether the element is accessible or not. When FALSE, the element is not rendered and the user-submitted value is not taken into consideration.</p>' +
                                '<p><strong>Values</strong>: TRUE or FALSE.</p>')
              });
            }
          }
        }, {

          xtype: 'textfield',
          id: 'autocomplete_path',
          name: 'autocomplete_path',
          fieldLabel: Drupal.t('Autocomplete Path'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'autocomplete_path',
                anchor: 'left',
                html: Drupal.t('<h3><a name="autocomplete_path" id="autocomplete_path"></a>#autocomplete_path</h3>' +
                               '<p><strong>Used by</strong>: <a href="#textfield">textfield</a></p>' +
                               '<p><strong>Description</strong>: The path that the AJAX autocomplete script uses as the source for autocompletion.</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'button_type',
          name: 'button_type',
          fieldLabel: Drupal.t('Button Type'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'button_type',
                anchor: 'left',
                html: Drupal.t('<h3><a name="button_type" id="button_type"></a>#button_type</h3>' +
                               '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#image_button">image_button</a>, <a href="#submit">submit</a></p>' +
                               '<p><strong>Description</strong>: Adds a CSS class to the button, in the form <em>form-[button_type_value]</em>. Note that this does NOT set the HTML attribute <em>type</em> of the button.</p>' +
                               '<p class="help"><strong>Values</strong>: String </p>')
              });
            }
          }
        }, {
          xtype: 'numberfield',
          id: 'cols',
          name: 'cols',
          fieldLabel: Drupal.t('Cols'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'cols',
                anchor: 'left',
                html: Drupal.t('<h3><a name="cols" id="cols"></a>#cols</h3>' +
                               '<p><strong>Used by</strong>: <a href="#textarea">textarea</a></p>' +
                               '<p><strong>Description</strong>: Defines how many columns the textarea should contain (see also <a href="#rows">#rows</a>).</p>' +
                               '<p><strong>Values</strong>: A positive number</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'disabled',
          name: 'disabled',
          fieldLabel: Drupal.t('Disabled'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'disabled',
                anchor: 'left',
                html: Drupal.t('<h3><a name="disabled" id="disabled"></a>#disabled</h3>' +
                               '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#checkbox">checkbox</a>, <a href="#checkboxes">checkboxes</a>, <a href="#date">date</a>, <a href="#file">file</a>, <a href="#image_button">image_button</a>, <a href="#password">password</a>, <a href="#password_confirm">password_confirm</a>, <a href="#radio">radio</a>, <a href="#radios">radios</a>, <a href="#select">select</a>, <a href="#submit">submit</a>, <a href="#textarea">textarea</a>, <a href="#textfield">textfield</a>, <a href="#weight">weight</a></p>' +
                               '<p><strong>Description</strong>: Disables (greys out) a form input element. Note that disabling a form field doesn\'t necessarily prevent someone from submitting a value through DOM manipulation; it just tells the browser not to accept input.</p>' +
                               '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype: 'numberfield',
          id: 'delta',
          name: 'delta',
          fieldLabel: Drupal.t('Delta'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'delta',
                anchor: 'left',
                html: Drupal.t('<h3><a name="delta" id="delta"></a>#delta</h3>' +
                               '<p><strong>Used by</strong>: <a href="#weight">weight</a></p>' +
                               '<p><strong>Description</strong>: The number of weights to have selectable. For example, with $delta =&gt; 10, the weight selection box would display numbers from -10 to 10.</p>' +
                               '<p><strong>Values</strong>: A positive number</p>')
              });
            }
          }
        },   {
          xtype: 'textfield',
          id: 'prefix',
          name: 'prefix',
          fieldLabel: Drupal.t('Prefix'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'prefix',
                anchor: 'left',
                html: Drupal.t('<h3><a name="prefix" id="prefix"></a>#prefix</h3>' +
                               '<p><strong>Used by</strong>: All elements and forms.</p>' +
                               '<p><strong>Description</strong>: Text or markup to include before the form element. Also see <a href="#suffix">#suffix</a>.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'suffix',
          name: 'suffix',
          fieldLabel: Drupal.t('Suffix'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'suffix',
                anchor: 'left',
                html: Drupal.t('<h3><a name="suffix" id="suffix"></a>#suffix</h3>' +
                               '<p><strong>Used by</strong>: All elements and forms</p>' +
                               '<p><strong>Description</strong>: Text or markup to include after the form element. Also see <a href="#prefix">#prefix</a>.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'theme',
          name: 'theme',
          fieldLabel: Drupal.t('Theme'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'theme',
                anchor: 'left',
                html: Drupal.t('<h3><a name="theme" id="theme"></a>#theme</h3>' +
                               '<p><strong>Used by</strong>: All elements and forms.</p>' +
                               '<p><strong>Description</strong>: Theme function to call for element.</p>' +
                               '<p><strong>Values</strong>: The name of a theme function, without the initial <em>theme_</em> prefix.</p>')
              });
            }
          }
        },  {
          xtype: 'numberfield',
          id: 'weight',
          name: 'weight',
          fieldLabel: Drupal.t('Weight'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'weight',
                anchor: 'left',
                html: Drupal.t('<h3><a name="weightval" id="weightval"></a>#weight</h3>' +
                               '<p><strong>Used by</strong>: All elements</p>' +
                               '<p><strong>Description</strong>: Used to sort the list of form elements before output; lower numbers appear before higher numbers.</p>' +
                               '<p><strong>Values</strong>: A positive or negative number (integer or decimal)</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'tree',
          name: 'tree',
          fieldLabel: Drupal.t('Tree'),
          checked: true,
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'tree',
                anchor: 'left',
                html: Drupal.t('<h3><a name="tree" id="tree"></a>#tree</h3>' +
                               '<p><strong>Used by</strong>: All</p>' +
                               '<p><strong>Description</strong>: Used to allow collections of form elements. Normally applied to the "parent" element, as the #tree property cascades to sub-elements. Use where you previously used ][ in form_ calls. For more information, see <a href="http://drupal.org/node/48643">#tree and #parents</a> in the handbook.</p>' +
                               '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'field_prefix',
          name: 'field_prefix',
          fieldLabel: Drupal.t('Field Prefix'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'field_prefix',
                anchor: 'left',
                html: Drupal.t('<h3><a name="field_prefix" id="field_prefix"></a>#field_prefix</h3>' +
                               '<p><strong>Used by</strong>: <a href="#textfield">textfield</a></p>' +
                               '<p><strong>Description</strong>: Text or code that is placed directly in front of the textfield. This can be used to prefix a textfield with a constant string.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'field_suffix',
          name: 'field_suffix',
          fieldLabel: Drupal.t('Field Suffix'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'field_suffix',
                anchor: 'left',
                html: Drupal.t('<h3><a name="field_suffix" id="field_suffix"></a>#field_suffix</h3>' +
                               '<p><strong>Used by</strong>: <a href="#textfield">textfield</a></p>' +
                               '<p><strong>Description</strong>: Text or code that is placed directly after a textfield. This can be used to add a unit to a textfield.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'numberfield',
          id: 'maxlength',
          name: 'maxlength',
          fieldLabel: Drupal.t('Max Length'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'maxlength',
                anchor: 'left',
                html: Drupal.t('<h3><a name="maxlength" id="maxlength"></a>#maxlength</h3>' +
                               '<p><strong>Used by</strong>: <a href="#password">password</a>, <a href="#textfield">textfield</a></p>' +
                               '<p><strong>Description</strong>: The maximum amount of characters to accept as input.</p>' +
                               '<p><strong>Values</strong>: A positive number.</p>')
              });
            }
          }
        }, {
          xtype: 'combobox',
          id: 'method',
          name: 'method',
          fieldLabel: Drupal.t('Method'),
          displayField: 'display',
          valueField: 'value',
          editable: false,
          queryMode: 'local',
          store: new Ext.data.Store({
            fields: ['display', 'value'],
            data: [{
              display: Drupal.t('Post'),
              value: 'post'
            },{
              display: Drupal.t('Get'),
              value: 'get'
            }]
          }),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'method',
                anchor: 'left',
                html: Drupal.t('<h3><a name="method" id="method"></a>#method</h3>' +
                               '<p><strong>Used by</strong>: <a href="#form">form</a></p>' +
                               '<p><strong>Description</strong>: The HTTP method that will be used to submit the form.</p>' +
                               '<p><strong>Values</strong>: GET or POST. Default is POST.</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'name',
          name: 'name',
          fieldLabel: Drupal.t('Name'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'name',
                anchor: 'left',
                html: Drupal.t('<h3 class="help"><a name="name" id="name"></a>#name</h3>' +
                               '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#submit">submit</a></p>' +
                               '<p><strong>Description</strong>: INTERNAL, except for buttons. All button and submit elements on a form should have the same name, which is set to \'op\' by default in Drupal. This does not apply to image buttons. For non-button elements, Drupal sets the name by using \'foo\' in $form[\'foo\'] as well as any parents of the element.</p>' +
                               '<p><strong>Values</strong>: String.</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'value',
          name: 'value',
          fieldLabel: Drupal.t('Value'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'value',
                anchor: 'left',
                html: Drupal.t('<h3><a name="value" id="value"></a>#value</h3>' +
                               '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#hidden">hidden</a>, <a href="#image_button">image_button</a>, <a href="#item">item</a>, <a href="#markup">markup</a>, <a href="#submit">submit</a>, <a href="#token">token</a>, <a href="#val">value</a></p>' +
                               '<p><strong>Description</strong>: Used to set values that cannot be edited by the user. <strong>Should NOT be confused with <a href="#default_value">#default_value</a></strong>, which is for form inputs where users can override the default value.</p>' +
                               '<p><strong>Values</strong>: Mixed (text or numbers)</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'return_value',
          name: 'return_value',
          fieldLabel: Drupal.t('Return Value'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'return_value',
                anchor: 'left',
                html: Drupal.t('<h3><a name="return_value" id="return_value"></a>#return_value</h3>' +
                               '<p><strong>Used by</strong>: <a href="#checkbox">checkbox</a>, <a href="#image_button">image_button</a>, <a href="#radio">radio</a></p>' +
                               '<p><strong>Description</strong>: The value that the element should return when selected.</p>' +
                               '<p><strong>Values</strong>: Mixed</p>')
              });
            }
          }
        }, {
          xtype: 'numberfield',
          id: 'rows',
          name: 'rows',
          fieldLabel: Drupal.t('Rows'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'rows',
                anchor: 'left',
                html: Drupal.t('<h3><a name="rows" id="rows"></a>#rows</h3>' +
                   '<p><strong>Used by</strong>: <a href="#textarea">textarea</a></p>' +
                   '<p><strong>Description</strong>: Defines how many rows should be in the textarea (see also <a href="#cols">#cols</a>).</p>' +
                   '<p><strong>Values</strong>: A positive number</p>')
              });
            }
          }
        }, {
          xtype: 'numberfield',
          id: 'size',
          name: 'size',
          fieldLabel: Drupal.t('Size'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'size',
                anchor: 'left',
                html: Drupal.t('<h3><a name="size" id="size"></a>#size</h3>' +
                   '<p><strong>Used by</strong>:  <a href="#password">password</a>, <a href="#password_confirm">password_confirm</a>, <a href="#select">select</a>, <a href="#textfield">textfield</a></p>' +
                   '<p><strong>Description</strong>: Width of the textfield (in characters), or size of the multiselect box (in lines).</p>' +
                   '<p><strong>Values</strong>: A positive number.</p>')
              });
            }
          }
        }, {
          xtype: 'textfield',
          id: 'src',
          name: 'src',
          fieldLabel: Drupal.t('Src'),
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'src',
                anchor: 'left',
                html: Drupal.t('<h3><a name="src" id="src"></a>#src</h3>' +
                   '<p><strong>Used by</strong>: <a href="#image_button">image_button</a></p>' +
                   '<p><strong>Description</strong>: The button image\'s URL.</p>' +
                   '<p><strong>Values</strong>: An URL.</p>')
              });
            }
          }
        },  {
          xtype: 'checkbox',
          id: 'collapsed',
          name: 'collapsed',
          fieldLabel: Drupal.t('Collapsed'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'collapsed',
                anchor: 'left',
                html: Drupal.t('<h3><a name="collapsed" id="collapsed"></a>#collapsed</h3>' +
                   '<p><strong>Used by</strong>: <a href="#fieldset">fieldset</a></p>' +
                   '<p><strong>Description</strong>: Indicates whether or not the fieldset is collapsed by default. See <a href="#collapsible">#collapsible</a> property.</p>' +
                   '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'collapsible',
          name: 'collapsible',
          fieldLabel: Drupal.t('Collapsible'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'collapsible',
                anchor: 'left',
                html: Drupal.t('<h3><a name="collapsible" id="collapsible"></a>#collapsible</h3>' +
                   '<p><strong>Used by</strong>: <a href="#fieldset">fieldset</a></p>' +
                   '<p><strong>Description</strong>: Indicates whether or not the fieldset can be collapsed with JavaScript. See <a href="#collapsed">#collapsed</a> property.</p>' +
                   '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'executes_submit_callback',
          name: 'executes_submit_callback',
          fieldLabel: Drupal.t('Executes Submit Callback'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'executes_submit_callback',
                anchor: 'left',
                html: Drupal.t('<h3><a name="executes_submit_callback" id="executes_submit_callback"></a>#executes_submit_callback</h3>' +
                   '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#image_button">image_button</a>, <a href="#submit">submit</a></p>' +
                   '<p><strong>Description</strong>: Indicates whether or not the button should submit the form.</p>' +
                   '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'multiple',
          name: 'multiple',
          fieldLabel: Drupal.t('Multiple'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            change: function(combo, newValue, oldValue, eOpts) {
              Ext.formbuilder.enableDisableXMLFields();
            },
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'multiple',
                anchor: 'left',
                html: Drupal.t('<h3><a name="multiple" id="multiple"></a>#multiple</h3>' +
                   '<p><strong>Used by</strong>: <a href="#select">select</a></p>' +
                   '<p><strong>Description</strong>: Indicates whether the user may select more than one item.</p>' +
                   '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype: 'checkbox',
          id: 'resizable',
          name: 'resizable',
          fieldLabel: Drupal.t('Resizable'),
          inputValue: true,
          uncheckedValue: false,
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'resizable',
                anchor: 'left',
                html: Drupal.t('<h3><a name="resizable" id="resizable"></a>#resizable</h3>' +
                   '<p><strong>Used by</strong>: <a href="#textarea">textarea</a></p>' +
                   '<p><strong>Description</strong>: Indicates whether users should be allowed to resize the text area</p>' +
                   '<p><strong>Values</strong>: TRUE or FALSE</p>')
              });
            }
          }
        }, {
          xtype:'fieldset',
          checkboxToggle: true,
          checkboxName: 'ajax',
          collapsed: true,
          title: Drupal.t('AJAX'),
          id: 'ajax',
          layout: 'anchor',
          defaults: {
            anchor: '100%'
          },
          items: [{
            xtype: 'textfield',
            id: 'ahah-effect',
            name: 'ahah_effect',
            fieldLabel: Drupal.t('Effect'),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-effect',
                  anchor: 'left',
                  html:  Drupal.t('<h3><a name="ahah_effect" id="ahah_effect"></a>#ajax[\'effect\']</h3>' +
                  '<p><strong>Description</strong>: Specifies the effect used when adding content from an AHAH request. </p>' +
                  '<p><strong>Values</strong>: String. Possible values: \'none\' (default), \'fade\', \'slide\'. If the <a href="http://interface.eyecon.ro/">interface elements library</a> is installed, any effect with the name <em>effect</em>Toggle may also be used. </p>')
                });
              }
            }
          },{
            xtype: 'textfield',
            id: 'ahah-event',
            name: 'ahah_event',
            fieldLabel: Drupal.t('Event'),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-event',
                  anchor: 'left',
                  html: Drupal.t('<h3><a name="ahah_event" id="ahah_event"></a>#ajax[\'event\']</h3>' +
                 '<p><strong>Description</strong>: When this event occurs in this element, Drupal will perform an HTTP request in the background via JavaScript.</p>' +
                 '<p><strong>Values</strong>: String. Possible values: Any valid <a href="http://docs.jquery.com/Events">jQuery event</a>, including \'mousedown\', \'blur\', and \'change\'.'+
                 'Note that #ajax[\'event\'] does not need to be explicitly specified. Although it can be manually set, usually the <a href="#element_default_values">default value </a> will be sufficient.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            id: 'ahah-method',
            name: 'ahah_method',
            fieldLabel: Drupal.t('Method'),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-method',
                  anchor: 'left',
                  html: Drupal.t('<h3><a name="ahah_method" id="ahah_method"></a>#ajax[\'method\']</h3>' +
                 '<p><strong>Description</strong>: Modifies the behavior of the returned HTML from an AHAH request when inserting into the <a href="#ajax_wrapper">#ajax_wrapper</a>. If not set, the returned HTML will replace the contents of the wrapper element, but it\'s also possible to use any of the available <a href="http://docs.jquery.com/DOM/Manipulation">jQuery operations for DOM manipulation</a>. </p>' +
                 '<p><strong>Values</strong>: String. Possible values: \'replace\' (default), \'after\', \'append\', \'before\', \'prepend\'.</p>')
                });
              }
            }
          },{
            xtype: 'textfield',
            id: 'ahah-path',
            name: 'ahah_path',
            fieldLabel: Drupal.t('Path'),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-path',
                  anchor: 'left',
                  html: Drupal.t('<h3><a name="ahah_path" id="ahah_path"></a>#ajax[\'path\']</h3>' +
                 '<p><strong>Description</strong>: If set, this property triggers AHAH behaviors on a form element. This is the Drupal menu path to a callback function which will generate HTML and return the HTML string to Drupal. The result will be placed in the <em>div</em> element specified in <a href="#ajax_wrapper">#ajax[\'wrapper\']</a>. </p>' +
                 '<p><strong>Values</strong>: String containing a Drupal menu path.</p>')
                });
              }
            }
          }, {
            xtype: 'textfield',
            id: 'ahah-wrapper',
            name: 'ahah_wrapper',
        fieldLabel: Drupal.t('Wrapper'),
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-wrapper',
                  anchor: 'left',
                  html: Drupal.t('<h3><a name="ahah_wrapper" id="ahah_wrapper"></a>#ajax[\'wrapper\']</h3>' +
                 '<p><strong>Description</strong>: Defines the HTML <em>id</em> attribute of an element on the page that will serve as the destination for HTML returned by an AHAH request. A <em>div</em> element is generally used as the wrapper since it provides the most flexibility for placement of elements before, after or inside of its HTML tags. This property is required for using AHAH requests in a form element.</p>' +
                 '<p><strong>Values</strong>: String containg a valid <em>id</em> attribute of an HTML element on the same page.</p>')
                });
              }
            }
          }, {
            xtype: 'checkbox',
            id: 'ahah-keypress',
            name: 'ahah_keypress',
            fieldLabel: Drupal.t('Keypress'),
            inputValue: true,
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-keypress',
                  anchor: 'left',
                  html: Drupal.t('<h3><a name="ahah_keypress" id="ahah_keypress"></a>#ajax[\'keypress\']</h3>' +
                 '<p><strong>Description</strong>: If set to TRUE, then the element\'s #ajax[\'event\'] will be triggered if the ENTER key is pressed while the element has focus.</p>')
                });
              }
            }
          }, {
            xtype:'fieldset',
            checkboxToggle: true,
            collapsed: true,
            checkboxName: 'ahah_progress',
            id: 'ahah_progress',
            title: Drupal.t('Progress'),
            items: [{
              xtype: 'textfield',
              id: 'ahah-progress-type',
              name: 'ahah_progress_type',
              fieldLabel: Drupal.t('Type'),
              listeners: {
                render: function() {
                  Ext.create('Ext.tip.ToolTip', {
                    target: 'ahah-progress-type',
                    anchor: 'top',
                    html: Drupal.t('<p>Possible values:</p>' +
                   '<ul><li><strong>#ajax[\'progress\'][\'type\']</strong> String. Possible values: \'throbber\' (default), \'bar\'.</li></ul>')
                  });
                }
              }
            }, {
              xtype: 'textfield',
              id: 'ahah-progress-message',
              name: 'ahah_progress_message',
              fieldLabel: Drupal.t('Message'),
              listeners: {
                render: function() {
                  Ext.create('Ext.tip.ToolTip', {
                    target: 'ahah-progress-message',
                    anchor: 'top',
                    html: Drupal.t('<p>Possible values:</p>' +
                   '<ul><li><strong>#ajax[\'progress\'][\'message\']</strong> String. An optional message to the user; should be wrapped with <a href="/api/drupal/includes--common.inc/function/t/6" title="Translate strings to the page language or a given language." class="local">t</a>().</li></ul>')
                  });
                }
              }
            }, {
              xtype: 'textfield',
              id: 'ahah-progress-url',
              name: 'ahah_progress_url',
              fieldLabel: Drupal.t('Url'),
              listeners: {
                render: function() {
                  Ext.create('Ext.tip.ToolTip', {
                    target: 'ahah-progress-url',
                    anchor: 'top',
                    html: Drupal.t('<p>Possible values:</p>' +
                   '<ul><li><strong>#ajax[\'progress\'][\'url\']</strong> String. The optional callback path to use to determine how full the progress bar is (as defined in progress.js). Only useable when \'type\' is \'bar\'.</li></ul>')
                  });
                }
              }
            }, {
              xtype: 'textfield',
              id: 'ahah-progress-interval',
              name: 'ahah_progress_interval',
              fieldLabel: Drupal.t('Interval'),
              listeners: {
                render: function() {
                  Ext.create('Ext.tip.ToolTip', {
                    target: 'ahah-progress-interval',
                    anchor: 'top',
                    html: Drupal.t('<p>Possible values:</p>' +
                   '<li><strong>#ajax[\'progress\'][\'interval\']</strong> String. The interval to be used in updating the progress bar (as defined in progress.js). Ony used if \'url\' is defined and \'type\' is \'bar\'.</li>')
                  });
                }
              }
            }],
            listeners: {
              render: function() {
                Ext.create('Ext.tip.ToolTip', {
                  target: 'ahah-progress',
                  anchor: 'bottom',
                  html: Drupal.t('<h3><a name="ahah_progress" id="ahah_progress"></a>#ajax[\'progress\']</h3>' +
                 '<p><strong>Description</strong>: Choose either a throbber or progress bar that is displayed while awaiting a response from the callback, and add an optional message.</p>' +
                 '<p><strong>Values</strong>: Array.</p>' +
                 '<p>Possible keys: \'type\', \'message\', \'url\', \'interval\'</p>')
                });
              }
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'ahah',
                anchor: 'left',
                html: Drupal.t('<h3><a name="ajax" id="ajax"></a>#ajax</h3>' +
                   '<p><strong>Used by</strong>:' +
                   '<a href="#button">button</a>,' +
                   '<a href="#checkbox">checkbox</a>,' +
                   '<a href="#hidden">hidden</a>,' +
                   '<a href="#image_button">image button</a>,' +
                   '<a href="#password">password</a>,' +
                   '<a href="#radio">radio</a>,' +
                   '<a href="#select">select</a>,' +
                   '<a href="#submit">submit</a>,' +
                   '<a href="#textarea">textarea</a>,' +
                   '<a href="#textfield">textfield</a>' +
                   '</p>' +
                   '<p>An array of elements whose values control the behavior of the element with respect to Drupal AHAH JavaScript methods.</p>')
              });
            }
          }
        }]
      }, {
        title: Drupal.t('More Advanced Controls'),
        autoScroll: true,
        items: [{
          xtype: 'formgrid',
          id: 'attributes',
          name: 'attributes',
          title: Drupal.t('Attributes'),
          store: Ext.create('Ext.data.Store', {
            fields:['key', 'value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            key: '',
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'key',
            header: Drupal.t('Key'),
            sortable: true,
            width: 200,
            field: {
              type: 'textfield'
            }
          },{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Value'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'attributes',
                anchor: 'left',
                html: Drupal.t('<h3><a name="attributes" id="attributes"></a>#attributes</h3>' +
                   '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#checkbox">checkbox</a>, <a href="#checkboxes">checkboxes</a>, <a href="#date">date</a>, <a href="#fieldset">fieldset</a>, <a href="#file">file</a>, <a href="#form">form</a>, <a href="#image_button">image_button</a>, <a href="#password">password</a>, <a href="#radio">radio</a>, <a href="#radios">radios</a>, <a href="#select">select</a>, <a href="#submit">submit</a>, <a href="#textarea">textarea</a>, <a href="#textfield">textfield</a>, <a href="#weight">weight</a></p>' +
                   '<p><strong>Description</strong>: A mechanism allowing for setting of additional HTML attributes such as \'class\'.</p>' +
                   '<p><strong>Values</strong>: Any HTML attribute not covered by other properties, e.g. <strong>class</strong> (for control types), <strong>enctype</strong> (for forms).</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          id: 'element_validate',
          name: 'element_validate',
          title: Drupal.t('Element Validate'),
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Function'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'element_validate',
                anchor: 'left',
                html: Drupal.t('<h3><a name="element_validate" id="element_validate"></a>#element_validate</h3>' +
                   '<p class="help"><strong>Used by</strong>: any element</p>' +
                   '<p><strong>Description</strong>: A list of custom validation functions that need to be passed. The functions must use <a href="/api/drupal/includes--form.inc/function/form_error/6" title="Flag an element as having an error." class="local">form_error</a>() or <a href="/api/drupal/includes--form.inc/function/form_set_error/6" title="File an error against a form element." class="local">form_set_error</a>() to set an error if the validation fails.</p>' +
                   '<p><strong>Values</strong>: an array of function names to be called to validate this element (and/or its children).</p>')
              });
            }
          }
        },  {
          xtype: 'formgrid',
          title: Drupal.t('Process'),
          id: 'process',
          name: 'process',
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Functions'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'process',
                anchor: 'left',
                html: Drupal.t('<h3><a name="process"></a>#process</h3>' +
                   '<p><strong>Description</strong>: An array of functions that are called when an element is processed. Using this callback, modules can "register" further actions - for example, the "radios" form type is expanded to multiple radio buttons using a processing function.</p>' +
                   '<p><strong>Values</strong>: Array of function names (strings)</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          title: Drupal.t('Pre Render'),
          id: 'pre_render',
          name: 'pre_render',
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Functions'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'pre_render',
                anchor: 'left',
                html: Drupal.t('<h3><a name="pre_render" id="pre_render"></a>#pre_render</h3>' +
                   '<p><strong>Used by</strong>: All elements and forms.</p>' +
                   '<p><strong>Description</strong>:' +
                   'Function(s) to call <strong>before</strong>' +
                   'rendering in </a><a href="http://api.drupal.org/api/function/drupal_render/" class="local">drupal_render</a>()' +
                   'has occured. The function(s) provided in #pre_render receive the element as an argument and ' +
                   'must return the altered element.</p>' +
                   '<p><strong>Values</strong>: An array of function names to call.</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          title: Drupal.t('Post Render'),
          id: 'post_render',
          name: 'post_render',
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Functions'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'post_render',
                anchor: 'left',
                html: Drupal.t('<h3><a name="post_render" id="post_render"></a>#post_render</h3>' +
                   '<p><strong>Used by</strong>: All elements and forms</p>' +
                   '<p><strong>Description</strong>:' +
                   'Function(s) to call <strong>after</strong>' +
                   'rendering in </a><a href="http://api.drupal.org/api/function/drupal_render/" class="local">drupal_render</a>()' +
                   'has occured. The named function is called with two arguments - the rendered element and its children. It returns the (potentially)' +
                   'altered element content.</p>' +
                   '<p><strong>Values</strong>: An array of function names to call.</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          title: Drupal.t('After Build'),
          id: 'after_build',
          name: 'after_build',
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Function'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'after_build',
                anchor: 'left',
                html: Drupal.t('<h3><a name="after_build" id="after_build"></a>#after_build</h3>'+
                   '<p><strong>Used by</strong>: All elements and forms</p>' +
                   '<p><strong>Description</strong>: An array of function names which will be called after the form or element is built.</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          id: 'options',
          name: 'options',
          title: Drupal.t('Options'),
          store: Ext.create('Ext.data.Store', {
            fields:['key', 'value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            key: '',
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'key',
            header: Drupal.t('Value'),
            sortable: true,
            width: 100,
            field: {
              type: 'textfield'
            }
          },{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Label'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'options',
                anchor: 'left',
                html: Drupal.t('<h3><a name="options" id="options"></a>#options</h3>' +
                   '<p><strong>Used by</strong>: <a href="#checkboxes">checkboxes</a>, <a href="#radios">radios</a>, <a href="#select">select</a></p>' +
                   '<p><strong>Description</strong>: Selectable options for a form element that allow multiple choices.</p>')
              });
            }
          }
        },  {
          xtype: 'formgrid',
          title: Drupal.t('User Data'),
          id: 'user_data',
          name: 'user_data',
          store: Ext.create('Ext.data.Store', {
            fields:['key', 'value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            key: '',
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'key',
            header: Drupal.t('Key'),
            sortable: true,
            width: 150,
            field: {
              type: 'textfield'
            }
          },{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Value'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'user_data',
                anchor: 'left',
                html: Drupal.t('<h3><a name="weightval" id="weightval"></a>#user_data</h3>' +
                   ' <p><strong>Used by</strong>: Custom elements</p>' +
                   '<p><strong>Description</strong>: Used by custom form elements such as tabpanels. Consult the documentation for more information on what values can be specified here.</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          title: Drupal.t('Submit'),
          id: 'submit',
          name: 'submit',
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Functions'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'submit',
                anchor: 'left',
                html: Drupal.t('<h3><a name="submit-prop" id="submit-prop"></a>#submit</h3>' +
              '<p><strong>Used by</strong>: <a href="#button">button</a>, <a href="#form">form</a>, <a href="#image_button">image_button</a>, <a href="#submit">submit</a></p>' +
              '<p><strong>Description</strong>: Contains a list of submit callbacks to be excuted on the form, or only when a specific button is clicked.</p>' +
              '<p><strong>Values</strong>: An array of function names.</p>')
              });
            }
          }
        }, {
          xtype: 'formgrid',
          title: Drupal.t('Validate'),
          id: 'validate',
          name: 'validate',
          store: Ext.create('Ext.data.Store', {
            fields:['value'],
            proxy: {
              type: 'memory',
              reader: {
                type: 'json'
              }
            }
          }),
          modelInitTmpl: {
            value: ''
          },
          columns: [{
            xtype: 'gridcolumn',
            dataIndex: 'value',
            header: Drupal.t('Functions'),
            sortable: true,
            flex: 1,
            field: {
              type: 'textfield'
            }
          }],
          listeners: {
            render: function() {
              Ext.create('Ext.tip.ToolTip', {
                target: 'validate',
                anchor: 'left',
                html: Drupal.t('<h3><a name="validate" id="validate"></a>#validate</h3>' +
              '<p class="help"><strong>Used by</strong>: <a href="#button">button</a>, <a href="#image_button">image_button</a>, <a href="#form">form</a>, <a href="#submit">submit</a></p>' +
              '<p><strong>Description</strong>: A list of custom validation functions that need to be passed. This is usually used to add additional validation functions to a form, or to use an alternate function, as opposed to the default form validation function (the form ID with <em>_validate</em> appended to it).</p>' +
              '<p><strong>Values</strong>: An array of function names.</p>')
              });
            }
          }
        }]
      }]
    }],
    buttons: [{
      text: Drupal.t('Clear'),
      handler: function() {
        this.up('form').getForm().reset();
      }
    }],
    listeners: {
      hide: function() {
        Ext.formbuilder.saveElementForm();
      }
    }
  });
};
;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 */
Ext.formbuilder.createPropertiesForm = function() {
    return Ext.create('Ext.form.Panel', {
        title: Drupal.t('Properties Form'),
        region: 'center',
        margin: '1 1 1 0',
        frame: true,
        items:  [{
            xtype: 'fieldset',
            title: Drupal.t('Root Element'),
            items: [{
                xtype: 'textfield',
                id: 'localName',
                name: 'localName',
                fieldLabel: Drupal.t('Root Element Name'),
                allowBlank: false,
                anchor: '100%'
            },{
                xtype: 'textfield',
                id: 'uri',
                name: 'uri',
                fieldLabel: Drupal.t('Namespace URI'),
                anchor: '100%'
            }]
        },{
            xtype: 'fieldset',
            title: Drupal.t('Schema'),
            items: [{
                xtype: 'textfield',
                id: 'schema',
                name: 'schema',
                fieldLabel: Drupal.t('Name'),
                anchor: '100%'
            }]
        },{
            xtype: 'formgrid',
            title: Drupal.t('Namespaces'),
            id: 'namespaces',
            name: 'namespaces',
            height: 300,
            store: this.createMapStore(),
            modelInitTmpl: {
                key: '', 
                value: ''
            },
            columns: [{
                xtype: 'gridcolumn',
                dataIndex: 'key',
                header: Drupal.t('Prefix'),
                sortable: true,
                width: 150,
                field: {
                    type: 'textfield'
                }
            },{
                xtype: 'gridcolumn',
                dataIndex: 'value',
                header: Drupal.t('URI'),
                sortable: true,
                flex: 1,
                field: {
                    type: 'textfield'
                }
            }]
        }],
        listeners: {
            hide: function() {
                Ext.formbuilder.savePropertiesForm();
            }     
        }
    });
};
;
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 */
Ext.formbuilder.getPreviewURL = function(url) {
    var view_url = url.replace(/\/edit/i, '/view');
    return "<iframe src='" + view_url + "' width='100%' height='100%'><p>" + Drupal.t('Your browser does not support iframes.') + "</p></iframe>";
}
/**
 * 
 */
Ext.formbuilder.createPreviewPanel =  function(url) { // Use an iframe...
    var preview = Ext.formbuilder.getPreviewURL(url);
    return Ext.create('Ext.form.Panel', {
        title: Drupal.t('Preview'),
        html: preview
    });
};
/**
 * 
 */
Ext.formbuilder.refreshPreviewPanel =  function(url) { // Use an iframe...
    var display = this.displayPanel.layout;
    var preview = display.setActiveItem(0);
    if(preview) {
        preview.update(Ext.formbuilder.getPreviewURL(url));
    }
    else {
        preview = display.getActiveItem();
        preview.update(Ext.formbuilder.getPreviewURL(url));
    }
};
;