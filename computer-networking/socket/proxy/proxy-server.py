from socket import *

proxyServerSocket = socket(AF_INET, SOCK_STREAM)
proxyServerSocket.bind(('localhost', 1006))
proxyServerSocket.listen(5)

while True:
    print('Ready to serve...')
    proxyClientSocket, address = proxyServerSocket.accept()
    try:
        print('Received a connection from: ', address)
        httpText = proxyClientSocket.recv(1024).decode()
        print(httpText)
        filename = httpText.split()[1].partition("//")[2].replace('/', '_')
        print('filename: ' + filename)
        fileExist = 'false'
        try:
            f = open(filename, 'r')
            outputdata = f.readlines()
            fileExist = 'true'
            print('File exists.')
            for i in range(0, len(outputdata)):
                proxyClientSocket.send(outputdata.encode())
            print('Read from cache.')
            proxyClientSocket.close()
        except IOError:
            print('File exists: ' + fileExist)
            if fileExist == 'false':
                print('Creating a socket on proxy server.')
                pullSocket = socket(AF_INET, SOCK_STREAM)
                hostn = httpText.split()[1].partition("//")[2].partition("/")[0]
                print('Host Name: ', hostn)
                try:
                    pullSocket.connect((hostn, 80))
                    print('Socket connected to port 80 of the host\n\r')
                    pullSocket.sendall(httpText.encode())
                    buff = pullSocket.recv(4096)
                    print('File: ' + buff.decode() + '\n\r')
                    proxyClientSocket.sendall(buff)
                    print('Writing file: ' + filename)
                    tmpFile = open('./' + filename, 'w')
                    tmpFile.writelines(buff.decode())
                    tmpFile.close()
                    pullSocket.close()
                except:
                    print('Invalid Request: ' + hostn)
                    pullSocket.close()
            proxyClientSocket.close()
    except:
        proxyClientSocket.close();
proxyServerSocket.close()
