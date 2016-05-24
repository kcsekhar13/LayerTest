'use strict';
/**
 * The ConversationList Class renders a list of Conversations and allows the user
 * to select or delete Conversations.
 */
(function() {
  var layerSampleApp = window.layerSampleApp;
  layerSampleApp.ConversationList = Backbone.View.extend({
    el: '.conversation-list',

    initialize: function() {
      this.$el.append("Your conversation list goes here");
    },

    betterTitle: function(participants) {
        return participants.map(function(userId) {
            return layerSampleApp.Identities.getDisplayName(userId);
        }).join(', ');
    },

    buildConversationRow: function(conversation) {
      var title = this.betterTitle(conversation.participants);
      var cssClasses = ['conversation-list-item'];

      // Highlight the selected Conversation
      if (this.selectedConversation && conversation.id === this.selectedConversation.id) {
          cssClasses.push('selected-conversation');
      }

      // Tutorial Step 5: Add Unread Message Highlighting
      if (conversation.unreadCount) {
          cssClasses.push('unread-messages');
      }

      var row = $('<div/>', { class: cssClasses.join(' ') });
      row.append(
        '<div class="info">' +
            '<div class="main">' +
                '<div class="title">' + title + '</div>' +
            '</div>' +
        '</div>'
      );

      // Click handler to trigger an event when each conversation is selected
      row.on('click', function(evt) {
          this.trigger('conversation:selected', conversation.id);
      }.bind(this));

      return row;
    },


    render: function(conversations) {
      if (conversations) this.conversations = conversations;
      this.$el.empty();

      // Iterate through conversations and append HTML Rows
      this.conversations.forEach(function(conversation) {
          var row = this.buildConversationRow(conversation);
          this.$el.append(row);
      }, this);
    }
  });
})();
