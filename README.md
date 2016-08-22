# Adaptive Web Components Framework

Framework for the implementation of adpative user interface components based on
the following specifications:

- [Web Components](https://www.w3.org/TR/components-intro/)
- [Custom Elements](https://www.w3.org/TR/custom-elements/)
- [Shadow DOM](https://www.w3.org/TR/shadow-dom/)


## Usage

Start the newest version of the [Google Canary browser](https://www.google.de/chrome/browser/canary.html) with following necessary flags:

```
$ <Application> --enable-blink-features=CustomElementsV1,ShadowDOMV1
```

### Mac OS X

Install [Google Canary](https://www.google.de/chrome/browser/canary.html) manually or through [Homebrew](http://brew.sh/) [Cask](https://caskroom.github.io/):

```bash
# $ brew tap phinze/homebrew-cask
# $ brew install brew-cask
$ brew cask install google-chrome-canary
```

Set an useful alias:

```bash
alias canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --enable-blink-features=CustomElementsV1,ShadowDOMV1"
```

Start a local server and open the main page:

```bash
$ cd <repository_root>
$ python -m SimpleHTTPServer 8000 & canary http://localhost:8000/index.html
```


## Funding Acknowledgement

The research leading to these results has received funding from the European
Union's Seventh Framework Programme (FP7) under grant agreement No.610510
([Prosperity4all](http://www.prosperity4all.eu/)).


## License

See the [license](LICENSE.txt) file or visit [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).
