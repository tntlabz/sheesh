import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("0.0.0.0", 1234))
s.listen(5)
print("Listening!")



while True:
    client_socket, addr = s.accept()
    print(f"Client with address {addr} connected")
    client_socket.send(bytes(f"You connected from {addr}", "utf-8"))
    exit()