if [ "$1" == "update" ]; then
    ng update @angular/cli @angular/core --allow-dirty
fi

echo Building
if ! grep -R browserslist package.json; then
    sed -i '$s/}/\n,"browserslist": [ "> 5%" ]\n}/' package.json
fi

set -e
#ng build
NODE_OPTIONS="--max-old-space-size=4096" ng build --prod

URL="https://hwangsehyun.s3-ap-southeast-1.amazonaws.com/Angular/"
if ! grep -Fxq $URL dist/demo/index.html; then
    perl -i -pe 's/((?:src)|(?:href))="(?!https)([^"]*)"/$1="'${URL//\//\\\/}'$2"/g' dist/demo/index.html 
fi
    
cat index.html >> dist/demo/index.html
aws s3 sync --acl public-read dist/demo s3://hwangsehyun/Angular