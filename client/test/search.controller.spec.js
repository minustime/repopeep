describe('Search Controller', function() {

    var Search;

    beforeEach(module('app'));

    beforeEach(inject(function($controller) {
        Search = $controller('Search');
    }));

    describe('getProfile()', function() {

        it('should return and valid org profile', function() {

        });

        it('should display an error message when an API rate limit is encountered', function() {

        });

        it('should display an error message when an org profile does not exist', function() {

        });
    });

});