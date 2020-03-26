const database = require('../../database/database');

class CaseController{
  async index (req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await database('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return res.status(200).json(incidents)
  }
}

module.exports = new CaseController();