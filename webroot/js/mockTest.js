Mock.mock('testMock.php', {
    'list|1-10': [{
        'id|+1': 1
    }]
});

$.getJSON('testMock.php', function(data) {
    console.log(data);
});

