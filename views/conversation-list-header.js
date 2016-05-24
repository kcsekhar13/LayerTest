'use strict';
/**
 * The ConversationListHeader class renders a simple header over the list of Conversations.
 * It has only a single behavior: a `New` button for creating a new conversation.
 */
(function() {
  window.layerSampleApp.ConversationListHeader = Backbone.View.extend({
    el: '.conversations-header',
    /**
     * Render static content: render the header
     */
    initialize: function() {
        this.$el.append(
            '<div class="title">Your Conversations</div>' +
            '<span class="create-conversation" title="Create a new conversation">' +
                '<i class="icon">New</i>' +
            '</span>'
        );

        this.$el.find('.create-conversation').on('click', this.newConversation.bind(this));
    },

    /**
     * Handle the user clicking the New Conversation button
     */
    newConversation: function() {
        this.trigger('conversations:new');
    }
  });
})();
