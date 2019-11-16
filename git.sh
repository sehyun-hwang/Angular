git pull origin master

if [ "$1" == "commit" ]; then
    exit
fi

git add .
git commit -m "message"
git push