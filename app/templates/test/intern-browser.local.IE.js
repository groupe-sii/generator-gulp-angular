define([
    './intern-browser'
], function(intern) {
    intern.tunnel = 'NullTunnel';
    intern.tunnelOptions = {
        hostname: 'localhost',
        port: 4444
    };
    intern.environments =  [
        {
            browserName: 'IE'
        }
    ];

    return intern;
});
