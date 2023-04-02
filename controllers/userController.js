
const fs = require("fs")

let file = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`))

const rand = "0123456789abcdefghijklmnopqrstuvwxyz"//STRING SET
//RANDOM STRING PROMISE
// const randomStringPro = (len, char) => {
//     return new Promise((reject, resolve) => {

//         if (len > 42) {
//             reject("The set length must be <= 42")
//         } else {
//             let data = ""

//             for (let i = len; i > 0; --i) {
//                 data += (char[Math.floor(Math.random() * char.length)])
//             }
//             resolve(data)
//         }

//     })
// }

// randomStringPro(48, rand)
//     .then((res) => {
//         console.log("This is a promise "+res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

//RANDOM STRING FUNCTION
const randomString = (len, char) => {
    let data = ""

    for (let i = len; i > 0; --i) {
        data += (char[Math.floor(Math.random() * char.length)])
    }
    return data
}


exports.checkId = (req, res, next, val) => {
    req.val = val
    req.user = file.find((el) =>
        req.val === el._id
    )
    if (!req.user) {
        return res.status(404).json({
            status: "fail",
            message: "user not found!"
        })
    }
    next()
}

exports.updateFn = (req, res, next) => {
    req.file = file.map((el) => {
        if (req.val === el._id) {
            return { ...el, ...req.body }
        } else {
            return el
        }
    })
    file = [...req.file]
    next()
}

exports.createFn = (req, res, next) => {
    let id = { "_id": randomString(24, rand) }
    file.push(Object.assign(id, req.body))
    next()
}

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: "success",
        data: file
    })
}

exports.getUser = (req, res) => {
    res.status(200).json({
        status: "success",
        data: req.user
    })
}

exports.createUser = (req, res) => {
    res.status(201).json({
        status: "success",
        data: file
    })
}

exports.updateUser = (req, res) => {
    res.status(201).json({
        status: "success",
        data: req.file
    })
}