;(function ($, window, document, undefined) {
  'use strict';

  angular.module('ngAlertMessage', [])
    .provider('ngAlertMessageConfig', ngAlertMessageConfigProvider)
    .factory('ngAlertMessage', ngAlertMessage);

  var $message;

  function ngAlertMessageConfigProvider() {
    this.config = {
      appendTo: 'body',
      baseClass: 'alert',
      container: 'div',
      identifier: 'alert-message',
      type: 'danger'
    };
    this.$get = function () {
      return this;
    };
  }

  ngAlertMessage.$inject = ['$rootScope', 'ngAlertMessageConfig'];

  function ngAlertMessage($rootScope, ngAlertMessageConfig) {
    return {
      firstOrCreate: firstOrCreate,
      destroy: destroy
    };

    function firstOrCreate(message, type) {
      if (!message.toString().trim().length) {
        return;
      }
      if ($message) {
        destroy();
      }
      $message = $(document.createElement(ngAlertMessageConfig.config.container))
        .attr('id', ngAlertMessageConfig.config.identifier)
        .addClass(ngAlertMessageConfig.config.baseClass + ' ' + (type || ngAlertMessageConfig.config.type) )
        .text(message)
        .appendTo(ngAlertMessageConfig.config.appendTo);
    }

    function destroy() {
      if (!$message)
        return;
      $message.remove();
      $message = undefined;
    }
  }

})(jQuery, window, document, undefined);
