import http.server
import ssl

server_address = ('0.0.0.0', 4443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
context = ssl.SSLContext()
context.load_cert_chain(certfile="server.pem", keyfile="key.pem")
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
httpd.serve_forever()
