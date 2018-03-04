var app = angular.module("myApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'public/templates/main.html'
        })
        .when('/bookSearch', {
            templateUrl: 'public/templates/bookSearch.html',
            controller: 'bookSearch'
        })
        .when('/about', {
            templateUrl: 'public/templates/about.html',
            controller: 'retController'
        }).when('/login', {
            templateUrl: 'public/templates/login.html',
            controller: 'login'
        }).when('/staffLogin', {
            templateUrl: 'public/templates/staffLogin.html',
            controller: 'staffLogin'
        }).when('/studentLogin', {
            templateUrl: 'public/templates/studentLogin.html',
            controller: 'studentLogin'
        })
})