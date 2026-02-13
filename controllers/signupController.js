const prisma =  require("../lib/prisma.js");
const bcrypt =  require("bcryptjs");

async function signupGet(req, res) {
    res.render("signup");
}
async function signupPost(req, res) {
    const {firstname, lastname, email, password} = req.body;

    const name = firstname + " " + lastname;
    const hashedPword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hashedPword
        }
    })

    res.redirect("/");
}

module.exports = {
    signupGet,
    signupPost
}