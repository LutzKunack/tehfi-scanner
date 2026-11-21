# TEHFI Scanner

The phone camera as the barcode / QR scanner for the TEHFI Production Monitor (PMP).

Open https://lutzkunack.github.io/tehfi-scanner/ on any phone, sign in once with your PMP PIN, choose the section, tap **Start camera** and scan: unit label → worker's ID card → checker's card → PASS / REJECT / HOLD card. Every scan goes straight to the PMP, which checks the PIN and applies the station rules. This page holds no data.

- `index.html` — the scanner page
- `html5-qrcode.min.js` — QR / barcode reader (html5-qrcode 2.3.8, Apache-2.0)
- `manifest.webmanifest`, `sw.js`, icons — so the scanner installs as an app on the phone's home screen
