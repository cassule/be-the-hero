const database = require('../../database/database');

class IncidentController{
  async index (req, res) {
    const { page = 1 } = req.query;

    const [count] = await database('incidents').count();

    const incidents = await database('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset(( page -1 ) * 5) 
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    res.header('X-Total-Count',  count['count(*)']);

    return res.status(200).json(incidents)
  }

  async show (req, res) {
    const incidents = await database('incidents')
      .where('id', req.params.id)
      .select()
      .first();

    return res.status(200).json(incidents)
  }

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await database('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.status(200).json(id);
  }

  async delete (req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await database('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if(!incident){
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await database('incidents').where('id', id).delete();

    return res.status(200).send();
  }
}

module.exports = new IncidentController();