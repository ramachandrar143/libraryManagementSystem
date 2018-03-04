app.controller('bookReturn', function ($http, $scope) {

    $scope.search = function () {
        console.log($scope.data)
        var res = {
            method: 'POST',
            url: '/returnBooks',
            data: $scope.data,
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        $http(res).then(function (resp) {
            if (resp.data.result == 402) {
                $scope.noBooksdata = "No Books Found!"
                $scope.noBooksclass = "alert alert-warning"
                alert(noBooks)
            }
            else {
                $scope.title = [{
                    "id": "Student Id",
                    "num": "Book Number",
                    "issue": "Issue Date",
                    "fine": "Fine"
                }]
                $scope.data = resp.data
                var oneDay = 24 * 60 * 60 * 1000;
                var old_date = new Date(resp.data[0].date);
                var today = new Date();
                var diffDays = Math.round(Math.abs((old_date.getTime() - today.getTime()) / (oneDay)));
                console.log(diffDays)
                $scope.button = "Return Book"
                if (diffDays > 28 && diffDays < 56) {
                    $scope.fine = 1 * diffDays;
                }
                else if (diffDays > 56) {
                    $scope.fine = 2 * diffDays;
                }
                else {
                    $scope.fine = 0;
                }
            }
        })
    }
    $scope.submit = function () {
        var a = confirm("Are you sure want to return this book(This action can't\' be redone)?");
        if (a) {
            console.log($scope.data + "will be deleted");

            var res = {
                method: 'POST',
                url: '/confirmReturn',
                data: $scope.data,
                headers: {
                    'Content-Type': 'Application/json'
                }
            }
            $http(res).then(function (resp) {
                console.log(resp.data)
            })
        }
    }
})