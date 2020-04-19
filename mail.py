import cgi
form = cgi.FieldStorage()
name =  form.getvalue('Name')
email = form.getvalue('Email')
msg = form.getvalue("Message")

with open("formoutput.txt", 'w') as f:
    f.write('\n'.join([name, email, msg]))
