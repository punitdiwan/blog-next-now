const db = require("../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
  const profiles = await db.query(escape`
  CREATE TABLE records (
    id int(11) DEFAULT NULL,
    name varchar(20) DEFAULT NULL,
    address varchar(50) DEFAULT NULL,
    avtar varchar(100) DEFAULT NULL,
    email varchar(50) DEFAULT NULL
  )`);
  let page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  if (page < 1) page = 1;
  const profiles = await db.query(escape`
      SELECT *
      FROM details
      ORDER BY id
      LIMIT ${(page - 1) * limit}, ${limit}
    `);
  const count = await db.query(escape`
      SELECT COUNT(*)
      AS profilesCount
      FROM details
    `);
  const { profilesCount } = count[0];
  const pageCount = Math.ceil(profilesCount / limit);
  res.status(200).json({ profiles, pageCount, page });
};
