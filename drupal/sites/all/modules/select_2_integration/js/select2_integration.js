/**
 * 
 */
(function ($) {

	
	Drupal.behaviors.select2_integration = {
		  attach: function (context) {
			  if(typeof($.fn.select2) != 'undefined'){
				  
				  $('a.taxonomy_voc_terms_page_link').once('taxonomy_voc_terms_page_link').click(function(){
					  window.open(this.href);
					  return false;
				  });
				  
				  var jqversion = jQuery.fn.jquery;
				  
				  var jqVersionSplited = jqversion.split('.');
				  
				  if(jqVersionSplited[1]*1 < 8){ //checking min. jQuery version
					  alert(Drupal.t('jQuery 1.8.x or higher required for using "Select2 integration" module. Some of your forms element may be not working properly.'));
					  return;
				  }
				  
				  $("select.use-select-2, input.use-select-2").once('select2-processed').each(function(){
					  var $element = $(this);
					  
					  var id = $element.attr('id');
					  
					  if(typeof(Drupal.settings.select_2.elements[id]) != 'undefined'){
						  
						  var options = {
							allow_add_onfly: 0,
							emptyData: false,
						  };
						  
						  $.extend(true,options,Drupal.settings.select_2.elements[id]);
						  
						  
						  if(typeof(options.allowClear) == 'boolean' && options.allowClear && options.allow_add_onfly != 1){
							 var $epmty_option = $('<option></option>');
							 $epmty_option.prependTo($element);
						  }
						  
						  if(options.allow_add_onfly == 1 && options.data.length == 0){
							  options.emptyData = true;
						  }
						  
						  if(typeof(options.allow_add_onfly) != 'undefined' && (options.allow_add_onfly || options.allow_add_onfly == 1)){
							  
							  if(!options.emptyData){
								  options.createSearchChoice = function(term, data) { 
										
									  	if ($(data).filter(
												function() { 
													return this.text.localeCompare(term)===0; }
											).length===0) {
												return {id:term, text:term};
											} 
										};
							  } else {
								  options.minimumInputLength = 1;
								  options.query = function (query) {
								        var data = {results: []};
								        
								        data.results.push({id: query.term, text: query.term});
								        
								        query.callback(data);
								    };
							  }
						  }
						  
					  }
					  
					  $element.select2(options);
				  });
			  }
		  }
	};

})(jQuery);