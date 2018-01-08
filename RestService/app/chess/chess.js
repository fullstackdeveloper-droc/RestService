(function () {
    'use strict';
    var controllerId = 'chess';
    angular.module('app').controller(controllerId, ['common', '$scope', 'datacontext', chess]);

    function chess(common, $scope, datacontext) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var $s = $scope;
        $s.showAnswer = false;


        vm.title = 'Chess Game - Legitimate Moves for Queen, Rook, and Knight';

        activate();



        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Chess View!!'); });
        }

        $s.showValidMoves = function (piece) {
            vm.answer = piece;
            $s.showAnswer = true;
        }

        
    }
})();