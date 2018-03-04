app.controller('stuRegi', function ($http, $scope) {
    $scope.regiStudent = function () {
        var res = {
            method: 'POST',
            url: '/stuRegi',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (resp) {
            console.log(resp.data)
            if (resp.data.msg == "s") {
                $scope.data = ""
                $scope.result = "Student registration successful";
                $scope.class = "alert alert-success";
            }
            else {
                $scope.result = " Failed to register student";
                $scope.class = "alert alert-warning";
            }
        })
    }
})