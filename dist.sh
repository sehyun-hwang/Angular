if [ "$1" == "update" ]; then
    ng update @angular/cli @angular/core --allow-dirty
fi


echo Building
ng build
cp -f index.html dist/demo/index.html
node dist.js
aws s3 sync --acl public-read dist/demo s3://hwangsehyun/Angular