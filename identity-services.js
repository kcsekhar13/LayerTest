/* global layer */
'use strict';

/**
 * Exports Identity Service Utilities
 * * window.layerSampleApp.Identities:
 *   * getList: Gets all registered users
 *   * getIdentityToken: Gets Identity Token from Identity Server
 *   * getDisplayName: Gets display name for a user
 */
(function() {
  var layerSampleApp = window.layerSampleApp;

  var sampleIdentities = {
    '1': 'Seetha Ram',
    '2': 'Raghs',
    '3': 'Bhavitha',
    '4': 'Radhika',
    '5': 'Vamseeee'
  };

  /**
   * All code here is specific to a sample identity service to help get
   * sample apps up and running quickly, and should not be a part of any
   * app you build yourself.
   *
   * @method
   * @param  {Object}   options
   * @param  {String}   options.appId    Application ID (shown on Developer Dashboard)
   * @param  {String}   options.userId   User ID to show for this user
   * @param  {String}   options.nonce    Nonce to use to get an Identity Token
   * @param  {Function} options.callback Function to call on getting an Identity Token
   */
  function getIdentityToken(options) {
    var id = options.appId.replace(/^.*\//, '');
    layer.xhr({
      url: 'https://layer-identity-provider.herokuapp.com/apps/' + id + '/identities',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      data: {
        name: options.userId,
        nonce: options.nonce
      }
    }, function(result) {
      var data = result.data;
      data.atlas_identities.forEach(function(item) {
          sampleIdentities[item.id] = item.name;
      });
      options.callback(data.identity_token);
    });
  }

  function getIdentityDisplayName(userId) {
    return sampleIdentities[userId] || 'User ' + userId;
  }

  function getIdentityList() {
    return Object.keys(sampleIdentities).map(function(userId) {
      return {id: userId, name: sampleIdentities[userId]};
    });
  }
  layerSampleApp.Identities = {
    getList: getIdentityList,
    getDisplayName: getIdentityDisplayName,
    getIdentityToken: getIdentityToken
  };
})();
