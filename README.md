# file-locate README

VSCode Extension "file-locate". Easily locate file on your disk.

## Features

Add the command "Locate File" in your palette, that use the selected word in editor to look for file on your disk and open it.

## Requirements

You should have the "locate" binary on your system.
Instead you can "sudo apt-get install locate" on ubuntu.

## Extension Settings

None

## Known Issues

Won't work on system who don't have locate

# Publication

## On new install of vcse
- `npm install -g vsce`
- `vsce login TwanoO67`
## Then
- `vi package.json`  to update version number
- `vcse publish`

## Release Notes

### 1.0.0

Initial release