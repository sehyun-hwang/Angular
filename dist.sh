if [ "$1" == "update" ]; then
    ng update @angular/cli @angular/core --allow-dirty
fi

echo Building
if ! grep -R browserslist package.json; then
    sed -i '$s/}/\n,"browserslist": [ "> 5%" ]\n}/' package.json
fi
ng build
set -e
cp -f index.html dist/demo/index.html
node dist.js
aws s3 sync --acl public-read dist/demo s3://hwangsehyun/Angular

