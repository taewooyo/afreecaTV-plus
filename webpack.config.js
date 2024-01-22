const path = require("path");

module.exports = {
    entry: {
        "main": "./src/index.tsx",
        "preview": "./src/preview.ts",
        "chat": "./src/chat.tsx"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        },
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]?[hash]",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
};