var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html'
        })
        .when('/bookSearch', {
            templateUrl: 'templates/bookSearch.html',
            controller: 'bookSearch'
        }).when('/addBook', {
            templateUrl: 'templates/addBook.html',
            controller: 'addBook'
        }).when('/bookReturn', {
            templateUrl: 'templates/bookReturn.html',
            controller: 'bookReturn'
        }).when('/bookIssue', {
            templateUrl: 'templates/bookIssue.html',
            controller: 'bookIssue'
        }).when('/stuRegi', {
            templateUrl: 'templates/studentRegi.html',
            controller: 'stuRegi'
        })

})