const path = require("path");

module.exports = {
    entry: {
        "main": "./src/index.tsx",
        "preview": "./src/preview.ts",
        "chat": "./src/chat.tsx",
        "vod": "./src/vodChat.tsx"
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
                use: ["style-loader", { loader: "css-loader", options: { url: false } }],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
};