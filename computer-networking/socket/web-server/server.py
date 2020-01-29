from python import *
serverPort = 10000
// AF_INET 不同主机之间通信, SOCK_STREAM TCP 等流式 socket
// 得到一个welcome socket
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
serverSocket.listen(1)
print('The server is ready to receive data: ')

while True:
    // 得到一个连接 socket
    connectionSocket, addr = serverSocket.accept();
    try:
        message = connectionSocket.recv(1024).decode();
        filename = message.split()[1]
        f = open(filename[1:])
        outputdata = f.read()
        header = ' HTTP/1.1 200 OK\nConnection: close\nContent-Type: text/html\nContent-Length: %d\n\n' % (len(outputdata))
        connectionSocket.send(header.encode())
        for i in range(0, len(outputdata)):
            connectionSocket.send(outputdata[i])
        connectionSocket.close()
    except IOError:
        header = ' HTTP/1.1 404 Not Found\nConnection: close\n'
        connectionSocket.send(header.encode())
        connectionSocket.close()
