# !/bin/sh
# python3 -m pip install virtualenv
echo "#############################################################"
echo "Installing Backend"
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 backend/manage.py migrate

echo "#############################################################"
echo "Installing Frontend"
npm install --prefix tfc-frontend 

export DJANGO_SUPERUSER_EMAIL=test@test.com
export DJANGO_SUPERUSER_PASSWORD=test
python3 ./backend/manage.py createsuperuser --username test --no-input

echo "#############################################################"
echo "A superuser with the following credentials has been created"
echo "username: test"
echo "password: test"
echo
echo "If that is not the case, please create your own superuser"
