app.controller('bookIssue', function ($http, $scope) {
    $scope.issueBooks = function () {
        console.log($scope.data)
        var res = {
            method: 'POST',
            url: '/issueBooks',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (res) {
            if (res.data.msg == "success") {
                $scope.result = " Book issued to " + $scope.data.id;
                $scope.class = "alert alert-success";
            }
            else {
                $scope.result = " Book issue failed!";
                $scope.class = "alert alert-warning";
            }
        })
    }
})