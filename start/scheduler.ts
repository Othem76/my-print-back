import scheduler from 'adonisjs-scheduler/services/main'
import { FILE_UPLOAD_DIRECTORY } from '../app/utils/consts.js'
import fs from 'fs'
import path from 'path'

scheduler.call(() => {
    console.log("Deleting all temporary files...");

    fs.readdir(FILE_UPLOAD_DIRECTORY, (err, files) => {
        if (err) {
            console.error(`Error reading the folder: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(FILE_UPLOAD_DIRECTORY, file);
            
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error(`Error deleting file ${file}: ${unlinkErr.message}`);
                } else {
                    console.log(`Deleted file: ${file}`);
                }
            });
        });
    });
}).weeklyOn(1, '6:00').immediate();