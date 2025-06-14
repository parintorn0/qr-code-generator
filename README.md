<div style="display:flex; flex-direction:column; gap: 0.5em">

<div style="display:flex; align-items:center; gap:1em;">
<img src="public/logo.png" width="60" height="60" align="left">

### QR Code generator's extension

</div>

<div>

[![Install](https://img.shields.io/badge/get_add--on-FF7139?style=for-the-badge&logo=firefox&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/jjfdnjvd-qr-code-generator/)


![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/parintorn0/qr-code-generator/gh-release.yml)
![GitHub Release Date](https://img.shields.io/github/release-date/parintorn0/qr-code-generator)
![GitHub last commit](https://img.shields.io/github/last-commit/parintorn0/qr-code-generator)

</div>

</div>

![Screenshot 1](/.assets/screenshots/screenshot1.png)
![Screenshot 2](/.assets/screenshots/screenshot2.png)

### Features
- Generate QR Code of Current URL opened

- Generate QR Code of Custom Text for sharing

### Development
`pnpm install` to install dependency

`pnpm run dev` to build chrome extension

`pnpm run dev:firefox` to build firefox extension

### Build
`pnpm install` to install dependency

`pnpm run build` to build chrome extension

`pnpm run build:firefox` to build firefox extension

### Future Plan
- Due to QR Code generate by client, I planned to create my own module for better performance using WebAssembly soon.
