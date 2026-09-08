class HTTPResponse():
    def send_success(data, message = 'Success'):
        return {
            'data': data,
            'message': message
        }

    def send_fail(code = 'UNKNOWN', message = 'Fail',):
        return {
            'code' : code,
            'message' : message,
        }