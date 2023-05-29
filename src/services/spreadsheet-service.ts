import { google, sheets_v4 } from 'googleapis';
import { sheets } from 'googleapis/build/src/apis/sheets';
import { SPREAD_SHEET_ID, SPREAD_SHEET_URL } from '../config/variables';
import { GoogleAuth } from 'google-auth-library';

const credentials = require('../../google-config.json');

class _SpreadsheetService {
  private auth: GoogleAuth;
  private client: any;
  private sheetsSp: sheets_v4.Sheets;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [SPREAD_SHEET_URL],
    });
    this.client = null;
    this.sheetsSp = null;
  }

  private async initializeClient() {
    if (!this.client) {
      this.client = await this.auth.getClient();
    }
  }

  private initializeSheets() {
    if (!this.sheetsSp) {
      this.sheetsSp = sheets({
        version: 'v4',
        auth: this.client,
      });
    }
  }

  async writeToSpreadsheet(values: string[][], sheetName: string) {
    try {
      await this.initializeClient();
      this.initializeSheets();

      const spreadsheetId = SPREAD_SHEET_ID;

      const resource: sheets_v4.Schema$ValueRange = {
        values,
      };

      const range = `${sheetName}!A1:F${values.length + 1}`;
      const result = await this.sheetsSp.spreadsheets.values.append({
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

  async clearSpreadsheet(sheetName: string) {
    try {
      await this.initializeClient();
      this.initializeSheets();
      const spreadsheetId = SPREAD_SHEET_ID;
      const range = `${sheetName}!A1:Z`;

      const request: sheets_v4.Params$Resource$Spreadsheets$Values$Clear = {
        spreadsheetId,
        range,
        auth: this.auth,
      };

      const response = await this.sheetsSp.spreadsheets.values.clear(request);

      console.log(`The table ${sheetName}has been successfully cleared`);
    } catch (error) {
      console.error('Error when clearing the table:', error);
    }
  }
}

export const SpreadsheetService = new _SpreadsheetService();
