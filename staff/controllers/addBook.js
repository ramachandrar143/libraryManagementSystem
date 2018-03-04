app.controller('addBook', function ($http, $scope) {
    $scope.formSubmit = function () {
        var res = {
            method: 'POST',
            url: '/addBook',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (resp) {
            if (resp.data.msg == "success") {
                $scope.result = $scope.data.book + " Book added successfully";
                $scope.class = "alert alert-success";
            }
            else {
                $scope.result = $scope.data.book + " Book added successfully";
                $scope.class = "alert alert-success";
            }
        })
    }
})