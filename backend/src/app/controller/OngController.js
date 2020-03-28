const generateUniqueId  = require('../../utils/generateUniqueId');
const database = require('../../database/database');

class OngController{
  async index (req, res) {
    const ongs = await database('ongs').select('*');

    return res.status(200).json(ongs)
  }

  async show (req, res) {
    const ongs = await database('ongs')
      .where('id', req.params.id)
      .select()
      .first();

    return res.status(200).json(ongs)
  }

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId();

    await database('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.status(200).json({ id });
  }
}

module.exports = new OngController();