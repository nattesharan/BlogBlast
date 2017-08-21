(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['Authentication', 'Notification', '$http'];
  function HomeController(Authentication, Notification, $http) {
    var vm = this;
    vm.authentication = Authentication;
    vm.getInfo = getInfo;
    function checkUrl(url) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(url);
    }
    function getInfo(url) {
      if (checkUrl(url)) {
        $http({
          method: 'POST',
          url: '/getUrlInfo',
          data: {
            url: url
          }
        }).then(function success(response) {
          console.log(response.data);
        });
      } else {
        Notification.error({ message: 'Invalid Url', title: '<i class="glyphicon glyphicon-remove">', delay: 4000 });
      }
    }
  }
}());
