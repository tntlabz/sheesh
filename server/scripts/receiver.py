import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

print(socket.gethostname())

s.bind(("94.134.180.1", 1337))
s.listen(5)

while True:
    clientsocket, address = s.accept()
    print(f"Connection from {address} has been established!")

    clientsocket.send(bytes("Welcome to the server", "utf-8"))