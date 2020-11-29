const usersDao = require('../daos/users.dao.server')
module.exports = (app) => {
    const register = (req, res) => {
        const newUser = req.body;
        usersDao.createUser(newUser)
            .then(actualUser => {
                req.session['currentUser'] = actualUser
                res.json(actualUser)
            })}

    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        usersDao.findUserByCredentials(username, password)
            .then(user => {
                if(user) {
                    req.session['currentUser'] = user
                    console.log(req.sessionID)
                    res.send(user)
                } else {
                    res.sendStatus(403)
                }})}

    const currentUser = (req, res) => {
        console.log(req.sessionID)
        if (req.session['currentUser']) {
            res.json(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const getUser = (req, res) => {
        const username = req.params.username;
        usersDao.findUserByUsername(username)
            .then(user => {
                if(user) {
                    res.send(user)
                } else {
                    res.sendStatus(403)
                }
            })
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.send(200)
    }

    app.post('/api/login', login)
    app.post('/api/register', register)
    app.get('/api/currentUser',
        currentUser)
    app.get('/api/users/:username', getUser)
    app.post('/api/logout', logout)
}
