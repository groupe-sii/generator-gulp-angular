define({
    useLoader: {
        'host-node': 'dojo/dojo',
        'host-browser': 'node_modules/dojo/dojo.js'
    },

    loader: {
        packages: [
            {
                name: 'internalSrc', location: 'src/'
            }
        ]
    },

    suites: [
        'test/js/temperatureConverter.spec'
    ],

    excludeInstrumentation: /^(?:test|node_modules|bower_components|dist|doc|gulp|tools)\//
});
