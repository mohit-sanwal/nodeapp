const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
    var res = utils.add(33, 11);

    expect(res).toBe(44).toBeA('number');
    // if (res != 44) {
    //     throw new Error(`Expected 44, but got ${res}`);
    // }
});


it('should asyncAdd two numbers', (done) => {
    utils.asyncAdd(33, 11, (sum) => {
        expect(sum).toBe(44).toBeA('number');
        done();
    });
});


it('should multiply two numbers', () => {
    var res = utils.square(11);

    expect(res).toBe(121).toBeA('number');
    // if (res != 121) {
    //     throw new Error(`Expected 121, but got ${res}`);
    // }
});


it('should asyncMultiply two numbers', (done) => {
    utils.asyncSquare(11, (res) => {
        expect(res).toBe(121).toBeA('number');
        done();
    });
});


it('should expect some values', () => {
    // expect(12).toNotBe(11);
    // expect({name:'mac'}).toNotEqual({name: 'Andrew'});
    // expect([2,3,4]).toInclude(2);
});

it('it should verify first and last names are set', () => {
    var user = {};
    var res = utils.setName(user, "mac bar");
    expect(res).toEqual({
        firstName: "mac",
        lastName: "bar"
    }).toInclude({
        firstName: "mac",
        lastName: "bar"
    });
})
