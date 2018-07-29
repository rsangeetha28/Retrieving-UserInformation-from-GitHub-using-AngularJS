(function() {

  var app = angular.module("githubViewer", []);

  /*var MainController = function(
    $scope, $http, $interval, 
    $log, $anchorScroll, $location) {*/
    //or
    var MainController = function(
    $scope, github, $interval, 
    $log, $anchorScroll, $location) {

    var onUserComplete = function(data) {
      $scope.user = data;
      //$http.get($scope.user.repos_url)
      github.getRepos($scope.user)
        .then(onRepos, onError)
    };

    var onRepos = function(data) {
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the user";
    };

    $scope.search = function(username) {
      $log.info("Searching for "+username);
     // $http.get("https://api.github.com/users/" + username)
     github.getUser(username)
        .then(onUserComplete, onError);
        if(countdownInterval){
          $interval.cancel(countdownInterval);
          $scope.countdown=null;
        }
    };

    var decrementCountdown = function() {
      $scope.countdown = $scope.countdown - 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var countdownInterval = null;
    var startCountdown = function() {
      //1st argument: A function that should be called repeatedly. 
      //If no additional arguments are passed (see below), the function is called with the current iteration count.
      //2nd argument:Number of milliseconds between each function call.
      //3rd argument:Number of times to repeat. If not set, or 0, will repeat indefinitely.
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.username = "angular";
    $scope.message = "Github Viewer";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;
    startCountdown();

  };

  app.controller("MainController", MainController);
  //or
  //app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

}());