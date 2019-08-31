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
  CREATE TABLE additional_exam_groups (
    id int(11) NOT NULL,
    name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    batch_id int(11) DEFAULT NULL,
    exam_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    is_published tinyint(1) DEFAULT '0',
    result_published tinyint(1) DEFAULT '0',
    students_list varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    exam_date date DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_additional_exam_groups_on_batch_id (batch_id),
    CONSTRAINT fk_batch_id_on_batches_id FOREIGN KEY (batch_id) REFERENCES batches (id)
  )
  `);

  res.status(200).json({ Message: "record" });
};
