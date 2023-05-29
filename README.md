## Inputs

### To get started you will need:

- google-config.json file, which should be on the same level as the src folder
- .env . the example is in .env.example

#### You will need a YOUTUBE_API_KEY quota of at least 15,000. Note that if you are requesting 100 YouTube channels, the quota will be 10,000.

##### Please see the cost of "https://developers.google.com/youtube/v3/determine_quota_cost" requests.

### Application uses YouTube queries like this:

- videos.list - (cost 1) - maximum number of id in one query - 50
- search.list - (cost 100) - maximum number of id in one query - 1
- channels.list - (cost 1) - maximum number of id in one query 40

### When working with the program you should take into account:

- when filling the table, old data is erased and new data is written. You can extend the functionality by adding a new
  input parameter and making the table clearing condition in `update-youtube-channels.ts and update-youtube-videos.ts`
  files for the line `await SpreadsheetService.clearSpreadsheet(SHEETS_NAMES.channels);`

### Tables

https://docs.google.com/spreadsheets/d/1OHnTKMA4filEgqw_jHsmEccxKdM7rn4KbhGi6bA-PSw/edit?usp=sharing

## Usage

1. Before running the application, ensure that all required input parameters are present, including the .env file and
   google-config.json file.
2. Build the application using the command `yarn build`.
3. Start `node dist/main.js 2023-05-01 2023-05-07`. `node dist/main.js <start_date> <end_date>`. Replace <start_date>
   and <end_date> with the desired date range for the application. Please ensure that the dates are provided in the
   format "year-month-date" (e.g., 2023-05-07). Note that the end date should not be a date from the future.
4. Optionally, you can configure the application to run at regular intervals by utilizing cron jobs or scheduling tools.
   This will allow you to automate the execution of the application based on your desired frequency.

## Test

`yarn test`

## Authors

[Danil Kravchenko](https://github.com/fd-mailden)