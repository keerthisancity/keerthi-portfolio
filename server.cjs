const http = require('node:http')
const https = require('node:https')
const fs = require('node:fs')
const path = require('node:path')
const { URL } = require('node:url')

const port = Number(process.env.PORT || 8080)
const root = __dirname
const apiOrigin = 'https://keerthiportfolioapi.azurewebsites.net'
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

function serveFile(response, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404)
      response.end('Not found')
      return
    }
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' })
    response.end(data)
  })
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`)
  if (requestUrl.pathname.startsWith('/api/')) {
    const upstream = new URL(requestUrl.pathname + requestUrl.search, apiOrigin)
    const proxy = https.get(upstream, { headers: { Accept: request.headers.accept || 'application/json' } }, upstreamResponse => {
      response.writeHead(upstreamResponse.statusCode || 502, upstreamResponse.headers)
      upstreamResponse.pipe(response)
    })
    proxy.on('error', () => { response.writeHead(502); response.end('API unavailable') })
    return
  }

  const requestedPath = decodeURIComponent(requestUrl.pathname)
  const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.slice(1)
  const filePath = path.resolve(root, relativePath)
  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(400)
    response.end('Bad request')
    return
  }
  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isFile()) serveFile(response, filePath)
    else serveFile(response, path.join(root, 'index.html'))
  })
})

server.listen(port, '0.0.0.0')