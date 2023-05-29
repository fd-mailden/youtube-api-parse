import { ArrayService } from '../services/array-service';

describe('_ArrayService', () => {
  describe('splitArrayIntoChunks', () => {
    it('should split array into chunks of given size', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const chunkSize = 3;

      const result = ArrayService.splitArrayIntoChunks(array, chunkSize);

      expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
    });

    it('should return an empty array for an empty input array', () => {
      const array: number[] = [];
      const chunkSize = 3;

      const result = ArrayService.splitArrayIntoChunks(array, chunkSize);

      expect(result).toEqual([]);
    });
  });

  describe('flattened', () => {
    it('should flatten a nested array', () => {
      const nestedArray = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];

      const result = ArrayService.flattened(nestedArray);

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should return an empty array for an empty input', () => {
      const nestedArray: number[][] = [];

      const result = ArrayService.flattened(nestedArray);

      expect(result).toEqual([]);
    });
  });
});
