app.controller('bookSearch', function ($http, $scope) {

    $scope.searchBook = function () {
        console.log($scope.data)
        var res = {
            method: 'POST',
            url: '/searchBook',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (resp) {
            $scope.books = resp.data;
            $scope.head = [{
                "title": "Book Name",
                "author": "Author",
                "number": "Book Number",
                "Stock": "Stock",
                "Available": "Available Books"
            }]
        })
    }
    $scope.searchAuthor = function () {
        var res = {
            method: 'POST',
            url: '/searchAuthor',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (resp) {
            $scope.books = resp.data;
            $scope.head = [{
                "title": "Book Name",
                "author": "Author",
                "number": "Book Number",
                "Stock": "Stock",
                "Available": "Available Books"
            }]
        })
    }
    $scope.searchNumber = function () {
        var res = {
            method: 'POST',
            url: '/searchNumber',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (resp) {
            $scope.books = resp.data;
            $scope.head = [{
                "title": "Book Name",
                "author": "Author",
                "number": "Book Number",
                "Stock": "Stock",
                "Available": "Available Books"
            }]
        })
    }
})