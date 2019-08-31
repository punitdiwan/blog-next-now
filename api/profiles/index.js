const db = require("../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
  const record = await db.query(escape`
  CREATE TABLE activity_log (
    id int(10) unsigned NOT NULL,
    log_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    description text COLLATE utf8_unicode_ci NOT NULL,
    subject_id int(11) DEFAULT NULL,
    subject_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    causer_id int(11) DEFAULT NULL,
    causer_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    properties text COLLATE utf8_unicode_ci,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id)
  );

  `);

  res.status(200).json({ record });
};
