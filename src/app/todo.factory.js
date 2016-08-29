(function() {
    'use strict';

    angular
        .module('todoApp')
        .factory('todoFactory', todoFactory);

    todoFactory.$inject = ['$http', '$q', 'toastr'];

    /* @ngInject */
    function todoFactory($http, $q, toastr) {
        var service = {
            getTodo: getTodo,
            addTodo: addTodo,
            editTodo: editTodo,
            deleteTodo: deleteTodo,
        };
        return service;

        ////////////////

        function getTodo() {
        	var defer = $q.defer();
            $http.get('http://localhost:58367/api/Todos').then(
            	function(response) {
                   if (typeof response.data === 'object') {
                       defer.resolve(response.data);
                   } else {
                       defer.reject(response.data);
                   }
               },
               function(error) {
                    defer.reject(error);
               }
           );

           return defer.promise;
        }

        function addTodo (todo) {
        	var defer = $q.defer();
        	
            $http.post('http://localhost:58367/api/Todos', todo).then(
            	function(response) {
	                defer.resolve(response.data);
               },
               function(error) {
	               defer.reject(error);
               }
           );

           return defer.promise;
        }

        function editTodo (id, todo) {
            var defer = $q.defer();
            $http.put('http://localhost:58367/api/Todos' + '/' + id, todo).then(
                function(response) {
                    defer.resolve(response.data);
               },
               function(error) {
                   defer.reject(error);
               }
           );

           return defer.promise;
        }

        function deleteTodo (id) {
            var defer = $q.defer();
            
            $http.delete('http://localhost:58367/api/Todos' + '/' + id).then(
                function(response) {
                    defer.resolve(response.data);
               },
               function(error) {
                   defer.reject(error);
               }
           );

           return defer.promise;
        } 
    }
})();