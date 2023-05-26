import { google, sheets_v4 } from 'googleapis';
import { sheets } from 'googleapis/build/src/apis/sheets';
import { VideoDetails } from '../types/video-details';
import { SPREADSHEAT_ID } from '../config/variables';

const credentials = require('../../google-config.json');

class _SpreadsheetService {
  async writeToSpreadsheet(values: string[][], sheetName: string) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const client: any = await auth.getClient();
      const sheetsSp: sheets_v4.Sheets = sheets({
        version: 'v4',
        auth: client,
      });

      const spreadsheetId = SPREADSHEAT_ID; // Замените на свой идентификатор таблицы

      const resource: sheets_v4.Schema$ValueRange = {
        values,
      };

      const range = `${sheetName}!A1:F${values.length + 1}`;
      const result = await sheetsSp.spreadsheets.values.append({
        range: range,
        spreadsheetId: spreadsheetId,
        valueInputOption: 'USER_ENTERED',
        requestBody: resource,
      });

      console.log(`${result.data.updates.updatedCells} cells appended.`);
    } catch (error) {
      console.error('Error writing to spreadsheet', error);
    }
  }
}

export const SpreadsheetService = new _SpreadsheetService();
