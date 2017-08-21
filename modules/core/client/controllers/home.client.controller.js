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
    vm.check = false;
    vm.preview = preview;
    vm.post = post;
    function post(info) {
      info.url = vm.url;
      $http({
        method: 'POST',
        url: '/post',
        data: info
      }).then(function success(response) {
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully Posted!' });
        vm.url = '';
        vm.info = '';
      });
    }
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
          vm.info = response.data;
          // console.log(response.data);
        });
      } else {
        Notification.error({ message: 'Invalid Url', title: '<i class="glyphicon glyphicon-remove">', delay: 4000 });
      }
    }
    function preview() {
      vm.check = true;
      vm.info.title = document.getElementById('title').innerHTML;
      vm.info.description = document.getElementById('description').innerHTML;
      vm.info.myDesc = document.getElementById('myDesc').innerHTML;
    }
  }
}());
