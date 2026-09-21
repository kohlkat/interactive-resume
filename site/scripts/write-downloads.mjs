import { writeFileSync, mkdirSync } from 'node:fs'
import { crc32 } from 'node:zlib'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { coverPublic, resumePublic } from '../src/content/documents.ts'
import { coverDownload, resumeDownload, STREET_ADDRESS } from '../src/content/documents.download.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'docs')
mkdirSync(outDir, { recursive: true })

function crc32buf(buf) {
  return crc32(buf) >>> 0
}

function zipStore(files) {
  const parts = []
  const central = []
  let offset = 0
  for (const file of files) {
    const name = Buffer.from(file.name)
    const data = Buffer.from(file.data)
    const crc = crc32buf(data)
    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0, 8)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(data.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(name.length, 26)
    parts.push(local, name, data)
    const cen = Buffer.alloc(46)
    cen.writeUInt32LE(0x02014b50, 0)
    cen.writeUInt16LE(20, 4)
    cen.writeUInt16LE(20, 6)
    cen.writeUInt32LE(crc, 16)
    cen.writeUInt32LE(data.length, 20)
    cen.writeUInt32LE(data.length, 24)
    cen.writeUInt16LE(name.length, 28)
    cen.writeUInt32LE(offset, 42)
    central.push(cen, name)
    offset += local.length + name.length + data.length
  }
  const centralBuf = Buffer.concat(central)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(files.length, 8)
  end.writeUInt16LE(files.length, 10)
  end.writeUInt32LE(centralBuf.length, 12)
  end.writeUInt32LE(offset, 16)
  return Buffer.concat([...parts, centralBuf, end])
}

function escapeXml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function docx(text) {
  const paragraphs = text.replaceAll('\r\n', '\n').split('\n').map((line) => {
    const t = escapeXml(line)
    return `<w:p><w:r><w:t xml:space="preserve">${t}</w:t></w:r></w:p>`
  }).join('')
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080"/></w:sectPr></w:body></w:document>`
  const types = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`
  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`
  return zipStore([
    { name: '[Content_Types].xml', data: types },
    { name: '_rels/.rels', data: rels },
    { name: 'word/document.xml', data: document },
  ])
}

function writePair(base, downloadText) {
  if (!downloadText.includes(STREET_ADDRESS)) {
    throw new Error(`${base} download is missing the mailing address`)
  }
  writeFileSync(join(outDir, `${base}.txt`), downloadText)
  writeFileSync(join(outDir, `${base}.docx`), docx(downloadText))
}

for (const [name, text] of [['resume UI', resumePublic], ['cover UI', coverPublic]]) {
  if (text.includes(STREET_ADDRESS) || text.includes('15228')) {
    throw new Error(`${name} still contains the mailing address`)
  }
}

writePair('David Kohler resume', resumeDownload)
writePair('David Kohler cover letter', coverDownload)
console.log('wrote downloads to', outDir)
