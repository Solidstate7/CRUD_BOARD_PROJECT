const Crypto = require('crypto')

class JWT {
    encode(obj) {
        return Buffer.from(JSON.stringify(obj)).toString('base64url')
    }

    decode(str_base64) {
        return JSON.parse(Buffer.from(str_base64, 'base64url').toString('utf-8'))
    }

    hash(base64url, salt) {
        return Crypto.createHmac('sha256', salt).update(base64url).digest('base64url')
    }

    sign(obj_data, salt) {
        const header = this.encode({ typ: 'JWT', alg: 'HS256' })
        const payload = this.encode(obj_data)
        const base64url = [header, payload].join('.')

        const signature = this.hash(base64url, salt)

        const jwt = [base64url, signature].join('.')
        return jwt
    }

    verify(str_token, salt) {
        try {
        const [header, payload, signature] = str_token.split('.')
        const base64url = [header, payload].join('.')
        const verifiable = this.hash(base64url, salt)

        if (signature !== verifiable) return null

        const result = this.decode(payload)
        return result
    } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = JWT