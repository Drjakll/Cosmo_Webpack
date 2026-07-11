import argon2 from 'argon2';

let verify_encrypted_password = async function(original, encrypted) {

    return await argon2.verify(encrypted, original);
};

let generate_encrypted_password = async function(original) {

    return await argon2.hash(original);
};

export {verify_encrypted_password, generate_encrypted_password};