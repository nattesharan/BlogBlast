(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$uibModal', '$mdSidenav'];

  function HeaderController($scope, $state, Authentication, menuService, $uibMmodal, $mdSidenav) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.signIn = signIn;
    // vm.list = true;
    // vm.toggleLeft = buildToggler('left');
    // function buildToggler(componentId) {
    //   vm.list = !vm.list;
    //   return function () {
    //     $mdSidenav(componentId).toggle();
    //   };
    // }
    vm.hi = hi;
    function hi(){
      console.log('hi');
    }
    function signIn(user) {
      console.log('hi');
      $scope.user = user;
      $uibMmodal.open({
        url: '/signin?err',
        templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
        backdrop: true,
        windowClass: 'modal',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        resolve: {
          user: function () {
            return $scope.user;
          }
        }
      });
    }
    vm.signUp = signUp;
    function signUp(user) {
      console.log('hi');
      $scope.user = user;
      $uibMmodal.open({
        templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
        backdrop: true,
        windowClass: 'modal',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        resolve: {
          user: function () {
            return $scope.user;
          }
        }
      });
    }
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
