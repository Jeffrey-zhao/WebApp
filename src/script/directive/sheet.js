'use strict';

angular.module('app')
.directive('appSheet',[function(){
	return {
		restrict:"A",
		replace:true,
		scope:{
			list:'=',
			isVisible:'=',
			select:'&'
		},
		templateUrl:"view/template/sheet.html"
	}
}])
