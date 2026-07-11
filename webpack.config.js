var path = require('path');
var externals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';

var serverConfig = {
    entry: ['babel-polyfill','./app.js'],
    mode: isProduction ? "production" : "development",
    plugins: [
    ],
    output: {
        path: path.resolve(__dirname, 'Built_Server'),
        filename: 'built_server.js'
    },
    module: {
        rules: [{
                test: /\.js$|jsx/,
                use: [
                    { loader: 'babel-loader' },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.worker\.js$/,
                use: [{ loader: 'worker-loader' }],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        fallback: {
            "crypto": false,
            "http": require.resolve("stream-http"),
            "fs": false,
            "zlib": false,
            net: false,
            tls: false,
            https: require.resolve("https-browserify"),            
        },
        alias: {
            'worker_threads': false // Prevent errors related to worker_threads
        }
    },
    watch: true,
    target: 'node',
    externals: [externals()],
    /*
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },*/
    node: {
        __dirname: false,
    }
};

var clientConfig = {
    entry: './Development/Client/react_entry.js',
    mode: isProduction ? "production" : "development",
    plugins: [
    ],
    output: {
        filename: 'built_client.js',
        path: path.join(__dirname, 'Built_Client')
    },
    module: {
        rules: [{
            use: [
                { loader: 'babel-loader' },
                { loader: 'ts-loader' }
            ],
            test: /\.js$/,
            exclude: /node_modules/,
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'styleTag',
                        esModule: false,
                        insert: 'body'
                    }},
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "less-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    }
                }
            ]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'Built_Client')
    },
    target: 'web',
    resolve: {
        fallback: {
            crypto: false,
            http: require.resolve("stream-http"),
            fs: false,
            zlib: false,
            net: false,
            tls: false,
            https: require.resolve("https-browserify"),            
        },
        alias: {
            "@root": path.resolve(__dirname, "Development/Client"),
            "@context": path.resolve(__dirname, 'Development/Client/Context'),
            "@profile_template": path.resolve(__dirname, 'Development/Client/View_Templates/Profile'),
            "@data_templates": path.resolve(__dirname, 'Development/Client/Data_Templates'),
            "@logged_in_account": path.resolve(__dirname, 'Development/Client/App_Entrance/Entrance_Options/Logged_In_Account'),
            "@profile_data_editors": path.resolve(__dirname, 'Development/Client/App_Entrance/Entrance_Options/Logged_In_Account/Screen/Profile/Profile_Info_Editor/Profile_Data_Editor'),
            "@comments_container": path.resolve(__dirname, 'Development/Client/Universal_Components/Comments_Container'),
            "@universal_components": path.resolve(__dirname, 'Development/Client/Universal_Components'),
            "@popup_template": path.resolve(__dirname, 'Development/Client/Popup_Templates')
        }
    }
};


module.exports = [serverConfig, clientConfig];
