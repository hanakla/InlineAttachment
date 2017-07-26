import jQueryInlineAttachment from './jquery';

(root => {
  let jQuery = root.jQuery;

  if( typeof jQuery === 'undefined' ) {
    if( typeof require !== 'undefined' ) {
      jQuery = require('jquery');
    } else {
      throw new Error('jQuery version of InlineAttachment requires jQuery, see https://jquery.com/');
    }
  }

  jQuery.fn.inlineAttachment = function(options) {
    $(this).each(function() {
      new jQueryInlineAttachment(this, options);
    });

    return this;
  };
})(typeof window !== 'undefined' ? window : this);

export default jQueryInlineAttachment;
