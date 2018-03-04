app.controller('staffLogin', function ($http, $scope) {

    $scope.staffLogin = function () {
        var res = {
            url: '/staffLogin',
            method: 'POST',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (response) {
            var resp = response.data.msg;
            console.log(resp)
            if (resp == 's') {
                console.log("logged in")
                window.location.href = '/staff'
            }
            else {
                alert('Invalid Login Id or password');
            }
        })
    }


})