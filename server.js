/*
 * ansible-vault encryption service.
 */

/*
 * ansible-vault exec
 */
const child_process = require('child_process');
const command = "ansible-vault encrypt_string"

function encrypt(data) {
	const t = child_process.execSync(command + ' ' + data)
	return t.toString()
};

/* 
 * http server
 */
const express = require('express')
const app = express()
const port = 3000
const browser = "Mozilla"

app.get('/', (request, response) => {

	if (request.query.string) {
		const s = encrypt(request.query.string)

		if (request.headers['user-agent'].includes(browser)) {
			response.send(s.split(/[\r\n]/g).join('<br>').split(' ').join('&nbsp'))
		} else {
	  		response.send(s)
		}

	} else {
		response.send('ansible-vaulting service')
	}
})

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR: ', err)
  }

  console.log(`server is listening on http://localhost:${port}`)
})
