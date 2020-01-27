from socket import *
serverName = '45.32.122.77'
serverPort = 12000
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect((serverName, serverPort))
sentence = raw_input('Input lowercase sentence: ')
clientSocket.send(sentence.encode())
clientSocket.send(sentence.encode())
modifiedMessage = clientSocket.recv(1024)
print('From server: ' + modifiedMessage.decode())
clientSocket.close();
