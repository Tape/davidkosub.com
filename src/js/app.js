(function (angular) {

  "use strict";

  var appModule = angular.module("app", ["ngRoute", "ui.bootstrap"]);

  appModule.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/pages/home.html"
      })
      .when("/resume", {
        templateUrl: "/pages/resume.html"
      })
      .when("/portfolio", {
        templateUrl: "/pages/portfolio.html"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);

  appModule.controller("ContactFormCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.submit = function (data) {
      if (!$scope.loading) {
        $scope.success = $scope.error = false;
        $scope.loading = true;

        $http.post("/contact", data).success(function () {
          $scope.success = true;
          $scope.data = {};
        }).error(function (data, status) {
          $scope.error = status;
        })["finally"](function () {
          $scope.loading = false;
        });
      }
    };

    $scope.getIcon = function () {
      return $scope.loading ? "fa-spinner fa-spin" : "fa-envelope-o";
    };
  }]);

})(angular);
