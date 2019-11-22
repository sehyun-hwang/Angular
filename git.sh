rm report*.json

for x in "$@"
do
    echo "$x"

    if [ "$x" == "pull" ]; then
        git pull origin master
        exit
    fi

    if [ "$x" == "commit" ]; then
        git add .
        git commit -m "message"
        git push
    fi
done


