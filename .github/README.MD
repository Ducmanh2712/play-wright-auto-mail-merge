# [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/ovftank)

## [link cài mail merge](https://workspace.google.com/marketplace/app/mail_merge_for_gmail/562406866377)

## api tạo sheet sheet

sửa api endpoint ở dòng 3, file `modules/create-sheet.js`:

**request body:**

```json
{
    "data": [
        ["id", "ten page", "email"],
        ["123456789", "conmeo", "conbo@conga.com"]
    ]
}
```

**response:**

- **thành công:**

    ```json
    {
        "success": true,
        "url": "https://docs.google.com/spreadsheets/d/..."
    }
    ```

- **lỗi:**

    ```json
    {
        "success": false,
        "error": "error message"
    }
    ```

## app.js(file script tạo trên gg app script)

```javascript
const createSheet = (data) => {
    try {
        const spreadsheet = SpreadsheetApp.create('beerick94');
        const [firstSheet] = spreadsheet.getSheets();
        firstSheet.setName('beerick94');

        const headers = ['id', 'ten page', 'email'];
        firstSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('not is array or empty');
        }

        if (!data.every((row) => Array.isArray(row) && row.length === 3)) {
            throw new Error('missing field: id, ten page, email');
        }

        firstSheet.getRange(2, 1, data.length, data[0].length).setValues(data);
        firstSheet.autoResizeColumns(1, headers.length);

        const file = DriveApp.getFileById(spreadsheet.getId());
        file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);

        return spreadsheet.getUrl();
    } catch {
        return false;
    }
};

const doPost = (e) => {
    try {
        const requestData = JSON.parse(e.postData.contents);

        if (!requestData.data) {
            return ContentService.createTextOutput(
                JSON.stringify({
                    success: false,
                    error: 'missing field data'
                })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        const sheetUrl = createSheet(requestData.data);

        return ContentService.createTextOutput(
            JSON.stringify({
                success: !!sheetUrl,
                url: sheetUrl || 'failed'
            })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(
            JSON.stringify({
                success: false,
                error: error.toString()
            })
        ).setMimeType(ContentService.MimeType.JSON);
    }
};
```
