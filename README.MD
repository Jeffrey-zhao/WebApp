#if you gulp xxx occurs errors ,first consider to delete 'node_modules' files 
#and 'npm install' again.


#fisrt install plugins:
gulp
gulp-clean
gulp-concat
gulp-connect
gulp-cssmin
gulp-imagemin
gulp-less
gulp-load-plugins
pulp-uglify

lib
html
json
css
js
image
clean
reload
watch

#directive
scope:
{
	aa:'@abc',
	bb:'=model',
	cc:'&fun'
}

1.the value of per key in scope displays alias of a key.
2.@ means constant,= means variable,& means callbacks
3.alias value will be used in html directive, key will be used in template .