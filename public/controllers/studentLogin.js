app.controller('studentLogin', function ($http, $scope) {

    $scope.studentLogin = function () {
        var res = {
            url: '/studentLogin',
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
                window.location.href = '/student'
            }
            else {
                alert('Invalid Login Id or password');
            }
        })
    }


})