#!/bin/sh
npm start --prefix tfc-frontend &
python3 backend/manage.py runserver