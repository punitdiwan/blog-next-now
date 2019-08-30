const db = require("../../lib/db");
const escape = require("sql-template-strings");

module.exports = async (req, res) => {
  const record = await db.query(escape`
CREATE TABLE activity_log (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  log_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci NOT NULL,
  subject_id int(11) DEFAULT NULL,
  subject_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  causer_id int(11) DEFAULT NULL,
  causer_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  properties text COLLATE utf8_unicode_ci,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY activity_log_log_name_index (log_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


LOCK TABLES activity_log WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS additional_exam_groups;

CREATE TABLE additional_exam_groups (
  id int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table additional_exam_groups
--

LOCK TABLES additional_exam_groups WRITE;
/*!40000 ALTER TABLE additional_exam_groups DISABLE KEYS */;
/*!40000 ALTER TABLE additional_exam_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table additional_exam_scores
--

DROP TABLE IF EXISTS additional_exam_scores;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE additional_exam_scores (
  id int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table additional_exam_scores
--

LOCK TABLES additional_exam_scores WRITE;
/*!40000 ALTER TABLE additional_exam_scores DISABLE KEYS */;
/*!40000 ALTER TABLE additional_exam_scores ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table additional_exams
--

DROP TABLE IF EXISTS additional_exams;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE additional_exams (
  id int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table additional_exams
--

LOCK TABLES additional_exams WRITE;
/*!40000 ALTER TABLE additional_exams DISABLE KEYS */;
/*!40000 ALTER TABLE additional_exams ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table additional_field_options
--

DROP TABLE IF EXISTS additional_field_options;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE additional_field_options (
  id int(11) NOT NULL AUTO_INCREMENT,
  additional_field_id int(11) DEFAULT NULL,
  field_option varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  school_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_addional_field_options_on_additional_field_id (additional_field_id),
  KEY idx_addional_field_options_on_school_id (school_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table additional_field_options
--

LOCK TABLES additional_field_options WRITE;
/*!40000 ALTER TABLE additional_field_options DISABLE KEYS */;
/*!40000 ALTER TABLE additional_field_options ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table additional_fields
--

DROP TABLE IF EXISTS additional_fields;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE additional_fields (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  is_mandatory tinyint(1) DEFAULT '0',
  input_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  priority int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table additional_fields
--

LOCK TABLES additional_fields WRITE;
/*!40000 ALTER TABLE additional_fields DISABLE KEYS */;
/*!40000 ALTER TABLE additional_fields ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table admins
--

DROP TABLE IF EXISTS admins;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE admins (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table admins
--

LOCK TABLES admins WRITE;
/*!40000 ALTER TABLE admins DISABLE KEYS */;
/*!40000 ALTER TABLE admins ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table apply_leaves
--

DROP TABLE IF EXISTS apply_leaves;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE apply_leaves (
  id int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table apply_leaves
--

LOCK TABLES apply_leaves WRITE;
/*!40000 ALTER TABLE apply_leaves DISABLE KEYS */;
/*!40000 ALTER TABLE apply_leaves ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table ar_internal_metadata
--

DROP TABLE IF EXISTS ar_internal_metadata;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE ar_internal_metadata (
  key varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  value varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ar_internal_metadata
--

LOCK TABLES ar_internal_metadata WRITE;
/*!40000 ALTER TABLE ar_internal_metadata DISABLE KEYS */;
/*!40000 ALTER TABLE ar_internal_metadata ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_employee_additional_details
--

DROP TABLE IF EXISTS archived_employee_additional_details;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_employee_additional_details (
  id int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_employee_additional_details
--

LOCK TABLES archived_employee_additional_details WRITE;
/*!40000 ALTER TABLE archived_employee_additional_details DISABLE KEYS */;
/*!40000 ALTER TABLE archived_employee_additional_details ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_employee_bank_details
--

DROP TABLE IF EXISTS archived_employee_bank_details;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_employee_bank_details (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  bank_field_id int(11) DEFAULT NULL,
  bank_info varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY archived_employee_bank_details_on_employee_id (employee_id),
  KEY archived_employee_bank_details_on_bank_field_id (bank_field_id),
  CONSTRAINT fk_bank_field_id_on_bank_fields_id FOREIGN KEY (bank_field_id) REFERENCES bank_fields (id),
  CONSTRAINT fk_employee_id_on_employees_id FOREIGN KEY (employee_id) REFERENCES employees (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_employee_bank_details
--

LOCK TABLES archived_employee_bank_details WRITE;
/*!40000 ALTER TABLE archived_employee_bank_details DISABLE KEYS */;
/*!40000 ALTER TABLE archived_employee_bank_details ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_employee_salary_structures
--

DROP TABLE IF EXISTS archived_employee_salary_structures;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_employee_salary_structures (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  payroll_category_id int(11) DEFAULT NULL,
  amount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY archived_employee_salary_structures_on_employee_id (employee_id),
  KEY archived_employee_salary_structures_on_payroll_category_id (payroll_category_id),
  CONSTRAINT fk_employee_id_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id),
  CONSTRAINT fk_payroll_category_id_on_payroll_categories_id FOREIGN KEY (payroll_category_id) REFERENCES payroll_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_employee_salary_structures
--

LOCK TABLES archived_employee_salary_structures WRITE;
/*!40000 ALTER TABLE archived_employee_salary_structures DISABLE KEYS */;
/*!40000 ALTER TABLE archived_employee_salary_structures ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_employees
--

DROP TABLE IF EXISTS archived_employees;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_category_id int(11) DEFAULT NULL,
  employee_number varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  joining_date date DEFAULT NULL,
  first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  middle_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  gender varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  job_title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  employee_position_id int(11) DEFAULT NULL,
  employee_department_id int(11) DEFAULT NULL,
  reporting_manager_id int(11) DEFAULT NULL,
  employee_grade_id int(11) DEFAULT NULL,
  qualification varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  experience_detail text COLLATE utf8_unicode_ci,
  experience_year int(11) DEFAULT NULL,
  experience_month int(11) DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  status_description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  date_of_birth date DEFAULT NULL,
  marital_status varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  children_count int(11) DEFAULT NULL,
  father_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  husband_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  blood_group varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  nationality_id int(11) DEFAULT NULL,
  home_address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_country_id int(11) DEFAULT NULL,
  home_pin_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_country_id int(11) DEFAULT NULL,
  office_pin_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mobile_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  fax varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_file_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_content_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_data blob,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  photo_file_size int(11) DEFAULT NULL,
  former_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY archived_employees_on_employee_category_id (employee_category_id),
  KEY archived_employees_on_employee_position_id (employee_position_id),
  KEY archived_employees_on_employee_department_id (employee_department_id),
  KEY archived_employees_on_employee_grade_id (employee_grade_id),
  KEY archived_employees_on_nationality_id (nationality_id),
  KEY archived_employees_on_home_country_id (home_country_id),
  KEY archived_employees_on_office_country_id (office_country_id),
  KEY archived_employees_on_user_id (user_id),
  CONSTRAINT fk_employee_categories_id_on_employee_category_id FOREIGN KEY (employee_category_id) REFERENCES employee_categories (id),
  CONSTRAINT fk_employee_department_id_on_employee_departments_id FOREIGN KEY (employee_department_id) REFERENCES employee_departments (id),
  CONSTRAINT fk_employee_grade_id_on_employee_grades_id FOREIGN KEY (employee_grade_id) REFERENCES employee_grades (id),
  CONSTRAINT fk_employee_positions_id_on_employee_position_id FOREIGN KEY (employee_position_id) REFERENCES employee_positions (id),
  CONSTRAINT fk_home_country_id_on_countries_id FOREIGN KEY (home_country_id) REFERENCES countries (id),
  CONSTRAINT fk_nationality_id_on_countries_id FOREIGN KEY (nationality_id) REFERENCES countries (id),
  CONSTRAINT fk_user_id_on_users_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_employees
--

LOCK TABLES archived_employees WRITE;
/*!40000 ALTER TABLE archived_employees DISABLE KEYS */;
/*!40000 ALTER TABLE archived_employees ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_exam_scores
--

DROP TABLE IF EXISTS archived_exam_scores;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_exam_scores (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  exam_id int(11) DEFAULT NULL,
  marks decimal(7,2) DEFAULT NULL,
  grading_level_id int(11) DEFAULT NULL,
  remarks varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_failed tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  exam_group_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_archived_exam_scores_on_student_id_and_exam_id (student_id,exam_id),
  KEY archived_exam_scores_on_student_id (student_id),
  KEY archived_exam_scores_on_exam_id (exam_id),
  KEY archived_exam_scores_on_grading_level_id (grading_level_id),
  CONSTRAINT archived_exam_scores_student_id FOREIGN KEY (student_id) REFERENCES students (id),
  CONSTRAINT fk_exam_id_on_exams_id FOREIGN KEY (exam_id) REFERENCES exams (id),
  CONSTRAINT fk_grading_level_id_on_grading_levels_id_id FOREIGN KEY (grading_level_id) REFERENCES grading_levels (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_exam_scores
--

LOCK TABLES archived_exam_scores WRITE;
/*!40000 ALTER TABLE archived_exam_scores DISABLE KEYS */;
/*!40000 ALTER TABLE archived_exam_scores ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_guardians
--

DROP TABLE IF EXISTS archived_guardians;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_guardians (
  id int(11) NOT NULL AUTO_INCREMENT,
  ward_id int(11) DEFAULT NULL,
  first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  relation varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mobile_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  country_id int(11) DEFAULT NULL,
  dob date DEFAULT NULL,
  occupation varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  income varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  education varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  father_first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  father_last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY archived_guardians_on_ward_id (ward_id),
  KEY archived_guardians_on_country_id (country_id),
  CONSTRAINT fk_country_id_on_countries_id FOREIGN KEY (country_id) REFERENCES countries (id),
  CONSTRAINT fk_ward_id_on_students_id FOREIGN KEY (ward_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_guardians
--

LOCK TABLES archived_guardians WRITE;
/*!40000 ALTER TABLE archived_guardians DISABLE KEYS */;
/*!40000 ALTER TABLE archived_guardians ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table archived_students
--

DROP TABLE IF EXISTS archived_students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE archived_students (
  id int(11) NOT NULL AUTO_INCREMENT,
  admission_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  class_roll_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  admission_date date DEFAULT NULL,
  first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  middle_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  date_of_birth date DEFAULT NULL,
  gender varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  blood_group varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  birth_place varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  nationality_id int(11) DEFAULT NULL,
  language varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  religion varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  student_category_id int(11) DEFAULT NULL,
  address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  pin_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  country_id int(11) DEFAULT NULL,
  phone1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  phone2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_file_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_content_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_data blob,
  status_description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_active tinyint(1) DEFAULT '1',
  is_deleted tinyint(1) DEFAULT '0',
  immediate_contact_id int(11) DEFAULT NULL,
  is_sms_enabled tinyint(1) DEFAULT '1',
  former_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  photo_file_size int(11) DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  tc_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  aadhar_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  due_amount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY archived_students_on_admission_no (admission_no),
  KEY archived_students_on_batch_id (batch_id),
  KEY archived_students_on_nationality_id (nationality_id),
  KEY archived_students_on_student_category_id (student_category_id),
  KEY archived_students_on_country_id_2 (country_id),
  KEY archived_students_on_former_id (former_id),
  KEY archived_students_on_user_id (user_id),
  CONSTRAINT archived_students_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT archived_students_country_id FOREIGN KEY (country_id) REFERENCES countries (id),
  CONSTRAINT archived_students_nationality_id FOREIGN KEY (nationality_id) REFERENCES countries (id),
  CONSTRAINT archived_students_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_student_category_id_on_student_categories_id FOREIGN KEY (student_category_id) REFERENCES student_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table archived_students
--

LOCK TABLES archived_students WRITE;
/*!40000 ALTER TABLE archived_students DISABLE KEYS */;
/*!40000 ALTER TABLE archived_students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table assessment_scores
--

DROP TABLE IF EXISTS assessment_scores;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE assessment_scores (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  grade_points int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  exam_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  descriptive_indicator_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY score_index (student_id,batch_id,descriptive_indicator_id,exam_id),
  KEY idx_assessment_scores_on_student_id (student_id),
  KEY idx_assessment_scores_on_exam_id (exam_id),
  KEY idx_assessment_scores_on_batch_id (batch_id),
  KEY idx_assessment_scores_on_descriptive_indicator_id (descriptive_indicator_id),
  CONSTRAINT assessment_scores_exam_id FOREIGN KEY (exam_id) REFERENCES exams (id),
  CONSTRAINT assessment_scores_student_id FOREIGN KEY (student_id) REFERENCES students (id),
  CONSTRAINT fk_batch_id_on_batches FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT fk_descriptive_indicator_id_on_descriptive_indicator_id FOREIGN KEY (descriptive_indicator_id) REFERENCES descriptive_indicators (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table assessment_scores
--

LOCK TABLES assessment_scores WRITE;
/*!40000 ALTER TABLE assessment_scores DISABLE KEYS */;
/*!40000 ALTER TABLE assessment_scores ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table assets
--

DROP TABLE IF EXISTS assets;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE assets (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  amount int(11) DEFAULT NULL,
  is_inactive tinyint(1) DEFAULT '0',
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table assets
--

LOCK TABLES assets WRITE;
/*!40000 ALTER TABLE assets DISABLE KEYS */;
/*!40000 ALTER TABLE assets ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table assign_coscholastic_items
--

DROP TABLE IF EXISTS assign_coscholastic_items;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE assign_coscholastic_items (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  Student_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  observation_id int(11) DEFAULT NULL,
  obtain_grade varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  fa_group_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table assign_coscholastic_items
--

LOCK TABLES assign_coscholastic_items WRITE;
/*!40000 ALTER TABLE assign_coscholastic_items DISABLE KEYS */;
/*!40000 ALTER TABLE assign_coscholastic_items ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table attendances
--

DROP TABLE IF EXISTS attendances;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE attendances (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  period_table_entry_id int(11) DEFAULT NULL,
  forenoon tinyint(1) DEFAULT '0',
  afternoon tinyint(1) DEFAULT '0',
  reason varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  month_date date DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_attendence_on_student_id (student_id),
  KEY idx_attendence_on_period_table_entry_id (period_table_entry_id),
  KEY idx_attendence_on_batch_id (batch_id),
  CONSTRAINT fk_period_table_entry_id_on_period_entries FOREIGN KEY (period_table_entry_id) REFERENCES period_entries (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table attendances
--

LOCK TABLES attendances WRITE;
/*!40000 ALTER TABLE attendances DISABLE KEYS */;
/*!40000 ALTER TABLE attendances ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table bank_fields
--

DROP TABLE IF EXISTS bank_fields;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE bank_fields (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table bank_fields
--

LOCK TABLES bank_fields WRITE;
/*!40000 ALTER TABLE bank_fields DISABLE KEYS */;
/*!40000 ALTER TABLE bank_fields ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table batch_events
--

DROP TABLE IF EXISTS batch_events;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE batch_events (
  id int(11) NOT NULL AUTO_INCREMENT,
  event_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_batch_events_on_event_id (event_id),
  KEY idx_batch_events_on_batch_id (batch_id),
  CONSTRAINT  batch_events_event_id FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT batch_events_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table batch_events
--

LOCK TABLES batch_events WRITE;
/*!40000 ALTER TABLE batch_events DISABLE KEYS */;
/*!40000 ALTER TABLE batch_events ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table batch_groups
--

DROP TABLE IF EXISTS batch_groups;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE batch_groups (
  id int(11) NOT NULL AUTO_INCREMENT,
  course_id int(11) DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_batch_groups_on_course_id (course_id),
  CONSTRAINT fk_course_id_on_courses_id FOREIGN KEY (course_id) REFERENCES courses (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table batch_groups
--

LOCK TABLES batch_groups WRITE;
/*!40000 ALTER TABLE batch_groups DISABLE KEYS */;
/*!40000 ALTER TABLE batch_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table batch_students
--

DROP TABLE IF EXISTS batch_students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE batch_students (
  student_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  to_batch varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  KEY index_batch_students_on_batch_id_and_student_id (batch_id,student_id),
  KEY idx_batch_students_on_student_id (student_id),
  KEY idx_batch_students_on_batch_id (batch_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table batch_students
--

LOCK TABLES batch_students WRITE;
/*!40000 ALTER TABLE batch_students DISABLE KEYS */;
/*!40000 ALTER TABLE batch_students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table batches
--

DROP TABLE IF EXISTS batches;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE batches (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  course_id int(11) DEFAULT NULL,
  start_date datetime DEFAULT NULL,
  end_date datetime DEFAULT NULL,
  is_active tinyint(1) DEFAULT '1',
  is_deleted tinyint(1) DEFAULT '0',
  employee_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_batches_on_is_deleted_and_is_active (is_deleted,is_active),
  KEY index_batches_on_is_deleted_and_is_active_and_course_id_and_name (is_deleted,is_active,course_id,name),
  KEY idx_batches_on_course_id (course_id),
  KEY idx_batches_on_employee_id (employee_id),
  CONSTRAINT batches_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id),
  CONSTRAINT batches_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table batches
--

LOCK TABLES batches WRITE;
/*!40000 ALTER TABLE batches DISABLE KEYS */;
/*!40000 ALTER TABLE batches ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table calendar
--

DROP TABLE IF EXISTS calendar;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE calendar (
  calendar_date date NOT NULL,
  day_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (calendar_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table calendar
--

LOCK TABLES calendar WRITE;
/*!40000 ALTER TABLE calendar DISABLE KEYS */;
INSERT INTO calendar VALUES ('2017-01-01','Sunday'),('2017-01-02','Monday'),('2017-01-03','Tuesday'),('2017-01-04','Wednesday'),('2017-01-05','Thursday'),('2017-01-06','Friday'),('2017-01-07','Saturday'),('2017-01-08','Sunday'),('2017-01-09','Monday'),('2017-01-10','Tuesday'),('2017-01-11','Wednesday'),('2017-01-12','Thursday'),('2017-01-13','Friday'),('2017-01-14','Saturday'),('2017-01-15','Sunday'),('2017-01-16','Monday'),('2017-01-17','Tuesday'),('2017-01-18','Wednesday'),('2017-01-19','Thursday'),('2017-01-20','Friday'),('2017-01-21','Saturday'),('2017-01-22','Sunday'),('2017-01-23','Monday'),('2017-01-24','Tuesday'),('2017-01-25','Wednesday'),('2017-01-26','Thursday'),('2017-01-27','Friday'),('2017-01-28','Saturday'),('2017-01-29','Sunday'),('2017-01-30','Monday'),('2017-01-31','Tuesday'),('2017-02-01','Wednesday'),('2017-02-02','Thursday'),('2017-02-03','Friday'),('2017-02-04','Saturday'),('2017-02-05','Sunday'),('2017-02-06','Monday'),('2017-02-07','Tuesday'),('2017-02-08','Wednesday'),('2017-02-09','Thursday'),('2017-02-10','Friday'),('2017-02-11','Saturday'),('2017-02-12','Sunday'),('2017-02-13','Monday'),('2017-02-14','Tuesday'),('2017-02-15','Wednesday'),('2017-02-16','Thursday'),('2017-02-17','Friday'),('2017-02-18','Saturday'),('2017-02-19','Sunday'),('2017-02-20','Monday'),('2017-02-21','Tuesday'),('2017-02-22','Wednesday'),('2017-02-23','Thursday'),('2017-02-24','Friday'),('2017-02-25','Saturday'),('2017-02-26','Sunday'),('2017-02-27','Monday'),('2017-02-28','Tuesday'),('2017-03-01','Wednesday'),('2017-03-02','Thursday'),('2017-03-03','Friday'),('2017-03-04','Saturday'),('2017-03-05','Sunday'),('2017-03-06','Monday'),('2017-03-07','Tuesday'),('2017-03-08','Wednesday'),('2017-03-09','Thursday'),('2017-03-10','Friday'),('2017-03-11','Saturday'),('2017-03-12','Sunday'),('2017-03-13','Monday'),('2017-03-14','Tuesday'),('2017-03-15','Wednesday'),('2017-03-16','Thursday'),('2017-03-17','Friday'),('2017-03-18','Saturday'),('2017-03-19','Sunday'),('2017-03-20','Monday'),('2017-03-21','Tuesday'),('2017-03-22','Wednesday'),('2017-03-23','Thursday'),('2017-03-24','Friday'),('2017-03-25','Saturday'),('2017-03-26','Sunday'),('2017-03-27','Monday'),('2017-03-28','Tuesday'),('2017-03-29','Wednesday'),('2017-03-30','Thursday'),('2017-03-31','Friday'),('2017-04-01','Saturday'),('2017-04-02','Sunday'),('2017-04-03','Monday'),('2017-04-04','Tuesday'),('2017-04-05','Wednesday'),('2017-04-06','Thursday'),('2017-04-07','Friday'),('2017-04-08','Saturday'),('2017-04-09','Sunday'),('2017-04-10','Monday'),('2017-04-11','Tuesday'),('2017-04-12','Wednesday'),('2017-04-13','Thursday'),('2017-04-14','Friday'),('2017-04-15','Saturday'),('2017-04-16','Sunday'),('2017-04-17','Monday'),('2017-04-18','Tuesday'),('2017-04-19','Wednesday'),('2017-04-20','Thursday'),('2017-04-21','Friday'),('2017-04-22','Saturday'),('2017-04-23','Sunday'),('2017-04-24','Monday'),('2017-04-25','Tuesday'),('2017-04-26','Wednesday'),('2017-04-27','Thursday'),('2017-04-28','Friday'),('2017-04-29','Saturday'),('2017-04-30','Sunday'),('2017-05-01','Monday'),('2017-05-02','Tuesday'),('2017-05-03','Wednesday'),('2017-05-04','Thursday'),('2017-05-05','Friday'),('2017-05-06','Saturday'),('2017-05-07','Sunday'),('2017-05-08','Monday'),('2017-05-09','Tuesday'),('2017-05-10','Wednesday'),('2017-05-11','Thursday'),('2017-05-12','Friday'),('2017-05-13','Saturday'),('2017-05-14','Sunday'),('2017-05-15','Monday'),('2017-05-16','Tuesday'),('2017-05-17','Wednesday'),('2017-05-18','Thursday'),('2017-05-19','Friday'),('2017-05-20','Saturday'),('2017-05-21','Sunday'),('2017-05-22','Monday'),('2017-05-23','Tuesday'),('2017-05-24','Wednesday'),('2017-05-25','Thursday'),('2017-05-26','Friday'),('2017-05-27','Saturday'),('2017-05-28','Sunday'),('2017-05-29','Monday'),('2017-05-30','Tuesday'),('2017-05-31','Wednesday'),('2017-06-01','Thursday'),('2017-06-02','Friday'),('2017-06-03','Saturday'),('2017-06-04','Sunday'),('2017-06-05','Monday'),('2017-06-06','Tuesday'),('2017-06-07','Wednesday'),('2017-06-08','Thursday'),('2017-06-09','Friday'),('2017-06-10','Saturday'),('2017-06-11','Sunday'),('2017-06-12','Monday'),('2017-06-13','Tuesday'),('2017-06-14','Wednesday'),('2017-06-15','Thursday'),('2017-06-16','Friday'),('2017-06-17','Saturday'),('2017-06-18','Sunday'),('2017-06-19','Monday'),('2017-06-20','Tuesday'),('2017-06-21','Wednesday'),('2017-06-22','Thursday'),('2017-06-23','Friday'),('2017-06-24','Saturday'),('2017-06-25','Sunday'),('2017-06-26','Monday'),('2017-06-27','Tuesday'),('2017-06-28','Wednesday'),('2017-06-29','Thursday'),('2017-06-30','Friday'),('2017-07-01','Saturday'),('2017-07-02','Sunday'),('2017-07-03','Monday'),('2017-07-04','Tuesday'),('2017-07-05','Wednesday'),('2017-07-06','Thursday'),('2017-07-07','Friday'),('2017-07-08','Saturday'),('2017-07-09','Sunday'),('2017-07-10','Monday'),('2017-07-11','Tuesday'),('2017-07-12','Wednesday'),('2017-07-13','Thursday'),('2017-07-14','Friday'),('2017-07-15','Saturday'),('2017-07-16','Sunday'),('2017-07-17','Monday'),('2017-07-18','Tuesday'),('2017-07-19','Wednesday'),('2017-07-20','Thursday'),('2017-07-21','Friday'),('2017-07-22','Saturday'),('2017-07-23','Sunday'),('2017-07-24','Monday'),('2017-07-25','Tuesday'),('2017-07-26','Wednesday'),('2017-07-27','Thursday'),('2017-07-28','Friday'),('2017-07-29','Saturday'),('2017-07-30','Sunday'),('2017-07-31','Monday'),('2017-08-01','Tuesday'),('2017-08-02','Wednesday'),('2017-08-03','Thursday'),('2017-08-04','Friday'),('2017-08-05','Saturday'),('2017-08-06','Sunday'),('2017-08-07','Monday'),('2017-08-08','Tuesday'),('2017-08-09','Wednesday'),('2017-08-10','Thursday'),('2017-08-11','Friday'),('2017-08-12','Saturday'),('2017-08-13','Sunday'),('2017-08-14','Monday'),('2017-08-15','Tuesday'),('2017-08-16','Wednesday'),('2017-08-17','Thursday'),('2017-08-18','Friday'),('2017-08-19','Saturday'),('2017-08-20','Sunday'),('2017-08-21','Monday'),('2017-08-22','Tuesday'),('2017-08-23','Wednesday'),('2017-08-24','Thursday'),('2017-08-25','Friday'),('2017-08-26','Saturday'),('2017-08-27','Sunday'),('2017-08-28','Monday'),('2017-08-29','Tuesday'),('2017-08-30','Wednesday'),('2017-08-31','Thursday'),('2017-09-01','Friday'),('2017-09-02','Saturday'),('2017-09-03','Sunday'),('2017-09-04','Monday'),('2017-09-05','Tuesday'),('2017-09-06','Wednesday'),('2017-09-07','Thursday'),('2017-09-08','Friday'),('2017-09-09','Saturday'),('2017-09-10','Sunday'),('2017-09-11','Monday'),('2017-09-12','Tuesday'),('2017-09-13','Wednesday'),('2017-09-14','Thursday'),('2017-09-15','Friday'),('2017-09-16','Saturday'),('2017-09-17','Sunday'),('2017-09-18','Monday'),('2017-09-19','Tuesday'),('2017-09-20','Wednesday'),('2017-09-21','Thursday'),('2017-09-22','Friday'),('2017-09-23','Saturday'),('2017-09-24','Sunday'),('2017-09-25','Monday'),('2017-09-26','Tuesday'),('2017-09-27','Wednesday'),('2017-09-28','Thursday'),('2017-09-29','Friday'),('2017-09-30','Saturday'),('2017-10-01','Sunday'),('2017-10-02','Monday'),('2017-10-03','Tuesday'),('2017-10-04','Wednesday'),('2017-10-05','Thursday'),('2017-10-06','Friday'),('2017-10-07','Saturday'),('2017-10-08','Sunday'),('2017-10-09','Monday'),('2017-10-10','Tuesday'),('2017-10-11','Wednesday'),('2017-10-12','Thursday'),('2017-10-13','Friday'),('2017-10-14','Saturday'),('2017-10-15','Sunday'),('2017-10-16','Monday'),('2017-10-17','Tuesday'),('2017-10-18','Wednesday'),('2017-10-19','Thursday'),('2017-10-20','Friday'),('2017-10-21','Saturday'),('2017-10-22','Sunday'),('2017-10-23','Monday'),('2017-10-24','Tuesday'),('2017-10-25','Wednesday'),('2017-10-26','Thursday'),('2017-10-27','Friday'),('2017-10-28','Saturday'),('2017-10-29','Sunday'),('2017-10-30','Monday'),('2017-10-31','Tuesday'),('2017-11-01','Wednesday'),('2017-11-02','Thursday'),('2017-11-03','Friday'),('2017-11-04','Saturday'),('2017-11-05','Sunday'),('2017-11-06','Monday'),('2017-11-07','Tuesday'),('2017-11-08','Wednesday'),('2017-11-09','Thursday'),('2017-11-10','Friday'),('2017-11-11','Saturday'),('2017-11-12','Sunday'),('2017-11-13','Monday'),('2017-11-14','Tuesday'),('2017-11-15','Wednesday'),('2017-11-16','Thursday'),('2017-11-17','Friday'),('2017-11-18','Saturday'),('2017-11-19','Sunday'),('2017-11-20','Monday'),('2017-11-21','Tuesday'),('2017-11-22','Wednesday'),('2017-11-23','Thursday'),('2017-11-24','Friday'),('2017-11-25','Saturday'),('2017-11-26','Sunday'),('2017-11-27','Monday'),('2017-11-28','Tuesday'),('2017-11-29','Wednesday'),('2017-11-30','Thursday'),('2017-12-01','Friday'),('2017-12-02','Saturday'),('2017-12-03','Sunday'),('2017-12-04','Monday'),('2017-12-05','Tuesday'),('2017-12-06','Wednesday'),('2017-12-07','Thursday'),('2017-12-08','Friday'),('2017-12-09','Saturday'),('2017-12-10','Sunday'),('2017-12-11','Monday'),('2017-12-12','Tuesday'),('2017-12-13','Wednesday'),('2017-12-14','Thursday'),('2017-12-15','Friday'),('2017-12-16','Saturday'),('2017-12-17','Sunday'),('2017-12-18','Monday'),('2017-12-19','Tuesday'),('2017-12-20','Wednesday'),('2017-12-21','Thursday'),('2017-12-22','Friday'),('2017-12-23','Saturday'),('2017-12-24','Sunday'),('2017-12-25','Monday'),('2017-12-26','Tuesday'),('2017-12-27','Wednesday'),('2017-12-28','Thursday'),('2017-12-29','Friday'),('2017-12-30','Saturday'),('2017-12-31','Sunday'),('2018-01-01','Monday'),('2018-01-02','Tuesday'),('2018-01-03','Wednesday'),('2018-01-04','Thursday'),('2018-01-05','Friday'),('2018-01-06','Saturday'),('2018-01-07','Sunday'),('2018-01-08','Monday'),('2018-01-09','Tuesday'),('2018-01-10','Wednesday'),('2018-01-11','Thursday'),('2018-01-12','Friday'),('2018-01-13','Saturday'),('2018-01-14','Sunday'),('2018-01-15','Monday'),('2018-01-16','Tuesday'),('2018-01-17','Wednesday'),('2018-01-18','Thursday'),('2018-01-19','Friday'),('2018-01-20','Saturday'),('2018-01-21','Sunday'),('2018-01-22','Monday'),('2018-01-23','Tuesday'),('2018-01-24','Wednesday'),('2018-01-25','Thursday'),('2018-01-26','Friday'),('2018-01-27','Saturday'),('2018-01-28','Sunday'),('2018-01-29','Monday'),('2018-01-30','Tuesday'),('2018-01-31','Wednesday'),('2018-02-01','Thursday'),('2018-02-02','Friday'),('2018-02-03','Saturday'),('2018-02-04','Sunday'),('2018-02-05','Monday'),('2018-02-06','Tuesday'),('2018-02-07','Wednesday'),('2018-02-08','Thursday'),('2018-02-09','Friday'),('2018-02-10','Saturday'),('2018-02-11','Sunday'),('2018-02-12','Monday'),('2018-02-13','Tuesday'),('2018-02-14','Wednesday'),('2018-02-15','Thursday'),('2018-02-16','Friday'),('2018-02-17','Saturday'),('2018-02-18','Sunday'),('2018-02-19','Monday'),('2018-02-20','Tuesday'),('2018-02-21','Wednesday'),('2018-02-22','Thursday'),('2018-02-23','Friday'),('2018-02-24','Saturday'),('2018-02-25','Sunday'),('2018-02-26','Monday'),('2018-02-27','Tuesday'),('2018-02-28','Wednesday'),('2018-03-01','Thursday'),('2018-03-02','Friday'),('2018-03-03','Saturday'),('2018-03-04','Sunday'),('2018-03-05','Monday'),('2018-03-06','Tuesday'),('2018-03-07','Wednesday'),('2018-03-08','Thursday'),('2018-03-09','Friday'),('2018-03-10','Saturday'),('2018-03-11','Sunday'),('2018-03-12','Monday'),('2018-03-13','Tuesday'),('2018-03-14','Wednesday'),('2018-03-15','Thursday'),('2018-03-16','Friday'),('2018-03-17','Saturday'),('2018-03-18','Sunday'),('2018-03-19','Monday'),('2018-03-20','Tuesday'),('2018-03-21','Wednesday'),('2018-03-22','Thursday'),('2018-03-23','Friday'),('2018-03-24','Saturday'),('2018-03-25','Sunday'),('2018-03-26','Monday'),('2018-03-27','Tuesday'),('2018-03-28','Wednesday'),('2018-03-29','Thursday'),('2018-03-30','Friday'),('2018-03-31','Saturday'),('2018-04-01','Sunday'),('2018-04-02','Monday'),('2018-04-03','Tuesday'),('2018-04-04','Wednesday'),('2018-04-05','Thursday'),('2018-04-06','Friday'),('2018-04-07','Saturday'),('2018-04-08','Sunday'),('2018-04-09','Monday'),('2018-04-10','Tuesday'),('2018-04-11','Wednesday'),('2018-04-12','Thursday'),('2018-04-13','Friday'),('2018-04-14','Saturday'),('2018-04-15','Sunday'),('2018-04-16','Monday'),('2018-04-17','Tuesday'),('2018-04-18','Wednesday'),('2018-04-19','Thursday'),('2018-04-20','Friday'),('2018-04-21','Saturday'),('2018-04-22','Sunday'),('2018-04-23','Monday'),('2018-04-24','Tuesday'),('2018-04-25','Wednesday'),('2018-04-26','Thursday'),('2018-04-27','Friday'),('2018-04-28','Saturday'),('2018-04-29','Sunday'),('2018-04-30','Monday'),('2018-05-01','Tuesday'),('2018-05-02','Wednesday'),('2018-05-03','Thursday'),('2018-05-04','Friday'),('2018-05-05','Saturday'),('2018-05-06','Sunday'),('2018-05-07','Monday'),('2018-05-08','Tuesday'),('2018-05-09','Wednesday'),('2018-05-10','Thursday'),('2018-05-11','Friday'),('2018-05-12','Saturday'),('2018-05-13','Sunday'),('2018-05-14','Monday'),('2018-05-15','Tuesday'),('2018-05-16','Wednesday'),('2018-05-17','Thursday'),('2018-05-18','Friday'),('2018-05-19','Saturday'),('2018-05-20','Sunday'),('2018-05-21','Monday'),('2018-05-22','Tuesday'),('2018-05-23','Wednesday'),('2018-05-24','Thursday'),('2018-05-25','Friday'),('2018-05-26','Saturday'),('2018-05-27','Sunday'),('2018-05-28','Monday'),('2018-05-29','Tuesday'),('2018-05-30','Wednesday'),('2018-05-31','Thursday'),('2018-06-01','Friday'),('2018-06-02','Saturday'),('2018-06-03','Sunday'),('2018-06-04','Monday'),('2018-06-05','Tuesday'),('2018-06-06','Wednesday'),('2018-06-07','Thursday'),('2018-06-08','Friday'),('2018-06-09','Saturday'),('2018-06-10','Sunday'),('2018-06-11','Monday'),('2018-06-12','Tuesday'),('2018-06-13','Wednesday'),('2018-06-14','Thursday'),('2018-06-15','Friday'),('2018-06-16','Saturday'),('2018-06-17','Sunday'),('2018-06-18','Monday'),('2018-06-19','Tuesday'),('2018-06-20','Wednesday'),('2018-06-21','Thursday'),('2018-06-22','Friday'),('2018-06-23','Saturday'),('2018-06-24','Sunday'),('2018-06-25','Monday'),('2018-06-26','Tuesday'),('2018-06-27','Wednesday'),('2018-06-28','Thursday'),('2018-06-29','Friday'),('2018-06-30','Saturday'),('2018-07-01','Sunday'),('2018-07-02','Monday'),('2018-07-03','Tuesday'),('2018-07-04','Wednesday'),('2018-07-05','Thursday'),('2018-07-06','Friday'),('2018-07-07','Saturday'),('2018-07-08','Sunday'),('2018-07-09','Monday'),('2018-07-10','Tuesday'),('2018-07-11','Wednesday'),('2018-07-12','Thursday'),('2018-07-13','Friday'),('2018-07-14','Saturday'),('2018-07-15','Sunday'),('2018-07-16','Monday'),('2018-07-17','Tuesday'),('2018-07-18','Wednesday'),('2018-07-19','Thursday'),('2018-07-20','Friday'),('2018-07-21','Saturday'),('2018-07-22','Sunday'),('2018-07-23','Monday'),('2018-07-24','Tuesday'),('2018-07-25','Wednesday'),('2018-07-26','Thursday'),('2018-07-27','Friday'),('2018-07-28','Saturday'),('2018-07-29','Sunday'),('2018-07-30','Monday'),('2018-07-31','Tuesday'),('2018-08-01','Wednesday'),('2018-08-02','Thursday'),('2018-08-03','Friday'),('2018-08-04','Saturday'),('2018-08-05','Sunday'),('2018-08-06','Monday'),('2018-08-07','Tuesday'),('2018-08-08','Wednesday'),('2018-08-09','Thursday'),('2018-08-10','Friday'),('2018-08-11','Saturday'),('2018-08-12','Sunday'),('2018-08-13','Monday'),('2018-08-14','Tuesday'),('2018-08-15','Wednesday'),('2018-08-16','Thursday'),('2018-08-17','Friday'),('2018-08-18','Saturday'),('2018-08-19','Sunday'),('2018-08-20','Monday'),('2018-08-21','Tuesday'),('2018-08-22','Wednesday'),('2018-08-23','Thursday'),('2018-08-24','Friday'),('2018-08-25','Saturday'),('2018-08-26','Sunday'),('2018-08-27','Monday'),('2018-08-28','Tuesday'),('2018-08-29','Wednesday'),('2018-08-30','Thursday'),('2018-08-31','Friday'),('2018-09-01','Saturday'),('2018-09-02','Sunday'),('2018-09-03','Monday'),('2018-09-04','Tuesday'),('2018-09-05','Wednesday'),('2018-09-06','Thursday'),('2018-09-07','Friday'),('2018-09-08','Saturday'),('2018-09-09','Sunday'),('2018-09-10','Monday'),('2018-09-11','Tuesday'),('2018-09-12','Wednesday'),('2018-09-13','Thursday'),('2018-09-14','Friday'),('2018-09-15','Saturday'),('2018-09-16','Sunday'),('2018-09-17','Monday'),('2018-09-18','Tuesday'),('2018-09-19','Wednesday'),('2018-09-20','Thursday'),('2018-09-21','Friday'),('2018-09-22','Saturday'),('2018-09-23','Sunday'),('2018-09-24','Monday'),('2018-09-25','Tuesday'),('2018-09-26','Wednesday'),('2018-09-27','Thursday'),('2018-09-28','Friday'),('2018-09-29','Saturday'),('2018-09-30','Sunday'),('2018-10-01','Monday'),('2018-10-02','Tuesday'),('2018-10-03','Wednesday'),('2018-10-04','Thursday'),('2018-10-05','Friday'),('2018-10-06','Saturday'),('2018-10-07','Sunday'),('2018-10-08','Monday'),('2018-10-09','Tuesday'),('2018-10-10','Wednesday'),('2018-10-11','Thursday'),('2018-10-12','Friday'),('2018-10-13','Saturday'),('2018-10-14','Sunday'),('2018-10-15','Monday'),('2018-10-16','Tuesday'),('2018-10-17','Wednesday'),('2018-10-18','Thursday'),('2018-10-19','Friday'),('2018-10-20','Saturday'),('2018-10-21','Sunday'),('2018-10-22','Monday'),('2018-10-23','Tuesday'),('2018-10-24','Wednesday'),('2018-10-25','Thursday'),('2018-10-26','Friday'),('2018-10-27','Saturday'),('2018-10-28','Sunday'),('2018-10-29','Monday'),('2018-10-30','Tuesday'),('2018-10-31','Wednesday'),('2018-11-01','Thursday'),('2018-11-02','Friday'),('2018-11-03','Saturday'),('2018-11-04','Sunday'),('2018-11-05','Monday'),('2018-11-06','Tuesday'),('2018-11-07','Wednesday'),('2018-11-08','Thursday'),('2018-11-09','Friday'),('2018-11-10','Saturday'),('2018-11-11','Sunday'),('2018-11-12','Monday'),('2018-11-13','Tuesday'),('2018-11-14','Wednesday'),('2018-11-15','Thursday'),('2018-11-16','Friday'),('2018-11-17','Saturday'),('2018-11-18','Sunday'),('2018-11-19','Monday'),('2018-11-20','Tuesday'),('2018-11-21','Wednesday'),('2018-11-22','Thursday'),('2018-11-23','Friday'),('2018-11-24','Saturday'),('2018-11-25','Sunday'),('2018-11-26','Monday'),('2018-11-27','Tuesday'),('2018-11-28','Wednesday'),('2018-11-29','Thursday'),('2018-11-30','Friday'),('2018-12-01','Saturday'),('2018-12-02','Sunday'),('2018-12-03','Monday'),('2018-12-04','Tuesday'),('2018-12-05','Wednesday'),('2018-12-06','Thursday'),('2018-12-07','Friday'),('2018-12-08','Saturday'),('2018-12-09','Sunday'),('2018-12-10','Monday'),('2018-12-11','Tuesday'),('2018-12-12','Wednesday'),('2018-12-13','Thursday'),('2018-12-14','Friday'),('2018-12-15','Saturday'),('2018-12-16','Sunday'),('2018-12-17','Monday'),('2018-12-18','Tuesday'),('2018-12-19','Wednesday'),('2018-12-20','Thursday'),('2018-12-21','Friday'),('2018-12-22','Saturday'),('2018-12-23','Sunday'),('2018-12-24','Monday'),('2018-12-25','Tuesday'),('2018-12-26','Wednesday'),('2018-12-27','Thursday'),('2018-12-28','Friday'),('2018-12-29','Saturday'),('2018-12-30','Sunday'),('2018-12-31','Monday');
/*!40000 ALTER TABLE calendar ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table cce_exam_categories
--

DROP TABLE IF EXISTS cce_exam_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE cce_exam_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  desc varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table cce_exam_categories
--

LOCK TABLES cce_exam_categories WRITE;
/*!40000 ALTER TABLE cce_exam_categories DISABLE KEYS */;
INSERT INTO cce_exam_categories VALUES (1,'PT+NS+SEA+Hy','Term1',NULL,NULL),(2,'PT+NS+SEA+Ay','Term2',NULL,NULL);
/*!40000 ALTER TABLE cce_exam_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table cce_grade_sets
--

DROP TABLE IF EXISTS cce_grade_sets;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE cce_grade_sets (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table cce_grade_sets
--

LOCK TABLES cce_grade_sets WRITE;
/*!40000 ALTER TABLE cce_grade_sets DISABLE KEYS */;
INSERT INTO cce_grade_sets VALUES (1,'Co_Scholastic',NULL,NULL);
/*!40000 ALTER TABLE cce_grade_sets ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table cce_grades
--

DROP TABLE IF EXISTS cce_grades;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE cce_grades (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  grade_point double DEFAULT NULL,
  cce_grade_set_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY cce_grade_set_id (cce_grade_set_id),
  CONSTRAINT fk_cce_grade_set_id_on_cce_grade_sets_id FOREIGN KEY (cce_grade_set_id) REFERENCES cce_grade_sets (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table cce_grades
--

LOCK TABLES cce_grades WRITE;
/*!40000 ALTER TABLE cce_grades DISABLE KEYS */;
INSERT INTO cce_grades VALUES (1,'A',5,1,NULL,NULL),(2,'B',4,1,NULL,NULL),(3,'C',3,1,NULL,NULL),(4,'D',2,1,NULL,NULL),(5,'E',1,1,NULL,NULL);
/*!40000 ALTER TABLE cce_grades ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table cce_reports
--

DROP TABLE IF EXISTS cce_reports;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE cce_reports (
  id int(11) NOT NULL AUTO_INCREMENT,
  observable_id int(11) DEFAULT NULL,
  observable_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  grade_string varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  exam_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY cce_report_join_index (observable_id,student_id,batch_id,exam_id,observable_type),
  KEY idx_cce_reports_on_observable_id (observable_id),
  KEY idx_cce_reports_on_student_id (student_id),
  KEY idx_cce_reports_on_batch_id (batch_id),
  KEY idx_cce_reports_on_exam_id (exam_id),
  CONSTRAINT fk_batch_id_on_batch_students_id FOREIGN KEY (batch_id) REFERENCES batch_students (batch_id),
  CONSTRAINT fk_observable_id_on_observations_id FOREIGN KEY (observable_id) REFERENCES observations (id),
  CONSTRAINT fk_student_id_on_batch_students_id FOREIGN KEY (student_id) REFERENCES batch_students (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table cce_reports
--

LOCK TABLES cce_reports WRITE;
/*!40000 ALTER TABLE cce_reports DISABLE KEYS */;
/*!40000 ALTER TABLE cce_reports ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table cce_weightages
--

DROP TABLE IF EXISTS cce_weightages;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE cce_weightages (
  id int(11) NOT NULL AUTO_INCREMENT,
  weightage int(11) DEFAULT NULL,
  criteria_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  cce_exam_category_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY cce_exam_category_id (cce_exam_category_id),
  CONSTRAINT fk_cce_exam_categories_id_on_cce_exam_category_id FOREIGN KEY (cce_exam_category_id) REFERENCES cce_exam_categories (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table cce_weightages
--

LOCK TABLES cce_weightages WRITE;
/*!40000 ALTER TABLE cce_weightages DISABLE KEYS */;
INSERT INTO cce_weightages VALUES (1,10,'PT',1,NULL,NULL),(2,5,'NS',1,NULL,NULL),(3,5,'SEA',1,NULL,NULL),(4,80,'HY',1,NULL,NULL),(5,10,'PT',2,NULL,NULL),(6,5,'NS',2,NULL,NULL),(7,5,'SEA',2,NULL,NULL),(8,80,'AY',2,NULL,NULL);
/*!40000 ALTER TABLE cce_weightages ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table cce_weightages_courses
--

DROP TABLE IF EXISTS cce_weightages_courses;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE cce_weightages_courses (
  cce_weightage_id int(11) DEFAULT NULL,
  course_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  KEY index_for_join_table_cce_weightage_courses (course_id,cce_weightage_id),
  KEY cce_weightage_id (cce_weightage_id),
  KEY idx_cce_waitage_on_course_id (course_id),
  CONSTRAINT fk_cce_weightage_id_on_cce_weightages_id FOREIGN KEY (cce_weightage_id) REFERENCES cce_weightages (id),
  CONSTRAINT fk_cce_weightages_courses_course_id FOREIGN KEY (course_id) REFERENCES courses (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table cce_weightages_courses
--

LOCK TABLES cce_weightages_courses WRITE;
/*!40000 ALTER TABLE cce_weightages_courses DISABLE KEYS */;
/*!40000 ALTER TABLE cce_weightages_courses ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table class_designations
--

DROP TABLE IF EXISTS class_designations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE class_designations (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  cgpa decimal(15,2) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  marks decimal(15,2) DEFAULT NULL,
  course_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_class_designations_on_course_id (course_id),
  CONSTRAINT fk_course_id_on_courses FOREIGN KEY (course_id) REFERENCES courses (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table class_designations
--

LOCK TABLES class_designations WRITE;
/*!40000 ALTER TABLE class_designations DISABLE KEYS */;
/*!40000 ALTER TABLE class_designations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table class_timings
--

DROP TABLE IF EXISTS class_timings;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE class_timings (
  id int(11) NOT NULL AUTO_INCREMENT,
  batch_id int(11) DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  start_time time DEFAULT NULL,
  end_time time DEFAULT NULL,
  is_break tinyint(1) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_class_timings_on_batch_id_and_start_time_and_end_time (batch_id,start_time,end_time),
  KEY idx_class_timings_on_batch_id (batch_id),
  CONSTRAINT class_timings_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table class_timings
--

LOCK TABLES class_timings WRITE;
/*!40000 ALTER TABLE class_timings DISABLE KEYS */;
/*!40000 ALTER TABLE class_timings ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table configurations
--

DROP TABLE IF EXISTS configurations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE configurations (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  config_key varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  config_value text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  KEY configurations_config_key_index (config_key)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table configurations
--

LOCK TABLES configurations WRITE;
/*!40000 ALTER TABLE configurations DISABLE KEYS */;
INSERT INTO configurations VALUES (1,'OutstandingPrint','1'),(2,'DiscountParticularwise','0'),(3,'Password_expiry_days','30'),(4,'TransportEnable','1'),(5,'CurrentDuePrint','1'),(6,'OverallUnpaidAmountPrint','1'),(7,'SendFeeSubmitParentMail','0'),(8,'SendStudentAdmissionParentMail','0'),(9,'SmSEnquiryMessage','Thank you for showing interest in our school, your registration has been confirm we will get back to you as per schedule'),(10,'EnableLeaveManagement','0'),(11,'CCE','0'),(12,'NotificationEnable','0'),(13,'EnableParentCopyReceipt','1');
/*!40000 ALTER TABLE configurations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table countries
--

DROP TABLE IF EXISTS countries;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE countries (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table countries
--

LOCK TABLES countries WRITE;
/*!40000 ALTER TABLE countries DISABLE KEYS */;
/*!40000 ALTER TABLE countries ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table courses
--

DROP TABLE IF EXISTS courses;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE courses (
  id int(11) NOT NULL AUTO_INCREMENT,
  course_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  section_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  grading_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_courses_on_grading_type (grading_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table courses
--

LOCK TABLES courses WRITE;
/*!40000 ALTER TABLE courses DISABLE KEYS */;
/*!40000 ALTER TABLE courses ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table courses_observation_groups
--

DROP TABLE IF EXISTS courses_observation_groups;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE courses_observation_groups (
  course_id int(11) DEFAULT NULL,
  observation_group_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  KEY course_id (course_id),
  KEY observation_group_id (observation_group_id),
  CONSTRAINT fk_observation_group_id	_on_observation_group_id	 FOREIGN KEY (observation_group_id) REFERENCES observation_groups (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table courses_observation_groups
--

LOCK TABLES courses_observation_groups WRITE;
/*!40000 ALTER TABLE courses_observation_groups DISABLE KEYS */;
/*!40000 ALTER TABLE courses_observation_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table currencies
--

DROP TABLE IF EXISTS currencies;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE currencies (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  currency_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  short_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table currencies
--

LOCK TABLES currencies WRITE;
/*!40000 ALTER TABLE currencies DISABLE KEYS */;
/*!40000 ALTER TABLE currencies ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table delayed_jobs
--

DROP TABLE IF EXISTS delayed_jobs;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE delayed_jobs (
  id int(11) NOT NULL AUTO_INCREMENT,
  priority int(11) DEFAULT '0',
  attempts int(11) DEFAULT '0',
  handler text COLLATE utf8_unicode_ci,
  last_error text COLLATE utf8_unicode_ci,
  run_at datetime DEFAULT NULL,
  locked_at datetime DEFAULT NULL,
  failed_at datetime DEFAULT NULL,
  locked_by varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_delayed_jobs_on_locked_by (locked_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table delayed_jobs
--

LOCK TABLES delayed_jobs WRITE;
/*!40000 ALTER TABLE delayed_jobs DISABLE KEYS */;
/*!40000 ALTER TABLE delayed_jobs ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table descriptive_indicators
--

DROP TABLE IF EXISTS descriptive_indicators;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE descriptive_indicators (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  desc varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  describable_id int(11) DEFAULT NULL,
  describable_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  sort_order int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY describable_index (describable_id,describable_type,sort_order),
  KEY describable_id (describable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table descriptive_indicators
--

LOCK TABLES descriptive_indicators WRITE;
/*!40000 ALTER TABLE descriptive_indicators DISABLE KEYS */;
/*!40000 ALTER TABLE descriptive_indicators ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table diary_masters
--

DROP TABLE IF EXISTS diary_masters;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE diary_masters (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  content varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  attachment varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  employee_id int(11) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table diary_masters
--

LOCK TABLES diary_masters WRITE;
/*!40000 ALTER TABLE diary_masters DISABLE KEYS */;
/*!40000 ALTER TABLE diary_masters ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table diary_students
--

DROP TABLE IF EXISTS diary_students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE diary_students (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  diary_master_id int(11) NOT NULL,
  student_id int(11) NOT NULL,
  mark_as_read tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table diary_students
--

LOCK TABLES diary_students WRITE;
/*!40000 ALTER TABLE diary_students DISABLE KEYS */;
/*!40000 ALTER TABLE diary_students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table elective_groups
--

DROP TABLE IF EXISTS elective_groups;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE elective_groups (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_elective_groups_on_batch_id (batch_id),
  CONSTRAINT elective_groups_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table elective_groups
--

LOCK TABLES elective_groups WRITE;
/*!40000 ALTER TABLE elective_groups DISABLE KEYS */;
/*!40000 ALTER TABLE elective_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table electives
--

DROP TABLE IF EXISTS electives;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE electives (
  id int(11) NOT NULL AUTO_INCREMENT,
  elective_group_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY elective_group_id (elective_group_id),
  CONSTRAINT fk_elective_group_id_on_elective_group_id FOREIGN KEY (elective_group_id) REFERENCES elective_groups (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table electives
--

LOCK TABLES electives WRITE;
/*!40000 ALTER TABLE electives DISABLE KEYS */;
/*!40000 ALTER TABLE electives ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_additional_details
--

DROP TABLE IF EXISTS employee_additional_details;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_additional_details (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  additional_field_id int(11) DEFAULT NULL,
  additional_info varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_emp_add_details_on_employee_id (employee_id),
  KEY idx_emp_add_details_on_additional_field_id (additional_field_id),
  CONSTRAINT employee_additional_details_additional_field_id	 FOREIGN KEY (additional_field_id) REFERENCES additional_fields (id),
  CONSTRAINT employee_additional_details_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_additional_details
--

LOCK TABLES employee_additional_details WRITE;
/*!40000 ALTER TABLE employee_additional_details DISABLE KEYS */;
/*!40000 ALTER TABLE employee_additional_details ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_attendances
--

DROP TABLE IF EXISTS employee_attendances;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_attendances (
  id int(11) NOT NULL AUTO_INCREMENT,
  attendance_date date DEFAULT NULL,
  employee_id int(11) DEFAULT NULL,
  employee_leave_type_id int(11) DEFAULT NULL,
  reason varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_half_day tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_emp_attend_on_employee_id (employee_id,employee_leave_type_id),
  KEY idx_emp_attend_on_employee_leave_type_id (employee_leave_type_id),
  CONSTRAINT employee_attendances_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id),
  CONSTRAINT fk_employee_leave_type_id_on_employee_leave_type_id FOREIGN KEY (employee_leave_type_id) REFERENCES employee_leave_types (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_attendances
--

LOCK TABLES employee_attendances WRITE;
/*!40000 ALTER TABLE employee_attendances DISABLE KEYS */;
/*!40000 ALTER TABLE employee_attendances ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_bank_details
--

DROP TABLE IF EXISTS employee_bank_details;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_bank_details (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  bank_field_id int(11) DEFAULT NULL,
  bank_info varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_empbank_details_on_employee_id (employee_id),
  KEY idx_empbank_details_on_bank_field_id (bank_field_id),
  CONSTRAINT employee_bank_details_bank_field_id FOREIGN KEY (bank_field_id) REFERENCES bank_fields (id),
  CONSTRAINT employee_bank_details_employee_id	 FOREIGN KEY (employee_id) REFERENCES employees (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_bank_details
--

LOCK TABLES employee_bank_details WRITE;
/*!40000 ALTER TABLE employee_bank_details DISABLE KEYS */;
/*!40000 ALTER TABLE employee_bank_details ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_categories
--

DROP TABLE IF EXISTS employee_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  prefix varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_categories
--

LOCK TABLES employee_categories WRITE;
/*!40000 ALTER TABLE employee_categories DISABLE KEYS */;
/*!40000 ALTER TABLE employee_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_department_events
--

DROP TABLE IF EXISTS employee_department_events;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_department_events (
  id int(11) NOT NULL AUTO_INCREMENT,
  event_id int(11) DEFAULT NULL,
  employee_department_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_emp_depart_on_event_id (event_id),
  KEY idx_emp_depart_on_employee_department_id (employee_department_id),
  CONSTRAINT  employee_department_events_event_id FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT employee_department_events_employee_department_id FOREIGN KEY (employee_department_id) REFERENCES employee_departments (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_department_events
--

LOCK TABLES employee_department_events WRITE;
/*!40000 ALTER TABLE employee_department_events DISABLE KEYS */;
/*!40000 ALTER TABLE employee_department_events ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_departments
--

DROP TABLE IF EXISTS employee_departments;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_departments (
  id int(11) NOT NULL AUTO_INCREMENT,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_departments
--

LOCK TABLES employee_departments WRITE;
/*!40000 ALTER TABLE employee_departments DISABLE KEYS */;
/*!40000 ALTER TABLE employee_departments ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_grades
--

DROP TABLE IF EXISTS employee_grades;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_grades (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  priority int(11) DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  max_hours_day int(11) DEFAULT NULL,
  max_hours_week int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_grades
--

LOCK TABLES employee_grades WRITE;
/*!40000 ALTER TABLE employee_grades DISABLE KEYS */;
/*!40000 ALTER TABLE employee_grades ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_leave_types
--

DROP TABLE IF EXISTS employee_leave_types;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_leave_types (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  max_leave_count varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  carry_forward tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_leave_types
--

LOCK TABLES employee_leave_types WRITE;
/*!40000 ALTER TABLE employee_leave_types DISABLE KEYS */;
/*!40000 ALTER TABLE employee_leave_types ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_leaves
--

DROP TABLE IF EXISTS employee_leaves;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_leaves (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  employee_leave_type_id int(11) DEFAULT NULL,
  leave_count decimal(5,1) DEFAULT '0.0',
  leave_taken decimal(5,1) DEFAULT '0.0',
  reset_date date DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY employee_leave_type_on_employee_id (employee_id),
  KEY empl_on_employee_leave_type_id (employee_leave_type_id),
  CONSTRAINT fk_employee_leave_types_id_on_employee_leave_type_id FOREIGN KEY (employee_leave_type_id) REFERENCES employee_leave_types (id),
  CONSTRAINT fk_employee_leaves_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_leaves
--

LOCK TABLES employee_leaves WRITE;
/*!40000 ALTER TABLE employee_leaves DISABLE KEYS */;
/*!40000 ALTER TABLE employee_leaves ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_positions
--

DROP TABLE IF EXISTS employee_positions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_positions (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  employee_category_id int(11) DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_emp_postion_on_employee_category_id (employee_category_id),
  CONSTRAINT employee_positions_employee_category_id FOREIGN KEY (employee_category_id) REFERENCES employee_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_positions
--

LOCK TABLES employee_positions WRITE;
/*!40000 ALTER TABLE employee_positions DISABLE KEYS */;
/*!40000 ALTER TABLE employee_positions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employee_salary_structures
--

DROP TABLE IF EXISTS employee_salary_structures;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employee_salary_structures (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  payroll_category_id int(11) DEFAULT NULL,
  amount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_emp_sal_on_employee_id (employee_id),
  KEY idx_emp_sal_on_payroll_category_id (payroll_category_id),
  CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id),
  CONSTRAINT fk_payroll_category_id FOREIGN KEY (payroll_category_id) REFERENCES payroll_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employee_salary_structures
--

LOCK TABLES employee_salary_structures WRITE;
/*!40000 ALTER TABLE employee_salary_structures DISABLE KEYS */;
/*!40000 ALTER TABLE employee_salary_structures ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employees
--

DROP TABLE IF EXISTS employees;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_category_id int(11) DEFAULT NULL,
  employee_number varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  joining_date date DEFAULT NULL,
  first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  middle_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  gender varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  job_title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  employee_position_id int(11) DEFAULT NULL,
  employee_department_id int(11) DEFAULT NULL,
  reporting_manager_id int(11) DEFAULT NULL,
  employee_grade_id int(11) DEFAULT NULL,
  qualification varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  experience_detail text COLLATE utf8_unicode_ci,
  experience_year int(11) DEFAULT NULL,
  experience_month int(11) DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  status_description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  date_of_birth date DEFAULT NULL,
  marital_status varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  children_count int(11) DEFAULT NULL,
  father_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  husband_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  blood_group varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  nationality_id int(11) DEFAULT NULL,
  home_address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_country_id int(11) DEFAULT NULL,
  home_pin_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_country_id int(11) DEFAULT NULL,
  office_pin_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mobile_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  home_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  fax varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_file_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_content_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_data blob,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  photo_file_size int(11) DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY index_employees_on_email (email),
  KEY employee_position_id (employee_position_id,employee_department_id,reporting_manager_id,employee_grade_id),
  KEY employee_category_id (employee_category_id),
  KEY index_employees_on_employee_number (employee_number),
  KEY employees_employee_department_id_foreign (employee_department_id),
  KEY employees_employee_grade_id_foreign (employee_grade_id),
  KEY employees_nationality_id_foreign (nationality_id),
  KEY employees_user_id_foreign (user_id),
  CONSTRAINT employees_employee_category_id_foreign FOREIGN KEY (employee_category_id) REFERENCES employee_categories (id),
  CONSTRAINT employees_employee_department_id_foreign FOREIGN KEY (employee_department_id) REFERENCES employee_departments (id),
  CONSTRAINT employees_employee_grade_id_foreign FOREIGN KEY (employee_grade_id) REFERENCES employee_grades (id),
  CONSTRAINT employees_employee_position_id_foreign FOREIGN KEY (employee_position_id) REFERENCES employee_positions (id),
  CONSTRAINT employees_nationality_id_foreign FOREIGN KEY (nationality_id) REFERENCES countries (id),
  CONSTRAINT employees_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employees
--

LOCK TABLES employees WRITE;
/*!40000 ALTER TABLE employees DISABLE KEYS */;
/*!40000 ALTER TABLE employees ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table employees_subjects
--

DROP TABLE IF EXISTS employees_subjects;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE employees_subjects (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_emp_subjects_on_employee_id (employee_id),
  KEY idx_emp_subjects_on_subject_id (subject_id),
  CONSTRAINT fk_subject_id_on_subjects FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table employees_subjects
--

LOCK TABLES employees_subjects WRITE;
/*!40000 ALTER TABLE employees_subjects DISABLE KEYS */;
/*!40000 ALTER TABLE employees_subjects ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table enqury_sources
--

DROP TABLE IF EXISTS enqury_sources;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE enqury_sources (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  Enqury_Source varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table enqury_sources
--

LOCK TABLES enqury_sources WRITE;
/*!40000 ALTER TABLE enqury_sources DISABLE KEYS */;
INSERT INTO enqury_sources VALUES (1,'Newspaper','2019-08-30 17:35:56','2019-08-30 17:35:56'),(2,'Staff','2019-08-30 17:35:56','2019-08-30 17:35:56'),(3,'Friend','2019-08-30 17:35:56','2019-08-30 17:35:56');
/*!40000 ALTER TABLE enqury_sources ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table events
--

DROP TABLE IF EXISTS events;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE events (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  start_date datetime DEFAULT NULL,
  end_date datetime DEFAULT NULL,
  is_common tinyint(1) DEFAULT '0',
  is_holiday tinyint(1) DEFAULT '0',
  is_exam tinyint(1) DEFAULT '0',
  is_due tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  origin_id int(11) DEFAULT NULL,
  origin_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_sms tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  KEY index_events_on_is_common_and_is_holiday_and_is_exam (is_common,is_holiday,is_exam),
  KEY iex_events_on_origin_id (origin_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table events
--

LOCK TABLES events WRITE;
/*!40000 ALTER TABLE events DISABLE KEYS */;
/*!40000 ALTER TABLE events ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table exam_groups
--

DROP TABLE IF EXISTS exam_groups;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE exam_groups (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  exam_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_published tinyint(1) DEFAULT '0',
  result_published tinyint(1) DEFAULT '0',
  exam_date date DEFAULT NULL,
  is_final_exam tinyint(1) NOT NULL DEFAULT '0',
  cce_exam_category_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_exam_groups_on_batch_id (batch_id),
  KEY idx_exam_groups_on_cce_exam_category_id (cce_exam_category_id),
  CONSTRAINT fk_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT fk_cce_exam_category_id_on_cce_exam_categories_id FOREIGN KEY (cce_exam_category_id) REFERENCES cce_exam_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table exam_groups
--

LOCK TABLES exam_groups WRITE;
/*!40000 ALTER TABLE exam_groups DISABLE KEYS */;
/*!40000 ALTER TABLE exam_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table exam_scores
--

DROP TABLE IF EXISTS exam_scores;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE exam_scores (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  exam_id int(11) DEFAULT NULL,
  marks decimal(7,2) DEFAULT NULL,
  grading_level_id int(11) DEFAULT NULL,
  remarks varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_failed tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  exam_group_id int(11) DEFAULT NULL,
  is_absent tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY index_exam_scores_on_student_id_and_exam_id (student_id,exam_id),
  KEY idx_exams_score_on_student_id (student_id),
  KEY idx_exams_score_on_fk_exam_id (exam_id),
  KEY idx_exams_score_on_grading_level_id (grading_level_id),
  CONSTRAINT fk_exam_id FOREIGN KEY (exam_id) REFERENCES exams (id),
  CONSTRAINT fk_grading_level_id FOREIGN KEY (grading_level_id) REFERENCES grading_levels (id),
  CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table exam_scores
--

LOCK TABLES exam_scores WRITE;
/*!40000 ALTER TABLE exam_scores DISABLE KEYS */;
/*!40000 ALTER TABLE exam_scores ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table exams
--

DROP TABLE IF EXISTS exams;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE exams (
  id int(11) NOT NULL AUTO_INCREMENT,
  exam_group_id int(11) DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  start_time datetime DEFAULT NULL,
  end_time datetime DEFAULT NULL,
  maximum_marks decimal(10,2) DEFAULT NULL,
  minimum_marks decimal(10,2) DEFAULT NULL,
  grading_level_id int(11) DEFAULT NULL,
  weightage int(11) DEFAULT '0',
  event_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  no_exams tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY index_exams_on_exam_group_id_and_subject_id (exam_group_id,subject_id),
  KEY idx_exams_on_exam_group_id (exam_group_id),
  KEY idx_exams_on_subject_id (subject_id),
  KEY idx_exams_on_grading_level_id (grading_level_id),
  KEY idx_exams_on_event_id (event_id),
  CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT fk_exam_group_id_on_exams_id FOREIGN KEY (exam_group_id) REFERENCES exam_groups (id),
  CONSTRAINT fk_grading_level_id_grading_levels_id FOREIGN KEY (grading_level_id) REFERENCES grading_levels (id),
  CONSTRAINT fk_subject_id_on_subjects_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table exams
--

LOCK TABLES exams WRITE;
/*!40000 ALTER TABLE exams DISABLE KEYS */;
/*!40000 ALTER TABLE exams ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fa_criterias
--

DROP TABLE IF EXISTS fa_criterias;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fa_criterias (
  id int(11) NOT NULL AUTO_INCREMENT,
  fa_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  desc varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  fa_group_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  sort_order int(11) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  KEY fa_group_id (fa_group_id),
  CONSTRAINT fk_fa_group_id_on_fa_groups_id FOREIGN KEY (fa_group_id) REFERENCES fa_groups (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fa_criterias
--

LOCK TABLES fa_criterias WRITE;
/*!40000 ALTER TABLE fa_criterias DISABLE KEYS */;
/*!40000 ALTER TABLE fa_criterias ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fa_groups
--

DROP TABLE IF EXISTS fa_groups;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fa_groups (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  desc text COLLATE utf8_unicode_ci,
  cce_exam_category_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  cce_grade_set_id int(11) DEFAULT NULL,
  max_marks double DEFAULT '100',
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_fa_groups_on_cce_exam_category_id (cce_exam_category_id),
  KEY idx_fa_groups_on_cce_grade_set_id (cce_grade_set_id),
  CONSTRAINT fk_cce_exam_category_id FOREIGN KEY (cce_exam_category_id) REFERENCES cce_exam_categories (id),
  CONSTRAINT fk_cce_grade_set_id FOREIGN KEY (cce_grade_set_id) REFERENCES cce_grade_sets (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fa_groups
--

LOCK TABLES fa_groups WRITE;
/*!40000 ALTER TABLE fa_groups DISABLE KEYS */;
/*!40000 ALTER TABLE fa_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fa_groups_subjects
--

DROP TABLE IF EXISTS fa_groups_subjects;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fa_groups_subjects (
  subject_id int(11) DEFAULT NULL,
  fa_group_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  KEY fa_group_subjects_on_score_index (fa_group_id,subject_id),
  KEY fa_group_subjects_on_subject_id (subject_id),
  KEY fa_group_subjects_on_fa_group_id (fa_group_id),
  CONSTRAINT  fa_groups_subjects_fa_group_id FOREIGN KEY (fa_group_id) REFERENCES fa_groups (id),
  CONSTRAINT  fa_groups_subjects_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fa_groups_subjects
--

LOCK TABLES fa_groups_subjects WRITE;
/*!40000 ALTER TABLE fa_groups_subjects DISABLE KEYS */;
/*!40000 ALTER TABLE fa_groups_subjects ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fa_scores
--

DROP TABLE IF EXISTS fa_scores;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fa_scores (
  id int(11) NOT NULL AUTO_INCREMENT,
  assessment_score_id int(11) DEFAULT NULL,
  Fa_obtained_marks int(11) DEFAULT NULL,
  Fa_Name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  Fa_Criteria_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fa_scores
--

LOCK TABLES fa_scores WRITE;
/*!40000 ALTER TABLE fa_scores DISABLE KEYS */;
/*!40000 ALTER TABLE fa_scores ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table failed_jobs
--

DROP TABLE IF EXISTS failed_jobs;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE failed_jobs (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  connection text COLLATE utf8_unicode_ci NOT NULL,
  queue text COLLATE utf8_unicode_ci NOT NULL,
  payload longtext COLLATE utf8_unicode_ci NOT NULL,
  exception longtext COLLATE utf8_unicode_ci NOT NULL,
  failed_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table failed_jobs
--

LOCK TABLES failed_jobs WRITE;
/*!40000 ALTER TABLE failed_jobs DISABLE KEYS */;
/*!40000 ALTER TABLE failed_jobs ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_collection_discounts
--

DROP TABLE IF EXISTS fee_collection_discounts;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_collection_discounts (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  receiver_id int(11) DEFAULT NULL,
  finance_fee_collection_id int(11) DEFAULT NULL,
  discount decimal(15,2) DEFAULT NULL,
  is_amount tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_runtime tinyint(1) NOT NULL DEFAULT '0',
  fee_collection_particular_id int(11) DEFAULT NULL,
  fee_discount_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_fee_col_discount_on_receiver_id (receiver_id),
  KEY idx_fee_col_discount_on_finance_fee_collection_id (finance_fee_collection_id),
  KEY idx_collectionparticularsid_from_collectionparticulars (fee_collection_particular_id),
  KEY idx_id_from_fee_discounts (fee_discount_id),
  CONSTRAINT fee_collection_discounts_finance_fee_collection_id FOREIGN KEY (finance_fee_collection_id) REFERENCES finance_fee_collections (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_collection_discounts
--

LOCK TABLES fee_collection_discounts WRITE;
/*!40000 ALTER TABLE fee_collection_discounts DISABLE KEYS */;
/*!40000 ALTER TABLE fee_collection_discounts ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_collection_particulars
--

DROP TABLE IF EXISTS fee_collection_particulars;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_collection_particulars (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  amount decimal(12,2) DEFAULT NULL,
  finance_fee_collection_id int(11) DEFAULT NULL,
  student_category_id int(11) DEFAULT NULL,
  admission_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  is_paid tinyint(1) DEFAULT '0',
  fee_student_one_time_id int(11) DEFAULT NULL,
  is_runtime tinyint(1) NOT NULL DEFAULT '0',
  fee_student_outstanding_id int(11) DEFAULT NULL,
  finance_transaction_id int(11) DEFAULT NULL,
  finance_fee_particular_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_fee_col_part_on_finance_fee_collection_id (finance_fee_collection_id),
  KEY idx_fee_col_part_on_student_category_id (student_category_id),
  KEY idx_fee_col_part_on_admission_no (admission_no),
  KEY idx_fee_col_part_on_student_id (student_id),
  KEY idx_fee_student_one_time_id_fee_student_one_time (fee_student_one_time_id),
  KEY idx_fee_student_outstanding_id_from_fee_student_outstandings (fee_student_outstanding_id),
  KEY idx_finance_transaction_id_from_finance_transactions (finance_transaction_id),
  KEY idx_id_from_finance_fee_particulars (finance_fee_particular_id),
  CONSTRAINT  fee_collection_particulars_finance_fee_collection_id FOREIGN KEY (finance_fee_collection_id) REFERENCES finance_fee_collections (id),
  CONSTRAINT  fee_collection_particulars_student_category_id FOREIGN KEY (student_category_id) REFERENCES student_categories (id),
  CONSTRAINT  fee_collection_particulars_student_id FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_collection_particulars
--

LOCK TABLES fee_collection_particulars WRITE;
/*!40000 ALTER TABLE fee_collection_particulars DISABLE KEYS */;
/*!40000 ALTER TABLE fee_collection_particulars ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_discounts
--

DROP TABLE IF EXISTS fee_discounts;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_discounts (
  id int(11) NOT NULL AUTO_INCREMENT,
  type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  receiver_id int(11) DEFAULT NULL,
  finance_fee_category_id int(11) DEFAULT NULL,
  discount decimal(15,2) DEFAULT NULL,
  is_amount tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  finance_fee_particular_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_fee_discounts_on_receiver_id (receiver_id),
  KEY idx_fee_discounts_on_finance_fee_category_id (finance_fee_category_id),
  KEY idx_id_from_finance_fee_particulars (finance_fee_particular_id),
  CONSTRAINT fee_discounts_finance_fee_category_id	 FOREIGN KEY (finance_fee_category_id) REFERENCES finance_fee_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_discounts
--

LOCK TABLES fee_discounts WRITE;
/*!40000 ALTER TABLE fee_discounts DISABLE KEYS */;
/*!40000 ALTER TABLE fee_discounts ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_due_collection_reminders
--

DROP TABLE IF EXISTS fee_due_collection_reminders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_due_collection_reminders (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  fee_collection_id int(11) NOT NULL,
  send_before_days varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  send_before_weeks varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_sendsms_enabled tinyint(1) NOT NULL DEFAULT '0',
  is_sendemail_enabled tinyint(1) NOT NULL DEFAULT '0',
  sms_message_format varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  send_after_days varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  send_after_weeks varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_due_collection_reminders
--

LOCK TABLES fee_due_collection_reminders WRITE;
/*!40000 ALTER TABLE fee_due_collection_reminders DISABLE KEYS */;
/*!40000 ALTER TABLE fee_due_collection_reminders ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_due_master_reminders
--

DROP TABLE IF EXISTS fee_due_master_reminders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_due_master_reminders (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  send_before_days varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  send_before_weeks varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_sendsms_enabled tinyint(1) NOT NULL DEFAULT '0',
  is_sendemail_enabled tinyint(1) NOT NULL DEFAULT '0',
  sms_message_format varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  send_after_days varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  send_after_weeks varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_due_master_reminders
--

LOCK TABLES fee_due_master_reminders WRITE;
/*!40000 ALTER TABLE fee_due_master_reminders DISABLE KEYS */;
/*!40000 ALTER TABLE fee_due_master_reminders ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_student_one_times
--

DROP TABLE IF EXISTS fee_student_one_times;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_student_one_times (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  student_id int(11) NOT NULL,
  finance_fee_one_time_id int(11) NOT NULL,
  amount decimal(15,2) NOT NULL,
  is_refunded tinyint(1) NOT NULL DEFAULT '0',
  is_paid tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  paid_amount decimal(15,2) NOT NULL DEFAULT '0.00',
  transaction_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  discount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_student_one_times
--

LOCK TABLES fee_student_one_times WRITE;
/*!40000 ALTER TABLE fee_student_one_times DISABLE KEYS */;
/*!40000 ALTER TABLE fee_student_one_times ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table fee_student_outstandings
--

DROP TABLE IF EXISTS fee_student_outstandings;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE fee_student_outstandings (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  student_id int(11) NOT NULL,
  admission_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  total_amount decimal(15,2) NOT NULL DEFAULT '0.00',
  total_paid_amount decimal(15,2) NOT NULL DEFAULT '0.00',
  transaction_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  discount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_students_on_admission_no (admission_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table fee_student_outstandings
--

LOCK TABLES fee_student_outstandings WRITE;
/*!40000 ALTER TABLE fee_student_outstandings DISABLE KEYS */;
/*!40000 ALTER TABLE fee_student_outstandings ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_donations
--

DROP TABLE IF EXISTS finance_donations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_donations (
  id int(11) NOT NULL AUTO_INCREMENT,
  donor varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  amount decimal(15,2) DEFAULT NULL,
  transaction_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  transaction_date date DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_donations_on_transaction_id_2 (transaction_id),
  CONSTRAINT finance_donations_transaction_id FOREIGN KEY (transaction_id) REFERENCES finance_transactions (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_donations
--

LOCK TABLES finance_donations WRITE;
/*!40000 ALTER TABLE finance_donations DISABLE KEYS */;
/*!40000 ALTER TABLE finance_donations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_fee_categories
--

DROP TABLE IF EXISTS finance_fee_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_fee_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  batch_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  is_master tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_fee_cat_on_batch_id (batch_id),
  CONSTRAINT  finance_fee_categories_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_fee_categories
--

LOCK TABLES finance_fee_categories WRITE;
/*!40000 ALTER TABLE finance_fee_categories DISABLE KEYS */;
/*!40000 ALTER TABLE finance_fee_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_fee_collections
--

DROP TABLE IF EXISTS finance_fee_collections;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_fee_collections (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  due_date date DEFAULT NULL,
  fee_category_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_fee_col_on_fee_category_id (fee_category_id),
  KEY idx_fee_col_on_batch_id (batch_id),
  CONSTRAINT finance_fee_collections_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT finance_fee_collections_fee_category_id	 FOREIGN KEY (fee_category_id) REFERENCES finance_fee_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_fee_collections
--

LOCK TABLES finance_fee_collections WRITE;
/*!40000 ALTER TABLE finance_fee_collections DISABLE KEYS */;
/*!40000 ALTER TABLE finance_fee_collections ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_fee_one_times
--

DROP TABLE IF EXISTS finance_fee_one_times;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_fee_one_times (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  course_id int(11) DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  amount decimal(15,2) DEFAULT NULL,
  is_refundable tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  is_deleted int(11) NOT NULL DEFAULT '0',
  year int(11) NOT NULL,
  is_readmission tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_courses_on_course_id (course_id),
  KEY idx_finance_fee_one_times_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_fee_one_times
--

LOCK TABLES finance_fee_one_times WRITE;
/*!40000 ALTER TABLE finance_fee_one_times DISABLE KEYS */;
/*!40000 ALTER TABLE finance_fee_one_times ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_fee_particulars
--

DROP TABLE IF EXISTS finance_fee_particulars;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_fee_particulars (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  amount decimal(15,2) DEFAULT NULL,
  finance_fee_category_id int(11) DEFAULT NULL,
  student_category_id int(11) DEFAULT NULL,
  admission_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_ffp_on_finance_fee_category_id (finance_fee_category_id),
  KEY idx_ffp_on_student_category_id (student_category_id),
  KEY idx_ffp_on_admission_no (admission_no),
  KEY idx_ffp_on_student_id (student_id),
  CONSTRAINT finance_fee_particulars_finance_fee_category_id FOREIGN KEY (finance_fee_category_id) REFERENCES finance_fee_categories (id),
  CONSTRAINT finance_fee_particulars_student_category_id FOREIGN KEY (student_category_id) REFERENCES student_categories (id),
  CONSTRAINT finance_fee_particulars_student_id FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_fee_particulars
--

LOCK TABLES finance_fee_particulars WRITE;
/*!40000 ALTER TABLE finance_fee_particulars DISABLE KEYS */;
/*!40000 ALTER TABLE finance_fee_particulars ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_fee_structure_elements
--

DROP TABLE IF EXISTS finance_fee_structure_elements;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_fee_structure_elements (
  id int(11) NOT NULL AUTO_INCREMENT,
  amount decimal(15,2) DEFAULT NULL,
  label varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  student_category_id int(11) DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  parent_id int(11) DEFAULT NULL,
  fee_collection_id int(11) DEFAULT NULL,
  deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_fse_on_batch_id (batch_id),
  KEY idx_fse_on_student_category_id (student_category_id),
  KEY idx_fse_on_student_id (student_id),
  KEY idx_fse_on_parent_id (parent_id),
  KEY idx_fse_on_fee_collection_id (fee_collection_id),
  CONSTRAINT finance_fee_structure_elements_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT finance_fee_structure_elements_fee_collection_id FOREIGN KEY (fee_collection_id) REFERENCES finance_fee_collections (id),
  CONSTRAINT finance_fee_structure_elements_student_category_id FOREIGN KEY (student_category_id) REFERENCES student_categories (id),
  CONSTRAINT finance_fee_structure_elements_student_id FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_fee_structure_elements
--

LOCK TABLES finance_fee_structure_elements WRITE;
/*!40000 ALTER TABLE finance_fee_structure_elements DISABLE KEYS */;
/*!40000 ALTER TABLE finance_fee_structure_elements ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_fees
--

DROP TABLE IF EXISTS finance_fees;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_fees (
  id int(11) NOT NULL AUTO_INCREMENT,
  fee_collection_id int(11) DEFAULT NULL,
  transaction_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  is_paid tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_finance_fees_on_fee_collection_id_and_student_id (fee_collection_id,student_id),
  KEY idx_fee_on_fee_collection_id (fee_collection_id),
  KEY idx_fee_on_transaction_id (transaction_id),
  KEY idx_fee_on_student_id (student_id),
  CONSTRAINT  finance_fees_fee_collection_id FOREIGN KEY (fee_collection_id) REFERENCES finance_fee_collections (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_fees
--

LOCK TABLES finance_fees WRITE;
/*!40000 ALTER TABLE finance_fees DISABLE KEYS */;
/*!40000 ALTER TABLE finance_fees ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_transaction_categories
--

DROP TABLE IF EXISTS finance_transaction_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_transaction_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_income tinyint(1) DEFAULT NULL,
  deleted tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_transaction_categories
--

LOCK TABLES finance_transaction_categories WRITE;
/*!40000 ALTER TABLE finance_transaction_categories DISABLE KEYS */;
INSERT INTO finance_transaction_categories VALUES (1,'Fees',NULL,1,0,NULL,NULL),(2,'Salary',NULL,0,0,NULL,NULL),(3,'Donation',NULL,1,0,NULL,NULL),(4,'Refund',NULL,0,0,NULL,NULL),(5,'Bus Fees',NULL,1,0,NULL,NULL);
/*!40000 ALTER TABLE finance_transaction_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_transaction_receipts
--

DROP TABLE IF EXISTS finance_transaction_receipts;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_transaction_receipts (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  finance_transaction_id int(11) NOT NULL,
  current_collection_due decimal(15,2) NOT NULL,
  outstanding_due decimal(15,2) NOT NULL,
  total_due decimal(15,2) NOT NULL,
  current_due decimal(15,2) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  unpaid_collections_due decimal(15,2) NOT NULL,
  one_time_due decimal(15,2) NOT NULL,
  overall_unpaid_amount decimal(15,2) NOT NULL,
  fine_charged decimal(15,2) NOT NULL,
  paid_onetime varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  paid_outstanding varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  paid_runtime_particular varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  total_fine varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  outstanding_discount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_finance_transaction_id_from_finance_transactions (finance_transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_transaction_receipts
--

LOCK TABLES finance_transaction_receipts WRITE;
/*!40000 ALTER TABLE finance_transaction_receipts DISABLE KEYS */;
/*!40000 ALTER TABLE finance_transaction_receipts ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_transaction_triggers
--

DROP TABLE IF EXISTS finance_transaction_triggers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_transaction_triggers (
  id int(11) NOT NULL AUTO_INCREMENT,
  finance_category_id int(11) DEFAULT NULL,
  percentage decimal(8,2) DEFAULT NULL,
  title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_ftt_on_finance_category_id (finance_category_id),
  CONSTRAINT finance_transaction_triggers_finance_category_id FOREIGN KEY (finance_category_id) REFERENCES finance_transaction_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_transaction_triggers
--

LOCK TABLES finance_transaction_triggers WRITE;
/*!40000 ALTER TABLE finance_transaction_triggers DISABLE KEYS */;
/*!40000 ALTER TABLE finance_transaction_triggers ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table finance_transactions
--

DROP TABLE IF EXISTS finance_transactions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE finance_transactions (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  amount decimal(15,2) DEFAULT NULL,
  fine_included tinyint(1) DEFAULT '0',
  category_id int(11) DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  finance_fees_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  transaction_date date DEFAULT NULL,
  fine_amount decimal(10,2) DEFAULT '0.00',
  master_transaction_id int(11) DEFAULT '0',
  finance_id int(11) DEFAULT NULL,
  finance_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  payee_id int(11) DEFAULT NULL,
  payee_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  receipt_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  voucher_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  payment_note varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  payment_mode varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  revert_reason varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  revert_date date DEFAULT NULL,
  transport_fees_id int(11) DEFAULT NULL,
  fine_desc varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_ft_on_category_id (category_id),
  KEY idx_ft_on_student_id (student_id),
  KEY idx_ft_on_finance_fees_id (finance_fees_id),
  KEY idx_ft_on_master_transaction_id (master_transaction_id),
  KEY idx_ft_on_finance_id (finance_id),
  KEY idx_ft_on_payee_id (payee_id),
  KEY idx_transport_feesid_from_transport_fees (transport_fees_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table finance_transactions
--

LOCK TABLES finance_transactions WRITE;
/*!40000 ALTER TABLE finance_transactions DISABLE KEYS */;
/*!40000 ALTER TABLE finance_transactions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table grading_levels
--

DROP TABLE IF EXISTS grading_levels;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE grading_levels (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  min_score int(11) DEFAULT NULL,
  order int(11) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  credit_points decimal(15,2) DEFAULT NULL,
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  maximum_marks int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_grading_levels_on_batch_id_and_is_deleted (batch_id,is_deleted),
  KEY idx_gl_on_batch_id (batch_id),
  CONSTRAINT grading_levels_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table grading_levels
--

LOCK TABLES grading_levels WRITE;
/*!40000 ALTER TABLE grading_levels DISABLE KEYS */;
INSERT INTO grading_levels VALUES (1,'A1',NULL,91,NULL,0,NULL,NULL,NULL,NULL,100),(2,'A2',NULL,81,NULL,0,NULL,NULL,NULL,NULL,90),(3,'B1',NULL,71,NULL,0,NULL,NULL,NULL,NULL,80),(4,'B2',NULL,61,NULL,0,NULL,NULL,NULL,NULL,70),(5,'C1',NULL,51,NULL,0,NULL,NULL,NULL,NULL,60),(6,'C2',NULL,41,NULL,0,NULL,NULL,NULL,NULL,50),(7,'D',NULL,33,NULL,0,NULL,NULL,NULL,NULL,40),(8,'E',NULL,0,NULL,0,NULL,NULL,NULL,NULL,32);
/*!40000 ALTER TABLE grading_levels ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table grouped_batches
--

DROP TABLE IF EXISTS grouped_batches;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE grouped_batches (
  id int(11) NOT NULL AUTO_INCREMENT,
  batch_group_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY batch_group_id (batch_group_id),
  KEY idx_gb_on_batch_id (batch_id),
  CONSTRAINT grouped_batches_batch_group_id	 FOREIGN KEY (batch_group_id) REFERENCES batch_groups (id),
  CONSTRAINT grouped_batches_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table grouped_batches
--

LOCK TABLES grouped_batches WRITE;
/*!40000 ALTER TABLE grouped_batches DISABLE KEYS */;
/*!40000 ALTER TABLE grouped_batches ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table grouped_exam_reports
--

DROP TABLE IF EXISTS grouped_exam_reports;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE grouped_exam_reports (
  id int(11) NOT NULL AUTO_INCREMENT,
  batch_id int(11) DEFAULT NULL,
  student_id int(11) DEFAULT NULL,
  exam_group_id int(11) DEFAULT NULL,
  marks decimal(15,2) DEFAULT NULL,
  score_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  Examgroup_weightage_percent varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  total_marks varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  weightage_marks int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY by_batch_student_and_score_type (batch_id,student_id,score_type),
  KEY idx_ger_on_batch_id (batch_id),
  KEY idx_grouped_exam_reports_on_student_id (student_id),
  KEY idx_ger_on_exam_group_id (exam_group_id),
  KEY idx_ger_on_subject_id (subject_id),
  CONSTRAINT grouped_exam_reports_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT grouped_exam_reports_exam_group_id FOREIGN KEY (exam_group_id) REFERENCES exam_groups (id),
  CONSTRAINT grouped_exam_reports_student_id FOREIGN KEY (student_id) REFERENCES students (id),
  CONSTRAINT grouped_exam_reports_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table grouped_exam_reports
--

LOCK TABLES grouped_exam_reports WRITE;
/*!40000 ALTER TABLE grouped_exam_reports DISABLE KEYS */;
/*!40000 ALTER TABLE grouped_exam_reports ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table grouped_exams
--

DROP TABLE IF EXISTS grouped_exams;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE grouped_exams (
  id int(11) NOT NULL AUTO_INCREMENT,
  exam_group_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  weightage decimal(15,2) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_grouped_exams_on_batch_id_and_exam_group_id (batch_id,exam_group_id),
  KEY idx_ge_on_exam_group_id (exam_group_id),
  KEY idx_ge_on_batch_id (batch_id),
  CONSTRAINT grouped_exams_batch_id	 FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT grouped_exams_exam_group_id	 FOREIGN KEY (exam_group_id) REFERENCES exam_groups (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table grouped_exams
--

LOCK TABLES grouped_exams WRITE;
/*!40000 ALTER TABLE grouped_exams DISABLE KEYS */;
/*!40000 ALTER TABLE grouped_exams ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table guardians
--

DROP TABLE IF EXISTS guardians;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE guardians (
  id int(11) NOT NULL AUTO_INCREMENT,
  ward_id int(11) DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_phone2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  office_address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  country_id int(11) DEFAULT NULL,
  dob date DEFAULT NULL,
  occupation varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  income varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  education varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  father_first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  father_last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  primary_mobile_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  alternate_mobile_phone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PIN_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  family_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_guardians_on_ward_id (ward_id),
  KEY idx_guardians_on_country_id (country_id),
  KEY idx_guardians_on_user_id (user_id),
  CONSTRAINT guardians_country_id FOREIGN KEY (country_id) REFERENCES countries (id),
  CONSTRAINT guardians_user_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table guardians
--

LOCK TABLES guardians WRITE;
/*!40000 ALTER TABLE guardians DISABLE KEYS */;
/*!40000 ALTER TABLE guardians ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table individual_payslip_categories
--

DROP TABLE IF EXISTS individual_payslip_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE individual_payslip_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  employee_id int(11) DEFAULT NULL,
  salary_date date DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  amount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_deduction tinyint(1) DEFAULT NULL,
  include_every_month tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_ips_on_employee_id (employee_id),
  CONSTRAINT individual_payslip_categories_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table individual_payslip_categories
--

LOCK TABLES individual_payslip_categories WRITE;
/*!40000 ALTER TABLE individual_payslip_categories DISABLE KEYS */;
/*!40000 ALTER TABLE individual_payslip_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table jobs
--

DROP TABLE IF EXISTS jobs;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE jobs (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  queue varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  payload longtext COLLATE utf8_unicode_ci NOT NULL,
  attempts tinyint(3) unsigned NOT NULL,
  reserved_at int(10) unsigned DEFAULT NULL,
  available_at int(10) unsigned NOT NULL,
  created_at int(10) unsigned NOT NULL,
  PRIMARY KEY (id),
  KEY jobs_queue_index (queue)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table jobs
--

LOCK TABLES jobs WRITE;
/*!40000 ALTER TABLE jobs DISABLE KEYS */;
/*!40000 ALTER TABLE jobs ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table liabilities
--

DROP TABLE IF EXISTS liabilities;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE liabilities (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  amount int(11) DEFAULT NULL,
  is_solved tinyint(1) DEFAULT '0',
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table liabilities
--

LOCK TABLES liabilities WRITE;
/*!40000 ALTER TABLE liabilities DISABLE KEYS */;
/*!40000 ALTER TABLE liabilities ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table login_histories
--

DROP TABLE IF EXISTS login_histories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE login_histories (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  ip_address varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  guard varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table login_histories
--

LOCK TABLES login_histories WRITE;
/*!40000 ALTER TABLE login_histories DISABLE KEYS */;
/*!40000 ALTER TABLE login_histories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table migrations
--

DROP TABLE IF EXISTS migrations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE migrations (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  migration varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  batch int(11) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=380 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table migrations
--

LOCK TABLES migrations WRITE;
/*!40000 ALTER TABLE migrations DISABLE KEYS */;
INSERT INTO migrations VALUES (1,'2015_08_25_172600_create_settings_table',1),(2,'2016_06_01_000001_create_oauth_auth_codes_table',1),(3,'2016_06_01_000002_create_oauth_access_tokens_table',1),(4,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(5,'2016_06_01_000004_create_oauth_clients_table',1),(6,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(7,'2017_09_10_060419_create_additional_exam_groups_table',1),(8,'2017_09_10_060419_create_additional_exam_scores_table',1),(9,'2017_09_10_060419_create_additional_exams_table',1),(10,'2017_09_10_060419_create_additional_field_options_table',1),(11,'2017_09_10_060419_create_additional_fields_table',1),(12,'2017_09_10_060419_create_apply_leaves_table',1),(13,'2017_09_10_060419_create_ar_internal_metadata_table',1),(14,'2017_09_10_060419_create_archived_employee_additional_details_table',1),(15,'2017_09_10_060419_create_archived_employee_bank_details_table',1),(16,'2017_09_10_060419_create_archived_employee_salary_structures_table',1),(17,'2017_09_10_060419_create_archived_employees_table',1),(18,'2017_09_10_060419_create_archived_exam_scores_table',1),(19,'2017_09_10_060419_create_archived_guardians_table',1),(20,'2017_09_10_060419_create_archived_students_table',1),(21,'2017_09_10_060419_create_assessment_scores_table',1),(22,'2017_09_10_060419_create_assets_table',1),(23,'2017_09_10_060419_create_attendances_table',1),(24,'2017_09_10_060419_create_bank_fields_table',1),(25,'2017_09_10_060419_create_batch_events_table',1),(26,'2017_09_10_060419_create_batch_groups_table',1),(27,'2017_09_10_060419_create_batch_students_table',1),(28,'2017_09_10_060419_create_batches_table',1),(29,'2017_09_10_060419_create_cce_exam_categories_table',1),(30,'2017_09_10_060419_create_cce_grade_sets_table',1),(31,'2017_09_10_060419_create_cce_grades_table',1),(32,'2017_09_10_060419_create_cce_reports_table',1),(33,'2017_09_10_060419_create_cce_weightages_courses_table',1),(34,'2017_09_10_060419_create_cce_weightages_table',1),(35,'2017_09_10_060419_create_class_designations_table',1),(36,'2017_09_10_060419_create_class_timings_table',1),(37,'2017_09_10_060419_create_countries_table',1),(38,'2017_09_10_060419_create_courses_observation_groups_table',1),(39,'2017_09_10_060419_create_courses_table',1),(40,'2017_09_10_060419_create_currencies_table',1),(41,'2017_09_10_060419_create_delayed_jobs_table',1),(42,'2017_09_10_060419_create_descriptive_indicators_table',1),(43,'2017_09_10_060419_create_elective_groups_table',1),(44,'2017_09_10_060419_create_electives_table',1),(45,'2017_09_10_060419_create_employee_additional_details_table',1),(46,'2017_09_10_060419_create_employee_attendances_table',1),(47,'2017_09_10_060419_create_employee_bank_details_table',1),(48,'2017_09_10_060419_create_employee_categories_table',1),(49,'2017_09_10_060419_create_employee_department_events_table',1),(50,'2017_09_10_060419_create_employee_departments_table',1),(51,'2017_09_10_060419_create_employee_grades_table',1),(52,'2017_09_10_060419_create_employee_leave_types_table',1),(53,'2017_09_10_060419_create_employee_leaves_table',1),(54,'2017_09_10_060419_create_employee_positions_table',1),(55,'2017_09_10_060419_create_employee_salary_structures_table',1),(56,'2017_09_10_060419_create_employees_subjects_table',1),(57,'2017_09_10_060419_create_employees_table',1),(58,'2017_09_10_060419_create_events_table',1),(59,'2017_09_10_060419_create_exam_groups_table',1),(60,'2017_09_10_060419_create_exam_scores_table',1),(61,'2017_09_10_060419_create_exams_table',1),(62,'2017_09_10_060419_create_fa_criterias_table',1),(63,'2017_09_10_060419_create_fa_groups_subjects_table',1),(64,'2017_09_10_060419_create_fa_groups_table',1),(65,'2017_09_10_060419_create_fee_collection_discounts_table',1),(66,'2017_09_10_060419_create_fee_collection_particulars_table',1),(67,'2017_09_10_060419_create_fee_discounts_table',1),(68,'2017_09_10_060419_create_finance_donations_table',1),(69,'2017_09_10_060419_create_finance_fee_categories_table',1),(70,'2017_09_10_060419_create_finance_fee_collections_table',1),(71,'2017_09_10_060419_create_finance_fee_particulars_table',1),(72,'2017_09_10_060419_create_finance_fee_structure_elements_table',1),(73,'2017_09_10_060419_create_finance_fees_table',1),(74,'2017_09_10_060419_create_finance_transaction_categories_table',1),(75,'2017_09_10_060419_create_finance_transaction_triggers_table',1),(76,'2017_09_10_060419_create_finance_transactions_table',1),(77,'2017_09_10_060419_create_grading_levels_table',1),(78,'2017_09_10_060419_create_grouped_batches_table',1),(79,'2017_09_10_060419_create_grouped_exam_reports_table',1),(80,'2017_09_10_060419_create_grouped_exams_table',1),(81,'2017_09_10_060419_create_guardians_table',1),(82,'2017_09_10_060419_create_individual_payslip_categories_table',1),(83,'2017_09_10_060419_create_liabilities_table',1),(84,'2017_09_10_060419_create_monthly_payslips_table',1),(85,'2017_09_10_060419_create_news_comments_table',1),(86,'2017_09_10_060419_create_news_table',1),(87,'2017_09_10_060419_create_observation_groups_table',1),(88,'2017_09_10_060419_create_observations_table',1),(89,'2017_09_10_060419_create_password_resets_table',1),(90,'2017_09_10_060419_create_payroll_categories_table',1),(91,'2017_09_10_060419_create_period_entries_table',1),(92,'2017_09_10_060419_create_privilege_tags_table',1),(93,'2017_09_10_060419_create_privileges_table',1),(94,'2017_09_10_060419_create_privileges_users_table',1),(95,'2017_09_10_060419_create_ranking_levels_table',1),(96,'2017_09_10_060419_create_registrations_table',1),(97,'2017_09_10_060419_create_reminders_table',1),(98,'2017_09_10_060419_create_schema_migrations_table',1),(99,'2017_09_10_060419_create_school_details_table',1),(100,'2017_09_10_060419_create_sms_logs_table',1),(101,'2017_09_10_060419_create_sms_messages_table',1),(102,'2017_09_10_060419_create_sms_settings_table',1),(103,'2017_09_10_060419_create_states_table',1),(104,'2017_09_10_060419_create_student_additional_details_table',1),(105,'2017_09_10_060419_create_student_additional_field_options_table',1),(106,'2017_09_10_060419_create_student_additional_fields_table',1),(107,'2017_09_10_060419_create_student_categories_table',1),(108,'2017_09_10_060419_create_student_previous_datas_table',1),(109,'2017_09_10_060419_create_student_previous_subject_marks_table',1),(110,'2017_09_10_060419_create_students_subjects_table',1),(111,'2017_09_10_060419_create_students_table',1),(112,'2017_09_10_060419_create_subject_amounts_table',1),(113,'2017_09_10_060419_create_subject_leaves_table',1),(114,'2017_09_10_060419_create_subjects_table',1),(115,'2017_09_10_060419_create_time_zones_table',1),(116,'2017_09_10_060419_create_timetable_entries_table',1),(117,'2017_09_10_060419_create_timetables_table',1),(118,'2017_09_10_060419_create_user_events_table',1),(119,'2017_09_10_060419_create_users_table',1),(120,'2017_09_10_060419_create_weekdays_table',1),(121,'2017_09_10_060425_add_foreign_keys_to_additional_exam_groups_table',1),(122,'2017_09_10_060425_add_foreign_keys_to_additional_exam_scores_table',1),(123,'2017_09_10_060425_add_foreign_keys_to_additional_exams_table',1),(124,'2017_09_10_060425_add_foreign_keys_to_apply_leaves_table',1),(125,'2017_09_10_060425_add_foreign_keys_to_archived_employee_additional_details_table',1),(126,'2017_09_10_060425_add_foreign_keys_to_archived_employee_bank_details_table',1),(127,'2017_09_10_060425_add_foreign_keys_to_archived_employee_salary_structures_table',1),(128,'2017_09_10_060425_add_foreign_keys_to_archived_employees_table',1),(129,'2017_09_10_060425_add_foreign_keys_to_archived_exam_scores_table',1),(130,'2017_09_10_060425_add_foreign_keys_to_archived_guardians_table',1),(131,'2017_09_10_060425_add_foreign_keys_to_archived_students_table',1),(132,'2017_09_10_060425_add_foreign_keys_to_assessment_scores_table',1),(133,'2017_09_10_060425_add_foreign_keys_to_attendances_table',1),(134,'2017_09_10_060425_add_foreign_keys_to_batch_events_table',1),(135,'2017_09_10_060425_add_foreign_keys_to_batch_groups_table',1),(136,'2017_09_10_060425_add_foreign_keys_to_batches_table',1),(137,'2017_09_10_060425_add_foreign_keys_to_cce_grades_table',1),(138,'2017_09_10_060425_add_foreign_keys_to_cce_reports_table',1),(139,'2017_09_10_060425_add_foreign_keys_to_cce_weightages_courses_table',1),(140,'2017_09_10_060425_add_foreign_keys_to_cce_weightages_table',1),(141,'2017_09_10_060425_add_foreign_keys_to_class_designations_table',1),(142,'2017_09_10_060425_add_foreign_keys_to_class_timings_table',1),(143,'2017_09_10_060425_add_foreign_keys_to_courses_observation_groups_table',1),(144,'2017_09_10_060425_add_foreign_keys_to_elective_groups_table',1),(145,'2017_09_10_060425_add_foreign_keys_to_electives_table',1),(146,'2017_09_10_060425_add_foreign_keys_to_employee_additional_details_table',1),(147,'2017_09_10_060425_add_foreign_keys_to_employee_attendances_table',1),(148,'2017_09_10_060425_add_foreign_keys_to_employee_bank_details_table',1),(149,'2017_09_10_060425_add_foreign_keys_to_employee_department_events_table',1),(150,'2017_09_10_060425_add_foreign_keys_to_employee_leaves_table',1),(151,'2017_09_10_060425_add_foreign_keys_to_employee_positions_table',1),(152,'2017_09_10_060425_add_foreign_keys_to_employee_salary_structures_table',1),(153,'2017_09_10_060425_add_foreign_keys_to_employees_subjects_table',1),(154,'2017_09_10_060425_add_foreign_keys_to_employees_table',1),(155,'2017_09_10_060425_add_foreign_keys_to_exam_groups_table',1),(156,'2017_09_10_060425_add_foreign_keys_to_exam_scores_table',1),(157,'2017_09_10_060425_add_foreign_keys_to_exams_table',1),(158,'2017_09_10_060425_add_foreign_keys_to_fa_criterias_table',1),(159,'2017_09_10_060425_add_foreign_keys_to_fa_groups_subjects_table',1),(160,'2017_09_10_060425_add_foreign_keys_to_fa_groups_table',1),(161,'2017_09_10_060425_add_foreign_keys_to_fee_collection_discounts_table',1),(162,'2017_09_10_060425_add_foreign_keys_to_fee_collection_particulars_table',1),(163,'2017_09_10_060425_add_foreign_keys_to_fee_discounts_table',1),(164,'2017_09_10_060425_add_foreign_keys_to_finance_donations_table',1),(165,'2017_09_10_060425_add_foreign_keys_to_finance_fee_categories_table',1),(166,'2017_09_10_060425_add_foreign_keys_to_finance_fee_collections_table',1),(167,'2017_09_10_060425_add_foreign_keys_to_finance_fee_particulars_table',1),(168,'2017_09_10_060425_add_foreign_keys_to_finance_fee_structure_elements_table',1),(169,'2017_09_10_060425_add_foreign_keys_to_finance_fees_table',1),(170,'2017_09_10_060425_add_foreign_keys_to_finance_transaction_triggers_table',1),(171,'2017_09_10_060425_add_foreign_keys_to_grading_levels_table',1),(172,'2017_09_10_060425_add_foreign_keys_to_grouped_batches_table',1),(173,'2017_09_10_060425_add_foreign_keys_to_grouped_exam_reports_table',1),(174,'2017_09_10_060425_add_foreign_keys_to_grouped_exams_table',1),(175,'2017_09_10_060425_add_foreign_keys_to_guardians_table',1),(176,'2017_09_10_060425_add_foreign_keys_to_individual_payslip_categories_table',1),(177,'2017_09_10_060425_add_foreign_keys_to_monthly_payslips_table',1),(178,'2017_09_10_060425_add_foreign_keys_to_news_comments_table',1),(179,'2017_09_10_060425_add_foreign_keys_to_news_table',1),(180,'2017_09_10_060425_add_foreign_keys_to_observation_groups_table',1),(181,'2017_09_10_060425_add_foreign_keys_to_observations_table',1),(182,'2017_09_10_060425_add_foreign_keys_to_payroll_categories_table',1),(183,'2017_09_10_060425_add_foreign_keys_to_period_entries_table',1),(184,'2017_09_10_060425_add_foreign_keys_to_privileges_table',1),(185,'2017_09_10_060425_add_foreign_keys_to_privileges_users_table',1),(186,'2017_09_10_060425_add_foreign_keys_to_registrations_table',1),(187,'2017_09_10_060425_add_foreign_keys_to_sms_logs_table',1),(188,'2017_09_10_060425_add_foreign_keys_to_states_table',1),(189,'2017_09_10_060425_add_foreign_keys_to_student_additional_details_table',1),(190,'2017_09_10_060425_add_foreign_keys_to_student_additional_field_options_table',1),(191,'2017_09_10_060425_add_foreign_keys_to_student_previous_datas_table',1),(192,'2017_09_10_060425_add_foreign_keys_to_student_previous_subject_marks_table',1),(193,'2017_09_10_060425_add_foreign_keys_to_students_subjects_table',1),(194,'2017_09_10_060425_add_foreign_keys_to_students_table',1),(195,'2017_09_10_060425_add_foreign_keys_to_subject_amounts_table',1),(196,'2017_09_10_060425_add_foreign_keys_to_subject_leaves_table',1),(197,'2017_09_10_060425_add_foreign_keys_to_subjects_table',1),(198,'2017_09_10_060425_add_foreign_keys_to_timetable_entries_table',1),(199,'2017_09_10_060425_add_foreign_keys_to_user_events_table',1),(200,'2017_09_10_060425_add_foreign_keys_to_weekdays_table',1),(201,'2017_10_11_072726_add_is_paid_to_fee_collection_particulars_table',1),(202,'2017_10_12_072133_create_calendar_table',1),(203,'2017_10_27_055427_add_is_deleted_to_Employee_table',1),(204,'2017_11_07_103527_add_no_exams_cloumn_to_exams_table',1),(205,'2017_11_18_101706_add_is_successful_to_sms_log_table',1),(206,'2017_11_18_123551_add_is_sms_to_events_table',1),(207,'2018_02_14_150438_add_exam_group_id_field_in_exam_scores_table',1),(208,'2018_02_15_add_coloumns_to_archived_guardians_table',1),(209,'2018_02_15_add_coloumns_to_archived_students_table',1),(210,'2018_02_20_add_coloumns_to_school_details_table',1),(211,'2018_03_15_162037_add_default_in_no_exam_field_in_exams_table',1),(212,'2018_03_31_060419_reject_applied_leaves_event',1),(213,'2018_04_07_092142_student_category_unique_key',1),(214,'2018_04_19_131310_create_login_histories_table',1),(215,'2018_04_21_150028_create_jobs_table',1),(216,'2018_04_23_123053_create_failed_jobs_table',1),(217,'2018_04_30_151609_add_is_email_verified_to_users_table',1),(218,'2018_05_01_123320_add_data_to_sms_settings_table',1),(219,'2018_05_03_105102_add_data_to_privileges_table',1),(220,'2018_05_08_160941_create_finance_fee_one_times_table',1),(221,'2018_05_18_163853_add_is_deleted_to_fee_collection_discounts_table',1),(222,'2018_05_25_172849_add_payment_note_to_finance_transaction_table',1),(223,'2018_06_01_154616_add_has_paid_one_time_fees_to_students_table',1),(224,'2018_06_01_155059_add_finance_fee_one_time_id_to_fee_collection_particulars_table',1),(225,'2018_06_01_155800_add_is_one_time_included_to_fee_collection_particulars_table',1),(226,'2018_06_02_173219_fee_student_one_times',1),(227,'2018_06_02_180654_add_year_column_to_finance_fee_one_times',1),(228,'2018_06_04_174803_add_payment_mode_to_finance_transaction_table',1),(229,'2018_06_04_175802_add_data_to_finance_transaction_categories_table',1),(230,'2018_06_06_133638_delete_finance_fee_one_time_id_from_fee_collection_particulars_table',1),(231,'2018_06_06_133946_delete_is_one_time_fees_included_from_finance_fees_table',1),(232,'2018_06_06_134458_add_fee_student_one_times_id_to_fee_collection_particualrs_table',1),(233,'2018_06_11_171259_change_student_has_paid_one_time_default_to_one_value_to_students_table',1),(234,'2018_06_12_121842_added_student_bankaccount_field_in_student_table',1),(235,'2018_06_19_132307_add_is_runtime_to_fee_collection_particulars_table',1),(236,'2018_06_23_163356_add__p_i_n_code_to_guardians_table',1),(237,'2018_06_26_182825_add_caste_name_to_students_table',1),(238,'2018_06_28_121057_fee_student_outstandings',1),(239,'2018_06_29_175601_add_description_column_in_fee_discount_table',1),(240,'2018_06_30_105712_add_discription_column_to__fee__collection__discount_table',1),(241,'2018_06_30_115946_add_fee_student_outstanding_id_to_fee_collection_particulars_table',1),(242,'2018_07_03_163752_add_is_runtime_to_fee_collection_discounts_table',1),(243,'2018_07_04_175154_added_family_id_in_guardians_table',1),(244,'2018_07_06_114548_add_paid_amount_to_fee_student_one_times_table',1),(245,'2018_07_07_120746_add_transaction_id_to_fee_collection_particulars_table',1),(246,'2018_07_07_154619_delete_finance_transation_id_from_fee_student_one_time_table',1),(247,'2018_07_07_154928_add_transaction_id_to_fee_student_one_time_table',1),(248,'2018_07_11_160317_add_is_deleted_to_finance_transaction_table',1),(249,'2018_07_12_120314_add_revert_reason_to_finance_transaction_table',1),(250,'2018_07_14_104017_add_revert_date_to_finance_transactions_table',1),(251,'2018_07_21_181049_update_admin_user_employee_status_to_active',1),(252,'2018_07_26_122307_create_permission_tables',1),(253,'2018_07_26_170233_add_roles_data_to_roles_table',1),(254,'2018_07_26_170635_add_permissions_data_to_permissions_table',1),(255,'2018_07_28_121929_add_exam_groupe_weightage_percent_column',1),(256,'2018_08_02_122914_added_total_marks_column_in_grouped_exam_reports',1),(257,'2018_08_03_135352_create_activity_log_table',1),(258,'2018_08_07_162132_add_outstanding_configuration_for_fee_receipt',1),(259,'2018_08_10_111529_added_maximum_marks_field_in_garding_levels_table',1),(260,'2018_08_10_115302_finance_transaction_receipts',1),(261,'2018_08_14_112415_delete_previous_due_column_from_fee_transaction_receipt',1),(262,'2018_08_14_112714_add_column_unpaid_collections_and_onetime_due_to_fee_transaction_receipts_table',1),(263,'2018_08_15_155706_add_overall_unpaid_amount_to_finance_transaction_receipt_table',1),(264,'2018_08_15_171546_add_weightage_mark_column_in_table',1),(265,'2018_08_20_130125_create_admins_table',1),(266,'2018_08_20_153159_add_fine_charged_to_finance_transaction_receipt',1),(267,'2018_08_22_105923_add_admin_column_to_admins',1),(268,'2018_08_22_120022_add_admin_employee_column_to_admins',1),(269,'2018_08_22_124744_add_admin_first_name_to_employee_column_to_admins',1),(270,'2018_09_06_121926_create_vehicles_table',1),(271,'2018_09_06_123006_create_routes_table',1),(272,'2018_09_06_123234_create_transports_table',1),(273,'2018_09_07_120000_create_transport_fee_collections_table',1),(274,'2018_09_07_123531_create_transport_fees_table',1),(275,'2018_09_08_110715_add_collection_particular_id_to_fee_collection_discounts_table',1),(276,'2018_09_10_155532_add_fee_particular_id_to_fee_discount_table',1),(277,'2018_09_17_102503_add_particularwisediscount_to_configurations_table',1),(278,'2018_09_19_124509_add_is_readmission_column_to_table',1),(279,'2018_09_26_153400_add_is_paid_column_to_transport_fees_table',1),(280,'2018_09_26_163844_add_bus_category_to_finance_transaction_categories_table',1),(281,'2018_09_27_170505_add_coloum_to_transport_fees_id',1),(282,'2018_10_05_133709_create_transport_receipts_table',1),(283,'2018_10_11_170348_add_is_mobile_verified_column_in_user_table',1),(284,'2018_10_15_113217_add_student_pemissions_to_permissions_table',1),(285,'2018_10_15_115429_add_employee_permissions_to_permissions_table',1),(286,'2018_10_15_115948_add_class_permissions_to_permissions_table',1),(287,'2018_10_15_121127_add_hr_permissions_to_permissions_table',1),(288,'2018_10_15_121754_add_exam_permissions_to_permissions_table',1),(289,'2018_10_15_122827_add_attendance_permissions_to_permission_table',1),(290,'2018_10_15_123057_add_manage_subject_permission_to_permissions_table',1),(291,'2018_10_15_123230_add_create_event_permission_to_permissions_table',1),(292,'2018_10_15_123446_add_timetable_permissions_to_permissions_table',1),(293,'2018_10_15_124803_add_news_permission_to_permissions_table',1),(294,'2018_10_15_170853_add_sms_setting_to_permissions_table',1),(295,'2018_10_15_171136_add_upload_x_l_permission_to_permissions_table',1),(296,'2018_10_15_174103_add_school_details_permission_to_permissions_table',1),(297,'2018_10_15_174330_add_audit_log_permission_to_permissions_table',1),(298,'2018_10_15_180711_create_transport_collection_discounts_table',1),(299,'2018_10_16_103447_add_two_column_in_transport_fees_table',1),(300,'2018_10_17_105010_add_send_sms_permission_to_permissions_table',1),(301,'2018_10_17_125851_add_guard_column_in_login_history_table',1),(302,'2018_10_17_174006_rename_fee_permissions_from_permissions_table',1),(303,'2018_10_17_174726_add_device_id_column_in_users_table',1),(304,'2018_10_17_180208_rename_batch_transfer_permissions_in_permissions_table',1),(305,'2018_10_18_103129_assign_all_permissions_to_administrator',1),(306,'2018_10_18_120919_drop_user_id_column_from_login_histories',1),(307,'2018_10_18_160359_add_column_in_transport_fees',1),(308,'2018_10_18_162840_add_user_id_in_login_history_table',1),(309,'2018_10_22_103327_add_last_time_change_password_to_users_table',1),(310,'2018_10_22_122412_add_class_subject_teacher_role_to_roles_table',1),(311,'2018_10_23_162236_add_password_expiry_configuration_to_configurations_table',1),(312,'2018_10_26_155550_add_column_in_transport_fee',1),(313,'2018_10_27_104049_add_transport_permissions_to_permissions_table',1),(314,'2018_10_27_113607_add_transport_role_to_roles_table',1),(315,'2018_10_27_121852_add_fee_particular_id_to_fee_collection_particular_table',1),(316,'2018_10_27_121911_add_fee_discount_id_to_fee_collection_discount_table',1),(317,'2018_10_31_175337_add_row_to_transport_in_configuration_table',1),(318,'2018_11_02_153421_add_colamn_in_transport_fees_table',1),(319,'2018_11_03_111521_create_diary_masters_table',1),(320,'2018_11_03_112059_create_diary_students_table',1),(321,'2018_11_06_105406_add_student_diary_permission_to_administrator',1),(322,'2018_11_14_103712_add_current_due_and_overallunpaid_configuration_to_configurations_table',1),(323,'2018_11_15_103726_add_send_mail_configuration_to_configurations_table',1),(324,'2018_11_15_154857_add_due_amount_coloumn_to_students_table',1),(325,'2018_11_15_155322_calculate_due_amount_from_students_table',1),(326,'2018_12_01_150530_add_fine_description_to_finance_transaction_table',1),(327,'2018_12_04_124116_add_fee_configuration_permission_to_permissions_table',1),(328,'2018_12_07_154718_create_fee_due_master_reminder_table',1),(329,'2018_12_07_160404_create_fee_due_collection_reminders_table',1),(330,'2018_12_07_163350_add_fee_due_reminder_permission_to_permissions_table',1),(331,'2018_12_11_105407_add_ispractical_colums_to_subjects_table',1),(332,'2018_12_11_121553_add_linksubject_for_practical_subject_colums_to_subjects_table',1),(333,'2018_12_14_103042_add_is_fee_due_reminder_enabled_to_sms_settings_table',1),(334,'2018_12_14_113104_add_isabsent_column_in_examscore_table',1),(335,'2018_12_14_121044_update_s_m_s_base_url_in_configurations_table',1),(336,'2018_12_18_121836_add_send_s_m_s_on_parent_mobile_verification_by_employee',1),(337,'2018_12_19_140222_is_sms_on_only_verified_parent_mobile_to_sms_settings_table',1),(338,'2018_12_21_104640_set_sms_configurations_in_configurations_table',1),(339,'2018_12_21_171237_create_enqury_sources_table',1),(340,'2018_12_22_131020_create__visitors_table',1),(341,'2018_12_26_110643_add_google_drive_folder_id_column_in_table_school_details',1),(342,'2018_12_26_114120_add_login_user_column_in_visitor_table',1),(343,'2018_12_26_145454_add_date_column_in_visitor_table',1),(344,'2018_12_27_110208_added_the_enquiry_message_to_configrationtable',1),(345,'2018_12_29_151309_add_change_password_permission_to_permissions_table',1),(346,'2018_12_31_122153_add_auto_generated_password_to_users_table',1),(347,'2019_01_02_132906_update_reporting_manager_id_of_employees_table',1),(348,'2019_01_02_134833_add_employee_leaves_permissions_to_permissions_table',1),(349,'2019_01_03_140947_add_after_days_weeks_to_fee_due_master_reminder_table',1),(350,'2019_01_03_163320_add_enable_leave_management_to_configurations_table',1),(351,'2019_01_03_164858_add_send_after_days_weeks_to_fee_due_collection_reminders_table',1),(352,'2019_01_10_160553_added_the__c_c_e_exam_pattern_in_cofigration_table',1),(353,'2019_01_22_115730_add_the_total_paid_onetime_column_in_finance_transaction_receipts_table',1),(354,'2019_01_22_120503_add_the_total_paid_outstanding_column_in_finance_transaction_receipts_table',1),(355,'2019_01_23_152823_added_the__run_time__particular_column_in_finance_transaction_receipt',1),(356,'2019_01_29_150637_added_the_value_in_cce_grade_sets_table',1),(357,'2019_01_29_152712_added_the_value_in_cce_grades_table',1),(358,'2019_01_30_122154_added_the_total_fine_column_in_finance_transaction_receipt_table',1),(359,'2019_02_02_141338_added_the_data_in_cce_exa_categies_table',1),(360,'2019_02_02_174214_added_the_weightage_for_cce_exam_in_cce_weightage_table',1),(361,'2019_02_06_112149_added_the_primary_key_column_id_in_cce_weightages_courses_table',1),(362,'2019_02_07_165203_added_the_primary_key_column_id_in_cce_fa_groups_subjects_table',1),(363,'2019_02_12_124727_created_the__fa__score_table',1),(364,'2019_02_12_134748_added_the_student_id_coulumn_in_fa_scores_table',1),(365,'2019_02_13_160134_add_the_course_id_column_in_observation_table',1),(366,'2019_02_13_171135_created_the_table_for_co-scholastic_subject_score',1),(367,'2019_02_26_123825_added_the_fagradeid_column_in_assign_coscholastic_table',1),(368,'2019_03_01_133118_added_the_data_grads_in_grading_levels_table',1),(369,'2019_03_06_165716_add_visitor_enable_sms_setting_in_sms_settings_table',1),(370,'2019_03_08_123932_add_enqury_source_data_in_enquery_source_table',1),(371,'2019_04_01_173830_add_notification_setting_in_configuration_table',1),(372,'2019_05_08_165950_add_exam_group_id_in_archived_exm_score_table',1),(373,'2019_05_17_124046_add_discount_column_in_student_one_time_table',1),(374,'2019_07_16_135033_add_discount_coumn_in_outstanding_fee_table',1),(375,'2019_07_26_122822_add_parentcopy_receipt_in_configurtion_table',1),(376,'2019_08_03_104605_add_outstanding_discount_column_in_finance_transaction_receipt_table',1),(377,'2019_08_21_133014_add_batch_shifting_to_permission_table',1),(378,'2019_08_22_113614_add_fee_due_column_in_archive_student_table',1),(379,'2019_08_22_173320_add_tobatch_and_created_at_in_batch_student_table',1);
/*!40000 ALTER TABLE migrations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table model_has_permissions
--

DROP TABLE IF EXISTS model_has_permissions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE model_has_permissions (
  permission_id int(10) unsigned NOT NULL,
  model_id int(10) unsigned NOT NULL,
  model_type varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (permission_id,model_id,model_type),
  KEY model_has_permissions_model_id_model_type_index (model_id,model_type),
  CONSTRAINT model_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table model_has_permissions
--

LOCK TABLES model_has_permissions WRITE;
/*!40000 ALTER TABLE model_has_permissions DISABLE KEYS */;
/*!40000 ALTER TABLE model_has_permissions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table model_has_roles
--

DROP TABLE IF EXISTS model_has_roles;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE model_has_roles (
  role_id int(10) unsigned NOT NULL,
  model_id int(10) unsigned NOT NULL,
  model_type varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (role_id,model_id,model_type),
  KEY model_has_roles_model_id_model_type_index (model_id,model_type),
  CONSTRAINT model_has_roles_role_id_foreign FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table model_has_roles
--

LOCK TABLES model_has_roles WRITE;
/*!40000 ALTER TABLE model_has_roles DISABLE KEYS */;
/*!40000 ALTER TABLE model_has_roles ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table monthly_payslips
--

DROP TABLE IF EXISTS monthly_payslips;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE monthly_payslips (
  id int(11) NOT NULL AUTO_INCREMENT,
  salary_date date DEFAULT NULL,
  employee_id int(11) DEFAULT NULL,
  payroll_category_id int(11) DEFAULT NULL,
  amount varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_approved tinyint(1) NOT NULL DEFAULT '0',
  approver_id int(11) DEFAULT NULL,
  is_rejected tinyint(1) NOT NULL DEFAULT '0',
  rejector_id int(11) DEFAULT NULL,
  reason varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  remark varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_monthly_payslips_on_employee_id (employee_id),
  KEY idx_monthly_payslips_on_payroll_category_id (payroll_category_id),
  KEY idx_monthly_payslips_on_approver_id (approver_id),
  KEY idx_monthly_payslips_on_rejector_id (rejector_id),
  CONSTRAINT monthly_payslips_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id),
  CONSTRAINT monthly_payslips_payroll_category_id FOREIGN KEY (payroll_category_id) REFERENCES payroll_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table monthly_payslips
--

LOCK TABLES monthly_payslips WRITE;
/*!40000 ALTER TABLE monthly_payslips DISABLE KEYS */;
/*!40000 ALTER TABLE monthly_payslips ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table news
--

DROP TABLE IF EXISTS news;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE news (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  content text COLLATE utf8_unicode_ci,
  author_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_news_on_author_id (author_id),
  CONSTRAINT  news_author_id FOREIGN KEY (author_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table news
--

LOCK TABLES news WRITE;
/*!40000 ALTER TABLE news DISABLE KEYS */;
/*!40000 ALTER TABLE news ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table news_comments
--

DROP TABLE IF EXISTS news_comments;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE news_comments (
  id int(11) NOT NULL AUTO_INCREMENT,
  content text COLLATE utf8_unicode_ci,
  news_id int(11) DEFAULT NULL,
  author_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  is_approved tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_news_comments_on_news_id (news_id),
  KEY idx_news_comments_on_author_id (author_id),
  CONSTRAINT news_comments_author_id FOREIGN KEY (author_id) REFERENCES users (id),
  CONSTRAINT news_comments_news_id FOREIGN KEY (news_id) REFERENCES news (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table news_comments
--

LOCK TABLES news_comments WRITE;
/*!40000 ALTER TABLE news_comments DISABLE KEYS */;
/*!40000 ALTER TABLE news_comments ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table oauth_access_tokens
--

DROP TABLE IF EXISTS oauth_access_tokens;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE oauth_access_tokens (
  id varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  user_id int(11) DEFAULT NULL,
  client_id int(11) NOT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  scopes text COLLATE utf8_unicode_ci,
  revoked tinyint(1) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  expires_at datetime DEFAULT NULL,
  PRIMARY KEY (id),
  KEY oauth_access_tokens_user_id_index (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table oauth_access_tokens
--

LOCK TABLES oauth_access_tokens WRITE;
/*!40000 ALTER TABLE oauth_access_tokens DISABLE KEYS */;
/*!40000 ALTER TABLE oauth_access_tokens ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table oauth_auth_codes
--

DROP TABLE IF EXISTS oauth_auth_codes;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE oauth_auth_codes (
  id varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  user_id int(11) NOT NULL,
  client_id int(11) NOT NULL,
  scopes text COLLATE utf8_unicode_ci,
  revoked tinyint(1) NOT NULL,
  expires_at datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table oauth_auth_codes
--

LOCK TABLES oauth_auth_codes WRITE;
/*!40000 ALTER TABLE oauth_auth_codes DISABLE KEYS */;
/*!40000 ALTER TABLE oauth_auth_codes ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table oauth_clients
--

DROP TABLE IF EXISTS oauth_clients;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE oauth_clients (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  secret varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  redirect text COLLATE utf8_unicode_ci NOT NULL,
  personal_access_client tinyint(1) NOT NULL,
  password_client tinyint(1) NOT NULL,
  revoked tinyint(1) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY oauth_clients_user_id_index (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table oauth_clients
--

LOCK TABLES oauth_clients WRITE;
/*!40000 ALTER TABLE oauth_clients DISABLE KEYS */;
/*!40000 ALTER TABLE oauth_clients ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table oauth_personal_access_clients
--

DROP TABLE IF EXISTS oauth_personal_access_clients;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE oauth_personal_access_clients (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  client_id int(11) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY oauth_personal_access_clients_client_id_index (client_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table oauth_personal_access_clients
--

LOCK TABLES oauth_personal_access_clients WRITE;
/*!40000 ALTER TABLE oauth_personal_access_clients DISABLE KEYS */;
/*!40000 ALTER TABLE oauth_personal_access_clients ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table oauth_refresh_tokens
--

DROP TABLE IF EXISTS oauth_refresh_tokens;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE oauth_refresh_tokens (
  id varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  access_token_id varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  revoked tinyint(1) NOT NULL,
  expires_at datetime DEFAULT NULL,
  PRIMARY KEY (id),
  KEY oauth_refresh_tokens_access_token_id_index (access_token_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table oauth_refresh_tokens
--

LOCK TABLES oauth_refresh_tokens WRITE;
/*!40000 ALTER TABLE oauth_refresh_tokens DISABLE KEYS */;
/*!40000 ALTER TABLE oauth_refresh_tokens ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table observation_groups
--

DROP TABLE IF EXISTS observation_groups;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE observation_groups (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  header_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  desc varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  cce_grade_set_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  observation_kind varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  max_marks double DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_observation_groups_on_cce_grade_set_id (cce_grade_set_id),
  CONSTRAINT observation_groups_cce_grade_set_id FOREIGN KEY (cce_grade_set_id) REFERENCES cce_grade_sets (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table observation_groups
--

LOCK TABLES observation_groups WRITE;
/*!40000 ALTER TABLE observation_groups DISABLE KEYS */;
/*!40000 ALTER TABLE observation_groups ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table observations
--

DROP TABLE IF EXISTS observations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE observations (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  desc varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_active tinyint(1) DEFAULT NULL,
  observation_group_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  sort_order int(11) DEFAULT NULL,
  course_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_observations_on_observation_group_id (observation_group_id),
  CONSTRAINT observations_observation_group_id FOREIGN KEY (observation_group_id) REFERENCES observation_groups (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table observations
--

LOCK TABLES observations WRITE;
/*!40000 ALTER TABLE observations DISABLE KEYS */;
/*!40000 ALTER TABLE observations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table password_resets
--

DROP TABLE IF EXISTS password_resets;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE password_resets (
  email varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  token varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  KEY password_resets_email_index (email),
  KEY password_resets_token_index (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table password_resets
--

LOCK TABLES password_resets WRITE;
/*!40000 ALTER TABLE password_resets DISABLE KEYS */;
/*!40000 ALTER TABLE password_resets ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table payroll_categories
--

DROP TABLE IF EXISTS payroll_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE payroll_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  percentage double DEFAULT NULL,
  payroll_category_id int(11) DEFAULT NULL,
  is_deduction tinyint(1) DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY payroll_category_id (payroll_category_id),
  CONSTRAINT payroll_categories_payroll_category_id FOREIGN KEY (payroll_category_id) REFERENCES payroll_categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table payroll_categories
--

LOCK TABLES payroll_categories WRITE;
/*!40000 ALTER TABLE payroll_categories DISABLE KEYS */;
/*!40000 ALTER TABLE payroll_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table period_entries
--

DROP TABLE IF EXISTS period_entries;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE period_entries (
  id int(11) NOT NULL AUTO_INCREMENT,
  month_date date DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  class_timing_id int(11) DEFAULT NULL,
  employee_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_period_entries_on_month_date_and_batch_id (month_date,batch_id),
  KEY idx_pe_on_batch_id (batch_id),
  KEY idx_pe_on_subject_id (subject_id),
  KEY idx_pe_on_class_timing_id (class_timing_id),
  KEY idx_pe_on_employee_id (employee_id),
  CONSTRAINT  period_entries_class_timing_id FOREIGN KEY (class_timing_id) REFERENCES class_timings (id),
  CONSTRAINT  period_entries_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id),
  CONSTRAINT period_entries_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT period_entries_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table period_entries
--

LOCK TABLES period_entries WRITE;
/*!40000 ALTER TABLE period_entries DISABLE KEYS */;
/*!40000 ALTER TABLE period_entries ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table permissions
--

DROP TABLE IF EXISTS permissions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE permissions (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  guard_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table permissions
--

LOCK TABLES permissions WRITE;
/*!40000 ALTER TABLE permissions DISABLE KEYS */;
INSERT INTO permissions VALUES (1,'Fee_Category__Fees','web',NULL,NULL),(2,'Fee_Particular__Fees','web',NULL,NULL),(3,'Fee_Collection__Fees','web',NULL,NULL),(4,'Submit_Fees__Fees','web',NULL,NULL),(5,'Runtime_Discount__Fees','web',NULL,NULL),(6,'Create_One_Time_Fees__Fees','web',NULL,NULL),(7,'Fee_Discount__Fees','web',NULL,NULL),(8,'Manage_Fees__Fees','web',NULL,NULL),(9,'View_All_Collections__Fees','web',NULL,NULL),(10,'Transaction_History__Fees','web',NULL,NULL),(11,'Collection_Defaulters__Fees','web',NULL,NULL),(12,'Overall_Defaulters__Fees','web',NULL,NULL),(13,'Import_Fees_Batchwise__Fees','web',NULL,NULL),(14,'Import_Fees_Studentwise__Fees','web',NULL,NULL),(15,'Revert_Transactions__Fees','web',NULL,NULL),(16,'Batch_Transfer__StudentPromotion','web',NULL,NULL),(17,'Generate_TC/Graduation__StudentPromotion','web',NULL,NULL),(18,'Download_TC__StudentPromotion','web',NULL,NULL),(19,'Student_Admission__Student','web',NULL,NULL),(20,'View_All_Student__Student','web',NULL,NULL),(21,'Create_Student_Category__Student','web',NULL,NULL),(22,'Student_Roll_numbers__Student','web',NULL,NULL),(23,'Delete_Student__Student','web',NULL,NULL),(24,'Update_Student__Student','web',NULL,NULL),(25,'Employee_Admission__Employee','web',NULL,NULL),(26,'View_All_Employee__Employee','web',NULL,NULL),(27,'Update_Employee__Employee','web',NULL,NULL),(28,'Create_Class_Section__ClassAndSection','web',NULL,NULL),(29,'Manage_Class__ClassAndSection','web',NULL,NULL),(30,'Class_Teacher__ClassAndSection','web',NULL,NULL),(31,'Employee_Category__HrManagement','web',NULL,NULL),(32,'Employee_Position__HrManagement','web',NULL,NULL),(33,'Employee_Department__HrManagement','web',NULL,NULL),(34,'Manage_Exam_Groups__Exam','web',NULL,NULL),(35,'Assign_Marks__Exam','web',NULL,NULL),(36,'Publish_Result__Exam','web',NULL,NULL),(37,'Exam_Report__Exam','web',NULL,NULL),(38,'Exam_Weightage__Exam','web',NULL,NULL),(39,'Generate_Report__Exam','web',NULL,NULL),(40,'View_Report__Exam','web',NULL,NULL),(41,'Student_Ranking__Exam','web',NULL,NULL),(42,'All_Grades__Exam','web',NULL,NULL),(43,'Manage_Grade__Exam','web',NULL,NULL),(44,'Attendance_Register__Attendance','web',NULL,NULL),(45,'Attendance_Report__Attendance','web',NULL,NULL),(46,'Manage_Subject','web',NULL,NULL),(47,'Create_Events','web',NULL,NULL),(48,'Set_Class_Timings__Timetable','web',NULL,NULL),(49,'Work_Allotment__Timetable','web',NULL,NULL),(50,'Add_Edit_Timetables__Timetable','web',NULL,NULL),(51,'My_Timetable__Timetable','web',NULL,NULL),(52,'Create_News','web',NULL,NULL),(53,'SMS_Setting','web',NULL,NULL),(54,'Upload_Excel','web',NULL,NULL),(55,'School_Detail','web',NULL,NULL),(56,'Audit_Log','web',NULL,NULL),(57,'Send_SMS','web',NULL,NULL),(58,'Routes__Transport','web',NULL,NULL),(59,'Vehicle__Transport','web',NULL,NULL),(60,'Assign_Transport__Transport','web',NULL,NULL),(61,'Transport_Fee_Collections__Transport','web',NULL,NULL),(62,'Reports__Transport','web',NULL,NULL),(63,'Manage_Student_Of_Buses__Transport','web',NULL,NULL),(64,'Import_Student_In_Collection__Transport','web',NULL,NULL),(65,'Submit_Fees__Transport','web',NULL,NULL),(66,'Defaulter__Transport','web',NULL,NULL),(67,'Student_diary','web','2019-08-30 17:35:40','2019-08-30 17:35:40'),(68,'Fee_Configurations__Fees','web',NULL,NULL),(69,'Fees_Due_Reminder__Reminders','web','2019-08-30 17:35:43','2019-08-30 17:35:43'),(70,'Change_Password__Users','web','2019-08-30 17:35:46','2019-08-30 17:35:46'),(71,'Attendance_Register__Leaves','web','2019-08-30 17:35:47','2019-08-30 17:35:47'),(72,'Apply_For_Leave__Leaves','web','2019-08-30 17:35:47','2019-08-30 17:35:47'),(73,'Leave_Approval__Leaves','web','2019-08-30 17:35:47','2019-08-30 17:35:47'),(74,'My_Leaves__Leaves','web','2019-08-30 17:35:47','2019-08-30 17:35:47'),(75,'Leave_Type__Leaves','web','2019-08-30 17:35:47','2019-08-30 17:35:47'),(76,'Reset_Leaves__Leaves','web','2019-08-30 17:35:48','2019-08-30 17:35:48'),(77,'Batch_Shifting','web','2019-08-30 17:35:59','2019-08-30 17:35:59');
/*!40000 ALTER TABLE permissions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table privilege_tags
--

DROP TABLE IF EXISTS privilege_tags;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE privilege_tags (
  id int(11) NOT NULL AUTO_INCREMENT,
  name_tag varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  priority int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table privilege_tags
--

LOCK TABLES privilege_tags WRITE;
/*!40000 ALTER TABLE privilege_tags DISABLE KEYS */;
/*!40000 ALTER TABLE privilege_tags ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table privileges
--

DROP TABLE IF EXISTS privileges;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE privileges (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  privilege_tag_id int(11) DEFAULT NULL,
  priority int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY privilege_tag_id (privilege_tag_id),
  CONSTRAINT privileges_privilege_tag_id FOREIGN KEY (privilege_tag_id) REFERENCES privilege_tags (id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table privileges
--

LOCK TABLES privileges WRITE;
/*!40000 ALTER TABLE privileges DISABLE KEYS */;
INSERT INTO privileges VALUES (1,'Finance Control',NULL,NULL,NULL,NULL,NULL),(2,'Batch Transfer / TC',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE privileges ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table privileges_users
--

DROP TABLE IF EXISTS privileges_users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE privileges_users (
  user_id int(11) DEFAULT NULL,
  privilege_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  KEY user_id (user_id),
  KEY idx_privileges_users_on_privilege_id (privilege_id),
  CONSTRAINT privileges_users_privilege_id FOREIGN KEY (privilege_id) REFERENCES privileges (id),
  CONSTRAINT privileges_users_user_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table privileges_users
--

LOCK TABLES privileges_users WRITE;
/*!40000 ALTER TABLE privileges_users DISABLE KEYS */;
/*!40000 ALTER TABLE privileges_users ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table ranking_levels
--

DROP TABLE IF EXISTS ranking_levels;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE ranking_levels (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  gpa decimal(15,2) DEFAULT NULL,
  marks decimal(15,2) DEFAULT NULL,
  subject_count int(11) DEFAULT NULL,
  priority int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  full_course tinyint(1) DEFAULT '0',
  course_id int(11) DEFAULT NULL,
  subject_limit_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  marks_limit_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_ranking_lavel_on_course_id (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ranking_levels
--

LOCK TABLES ranking_levels WRITE;
/*!40000 ALTER TABLE ranking_levels DISABLE KEYS */;
/*!40000 ALTER TABLE ranking_levels ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table registrations
--

DROP TABLE IF EXISTS registrations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE registrations (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  dispensary_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  admin_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  admin_email varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  country_id int(11) NOT NULL,
  state_id int(11) NOT NULL,
  currency_id int(11) NOT NULL,
  password varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_registrations_on_country_id (country_id),
  KEY idx_registrations_on_state_id (state_id),
  KEY idx_registrations_on_currency_id (currency_id),
  CONSTRAINT registrations_country_id FOREIGN KEY (country_id) REFERENCES countries (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table registrations
--

LOCK TABLES registrations WRITE;
/*!40000 ALTER TABLE registrations DISABLE KEYS */;
/*!40000 ALTER TABLE registrations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table reminders
--

DROP TABLE IF EXISTS reminders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE reminders (
  id int(11) NOT NULL AUTO_INCREMENT,
  sender int(11) DEFAULT NULL,
  recipient int(11) DEFAULT NULL,
  subject varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  body text COLLATE utf8_unicode_ci,
  is_read tinyint(1) DEFAULT '0',
  is_deleted_by_sender tinyint(1) DEFAULT '0',
  is_deleted_by_recipient tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_reminders_on_recipient (recipient)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table reminders
--

LOCK TABLES reminders WRITE;
/*!40000 ALTER TABLE reminders DISABLE KEYS */;
/*!40000 ALTER TABLE reminders ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table role_has_permissions
--

DROP TABLE IF EXISTS role_has_permissions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE role_has_permissions (
  permission_id int(10) unsigned NOT NULL,
  role_id int(10) unsigned NOT NULL,
  PRIMARY KEY (permission_id,role_id),
  KEY role_has_permissions_role_id_foreign (role_id),
  CONSTRAINT role_has_permissions_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE,
  CONSTRAINT role_has_permissions_role_id_foreign FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table role_has_permissions
--

LOCK TABLES role_has_permissions WRITE;
/*!40000 ALTER TABLE role_has_permissions DISABLE KEYS */;
INSERT INTO role_has_permissions VALUES (1,1),(1,2),(2,1),(2,2),(3,1),(3,2),(4,1),(4,4),(5,1),(5,4),(6,1),(6,2),(7,1),(7,2),(8,1),(8,3),(9,1),(9,3),(10,1),(10,3),(10,4),(11,1),(11,3),(12,1),(12,3),(13,1),(13,3),(14,1),(14,3),(15,1),(15,3),(16,1),(16,5),(17,1),(17,5),(18,1),(18,6),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(35,8),(36,1),(36,7),(37,1),(37,7),(37,8),(38,1),(39,1),(40,1),(41,1),(42,1),(43,1),(44,1),(44,7),(45,1),(45,7),(46,1),(47,1),(48,1),(49,1),(50,1),(51,1),(52,1),(53,1),(54,1),(55,1),(56,1),(57,1),(58,9),(59,9),(60,9),(61,9),(62,9),(63,9),(64,9),(65,9),(66,9),(67,1),(67,8),(68,1),(69,1),(70,1),(71,1),(72,1),(72,7),(72,8),(73,1),(74,1),(74,7),(74,8),(75,1),(76,1),(77,1);
/*!40000 ALTER TABLE role_has_permissions ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table roles
--

DROP TABLE IF EXISTS roles;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE roles (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  guard_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table roles
--

LOCK TABLES roles WRITE;
/*!40000 ALTER TABLE roles DISABLE KEYS */;
INSERT INTO roles VALUES (1,'Administrator','web',NULL,NULL),(2,'Fee Creator','web',NULL,NULL),(3,'Fee Manager','web',NULL,NULL),(4,'Cashier','web',NULL,NULL),(5,'Student Promoter','web',NULL,NULL),(6,'TC Generator','web',NULL,NULL),(7,'Class Teacher','web',NULL,NULL),(8,'Subject Teacher','web',NULL,NULL),(9,'TransportController','web',NULL,NULL);
/*!40000 ALTER TABLE roles ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table routes
--

DROP TABLE IF EXISTS routes;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE routes (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  destination varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  cost decimal(8,2) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table routes
--

LOCK TABLES routes WRITE;
/*!40000 ALTER TABLE routes DISABLE KEYS */;
/*!40000 ALTER TABLE routes ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table schema_migrations
--

DROP TABLE IF EXISTS schema_migrations;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE schema_migrations (
  version varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table schema_migrations
--

LOCK TABLES schema_migrations WRITE;
/*!40000 ALTER TABLE schema_migrations DISABLE KEYS */;
/*!40000 ALTER TABLE schema_migrations ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table school_details
--

DROP TABLE IF EXISTS school_details;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE school_details (
  id int(11) NOT NULL AUTO_INCREMENT,
  school_id int(11) DEFAULT NULL,
  school_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  school_website varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  logo_file_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  logo_content_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  logo_file_size varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  school_info varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  telephone varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  established_year varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  accredation_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  school_address varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  google_drive_folder_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_school_details_on_school_id (school_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table school_details
--

LOCK TABLES school_details WRITE;
/*!40000 ALTER TABLE school_details DISABLE KEYS */;
/*!40000 ALTER TABLE school_details ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table sms_logs
--

DROP TABLE IF EXISTS sms_logs;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE sms_logs (
  id int(11) NOT NULL AUTO_INCREMENT,
  mobile varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  gateway_response varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  sms_message_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  is_success tinyint(1) DEFAULT '0',
  channel_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  sms_Type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  KEY sms_message_id (sms_message_id),
  CONSTRAINT sms_logs_sms_message_id FOREIGN KEY (sms_message_id) REFERENCES sms_messages (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table sms_logs
--

LOCK TABLES sms_logs WRITE;
/*!40000 ALTER TABLE sms_logs DISABLE KEYS */;
/*!40000 ALTER TABLE sms_logs ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table sms_messages
--

DROP TABLE IF EXISTS sms_messages;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE sms_messages (
  id int(11) NOT NULL AUTO_INCREMENT,
  body varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table sms_messages
--

LOCK TABLES sms_messages WRITE;
/*!40000 ALTER TABLE sms_messages DISABLE KEYS */;
/*!40000 ALTER TABLE sms_messages ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table sms_settings
--

DROP TABLE IF EXISTS sms_settings;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE sms_settings (
  id int(11) NOT NULL AUTO_INCREMENT,
  settings_key varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_enabled tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table sms_settings
--

LOCK TABLES sms_settings WRITE;
/*!40000 ALTER TABLE sms_settings DISABLE KEYS */;
INSERT INTO sms_settings VALUES (1,'IsSmsEnabled',0,NULL,NULL),(2,'IsResultPublishEnabled',0,NULL,NULL),(3,'IsExamScheduleResultEnabled',0,NULL,NULL),(4,'IsAttendanceEnabled',0,NULL,NULL),(5,'IsSMSOnRegistrationEnabled',0,NULL,NULL),(6,'IsSMSOnFeesEnabled',0,NULL,NULL),(7,'IsSMSOnEventEnabled',0,NULL,NULL),(8,'IsSMSFeeDueReminderEnabled',0,NULL,NULL),(9,'IsSendSMSOnParentMobileVerifiedByEmployeeEnabled',0,NULL,NULL),(10,'IsSMSOnlyOnVerifiedParentMobileEnabled',1,NULL,NULL),(11,'VisitorsSMSEnable',0,NULL,NULL);
/*!40000 ALTER TABLE sms_settings ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table states
--

DROP TABLE IF EXISTS states;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE states (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  country_id int(11) NOT NULL,
  state varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  state_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_states_on_country_id (country_id),
  CONSTRAINT states_country_id FOREIGN KEY (country_id) REFERENCES countries (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table states
--

LOCK TABLES states WRITE;
/*!40000 ALTER TABLE states DISABLE KEYS */;
/*!40000 ALTER TABLE states ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table student_additional_details
--

DROP TABLE IF EXISTS student_additional_details;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE student_additional_details (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  additional_field_id int(11) DEFAULT NULL,
  additional_info varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_student_additional_details_on_student_data_index (student_id,additional_field_id),
  KEY idx_student_additional_details_on_student_id (student_id),
  KEY idx_student_additional_details_on_additional_field_id (additional_field_id),
  CONSTRAINT student_additional_details_additional_field_id FOREIGN KEY (additional_field_id) REFERENCES additional_fields (id),
  CONSTRAINT student_additional_details_student_id FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table student_additional_details
--

LOCK TABLES student_additional_details WRITE;
/*!40000 ALTER TABLE student_additional_details DISABLE KEYS */;
/*!40000 ALTER TABLE student_additional_details ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table student_additional_field_options
--

DROP TABLE IF EXISTS student_additional_field_options;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE student_additional_field_options (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_additional_field_id int(11) DEFAULT NULL,
  field_option varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_student_additional_field_on_student_additional_field_id (student_additional_field_id),
  CONSTRAINT student_additional_field_options_student_additional_field_id FOREIGN KEY (student_additional_field_id) REFERENCES student_additional_fields (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table student_additional_field_options
--

LOCK TABLES student_additional_field_options WRITE;
/*!40000 ALTER TABLE student_additional_field_options DISABLE KEYS */;
/*!40000 ALTER TABLE student_additional_field_options ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table student_additional_fields
--

DROP TABLE IF EXISTS student_additional_fields;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE student_additional_fields (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  status tinyint(1) DEFAULT NULL,
  is_mandatory tinyint(1) DEFAULT '0',
  input_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  priority int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table student_additional_fields
--

LOCK TABLES student_additional_fields WRITE;
/*!40000 ALTER TABLE student_additional_fields DISABLE KEYS */;
/*!40000 ALTER TABLE student_additional_fields ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table student_categories
--

DROP TABLE IF EXISTS student_categories;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE student_categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_deleted tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY student_categories_name_unique (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table student_categories
--

LOCK TABLES student_categories WRITE;
/*!40000 ALTER TABLE student_categories DISABLE KEYS */;
/*!40000 ALTER TABLE student_categories ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table student_previous_datas
--

DROP TABLE IF EXISTS student_previous_datas;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE student_previous_datas (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  institution varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  year varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  course varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  total_mark varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_student_previous_datas_on_student_id (student_id),
  CONSTRAINT student_previous_datas_student_id FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table student_previous_datas
--

LOCK TABLES student_previous_datas WRITE;
/*!40000 ALTER TABLE student_previous_datas DISABLE KEYS */;
/*!40000 ALTER TABLE student_previous_datas ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table student_previous_subject_marks
--

DROP TABLE IF EXISTS student_previous_subject_marks;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE student_previous_subject_marks (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  subject varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mark varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_student_previous_subject_marks_on_student_id (student_id),
  CONSTRAINT student_previous_subject_marks_student_id	 FOREIGN KEY (student_id) REFERENCES students (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table student_previous_subject_marks
--

LOCK TABLES student_previous_subject_marks WRITE;
/*!40000 ALTER TABLE student_previous_subject_marks DISABLE KEYS */;
/*!40000 ALTER TABLE student_previous_subject_marks ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table students
--

DROP TABLE IF EXISTS students;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE students (
  id int(11) NOT NULL AUTO_INCREMENT,
  admission_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  class_roll_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  enrolment_number varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  admission_date date DEFAULT NULL,
  first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  middle_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  date_of_birth date DEFAULT NULL,
  gender varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  blood_group varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  birth_place varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  nationality_id int(11) DEFAULT NULL,
  language varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  religion varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  student_category_id int(11) DEFAULT NULL,
  address_line1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  address_line2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  pin_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  country_id int(11) DEFAULT NULL,
  phone1 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  phone2 varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  immediate_contact_id int(11) DEFAULT NULL,
  is_sms_enabled tinyint(1) DEFAULT '1',
  photo_file_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_content_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  photo_data blob,
  status_description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_active tinyint(1) DEFAULT '1',
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  has_paid_fees tinyint(1) DEFAULT '0',
  photo_file_size int(11) DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  samagra_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  board_enrollment_number varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  has_paid_one_time_fees tinyint(1) NOT NULL DEFAULT '1',
  account_holder_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  bank_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  ifsc_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  account_no varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  caste_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  due_amount decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (id),
  UNIQUE KEY index_students_on_email (email),
  KEY index_students_on_first_name_and_middle_name_and_last_name (first_name,middle_name,last_name),
  KEY index_students_on_student_data_index (nationality_id,immediate_contact_id,student_category_id),
  KEY index_students_on_admission_no (admission_no),
  KEY index_students_on_batch_id (batch_id),
  KEY idx_students_on_nationality_id (nationality_id),
  KEY idx_on_students_student_category_id_foreign (student_category_id),
  KEY idx_students_on_country_id (country_id),
  KEY idx_students_on_students_user_id_foreign (user_id),
  CONSTRAINT students_batch_id_foreign FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT students_nationality_id_foreign FOREIGN KEY (nationality_id) REFERENCES countries (id),
  CONSTRAINT students_student_category_id_foreign FOREIGN KEY (student_category_id) REFERENCES student_categories (id),
  CONSTRAINT students_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table students
--

LOCK TABLES students WRITE;
/*!40000 ALTER TABLE students DISABLE KEYS */;
/*!40000 ALTER TABLE students ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table students_subjects
--

DROP TABLE IF EXISTS students_subjects;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE students_subjects (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_students_subjects_on_student_id_and_subject_id (student_id,subject_id),
  KEY idx_students_subjects_on_student_id (student_id),
  KEY idx_students_subjects_on_subject_id (subject_id),
  KEY idx_students_subjects_on_batch_id (batch_id),
  CONSTRAINT students_subjects_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT students_subjects_student_id FOREIGN KEY (student_id) REFERENCES students (id),
  CONSTRAINT students_subjects_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table students_subjects
--

LOCK TABLES students_subjects WRITE;
/*!40000 ALTER TABLE students_subjects DISABLE KEYS */;
/*!40000 ALTER TABLE students_subjects ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table subject_amounts
--

DROP TABLE IF EXISTS subject_amounts;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE subject_amounts (
  id int(11) NOT NULL AUTO_INCREMENT,
  course_id int(11) DEFAULT NULL,
  amount decimal(10,0) DEFAULT NULL,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_subject_account_on_course_id (course_id),
  CONSTRAINT subject_amounts_course_id FOREIGN KEY (course_id) REFERENCES courses (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table subject_amounts
--

LOCK TABLES subject_amounts WRITE;
/*!40000 ALTER TABLE subject_amounts DISABLE KEYS */;
/*!40000 ALTER TABLE subject_amounts ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table subject_leaves
--

DROP TABLE IF EXISTS subject_leaves;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE subject_leaves (
  id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) DEFAULT NULL,
  month_date date DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  employee_id int(11) DEFAULT NULL,
  class_timing_id int(11) DEFAULT NULL,
  reason varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_subject_leaves_on_month_date_and_subject_id_and_batch_id (month_date,subject_id,batch_id),
  KEY index_subject_leaves_on_student_id_and_batch_id (student_id,batch_id),
  KEY index_subject_leaves_on_student_id (student_id),
  KEY index_subject_leaves_on_subject_id (subject_id),
  KEY index_subject_leaves_on_employee_id (employee_id),
  KEY index_subject_leaves_on_class_timing_id (class_timing_id),
  KEY index_subject_leaves_on_batch_id (batch_id),
  CONSTRAINT subject_leaves_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT subject_leaves_class_timing_id FOREIGN KEY (class_timing_id) REFERENCES class_timings (id),
  CONSTRAINT subject_leaves_employee_id FOREIGN KEY (employee_id) REFERENCES employees (id),
  CONSTRAINT subject_leaves_student_id FOREIGN KEY (student_id) REFERENCES students (id),
  CONSTRAINT subject_leaves_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table subject_leaves
--

LOCK TABLES subject_leaves WRITE;
/*!40000 ALTER TABLE subject_leaves DISABLE KEYS */;
/*!40000 ALTER TABLE subject_leaves ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table subjects
--

DROP TABLE IF EXISTS subjects;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE subjects (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  batch_id int(11) DEFAULT NULL,
  no_exams tinyint(1) DEFAULT '0',
  max_weekly_classes int(11) DEFAULT NULL,
  elective_group_id int(11) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  credit_hours decimal(15,2) DEFAULT NULL,
  prefer_consecutive tinyint(1) DEFAULT '0',
  amount decimal(15,2) DEFAULT NULL,
  is_practical_subject tinyint(1) NOT NULL DEFAULT '0',
  link_subject int(11) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY index_subjects_on_batch_id_and_elective_group_id_and_is_deleted (batch_id,elective_group_id,is_deleted),
  KEY index_subjects_on_batch_id (batch_id),
  KEY index_subjects_on_elective_group_id (elective_group_id),
  CONSTRAINT  subjects_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT  subjects_elective_group_id FOREIGN KEY (elective_group_id) REFERENCES elective_groups (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table subjects
--

LOCK TABLES subjects WRITE;
/*!40000 ALTER TABLE subjects DISABLE KEYS */;
/*!40000 ALTER TABLE subjects ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table time_zones
--

DROP TABLE IF EXISTS time_zones;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE time_zones (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  difference_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  time_difference int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table time_zones
--

LOCK TABLES time_zones WRITE;
/*!40000 ALTER TABLE time_zones DISABLE KEYS */;
/*!40000 ALTER TABLE time_zones ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table timetable_entries
--

DROP TABLE IF EXISTS timetable_entries;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE timetable_entries (
  id int(11) NOT NULL AUTO_INCREMENT,
  batch_id int(11) DEFAULT NULL,
  weekday_id int(11) DEFAULT NULL,
  class_timing_id int(11) DEFAULT NULL,
  subject_id int(11) DEFAULT NULL,
  employee_id int(11) DEFAULT NULL,
  timetable_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY by_timetable (weekday_id,batch_id,class_timing_id),
  KEY batch_id (batch_id),
  KEY weekday_id (weekday_id),
  KEY class_timing_id (class_timing_id),
  KEY subject_id (subject_id),
  KEY employee_id (employee_id),
  KEY timetable_id (timetable_id),
  CONSTRAINT timetable_entries_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id),
  CONSTRAINT timetable_entries_class_timing_id FOREIGN KEY (class_timing_id) REFERENCES class_timings (id),
  CONSTRAINT timetable_entries_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id),
  CONSTRAINT timetable_entries_timetable_id FOREIGN KEY (timetable_id) REFERENCES timetables (id),
  CONSTRAINT timetable_entries_weekday_id FOREIGN KEY (weekday_id) REFERENCES weekdays (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table timetable_entries
--

LOCK TABLES timetable_entries WRITE;
/*!40000 ALTER TABLE timetable_entries DISABLE KEYS */;
/*!40000 ALTER TABLE timetable_entries ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table timetables
--

DROP TABLE IF EXISTS timetables;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE timetables (
  id int(11) NOT NULL AUTO_INCREMENT,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  is_active tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY by_start_and_end (start_date,end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table timetables
--

LOCK TABLES timetables WRITE;
/*!40000 ALTER TABLE timetables DISABLE KEYS */;
/*!40000 ALTER TABLE timetables ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table transport_collection_discounts
--

DROP TABLE IF EXISTS transport_collection_discounts;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE transport_collection_discounts (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  receiver_type varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  receiver_id int(11) DEFAULT NULL,
  discount decimal(15,2) DEFAULT NULL,
  transport_fee_collection_id int(11) NOT NULL,
  is_amount tinyint(1) DEFAULT '0',
  deleted_at tinyint(1) NOT NULL DEFAULT '0',
  is_runtime tinyint(1) NOT NULL DEFAULT '0',
  description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table transport_collection_discounts
--

LOCK TABLES transport_collection_discounts WRITE;
/*!40000 ALTER TABLE transport_collection_discounts DISABLE KEYS */;
/*!40000 ALTER TABLE transport_collection_discounts ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table transport_fee_collections
--

DROP TABLE IF EXISTS transport_fee_collections;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE transport_fee_collections (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  batch_id int(11) NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  due_date date NOT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table transport_fee_collections
--

LOCK TABLES transport_fee_collections WRITE;
/*!40000 ALTER TABLE transport_fee_collections DISABLE KEYS */;
/*!40000 ALTER TABLE transport_fee_collections ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table transport_fees
--

DROP TABLE IF EXISTS transport_fees;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE transport_fees (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  receiver_id int(11) NOT NULL,
  bus_fare decimal(15,2) NOT NULL,
  transaction_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  transport_fee_collection_id int(11) NOT NULL,
  receiver_type varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  is_paid tinyint(1) NOT NULL DEFAULT '0',
  trans_coll_adjusment int(11) NOT NULL DEFAULT '0',
  adjus_description varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  trans_coll_greateradjuamount int(11) NOT NULL DEFAULT '0',
  adjus_descriptionforgreater varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  total_fare int(11) NOT NULL DEFAULT '0',
  is_adjustment int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_collectiontransportid_from_collectiontransport (transport_fee_collection_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table transport_fees
--

LOCK TABLES transport_fees WRITE;
/*!40000 ALTER TABLE transport_fees DISABLE KEYS */;
/*!40000 ALTER TABLE transport_fees ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table transport_receipts
--

DROP TABLE IF EXISTS transport_receipts;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE transport_receipts (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  finance_transaction_id int(11) NOT NULL,
  current_collection_due int(11) NOT NULL,
  total_amount int(11) NOT NULL,
  paid_amount int(11) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table transport_receipts
--

LOCK TABLES transport_receipts WRITE;
/*!40000 ALTER TABLE transport_receipts DISABLE KEYS */;
/*!40000 ALTER TABLE transport_receipts ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table transports
--

DROP TABLE IF EXISTS transports;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE transports (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  receiver_id int(11) NOT NULL,
  vehicle_id int(11) NOT NULL,
  route_id int(11) NOT NULL,
  is_assign int(11) NOT NULL,
  bus_fare varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  receiver_type varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table transports
--

LOCK TABLES transports WRITE;
/*!40000 ALTER TABLE transports DISABLE KEYS */;
/*!40000 ALTER TABLE transports ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table user_events
--

DROP TABLE IF EXISTS user_events;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE user_events (
  id int(11) NOT NULL AUTO_INCREMENT,
  event_id int(11) DEFAULT NULL,
  user_id int(11) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_userEvents_event_id (event_id),
  KEY idx_userEvents_user_id (user_id),
  CONSTRAINT user_events_event_id FOREIGN KEY (event_id) REFERENCES events (id),
  CONSTRAINT user_events_user_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table user_events
--

LOCK TABLES user_events WRITE;
/*!40000 ALTER TABLE user_events DISABLE KEYS */;
/*!40000 ALTER TABLE user_events ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table users
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  first_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  admin tinyint(1) DEFAULT '0',
  student tinyint(1) DEFAULT '0',
  employee tinyint(1) DEFAULT '0',
  password varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  remember_token varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  salt varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  reset_password_code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  reset_password_code_until datetime DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  parent tinyint(1) DEFAULT NULL,
  is_first_login tinyint(1) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  avtar varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default-avatar.jpg',
  aadhar_card varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  is_email_verified tinyint(1) NOT NULL DEFAULT '0',
  is_mobile_verified tinyint(1) NOT NULL DEFAULT '0',
  device_id varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  last_time_change_password datetime DEFAULT NULL,
  auto_generated_password tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY index_users_on_email (email),
  KEY index_users_on_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table users
--

LOCK TABLES users WRITE;
/*!40000 ALTER TABLE users DISABLE KEYS */;
/*!40000 ALTER TABLE users ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table vehicles
--

DROP TABLE IF EXISTS vehicles;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE vehicles (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  vehicle_no varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  route_id int(11) NOT NULL,
  no_of_seats int(11) NOT NULL,
  status varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table vehicles
--

LOCK TABLES vehicles WRITE;
/*!40000 ALTER TABLE vehicles DISABLE KEYS */;
/*!40000 ALTER TABLE vehicles ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table visitors
--

DROP TABLE IF EXISTS visitors;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE visitors (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  class_id int(11) DEFAULT NULL,
  source_id int(11) DEFAULT NULL,
  Student_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  father_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  place varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  dob varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  father_Occupation varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_Occupation varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  city varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  Student_Age varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  father_mobile varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_mobile varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  state varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  gender varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  father_email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  mother_email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  distance varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  Next_follow_up varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  comments varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  userid int(11) DEFAULT NULL,
  date varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table visitors
--

LOCK TABLES visitors WRITE;
/*!40000 ALTER TABLE visitors DISABLE KEYS */;
/*!40000 ALTER TABLE visitors ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table weekdays
--

DROP TABLE IF EXISTS weekdays;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE weekdays (
  id int(11) NOT NULL AUTO_INCREMENT,
  batch_id int(11) DEFAULT NULL,
  weekday varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  sort_order int(11) DEFAULT NULL,
  day_of_week int(11) DEFAULT NULL,
  is_deleted tinyint(1) DEFAULT '0',
  PRIMARY KEY (id),
  KEY idx_weekdays_batch_id (batch_id),
  CONSTRAINT  weekdays_batch_id FOREIGN KEY (batch_id) REFERENCES batches (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table weekdays
--

LOCK TABLES weekdays WRITE;
/*!40000 ALTER TABLE weekdays DISABLE KEYS */;
/*!40000 ALTER TABLE weekdays ENABLE KEYS */;
UNLOCK TABLES;

  `);
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
  res.status(200).json({ profiles, pageCount, page, record });
};
