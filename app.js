(function () {
  "use strict";

  angular
    .module("facebookCloneApp", ["ngRoute"])
    .config(function ($routeProvider) {
      $routeProvider
        .when("/login", {
          templateUrl: "login.html",
          controller: "LoginController",
        })
        .when("/home", {
          templateUrl: "home.html",
          controller: "HomeController",
        })
        .otherwise({
          redirectTo: "/login",
        });
    })
    .controller("LoginController", function ($scope, $location, AuthService) {
      $scope.credentials = {
        email: "",
        password: "",
      };

      $scope.login = function () {
        if (AuthService.login($scope.credentials.email, $scope.credentials.password)) {
          $location.path("/home");
        } else {
          $scope.errorMessage = "Please enter both email and password.";
        }
      };
    })
    .controller("HomeController", function ($scope, $location, AuthService) {
      if (!AuthService.isLoggedIn()) {
        $location.path("/login");
        return;
      }

      $scope.currentUser = AuthService.currentUser();
      $scope.contacts = ["Alice", "Bob", "Charlie", "Dana", "Ethan"];
      $scope.posts = [
        {
          author: "Jane Doe",
          content: "Had an awesome day building with AngularJS!",
          time: "2 hours ago",
        },
        {
          author: "John Smith",
          content: "Excited to share my new web app design.",
          time: "5 hours ago",
        },
      ];

      $scope.logout = function () {
        AuthService.logout();
        $location.path("/login");
      };
    })
    .service("AuthService", function () {
      var loggedInUser = "";

      this.login = function (email, password) {
        if (!email || !password) {
          return false;
        }

        loggedInUser = email.split("@")[0] || "User";
        return true;
      };

      this.logout = function () {
        loggedInUser = "";
      };

      this.isLoggedIn = function () {
        return Boolean(loggedInUser);
      };

      this.currentUser = function () {
        return loggedInUser;
      };
    });
})();
