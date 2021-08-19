import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(("34.247.182.205", 52128))

msg = s.recv(1024)
print(msg)