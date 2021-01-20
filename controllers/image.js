const clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '99b6df0cb1684b95bd3a47ee98de574a'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to Communicate with API'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get Entries!'))
}

module.exports = {
    handleImage,
    handleApiCall
}