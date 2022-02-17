from os import listdir
from os.path import isfile, join

import os
import sys
import smtplib

gmail_user = 'p.cloud.u01@gmail.com'
gmail_password = 'milo te da energia'

path = f'{sys.path[0]}/voces'

correo = "karinstefa@gmail.com"

files = [f for f in listdir(path) if isfile(join(path, f))]
# leer bd para saber cuales faltan por convertir
for file in files:
    [nombre, ext] = file.split('.')
    if ext != 'mp3':
        cmd = f'{sys.path[0]}/ffmpeg.exe -i {path}/{nombre}.{ext} {path}/mp3/{nombre}.mp3'
        #os.system(cmd)
        # cambiar estado en bd
        # enviar correo
        try:
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.ehlo()
            server.login(gmail_user, gmail_password)

            server.sendmail(gmail_user, correo, """\
Subject: Tu voz se ha convertido!

En hora buena hemos convertido tu voz a mp3 y ya estas participando, muchos exitos!!!""")         
        except:
            print('Something went wrong...')