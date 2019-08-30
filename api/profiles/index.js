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
  );
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
    KEY idx_additional_exams_score_on_grading_level_id (grading_level_id),
    CONSTRAINT fk_additional_exam_id_on_additional_exam_id FOREIGN KEY (additional_exam_id) REFERENCES additional_exams (id),
    CONSTRAINT fk_grading_level_id_gradings_levels_id FOREIGN KEY (grading_level_id) REFERENCES grading_levels (id),
    CONSTRAINT fk_student_id_on_students_id FOREIGN KEY (student_id) REFERENCES students (id)
  );
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
    KEY idx_additional_exams_on_event_id (event_id),
    CONSTRAINT fk_additional_exam_group_id_on_additional_exam_id FOREIGN KEY (additional_exam_group_id) REFERENCES additional_exam_groups (id),
    CONSTRAINT fk_event_id_on_events_id FOREIGN KEY (event_id) REFERENCES events (id),
    CONSTRAINT fk_grading_level_id_on_grading_levels_id FOREIGN KEY (grading_level_id) REFERENCES grading_levels (id),
    CONSTRAINT fk_subject_id_on_students_subjects_id FOREIGN KEY (subject_id) REFERENCES students_subjects (id)
  );
  CREATE TABLE additional_field_options (
    id int(11) NOT NULL,
    additional_field_id int(11) DEFAULT NULL,
    field_option varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    school_id int(11) DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_addional_field_options_on_additional_field_id (additional_field_id),
    KEY idx_addional_field_options_on_school_id (school_id)
  );
  CREATE TABLE additional_fields (
    id int(11) NOT NULL,
    name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    status tinyint(1) DEFAULT NULL,
    is_mandatory tinyint(1) DEFAULT '0',
    input_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    priority int(11) DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id)
  );
  CREATE TABLE admins (
    id int(10) unsigned NOT NULL,
    name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    email varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    password varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    job_title varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    remember_token varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    admin int(11) DEFAULT NULL,
    employee int(11) DEFAULT NULL,
    first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    Avtar varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY admins_email_unique (email)
  );  
  CREATE TABLE apply_leaves (
    id int(11) NOT NULL,
    employee_id int(11) DEFAULT NULL,
    employee_leave_types_id int(11) DEFAULT NULL,
    is_half_day tinyint(1) DEFAULT NULL,
    start_date date DEFAULT NULL,
    end_date date DEFAULT NULL,
    reason varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    approved tinyint(1) DEFAULT NULL,
    viewed_by_manager tinyint(1) DEFAULT '0',
    manager_remark varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_apply_leaves_on_employee_id (employee_id,employee_leave_types_id),
    KEY idx_apply_leaves_on_employee_leave_types_id (employee_leave_types_id),
    CONSTRAINT fk_employee_id_employees_id FOREIGN KEY (employee_id) REFERENCES employees (id),
    CONSTRAINT fk_employee_leave_types_id_on FOREIGN KEY (employee_leave_types_id) REFERENCES employee_leave_types (id)
  );
  CREATE TABLE ar_internal_metadata (
    key varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    value varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (key)
  );  
  CREATE TABLE archived_employee_additional_details (
    id int(11) NOT NULL,
    employee_id int(11) DEFAULT NULL,
    additional_field_id int(11) DEFAULT NULL,
    additional_info varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id),
    KEY archived_employee_additional_details_on_employee_id (employee_id),
    KEY archived_employee_additional_details_on_additional_field_id (additional_field_id),
    CONSTRAINT fk_additional_field_id_on_additional_fields FOREIGN KEY (additional_field_id) REFERENCES additional_fields (id),
    CONSTRAINT fk_employee_id_on_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id)
  );
  `);

  res.status(200).json({ record });
};
