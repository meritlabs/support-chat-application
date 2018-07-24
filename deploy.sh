

while true; do
        read -p "Would you like to deploy to Merit Support BOT to production? [Y/N]: " yn
        case $yn in
            [Yy]* ) git checkout master && git pull && heroku git:remote -a merit-support-application && git push heroku master; break;;
            [Nn]* ) heroku git:remote -a support-application && echo 'Enter current branch below' && read branch && git push heroku $branch:master; break;;
            * ) echo "Please answer yes or no.";;
        esac
    done