import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((socket.gethostname(), 1234))
s.listen(5)

while True:
    client_socket, addr = s.accept()
    client_socket.send(bytes(f"You connected from {addr}", "utf-8"))
    exit()