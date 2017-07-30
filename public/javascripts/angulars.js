var app = angular.module('tjcsweb', ['ngResource', 'ngRoute'])
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/index.html',
        controller: 'NewsCtrlPC'
    }).otherwise({
        redirectTo: '/'
    })
    $locationProvider.html5Mode(true)
}])

app.controller('NewsCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var News = $resource('/api/news/cat/1/count/7')
    News.query(function (news) {
        $scope.news = news
    })
}])

app.controller('NoticesCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var Notices = $resource('/api/news/cat/2/count/10')
    Notices.query(function (notices) {
        $scope.notices = notices
    })
}])

app.controller('BudgetsCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var Budgets = $resource('/api/news/cat/3/count/10')
    Budgets.query(function (budgets) {
        $scope.budgets = budgets
    })
}])

app.controller('PersonnelCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var Personnel = $resource('/api/news/cat/4/count/10')
    Personnel.query(function (personnel) {
        $scope.personnel = personnel
    })
}])

app.controller('ExamCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var Exam = $resource('/api/news/cat/5/count/10')
    Exam.query(function (exam) {
        $scope.exam = exam
    })
}])

app.controller('PoliciesCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var Policies = $resource('/api/news/cat/6/count/10')
    Policies.query(function (policies) {
        $scope.policies = policies
    })
}])

app.controller('MediaCtrlPC', ['$scope', '$resource', function ($scope, $resource) {
    var Media = $resource('/api/news/cat/7/count/10')
    Media.query(function (media) {
        $scope.media = media
    })
}])

app.controller('NewsCtrlMobile', ['$scope', '$resource', function ($scope, $resource) {
    var News = $resource('/api/news/cat/1/count/3')
    News.query(function (news) {
        $scope.news = news
    })
}])

app.controller('NoticesCtrlMobile', ['$scope', '$resource', function ($scope, $resource) {
    var Notices = $resource('/api/news/cat/2/count/3')
    Notices.query(function (notices) {
        $scope.notices = notices
    })
}])

app.controller('PoliciesAnalysesCtrl', ['$scope', '$resource', function ($scope, $resource) {
    var Pa = $resource('/api/news/cat/8/count/7')
    Pa.query(function (pa) {
        $scope.pa = pa
    })
}])