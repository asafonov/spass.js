> main.js
for i in `ls models`; do cat models/$i >> main.js; done
for i in `ls view`; do cat view/$i >> main.js; done
cat globals.js >> main.js
cat init.js >> main.js
