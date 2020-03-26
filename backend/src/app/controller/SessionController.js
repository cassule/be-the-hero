const database = require('../../database/database');

class SessionController{
  async store(req, res) {
    const { id } = req.body;

    const ong = await database('ongs')
      .where('id', id)
      .select('name')
      .first();

    if(!ong){
      return res.status(400).json({ error: 'No ONG found with this ID' });
    }

    return res.status(200).json({ ong });
  }
}

module.exports = new SessionController();