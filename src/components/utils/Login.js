export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'simon' && password === '1234') {
                resolve();
            } else {
                reject();
            }
        }, 1000)
    })
}

