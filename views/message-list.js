'use strict';
/**
 * The Message List class renders a list of Message Views and insures
 * we stay scrolled to the bottom of the Message List.
 */
(function() {
  var layerSampleApp = window.layerSampleApp;
  layerSampleApp.MessageList = Backbone.View.extend({
    el: '.message-list',
    initialize: function() {
      this.$el.append("Your messages will go here");
    },

    render: function(messages) {
      // Tutorial Step 3: Render messages here
      this.$el.empty();

      // NOTE: Do NOT modify the query.data i.e. messages array
      // Create a copy of the array and reverse the order so that most recent message is at the bottom
      var messages = messages.concat().reverse();

      // Render each message view
      messages.forEach(function(message) {
          var messageView = new layerSampleApp.Message();
          messageView.render(message);

          this.$el.append(messageView.$el);
      }, this);

      // Make sure the user can see the last message in the list
      this.scrollBottom();
  },

    /**
     * Scroll to the bottom of the list so the most recent Message is visible.
     */
    scrollBottom: function() {
      this.el.scrollTop = this.el.scrollHeight;
    }
  });
})();
