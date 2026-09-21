import { coverBody, resumeBody } from './documents.ts'

export const STREET_ADDRESS = '135 Abbeyville Road'

const downloadHeader = `David Kohler
${STREET_ADDRESS}
Pittsburgh, PA 15228
(412) 526-6764 | Dkohlkat@gmail.com | github.com/kohlkat`

export const resumeDownload = `${downloadHeader}\n\n${resumeBody}\n`
export const coverDownload = `${downloadHeader}\n\n${coverBody}\n`
