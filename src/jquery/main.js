import jQueryInlineAttachment from './jquery';

(root => {
  let jQuery = root.jQuery;

  if( typeof jQuery === 'undefined' ) {
    // HACK: Escape from webpack's `require` replacing
    if( eval('typeof require') !== 'undefined' ) {
      jQuery = require('jquery');
    } else {
      throw new Error('jQuery version of InlineAttachment requires jQuery, see https://jquery.com/');
    }
  }

  jQuery.fn.inlineAttachment = function(options) {
    jQuery(this).each(function() {
      new jQueryInlineAttachment(this, options);
    });

    return this;
  };
})(typeof window !== 'undefined' ? window : this);

export default jQueryInlineAttachment;
