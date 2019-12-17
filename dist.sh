if [ "$1" == "update" ]; then
    ng update @angular/cli @angular/core --allow-dirty
fi

echo Building
if ! grep browserslist package.json; then
    sed -i '$s/}/\n,"browserslist": [ "> 5%" ]\n}/' package.json
fi

set -e
NODE_OPTIONS="--max-old-space-size=2048" ng build --prod
aws s3 sync --acl public-read dist/demo s3://hwangsehyun/Angular

URL="https://hwangsehyun.s3-ap-southeast-1.amazonaws.com/Angular/"
curl localhost/Angular/ | \
    perl -i -pe 's/((?:src)|(?:href))="(?!https|\/)([^"]*)"/$1="'${URL//\//\\\/}'$2"/g' | \
    aws s3 cp --acl public-read \
    --content-type "text/html; charset=utf-8" \
    --metadata-directive REPLACE \
    - s3://hwangsehyun/Angular/index.html