/*var path = require('path');


module.exports = {
	//入口：表示要用webpack打包哪个文件
	entry: '../src/main.js',
	
	//出口： 表示要打包文件到哪里
	output: { 
       path: path.resolve(_dirname, './dist'),  //指定打包好的文件， 输出到哪个目录下
       filename： 'bundle.js'  //输出文件的名称
	}
};*/

const path = require('path');


//导入在内存中生成的HTML 页面插件
//只要是插件， 都一定要放在plugins 节点中去
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './src/main.js',
	output: {
	    path: path.resolve(__dirname, './dist'),
	    filename: 'bundle.js'
	},
	devServer: {                   //这是配置dev-server 命令参数的第二种形式
	  	// --open --port 8888 --contentBase src --hot
	  	open: true,                  //自动打开浏览器
	  	port: 8888,                 //设置启动时候的运行窗口
	  	contentBase: 'src',         //指定托管的根目录
	  	hot: true                    //启用热更新
	},
    plugins: [
        new htmlWebpackPlugin({  //创建一个在内存中 生成 HTML的插件
             template: path.join(__dirname, './src/index.html'),  //指定模板页面， 将来会根据指定的页面路径，去生成内存中的页面
             filename: 'index.html'   //指定生成的页面的名称
        }),
        new VueLoaderPlugin() // 请确保引入这个插件！
    ],
	module: {
	  	rules: [
	  		{
	  			test: /\.css$/,
	  			use: [
	  			  'style-loader',
	  			  'css-loader'
		  		]      
	  		},
	  		{
	  			test: /\.(jpg|png|bmp|jpeg|gif)$/,
	  			use: 'url-loader?limit=false&name=[hash:8]-[name].[ext]'	      
	  		},
	  		{
	  			test: /\.(jpg|png|bmp|jpeg|gif|ttf|svg)$/,
	  			use: 'file-loader'	      
	  		},
			{                               
		        test: /\.m?js$/,
		        exclude: /(node_modules|bower_components)/,
		        use: {
		            loader: 'babel-loader',
		            options: {
		            presets: ['@babel/preset-env'],
		            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
		        }
		      }
		    },
		    {
                test: /\.vue$/,
        		loader: 'vue-loader'
		    }
	  	]
	}
	/*resolve: {
		alias: {   //设置vue被导入时候包的路径
			"vue$": "vue/dist/vue.js"
		}
	}*/
	
};