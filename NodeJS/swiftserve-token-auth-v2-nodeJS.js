// by : Hariom Saini

const crypto = require('crypto');

class Conversant {
    constructor(logger) {
        this.logger = logger;
    }

    getPathToken(path) {
        // let token = crypto.createHmac(global.Config.conversant.algo, global.Config.conversant.key).update(path, "binary").digest('hex').substr(0, 20);
        let token = crypto.createHash('md5').update(path, "binary").digest('hex');
        token =  Buffer.from(token, 'hex').toString('base64').replace(/\//g, '_').replace(/\=/g, '');
        return token;
    }

    addWindow() {
        let now = new Date();
        now = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
        // let expiresAt = (Math.round(now / 1000)) + global.Config.conversant.window;
        let expiresAt = (Math.round(now / 1000)) + 360000;
        return expiresAt;
    }

    /*getCompleteUri(originalFilename) {
        let filename = originalFilename && originalFilename.replace('.mp4', '.m3u8');
        if (originalFilename.indexOf('.avi') > -1) filename = originalFilename && originalFilename.replace('.avi', '.m3u8');
        if (originalFilename.indexOf('.quicktime') > -1) filename = originalFilename && originalFilename.replace('.quicktime', '.m3u8');
        if (filename.split('-').length > 1) {
            filename = filename.split('-')[1];
        }
        if (!filename) {
            return null;
        }*/
        //let dirpath = `${originalFilename.split('-').length > 1 ? originalFilename.split('-')[0] : 'm3u8'}/${filename.substr(0, 1)}/${filename.substr(1, 2)}/${filename.substr(3, 4)}`;
		let dirpath = `video/hls/001`;
        //let path = `/${originalFilename.split('-').length > 1 ? originalFilename.split('-')[0] : 'm3u8'}/${filename.substr(0, 1)}/${filename.substr(1, 2)}/${filename.substr(3, 4)}/${filename}`;
		let path = `/video/hls/001/manifest.m3u8`;
        let window = this.addWindow();
		// change 'Secret_Key_Nice' to your secret key
        let token = this.getPathToken(`${window} ${dirpath} Secret_Key_Nice`);
		//expected output : https://subdomain.secureswiftcontent.com/{token}/{window}/nip/video/hls/001/manifest.m3u8
        return 'https://subdomain.secureswiftcontent.com' + '/' + token + '/' + window + '/' + 'nip' + path
    }
}

module.exports = Conversant;
