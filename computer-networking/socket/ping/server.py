import socket
import random

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverSocket.bind(('', 1200))

while True:
    message, address = serverSocket.recvfrom(1024)
    print(message)
    if message.upper() == 'DONE':
        break;
    rand = random.randint(0, 9)
    serverSocket.sendto(message.upper(), address)

serverSocket.close()
