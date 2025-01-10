import scheduler from 'adonisjs-scheduler/services/main'
import fs from 'fs'
import path from 'path'

scheduler.call(() => {
    console.log("Deleting all temporary files...");

    const uploadsFolder = "storage/uploads";

    fs.readdir(uploadsFolder, (err, files) => {
        if (err) {
            console.error(`Error reading the folder: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(uploadsFolder, file);
            
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