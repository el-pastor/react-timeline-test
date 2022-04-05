import {FixedQueue} from '../FixedQueue';

const testBigArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

describe('FixedQueue', () => {
    it('should create a queue of 5 elements', () => {
        const received = FixedQueue(5, testBigArray);
        expect(JSON.stringify(received)).toEqual(JSON.stringify([1, 2, 3, 4, 5]));
    });

    it('should delete the last element when adding a new one', () => {
        const received = FixedQueue(5, testBigArray);
        received.unshift(10);
        expect(JSON.stringify(received)).toEqual(JSON.stringify([10, 1, 2, 3, 4]));
    });
});