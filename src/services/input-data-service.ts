class _InputDataService {
  getPublishDateRange(
    startDate: string,
    endDate: string,
  ): { publishedAfter: string; publishedBefore: string } {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const currentDate = new Date();

    if (parsedStartDate > currentDate || parsedEndDate > currentDate) {
      throw new Error('The date is in the future');
    }

    if (parsedStartDate > parsedEndDate) {
      throw new Error('The start date is after the end date');
    }

    const dateRange = {
      publishedAfter: `${startDate}T00:00:00Z`,
      publishedBefore: `${endDate}T23:59:59Z`,
    };

    return dateRange;
  }
}

export const InputDataService = new _InputDataService();
