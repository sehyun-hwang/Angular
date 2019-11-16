if [ "$1" != "update" ]; then
    ng update @angular/cli @angular/core --allow-dirty
fi
ng build