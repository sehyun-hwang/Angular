if [ "$1" == "update" ]; then
    ng update @angular/cli @angular/core --allow-dirty
fi
echo Building
#ng build
node dist.js
cat src/index.html >> dist/demo/index.html
aws s3 sync --acl public-read dist/demo s3://hwangsehyun/Angular