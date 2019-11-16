git pull origin master

echo $1
if [ "$1" != "commit" ]; then
    exit
fi

git add .
git commit -m "message"
git push