const path = require('path');

module.exports = {
  entry: './js/app.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jpg']
  },
  module:{
    rules: [ 
      {test: /\.tsx?$/, loader: 'ts-loader'} ,
      {test: /\.(png|jpg|gif)$/i, use: [ { loader: 'file-loader', options: { publicPath: 'dist' } }]  },
    ]
  },
  devtool: "source-map"
};