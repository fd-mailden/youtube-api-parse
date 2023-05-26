class _ArrayService {
  splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }

  flattened<T>(dataList: T[][]): T[] {
    return [].concat(...dataList);
  }
}

export const ArrayService = new _ArrayService();
