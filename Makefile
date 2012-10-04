all:
	node_modules/.bin/browserify entry.js -o static/js/bundle.js --debug
