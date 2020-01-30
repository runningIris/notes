import socket
import time

times = raw_input('Type in the times of testing: ')

s = 0
count = 0
clientSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
clientSocket.settimeout(1)
serverAddress = ('45.32.122.77', 1200)
for i in range(int(times)):
    try:
        start = time.time()
        clientSocket.sendto(str(i), serverAddress)
        clientSocket.recvfrom(1024)
        end = time.time()
        s += end - start
        count = count + 1
    except Exception as e:
        print('Timeout ' + str(i))
clientSocket.sendto('done', serverAddress)
clientSocket.close()
print(s/count)
