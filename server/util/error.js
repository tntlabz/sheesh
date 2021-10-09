const err_names = {

    ServerError: [ "Internal Server Error", 500 ],

    TooFewArguments: [ "Too few Arguments", 400 ],

    PasswordInvalid: [ "Password invalid", 400 ],
    PasswordNotSecure: [ "Password does not match criteria", 400 ],

    UsernameInvalid: [ "Username invalid", 400 ],
    UserEmailInvalid: [ "Username/Email invalid", 400 ],
    UsernameTaken: [ "Username is already taken", 400 ],
    InvalidEmail: [ "Not a valid Email", 400 ],
}

mapped = {}
Object.keys(err_names).forEach(error => {
    mapped[error] = { error: err_names[error][0], code: err_names[error][1] }
});

module.exports = mapped;