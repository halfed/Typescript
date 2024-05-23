let a = 'hello'


function generateError(message: string, code: number) {
    throw {message: message, errorCode: code};
}

try {
    generateError('An Error Occured!', 500);
} catch(err) {
    console.log('error', err);
}

a = 'world';
console.log(a);