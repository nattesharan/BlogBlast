(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['Authentication', 'Notification'];
  function HomeController(Authentication, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.getInfo = getInfo;
    function checkUrl(data) {
      var expression = /((ftp|http|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/;
      console.log(expression.test(data));
      // return expression.test(data);
    }
    function getInfo(url) {
      if (checkUrl(url)) {

      } else {
        Notification.error({ message: 'invalid url', delay: 3000 });
      }
    }
  }
}());
