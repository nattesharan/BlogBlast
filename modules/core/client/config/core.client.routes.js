(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'

      })
      .state('homepage', {
        url: '',
        templateUrl: '/modules/core/client/views/homepage/homepage.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('homepage.postall', {
        url: '/postall',
        templateUrl: '/modules/core/client/views/homepage/postAll.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Homepage'
        }
      })
      .state('homepage.postselected', {
        url: '/postselected',
        templateUrl: '/modules/core/client/views/homepage/postSelected.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Homepage postselected'
        }
      })
      .state('homepage.connected', {
        url: '/connected',
        templateUrl: '/modules/core/client/views/homepage/connected.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Homepage connected'
        }
      })
      .state('homepage.accounts', {
        url: '/accounts',
        templateUrl: '/modules/core/client/views/homepage/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'homepage accounts'
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
}());
