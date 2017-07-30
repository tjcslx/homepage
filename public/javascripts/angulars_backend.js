var app = angular.module('tjcsweb_backend', ['ngResource', 'ngRoute'])
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '../partials/backend.html',
        controller: 'NewsCategoryPC'
    }).when('/insert-news', {
        templateUrl: '../partials/insert_news.html',
        controller: 'InsertNewsPC'
    }).when('/show-news/:id', {
        templateUrl: '../partials/insert_news.html',
        controller: 'UpdateNewsPC'
    }).when('/delete-news/:id', {
        templateUrl: '../partials/delete_news.html',
        controller: 'DeleteNewsPC'
    }).otherwise({
        redirectTo: '/'
    })
    // $locationProvider.html5Mode(true)
}])

app.controller('NewsCategoryPC', ['$scope', '$resource', function($scope, $resource) {
    var NewsCat = $resource('/api/cat')
    NewsCat.query(function(nc) {
        $scope.nc = nc
    })
}])

app.controller('NewsListPC', ['$scope', '$resource', function($scope, $resource) {
    var NewsCat = $resource('/api/news/id/0')
    NewsCat.query(function(nl) {
        $scope.nl = nl
    })
}])

app.controller('InsertNewsPC', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
    $scope.insert = function() {
        var news = $resource('/api/insertnews')
        news.save($scope.news, function() {
            $location.path('/')
        })
    }
}])

app.controller('UpdateNewsPC', ['$scope', '$resource', '$location', '$routeParams', function($scope, $resource, $location, $routeParams) {
    var News = $resource('/api/news/id/:id', { id: '@_id' }, {
        update: { method: 'PUT' }
    })
    News.query({ id: $routeParams.id }, function(news) {
        $scope.news = news
    })
    $scope.save = function() {
        News.update($scope.news, function() {
            $location.path('/')
        })
    }
}])

app.controller('DeleteNewsPC', ['$scope', '$resource', '$location', '$routeParams', function($scope, $resource, $location, $routeParams) {
    var News = $resource('/api/news/id/:id')
    News.query({ id: $routeParams.id }, function(news) {
        $scope.news = news
    })
    $scope.delete = function() {
        News.delete({ id: $routeParams.id }, function(news) {
            $location.path('/')
        })
    }
}])