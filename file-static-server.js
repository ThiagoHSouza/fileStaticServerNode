// 'use strict';

let http = require('http'),
	fs = require('fs'),
	index = fs.readFileSync('index.html'),
	argv = require('minimist')(process.argv.slice(2));


const config = {};
(args => {
	config.port = args.p || '3000';
})(argv)

http.createServer((req, resp) => {

	let fileName = getFileName(req.url)
	let extencion = getExtencion(fileName)
	let contentTypeResponse = contentTypeMap[extencion];

	try{
		validateContentType(contentTypeResponse);
		resp.writeHead(200, ContentTypeText(contentTypeResponse))
		resp.write(fs.readFileSync(fileName));
	}catch(err){
		if(err.code == 'ENOENT'){
			console.log('ERRO = ', err)
			console.log('------ 404 FILE NOT FOUND ------')
			resp.writeHead(404, ContentType.JSON)
			resp.write(JSON.stringify({'message':'Página não encontrada'}))
		}else{
			console.log('ERRO = ', err)
		}
	}finally{
		resp.end()
	}

}).listen(config.port, () => console.log('Server runing in port : ', config.port))

function validateContentType(contentType){
	if(!contentType){
		throw new Error("Extenção inválida!");
	}
}

function getExtencion(url){
	let splitPoint = url.split('.');
	return splitPoint[splitPoint.length - 1]
}

function getFileName(url){
	if(url == '/'){
		return 'index.html'
	}else{
		return url.slice(1);
	}
}

function ContentTypeText(pType, pCharset){
	let charset = pCharset || 'utf-8'
	let type = pType || 'text/json'

	charset = type.split('/')[0] === 'text' ? '; charset=' + charset : '';

	return {'Content-Type': type + charset }
}

const contentTypeMa = {
	'aac':'audio/aac',
	'abw':'application/x-abiword',
	'arc':'application/octet-stream',
	'avi':'video/x-msvideo',
	'azw':'application/vnd.amazon.ebook',
	'bin':'application/octet-stream',
	'bz':'application/x-bzip',
	'bz2':'application/x-bzip2',
	'csh':'application/x-csh',
	'css':'text/css',
	'csv':'text/csv',
	'doc':'application/msword',
	'eot':'application/vnd.ms-fontobject',
	'epub':'application/epub+zip',
	'gif':'image/gif',
	'html':'text/html',
	'ico':'image/x-icon',
	'ics':'text/calendar',
	'jar':'application/java-archive',
	'jpeg':'image/jpeg',
	'js':'application/javascript',
	'json':'application/json',
	'mid':'audio/midi',
	'mpeg':'video/mpeg',
	'mpkg':'application/vnd.apple.installer+xml',
	'odp':'application/vnd.oasis.opendocument.presentation',
	'ods':'application/vnd.oasis.opendocument.spreadsheet',
	'odt':'application/vnd.oasis.opendocument.text',
	'oga':'audio/ogg',
	'ogv':'video/ogg',
	'ogx':'application/ogg',
	'otf':'font/otf',
	'png':'image/png',
	'pdf':'application/pdf',
	'ppt':'application/vnd.ms-powerpoint',
	'rar':'application/x-rar-compressed',
	'rtf':'application/rtf',
	'sh':'application/x-sh',
	'svg':'image/svg+xml',
	'swf':'application/x-shockwave-flash',
	'tar':'application/x-tar',
	'tif':'image/tiff',
	'ts':'application/typescript',
	'ttf':'font/ttf',
	'vsd':'application/vnd.visio',
	'wav':'audio/x-wav',
	'weba':'audio/webm',
	'webm':'video/webm',
	'webp':'image/webp',
	'woff':'font/woff',
	'woff2':'font/woff2',
	'xhtml':'application/xhtml+xml',
	'xls':'application/vnd.ms-excel',
	'xlsx':'application/vnd.ms-excel',
	'xml':'application/xml'
}
