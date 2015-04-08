/*
* author: zhaoran04
* date: 2015-04-08
* desc: 将输出打包成zip包
* from https://github.com/fex-team/fis-deploy-tar
*/

var EasyZip = require('easy-zip').EasyZip;
var zip = new EasyZip();

var cwd = process.cwd();

function normalizePath(to, root){
    if (!to){
        to = '/';
    }else if(to[0] === '.'){
        to = fis.util(cwd + '/' +  to);
    } else if(/^output\b/.test(to)){
        to = fis.util(root + '/' +  to);
    }else {
        to = fis.util(to);
    }
    return to;
}

module.exports = function(files, settings, callback) {
    if (!fis.util.is(settings, 'Array')){
        settings = [settings];
    }
    var conf = {};
    settings.forEach(function(setting){
        fis.util.merge(conf, setting);
    });
    if (!conf.file){
        fis.log.error('[fis-deploy-zip] need specify the tar file path with option [file]')
    }

    var targetPath = normalizePath(conf.file, fis.project.getProjectPath());
    if(!fis.util.exists(targetPath)){
        fis.util.mkdir(fis.util.pathinfo(targetPath).dirname);
    }

    files.forEach(function(fileInfo){
        var file = fileInfo.file;
        if(!file.release){
            fis.log.error('unable to get release path of file['
                + file.realpath
                + ']: Maybe this file is neither in current project or releasable');
        }
        var name = ((fileInfo.dest.to || '/') + fileInfo.dest.release).replace(/^\/*/g, '');

        zip.file(name, fileInfo.content);

        fis.log.debug('[fis-deploy-zip] pack file [' + name + ']');
    });

    zip.writeToFile(targetPath, function(){
        fis.log.debug('[fis-deploy-zip] zip end');
        callback && callback();
    });
}

module.exports.fullpack = true;