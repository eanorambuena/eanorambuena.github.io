import { createWriteStream } from 'fs'
import { ZipArchive } from 'archiver'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')
const pressDir = resolve(publicDir, 'press')

const output = createWriteStream(resolve(pressDir, 'presskit.zip'))
const archive = new ZipArchive({ zlib: { level: 9 } })

output.on('close', () => {
  console.log('presskit.zip created:', (archive.pointer() / 1024).toFixed(1) + ' KB')
})

archive.on('error', (err) => { throw err })

archive.pipe(output)
archive.file(resolve(pressDir, 'headshot.jpg'), { name: 'headshot.jpg' })
archive.file(resolve(pressDir, 'bio-es.txt'), { name: 'bio-es.txt' })
archive.file(resolve(pressDir, 'bio-en.txt'), { name: 'bio-en.txt' })
archive.finalize()
