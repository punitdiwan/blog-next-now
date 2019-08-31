const db = require("../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
  const record1 = await db.query(escape`
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

  const record2 = await db.query(escape`
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
    KEY idx_additional_exam_groups_on_batch_id (batch_id)
    );
`);

  const record3 = await db.query(escape`
 CREATE TABLE additional_exam_scores (
  id int(11) NOT NULL,
  student_id int(11) DEFAULT NULL,
  additional_exam_id int(11) DEFAULT NULL,
  marks decimal(7,2) DEFAULT NULL,
  grading_level_id int(11) DEFAULT NULL,
  remarks varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_failed tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY student_id (student_id,additional_exam_id,grading_level_id),
  KEY idx_additional_exam_score_on_additional_exam_id (additional_exam_id),
  KEY idx_additional_exams_score_on_grading_level_id (grading_level_id)
);
`);

  const record4 = await db.query(escape`
CREATE TABLE additional_exams (
  id int(11) NOT NULL,
  additional_exam_group_id int(11) DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  start_time datetime DEFAULT NULL,
  end_time datetime DEFAULT NULL,
  maximum_marks int(11) DEFAULT NULL,
  minimum_marks int(11) DEFAULT NULL,
  grading_level_id int(11) DEFAULT NULL,
  weightage int(11) DEFAULT '0',
  event_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY additional_exam_group_id (additional_exam_group_id),
  KEY idx_additional_exams_on_subject_id (subject_id),
  KEY idx_additional_exams_on_grading_level_id (grading_level_id),
  KEY idx_additional_exams_on_event_id (event_id)
);
`);

  res.status(200).json({ record1, record2, record3, record4 });
};
