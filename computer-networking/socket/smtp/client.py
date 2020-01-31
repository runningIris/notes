from socket import *

def init():
    # Mail content
    subject = 'Hi, there.'
    contentType = 'text/plain'
    msg = 'Welcome to the world.'
    endMsg = '\r\n.\r\n'

    mailServer = 'smtp.163.com'
    fromAddress = '****@foxmail.com'
    toAddress = '****@163.com'

    username = '******'
    password = '******'

    clientSocket = socket(AF_INET, SOCK_STREAM)

    # Connect to the mail server
    clientSocket.connect((mailServer, 25))
    recv = clientSocket.recv(1024).decode()
    print(recv) # 220 Esmtp QQ Mail Server
    if recv[:3] != '220':
        print('Failed to connect mail server.')
        return

    # Send HELO command
    heloCommand = 'HELO Iris\r\n'
    clientSocket.send(heloCommand)
    recv1 = clientSocket.recv(1024).decode()
    print(recv1) # 250 Esmtp OK
    if recv1[:3] != '250':
        print('Failed to say helo.')
        return

    # Authenticate
    clientSocket.sendall('AUTH LOGIN\r\n'.encode())
    recv2 = clientSocket.recv(1024).decode()
    print(recv2)
    if recv2[:3] != '334':
        print('334 reply not received from server')
        return

    clientSocket.sendall((username + '\r\n').encode())
    recv3 = clientSocket.recv(1024).decode()
    print(recv3)
    if recv2[:3] != '334':
        print('Username authenticate failed.')
        return

    clientSocket.sendall((password + '\r\n').encode())
    recv4 = clientSocket.recv(1024).decode()
    print(recv4)
    if recv4[:3] != '334':
        print('Password authenticate failed.')
        return

    # Send DATA command
    clientSocket.send('DATA\r\n'.encode())
    recv5 = clientSocket.recv(1024).decode()
    if recv5[:3] != '354':
        print('Failed to send DATA command.')
        return

    # Send message data
    message = 'from:' + fromAddress + '\r\n'
    message += 'to:' + toAddress + '\r\n'
    message += 'subject:' + subject + '\r\n'
    message += 'Content-Type:' + contentType + '\t\n'
    message += '\r\n' + msg
    clientSocket.sendall(message.encode())

    # Message ends with a single period
    clientSocket.sendall(endMsg.encode())
    recv6 = clientSocket.recv(1024).decode()
    print(recv6)
    if recv6[:3] != '250':
        print('Failed to send message.')
        return

    # Send QUIT command
    clientSocket.sendall('QUIT\r\n'.encode())
    clientSocket.close()

init()
