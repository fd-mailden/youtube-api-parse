import { InputDataService } from '../services/input-data-service';

describe('_InputDataService', () => {
  describe('getPublishDateRange', () => {
    it('should return the correct date range', () => {
      const startDate = '2023-05-01';
      const endDate = '2023-05-07';

      const result = InputDataService.getPublishDateRange(startDate, endDate);

      expect(result).toEqual({
        publishedAfter: '2023-05-01T00:00:00Z',
        publishedBefore: '2023-05-07T23:59:59Z',
      });
    });

    it('should throw an error for dates in the future', () => {
      const startDate = '2023-05-10';
      const endDate = '2034-05-15';

      expect(() => {
        InputDataService.getPublishDateRange(startDate, endDate);
      }).toThrowError('The date is in the future');
    });

    it('should throw an error for invalid date range', () => {
      const startDate = '2023-05-10';
      const endDate = '2023-05-07';

      expect(() => {
        InputDataService.getPublishDateRange(startDate, endDate);
      }).toThrowError('The start date is after the end date');
    });
  });
});
