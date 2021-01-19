var seeder = require("mongoose-seed");
const keys = require("./config/keys");
const db = keys.mongoURI;

seeder.connect(db, function() {
    seeder.loadModels( [
        "models/User.js"
    ]);
    seeder.clearModels( ['User'], () => {
        seeder.populateModels(data, (err, done) => {
            if (err) {
                return console.log("seed err", err);
            }
            try {
                if (done) {
                    return console.log("seed done", done);
                }
            }
            catch (err) {
                console.log(err);
            }
            seeder.disconnect()
        })}
    );

});

const data = [
    {
        'model': 'User',
        'documents': [
            {
                "username": "testuser",
                "email": "test@user.com",
                "password": "$2a$10$gsCQvQZvXUV92FOfQ4Lz7unpOtOuMhP2NfM4oor1MbHVwrBg3R/06",
                "performerType": "Other",
                "bio": "I'm the test user!",
                "imageURL": ""
            },
            {
                "username": "saxophoneman",
                "email": "saxxy@man.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Musician",
                "bio": "I'm a saxxy kinda guy",
                "imageURL": ""
            },
            {
                "username": "saitama",
                "email": "one@punch.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Performer",
                "bio": "I'm just a dude who performs for fun",
                "imageURL": ""
            },
            {
                "username": "2nd violinist",
                "email": "canon@d.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Musician",
                "bio": "I play violin",
                "imageURL": ""
            },
            {
                "username": "Juggalo",
                "email": "juggle@alot.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Other",
                "bio": "Can juggle ANYTHING",
                "imageURL": ""
            },
            {
                "username": "Kerrycature",
                "email": "drawsbig@noses.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Artist",
                "bio": "Will draw you, to some ability",
                "imageURL": ""
            },
            {
                "username": "jasonderulo",
                "email": "real@derulo.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Dancers",
                "bio": "no im not actually jason derulo. selling acc for $50",
                "imageURL": ""
            },
            {
                "username": "hiphophancers",
                "email": "hhh@dance.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Dancers",
                "bio": "look it was a typo",
                "imageURL": ""
            },
            {
                "username": "banger",
                "email": "hitshard@drums.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Musician",
                "bio": "I can hit stuff and make it sound good",
                "imageURL": ""
            },
            {
                "username": "AAAAAAAAAAA",
                "email": "aaaaaaaaa@aaaa.com",
                "password": "$2a$10$fzr/n2zAKLpugjB6IIFbEuVXlPa5HuAIhLsLajA59/WrMuXMY5.qi",
                "performerType": "Other",
                "bio": "AAAAAAAAAAA",
                "imageURL": ""
            }
        ]
    }
    // {
    //     'model': 'venue',
    //     'documents': [
    //         {
    //             "name": "",
    //             "coordinate": "",
    //             "type": "",
    //             "available": "",
    //             "comments": "",
    //             "ratings": ""
    //         }
    //     ]
    // }
];