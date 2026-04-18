const prisma =  require("../lib/prisma.js");
const bcrypt =  require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
    body("email").trim()
        .custom(async (value) => {
            const isEmailUnique = await prisma.user.findUnique({
                where: {
                    email: value
                } 
            });

            if (isEmailUnique) {
                throw new Error("The email is already taken")
            }

            return true;
        }),
    body("password").trim()
        .isLength({min: 5}).withMessage("Password must have at least 5 characters"),
    body("rePassword").trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("The password does not match")
            }

            return true;
        })
]

async function signupGet(req, res) {
    res.render("signup");
}

const signupPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("signup", { errors: errors.array() });
        };

        const {email, password} = matchedData(req);
        const {firstname, lastname} = req.body;

        const name = firstname + " " + lastname;
        const hashedPword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
            email: email,
            name: name,
            password: hashedPword
        }
        })

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        req.login(user, (err) => {
            if (err) { return next(err) };
            return res.redirect("/home");
        })
    }
];

module.exports = {
    signupGet,
    signupPost
}