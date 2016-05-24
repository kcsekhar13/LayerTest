'use strict';
/**
 * The MessageComposer class lets the user type in a message and hit Send
 */
(function() {
  window.layerSampleApp.MessageComposer = Backbone.View.extend({
    el: '.message-composer',

    /**
     * Render the static content: Render the input
     */
    initialize: function() {
      this.$el.append('<input class="message-textarea" placeholder="Enter a message..."></input>');
      this.$el.find('input').on('keypress', this.inputAction.bind(this));
    },

    /**
     * Handle each keypress; keyCode of 13 means ENTER key,
     * on ENTER: trigger an event to send the message.
     */
    inputAction: function(e) {
      var text = e.target.value.trim();
      if (e.keyCode !== 13 || !text) return true;

      this.trigger('message:new', text);
      this.clear();
    },

    /**
     * Clear the text and insure focus remains on the input
     */
    clear: function() {
      this.$el.find('input').val('').focus();
    }
  });
})();