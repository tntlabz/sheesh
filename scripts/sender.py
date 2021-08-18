import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("94.134.180.1", 1337))

msg = s.recv(1024)
print(msg)