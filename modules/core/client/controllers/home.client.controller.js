(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['Authentication', 'Notification', '$http', '$mdSidenav'];
  function HomeController(Authentication, Notification, $http, $mdSidenav) {
    var vm = this;
    vm.authentication = Authentication;
    vm.getInfo = getInfo;
    vm.post = post;
    vm.items = ['linkedin', 'twitter', 'pinterest', 'facebook', 'google', 'tumblr'];
    vm.selected = [];
    vm.status = [];
    vm.active = false;
    vm.confirmAccounts = confirmAccounts;
    // vm.list = true;

    // if (screen.width < 768) {
    //   document.getElementById('topMargin').style.marginTop = '10px';
    // }

    //  Sidenav starts
    // vm.toggleLeft = buildToggler('left');
    // function buildToggler(componentId) {
    //   return function () {
    //     $mdSidenav(componentId).toggle();
    //   };
    // }
    // sidenav ends
    function confirmAccounts() {
      vm.confAcc = true;
      // console.log(vm.selected);
    }
    vm.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
    };

    vm.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    vm.isIndeterminate = function () {
      return (vm.selected.length !== 0 &&
        vm.selected.length !== vm.items.length);
    };

    vm.isChecked = function () {
      return vm.selected.length === vm.items.length;
    };

    vm.toggleAll = function () {
      if (vm.selected.length === vm.items.length) {
        vm.selected = [];
      } else if (vm.selected.length === 0 || vm.selected.length > 0) {
        vm.selected = vm.items.slice(0);
      }
    };
    function post(info, selected) {
      info.url = vm.url;
      // console.log(info);
      // console.log(selected);
      $http({
        method: 'POST',
        url: '/post',
        data: {
          info: info,
          status: selected
        }
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
        });
      } else {
        Notification.error({ message: 'Invalid Url', title: '<i class="glyphicon glyphicon-remove">', delay: 4000 });
      }
    }
  }
}());
