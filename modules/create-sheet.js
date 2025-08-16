import axios from 'axios';

const API_ENDPOINT = '';
const MAX_ROWS_PER_BATCH = 50;

/**
 * @param {string|Array<Array<string>>} data - data array
 * @returns {Array<Array<string>>} parsed data
 */
const parseData = (data) => {
    if (Array.isArray(data)) {
        return data;
    }

    if (typeof data === 'string') {
        return data
            .split('\n')
            .filter((line) => line.trim())
            .map((line) => line.split('|'));
    }

    throw new Error('data array');
};

/**
 * @param {string|Array<Array<string>>} data - data input
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
const createSheet = async (data) => {
    try {
        const parsedData = parseData(data);

        if (parsedData.length === 0) {
            throw new Error('data không được rỗng');
        }

        if (!parsedData.every((row) => Array.isArray(row) && row.length === 3)) {
            throw new Error('mỗi row phải có đúng 3 field: id, ten page, email');
        }

        const response = await axios.post(API_ENDPOINT, { data: parsedData });

        if (response.data.success) {
            return {
                success: true,
                url: response.data.url
            };
        } else {
            return {
                success: false,
                error: response.data.error || 'unknown error'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message || 'network error'
        };
    }
};

/**
 * @param {string|Array<Array<string>>} data - data input
 * @returns {Promise<{success: boolean, sheets: Array<{batch: number, url: string, rows: number}>, errors: Array<string>}>}
 */
const createSheetsInBatches = async (data) => {
    try {
        const parsedData = parseData(data);

        if (parsedData.length === 0) {
            throw new Error('data không được rỗng');
        }

        const batches = [];
        for (let i = 0; i < parsedData.length; i += MAX_ROWS_PER_BATCH) {
            batches.push(parsedData.slice(i, i + MAX_ROWS_PER_BATCH));
        }

        const results = {
            success: true,
            sheets: [],
            errors: []
        };

        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            const result = await createSheet(batch);

            if (result.success) {
                results.sheets.push({
                    batch: i + 1,
                    url: result.url,
                    rows: batch.length
                });
            } else {
                results.errors.push(`Batch ${i + 1}: ${result.error}`);
                results.success = false;
            }
        }

        return results;
    } catch (error) {
        return {
            success: false,
            sheets: [],
            errors: [error.message]
        };
    }
};

export { createSheet, createSheetsInBatches };
