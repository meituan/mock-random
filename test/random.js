var Random = require('..');
var _ = require('lodash');

function range(input, min, max) {
    return input >= min && input <= max;
}

describe('Random', function() {
    function t(name, result, validator) {
        if (validator) {
            it(name, function() {
                validator(result).should.be.ok;
            });
        }
    }

    // Basics
    t('bool()', Random.bool(), function(result) {
        return typeof result === 'boolean';
    });
    t('natural()', Random.natural(), function(result) {
        return range(result, 0, 9007199254740992);
    });
    t('natural(1,3)', Random.natural(1, 3), function(result) {
        return range(result, 1, 3);
    });
    t('natural(1)', Random.natural(1), function(result) {
        return result >= 1;
    });
    t('integer()', Random.integer(), function(result) {
        return range(result, -9007199254740992, 9007199254740992);
    });
    t('integer(-10, 10)', Random.integer(-10, 10), function(result) {
        return range(result, -10, 10);
    });
    t('character()', Random.character());
    t('character("lower")', Random.character('lower'));
    t('character("upper")', Random.character('upper'));
    t('character("number")', Random.character('number'));
    t('character("symbol")', Random.character('symbol'));
    t('string()', Random.string());
    t('string(10,20)', Random.string(10, 20));
    t('string(10)', Random.string(10));

    // Date
    t('date()', Random.date());
    t('time()', Random.time());
    t('datetime()', Random.datetime());
    t('datetime("yyyy-MM-dd A HH:mm:ss")', Random.datetime("yyyy-MM-dd A HH:mm:ss"));
    t('datetime("yyyy-MM-dd a HH:mm:ss")', Random.datetime("yyyy-MM-dd a HH:mm:ss"));
    t('datetime("yy-MM-dd HH:mm:ss")', Random.datetime("yy-MM-dd HH:mm:ss"));
    t('datetime("y-MM-dd HH:mm:ss")', Random.datetime("y-MM-dd HH:mm:ss"));
    t('datetime("y-M-d H:m:s")', Random.datetime("y-M-d H:m:s"));
    // yyyy-MM-dd HH:mm:ss
    t('now("year")', Random.now('year'), function(result) {
        return Random.format(new Date(), 'yyyy-01-01 00:00:00') === result;
    });
    t('now("month")', Random.now('month'), function(result) {
        return Random.format(new Date(), 'yyyy-MM-01 00:00:00') === result;
    });
    t('now("day")', Random.now('day'), function(result) {
        return Random.format(new Date(), 'yyyy-MM-dd 00:00:00') === result;
    });
    t('now("hour")', Random.now('hour'), function(result) {
        return Random.format(new Date(), 'yyyy-MM-dd HH:00:00') === result;
    });
    t('now("minute")', Random.now('minute'), function(result) {
        return Random.format(new Date(), 'yyyy-MM-dd HH:mm:00') === result;
    });
    it('now("second")', function() {
        Random.format(new Date(), 'yyyy-MM-dd HH:mm:ss').should.eql(Random.now('second', 'yyyy-MM-dd HH:mm:ss'));
    });
    t('now("week")', Random.now('week', 'yyyy-MM-dd HH:mm:ss SS'), function(result) {
        var date = new Date();
        date.setDate(date.getDate() - date.getDay());
        return Random.format(date, 'yyyy-MM-dd 00:00:00 000') === result;
    });
    it('now("yyyy-MM-dd HH:mm:ss")', function() {
        Random.format(new Date(), 'yyyy-MM-dd HH:mm:ss').should.eql(Random.now("yyyy-MM-dd HH:mm:ss"));
    });

    // Image
    t('img()', Random.img());
    t('img(100x200, 000)', Random.img('100x200', '000'));
    t('img(100x200, 000, hello)', Random.img('100x200', '000', 'hello'));
    t('img(100x200, 000, FFF, hello)', Random.img('100x200', '000', 'FFF', 'hello'));
    t('img(100x200, 000, FFF, png, hello)', Random.img('100x200', '000', 'FFF', 'png', 'hello'));

    // Color
    t('color()', Random.color());

    // Helpers
    t('capitalize()', Random.capitalize('hello'));
    t('pick()', Random.pick(Random.ad_size));
    t('shuffle()', Random.shuffle(Random.ad_size));

    // Text
    t('word()', Random.word());
    t('sentence()', Random.sentence());
    t('paragraph()', Random.paragraph());

    // Name
    t('first()', Random.first());
    t('last()', Random.last());
    t('name()', Random.name());
    t('name(true)', Random.name(true));

    // Web
    t('domain()', Random.domain());
    t('email()', Random.email());
    t('ip()', Random.ip());
    t('tld()', Random.tld());

    // Miscellaneous
    t('d4()', Random.d4());
    t('d6()', Random.d6());
    t('d8()', Random.d8());
    t('d12()', Random.d12());
    t('d20()', Random.d20());
    t('d100()', Random.d100());
    t('guid()', Random.guid());
    t('id()', Random.id());

    // Address
    t('area()', Random.area());
    t('region()', Random.region());
    
    it('range', function() {
        var data;

        data = Random.range();
        _.isArray(data).should.be.ok;
        data.length.should.equal(0);

        data = Random.range(10);
        _.isArray(data).should.be.ok;
        data.length.should.equal(10);

        data = Random.range(10, 20);
        _.isArray(data).should.be.ok;
        data.length.should.equal(10);
        data[0].should.equal(10);
        data[9].should.equal(19);

        data = Random.range(10, 20, 3);
        _.isArray(data).should.be.ok;
        data.length.should.equal(4);
        data[0].should.equal(10);
        data[3].should.equal(19);
    });

    it('increment', function() {
        Random.increment(1).should.equal(1);
        Random.increment(2).should.equal(3);
        Random.increment(3).should.equal(6);
    });
});
