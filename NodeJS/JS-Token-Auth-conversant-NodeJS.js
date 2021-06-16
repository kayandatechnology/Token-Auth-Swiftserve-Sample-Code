const crypto = require('crypto');
const date = require('date-and-time');

class Conversant {
    constructor(logger) {
        this.logger = logger;
    }

    getPathToken(path) {
        let token = crypto.createHmac(global.Config.conversant.algo, global.Config.conversant.key).update(path, "binary").digest('hex').substr(0, 20);
        return token;
    }

    addWindow() {
        let stime = new Date();
        let etime = date.addSeconds(stime, global.Config.conversant.window)
        stime = date.format(stime, 'YYYYMMDDHHmmss', true);
        etime = date.format(etime, 'YYYYMMDDHHmmss', true);
        return `stime=${stime}&etime=${etime}`
    }

    getCompleteUri(originalFilename) {
        let filename = originalFilename && originalFilename.replace('.mp4', '.m3u8');
        if (originalFilename.indexOf('.avi') > -1) filename = originalFilename && originalFilename.replace('.avi', '.m3u8');
        if (originalFilename.indexOf('.quicktime') > -1) filename = originalFilename && originalFilename.replace('.quicktime', '.m3u8');
        if (filename.split('-').length > 1) {
            filename = filename.split('-')[1];
        }
        if (!filename) {
            return null;
        }
        let path = `/${originalFilename.split('-').length > 1 ? originalFilename.split('-')[0] : 'm3u8'}/${filename.substr(0, 1)}/${filename.substr(1, 2)}/${filename.substr(3, 4)}/${filename}`;
        let window = this.addWindow();
        let token = this.getPathToken(path + '?' + window);
        return global.Config.conversant.prefix + path + '?' + window + '&encoded=' + token
    }
}

module.exports = Conversant;