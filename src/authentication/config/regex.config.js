// (/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")

const validate = (data, type) => {
    try {
        if (type === 'email') {
            const emailRegex = new RegExp(/^[A-Za-z0-9_.-]+@[A-Za-z0-9.-]+$/, "gm")
            return emailRegex.test(data)
        } else if (type === 'username') {
            const usernameRegex = new RegExp(/^[A-Za-z0-9_!#$%&.-]+$/, "gm")
            return usernameRegex.test(data)
        }
    } catch (error) {
        return next(error)
    }
}

module.exports = { validate }