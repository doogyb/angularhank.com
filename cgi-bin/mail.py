#! /usr/bin/python3

import cgi
import smtplib
import traceback
import os
from verify_email import verify_email


def send_email(user, pwd, recipient, subject, body):

    gmail_user = user
    gmail_pwd = pwd
    FROM = user
    TO = recipient if type(recipient) is list else [recipient]
    SUBJECT = subject
    TEXT = body

    # Prepare actual message
    message = """From: %s\nTo: %s\nSubject: %s\n\n%s
    """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(gmail_user, gmail_pwd)
        server.sendmail(FROM, TO, message)
        server.close()
    except:
        raise


def write_email(name, email, msg):

    # password = os.environ['HANK_NOTIFIER_MAIL']
    password = "etpuisvoila!1"
    email_contents = "Name: " + name + "\nEmail: " + email + "\n\n" + msg
    send_email("notifier.samuel.doogan@gmail.com",
               password,
               "samueldoogan@gmail.com",
               "Website Message",
               email_contents)


form = cgi.FieldStorage()
name = form.getvalue('Name')
email = form.getvalue('Email')
msg = form.getvalue("Message")

if verify_email(email):
    write_email(name, email, msg)

print("Content-type:text/html\r\n\r\n")
print("<head></head>")
print("<body>")
print("<a href='https://www.angularhank.com'>Click Here to Return</a>")
print("<img src='http://angularhank.test/images/logo/logo_speech_bubble.svg' style='width: 40%'></img>")
print("</body>")
