import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrCard({ url }: { url: string }) {
  const [dataUrl, setDataUrl] = useState<string>('')
  useEffect(() => {
    QRCode.toDataURL(url, { width: 320, margin: 1 })
      .then(setDataUrl)
      .catch(() => setDataUrl(''))
  }, [url])
  return (
    <div className="card">
      <strong>Scan to open</strong>
      <p style={{opacity:.9}}>{url}</p>
      {dataUrl ? <img src={dataUrl} alt="QR code" style={{width:180, imageRendering:'crisp-edges'}}/> : <em>Generating...</em>}
      <div style={{marginTop:8}}>
        <a className="pill" href="/david-kohler.vcf" download>Download vCard</a>
      </div>
    </div>
  )
}
