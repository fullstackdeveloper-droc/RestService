(function () {
    'use strict';
    var controllerId = 'guess';
    angular.module('app').controller(controllerId, ['common', '$scope', 'datacontext', guess]);

    function guess(common, $scope, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        var $s = $scope;
        vm.allowedGuesses = 0;
        vm.currentGuesses = 0;
        vm.currentAverage = 0;
        vm.totalGuesses = 0;
        vm.messages = [];
        vm.guesses = [];
        $s.showAnswer = false;
        $s.guessesDone = false;
        $s.userDone = false;
        $s.correct = false;
        vm.numberOfGames = 0;
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Guessing Game View';

        activate();

        function activate() {
            var promises = [logbaseBinary()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Guessing Game View!!'); });
        }

        $s.showGuess = function () {
            vm.number = $s.number;
            if (vm.numberOfGames == 0)
                vm.numberOfGames = 1;
            if (vm.allowedGuesses > vm.guesses.length) {
                if (vm.topNum == undefined || vm.topNum == null) {
                    vm.num = getRandomInt(1, 1000);
                } else {
                    vm.num = getRandomInt(vm.botNum, vm.topNum);
                }
                if (vm.num != vm.number) {
                    if (vm.num > vm.number) {
                        vm.messages.push('High');
                        vm.topNum = vm.num;
                        vm.botNum = vm.number;
                        vm.guesses.push(vm.num);
                        vm.currentGuesses = vm.currentGuesses + 1;
                        vm.currentAverage = vm.currentGuesses / vm.numberOfGames;
                    }
                    else if (vm.num < vm.number) {
                        vm.messages.push('Low');
                        vm.topNum = vm.number;
                        vm.botNum = vm.num;
                        vm.guesses.push(vm.num);
                        vm.currentGuesses = vm.currentGuesses + 1;
                        vm.currentAverage = vm.currentGuesses / vm.numberOfGames;
                    }
                } else {
                    vm.messages.push('Correct');
                    vm.topNum = vm.number;
                    vm.botNum = vm.num;
                    vm.guesses.push(vm.num);
                    
                    vm.currentGuesses = vm.currentGuesses + 1;
                    vm.totalGuesses = vm.totalGuesses + vm.currentGuesses;
                    $s.correct = true;
                    vm.average = vm.totalGuesses / vm.numberOfGames;
                    $s.guessesDone = true;
                    vm.playAgainMsg = 'Would you like to play again?';
                }
            } else {
                alert('your guesses are up!');
                $s.guessesDone = true;
                vm.playAgainMsg = 'Would you like to play again?';
            }
        };

        $s.playAgain = function (play) {
            if (play == 'Y') {
                vm.guesses = [];
                vm.numberOfGames = vm.numberOfGames + 1;
                $s.number = null;
                vm.messages = [];
                vm.topNum = undefined;
                vm.botNum = undefined;
                vm.currentGuesses = 0;
                $s.guessesDone = false;
                $s.correct = false;
            } else {
                $s.number = null;
                vm.messages = [];
                vm.topNum = undefined;
                vm.botNum = undefined;
                vm.guesses = [];
                vm.average = 0;
                vm.currentGuesses = 0;
                $s.guessesDone = false;
                $s.userDone = true;
            }
        };

        // this obtains the maximum amount of guesses per number user puts in
        function logbaseBinary() {
            var z = 2;
            var x = 1000;
            var y = Math.log(x) / Math.log(z);
            y = ((Math.round(y * 1000000)) / 1000000);
            vm.allowedGuesses = Math.floor(y) + 1;
            $s.showAnswer = true;
            alert('log base ' + z + ' of ' + x + ' is ' + y);
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            if (min == vm.number) {
                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            } else if (max = vm.number) {
                return Math.ceil(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            } else {
                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            }
        }
    }
})();