#!/bin/sh

proxy="http://proxy.rennes.sii.fr:3128"

#cat /etc/os-release

echo ""
echo "exporting proxy"
echo ""
export http_proxy=$proxy
export https_proxy=$proxy

echo ""
echo "setting npm proxy to $proxy"
echo ""
npm config set proxy $proxy
npm config set https-proxy $proxy

echo ""
echo "setting bower proxy to $proxy"
echo ""
echo "" > $HOME/.bowerrc
cat $HOME/.bowerrc
sed -i.bak 's|"proxy": ""|"proxy": "'"$proxy"'"|g' $HOME/.bowerrc
sed -i.bak 's|"https-proxy": ""|"https-proxy": "'"$proxy"'"|g' $HOME/.bowerrc

GULP=node_modules/gulp/bin/gulp.js
BOWER=node_modules/bower/bin/bower

echo ""
echo "install node modules"
echo ""
npm install

echo ""
echo "install bower components"
echo ""
node $BOWER install

echo ""
echo "Launching phantomjs in webdriver mode..."
echo ""
./tools/phantomjs/phantomjs-2.0.0-centos-7/phantomjs --webdriver=4444 > /dev/null &
# Store the PID
phantomPID=$!

sleep 30

echo ""
echo "Run tests"
echo ""
node $GULP tests

sleep 10

echo ""
echo "Exit tests"
echo ""

kill -9 $phantomPID

echo ""
echo "linting..."
echo ""
node $GULP lint

echo ""
echo "building..."
echo ""
node $GULP build --env production

echo ""
echo ""
echo "Jenkins internal job done !"
echo ""