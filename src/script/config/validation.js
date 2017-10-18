'use strict';

angular.module('app')
.config(['$validationProvider',function($validationProvider){
	var expression={
		phone:/^1[\d]{10}$/,
		password:function(value){
			return (value||'').length>5;
		},
		required:function(value){
			return !!value;
		}
	};

	var defaultMsg={
		phone:{
			success:'',
			error:"phone length must be 11"
		},
		password:{
			success:'',
			error:'password length must be at lest 6'
		},
		required:{
			success:'',
			error:'required'
		}
	};

	$validationProvider.setExpression(expression)
	.setDefaultMsg(defaultMsg);
}])
